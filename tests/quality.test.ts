import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { classifications as auditClassifications, questions as auditQuestions } from "../app/audit/audit-data";
import { AUDIT_QUESTION_COUNT, buildResult as buildAuditResult, decodeCaseCode, encodeCaseCode, isValidAnswers } from "../app/audit/audit-engine";
import { actions as simulatorActions, marketEvents, SIMULATOR_ROUNDS, buildSimulatorResult, decodeSimulatorCode, encodeSimulatorCode, isValidDecisions, simulateProgress } from "../app/simulator/simulator-engine";
import { classifications as utilityClassifications, questions as utilityQuestions, INSPECTOR_QUESTIONS, buildUtilityResult, decodeUtilityCode, encodeUtilityCode, inspectProgress, isValidUtilityAnswers } from "../app/utility-inspector/utility-engine";
import { classifications as roadmapClassifications, questions as roadmapQuestions, ROADMAP_QUESTIONS, buildRoadmapResult, decodeRoadmapCode, encodeRoadmapCode, inspectRoadmapProgress, isValidRoadmapAnswers, slugifyProjectName } from "../app/roadmap-generator/roadmap-engine";
import { classifications as whitepaperClassifications, questions as whitepaperQuestions, FICTIONAL_SUPPLY, WHITEPAPER_QUESTIONS, buildWhitepaperResult, decodeWhitepaperCode, encodeWhitepaperCode, formatWhitepaperHtml, formatWhitepaperMarkdown, inspectWhitepaperProgress, isValidWhitepaperAnswers, slugifyProjectName as slugifyWhitepaperProjectName } from "../app/whitepaper-factory/whitepaper-engine";
import { questions as clubQuestions, CLUB_QUESTIONS, buildClubResult, decodeClubCode, encodeClubCode, inspectClubProgress, isValidClubAnswers } from "../app/club/club-engine";
import { profiles as copeClassifications, questions as copeQuestions, COPE_QUESTIONS, buildPersonalCopeResult, buildDailyCopeIndex, decodeCopeCode, encodeCopeCode, isValidCopeAnswers } from "../app/cope-index/cope-engine";
import { buildDailyOfficeDispatch } from "../app/daily-office/daily-engine";
import { departments } from "../app/divisions";
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

function assertCrossRead(value: unknown, label: string) {
  assert.ok(value && typeof value === "object", label + " must return a cross-read");
  const read = value as { headline?: unknown; interpretation?: unknown; signals?: unknown };
  assert.ok(typeof read.headline === "string" && read.headline.length > 0, label + " headline must exist");
  assert.ok(typeof read.interpretation === "string" && read.interpretation.length > 0, label + " interpretation must exist");
  assert.ok(Array.isArray(read.signals) && read.signals.length === 2, label + " must include two answer-linked signals");
  for (const signal of read.signals as Array<Record<string, unknown>>) {
    for (const field of ["label", "context", "answer", "detail"]) {
      assert.ok(typeof signal[field] === "string" && signal[field].length > 0, label + " signal " + field + " must exist");
    }
  }
}

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
  assert.ok(markdown.includes(result.crossRead.headline));
  assert.ok(markdown.includes(result.crossRead.signals[0].answer));
  assert.ok(markdown.includes(result.problemStatement));
  result.sections.forEach((section) => assert.ok(markdown.includes(section.title)));
  result.allocations.forEach((allocation) => assert.ok(markdown.includes(allocation.label)));

  assert.ok(html.startsWith("<!doctype html><html lang=\"en\">"));
  assert.ok(html.includes(result.profile.title));
  assert.ok(html.includes(result.secondaryProfile.title));
  assert.ok(html.includes(result.crossRead.headline));
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

test("six interactive departments produce deterministic answer-linked cross-reads", () => {
  const simulatorAnswers = [3, 3, 1, 0, 2, 1, 0];
  const utilityAnswers = [0, 3, 0, 3, 0, 0, 0];
  const roadmapAnswers = [0, 3, 3, 3, 2, 3];
  const whitepaperAnswers = [0, 2, 2, 3, 3, 2, 3];
  const clubAnswers = [0, 1, 2, 3, 2];
  const copeAnswers = [0, 1, 2, 3, 2];

  const simulator = buildSimulatorResult(simulatorAnswers);
  const utility = buildUtilityResult(utilityAnswers);
  const roadmap = buildRoadmapResult(roadmapAnswers, "Cross Read");
  const whitepaper = buildWhitepaperResult(whitepaperAnswers, "Cross Read");
  const club = buildClubResult(clubAnswers);
  const cope = buildPersonalCopeResult(copeAnswers);

  const cases = [
    ["Paper Market Simulator", simulator, buildSimulatorResult(simulatorAnswers)],
    ["Token-Purpose Inspector", utility, buildUtilityResult(utilityAnswers)],
    ["CTO Takeover Roadmap", roadmap, buildRoadmapResult(roadmapAnswers, "Cross Read")],
    ["Fictional Token Dossier", whitepaper, buildWhitepaperResult(whitepaperAnswers, "Cross Read")],
    ["99% Club", club, buildClubResult(clubAnswers)],
    ["Personal Cope Calibration", cope, buildPersonalCopeResult(copeAnswers)],
  ] as const;

  for (const [label, result, repeated] of cases) {
    assertCrossRead(result.crossRead, label);
    assert.deepEqual(result.crossRead, repeated.crossRead, label + " cross-read must be deterministic");
  }

  const verifyAnswerSignals = (
    label: string,
    signals: Array<{ context: string; answer: string }>,
    questions: Array<{ prompt: string; options: Array<{ label: string }> }>,
    answers: number[],
  ) => {
    signals.forEach((signal) => {
      const index = questions.findIndex((question) => question.prompt === signal.context);
      assert.ok(index >= 0, label + " signal must reference a real question");
      assert.equal(signal.answer, questions[index].options[answers[index]].label, label + " signal must quote the selected answer");
    });
  };

  assert.match(simulator.crossRead.interpretation, /seven fictional rounds/i);
  assert.match(simulator.crossRead.signals[0].detail, /holds|trims|additional buys/i);
  assert.match(simulator.crossRead.signals[1].context, /DAY 0[1-7]/);
  verifyAnswerSignals("Utility Inspector", utility.crossRead.signals, utilityQuestions, utilityAnswers);
  verifyAnswerSignals("Roadmap Generator", roadmap.crossRead.signals, roadmapQuestions, roadmapAnswers);
  verifyAnswerSignals("Whitepaper Factory", whitepaper.crossRead.signals, whitepaperQuestions, whitepaperAnswers);
  verifyAnswerSignals("99% Club", club.crossRead.signals, clubQuestions, clubAnswers);
  verifyAnswerSignals("Cope Index", cope.crossRead.signals, copeQuestions, copeAnswers);
  assert.doesNotMatch(cope.crossRead.interpretation, /mental-health diagnosis|clinical assessment/i);
});

test("all six downloadable case cards include their answer-linked cross-read", () => {
  const cardSources = [
    ["app/audit/audit-client.tsx", "function makeCardSvg"],
    ["app/simulator/simulator-client.tsx", "function makeCaseCard"],
    ["app/utility-inspector/utility-inspector-client.tsx", "function makeCaseCard"],
    ["app/roadmap-generator/roadmap-generator-client.tsx", "function makeCaseCard"],
    ["app/club/club-client.tsx", "function makeMembershipSvg"],
    ["app/cope-index/cope-index-client.tsx", "function makePersonalCard"],
  ];
  cardSources.forEach(([path, marker]) => {
    const source = readFileSync(path, "utf8");
    const start = source.indexOf(marker);
    const end = source.indexOf("\n}\n", start);
    assert.ok(start >= 0 && end > start, path + " must expose its card renderer");
    assert.match(source.slice(start, end), /result\.crossRead\.headline/, path + " card must include the cross-read");
  });
});

test("all six public social-preview images render their engine cross-read headline", () => {
  const previewPaths = [
    "app/simulator/case/[code]/opengraph-image.tsx",
    "app/utility-inspector/case/[code]/opengraph-image.tsx",
    "app/roadmap-generator/case/[code]/opengraph-image.tsx",
    "app/whitepaper-factory/case/[code]/opengraph-image.tsx",
    "app/club/member/[code]/opengraph-image.tsx",
    "app/cope-index/case/[code]/opengraph-image.tsx",
  ];
  previewPaths.forEach((path) => {
    const source = readFileSync(path, "utf8");
    assert.match(source, /crossRead\.headline/, path + " must display the answer-linked cross-read");
  });
});

test("Token-Purpose Inspector ecosystem-mirage profile matches its source answers", () => {
  assert.equal(utilityQuestions[0].options[3].tag, "institutional-mirage");
  assert.equal(utilityQuestions[2].options[3].tag, "institutional-mirage");

  const result = buildUtilityResult([3, 0, 3, 0, 0, 0, 0]);
  assert.equal(result.primaryTag, "institutional-mirage");
  assert.match(result.profile.title, /ECOSYSTEM EXPANSION MIRAGE/);
  assert.match(result.profile.subtitle, /future holder army/i);
});

test("U23.3 audited classifications match the exact answer semantics", () => {
  // These answers explicitly describe accountable controls, not admin override or vague consensus.
  assert.equal(whitepaperQuestions[5].options[0].tag, "risk-footnote");
  assert.equal(whitepaperQuestions[5].options[1].tag, "risk-footnote");
  assert.equal(whitepaperQuestions[5].options[2].tag, "dao-diplomat");
  assert.equal(whitepaperQuestions[6].options[2].tag, "dao-diplomat");
  assert.match(whitepaperClassifications["risk-footnote"].title, /RISK FOOTNOTE/);
  assert.match(whitepaperClassifications["dao-diplomat"].subtitle, /new admin/i);

  // The Club options now state the behavior described by their assigned archetypes.
  assert.match(clubQuestions[1].options[2].label, /every dip.*chance to add/i);
  assert.equal(clubQuestions[1].options[2].tag, "average-down-citizen");
  assert.match(clubQuestions[2].options[3].label, /tried to reopen.*ignored it/i);
  assert.equal(clubQuestions[2].options[3].tag, "paper-hands-survivor");

  // Evidence-led handover verification belongs with the evidence archivist, not the disengaged profile.
  assert.equal(copeQuestions[1].options[0].tag, "thesis-archivist");
  assert.match(copeQuestions[1].options[0].label, /verifiable handover/i);
  assert.match(copeClassifications["thesis-archivist"].subtitle, /source links/i);

  // Social posting after a red candle is community amplification, not a global-adoption claim.
  assert.equal(roadmapQuestions[4].options[3].tag, "community-amplifier");
  assert.match(roadmapClassifications["actually-shipping"].subtitle, /named owners and deliverables/i);
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


test("U24 journey routing is mapped once across all ten divisions without self-links or duplicate result panels", () => {
  const routes: Record<string, { page: string; destinations: string[] }> = {
    audit: { page: "audit", destinations: ["/simulator", "/cope-index"] },
    simulator: { page: "simulator", destinations: ["/audit", "/club"] },
    utility: { page: "utility-inspector", destinations: ["/roadmap-generator", "/whitepaper-factory"] },
    roadmap: { page: "roadmap-generator", destinations: ["/whitepaper-factory", "/utility-inspector"] },
    whitepaper: { page: "whitepaper-factory", destinations: ["/utility-inspector", "/museum"] },
    club: { page: "club", destinations: ["/cope-index", "/archives"] },
    cope: { page: "cope-index", destinations: ["/daily-office", "/club"] },
    daily: { page: "daily-office", destinations: ["/archives", "/cope-index"] },
    archives: { page: "archives", destinations: ["/daily-office", "/museum"] },
    museum: { page: "museum", destinations: ["/archives", "/club"] },
  };
  const component = readFileSync("app/components/department-next-steps.tsx", "utf8");
  assert.equal(Object.keys(routes).length, 10);

  for (const [department, route] of Object.entries(routes)) {
    const page = readFileSync("app/" + route.page + "/page.tsx", "utf8");
    const pageInstance = 'DepartmentNextSteps currentDepartment="' + department + '"';
    assert.equal(page.split(pageInstance).length - 1, 1, department + " must render exactly one page-level journey section");
    assert.ok(page.includes('<div className="shell">\n        <' + pageInstance + ' />\n      </div>'), department + " journey panel must respect the shared content-width shell");

    const routeStart = component.indexOf("  " + department + ": [");
    assert.ok(routeStart >= 0, department + " must have an explicit routing block");
    const routeEnd = component.indexOf("\n  ],", routeStart);
    assert.ok(routeEnd >= 0, department + " routing block must close cleanly");
    const routeBlock = component.slice(routeStart, routeEnd);
    const actualDestinations = Array.from(routeBlock.matchAll(/href: "([^"]+)"/g), (match) => match[1]);
    assert.deepEqual(actualDestinations, route.destinations, department + " must retain its two curated destinations");
    assert.equal(new Set(actualDestinations).size, 2, department + " destinations must be unique");
    assert.ok(!actualDestinations.includes("/" + route.page), department + " must not route to itself");
  }

  const interactiveClients = [
    "app/audit/audit-client.tsx",
    "app/simulator/simulator-client.tsx",
    "app/utility-inspector/utility-inspector-client.tsx",
    "app/roadmap-generator/roadmap-generator-client.tsx",
    "app/whitepaper-factory/whitepaper-factory-client.tsx",
    "app/club/club-client.tsx",
    "app/cope-index/cope-index-client.tsx",
  ];
  interactiveClients.forEach((path) => {
    const source = readFileSync(path, "utf8");
    assert.doesNotMatch(source, /DepartmentNextSteps/, path + " must not duplicate the page-level journey panel inside its result state");
  });
});


test("U24.2 every completed experience shows its local Passport receipt and opens its public case file", () => {
  const experiences = [
    { activity: "audit", client: "app/audit/audit-client.tsx", page: "app/audit/case/[code]/page.tsx", department: "audit", link: "OPEN PUBLIC CASE FILE" },
    { activity: "simulator", client: "app/simulator/simulator-client.tsx", page: "app/simulator/case/[code]/page.tsx", department: "simulator", link: "OPEN PUBLIC CASE FILE" },
    { activity: "utility", client: "app/utility-inspector/utility-inspector-client.tsx", page: "app/utility-inspector/case/[code]/page.tsx", department: "utility", link: "OPEN PUBLIC CASE FILE" },
    { activity: "roadmap", client: "app/roadmap-generator/roadmap-generator-client.tsx", page: "app/roadmap-generator/case/[code]/page.tsx", department: "roadmap", link: "OPEN PUBLIC TAKEOVER FILE" },
    { activity: "whitepaper", client: "app/whitepaper-factory/whitepaper-factory-client.tsx", page: "app/whitepaper-factory/case/[code]/page.tsx", department: "whitepaper", link: "OPEN PUBLIC TOKEN DOSSIER FILE" },
    { activity: "club", client: "app/club/club-client.tsx", page: "app/club/member/[code]/page.tsx", department: "club", link: "OPEN PUBLIC MEMBER FILE" },
    { activity: "cope", client: "app/cope-index/cope-index-client.tsx", page: "app/cope-index/case/[code]/page.tsx", department: "cope", link: "OPEN PUBLIC PERSONAL FILE" },
  ];

  for (const item of experiences) {
    const client = readFileSync(item.client, "utf8");
    const publicPage = readFileSync(item.page, "utf8");
    assert.ok(client.includes('recordPassportActivity("' + item.activity + '")'), item.activity + " must record completion at result creation");
    assert.ok(client.includes('PassportResultReceipt activity="' + item.activity + '"'), item.activity + " result must show its local receipt status");
    assert.ok(client.includes(item.link), item.activity + " result must expose its public case link");
    assert.ok(publicPage.includes("DepartmentPublicShare"), item.activity + " public case must expose share actions");
    assert.ok(publicPage.includes('DepartmentNextSteps currentDepartment="' + item.department + '"'), item.activity + " public case must offer curated next steps and Passport access");
    assert.ok(publicPage.includes("crossRead.headline"), item.activity + " public case must retain the result cross-read");
    assert.ok(!publicPage.includes("recordPassportActivity"), item.activity + " public views must not award the owner's completion activity to visitors");
  }

  const audit = readFileSync("app/audit/audit-client.tsx", "utf8");
  assert.ok(audit.includes('<a href={reportUrl}>OPEN PUBLIC CASE FILE'), "DYOR Audit must expose its public file directly from the result");
  const receipt = readFileSync("app/components/passport-result-receipt.tsx", "utf8");
  assert.ok(receipt.includes("readPassport()"));
  assert.ok(receipt.includes("completedActivities.includes(activity)"));
  assert.ok(receipt.includes("earlier completions are not backfilled"));
  assert.ok(receipt.includes('href="/passport"'));
});

test("U24.2 journey Passport messaging describes both visit stamps and completed-experience badges accurately", () => {
  const journey = readFileSync("app/components/department-next-steps.tsx", "utf8");
  assert.ok(journey.includes("department visits and completed-experience badges are saved locally"));
  assert.ok(journey.includes("OPEN / ENABLE PASSPORT"));
});


test("U24.3 all ten Department Stamps map to reachable division pages and direct public records", () => {
  assert.equal(DEPARTMENT_STAMPS.length, 10);
  assert.equal(departments.length, 10);
  assert.deepEqual(
    DEPARTMENT_STAMPS.map((stamp) => stamp.id),
    departments.map((department) => department.section),
    "Every listed division must have one matching Passport visit stamp in directory order",
  );

  const divisionPages = [
    ["simulator", "app/simulator/page.tsx"],
    ["club", "app/club/page.tsx"],
    ["audit", "app/audit/page.tsx"],
    ["daily", "app/daily-office/page.tsx"],
    ["archives", "app/archives/page.tsx"],
    ["roadmap", "app/roadmap-generator/page.tsx"],
    ["whitepaper", "app/whitepaper-factory/page.tsx"],
    ["utility", "app/utility-inspector/page.tsx"],
    ["museum", "app/museum/page.tsx"],
    ["cope", "app/cope-index/page.tsx"],
  ];

  for (const [section, path] of divisionPages) {
    const source = readFileSync(path, "utf8");
    assert.ok(source.includes('DepartmentHeader activeSection="' + section + '"'), path + " must record the matching division visit");
  }

  const directPublicPages = [
    ["audit", "app/audit/case/[code]/page.tsx"],
    ["simulator", "app/simulator/case/[code]/page.tsx"],
    ["utility", "app/utility-inspector/case/[code]/page.tsx"],
    ["roadmap", "app/roadmap-generator/case/[code]/page.tsx"],
    ["whitepaper", "app/whitepaper-factory/case/[code]/page.tsx"],
    ["club", "app/club/member/[code]/page.tsx"],
    ["cope", "app/cope-index/case/[code]/page.tsx"],
    ["archives", "app/archives/records/[slug]/page.tsx"],
    ["museum", "app/museum/exhibits/[slug]/page.tsx"],
  ];

  for (const [section, path] of directPublicPages) {
    const source = readFileSync(path, "utf8");
    assert.ok(source.includes('DepartmentHeader activeSection="' + section + '"'), path + " must count a direct public-record visit");
  }

  const header = readFileSync("app/components/department-header.tsx", "utf8");
  assert.match(header, /recordDepartmentVisit\(activeSection\)/);
  const layout = readFileSync("app/layout.tsx", "utf8");
  assert.match(layout, /<AchievementToastHost \/>/);
});

test("U24.3 special Culture Curator activities are recorded only on their matching detail pages", () => {
  const archive = readFileSync("app/archives/records/[slug]/page.tsx", "utf8");
  const museum = readFileSync("app/museum/exhibits/[slug]/page.tsx", "utf8");
  assert.match(archive, /<RecordPassportActivity activity="archive-record" \/>/);
  assert.match(archive, /DepartmentHeader activeSection="archives"/);
  assert.match(museum, /<RecordPassportActivity activity="museum-exhibit" \/>/);
  assert.match(museum, /DepartmentHeader activeSection="museum"/);

  const archiveIndex = readFileSync("app/archives/page.tsx", "utf8");
  const museumIndex = readFileSync("app/museum/page.tsx", "utf8");
  assert.doesNotMatch(archiveIndex, /RecordPassportActivity/);
  assert.doesNotMatch(museumIndex, /RecordPassportActivity/);

  const store = readFileSync("app/passport/passport-store.ts", "utf8");
  const cultureStart = store.indexOf('"culture-curator": {');
  const cultureEnd = store.indexOf("\n    },", cultureStart);
  assert.ok(cultureStart >= 0 && cultureEnd > cultureStart, "Culture Curator rule must exist");
  const cultureRule = store.slice(cultureStart, cultureEnd);
  assert.ok(cultureRule.includes('progress: Number(completed.has("museum-exhibit")) + Number(completed.has("archive-record"))'));
  assert.ok(cultureRule.includes("target: 2"));
});

test("U24.3 completed experience activities are recorded only in the final-answer branch", () => {
  const cases = [
    ["app/audit/audit-client.tsx", /if \(current === AUDIT_QUESTION_COUNT - 1\) \{\s*setResult\(buildResult\(next\)\);\s*recordPassportActivity\("audit"\);/],
    ["app/simulator/simulator-client.tsx", /if \(nextDecisions\.length === SIMULATOR_ROUNDS\) \{\s*setResult\(buildSimulatorResult\(nextDecisions\)\);\s*recordPassportActivity\("simulator"\);/],
    ["app/utility-inspector/utility-inspector-client.tsx", /if \(current === questions\.length - 1\) \{\s*setResult\(buildUtilityResult\(next\)\);\s*recordPassportActivity\("utility"\);/],
    ["app/roadmap-generator/roadmap-generator-client.tsx", /if \(current === questions\.length - 1\) \{\s*setResult\(buildRoadmapResult\(next, projectSlug\)\);\s*recordPassportActivity\("roadmap"\);/],
    ["app/whitepaper-factory/whitepaper-factory-client.tsx", /if \(current === questions\.length - 1\) \{\s*setResult\(buildWhitepaperResult\(next, projectSlug\)\);\s*recordPassportActivity\("whitepaper"\);/],
    ["app/club/club-client.tsx", /if \(current === questions\.length - 1\) \{\s*setResult\(buildClubResult\(next\)\);\s*recordPassportActivity\("club"\);/],
    ["app/cope-index/cope-index-client.tsx", /if \(current === questions\.length - 1\) \{\s*setResult\(buildPersonalCopeResult\(next\)\);\s*recordPassportActivity\("cope"\);/],
  ] as const;

  for (const [path, pattern] of cases) {
    const source = readFileSync(path, "utf8");
    assert.match(source, pattern, path + " must award Passport progress only after the complete experience");
  }
});

test("U24.3 local Passport status receipts refresh when the same register changes in another tab", () => {
  const receipt = readFileSync("app/components/passport-result-receipt.tsx", "utf8");
  assert.match(receipt, /PASSPORT_STORAGE_KEY/);
  assert.match(receipt, /window\.addEventListener\("storage", handleStorage\)/);
  assert.match(receipt, /window\.removeEventListener\("storage", handleStorage\)/);
  assert.match(receipt, /event\.key === null \|\| event\.key === PASSPORT_STORAGE_KEY/);

  const client = readFileSync("app/passport/passport-client.tsx", "utf8");
  assert.match(client, /PASSPORT_STORAGE_KEY/);
  assert.doesNotMatch(client, /dyor-department:passport:v1/);
});
