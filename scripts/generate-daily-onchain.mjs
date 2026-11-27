import { mkdir, readFile, readdir, rename, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const CONTENT_DIR = join(ROOT, "content", "onchain");
const INDEX_PATH = join(CONTENT_DIR, "index.json");
const API = "https://api.dexscreener.com";
const DOCS_URL = "https://docs.dexscreener.com/api/reference";
const MIN_LIQUIDITY_USD = 5000;
const MIN_VOLUME_24H_USD = 5000;
const MIN_TRANSACTIONS_24H = 20;
const RECENT_FEATURE_DAYS = 7;

function localIssueDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return values.year + "-" + values.month + "-" + values.day;
}

export function nullableNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function nullableNonNegative(value) {
  const number = nullableNumber(value);
  return number === null || number < 0 ? null : number;
}

function rounded(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function money(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "not reported";
  return "$" + value.toLocaleString("en-US", { maximumFractionDigits: value < 1 ? 6 : 0 });
}

function signedPercent(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "not reported";
  return (value > 0 ? "+" : "") + value.toFixed(2) + "%";
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "WEIRD-Daily-Onchain-Desk/1.0",
    },
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) {
    throw new Error("DEX Screener request failed (" + response.status + "): " + url);
  }
  return response.json();
}

export function profileMapFromFeeds(profileFeed, takeoverFeed) {
  const profiles = new Map();
  const addProfiles = (items, discoveryType) => {
    for (const item of items) {
      if (!item || item.chainId !== "solana" || typeof item.tokenAddress !== "string") continue;
      const key = item.tokenAddress.toLowerCase();
      const previous = profiles.get(key);
      const isTakeover = discoveryType === "COMMUNITY TAKEOVER";
      if (!previous || isTakeover) {
        profiles.set(key, {
          tokenAddress: item.tokenAddress,
          profileUrl: item.url || null,
          description: typeof item.description === "string" ? item.description.slice(0, 500) : "",
          discoveryType,
          claimDate: item.claimDate || null,
        });
      }
    }
  };
  addProfiles(Array.isArray(profileFeed) ? profileFeed : [], "NEW DEX PROFILE");
  addProfiles(Array.isArray(takeoverFeed) ? takeoverFeed : [], "COMMUNITY TAKEOVER");
  return profiles;
}

export function makePairRows(pairs, profiles, now) {
  const bestByToken = new Map();

  for (const pair of pairs) {
    if (!pair || pair.chainId !== "solana" || !pair.baseToken || !pair.baseToken.address) continue;
    const profile = profiles.get(String(pair.baseToken.address).toLowerCase());
    if (!profile) continue;

    const liquidityUsd = nullableNonNegative(pair.liquidity && pair.liquidity.usd);
    const volume24hUsd = nullableNonNegative(pair.volume && pair.volume.h24);
    const buys24h = nullableNonNegative(pair.txns && pair.txns.h24 && pair.txns.h24.buys);
    const sells24h = nullableNonNegative(pair.txns && pair.txns.h24 && pair.txns.h24.sells);
    const totalTransactions24h = buys24h !== null && sells24h !== null
      ? buys24h + sells24h
      : null;
    const pairCreatedAt = nullableNumber(pair.pairCreatedAt);
    const ageHours = pairCreatedAt !== null
      ? Math.max(0, (now.getTime() - pairCreatedAt) / 3600000)
      : null;
    const buySharePct = totalTransactions24h !== null && totalTransactions24h > 0
      ? rounded((buys24h / totalTransactions24h) * 100, 1)
      : null;
    const volumeLiquidityRatio = liquidityUsd !== null && liquidityUsd > 0 && volume24hUsd !== null
      ? rounded(volume24hUsd / liquidityUsd, 2)
      : null;

    const row = {
      name: pair.baseToken.name || "Unknown token",
      symbol: pair.baseToken.symbol || "UNKNOWN",
      address: pair.baseToken.address,
      pairAddress: pair.pairAddress || null,
      dexId: pair.dexId || "unknown DEX",
      pairUrl: pair.url || profile.profileUrl || ("https://dexscreener.com/solana/" + pair.baseToken.address),
      profileUrl: profile.profileUrl,
      discoveryType: profile.discoveryType,
      claimDate: profile.claimDate,
      priceUsd: nullableNumber(pair.priceUsd),
      liquidityUsd,
      volume24hUsd,
      marketCapUsd: nullableNumber(pair.marketCap),
      fdvUsd: nullableNumber(pair.fdv),
      priceChange1hPct: nullableNumber(pair.priceChange && pair.priceChange.h1),
      priceChange24hPct: nullableNumber(pair.priceChange && pair.priceChange.h24),
      buys24h,
      sells24h,
      totalTransactions24h,
      buySharePct,
      volumeLiquidityRatio,
      pairCreatedAt: pairCreatedAt !== null ? new Date(pairCreatedAt).toISOString() : null,
      ageHours: ageHours === null ? null : rounded(ageHours, 1),
    };

    const key = row.address.toLowerCase();
    const existing = bestByToken.get(key);
    if (!existing ||
      (row.liquidityUsd !== null && (existing.liquidityUsd === null || row.liquidityUsd > existing.liquidityUsd)) ||
      (row.liquidityUsd === existing.liquidityUsd &&
        row.volume24hUsd !== null &&
        (existing.volume24hUsd === null || row.volume24hUsd > existing.volume24hUsd))) {
      bestByToken.set(key, row);
    }
  }

  return Array.from(bestByToken.values()).sort((a, b) => {
    if (a.volume24hUsd === null) return b.volume24hUsd === null ? 0 : 1;
    if (b.volume24hUsd === null) return -1;
    return b.volume24hUsd - a.volume24hUsd;
  });
}

export function isQualifyingCandidate(candidate) {
  return candidate.liquidityUsd !== null &&
    candidate.volume24hUsd !== null &&
    candidate.totalTransactions24h !== null &&
    candidate.liquidityUsd >= MIN_LIQUIDITY_USD &&
    candidate.volume24hUsd >= MIN_VOLUME_24H_USD &&
    candidate.totalTransactions24h >= MIN_TRANSACTIONS_24H;
}

export function buildArticle(date, issuedAt, counts, candidates, selected, repeatAvoided) {
  const sourceSummary = "DEX Screener public API; latest Solana token-profile and community-takeover feeds, plus returned pair snapshots. The Department supplies the attitude, not the numbers.";
  if (selected) {
    const priceChange = selected.priceChange24hPct;
    const hourlyChange = selected.priceChange1hPct;
    const severeDrop = priceChange !== null && priceChange <= -50;
    const notableDrop = priceChange !== null && priceChange <= -20;
    const sharpRise = priceChange !== null && priceChange >= 50;
    const strongRise = priceChange !== null && priceChange >= 20;
    const extremeTurnover = selected.volumeLiquidityRatio !== null && selected.volumeLiquidityRatio >= 50;
    const highTurnover = selected.volumeLiquidityRatio !== null && selected.volumeLiquidityRatio >= 10;
    const buys = selected.buys24h;
    const sells = selected.sells24h;
    const totalTransactions = selected.totalTransactions24h;
    const buyShare = selected.buySharePct;
    const hasTransactionCounts = totalTransactions !== null;
    const poolIsYoung = selected.ageHours !== null && selected.ageHours < 24;
    const issueClock = issuedAt.slice(11, 16) + " UTC";

    let title;
    if (severeDrop && extremeTurnover) {
      title = "$" + selected.symbol + ": " + signedPercent(priceChange) + " IN 24H. VOLUME FILED A STATEMENT; LIQUIDITY DECLINED TO COMMENT.";
    } else if (severeDrop) {
      title = "$" + selected.symbol + ": " + signedPercent(priceChange) + " IN 24H. THE EXCUSE DEPARTMENT IS AT CAPACITY.";
    } else if (notableDrop) {
      title = "$" + selected.symbol + ": " + signedPercent(priceChange) + ". THE WORD 'CORRECTION' HAS REQUESTED LEGAL COUNSEL.";
    } else if (sharpRise && selected.liquidityUsd < 10000) {
      title = "$" + selected.symbol + ": " + signedPercent(priceChange) + ". THE CANDLE HAS A BIGGER PUBLICIST THAN THE POOL.";
    } else if (sharpRise) {
      title = "$" + selected.symbol + ": " + signedPercent(priceChange) + ". PLEASE KEEP THE VICTORY LAP INSIDE THE DATA.";
    } else if (highTurnover) {
      title = "$" + selected.symbol + ": THE VOLUME IS WORKING OVERTIME. THE LIQUIDITY HAS QUESTIONS.";
    } else {
      title = "$" + selected.symbol + ": THE MARKET HAS SUBMITTED ANOTHER UNSOLICITED PERFORMANCE REVIEW.";
    }

    const priceDescription = priceChange === null
      ? "DEX Screener did not report a 24-hour price change for this pair."
      : "The reported 24-hour price change was " + signedPercent(priceChange) + ".";
    let priceComment;
    if (severeDrop) {
      priceComment = "That is a severe drawdown, not a decorative red candle. The usual vocabulary of 'healthy reset', 'final shakeout' and 'perfect entry' has been asked to provide evidence before returning to the group chat.";
    } else if (notableDrop) {
      priceComment = "The decline is large enough that calling it a tiny wobble would require a very flexible dictionary. The Department recommends keeping the adjectives proportional to the percentage.";
    } else if (sharpRise) {
      priceComment = "A move this large makes for an excellent screenshot and a terrible substitute for risk analysis. The Department congratulates the candle on its publicity tour and declines to appoint it head of research.";
    } else if (strongRise) {
      priceComment = "The pair is up over the reported window. A green number is welcome, but it is not proof of durable demand, market depth or a future that owes anyone a sequel.";
    } else if (priceChange !== null && priceChange > 0) {
      priceComment = "The quote is green, but a modest positive print is still one observation rather than a character reference for the project.";
    } else if (priceChange !== null) {
      priceComment = "The quote is red. The Department will resist promoting one snapshot into a grand theory of market structure.";
    } else {
      priceComment = "With no reported price change, there is no chart story to invent. The Department has been denied its favourite prop.";
    }

    let hourlyComment;
    if (hourlyChange === null) {
      hourlyComment = "No one-hour price change was supplied, so the shorter-term direction is not assessed.";
    } else if (hourlyChange <= -5) {
      hourlyComment = "The one-hour reading was also negative at " + signedPercent(hourlyChange) + ", so the snapshot still showed downside pressure in the shorter window. It does not identify what caused the move.";
    } else if (hourlyChange >= 5 && severeDrop) {
      hourlyComment = "The one-hour reading was positive at " + signedPercent(hourlyChange) + ". That is a bounce inside a much larger reported 24-hour decline, not enough evidence to announce a recovery. The Department asks the confetti cannon to remain unplugged.";
    } else if (hourlyChange >= 5) {
      hourlyComment = "The one-hour reading was positive at " + signedPercent(hourlyChange) + ". Useful context, not a licence to extrapolate the last hour into the next one.";
    } else if (hourlyChange < 0) {
      hourlyComment = "The latest one-hour field was " + signedPercent(hourlyChange) + ": slightly weaker in the shorter window, without proving that the move will continue.";
    } else {
      hourlyComment = "The one-hour field was " + signedPercent(hourlyChange) + ", close enough to flat that the Department will not manufacture momentum from it.";
    }

    const tradeSummary = hasTransactionCounts
      ? "The pair recorded " + buys.toLocaleString("en-US") + " buys and " + sells.toLocaleString("en-US") +
        " sells, for " + totalTransactions.toLocaleString("en-US") + " transactions in the reported 24-hour field."
      : "The API did not supply a usable 24-hour buy/sell transaction count.";
    const buyShareSummary = buyShare === null
      ? "A buy-share percentage cannot be calculated from the returned counts."
      : buyShare.toFixed(1) + "% of recorded transactions were buys and " +
        (100 - buyShare).toFixed(1) + "% were sells. These are event counts, not unique people, wallet counts or trade-size-weighted flows.";
    let flowComment;
    if (!hasTransactionCounts) {
      flowComment = "With no usable counts, the Department cannot describe the transaction mix.";
    } else if (totalTransactions === 0) {
      flowComment = "The provider reported zero buys and zero sells in the 24-hour fields. That is an absence of recorded transactions in this snapshot, not evidence that the token or its wider market had no activity elsewhere.";
    } else if (buys > sells && priceChange !== null && priceChange <= -10) {
      flowComment = "This is the detail the group chat will try to turn into a paradox: buy transactions outnumbered sells, yet the quoted price fell hard. It is not actually a contradiction. Counts do not measure trade size or sequence; fewer, larger sells can outweigh a greater number of smaller buys. The data does not tell us whether that is what happened here. The 99% Research Confidence Division has nevertheless drafted a bullish thread and is being held outside Compliance.";
    } else if (sells > buys && priceChange !== null && priceChange >= 10) {
      flowComment = "Sell transactions outnumbered buys while the quoted price rose. Again, counts do not measure trade size or sequence. The market has refused to fit inside a one-line explanation, which is inconsiderate of our editorial schedule.";
    } else if (buyShare !== null && buyShare >= 60) {
      flowComment = "Buy transactions clearly outnumbered sells. That does not establish accumulation, unique buyers, positive net capital or a price floor. A count is not conviction, however confidently someone types 'bid'.";
    } else if (buyShare !== null && buyShare <= 40) {
      flowComment = "Sell transactions clearly outnumbered buys. That is a count of executions, not proof that every seller escaped or that every buyer is doomed. The chart still refuses to provide wallet-level context.";
    } else {
      flowComment = "The transaction split was relatively balanced. Balanced counts do not mean balanced trade sizes, healthy liquidity or a market that has suddenly discovered emotional maturity.";
    }

    const ratioSummary = selected.volumeLiquidityRatio === null
      ? selected.volume24hUsd === null
        ? "A volume-to-liquidity ratio cannot be calculated because the reported 24-hour volume was unavailable."
        : "A volume-to-liquidity ratio cannot be calculated because displayed pool liquidity was zero or unavailable."
      : "Reported trailing 24-hour volume was " + selected.volumeLiquidityRatio.toFixed(2) +
        " times the displayed liquidity snapshot. This is a turnover-to-pool comparison, not net inflow, cash reserves or the amount that could be sold at the quoted price.";
    let liquidityComment;
    if (extremeTurnover) {
      liquidityComment = "A " + selected.volumeLiquidityRatio.toFixed(2) +
        "× ratio means the recorded trading volume was enormous relative to the liquidity figure visible at collection time. It may reflect repeated turnover through the same pool; it does not mean that the pool held " +
        money(selected.volume24hUsd) + " or could absorb an exit of that size. Volume is activity. Liquidity is the pool snapshot. They are not interchangeable, however much the timeline would like them to be.";
    } else if (highTurnover) {
      liquidityComment = "Turnover was high relative to displayed pool liquidity. That deserves attention, but it still cannot be translated directly into available exit depth or the amount any particular holder could realise.";
    } else {
      liquidityComment = "Volume and displayed liquidity answer different questions. The former records trading activity over a window; the latter is a snapshot of the pool. Neither, by itself, tells a holder what an exit would cost.";
    }

    const valuationNotes = [];
    if (selected.marketCapUsd !== null) valuationNotes.push("market cap " + money(selected.marketCapUsd));
    if (selected.fdvUsd !== null) valuationNotes.push("FDV " + money(selected.fdvUsd));
    const valuationSummary = valuationNotes.length
      ? "The provider also reported " + valuationNotes.join(" and ") +
        ". Those are valuation fields, not cash sitting in the pool, a guaranteed sale price or proof that the market can redeem the implied value."
      : "Market-cap and FDV fields were not available in this snapshot, so the Department will not invent a valuation narrative.";

    const ageSummary = selected.ageHours === null
      ? "The provider did not supply a pair-creation timestamp."
      : "The pair was approximately " + selected.ageHours.toFixed(1) + " hours old when collected.";
    const ageCaveat = poolIsYoung
      ? "Because the pool was younger than 24 hours, its reported 24-hour activity and price-change fields cannot represent a full 24 hours of that pair's history. The label is a rolling window, not a time machine."
      : "The pool had more than 24 hours of recorded age, but this is still one snapshot rather than a complete trading history.";

    const discoverySummary = selected.discoveryType === "COMMUNITY TAKEOVER"
      ? "The discovery feed labels this profile COMMUNITY TAKEOVER. That is a provider-supplied discovery category, not independent verification of who controls the project, its keys or its treasury. The ceremonial handover paperwork remains missing."
      : "The discovery feed labels this profile NEW DEX PROFILE. That describes how it entered this feed; it does not prove the project itself is new, safe, original or destined for anything.";

    const sideNotes = candidates
      .filter((candidate) => candidate.address.toLowerCase() !== selected.address.toLowerCase())
      .slice(0, 2)
      .map((candidate) => {
        const change = candidate.priceChange24hPct === null
          ? "price move not reported"
          : "reported price move " + signedPercent(candidate.priceChange24hPct);
        const liquidity = candidate.liquidityUsd === null
          ? "liquidity unavailable in this snapshot"
          : candidate.liquidityUsd === 0
            ? "$0 displayed liquidity in this snapshot"
            : money(candidate.liquidityUsd) + " displayed liquidity";
        const ageNote = candidate.ageHours !== null && candidate.ageHours < 24
          ? "; pair age " + candidate.ageHours.toFixed(1) + "h, so the 24h field does not contain a full day of pair history"
          : "";
        return candidate.name + " ($" + candidate.symbol + ") recorded " + money(candidate.volume24hUsd) +
          " in reported volume, " + liquidity + " and " + change + ageNote + ".";
      });
    const sampleContext = sideNotes.length
      ? "The neighbouring rows in the same limited feed are worth a look too: " + sideNotes.join(" ")
      : "There were no additional usable pair snapshots to place beside the featured row.";

    const standfirst = selected.name + " ($" + selected.symbol + ") led the eligible discovery sample by reported 24-hour pair volume: " +
      money(selected.volume24hUsd) + " against " + money(selected.liquidityUsd) + " in displayed liquidity, with a quoted price move of " +
      signedPercent(priceChange) + ". The Department filed the figures correctly. The market appears to have misplaced the memo.";

    const sections = [
      {
        heading: "THE INCIDENT REPORT: THE CANDLE HAS REQUESTED COUNSEL.",
        paragraphs: [
          "At " + issueClock + ", the selected " + selected.dexId + " pair showed " +
            money(selected.liquidityUsd) + " in displayed pool liquidity and " +
            money(selected.volume24hUsd) + " in reported trailing 24-hour volume. The quoted token price was " +
            (selected.priceUsd === null ? "not reported" : "$" + selected.priceUsd.toPrecision(6)) +
            ". These are DEX Screener snapshots, not a reconstruction of every trade. We have the receipts; the market has declined to provide a statement.",
          "This pair was not selected because it dumped. It ranked first by reported 24-hour volume among " +
            counts.freshQualifyingCandidates + " fresh candidates that met the publication thresholds. " +
            ageSummary + " " + ageCaveat + " " + discoverySummary,
        ],
      },
      {
        heading: "PRICE ACTION: THE EXCUSE DEPARTMENT IS OPEN.",
        paragraphs: [
          priceDescription + " " + priceComment,
          hourlyComment + " The snapshot does not reveal the catalyst, the identity of any seller or whether the move was caused by one large trade, many smaller trades or something else. Anyone offering a confident causal thread from these fields alone is freelancing.",
        ],
      },
      {
        heading: "THE BUY TAPE: COUNTS ARE NOT CONVICTION.",
        paragraphs: [
          tradeSummary + " " + buyShareSummary,
          flowComment,
        ],
      },
      {
        heading: "VOLUME IS NOT AN EXIT PLAN.",
        paragraphs: [
          ratioSummary + " " + liquidityComment,
          valuationSummary + " The pool's displayed liquidity is not a promise that a holder can sell at the quoted price, and the market-cap field is not an ATM. The Department would like these nouns kept in separate departments.",
        ],
      },
      {
        heading: "THE REST OF THE ROOM IS ALSO ON THE RECORD.",
        paragraphs: [
          sampleContext,
          "This is context from the same limited discovery sample, not a ranking of Solana or a claim that these pairs represent the wider market. The shortlist is a feed sample, not a census of the trenches.",
        ],
      },
      {
        heading: "THE OFFICIAL STATEMENT: WE FILED THE DATA. THE MARKET FILED A COMPLAINT.",
        paragraphs: [
          "The Department can report what the provider returned: price change, pool liquidity, turnover, transaction counts, pair age and the feed's discovery label. It cannot honestly turn those fields into a story about a whale, insiders, a rug pull, coordinated selling, wallet concentration or anyone's intentions.",
          "So yes, another day in which the chart has made the Department look ridiculous by association. We did not select the pair for its losses, predict its direction or certify its quality. We selected it under published volume and activity rules, recorded the result and left the excuses to the professionals. DYOR means checking the receipts, especially when the receipt is ugly.",
        ],
      },
      {
        heading: "WHAT THE DATA STILL DOES NOT KNOW.",
        paragraphs: [
          "These pair statistics do not identify unique traders, beneficial owners, wallet clusters, deployer intent, coordinated activity, trade-size distribution or who is posting rocket emojis. Buy/sell counts are not a count of distinct wallets.",
          "Liquidity, volume and price can change immediately after collection. This is an evidence-led roast of one observed market snapshot, not a safety audit, a complete market report or a trading recommendation.",
        ],
      },
    ];

    return {
      schemaVersion: 1,
      issueDate: date,
      issuedAt,
      timezone: "Europe/Rome",
      title,
      standfirst,
      classification: severeDrop
        ? "OBSERVED DEX DRAWDOWN / DEPARTMENT COMMENTARY"
        : "OBSERVED SOLANA DEX ACTIVITY / DEPARTMENT COMMENTARY",
      sourceSummary,
      counts,
      featuredToken: selected,
      observations: candidates.filter((candidate) => candidate.address.toLowerCase() !== selected.address.toLowerCase()).slice(0, 3),
      sections,
      methodology: [
        "Discovery sample: latest Solana token profiles and latest community-takeover notices supplied by DEX Screener.",
        "Pair selection: highest displayed-liquidity pair returned for each discovered token.",
        "Feature threshold: at least $5,000 displayed liquidity, $5,000 trailing 24-hour volume and 20 recorded buys plus sells.",
        "To vary the daily archive, a token featured during the previous seven issues is skipped when another qualifying candidate exists.",
        "The featured item is selected by reported 24-hour pair volume among fresh candidates that pass the thresholds; a large drawdown is not itself a selection criterion.",
        "Commentary interprets reported pair metrics only. It does not infer wallet identities, trade sizes, causes, motives, safety or future price direction.",
      ],
      sources: [
        { label: "Featured DEX pair", url: selected.pairUrl },
        { label: "DEX Screener API documentation", url: DOCS_URL },
      ],
    };
  }

  const topCandidate = candidates[0] || null;
  const qualifying = candidates.filter((candidate) =>
    candidate.liquidityUsd >= MIN_LIQUIDITY_USD &&
    candidate.volume24hUsd >= MIN_VOLUME_24H_USD &&
    candidate.totalTransactions24h >= MIN_TRANSACTIONS_24H
  );
  const repeatedCandidate = qualifying[0] || null;
  const title = repeatAvoided
    ? "THE SAME CANDIDATES AGAIN. THE DEPARTMENT REFUSES TO RECYCLE THE HEADLINE."
    : "NO BREAKOUT CLEARED THE DESK. THE EXCUSES ARE READY.";
  const standfirst = repeatAvoided
    ? qualifying.length + " candidates cleared the publication rules, but every qualifying token appeared in the previous seven issues. The Department declined to recycle yesterday's guest as today's discovery. Consistency, apparently, is our problem."
    : "The Department checked " + counts.pairsReturned + " returned DEX pair records from the latest Solana discovery feeds. Nobody cleared every publication threshold today. We will not promote a loud number into a good story just to keep the content calendar employed.";

  let topCandidateParagraph;
  if (!topCandidate) {
    topCandidateParagraph = "No pair with a usable snapshot was returned. The Department cannot write an investigation around an empty chart, however persistent the editorial calendar may be.";
  } else {
    const failures = [];
    if (topCandidate.liquidityUsd === null) failures.push("displayed liquidity was not available");
    else if (topCandidate.liquidityUsd < MIN_LIQUIDITY_USD) failures.push("displayed liquidity of " + money(topCandidate.liquidityUsd) + " against a $5,000 minimum");
    if (topCandidate.volume24hUsd === null) failures.push("reported 24-hour volume was not available");
    else if (topCandidate.volume24hUsd < MIN_VOLUME_24H_USD) failures.push("reported 24-hour volume of " + money(topCandidate.volume24hUsd) + " against a $5,000 minimum");
    if (topCandidate.totalTransactions24h === null) failures.push("buy/sell transaction counts were not available");
    else if (topCandidate.totalTransactions24h < MIN_TRANSACTIONS_24H) failures.push(topCandidate.totalTransactions24h + " recorded buys and sells against a 20-transaction minimum");
    const movement = topCandidate.priceChange24hPct === null
      ? "The price move was not reported."
      : "Its reported price change was " + signedPercent(topCandidate.priceChange24hPct) + ".";
    topCandidateParagraph = "The highest-volume usable pair in the returned sample was " + topCandidate.name + " ($" +
      topCandidate.symbol + "), with " + money(topCandidate.volume24hUsd) + " in reported volume and " +
      money(topCandidate.liquidityUsd) + " in displayed liquidity. " + movement +
      (failures.length ? " It missed the publication gate on " + failures.join("; ") + "." : " It did not become a fresh feature under the archive rules.") +
      " A loud chart is not a reference letter.";
  }

  const sections = [
    {
      heading: "THE INTAKE: WE CHECKED THE RECEIPTS.",
      paragraphs: [
        "The discovery feeds returned " + counts.solanaProfiles + " Solana token profiles, " +
          counts.solanaTakeovers + " community-takeover notices and " + counts.pairsReturned +
          " DEX pair records. That produced " + counts.candidatePairs +
          " unique token candidates with usable pair snapshots. Busy inbox; standards remain irritatingly intact.",
        "A front-page candidate needed at least $5,000 in displayed liquidity, $5,000 in reported trailing 24-hour volume and 20 recorded buys plus sells. " +
          counts.qualifyingCandidates + " candidates passed those three gates before the recent-feature filter.",
      ],
    },
    {
      heading: repeatAvoided ? "WHY THE DESK SAID 'NOT YOU AGAIN'." : "WHY NOBODY GOT A FRONT-PAGE PHOTO.",
      paragraphs: [
        repeatAvoided
          ? "There were " + qualifying.length + " candidates that cleared the thresholds, but all had appeared in the previous seven issues. The archive rule exists to avoid publishing the same token as a fresh discovery every morning. This is editorial rotation, not a verdict on those projects."
          : "No candidate in this limited sample passed every threshold. That does not mean Solana was quiet, dead or suddenly free of chart crimes. It means this intake did not produce a pair that met our minimum evidence rules. The market was under no contractual obligation to feed the content calendar.",
        repeatAvoided && repeatedCandidate
          ? "The leading recently featured candidate was " + repeatedCandidate.name + " ($" + repeatedCandidate.symbol +
            "), with " + money(repeatedCandidate.volume24hUsd) + " reported volume and " +
            money(repeatedCandidate.liquidityUsd) + " displayed liquidity. It qualified on the numbers but was not recycled into a new headline."
          : topCandidateParagraph,
      ],
    },
    {
      heading: "THE DEPARTMENT'S OFFICIAL ALIBI.",
      paragraphs: [
        "We did the unglamorous work: fetched the public feeds, checked the returned pairs, applied the same thresholds and declined to invent a breakout. The market did not provide a publishable candidate. This failure to entertain is being escalated to the Committee for External Circumstances.",
        "No qualifying feature is not proof that nothing happened across Solana. It is a precise statement about this limited discovery sample at this collection time. No wallet ownership, holder concentration, token safety, deployer intent or investment quality was assessed.",
      ],
    },
  ];

  return {
    schemaVersion: 1,
    issueDate: date,
    issuedAt,
    timezone: "Europe/Rome",
    title,
    standfirst,
    classification: repeatAvoided
      ? "QUALIFYING CANDIDATES RECENTLY FEATURED / NO REPEAT"
      : "NO QUALIFYING FEATURE IN THE DISCOVERY SAMPLE",
    sourceSummary,
    counts,
    featuredToken: null,
    observations: candidates.slice(0, 3),
    sections,
    methodology: [
      "Discovery sample: latest Solana token profiles and latest community-takeover notices supplied by DEX Screener.",
      "Pair selection: highest displayed-liquidity pair returned for each discovered token.",
      "Feature threshold: at least $5,000 displayed liquidity, $5,000 trailing 24-hour volume and 20 recorded buys plus sells.",
      "A candidate featured during the previous seven issues is skipped when another qualifying candidate exists; if all qualifying candidates are repeats, the report records that instead of recycling one.",
      "A quiet-day report is limited to this discovery sample and collection time. It is not a claim that no trading activity occurred elsewhere on Solana.",
      "Commentary does not invent market events or infer wallet ownership, motives, causes, token safety or investment quality.",
    ],
    sources: [{ label: "DEX Screener API documentation", url: DOCS_URL }],
  };
}

function reportIndexEntry(report) {
  const featured = report.featuredToken || null;
  return {
    issueDate: report.issueDate,
    path: "content/onchain/" + report.issueDate + ".json",
    title: report.title,
    standfirst: report.standfirst,
    classification: report.classification,
    featuredSymbol: featured ? featured.symbol : null,
    featuredTokenAddress: featured ? featured.address : null,
    pairUrl: featured ? featured.pairUrl : null,
    liquidityUsd: featured ? featured.liquidityUsd : null,
    volume24hUsd: featured ? featured.volume24hUsd : null,
    issuedAt: report.issuedAt,
  };
}

function isValidStoredReport(report, expectedDate) {
  return Boolean(
    report &&
    report.schemaVersion === 1 &&
    report.issueDate === expectedDate &&
    typeof report.issuedAt === "string" &&
    typeof report.title === "string" &&
    typeof report.standfirst === "string" &&
    report.counts &&
    Array.isArray(report.sections) &&
    Array.isArray(report.methodology) &&
    Array.isArray(report.sources)
  );
}

async function writeFileAtomically(filePath, content) {
  const temporaryPath = filePath + "." + randomUUID() + ".tmp";
  try {
    await writeFile(temporaryPath, content, { encoding: "utf8", flag: "wx" });
    await rename(temporaryPath, filePath);
  } catch (error) {
    try {
      await unlink(temporaryPath);
    } catch {
      // The temporary file may not have been created or may already have been renamed.
    }
    throw error;
  }
}

async function readIndex(indexPath) {
  try {
    const parsed = JSON.parse(await readFile(indexPath, "utf8"));
    if (!parsed || parsed.schemaVersion !== 1 || !Array.isArray(parsed.reports)) {
      return { index: { schemaVersion: 1, reports: [] }, needsRebuild: true };
    }
    return { index: parsed, needsRebuild: false };
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return { index: { schemaVersion: 1, reports: [] }, needsRebuild: true };
    }
    if (error instanceof SyntaxError) {
      return { index: { schemaVersion: 1, reports: [] }, needsRebuild: true };
    }
    throw error;
  }
}

async function rebuildIndexFromReports(contentDir, logger = console) {
  const entries = [];
  const files = await readdir(contentDir);
  for (const fileName of files) {
    if (!/^\d{4}-\d{2}-\d{2}\.json$/.test(fileName)) continue;
    const date = fileName.slice(0, 10);
    try {
      const report = JSON.parse(await readFile(join(contentDir, fileName), "utf8"));
      if (!isValidStoredReport(report, date)) {
        logger.warn("Skipping invalid archived report while rebuilding index: " + fileName);
        continue;
      }
      entries.push(reportIndexEntry(report));
    } catch (error) {
      logger.warn("Skipping unreadable archived report while rebuilding index: " + fileName, error);
    }
  }
  return entries.sort((a, b) => b.issueDate.localeCompare(a.issueDate));
}

async function reconcileIndex({ index, needsRebuild, report, contentDir, indexPath, now, logger }) {
  const baseReports = needsRebuild
    ? await rebuildIndexFromReports(contentDir, logger)
    : index.reports;
  const entry = reportIndexEntry(report);
  const previous = baseReports.find((item) => item && item.issueDate === report.issueDate);
  const entryChanged = JSON.stringify(previous) !== JSON.stringify(entry);
  if (!needsRebuild && !entryChanged) {
    return { ...index, reports: baseReports };
  }

  const reports = [entry, ...baseReports.filter((item) => item && item.issueDate !== report.issueDate)]
    .sort((a, b) => b.issueDate.localeCompare(a.issueDate));
  const updatedIndex = {
    schemaVersion: 1,
    updatedAt: now.toISOString(),
    reports,
  };
  await writeFileAtomically(indexPath, JSON.stringify(updatedIndex, null, 2) + "\n");
  logger.log("Reconciled the daily Onchain archive index for " + report.issueDate + ".");
  return updatedIndex;
}

export async function publishDailyReport({
  now = new Date(),
  contentDir = CONTENT_DIR,
  fetchJsonImpl = fetchJson,
  logger = console,
} = {}) {
  await mkdir(contentDir, { recursive: true });
  const indexPath = join(contentDir, "index.json");
  const date = localIssueDate(now);
  const reportPath = join(contentDir, date + ".json");
  const indexState = await readIndex(indexPath);
  const index = indexState.needsRebuild
    ? { schemaVersion: 1, reports: await rebuildIndexFromReports(contentDir, logger) }
    : indexState.index;

  let existingContent = null;
  try {
    existingContent = await readFile(reportPath, "utf8");
  } catch (error) {
    if (!error || error.code !== "ENOENT") throw error;
  }

  if (existingContent !== null) {
    let existingReport;
    try {
      existingReport = JSON.parse(existingContent);
    } catch (error) {
      throw new Error("An existing daily report is not valid JSON; refusing to overwrite it: " + reportPath, { cause: error });
    }
    if (!isValidStoredReport(existingReport, date)) {
      throw new Error("An existing daily report failed schema validation; refusing to overwrite it: " + reportPath);
    }
    await reconcileIndex({
      index,
      needsRebuild: indexState.needsRebuild,
      report: existingReport,
      contentDir,
      indexPath,
      now,
      logger,
    });
    logger.log("An on-chain report already exists for " + date + "; verified and reconciled the archive index.");
    return { status: "existing", report: existingReport };
  }

  const [profileFeed, takeoverFeed] = await Promise.all([
    fetchJsonImpl(API + "/token-profiles/latest/v1"),
    fetchJsonImpl(API + "/community-takeovers/latest/v1"),
  ]);
  if (!Array.isArray(profileFeed) || !Array.isArray(takeoverFeed)) {
    throw new Error("DEX Screener returned an unexpected discovery-feed format; refusing to publish an incomplete report.");
  }
  if (profileFeed.length === 0 && takeoverFeed.length === 0) {
    throw new Error("Both Solana discovery feeds returned zero records; refusing to interpret an empty feed as a quiet market day.");
  }

  const profiles = profileMapFromFeeds(profileFeed, takeoverFeed);
  const addresses = Array.from(profiles.values()).slice(0, 30).map((profile) => profile.tokenAddress);
  if (addresses.length === 0) {
    throw new Error("No Solana token profiles were available in the discovery feeds; refusing to publish a quiet-day report.");
  }

  const pairPayload = await fetchJsonImpl(API + "/tokens/v1/solana/" + addresses.join(","));
  const pairs = Array.isArray(pairPayload)
    ? pairPayload
    : (pairPayload && Array.isArray(pairPayload.pairs) ? pairPayload.pairs : null);
  if (!pairs) {
    throw new Error("DEX Screener returned an unexpected pair-snapshot format; refusing to publish an incomplete report.");
  }

  const candidates = makePairRows(pairs, profiles, now);
  const qualifying = candidates.filter(isQualifyingCandidate);
  const recentCutoff = new Date(now.getTime() - RECENT_FEATURE_DAYS * 86400000);
  const recentlyFeatured = new Set(
    index.reports
      .filter((entry) => entry && entry.featuredTokenAddress && entry.issueDate >= localIssueDate(recentCutoff))
      .map((entry) => String(entry.featuredTokenAddress).toLowerCase())
  );
  const freshQualifying = qualifying.filter((candidate) => !recentlyFeatured.has(candidate.address.toLowerCase()));
  const selected = freshQualifying[0] || null;
  const repeatAvoided = qualifying.length > 0 && freshQualifying.length === 0;
  const issuedAt = now.toISOString();
  const counts = {
    discoveryProfiles: profileFeed.length,
    solanaProfiles: profileFeed.filter((item) => item && item.chainId === "solana").length,
    solanaTakeovers: takeoverFeed.filter((item) => item && item.chainId === "solana").length,
    profilesChecked: addresses.length,
    pairsReturned: pairs.length,
    candidatePairs: candidates.length,
    qualifyingCandidates: qualifying.length,
    freshQualifyingCandidates: freshQualifying.length,
  };

  const report = buildArticle(date, issuedAt, counts, candidates, selected, repeatAvoided);
  await writeFileAtomically(reportPath, JSON.stringify(report, null, 2) + "\n");

  const updatedIndex = {
    schemaVersion: 1,
    updatedAt: issuedAt,
    reports: [reportIndexEntry(report), ...index.reports.filter((item) => item && item.issueDate !== date)]
      .sort((a, b) => b.issueDate.localeCompare(a.issueDate)),
  };
  await writeFileAtomically(indexPath, JSON.stringify(updatedIndex, null, 2) + "\n");

  logger.log("Published " + date + ": " + report.title);
  logger.log("Profiles: " + counts.solanaProfiles + " / pairs: " + counts.pairsReturned +
    " / qualifying candidates: " + counts.qualifyingCandidates);
  if (selected) logger.log("Featured pair: " + selected.name + " (" + selected.symbol + ") " + selected.pairUrl);
  return { status: "published", report };
}

async function main() {
  await publishDailyReport();
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error("Daily on-chain publication failed:", error);
    process.exitCode = 1;
  });
}
