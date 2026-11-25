import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  AIRDROP_QUESTIONS,
  airdropQuestions,
  buildAirdropResult,
  decodeAirdropCode,
  encodeAirdropCode,
  inspectAirdropProgress,
  isValidAirdropAnswers,
} from "../app/airdrop-office/airdrop-engine";
import { departments } from "../app/divisions";
import { departmentCaseThreads } from "../app/lib/department-narrative";

const read = (path: string) => readFileSync(path, "utf8");

test("U64 Airdrop Entitlement Office validates a seven-answer deterministic interview", () => {
  assert.equal(AIRDROP_QUESTIONS, 7);
  assert.equal(airdropQuestions.length, 7);
  assert.ok(airdropQuestions.every((question) => question.options.length === 4));

  for (const answers of [[0, 0, 0, 0, 0, 0, 0], [3, 2, 1, 0, 3, 2, 1], [2, 2, 2, 2, 2, 2, 2]]) {
    assert.equal(isValidAirdropAnswers(answers), true);
    const code = encodeAirdropCode(answers);
    assert.deepEqual(decodeAirdropCode(code), answers);
    assert.deepEqual(buildAirdropResult(answers), buildAirdropResult(answers));
    assert.equal(buildAirdropResult(answers).history.length, AIRDROP_QUESTIONS);
  }

  for (const invalid of [null, "", "a1-123", "a1-12345678", "a2-1234567", "a1-1234568", [0, 1], [0, 1, 2, 3, 4, 0, 1]]) {
    assert.equal(decodeAirdropCode(invalid), null);
  }
  assert.throws(() => encodeAirdropCode([0, 0, 0]));
});

test("U64 Airdrop Tribunal derives three bounded answer-only scores and stable classifications", () => {
  const result = buildAirdropResult([0, 0, 0, 0, 0, 0, 0]);
  const progress = inspectAirdropProgress(result.answers);

  assert.equal(result.completedQuestions, 7);
  assert.deepEqual(result.history, progress.history);
  for (const score of [result.receipts, result.ruleAwareness, result.expectationControl]) {
    assert.ok(Number.isFinite(score) && score >= 0 && score <= 100);
  }
  assert.ok(result.caseNumber.length === 6);
  assert.ok(result.profile.title.length > 0);
  assert.ok(result.finding.length > 20);
  assert.equal(result.crossRead.signals.length, 2);
  assert.match(result.crossRead.interpretation, /No wallet, network, airdrop programme, points dashboard or eligibility system was checked/i);
});

test("U64 Airdrop Tribunal is fully connected to division routing, Case Atlas and existing fictional records", () => {
  const division = departments.find((item) => item.section === "airdrop");
  assert.ok(division);
  assert.equal(division.number, "11");
  assert.equal(division.href, "/airdrop-office");

  const thread = departmentCaseThreads["AIRDROP SNAPSHOT / ELIGIBILITY APPEAL"];
  assert.ok(thread);
  assert.equal(thread.offices.length, 3);
  assert.deepEqual(thread.offices.map((office) => office.section), ["airdrop", "archives", "club"]);
  assert.equal(thread.archiveSlug, "airdrop-snapshot-eligibility-appeal");
  assert.equal(thread.exhibitSlug, "the-airdrop-passport-stamp-book");

  const archive = read("app/archives/archive-data.ts");
  const museum = read("app/museum/museum-data.ts");
  assert.ok(archive.includes('slug: "airdrop-snapshot-eligibility-appeal"'));
  assert.ok(museum.includes('slug: "the-airdrop-passport-stamp-book"'));
});

test("U64 Airdrop route exposes no wallet integration, external data lookup or server-side answer storage", () => {
  const client = read("app/airdrop-office/airdrop-client.tsx");
  const page = read("app/airdrop-office/page.tsx");
  const publicPage = read("app/airdrop-office/case/[code]/page.tsx");
  const engine = read("app/airdrop-office/airdrop-engine.ts");

  assert.ok(client.includes("recordPassportActivity(\"airdrop\")"));
  assert.ok(client.includes('params.get("challenge")'));
  assert.ok(publicPage.includes("robots: { index: false, follow: true }"));
  assert.ok(page.includes('canonical: "/airdrop-office"'));
  assert.doesNotMatch(client + page + publicPage + engine, /connectWallet|window\.ethereum|fetch\(|WebSocket|supabase|prisma|analytics|tracking/i);
});
