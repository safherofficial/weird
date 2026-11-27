import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, unlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

const {
  buildArticle,
  isQualifyingCandidate,
  makePairRows,
  profileMapFromFeeds,
  publishDailyReport,
} = await import("../scripts/generate-daily-onchain.mjs");

const now = new Date("2026-11-27T10:00:00.000Z");
const address = "TokenAddress1111111111111111111111111111111";

function pair(overrides = {}) {
  return {
    chainId: "solana",
    dexId: "pumpswap",
    url: "https://dexscreener.com/solana/pair-address",
    pairAddress: "PairAddress111111111111111111111111111111",
    baseToken: { address, name: "HOLD", symbol: "HOLD" },
    priceUsd: "0.001",
    liquidity: { usd: 6000 },
    volume: { h24: 200000 },
    txns: { h24: { buys: 120, sells: 80 } },
    priceChange: { h1: -9, h24: -71 },
    marketCap: 9000,
    fdv: 9000,
    pairCreatedAt: now.getTime() - 48 * 60 * 60 * 1000,
    ...overrides,
  };
}

function logger() {
  return { log() {}, warn() {} };
}

async function makeTempContentDir() {
  return mkdtemp(path.join(os.tmpdir(), "weird-onchain-test-"));
}

function fakeFetch({ profiles, takeovers = [], pairs }) {
  return async (url) => {
    if (url.includes("/token-profiles/latest/v1")) return profiles;
    if (url.includes("/community-takeovers/latest/v1")) return takeovers;
    if (url.includes("/tokens/v1/solana/")) return pairs;
    throw new Error("Unexpected test URL: " + url);
  };
}

test("missing and invalid market fields remain unavailable rather than becoming zero", () => {
  const profiles = profileMapFromFeeds([{ chainId: "solana", tokenAddress: address }], []);
  const rows = makePairRows([
    pair({
      liquidity: {},
      volume: { h24: "not-a-number" },
      txns: { h24: { buys: 10 } },
    }),
    pair({
      baseToken: { address: "TokenZero11111111111111111111111111111111", name: "ZERO", symbol: "ZERO" },
      liquidity: { usd: 0 },
      volume: { h24: 0 },
      txns: { h24: { buys: 0, sells: 0 } },
    }),
  ], new Map([
    ...profiles,
    ["tokenzero11111111111111111111111111111111", {
      tokenAddress: "TokenZero11111111111111111111111111111111",
      profileUrl: null,
      description: "",
      discoveryType: "NEW DEX PROFILE",
      claimDate: null,
    }],
  ]), now);

  const unavailable = rows.find((row) => row.address === address);
  assert.equal(unavailable.liquidityUsd, null);
  assert.equal(unavailable.volume24hUsd, null);
  assert.equal(unavailable.buys24h, 10);
  assert.equal(unavailable.sells24h, null);
  assert.equal(unavailable.totalTransactions24h, null);
  assert.equal(isQualifyingCandidate(unavailable), false);

  const zero = rows.find((row) => row.symbol === "ZERO");
  assert.equal(zero.liquidityUsd, 0);
  assert.equal(zero.volume24hUsd, 0);
  assert.equal(zero.totalTransactions24h, 0);
  assert.equal(zero.buySharePct, null);
  assert.equal(isQualifyingCandidate(zero), false);
});

test("qualified candidates require all threshold fields to be present", () => {
  const profiles = profileMapFromFeeds([{ chainId: "solana", tokenAddress: address }], []);
  const [candidate] = makePairRows([pair()], profiles, now);
  assert.equal(isQualifyingCandidate(candidate), true);

  assert.equal(isQualifyingCandidate({ ...candidate, liquidityUsd: null }), false);
  assert.equal(isQualifyingCandidate({ ...candidate, volume24hUsd: null }), false);
  assert.equal(isQualifyingCandidate({ ...candidate, totalTransactions24h: null }), false);
});

test("featured article is detailed, metric-led and avoids duplicated market-cap wording", () => {
  const profiles = profileMapFromFeeds([{ chainId: "solana", tokenAddress: address }], []);
  const [candidate] = makePairRows([pair()], profiles, now);
  const counts = {
    discoveryProfiles: 1,
    solanaProfiles: 1,
    solanaTakeovers: 0,
    profilesChecked: 1,
    pairsReturned: 1,
    candidatePairs: 1,
    qualifyingCandidates: 1,
    freshQualifyingCandidates: 1,
  };
  const report = buildArticle("2026-11-27", now.toISOString(), counts, [candidate], candidate, false);
  const copy = [report.title, report.standfirst, ...report.sections.flatMap((section) => [section.heading, ...section.paragraphs])].join(" ");

  assert.equal(report.sections.length, 7);
  assert.match(report.title, /-71\.00%/);
  assert.match(copy, /reported market cap/);
  assert.doesNotMatch(copy, /reported reported market cap/);
  assert.match(copy, /Turnover was high relative to displayed pool liquidity/i);
  assert.match(copy, /transaction counts/i);
});

test("empty discovery feeds fail closed instead of creating a fake quiet-day report", async () => {
  const contentDir = await makeTempContentDir();
  try {
    await assert.rejects(
      publishDailyReport({
        now,
        contentDir,
        fetchJsonImpl: fakeFetch({ profiles: [], takeovers: [], pairs: [] }),
        logger: logger(),
      }),
      /Both Solana discovery feeds returned zero records/
    );
    assert.deepEqual(await readdir(contentDir), []);
  } finally {
    await rm(contentDir, { recursive: true, force: true });
  }
});

test("discovery feeds with no Solana profiles fail instead of claiming no qualifying tokens", async () => {
  const contentDir = await makeTempContentDir();
  try {
    await assert.rejects(
      publishDailyReport({
        now,
        contentDir,
        fetchJsonImpl: fakeFetch({
          profiles: [{ chainId: "ethereum", tokenAddress: "NotSolana" }],
          takeovers: [],
          pairs: [],
        }),
        logger: logger(),
      }),
      /No Solana token profiles were available/
    );
    assert.deepEqual(await readdir(contentDir), []);
  } finally {
    await rm(contentDir, { recursive: true, force: true });
  }
});

test("malformed pair payloads and provider failures do not produce reports", async () => {
  const contentDir = await makeTempContentDir();
  try {
    await assert.rejects(
      publishDailyReport({
        now,
        contentDir,
        fetchJsonImpl: fakeFetch({
          profiles: [{ chainId: "solana", tokenAddress: address }],
          takeovers: [],
          pairs: { unexpected: true },
        }),
        logger: logger(),
      }),
      /unexpected pair-snapshot format/
    );
    assert.deepEqual(await readdir(contentDir), []);

    await assert.rejects(
      publishDailyReport({
        now,
        contentDir,
        fetchJsonImpl: async () => { throw new Error("simulated provider outage"); },
        logger: logger(),
      }),
      /simulated provider outage/
    );
    assert.deepEqual(await readdir(contentDir), []);
  } finally {
    await rm(contentDir, { recursive: true, force: true });
  }
});

test("an existing report repairs a missing archive index without refetching data", async () => {
  const contentDir = await makeTempContentDir();
  const profiles = [{ chainId: "solana", tokenAddress: address }];
  try {
    const published = await publishDailyReport({
      now,
      contentDir,
      fetchJsonImpl: fakeFetch({ profiles, pairs: [pair()] }),
      logger: logger(),
    });
    assert.equal(published.status, "published");

    const reportPath = path.join(contentDir, "2026-11-27.json");
    const report = JSON.parse(await readFile(reportPath, "utf8"));

    const previous = structuredClone(report);
    previous.issueDate = "2026-11-26";
    previous.issuedAt = "2026-11-26T10:00:00.000Z";
    await writeFile(path.join(contentDir, "2026-11-26.json"), JSON.stringify(previous, null, 2));
    await unlink(path.join(contentDir, "index.json"));

    const recovered = await publishDailyReport({
      now,
      contentDir,
      fetchJsonImpl: async () => { throw new Error("existing report should skip provider fetches"); },
      logger: logger(),
    });
    assert.equal(recovered.status, "existing");

    const index = JSON.parse(await readFile(path.join(contentDir, "index.json"), "utf8"));
    assert.deepEqual(index.reports.map((entry) => entry.issueDate), ["2026-11-27", "2026-11-26"]);
    assert.equal(index.reports[0].title, report.title);
    assert.equal(index.reports[0].featuredTokenAddress, address);
  } finally {
    await rm(contentDir, { recursive: true, force: true });
  }
});

test("a successful empty pair snapshot creates an explicitly scoped no-feature issue", async () => {
  const contentDir = await makeTempContentDir();
  try {
    const result = await publishDailyReport({
      now,
      contentDir,
      fetchJsonImpl: fakeFetch({
        profiles: [{ chainId: "solana", tokenAddress: address }],
        takeovers: [],
        pairs: [],
      }),
      logger: logger(),
    });
    assert.equal(result.status, "published");
    assert.equal(result.report.featuredToken, null);
    assert.match(result.report.classification, /NO QUALIFYING FEATURE/);

    const index = JSON.parse(await readFile(path.join(contentDir, "index.json"), "utf8"));
    assert.equal(index.reports.length, 1);
    assert.equal(index.reports[0].featuredSymbol, null);
  } finally {
    await rm(contentDir, { recursive: true, force: true });
  }
});
