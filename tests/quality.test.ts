import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { classifications as auditClassifications, questions as auditQuestions } from "../app/audit/audit-data";
import { AUDIT_QUESTION_COUNT, buildResult as buildAuditResult, decodeCaseCode, encodeCaseCode, isValidAnswers } from "../app/audit/audit-engine";
import { actions as simulatorActions, marketEvents, SIMULATOR_ROUNDS, buildSimulatorResult, decodeSimulatorCode, encodeSimulatorCode, isValidDecisions, simulateProgress } from "../app/simulator/simulator-engine";
import { classifications as utilityClassifications, questions as utilityQuestions, INSPECTOR_QUESTIONS, buildUtilityResult, decodeUtilityCode, encodeUtilityCode, inspectProgress, isValidUtilityAnswers } from "../app/utility-inspector/utility-engine";
import { questions as roadmapQuestions, ROADMAP_QUESTIONS, buildRoadmapResult, decodeRoadmapCode, encodeRoadmapCode, inspectRoadmapProgress, isValidRoadmapAnswers, slugifyProjectName } from "../app/roadmap-generator/roadmap-engine";
import { classifications as whitepaperClassifications, questions as whitepaperQuestions, FICTIONAL_SUPPLY, WHITEPAPER_QUESTIONS, buildWhitepaperResult, decodeWhitepaperCode, encodeWhitepaperCode, formatWhitepaperHtml, formatWhitepaperMarkdown, inspectWhitepaperProgress, isValidWhitepaperAnswers, slugifyProjectName as slugifyWhitepaperProjectName } from "../app/whitepaper-factory/whitepaper-engine";
import { questions as clubQuestions, CLUB_QUESTIONS, buildClubResult, decodeClubCode, encodeClubCode, inspectClubProgress, isValidClubAnswers } from "../app/club/club-engine";
import { questions as copeQuestions, COPE_QUESTIONS, buildPersonalCopeResult, buildDailyCopeIndex, decodeCopeCode, encodeCopeCode, isValidCopeAnswers } from "../app/cope-index/cope-engine";
import { buildDailyOfficeDispatch } from "../app/daily-office/daily-engine";
import { DEPARTMENT_STAMPS, PASSPORT_ACHIEVEMENTS, getDailyOfficeVisitStreak, getPassportAchievementStatuses, type PassportData } from "../app/passport/passport-store";

type ResultRecord = Record<string, unknown>;
type EngineSpec = {
  name: string;
  questionCount: number;
  questions?: Array<{ options: unknown[] }>;
  isValid: (value: unknown) => boolean;
  encode: (answers: number[]) => string;
  decode: (code: unknown) => unknown;
  decodedAnswers: (decoded: unknown) => number[] | null;
  build: (answers: number[]) => ResultRecord;
  answerKey: "answers" | "decisions";
  inspectPartial?: (answers: number[]) => unknown;
  assertResult: (result: ResultRecord) => void;
  assertDecodedExtra?: (decoded: unknown) => void;
};

function assertPercent(value: unknown, label: string) {
  assert.equal(typeof value, "number", label + " must be numeric");
  assert.ok(Number.isFinite(value), label + " must be finite");
  assert.ok((value as number) >= 0 && (value as number) <= 100, label + " must stay in the 0–100 range");
}

function decodedAnswerArray(value: unknown): number[] | null {
  if (Array.isArray(value)) return value as number[];
  if (value && typeof value === "object" && Array.isArray((value as { answers?: unknown }).answers)) {
    return (value as { answers: number[] }).answers;
  }
  return null;
}

const engines: EngineSpec[] = [
  {
    name: "DYOR Audit", questionCount: AUDIT_QUESTION_COUNT, questions: auditQuestions,
    isValid: isValidAnswers, encode: encodeCaseCode, decode: decodeCaseCode, decodedAnswers: decodedAnswerArray,
    build: (a) => buildAuditResult(a) as unknown as ResultRecord, answerKey: "answers",
    assertResult: (r) => {
      assertPercent(r.research, "Audit research"); assertPercent(r.cope, "Audit cope"); assertPercent(r.crowd, "Audit crowd");
      assert.ok(typeof r.finding === "string" && r.finding.length > 0);
      assert.ok(typeof r.disposition === "string" && r.disposition.length > 0);
    },
  },
  {
    name: "Paper Market Simulator", questionCount: SIMULATOR_ROUNDS,
    isValid: isValidDecisions, encode: encodeSimulatorCode, decode: decodeSimulatorCode, decodedAnswers: decodedAnswerArray,
    build: (a) => buildSimulatorResult(a) as unknown as ResultRecord, answerKey: "decisions", inspectPartial: simulateProgress,
    assertResult: (r) => {
      assert.equal(r.completedRounds, SIMULATOR_ROUNDS); assert.equal((r.history as unknown[]).length, SIMULATOR_ROUNDS);
      for (const key of ["price", "cash", "units", "positionValue", "netWorth", "paperPnl", "paperReturn"]) {
        assert.ok(Number.isFinite(r[key] as number), "Simulator " + key + " must be finite");
      }
      assert.ok(typeof r.decisionSummary === "string" && r.decisionSummary.length > 0);
    },
  },
  {
    name: "Token-Purpose Inspector", questionCount: INSPECTOR_QUESTIONS, questions: utilityQuestions,
    isValid: isValidUtilityAnswers, encode: encodeUtilityCode, decode: decodeUtilityCode, decodedAnswers: decodedAnswerArray,
    build: (a) => buildUtilityResult(a) as unknown as ResultRecord, answerKey: "answers", inspectPartial: inspectProgress,
    assertResult: (r) => {
      assert.equal(r.completedQuestions, INSPECTOR_QUESTIONS); assert.equal((r.history as unknown[]).length, INSPECTOR_QUESTIONS);
      assertPercent(r.evidence, "Utility evidence"); assertPercent(r.fog, "Utility fog"); assertPercent(r.tokenFit, "Utility token fit");
    },
  },
  {
    name: "CTO Takeover Roadmap", questionCount: ROADMAP_QUESTIONS, questions: roadmapQuestions,
    isValid: isValidRoadmapAnswers, encode: (a) => encodeRoadmapCode(a, "CTO 404 / Launch"),
    decode: decodeRoadmapCode, decodedAnswers: decodedAnswerArray,
    build: (a) => buildRoadmapResult(a, "CTO 404 / Launch") as unknown as ResultRecord,
    answerKey: "answers", inspectPartial: inspectRoadmapProgress,
    assertResult: (r) => {
      assert.equal(r.completedQuestions, ROADMAP_QUESTIONS);
      assert.ok(Array.isArray(r.milestones) && r.milestones.length > 0);
      assert.ok(typeof r.projectSlug === "string" && r.projectSlug.length > 0);
    },
    assertDecodedExtra: (d) => assert.equal((d as { projectSlug: string }).projectSlug, slugifyProjectName("CTO 404 / Launch")),
  },
  {
    name: "Fictional Token Dossier", questionCount: WHITEPAPER_QUESTIONS, questions: whitepaperQuestions,
    isValid: isValidWhitepaperAnswers, encode: (a) => encodeWhitepaperCode(a, "Fictional Token / 404"),
    decode: decodeWhitepaperCode, decodedAnswers: decodedAnswerArray,
    build: (a) => buildWhitepaperResult(a, "Fictional Token / 404") as unknown as ResultRecord,
    answerKey: "answers", inspectPartial: inspectWhitepaperProgress,
    assertResult: (r) => {
      assert.equal(r.completedQuestions, WHITEPAPER_QUESTIONS); assert.equal(r.supply, FICTIONAL_SUPPLY);
      assert.ok(Array.isArray(r.sections) && r.sections.length > 0);
      const allocations = r.allocations as Array<{ percentage: number }>;
      assert.ok(allocations.length > 0); assert.equal(allocations.reduce((sum, item) => sum + item.percentage, 0), 100);
      assertPercent(r.technicalDensity, "Dossier technical density");
      assertPercent(r.buzzwordDensity, "Dossier buzzword density");
      assertPercent(r.productClarity, "Dossier product clarity");
    },
    assertDecodedExtra: (d) => assert.equal((d as { projectSlug: string }).projectSlug, slugifyWhitepaperProjectName("Fictional Token / 404")),
  },
  {
    name: "99% Club", questionCount: CLUB_QUESTIONS, questions: clubQuestions,
    isValid: isValidClubAnswers, encode: encodeClubCode, decode: decodeClubCode, decodedAnswers: decodedAnswerArray,
    build: (a) => buildClubResult(a) as unknown as ResultRecord, answerKey: "answers", inspectPartial: inspectClubProgress,
    assertResult: (r) => {
      assert.equal(r.completedQuestions, CLUB_QUESTIONS);
      assertPercent(r.conviction, "Club conviction"); assertPercent(r.cope, "Club cope"); assertPercent(r.chatDependency, "Club chat dependency");
    },
  },
  {
    name: "Personal Cope Calibration", questionCount: COPE_QUESTIONS, questions: copeQuestions,
    isValid: isValidCopeAnswers, encode: encodeCopeCode, decode: decodeCopeCode, decodedAnswers: decodedAnswerArray,
    build: (a) => buildPersonalCopeResult(a) as unknown as ResultRecord, answerKey: "answers",
    assertResult: (r) => {
      assertPercent(r.copeScore, "Personal cope score"); assertPercent(r.patienceScore, "Personal patience score");
      assertPercent(r.chatDependency, "Personal chat dependency");
    },
  },
];

test("questionnaires expose exactly four choices per question", () => {
  for (const engine of engines) {
    if (!engine.questions) continue;
    assert.equal(engine.questions.length, engine.questionCount, engine.name + " question count");
    engine.questions.forEach((question, index) => assert.equal(question.options.length, 4, engine.name + " question " + (index + 1)));
  }
  assert.equal(simulatorActions.length, 4);
  assert.equal(marketEvents.length, SIMULATOR_ROUNDS);
  assert.deepEqual(marketEvents.map((event) => event.day), Array.from({ length: SIMULATOR_ROUNDS }, (_, i) => i + 1));
});

for (const engine of engines) {
  test(engine.name + ": input validation, share-code round trips and deterministic results", () => {
    const vectors = [
      Array(engine.questionCount).fill(0), Array(engine.questionCount).fill(1),
      Array(engine.questionCount).fill(2), Array(engine.questionCount).fill(3),
      Array.from({ length: engine.questionCount }, (_, i) => i % 4),
      Array.from({ length: engine.questionCount }, (_, i) => 3 - (i % 4)),
    ];
    for (const answers of vectors) {
      assert.equal(engine.isValid(answers), true);
      const code = engine.encode(answers);
      const decoded = engine.decode(code);
      assert.deepEqual(engine.decodedAnswers(decoded), answers);
      engine.assertDecodedExtra?.(decoded);
      const first = engine.build(answers);
      assert.deepEqual(engine.build(answers), first, engine.name + " result must be deterministic");
      assert.deepEqual(first[engine.answerKey], answers, engine.name + " result must preserve answer order");
      engine.assertResult(first);
      const inputCopy = [...answers];
      const builtFromCopy = engine.build(inputCopy);
      inputCopy[0] = (inputCopy[0] + 1) % 4;
      assert.deepEqual(builtFromCopy[engine.answerKey], answers, engine.name + " must copy submitted answers");
    }

    const invalidInputs: unknown[] = [
      null, undefined, 42, "0123", {}, [], Array(engine.questionCount - 1).fill(0),
      Array(engine.questionCount + 1).fill(0), Array(engine.questionCount).fill(-1),
      Array(engine.questionCount).fill(4), Array(engine.questionCount).fill(1.5),
      Array(engine.questionCount).fill(Number.NaN),
    ];
    for (const invalid of invalidInputs) assert.equal(engine.isValid(invalid), false);
    const sparse = Array(engine.questionCount).fill(0);
    delete sparse[Math.floor(engine.questionCount / 2)];
    assert.equal(engine.isValid(sparse), false, engine.name + " must reject sparse arrays");
    assert.throws(() => engine.encode(sparse));
    assert.throws(() => engine.build(sparse));
    for (const invalidCode of [null, undefined, 42, {}, "", "not-a-case-code", engine.encode(vectors[0]) + "x"]) {
      assert.equal(engine.decode(invalidCode), null);
    }
    if (engine.inspectPartial) {
      const overlong = Array(engine.questionCount + 1).fill(0);
      assert.throws(() => engine.inspectPartial!(overlong));
      const sparsePartial = [0, 1, 2];
      delete sparsePartial[1];
      assert.throws(() => engine.inspectPartial!(sparsePartial));
    }
  });
}


function expectedRoundedAverage(values: number[], decimalPlaces = 0) {
  const average = values.reduce((sum, value) => sum + value, 0) / (values.length * 5) * 100;
  const factor = 10 ** decimalPlaces;
  return Math.round(average * factor) / factor;
}

function selectedMetricValues(
  questions: Array<{ options: unknown[] }>,
  answers: number[],
  field: string,
) {
  return answers.map((answer, index) => {
    const option = questions[index].options[answer] as Record<string, unknown>;
    const value = option[field];
    return value as number;
  });
}

function assertIndependentMetricMath(engineName: string, answers: number[], result: ResultRecord) {
  const check = (field: string, values: number[], places = 0) => {
    assert.equal(result[field], expectedRoundedAverage(values, places), engineName + " " + field + " must match the selected option scores");
  };

  if (engineName === "DYOR Audit") {
    check("research", selectedMetricValues(auditQuestions, answers, "research"));
    check("cope", selectedMetricValues(auditQuestions, answers, "cope"));
    check("crowd", selectedMetricValues(auditQuestions, answers, "crowd"));
  } else if (engineName === "Token-Purpose Inspector") {
    check("evidence", selectedMetricValues(utilityQuestions, answers, "evidence"), 2);
    check("fog", selectedMetricValues(utilityQuestions, answers, "fog"), 2);
    check("tokenFit", selectedMetricValues(utilityQuestions, answers, "tokenFit"), 2);
    const history = result.history as Array<{ question: string; answer: string }>;
    history.forEach((item, index) => {
      assert.equal(item.question, utilityQuestions[index].prompt);
      assert.equal(item.answer, utilityQuestions[index].options[answers[index]].label);
    });
  } else if (engineName === "CTO Takeover Roadmap") {
    check("delivery", selectedMetricValues(roadmapQuestions, answers, "delivery"), 2);
    check("realism", selectedMetricValues(roadmapQuestions, answers, "realism"), 2);
    check("inflation", selectedMetricValues(roadmapQuestions, answers, "inflation"), 2);
  } else if (engineName === "Fictional Token Dossier") {
    check("technicalDensity", selectedMetricValues(whitepaperQuestions, answers, "technical"), 2);
    check("buzzwordDensity", selectedMetricValues(whitepaperQuestions, answers, "buzzwords"), 2);
    check("productClarity", selectedMetricValues(whitepaperQuestions, answers, "clarity"), 2);
    assert.equal(result.narrative, whitepaperQuestions[0].options[answers[0]].label);
    assert.equal(result.problemStatement, whitepaperQuestions[1].options[answers[1]].label);
  } else if (engineName === "99% Club") {
    check("conviction", selectedMetricValues(clubQuestions, answers, "conviction"), 2);
    check("cope", selectedMetricValues(clubQuestions, answers, "cope"), 2);
    check("chatDependency", selectedMetricValues(clubQuestions, answers, "chatDependency"), 2);
  } else if (engineName === "Personal Cope Calibration") {
    check("copeScore", selectedMetricValues(copeQuestions, answers, "cope"));
    check("patienceScore", selectedMetricValues(copeQuestions, answers, "patience"));
    check("chatDependency", selectedMetricValues(copeQuestions, answers, "chat"));
  } else if (engineName === "Paper Market Simulator") {
    const history = result.history as Array<{ day: number; action: string; netWorthAfter: number; priceAfter: number; cashAfter: number; unitsAfter: number }>;
    assert.equal(history.length, SIMULATOR_ROUNDS);
    history.forEach((entry, index) => {
      assert.equal(entry.day, index + 1);
      assert.equal(entry.action, simulatorActions[answers[index]].id);
      assert.ok(entry.priceAfter > 0 && entry.cashAfter >= 0 && entry.unitsAfter >= 0 && entry.netWorthAfter >= 0);
    });
    const counts = result.counts as Record<string, number>;
    assert.equal(Object.values(counts).reduce((sum, value) => sum + value, 0), SIMULATOR_ROUNDS);
    assert.ok(Math.abs((result.paperPnl as number) - ((result.netWorth as number) - 1000)) < 0.011);
  }
}

test("all valid answer combinations preserve score math and reconstructible public case codes", () => {
  let totalCombinations = 0;

  for (const engine of engines) {
    const combinationCount = 4 ** engine.questionCount;
    for (let ordinal = 0; ordinal < combinationCount; ordinal += 1) {
      let remainder = ordinal;
      const answers = Array(engine.questionCount).fill(0) as number[];
      for (let index = engine.questionCount - 1; index >= 0; index -= 1) {
        answers[index] = remainder % 4;
        remainder = Math.floor(remainder / 4);
      }

      const code = engine.encode(answers);
      const pathSegment = encodeURIComponent(code);
      const restoredCode = decodeURIComponent(pathSegment);
      const decoded = engine.decode(restoredCode);
      const restoredAnswers = engine.decodedAnswers(decoded);
      if (!restoredAnswers || restoredAnswers.join("") !== answers.join("")) {
        throw new Error(engine.name + " failed to reconstruct combination " + ordinal + " from its public case code");
      }
      engine.assertDecodedExtra?.(decoded);

      const result = engine.build(restoredAnswers);
      if ((result[engine.answerKey] as number[]).join("") !== answers.join("")) {
        throw new Error(engine.name + " did not preserve answer order for combination " + ordinal);
      }
      if (!result.profile || typeof (result.profile as { title?: unknown }).title !== "string") {
        throw new Error(engine.name + " returned no primary classification for combination " + ordinal);
      }
      assertIndependentMetricMath(engine.name, answers, result);
      totalCombinations += 1;
    }
  }

  const expectedCombinations = engines.reduce((sum, engine) => sum + (4 ** engine.questionCount), 0);
  assert.equal(totalCombinations, expectedCombinations, "Every possible answer vector must be covered for all seven engines");
  assert.ok(totalCombinations >= 1_000_000, "Coverage must include the complete ten-question DYOR Audit space");
});

test("fictional token dossier HTML and Markdown exports retain the case record and disclaimers", () => {
  const answers = [0, 1, 2, 3, 0, 1, 2];
  const result = buildWhitepaperResult(answers, "Fictional Token / 404");
  const markdown = formatWhitepaperMarkdown(result);
  const html = formatWhitepaperHtml(result);

  assert.ok(markdown.startsWith("# " + result.projectLabel + " — FICTIONAL TOKEN DOSSIER"));
  assert.ok(markdown.includes("FICTIONAL ENTERTAINMENT DOCUMENT. NOT A TECHNICAL SPECIFICATION"));
  assert.ok(markdown.includes(result.profile.title));
  assert.ok(markdown.includes(result.secondaryProfile.title));
  assert.ok(markdown.includes(result.problemStatement));
  result.sections.forEach((section) => assert.ok(markdown.includes(section.title)));
  result.allocations.forEach((allocation) => assert.ok(markdown.includes(allocation.label)));

  assert.ok(html.startsWith("<!doctype html><html lang=\"en\">"));
  assert.ok(html.includes(result.profile.title));
  assert.ok(html.includes(result.secondaryProfile.title));
  assert.ok(html.includes("FICTIONAL ENTERTAINMENT DOCUMENT. NOT A TECHNICAL SPECIFICATION"));
  assert.ok(html.includes("PRINT / SAVE AS PDF"));
  const escapeHtmlForAssertion = (value: string) => value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;",
  })[char] ?? char);
  result.sections.forEach((section) => assert.ok(html.includes(escapeHtmlForAssertion(section.title))));
  result.allocations.forEach((allocation) => assert.ok(html.includes(escapeHtmlForAssertion(allocation.label))));
});

test("fictional token dossier HTML export escapes injected markup in display content", () => {
  const base = buildWhitepaperResult([0, 1, 2, 3, 0, 1, 2], "SAFE DOSSIER");
  const unsafeResult = {
    ...base,
    projectLabel: "<script>case-alert</script>",
    profile: {
      ...base.profile,
      subtitle: "</p><script>profile-alert</script>",
    },
    sections: base.sections.map((section, index) => index === 0
      ? { ...section, title: "<img src=x onerror=case-alert>", paragraphs: [...section.paragraphs, "<script>body-alert</script>"] }
      : section),
  };
  const html = formatWhitepaperHtml(unsafeResult);

  assert.ok(html.includes("&lt;script&gt;case-alert&lt;/script&gt;"));
  assert.ok(html.includes("&lt;script&gt;profile-alert&lt;/script&gt;"));
  assert.ok(html.includes("&lt;img src=x onerror=case-alert&gt;"));
  assert.ok(html.includes("&lt;script&gt;body-alert&lt;/script&gt;"));
  assert.ok(!html.includes("<script>case-alert</script>"));
  assert.ok(!html.includes("<script>profile-alert</script>"));
  assert.ok(!html.includes("<script>body-alert</script>"));
});

test("Daily CT Briefing is deterministic for a UTC issue date and rejects invalid dates", () => {
  const first = buildDailyOfficeDispatch("2026-11-20");
  assert.deepEqual(buildDailyOfficeDispatch("2026-11-20"), first);
  assert.equal(first.issueDate, "2026-11-20");
  assert.equal(first.sections.length, 6);
  assert.ok(first.sections.every((section) => section.heading.length > 0 && section.body.length > 0));
  assert.throws(() => buildDailyOfficeDispatch("2026-02-30"));
  assert.throws(() => buildDailyOfficeDispatch("not-a-date"));
});

test("Global Cope Index is deterministic and exposes five bounded synthetic dimensions", () => {
  const first = buildDailyCopeIndex("2026-11-20");
  assert.deepEqual(buildDailyCopeIndex("2026-11-20"), first);
  assert.equal(first.issueDate, "2026-11-20");
  assert.equal(first.dimensions.length, 5);
  assertPercent(first.overall, "Global Cope overall");
  first.dimensions.forEach((item) => assertPercent(item.value, "Global Cope " + item.id));
  assert.throws(() => buildDailyCopeIndex("2026-02-30"));
  assert.throws(() => buildDailyCopeIndex("not-a-date"));
});

function makePassport(overrides: Partial<PassportData> = {}): PassportData {
  return {
    version: 2, enabled: true, createdAt: "2026-11-20T12:00:00.000Z",
    visitedDepartments: [], dailyOfficeDates: [], bestDailyStreak: 0, completedActivities: [],
    ...overrides,
  };
}

test("Passport does not award interactive achievements for visits alone", () => {
  const visitedOnly = makePassport({ visitedDepartments: DEPARTMENT_STAMPS.map((stamp) => stamp.id) });
  const statuses = getPassportAchievementStatuses(visitedOnly);
  assert.equal(statuses.length, PASSPORT_ACHIEVEMENTS.length);
  assert.equal(statuses.some((item) => item.earned), false);
});

test("Passport unlocks require their recorded activities and the seven-day streak", () => {
  const partial = getPassportAchievementStatuses(makePassport({ completedActivities: ["museum-exhibit"] }))
    .find((item) => item.id === "culture-curator");
  assert.ok(partial);
  assert.equal(partial.progress, 1);
  assert.equal(partial.target, 2);
  assert.equal(partial.earned, false);

  const complete = makePassport({
    completedActivities: ["audit", "simulator", "utility", "roadmap", "whitepaper", "club", "cope", "museum-exhibit", "archive-record"],
    bestDailyStreak: 7,
  });
  const all = getPassportAchievementStatuses(complete);
  assert.equal(all.length, PASSPORT_ACHIEVEMENTS.length);
  assert.equal(all.every((item) => item.earned), true);
});

test("Passport daily visit streak counts consecutive UTC dates without double-counting duplicates", () => {
  assert.equal(getDailyOfficeVisitStreak(makePassport({
    dailyOfficeDates: ["2026-11-18", "2026-11-16", "2026-11-17", "2026-11-17", "2026-11-20"],
  })), 3);
  assert.equal(getDailyOfficeVisitStreak(makePassport()), 0);
});


test("simulator result distinguishes executed additions from unfunded attempts", () => {
  const result = buildSimulatorResult([2, 2, 2, 2, 0, 0, 0]);

  assert.deepEqual(
    result.history.slice(0, 4).map((entry) => entry.actionLabel),
    ["ADD", "ADD", "ADD SKIPPED", "ADD SKIPPED"],
  );
  assert.match(result.decisionSummary, /2 additional buys/);
  assert.match(result.decisionSummary, /2 add attempts skipped/);
  assert.notEqual(result.profile.title, "THE POST-GRADUATION ACCUMULATOR");
});

test("simulator briefing uses the same ADD TO POSITION language as its action", () => {
  const source = readFileSync("app/simulator/simulator-client.tsx", "utf8");
  assert.ok(source.includes("trim 20%, add to your position or ask CT / Telegram."));
  assert.doesNotMatch(source, /average down/i);
});


test("DYOR Audit archetype copy describes the selected behavior", () => {
  assert.equal(auditQuestions[8].options[0].tag, "planned");
  assert.match(auditClassifications.planned.title, /PLAN-FIRST/);
  assert.match(auditClassifications.planned.subtitle, /exit condition before the next candle/i);

  assert.equal(auditQuestions[6].options[2].tag, "utility-optimist");
  assert.match(auditClassifications["utility-optimist"].subtitle, /memes, group chat and shared lore are the product/i);

  assert.equal(auditQuestions[6].options[1].tag, "tokenomics-poet");
  assert.match(auditClassifications["tokenomics-poet"].title, /TOKEN-MECHANICS/);
});

test("DYOR Audit cross-read stays evidence-linked, deterministic and non-clinical", () => {
  const researchLed = buildAuditResult(Array(AUDIT_QUESTION_COUNT).fill(0));
  assert.equal(researchLed.crossRead.headline, "THE INDEPENDENT CHECKLIST");
  assert.equal(researchLed.crossRead.strongestEvidence.score, 5);
  assert.ok(researchLed.crossRead.strongestEvidence.prompt.length > 0);
  assert.ok(researchLed.crossRead.strongestEvidence.answer.length > 0);

  const crowdLedAnswers = [3, 3, 3, 3, 3, 3, 3, 3, 2, 2];
  const crowdLed = buildAuditResult(crowdLedAnswers);
  assert.equal(crowdLed.crossRead.headline, "THE TIMELINE HAS A VOTE");
  assert.deepEqual(buildAuditResult(crowdLedAnswers).crossRead, crowdLed.crossRead);

  const selected = crowdLedAnswers.map((answer, index) => auditQuestions[index].options[answer]);
  const evidenceIndex = selected.reduce((best, item, index) =>
    item.research > selected[best].research ? index : best, 0);
  let pressureIndex = 0;
  for (let index = 1; index < selected.length; index += 1) {
    const pressure = selected[index].cope + selected[index].crowd;
    const bestPressure = selected[pressureIndex].cope + selected[pressureIndex].crowd;
    if (
      pressure > bestPressure ||
      (pressure === bestPressure && selected[index].crowd > selected[pressureIndex].crowd) ||
      (pressure === bestPressure && selected[index].crowd === selected[pressureIndex].crowd &&
        selected[index].cope > selected[pressureIndex].cope)
    ) pressureIndex = index;
  }

  assert.equal(crowdLed.crossRead.strongestEvidence.prompt, auditQuestions[evidenceIndex].prompt);
  assert.equal(crowdLed.crossRead.strongestEvidence.answer, selected[evidenceIndex].label);
  assert.equal(crowdLed.crossRead.strongestEvidence.score, selected[evidenceIndex].research);
  assert.equal(crowdLed.crossRead.strongestPressure.prompt, auditQuestions[pressureIndex].prompt);
  assert.equal(crowdLed.crossRead.strongestPressure.answer, selected[pressureIndex].label);
  assert.equal(crowdLed.crossRead.strongestPressure.cope, selected[pressureIndex].cope);
  assert.equal(crowdLed.crossRead.strongestPressure.crowd, selected[pressureIndex].crowd);
  assert.doesNotMatch(crowdLed.crossRead.interpretation, /diagnos(?:is|e)|mental health/i);
});

test("DYOR Audit cross-read is consistent across the public case and social preview", () => {
  const publicPage = readFileSync("app/audit/case/[code]/page.tsx", "utf8");
  const socialPreview = readFileSync("app/audit/case/[code]/opengraph-image.tsx", "utf8");
  assert.match(publicPage, /result\.crossRead\.headline/);
  assert.match(publicPage, /result\.crossRead\.strongestEvidence\.answer/);
  assert.match(publicPage, /result\.crossRead\.strongestPressure\.answer/);
  assert.match(socialPreview, /result\?\.crossRead\.headline/);
});

test("Token-Purpose Inspector ecosystem-mirage profile matches its source answers", () => {
  assert.equal(utilityQuestions[0].options[3].tag, "institutional-mirage");
  assert.equal(utilityQuestions[2].options[3].tag, "institutional-mirage");

  const result = buildUtilityResult([3, 0, 3, 0, 0, 0, 0]);
  assert.equal(result.primaryTag, "institutional-mirage");
  assert.match(result.profile.title, /ECOSYSTEM EXPANSION MIRAGE/);
  assert.match(result.profile.subtitle, /future holder army/i);
});

test("Fictional Token Dossier archetypes align with technical, community and governance answers", () => {
  assert.equal(whitepaperQuestions[0].options[1].tag, "interoperability-evangelist");
  assert.match(whitepaperClassifications["interoperability-evangelist"].title, /COMMUNITY-COORDINATION/);

  assert.equal(whitepaperQuestions[2].options[0].tag, "consensus-poet");
  assert.equal(whitepaperQuestions[3].options[0].tag, "consensus-poet");
  assert.match(whitepaperClassifications["consensus-poet"].title, /SOURCE-LINKED TECHNICAL AUTHOR/);

  assert.equal(whitepaperQuestions[2].options[1].tag, "zero-knowledge-enthusiast");
  assert.match(whitepaperClassifications["zero-knowledge-enthusiast"].title, /PROPRIETARY-PROOF/);

  assert.equal(whitepaperQuestions[0].options[2].tag, "abstract-maximalist");
  assert.equal(whitepaperQuestions[5].options[2].tag, "dao-diplomat");
  assert.equal(whitepaperQuestions[6].options[2].tag, "dao-diplomat");

  const technical = buildWhitepaperResult([0, 0, 0, 0, 0, 0, 0], "Source Linked");
  assert.equal(technical.primaryTag, "consensus-poet");
  assert.match(technical.profile.title, /SOURCE-LINKED TECHNICAL AUTHOR/);

  const community = buildWhitepaperResult([1, 1, 0, 0, 0, 0, 0], "Community Coordination");
  assert.equal(community.primaryTag, "interoperability-evangelist");
  assert.match(community.profile.title, /COMMUNITY-COORDINATION/);
});


test("simulator profile copy reflects the actual conditions used to assign it", () => {
  const accumulator = buildSimulatorResult([1, 2, 1, 2, 1, 2, 0]);
  assert.match(accumulator.profile.title, /POSITION-EXPANSION ACCUMULATOR/);
  assert.match(accumulator.profile.subtitle, /three or more ADD TO POSITION decisions/i);

  const diamond = buildSimulatorResult([0, 0, 0, 0, 0, 0, 0]);
  assert.match(diamond.profile.title, /DIAMOND HAND/);
  assert.match(diamond.profile.subtitle, /at least five of the seven rounds/i);

  const consultant = buildSimulatorResult([1, 1, 1, 1, 0, 0, 0]);
  assert.match(consultant.profile.title, /EXIT CONSULTANT/);
  assert.match(consultant.profile.subtitle, /TRIM repeatedly/i);

  const survivor = buildSimulatorResult([0, 0, 0, 0, 0, 0, 0]);
  assert.doesNotMatch(survivor.profile.subtitle, /ignored the copied KOL call/i);
});

test("Fictional Token Dossier purpose-missing archetype also reflects risk-denial answers", () => {
  assert.equal(whitepaperQuestions[6].options[3].tag, "product-not-found");
  assert.match(whitepaperClassifications["product-not-found"].title, /PURPOSE & RISK FRAMEWORK/);
  assert.match(whitepaperClassifications["product-not-found"].subtitle, /credible account of project risks/i);
});

test("Daily CT Briefing retains a healthy range of date-seeded editorial variants", () => {
  const reports = Array.from({ length: 120 }, (_, index) => {
    const date = new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10);
    return buildDailyOfficeDispatch(date);
  });
  const uniqueHeadlines = new Set(reports.map((report) => report.headline));
  const uniqueBulletins = new Set(reports.map((report) => report.bulletin));
  const uniqueIncidentHeadings = new Set(reports.map((report) => report.sections[0].heading));
  const uniqueBriefings = new Set(reports.map((report) =>
    [report.headline, report.bulletin, ...report.sections.map((section) => section.heading + "|" + section.body)].join("||")
  ));

  assert.ok(uniqueHeadlines.size >= 12, "Daily headlines should not collapse into a small repeating subset");
  assert.ok(uniqueBulletins.size >= 12, "Daily bulletins should retain meaningful variation");
  assert.ok(uniqueIncidentHeadings.size >= 9, "Incident reports should draw from a broad portion of the editorial library");
  assert.ok(uniqueBriefings.size >= 115, "Complete daily briefing combinations should remain distinct across the sample");
});
