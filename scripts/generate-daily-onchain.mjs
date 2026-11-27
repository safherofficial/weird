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
  const sourceSummary = "DEX Screener public API; Solana token profiles, community-takeover notices and pair snapshots.";
  if (selected) {
    const buySummary = selected.buySharePct === null
      ? "No 24-hour buy/sell transaction counts were supplied."
      : selected.buySharePct.toFixed(1) + "% of the recorded buy/sell transactions were buys and " +
        (100 - selected.buySharePct).toFixed(1) + "% were sells. These are transaction counts, not unique wallets.";
    const ratioSummary = selected.volumeLiquidityRatio === null
      ? "The pool did not report enough liquidity data to calculate a volume-to-liquidity ratio."
      : "Reported 24-hour volume was " + selected.volumeLiquidityRatio.toFixed(2) +
        " times the displayed pool liquidity. This is turnover relative to a snapshot of liquidity, not net inflow.";
    const ageSummary = selected.ageHours === null
      ? "The API did not provide a pool creation timestamp."
      : "The pool was approximately " + selected.ageHours + " hours old at collection time.";
    const priceSummary = "The reported 1-hour price change was " + signedPercent(selected.priceChange1hPct) +
      " and the 24-hour change was " + signedPercent(selected.priceChange24hPct) + ".";
    const title = "$" + selected.symbol + ": THE LIQUIDITY CHECK";
    const standfirst = selected.name + " appeared in the latest Solana discovery feed. The Department checked the most liquid reported pair, its recent trading activity and the limits of what those numbers can prove.";
    const sections = [
      {
        heading: "WHAT THE TAPE SAYS",
        paragraphs: [
          "At " + issuedAt + " UTC, the selected " + selected.dexId + " pair reported " +
          money(selected.liquidityUsd) + " in displayed liquidity and " + money(selected.volume24hUsd) +
          " in trailing 24-hour volume. The quoted token price was " +
          (selected.priceUsd === null ? "not reported" : "$" + selected.priceUsd.toPrecision(6)) + ".",
          ageSummary + " Discovery label: " + selected.discoveryType.toLowerCase() + ".",
        ],
      },
      {
        heading: "BUYERS, SELLERS AND THE CHATTER",
        paragraphs: [
          "The pair recorded " + selected.buys24h.toLocaleString("en-US") + " buys and " +
          selected.sells24h.toLocaleString("en-US") + " sells in the trailing 24 hours (" +
          selected.totalTransactions24h.toLocaleString("en-US") + " transactions in total). " + buySummary,
          priceSummary,
        ],
      },
      {
        heading: "THE DEPARTMENT'S READ",
        paragraphs: [
          ratioSummary,
          selected.totalTransactions24h >= 100
            ? "The pair had a measurable flow of recorded swaps during the observation window. Activity alone does not establish organic demand, holder growth or sustainable liquidity."
            : "Recorded transaction count remained limited in the observation window. A small sample can move percentage metrics sharply, so the Department refuses to turn it into a grand thesis.",
          "This is a snapshot of one selected pair from a limited discovery sample, not a ranking of the best tokens on Solana.",
        ],
      },
      {
        heading: "WHAT WE CANNOT CLAIM",
        paragraphs: [
          "DEX pair statistics do not identify unique traders, beneficial owners, wallet clusters, deployer intent or coordinated activity. Buy/sell counts are not a count of distinct wallets.",
          "Liquidity, volume and price can change immediately after collection. This report is an editorial observation, not a token review, a safety assessment or a trading recommendation.",
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
      classification: "OBSERVED SOLANA DEX ACTIVITY",
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
      ],
      sources: [
        { label: "Featured DEX pair", url: selected.pairUrl },
        { label: "DEX Screener API documentation", url: DOCS_URL },
      ],
    };
  }

  const topCandidate = candidates[0] || null;
  const title = repeatAvoided
    ? "NO FRESH POOL CLEARED THE DESK."
    : "NO QUALIFYING PAIR IN TODAY'S SAMPLE.";
  const standfirst = "The Department checked the latest Solana discovery feeds and the returned DEX pairs. No new candidate met the minimum publication threshold today; the report records that result rather than inventing a breakout.";
  const sections = [
    {
      heading: "WHAT WAS CHECKED",
      paragraphs: [
        "The intake contained " + counts.solanaProfiles + " Solana token profiles, " +
        counts.solanaTakeovers + " community-takeover notices and " + counts.pairsReturned +
        " returned DEX pairs. " + counts.candidatePairs + " unique tokens had a usable pair snapshot.",
        "The minimum feature threshold was $5,000 displayed liquidity, $5,000 trailing 24-hour volume and at least 20 recorded buys plus sells. " +
        counts.qualifyingCandidates + " candidates met all three conditions before the recent-feature repeat filter.",
      ],
    },
    {
      heading: "WHY THERE IS NO FEATURE",
      paragraphs: [
        repeatAvoided
          ? "Eligible candidates existed, but all had already appeared in the previous seven issues. The archive avoids republishing the same token as a new discovery."
          : "No token in the collected sample passed every threshold. This does not mean that Solana had no trading activity; it means this limited discovery sample did not produce a publishable feature.",
        topCandidate
          ? "The highest-volume observed pair in the sample was " + topCandidate.name + " ($" +
            topCandidate.symbol + "), with " + money(topCandidate.liquidityUsd) + " displayed liquidity and " +
            money(topCandidate.volume24hUsd) + " trailing 24-hour volume. It did not clear all publication criteria."
          : "No pair with a usable snapshot was returned for the current discovery sample.",
      ],
    },
    {
      heading: "THE DEPARTMENT'S READ",
      paragraphs: [
        "A quiet desk is better than a fabricated signal. The report will try again on the next scheduled issue.",
        "No token safety, holder concentration, wallet ownership or investment quality was assessed.",
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
