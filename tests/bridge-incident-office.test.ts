import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  BRIDGE_QUESTIONS,
  bridgeQuestions,
  buildBridgeResult,
  decodeBridgeCode,
  encodeBridgeCode,
  inspectBridgeProgress,
  isValidBridgeAnswers,
} from "../app/bridge-incident-office/bridge-engine";
import { departments } from "../app/divisions";
import { departmentCaseThreads } from "../app/lib/department-narrative";

const read = (path: string) => readFileSync(path, "utf8");

test("U65 Bridge Incident Office validates a seven-answer deterministic incident interview", () => {
  assert.equal(BRIDGE_QUESTIONS, 7);
  assert.equal(bridgeQuestions.length, 7);
  assert.ok(bridgeQuestions.every((question) => question.options.length === 4));

  for (const answers of [[0, 0, 0, 0, 0, 0, 0], [3, 2, 1, 0, 3, 2, 1], [2, 2, 2, 2, 2, 2, 2]]) {
    assert.equal(isValidBridgeAnswers(answers), true);
    const code = encodeBridgeCode(answers);
    assert.deepEqual(decodeBridgeCode(code), answers);
    assert.deepEqual(buildBridgeResult(answers), buildBridgeResult(answers));
    assert.equal(buildBridgeResult(answers).history.length, BRIDGE_QUESTIONS);
  }

  for (const invalid of [null, "", "b1-123", "b1-12345678", "b2-1234567", "b1-1234568", [0, 1], [0, 1, 2, 3, 4, 0, 1]]) {
    assert.equal(decodeBridgeCode(invalid), null);
  }
  assert.throws(() => encodeBridgeCode([0, 0, 0]));
});

test("U65 Bridge Incident Review derives three bounded answer-only scores and stable classifications", () => {
  const result = buildBridgeResult([0, 0, 0, 0, 0, 0, 0]);
  const progress = inspectBridgeProgress(result.answers);

  assert.equal(result.completedQuestions, BRIDGE_QUESTIONS);
  assert.deepEqual(result.history, progress.history);
  for (const score of [result.receiptQuality, result.routeLiteracy, result.patienceDiscipline]) {
    assert.ok(Number.isFinite(score) && score >= 0 && score <= 100);
  }
  assert.equal(result.caseNumber.length, 6);
  assert.ok(result.profile.title.length > 10);
  assert.ok(result.secondaryProfile.title.length > 10);
  assert.ok(result.finding.length > 20);
  assert.ok(result.crossRead.interpretation.includes("No wallet, bridge, network, transaction"));
});

test("U65 Bridge Incident Office is integrated with the division directory, Passport, Atlas and existing records", () => {
  const office = departments.find((department) => department.section === "bridge");
  assert.ok(office);
  assert.equal(office.href, "/bridge-incident-office");
  assert.equal(office.number, "12");

  const thread = departmentCaseThreads["BRIDGE INCIDENT / MESSAGE DELIVERY REVIEW"];
  assert.ok(thread);
  assert.deepEqual(thread.offices.map((step) => step.section), ["bridge", "archives", "museum"]);
  assert.equal(thread.archiveSlug, "the-bridge-receipt-that-arrived-late");
  assert.equal(thread.exhibitSlug, "the-bridge-queue-ticket");

  const passport = read("app/passport/passport-store.ts");
  assert.match(passport, /\{ id: "bridge", number: "12"/);
  assert.match(passport, /id: "bridge-incident-filed"/);
  assert.match(passport, /"bridge-incident-filed": \{ progress: completed\.has\("bridge"\)/);
  assert.ok(passport.includes("\"airdrop\",\n  \"bridge\",\n  \"governance\",\n];"));

  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /"\/bridge-incident-office"/);
  const header = read("app/components/department-header.tsx");
  assert.match(header, /13 DESTINATIONS/);
  const journeys = read("app/lib/department-journeys.ts");
  assert.match(journeys, /bridge: \[/);
  assert.match(journeys, /href: "\/bridge-incident-office"/);
});

test("U65 public bridge result files are deterministic, shareable and clearly fictional", () => {
  const page = read("app/bridge-incident-office/page.tsx");
  const client = read("app/bridge-incident-office/bridge-incident-client.tsx");
  const publicPage = read("app/bridge-incident-office/case/[code]/page.tsx");
  const card = read("app/bridge-incident-office/opengraph-image.tsx");
  const publicCard = read("app/bridge-incident-office/case/[code]/opengraph-image.tsx");

  assert.match(page, /canonical: "\/bridge-incident-office"/);
  assert.match(page, /BridgeIncidentClient/);
  assert.ok(client.includes("?challenge="));
  assert.match(client, /encodeBridgeCode/);
  assert.match(client, /recordPassportActivity\("bridge"\)/);
  assert.match(client, /PassportResultReceipt activity="bridge"/);
  assert.match(client, /does not check wallets, transactions, networks, bridges/);
  assert.match(publicPage, /decodeBridgeCode/);
  assert.match(publicPage, /robots: \{ index: false, follow: true \}/);
  assert.match(publicPage, /DepartmentNextSteps currentDepartment="bridge"/);
  assert.match(publicPage, /encodeBridgeCode/);
  assert.match(card, /width: 1200, height: 630/);
  assert.match(publicCard, /width: 1200, height: 630/);
  assert.match(publicCard, /buildBridgeResult/);

  // This is a self-reported interview, not a transfer-status or wallet monitoring service.
  assert.doesNotMatch(page + client + publicPage, /fetch\(|sendBeacon|gtag|analytics\.track|mixpanel|posthog|WebSocket|ethers\.js|viem|solana\.web3/i);
  assert.doesNotMatch(page + client + publicPage, /localStorage|sessionStorage/);
});
