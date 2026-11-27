import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

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

function numberOrZero(value) {
  const number = typeof value === "string" ? Number(value) : Number(value);
  return Number.isFinite(number) ? number : 0;
}

function nullableNumber(value) {
  if (value === null || value === undefined || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
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

async function readIndex() {
  try {
    const parsed = JSON.parse(await readFile(INDEX_PATH, "utf8"));
    if (!parsed || !Array.isArray(parsed.reports)) throw new Error("Invalid on-chain index format.");
    return parsed;
  } catch (error) {
    if (error && error.code === "ENOENT") return { schemaVersion: 1, reports: [] };
    throw error;
  }
}

function profileMapFromFeeds(profileFeed, takeoverFeed) {
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

function makePairRows(pairs, profiles, now) {
  const bestByToken = new Map();

  for (const pair of pairs) {
    if (!pair || pair.chainId !== "solana" || !pair.baseToken || !pair.baseToken.address) continue;
    const profile = profiles.get(String(pair.baseToken.address).toLowerCase());
    if (!profile) continue;

    const liquidityUsd = numberOrZero(pair.liquidity && pair.liquidity.usd);
    const volume24hUsd = numberOrZero(pair.volume && pair.volume.h24);
    const buys24h = numberOrZero(pair.txns && pair.txns.h24 && pair.txns.h24.buys);
    const sells24h = numberOrZero(pair.txns && pair.txns.h24 && pair.txns.h24.sells);
    const totalTransactions24h = buys24h + sells24h;
    const pairCreatedAt = nullableNumber(pair.pairCreatedAt);
    const ageHours = pairCreatedAt
      ? Math.max(0, (now.getTime() - pairCreatedAt) / 3600000)
      : null;
    const buySharePct = totalTransactions24h > 0
      ? rounded((buys24h / totalTransactions24h) * 100, 1)
      : null;
    const volumeLiquidityRatio = liquidityUsd > 0 ? rounded(volume24hUsd / liquidityUsd, 2) : null;

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
      pairCreatedAt: pairCreatedAt ? new Date(pairCreatedAt).toISOString() : null,
      ageHours: ageHours === null ? null : rounded(ageHours, 1),
    };

    const key = row.address.toLowerCase();
    const existing = bestByToken.get(key);
    if (!existing || row.liquidityUsd > existing.liquidityUsd ||
      (row.liquidityUsd === existing.liquidityUsd && row.volume24hUsd > existing.volume24hUsd)) {
      bestByToken.set(key, row);
    }
  }

  return Array.from(bestByToken.values())
    .sort((a, b) => b.volume24hUsd - a.volume24hUsd);
}

function buildArticle(date, issuedAt, counts, candidates, selected, repeatAvoided) {
  const sourceSummary = "DEX Screener public API; Solana token profiles, community-takeover notices and pair snapshots. The Department supplies the attitude, not the numbers.";
  if (selected) {
    const priceChange = selected.priceChange24hPct;
    const severeDrop = priceChange !== null && priceChange <= -50;
    const notableDrop = priceChange !== null && priceChange <= -20;
    const sharpRise = priceChange !== null && priceChange >= 50;
    const highTurnover = selected.volumeLiquidityRatio !== null && selected.volumeLiquidityRatio >= 50;
    const buyShare = selected.buySharePct;
    const hasTransactionCounts = selected.totalTransactions24h > 0;

    const title = severeDrop && highTurnover
      ? "$" + selected.symbol + ": THE LIQUIDITY HAS ENTERED WITNESS PROTECTION"
      : severeDrop
        ? "$" + selected.symbol + ": THIS IS NOT WHAT THEY MEANT BY HOLD"
        : sharpRise && selected.liquidityUsd < 10000
          ? "$" + selected.symbol + ": THE GREEN CANDLE HAS SMALL PRINT"
          : highTurnover
            ? "$" + selected.symbol + ": VOLUME IS DOING LAPS AROUND THE POOL"
            : "$" + selected.symbol + ": THE DEPARTMENT HAS QUESTIONS";

    const priceDescription = priceChange === null
      ? "The API did not report a 24-hour price change."
      : "The reported 24-hour price move was " + signedPercent(priceChange) + ".";
    const priceComment = severeDrop
      ? "A " + signedPercent(priceChange) + " day is not a little wobble. The phrase 'healthy correction' has been asked to leave the building until it can produce documentation."
      : notableDrop
        ? "The quote is down " + signedPercent(priceChange) + ". Anyone calling that 'just shaking out weak hands' is welcome to submit the claim in triplicate."
        : sharpRise
          ? "The quote is up " + signedPercent(priceChange) + ". Enjoy the green candle, but do not promote it to head of risk management."
          : priceChange !== null && priceChange > 0
            ? "The quote is green by " + signedPercent(priceChange) + ". A positive print is a data point, not a character reference."
            : priceChange !== null
              ? "The quote is slightly red at " + signedPercent(priceChange) + ". The Department declines to call this a trend from one snapshot."
              : "No 24-hour price change was supplied, so the Department will not invent a chart narrative.";

    const ratioSummary = selected.volumeLiquidityRatio === null
      ? "A volume-to-liquidity ratio cannot be calculated from this snapshot because usable displayed liquidity was not reported."
      : "Trailing 24-hour volume was " + selected.volumeLiquidityRatio.toFixed(2) +
        " times displayed pool liquidity. That measures turnover against a liquidity snapshot; it is not net inflow, cash reserves or the amount waiting politely to buy your bag.";
    const turnoverComment = highTurnover
      ? "The volume number is doing laps around the liquidity number. That can describe a very active pair, but it does not mean the pool contains that much money or can absorb an exit of the same size. The Department would like these two nouns kept in separate departments."
      : "Volume tells us how much trading activity was recorded; displayed liquidity is a snapshot of the pool. Neither number, by itself, tells us how much a particular holder could sell without affecting price.";

    const tradeSummary = hasTransactionCounts
      ? "The pair recorded " + selected.buys24h.toLocaleString("en-US") + " buys and " +
        selected.sells24h.toLocaleString("en-US") + " sells: " +
        selected.totalTransactions24h.toLocaleString("en-US") + " recorded transactions in total."
      : "The API did not supply a usable 24-hour buy/sell transaction count.";
    const buyShareSummary = buyShare === null
      ? "No buy-share percentage can be calculated from the supplied transaction counts."
      : buyShare.toFixed(1) + "% of recorded transactions were buys and " +
        (100 - buyShare).toFixed(1) + "% were sells. These are transaction counts, not unique people, wallet counts or trade-size-weighted flows.";
    const flowComment = buyShare === null
      ? "The Department cannot infer who was in control of the flow from missing counts."
      : buyShare >= 60
        ? "Buy transactions outnumbered sells by a wide margin. That still does not reveal trade sizes, unique traders or whether the buyers are now enjoying the view from underwater."
        : buyShare > 50
          ? "There were slightly more buy transactions than sells. Yet transaction count does not measure conviction, capital or trade size. The buy button is not a personality test."
          : buyShare <= 40
            ? "Sell transactions outnumbered buys. That is a count of executions, not proof that every seller escaped or every buyer is doomed."
            : "The transaction count was relatively balanced. A balanced queue is not the same thing as a healthy market; the chart and liquidity still deserve their own questions.";

    const ageSummary = selected.ageHours === null
      ? "The API did not provide a pool creation timestamp."
      : "The pool was approximately " + selected.ageHours + " hours old at collection time.";
    const discoverySummary = selected.discoveryType === "COMMUNITY TAKEOVER"
      ? "The discovery feed labels this profile COMMUNITY TAKEOVER. That is a provider-supplied discovery label, not independently verified proof of who controls the project or its keys. The Department has not been given the ceremonial handover paperwork."
      : "The discovery feed labels this a NEW DEX PROFILE. That tells us how it entered this feed, not whether the project is new, safe, original or destined for anything.";

    const standfirst = selected.name + " brought " + money(selected.volume24hUsd) +
      " in reported 24-hour pair volume to a pool showing " + money(selected.liquidityUsd) +
      " in liquidity. The quoted price move was " + signedPercent(priceChange) +
      ". The Department has opened a case file, not a fan club.";

    const sections = [
      {
        heading: "THE NUMBERS ARE IN. CT IS STILL OUTSIDE.",
        paragraphs: [
          "At " + issuedAt + " UTC, the selected " + selected.dexId + " pair showed " +
            money(selected.liquidityUsd) + " in displayed liquidity and " +
            money(selected.volume24hUsd) + " in trailing 24-hour volume. The quoted token price was " +
            (selected.priceUsd === null ? "not reported" : "$" + selected.priceUsd.toPrecision(6)) +
            ". These are provider snapshots. We accept the figures; the victory laps can wait.",
          ageSummary + " " + discoverySummary,
        ],
      },
      {
        heading: "BUYERS, SELLERS & THE GROUP CHAT LAWYER.",
        paragraphs: [
          tradeSummary + " " + buyShareSummary,
          priceDescription + " " + priceComment + " " + flowComment,
        ],
      },
      {
        heading: "THE DEPARTMENT'S UNOFFICIAL VERDICT.",
        paragraphs: [
          ratioSummary,
          turnoverComment,
          "This is one selected pair from a limited discovery sample, not a ranking of Solana, a token safety inspection or proof of organic demand. The Department has a clipboard, not a crystal ball.",
        ],
      },
      {
        heading: "WHAT THE DATA DOES NOT KNOW (A LOT).",
        paragraphs: [
          "These pair statistics do not identify unique traders, beneficial owners, wallet clusters, deployer intent, coordinated activity or who is posting rocket emojis. Buy/sell counts are not a count of distinct wallets.",
          "Liquidity, volume and price can change immediately after collection. This report is an evidence-led roast of an observed market snapshot, not a safety audit or trading recommendation. DYOR means checking the receipts, not outsourcing your decisions to a headline.",
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
      classification: "OBSERVED SOLANA DEX ACTIVITY / DEPARTMENT COMMENTARY",
      sourceSummary,
      counts,
      featuredToken: selected,
      observations: candidates.filter((candidate) => candidate.address.toLowerCase() !== selected.address.toLowerCase()).slice(0, 3),
      sections,
      methodology: [
        "Discovery sample: latest Solana token profiles and latest community-takeover notices supplied by DEX Screener.",
        "Pair selection: highest displayed liquidity among returned pairs for each discovered token.",
        "Feature threshold: at least $5,000 displayed liquidity, $5,000 trailing 24-hour volume and 20 recorded buys plus sells.",
        "To vary the daily archive, a token featured during the previous seven issues is skipped when another qualifying candidate exists.",
        "The featured item is selected by reported 24-hour pair volume among candidates that pass the threshold; it is not a quality or investment score.",
        "Satirical commentary is selected from explicit metric conditions. It does not add wallet identities, motives, causes or other facts not present in the source snapshot.",
      ],
      sources: [
        { label: "Featured DEX pair", url: selected.pairUrl },
        { label: "DEX Screener API documentation", url: DOCS_URL },
      ],
    };
  }

  const topCandidate = candidates[0] || null;
  const title = repeatAvoided
    ? "THE SAME CANDIDATES AGAIN. THE DESK SAID NEXT."
    : "THE MARKET HAS LEFT THE DEPARTMENT ON READ.";
  const standfirst = "The Department checked the latest Solana discovery feeds and the returned DEX pairs. Nobody cleared every publication threshold today, so we filed the paperwork instead of inventing a breakout. Even our content calendar has standards.";

  const sections = [
    {
      heading: "THE INTAKE WINDOW.",
      paragraphs: [
        "The feed supplied " + counts.solanaProfiles + " Solana token profiles, " +
          counts.solanaTakeovers + " community-takeover notices and " + counts.pairsReturned +
          " DEX pair records. " + counts.candidatePairs + " unique tokens had a usable pair snapshot. The inbox is busy; the shortlist is not automatically impressive.",
        "To make the front page, a candidate needed at least $5,000 displayed liquidity, $5,000 trailing 24-hour volume and 20 recorded buys plus sells. " +
          counts.qualifyingCandidates + " candidates passed those three gates before the recent-feature repeat filter.",
      ],
    },
    {
      heading: "WHY NOBODY GOT A FRONT-PAGE PHOTO.",
      paragraphs: [
        repeatAvoided
          ? "There were qualifying candidates, but every one had already appeared in the previous seven issues. The Department refuses to rebrand yesterday's guest as today's breaking discovery."
          : "No candidate in this limited sample passed every threshold. That does not mean Solana was quiet; it means this particular intake did not produce a feature that met our minimum evidence rules. The market is not obliged to feed our editorial calendar.",
        topCandidate
          ? "The highest-volume observed pair in the sample was " + topCandidate.name + " ($" +
            topCandidate.symbol + "), with " + money(topCandidate.liquidityUsd) +
            " displayed liquidity and " + money(topCandidate.volume24hUsd) +
            " trailing 24-hour volume. It did not clear every publication gate. A loud room is not automatically a good story."
          : "No pair with a usable snapshot was returned. The Department will not interview an empty chart.",
      ],
    },
    {
      heading: "THE DEPARTMENT'S UNOFFICIAL VERDICT.",
      paragraphs: [
        "No forced pick, no manufactured alpha and no intern ordered to describe a missing signal as 'stealth accumulation'. The report will try again on the next scheduled issue.",
        "The figures are limited to the returned discovery sample. No wallet ownership, holder concentration, token safety, deployer intent or investment quality was assessed.",
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
    classification: "NO QUALIFYING FEATURE IN THE DISCOVERY SAMPLE",
    sourceSummary,
    counts,
    featuredToken: null,
    observations: candidates.slice(0, 3),
    sections,
    methodology: [
      "Discovery sample: latest Solana token profiles and latest community-takeover notices supplied by DEX Screener.",
      "Pair selection: highest displayed liquidity among returned pairs for each discovered token.",
      "Feature threshold: at least $5,000 displayed liquidity, $5,000 trailing 24-hour volume and 20 recorded buys plus sells.",
      "A missing feature is published as a quiet-day report; no market event is invented to fill the slot.",
      "Satirical commentary is selected from the observed sample and does not add unsupported claims.",
    ],
    sources: [{ label: "DEX Screener API documentation", url: DOCS_URL }],
  };
}

async function main() {
  const date = localIssueDate();
  await mkdir(CONTENT_DIR, { recursive: true });
  const index = await readIndex();
  const reportPath = join(CONTENT_DIR, date + ".json");

  try {
    await readFile(reportPath, "utf8");
    console.log("An on-chain report already exists for " + date + "; nothing to do.");
    return;
  } catch (error) {
    if (!error || error.code !== "ENOENT") throw error;
  }

  const [profileFeed, takeoverFeed] = await Promise.all([
    fetchJson(API + "/token-profiles/latest/v1"),
    fetchJson(API + "/community-takeovers/latest/v1"),
  ]);
  if (!Array.isArray(profileFeed) || !Array.isArray(takeoverFeed)) {
    throw new Error("DEX Screener returned an unexpected discovery-feed format.");
  }

  const profiles = profileMapFromFeeds(profileFeed, takeoverFeed);
  const addresses = Array.from(profiles.values()).slice(0, 30).map((profile) => profile.tokenAddress);
  let pairPayload = [];
  if (addresses.length > 0) {
    pairPayload = await fetchJson(API + "/tokens/v1/solana/" + addresses.join(","));
  }
  const pairs = Array.isArray(pairPayload)
    ? pairPayload
    : (pairPayload && Array.isArray(pairPayload.pairs) ? pairPayload.pairs : []);
  const now = new Date();
  const candidates = makePairRows(pairs, profiles, now);
  const qualifying = candidates.filter((candidate) =>
    candidate.liquidityUsd >= MIN_LIQUIDITY_USD &&
    candidate.volume24hUsd >= MIN_VOLUME_24H_USD &&
    candidate.totalTransactions24h >= MIN_TRANSACTIONS_24H
  );

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
  await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n", "utf8");

  const entry = {
    issueDate: date,
    path: "content/onchain/" + date + ".json",
    title: report.title,
    standfirst: report.standfirst,
    classification: report.classification,
    featuredSymbol: selected ? selected.symbol : null,
    featuredTokenAddress: selected ? selected.address : null,
    pairUrl: selected ? selected.pairUrl : null,
    liquidityUsd: selected ? selected.liquidityUsd : null,
    volume24hUsd: selected ? selected.volume24hUsd : null,
    issuedAt,
  };
  const reports = [entry, ...index.reports.filter((item) => item && item.issueDate !== date)]
    .sort((a, b) => b.issueDate.localeCompare(a.issueDate));
  const updatedIndex = {
    schemaVersion: 1,
    updatedAt: issuedAt,
    reports,
  };
  await writeFile(INDEX_PATH, JSON.stringify(updatedIndex, null, 2) + "\n", "utf8");

  console.log("Published " + date + ": " + report.title);
  console.log("Profiles: " + counts.solanaProfiles + " / pairs: " + counts.pairsReturned +
    " / qualifying candidates: " + counts.qualifyingCandidates);
  if (selected) console.log("Featured pair: " + selected.name + " (" + selected.symbol + ") " + selected.pairUrl);
}

main().catch((error) => {
  console.error("Daily on-chain publication failed:", error);
  process.exitCode = 1;
});
