import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  GOVERNANCE_QUESTIONS,
  governanceQuestions,
  governanceClassifications,
  buildGovernanceResult,
  decodeGovernanceCode,
  encodeGovernanceCode,
  inspectGovernanceProgress,
  isValidGovernanceAnswers,
} from "../app/governance-office/governance-engine";
import { departments } from "../app/divisions";
import { departmentCaseThreads } from "../app/lib/department-narrative";
import { departmentJourneys } from "../app/lib/department-journeys";
import { DEPARTMENT_STAMPS, PASSPORT_ACHIEVEMENTS, CORE_ACTIVITIES } from "../app/passport/passport-store";

const read = (path: string) => readFileSync(path, "utf8");

test("U66 Governance Accountability Office validates a seven-answer deterministic interview", () => {
  assert.equal(GOVERNANCE_QUESTIONS, 7);
  assert.equal(governanceQuestions.length, 7);
  assert.ok(governanceQuestions.every((question) => question.options.length === 4));

  const expectedTags = new Set(Object.keys(governanceClassifications));
  const availableTags = new Set(governanceQuestions.flatMap((question) => question.options.map((option) => option.tag)));
  assert.deepEqual([...availableTags].sort(), [...expectedTags].sort(), "all eight governance archetypes must be reachable through the questionnaire");

  for (const answers of [[0, 0, 0, 0, 0, 0, 0], [3, 2, 1, 0, 3, 2, 1], [2, 2, 2, 2, 2, 2, 2]]) {
    assert.equal(isValidGovernanceAnswers(answers), true);
    const code = encodeGovernanceCode(answers);
    assert.deepEqual(decodeGovernanceCode(code), answers);
    assert.deepEqual(buildGovernanceResult(answers), buildGovernanceResult(answers));
    assert.equal(buildGovernanceResult(answers).history.length, GOVERNANCE_QUESTIONS);
  }

  for (const invalid of [null, "", "g1-123", "g1-12345678", "g2-1234567", "g1-1234568", [0, 1], [0, 1, 2, 3, 4, 0, 1]]) {
    assert.equal(decodeGovernanceCode(invalid), null);
  }
  assert.throws(() => encodeGovernanceCode([0, 1, 2]));
});

test("U66 Quorum Tribunal scores only selected answers and stays within defined bounds", () => {
  for (const answers of [[0, 0, 0, 0, 0, 0, 0], [3, 3, 3, 3, 3, 3, 3], [0, 1, 2, 3, 0, 1, 2]]) {
    const result = buildGovernanceResult(answers);
    const progress = inspectGovernanceProgress(answers);
    assert.equal(result.completedQuestions, GOVERNANCE_QUESTIONS);
    assert.deepEqual(result.history, progress.history);
    for (const score of [result.proposalClarity, result.votingDiscipline, result.executionAwareness]) {
      assert.ok(Number.isFinite(score) && score >= 0 && score <= 100);
    }
    assert.equal(result.crossRead.signals.length, 2);
    assert.ok(result.profile.title.length > 10);
    if (result.secondaryProfile) assert.ok(result.secondaryProfile.title.length > 10);
    else assert.equal(result.secondaryTag, null);
    assert.ok(result.finding.length > 25);
    assert.match(result.crossRead.interpretation, /No DAO, proposal, wallet, vote/);
  }
  assert.equal(buildGovernanceResult([0, 0, 0, 1, 0, 0, 0]).secondaryProfile, null);
  assert.throws(() => inspectGovernanceProgress([4]));
});

test("U66 Governance Office is integrated with Department navigation, Atlas, existing records and Passport", () => {
  const office = departments.find((department) => department.section === "governance");
  assert.ok(office);
  assert.equal(office.number, "13");
  assert.equal(office.href, "/governance-office");
  assert.equal(office.pageTitle, "THE QUORUM TRIBUNAL");

  const thread = departmentCaseThreads["DAO GOVERNANCE / CROSS-CHAIN QUORUM REVIEW"];
  assert.ok(thread);
  assert.deepEqual(thread.offices.map((step) => step.section), ["governance", "archives", "museum"]);
  assert.equal(thread.archiveSlug, "circular-quorum-migration");
  assert.equal(thread.exhibitSlug, "the-multichain-quorum-compass");

  assert.equal(Object.keys(departmentJourneys).length, 13);
  assert.equal(departmentJourneys.governance.length, 2);
  assert.ok(departmentJourneys.governance.every((destination) => destination.href === "/archives" || destination.href === "/museum"));

  assert.equal(DEPARTMENT_STAMPS.length, 13);
  assert.deepEqual(DEPARTMENT_STAMPS.at(-1), {
    id: "governance",
    number: "13",
    title: "GOVERNANCE ACCOUNTABILITY OFFICE / QUORUM TRIBUNAL",
    label: "GOVERNANCE REVIEW FILED",
  });
  assert.equal(CORE_ACTIVITIES.length, 10);
  assert.ok(CORE_ACTIVITIES.includes("governance"));
  assert.ok(PASSPORT_ACHIEVEMENTS.some((badge) => badge.id === "governance-tribunal-filed"));

  const passport = read("app/passport/passport-store.ts");
  assert.match(passport, /"governance-tribunal-filed": \{ progress: completed\.has\("governance"\)/);
  assert.match(passport, /"governance", "museum-exhibit"/);
  assert.match(read("app/sitemap.ts"), /governance-office/);
  assert.match(read("app/components/department-header.tsx"), /13 DESTINATIONS/);
});

test("U66 governance public case files are URL-reconstructable, shareable and clearly fictional", () => {
  const page = read("app/governance-office/page.tsx");
  const client = read("app/governance-office/governance-client.tsx");
  const publicPage = read("app/governance-office/case/[code]/page.tsx");
  const card = read("app/governance-office/case/[code]/opengraph-image.tsx");
  const landingCard = read("app/governance-office/opengraph-image.tsx");

  assert.match(page, /No DAO or live vote is checked/);
  assert.match(client, /recordPassportActivity\("governance"\)/);
  assert.match(client, /PassportResultReceipt activity="governance"/);
  assert.match(client, /DepartmentPublicShare/);
  assert.match(client, /decodeGovernanceCode\(challenge\)/);
  assert.match(publicPage, /robots: \{ index: false, follow: true \}/);
  assert.match(publicPage, /DepartmentPublicShare/);
  assert.match(publicPage, /DepartmentNextSteps currentDepartment="governance"/);
  assert.match(publicPage, /notFound\(\)/);
  assert.match(card, /buildGovernanceResult/);
  assert.match(landingCard, /DIVISION 13/);
  assert.doesNotMatch(client + publicPage, /fetch\(|WebSocket|wallet\.connect|ethereum\.request\(/i);
});
