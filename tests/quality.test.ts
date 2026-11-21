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
import { buildDailyOfficeDispatch, getDailyEditorialCase } from "../app/daily-office/daily-engine";
import { buildDepartmentCaseAtlas, getDepartmentCaseReferences, selectDepartmentCaseAtlasWindow } from "../app/daily-office/case-atlas";
import { buildInstitutionalMemory, isValidInstitutionalMemoryDate, shiftInstitutionalMemoryDate } from "../app/daily-office/institutional-memory";
import { getDepartmentCaseThemeAnchor } from "../app/daily-office/case-theme-anchor";
import { buildDepartmentNarrative, departmentCaseThreads } from "../app/lib/department-narrative";
import { archiveRecords } from "../app/archives/archive-data";
import { exhibits } from "../app/museum/museum-data";
import { departmentGroups, departments, divisionNavigationGroups } from "../app/divisions";
import { CLUB_BADGE_IDS, DEPARTMENT_STAMPS, PASSPORT_ACHIEVEMENTS, getDailyOfficeVisitStreak, getPassportAchievementStatuses, type PassportData } from "../app/passport/passport-store";

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
  assert.ok(first.caseTheme.length > 0);
  assert.ok(first.subheading.includes(first.caseTheme));
  assert.match(first.methodology, /one coherent, date-selected editorial case route/i);
  assert.equal(first.sections.length, 6);
  assert.ok(first.sections.every((section) => section.heading.length > 0 && section.body.length > 0));
  assert.throws(() => buildDailyOfficeDispatch("2026-02-30"));
  assert.throws(() => buildDailyOfficeDispatch("not-a-date"));
});

test("U25.3 Department narrative threads connect all ten offices to existing fictional precedents", () => {
  const officeSections = new Set(departments.map((department) => department.section));
  const archiveSlugs = new Set(archiveRecords.map((record) => record.slug));
  const exhibitSlugs = new Set(exhibits.map((exhibit) => exhibit.slug));
  const mappedOffices = new Set<string>();

  assert.equal(Object.keys(departmentCaseThreads).length, 18, "Every daily editorial case theme must have a narrative thread");

  for (const [theme, thread] of Object.entries(departmentCaseThreads)) {
    assert.ok(theme.length > 0);
    assert.equal(thread.offices.length, 3);
    assert.ok(archiveSlugs.has(thread.archiveSlug), theme + " must cite an existing archive precedent");
    assert.ok(exhibitSlugs.has(thread.exhibitSlug), theme + " must cite an existing museum relic");

    for (const office of thread.offices) {
      assert.ok(officeSections.has(office.section), theme + " must route only to an existing Department office");
      mappedOffices.add(office.section);
      assert.ok(office.responsibility.length > 20);
    }
    assert.ok(thread.narrative.length > 80, theme + " must have a meaningful continuity explanation");
  }

  assert.deepEqual([...mappedOffices].sort(), [...officeSections].sort(), "The narrative network must include all ten divisions");
});

test("U25.3 daily case chains keep identical case identity across offices and dates", () => {
  for (let index = 0; index < 90; index += 1) {
    const issueDate = new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10);
    const dispatch = buildDailyOfficeDispatch(issueDate);
    const auditView = buildDepartmentNarrative(issueDate, "audit");
    const walletView = buildDepartmentNarrative(issueDate, "archives");

    for (const narrative of [auditView, walletView]) {
      assert.equal(narrative.issueDate, dispatch.issueDate);
      assert.equal(narrative.reference, dispatch.reference);
      assert.equal(narrative.caseTheme, dispatch.caseTheme);
      assert.equal(narrative.headline, dispatch.headline);
      assert.equal(narrative.offices.length, 3);
      assert.ok(narrative.precedent.href.startsWith("/archives/records/"));
      assert.ok(narrative.relic.href.startsWith("/museum/exhibits/"));
      assert.ok(narrative.precedent.summary.length > 30);
      assert.ok(narrative.relic.description.length > 30);
    }

    assert.notEqual(auditView.currentOffice.title, walletView.currentOffice.title);
  }
});

test("U27.3 shared case chains hand off dispatch evidence through three offices into archive and Museum records", () => {
  const chainClient = readFileSync("app/components/department-case-chain.tsx", "utf8");
  const css = readFileSync("app/globals.css", "utf8");
  assert.ok(chainClient.includes("office.evidence.source"));
  assert.ok(chainClient.includes("office.evidence.excerpt"));
  assert.ok(chainClient.includes("office.evidence.reviewQuestion"));
  assert.ok(chainClient.includes("office.handoff.destinations.map"));
  assert.ok(css.includes(".department-case-chain__evidence"));
  assert.ok(css.includes(".department-case-chain__handoff"));

  const seenThemes = new Set<string>();
  const seenEvidenceSources = new Set<string>();

  for (let index = 0; index < 180; index += 1) {
    const issueDate = new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10);
    const dispatch = buildDailyOfficeDispatch(issueDate);
    const views = departments.map((department) => buildDepartmentNarrative(issueDate, department.section));
    const sharedRoute = views[0].offices;

    seenThemes.add(dispatch.caseTheme);

    for (const narrative of views) {
      assert.equal(narrative.issueDate, dispatch.issueDate);
      assert.equal(narrative.reference, dispatch.reference);
      assert.equal(narrative.caseTheme, dispatch.caseTheme);
      assert.equal(narrative.headline, dispatch.headline);
      assert.equal(narrative.offices.length, 3);
      assert.equal(new Set(narrative.offices.map((office) => office.section)).size, 3);

      for (let stepIndex = 0; stepIndex < narrative.offices.length; stepIndex += 1) {
        const office = narrative.offices[stepIndex];
        const shared = sharedRoute[stepIndex];
        assert.equal(office.section, shared.section, "every division view must show the same handoff order");
        assert.deepEqual(office.evidence, shared.evidence, "all offices must receive the same source excerpt for a case step");
        assert.deepEqual(office.handoff, shared.handoff, "handoff destinations must not change with the viewing office");
        assert.ok(office.evidence.receivedFrom.length > 10);
        assert.ok(office.evidence.receivedArtifact.length > 10);
        assert.ok(office.evidence.outputLabel.length > 10);
        assert.ok(office.evidence.reviewQuestion.length > 30);
        assert.ok(office.evidence.excerpt.length > 40);
        seenEvidenceSources.add(office.evidence.source);
        if (stepIndex === 0) {
          assert.equal(office.evidence.receivedFrom, "THE TRENCHES DESK / DAILY CASE INTAKE");
          assert.equal(office.evidence.receivedArtifact, "ORIGINAL DAILY DISPATCH / INTAKE RECORD");
        } else {
          const previousOffice = narrative.offices[stepIndex - 1];
          assert.equal(office.evidence.receivedFrom, previousOffice.title);
          assert.equal(office.evidence.receivedArtifact, previousOffice.evidence.outputLabel);
        }

        if (office.evidence.source === "CONVICTION INDEX") {
          assert.ok(
            dispatch.convictionIndex.readings.some((reading) =>
              office.evidence.excerpt.includes(reading.label + ": " + reading.score + "/100"),
            ),
            "Copium Administration evidence must be drawn from a real synthetic index reading",
          );
        } else {
          const sourceSection = dispatch.sections.find((section) => section.label === office.evidence.source);
          assert.ok(sourceSection, "each handoff must cite an existing section in the same daily dispatch");
          assert.ok(sourceSection.body.includes(office.evidence.excerpt));
        }

        assert.equal(office.isCurrent, office.section === departments.find((department) => department.title === narrative.currentOffice.title)?.section);
        if (office.isCurrent) assert.equal(office.href, null);
        else assert.equal(office.href, departments.find((department) => department.section === office.section)?.href);

        if (stepIndex < narrative.offices.length - 1) {
          const nextOffice = narrative.offices[stepIndex + 1];
          const nextDepartment = departments.find((department) => department.section === nextOffice.section);
          assert.ok(nextDepartment);
          assert.equal(office.handoff.destinations.length, 1);
          assert.equal(office.handoff.destinations[0].href, nextDepartment.href);
          assert.ok(office.handoff.note.includes(nextOffice.responsibility));
        } else {
          assert.match(office.handoff.label, /FINAL DEPOSIT/);
          assert.deepEqual(
            office.handoff.destinations.map((destination) => destination.href),
            [narrative.precedent.href, narrative.relic.href],
          );
        }
      }

      assert.ok(narrative.precedent.href.startsWith("/archives/records/"));
      assert.ok(narrative.relic.href.startsWith("/museum/exhibits/"));
    }

    assert.deepEqual(
      views.map((view) => view.offices.map((office) => office.section)),
      views.map(() => sharedRoute.map((office) => office.section)),
      "the case route must be identical from all ten Department pages",
    );
  }

  assert.ok(seenThemes.size >= 12, "the shared case system must retain broad coverage of the editorial themes");
  assert.ok(seenEvidenceSources.has("CONVICTION INDEX"));
  assert.equal(
    [...seenEvidenceSources].sort().join("|"),
    ["BAGHOLDER POST-MORTEM", "CONVICTION INDEX", "INCIDENT REPORT", "INTERNAL CORRESPONDENCE", "KOL INTELLIGENCE", "ON-CHAIN DIVISION", "RISK DEPARTMENT"].sort().join("|"),
    "the ten offices must use only their seven existing source-record types",
  );
});

test("Global Cope Index and Trenches Desk share the same UTC editorial case across dates", () => {
  for (let index = 0; index < 60; index += 1) {
    const issueDate = new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10);
    const editorialCase = getDailyEditorialCase(issueDate);
    const dispatch = buildDailyOfficeDispatch(issueDate);
    const copeIndex = buildDailyCopeIndex(issueDate, editorialCase);

    assert.equal(copeIndex.caseTheme, dispatch.caseTheme, "Global Cope Index must share the daily theme");
    assert.equal(copeIndex.caseHeadline, dispatch.headline, "Global Cope Index must share the daily headline");
    assert.equal(copeIndex.caseBulletin, dispatch.bulletin, "Global Cope Index must share the daily bulletin");
    assert.equal(copeIndex.caseReference, dispatch.reference, "Global Cope Index must share the daily case reference");
  }
});

test("Global Cope Index is deterministic and exposes five bounded synthetic dimensions", () => {
  const editorialCase = getDailyEditorialCase("2026-11-20");
  const first = buildDailyCopeIndex("2026-11-20", editorialCase);
  assert.deepEqual(buildDailyCopeIndex("2026-11-20", editorialCase), first);
  assert.equal(first.issueDate, "2026-11-20");
  assert.equal(first.caseTheme, editorialCase.caseTheme);
  assert.equal(first.caseHeadline, editorialCase.headline);
  assert.equal(first.caseBulletin, editorialCase.bulletin);
  assert.equal(first.caseReference, editorialCase.reference);
  assert.equal(first.dimensions.length, 5);
  assertPercent(first.overall, "Global Cope overall");
  first.dimensions.forEach((item) => assertPercent(item.value, "Global Cope " + item.id));
  assert.throws(() => buildDailyCopeIndex("2026-02-30", editorialCase));
  assert.throws(() => buildDailyCopeIndex("not-a-date", editorialCase));
});
test("U27.4 Daily Content Quality keeps risk conclusions, post-mortems and Cope bulletins inside the same case theme", () => {
  const caseSignals: Record<string, { cope: RegExp; closure: RegExp }> = {
    "CA / LAUNCH CONTEXT": {
      cope: /CA|source|token purpose|ticker/i,
      closure: /source-verification|mint announcement|token-purpose|deployer|source/i,
    },
    "BONDING-CURVE GRADUATION": {
      cope: /curve|graduat|pool|demand/i,
      closure: /post-graduation|pool|graduation|demand|slippage/i,
    },
    "DEPLOYER / CTO HANDOVER": {
      cope: /deployer|CTO|banner|custody|key/i,
      closure: /access|ownership|handover|custody|operational control/i,
    },
    "KOL ECHO / COPIED CALLS": {
      cope: /KOL|accounts|claim|source|screenshot/i,
      closure: /originating claim|corroboration|repost|source|amplification/i,
    },
    "GREEN-CANDLE CONVICTION": {
      cope: /candle|chart|timeframe|green/i,
      closure: /timeframe|chart|candles|candle|screenshot/i,
    },
    "BUNDLE / WALLET THEORIES": {
      cope: /wallet|cluster|ownership|arrows/i,
      closure: /ownership|wallet|cluster|address|transaction/i,
    },
    "POST-GRADUATION LIQUIDITY": {
      cope: /pool|liquidity|slippage|depth|valuation/i,
      closure: /pool.depth|pool depth|trade size|liquidity|valuation/i,
    },
    "COMMUNITY TAKEOVER": {
      cope: /community|admins|takeover|access/i,
      closure: /access|ownership|handover|custody|operational control/i,
    },
    "DELETED KOL CALL": {
      cope: /KOL|call|screenshots|source|post/i,
      closure: /originating claim|corroboration|repost|source|amplification/i,
    },
    "100X ENTRY TIMING": {
      cope: /100X|entry|candle|target|post-mortem/i,
      closure: /timeframe|chart|candles|candle|screenshot|entry/i,
    },
    "CA SOURCE VERIFICATION": {
      cope: /CA|source|accounts|original post/i,
      closure: /source-verification|mint announcement|token-purpose|deployer|source/i,
    },
    "CTO ACCESS CHECKLIST": {
      cope: /CTO|access|repository|domain|treasury|signing/i,
      closure: /access|ownership|handover|custody|operational control/i,
    },
    "WALLET-GRAPH INTERPRETATION": {
      cope: /wallet|ownership|arrows|diagram|movement/i,
      closure: /ownership|wallet|cluster|address|transaction/i,
    },
    "EXIT-PLAN ABSENCE": {
      cope: /exit|invalidation|entry|price target/i,
      closure: /invalidation|exit|price target|thesis/i,
    },
    "GREEN-CANDLE EVIDENCE": {
      cope: /chart|candle|timeframe|wick/i,
      closure: /timeframe|chart|candles|candle|screenshot/i,
    },
    "SNIPER THEORY": {
      cope: /wallet|cluster|owner|early buys/i,
      closure: /ownership|wallet|cluster|address|transaction/i,
    },
    "MIGRATION CLAIM": {
      cope: /migration|CA|token|reference|destination/i,
      closure: /migration|token reference|CA|destination/i,
    },
    "BAGHOLDER ENTRY HISTORY": {
      cope: /entry|price|invalidation|thesis/i,
      closure: /invalidation|exit|price target|thesis|entry/i,
    },
  };
  const observedThemes = new Set<string>();
  const observedCopeBulletins = new Set<string>();

  for (let index = 0; index < 180; index += 1) {
    const issueDate = new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10);
    const dispatch = buildDailyOfficeDispatch(issueDate);
    const editorialCase = getDailyEditorialCase(issueDate);
    const copeIndex = buildDailyCopeIndex(issueDate, editorialCase);
    const repeatedCopeIndex = buildDailyCopeIndex(issueDate, editorialCase);
    const expected = caseSignals[dispatch.caseTheme];

    assert.ok(expected, issueDate + " must use a registered editorial case theme");
    assert.deepEqual(copeIndex, repeatedCopeIndex, "the case-specific Cope bulletin and its readings must remain deterministic");
    assert.equal(copeIndex.caseTheme, dispatch.caseTheme);
    assert.equal(copeIndex.caseHeadline, dispatch.headline);
    assert.equal(copeIndex.caseBulletin, dispatch.bulletin);
    assert.equal(copeIndex.caseReference, dispatch.reference);
    assert.match(copeIndex.bulletin, expected.cope, dispatch.caseTheme + " Cope bulletin must describe the same editorial case");
    assert.match(copeIndex.methodology, /selected only from variants written for that case theme/i);

    const riskSection = dispatch.sections.find((section) => section.label === "RISK DEPARTMENT");
    const postMortemSection = dispatch.sections.find((section) => section.label === "BAGHOLDER POST-MORTEM");
    assert.ok(riskSection && postMortemSection);
    assert.match(riskSection.body, expected.closure, dispatch.caseTheme + " risk reframe must remain case-specific");
    assert.match(postMortemSection.body, expected.closure, dispatch.caseTheme + " post-mortem conclusion must remain case-specific");

    assert.equal(copeIndex.dimensions.length, 5);
    assert.ok(copeIndex.dimensions.every((dimension) =>
      Number.isInteger(dimension.value) && dimension.value >= 0 && dimension.value <= 100,
    ));
    const expectedOverall = Math.round(
      copeIndex.dimensions.reduce((sum, dimension) => sum + dimension.value, 0) / copeIndex.dimensions.length,
    );
    assert.equal(copeIndex.overall, expectedOverall, "the displayed overall reading must reconcile to its five dimensions");
    const expectedStatus = expectedOverall >= 75 ? "SEVERE / PAPERWORK ADVISED" :
      expectedOverall >= 55 ? "ELEVATED / CHAT ECHO PERSISTENT" :
      expectedOverall >= 35 ? "MODERATE / THESIS STILL OPEN" :
      "CALM / SUSPICIOUSLY WELL-ADJUSTED";
    assert.equal(copeIndex.status, expectedStatus, "the status label must match the displayed score");

    const conviction = dispatch.convictionIndex;
    assert.ok(conviction.score >= 96 && conviction.score <= 99);
    assert.equal(conviction.classification, "UNREASONABLY CONFIDENT");
    assert.match(conviction.note, /intentionally insulated from evidence quality/i);
    assert.equal(conviction.readings.length, 6);
    const expectedReadings = [
      { label: "CA RESEARCH EFFORT", min: 86, max: 100, assessment: "EXCESSIVE", tone: "green" },
      { label: "KOL SOURCE INDEPENDENCE", min: 2, max: 16, assessment: "MOSTLY ECHO", tone: "red" },
      { label: "BUNDLE THEORY CONFIDENCE", min: 93, max: 100, assessment: "OPTIMISM DETECTED", tone: "green" },
      { label: "POST-GRADUATION LIQUIDITY AWARENESS", min: 1, max: 14, assessment: "SELECTIVE", tone: "red" },
      { label: "EXIT PLAN READINESS", min: 0, max: 8, assessment: "NOT DETECTED", tone: "red" },
      { label: "CTO HANDOVER UNDERSTANDING", min: 1, max: 11, assessment: "PENDING", tone: "amber" },
    ] as const;
    for (const [readingIndex, expectedReading] of expectedReadings.entries()) {
      const reading = conviction.readings[readingIndex];
      assert.equal(reading.label, expectedReading.label);
      assert.ok(reading.score >= expectedReading.min && reading.score <= expectedReading.max);
      assert.equal(reading.assessment, expectedReading.assessment);
      assert.equal(reading.tone, expectedReading.tone);
    }

    observedThemes.add(dispatch.caseTheme);
    observedCopeBulletins.add(copeIndex.bulletin);
  }

  assert.equal(observedThemes.size, 18, "all existing editorial case themes must appear in the quality sample");
  assert.ok(observedCopeBulletins.size >= 18, "case-specific Cope bulletins must preserve variety across the sampled period");
});



function makePassport(overrides: Partial<PassportData> = {}): PassportData {
  return {
    version: 3, enabled: true, createdAt: "2026-11-20T12:00:00.000Z",
    visitedDepartments: [], dailyOfficeDates: [], bestDailyStreak: 0, completedActivities: [],
    clubMembershipAnswers: null, clubApplicationCount: 0, clubChallengeAnswers: {}, clubBadgeIds: [],
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
  assert.equal(all.filter((item) => !item.id.startsWith("club-") || item.id === "club-admitted").every((item) => item.earned), true);
  assert.equal(all.filter((item) => item.id.startsWith("club-") && item.id !== "club-admitted").every((item) => !item.earned), true);
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

test("U27.1 daily editorial rotation avoids repeating a focus across the previous four UTC issues", () => {
  const focusByTheme = {
    "CA / LAUNCH CONTEXT": "launch",
    "BONDING-CURVE GRADUATION": "graduation",
    "DEPLOYER / CTO HANDOVER": "handover",
    "KOL ECHO / COPIED CALLS": "kol",
    "GREEN-CANDLE CONVICTION": "chart",
    "BUNDLE / WALLET THEORIES": "wallet",
    "POST-GRADUATION LIQUIDITY": "liquidity",
    "COMMUNITY TAKEOVER": "handover",
    "DELETED KOL CALL": "kol",
    "100X ENTRY TIMING": "chart",
    "CA SOURCE VERIFICATION": "launch",
    "CTO ACCESS CHECKLIST": "handover",
    "WALLET-GRAPH INTERPRETATION": "wallet",
    "EXIT-PLAN ABSENCE": "exit",
    "GREEN-CANDLE EVIDENCE": "chart",
    "SNIPER THEORY": "wallet",
    "MIGRATION CLAIM": "migration",
    "BAGHOLDER ENTRY HISTORY": "exit",
  } as const;
  const focusHistory: string[] = [];
  const themes = new Set<string>();

  for (let index = 0; index < 180; index += 1) {
    const issueDate = new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10);
    const dispatch = buildDailyOfficeDispatch(issueDate);
    const focus = focusByTheme[dispatch.caseTheme as keyof typeof focusByTheme];

    assert.ok(focus, issueDate + " must map to a known editorial focus");
    assert.ok(
      !focusHistory.slice(-4).includes(focus),
      issueDate + " repeats the " + focus + " editorial focus inside the four-issue cooldown",
    );
    focusHistory.push(focus);
    themes.add(dispatch.caseTheme);
  }

  assert.equal(new Set(focusHistory).size, 9, "the rotation must use all nine editorial focus lanes");
  assert.ok(themes.size >= 12, "the rotation must retain broad coverage of the 18 existing case themes");
});

test("U27.2 daily briefing contains focus-specific operational detail in all six report sections", () => {
  const focusByTheme = {
    "CA / LAUNCH CONTEXT": { id: "launch", signal: /mint authority|mint address|deployer|primary announcement/i },
    "BONDING-CURVE GRADUATION": { id: "graduation", signal: /bonding.curve|post.graduation|pool depth|migration/i },
    "DEPLOYER / CTO HANDOVER": { id: "handover", signal: /treasury|repository|domain control|access checklist|signing authority/i },
    "KOL ECHO / COPIED CALLS": { id: "kol", signal: /quote.posts|reposts|source trail|primary source|promotional disclosure/i },
    "GREEN-CANDLE CONVICTION": { id: "chart", signal: /timeframe|candle|wick|chart interval|invalidation/i },
    "BUNDLE / WALLET THEORIES": { id: "wallet", signal: /common owner|wallet|addresses|ownership|transaction/i },
    "POST-GRADUATION LIQUIDITY": { id: "liquidity", signal: /pool depth|slippage|trade size|holder concentration|liquidity/i },
    "COMMUNITY TAKEOVER": { id: "handover", signal: /treasury|repository|domain control|access checklist|signing authority/i },
    "DELETED KOL CALL": { id: "kol", signal: /quote.posts|reposts|source trail|primary source|promotional disclosure/i },
    "100X ENTRY TIMING": { id: "chart", signal: /timeframe|candle|wick|chart interval|invalidation/i },
    "CA SOURCE VERIFICATION": { id: "launch", signal: /mint authority|mint address|deployer|primary announcement/i },
    "CTO ACCESS CHECKLIST": { id: "handover", signal: /treasury|repository|domain control|access checklist|signing authority/i },
    "WALLET-GRAPH INTERPRETATION": { id: "wallet", signal: /common owner|wallet|addresses|ownership|transaction/i },
    "EXIT-PLAN ABSENCE": { id: "exit", signal: /invalidation condition|exit condition|exit plan|entry rationale|disconfirm/i },
    "GREEN-CANDLE EVIDENCE": { id: "chart", signal: /timeframe|candle|wick|chart interval|invalidation/i },
    "SNIPER THEORY": { id: "wallet", signal: /common owner|wallet|addresses|ownership|transaction/i },
    "MIGRATION CLAIM": { id: "migration", signal: /old and new|destination address|migration|token references|new mint/i },
    "BAGHOLDER ENTRY HISTORY": { id: "exit", signal: /invalidation condition|exit condition|exit plan|entry rationale|disconfirm/i },
  } as const;
  const seenFocuses = new Set<string>();
  const seenThemes = new Set<string>();

  for (let index = 0; index < 180; index += 1) {
    const issueDate = new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10);
    const dispatch = buildDailyOfficeDispatch(issueDate);
    const focus = focusByTheme[dispatch.caseTheme as keyof typeof focusByTheme];

    assert.ok(focus, issueDate + " must map to a recognised editorial focus");
    assert.equal(dispatch.sections.length, 6);
    assert.match(dispatch.methodology, /focus-specific operational detail/i);

    const completeCopy = dispatch.sections.map((section) => section.body).join(" ");
    assert.match(completeCopy, focus.signal, dispatch.caseTheme + " must contain its own domain-specific evidence vocabulary");

    for (const section of dispatch.sections) {
      const wordCount = section.body.trim().split(/\s+/).length;
      assert.ok(wordCount >= 38, issueDate + " / " + section.label + " should contain a developed report, not a one-line placeholder");
      assert.ok(section.heading.length > 0 && section.stamp.length > 0);
    }

    assert.equal(new Set(dispatch.sections.map((section) => section.body)).size, 6, issueDate + " must not repeat one body across divisions");
    seenFocuses.add(focus.id);
    seenThemes.add(dispatch.caseTheme);
  }

  assert.equal(seenFocuses.size, 9, "all nine editorial focus lanes must receive operational detail");
  assert.equal(seenThemes.size, 18, "all 18 existing editorial case themes must remain available");
});

test("Daily CT Briefing retains a healthy range of date-seeded editorial variants", () => {
  const reports = Array.from({ length: 120 }, (_, index) => {
    const date = new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10);
    return buildDailyOfficeDispatch(date);
  });
  const uniqueHeadlines = new Set(reports.map((report) => report.headline));
  const uniqueBulletins = new Set(reports.map((report) => report.bulletin));
  const uniqueIncidentHeadings = new Set(reports.map((report) => report.sections[0].heading));
  const uniqueCaseThemes = new Set(reports.map((report) => report.caseTheme));
  const uniqueBriefings = new Set(reports.map((report) =>
    [report.headline, report.bulletin, ...report.sections.map((section) => section.heading + "|" + section.body)].join("||")
  ));

  assert.ok(uniqueHeadlines.size >= 12, "Daily headlines should not collapse into a small repeating subset");
  assert.ok(uniqueBulletins.size >= 12, "Daily bulletins should retain meaningful variation");
  assert.ok(uniqueIncidentHeadings.size >= 9, "Incident reports should draw from a broad portion of the editorial library");
  assert.ok(uniqueCaseThemes.size >= 12, "Daily reports should rotate through a broad set of coherent editorial themes");
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


test("U25.4 institutional memory accepts only real UTC dates through the current issue date", () => {
  assert.equal(isValidInstitutionalMemoryDate("2024-02-29", "2024-03-01"), true);
  assert.equal(isValidInstitutionalMemoryDate("2025-02-29", "2025-03-01"), false);
  assert.equal(isValidInstitutionalMemoryDate("2026-11-22", "2026-11-21"), false);
  assert.equal(isValidInstitutionalMemoryDate("2026-11-21", "2026-11-21"), true);
  assert.equal(isValidInstitutionalMemoryDate("2026-1-02", "2026-11-21"), false);
  assert.equal(isValidInstitutionalMemoryDate("not-a-date", "2026-11-21"), false);
  assert.equal(shiftInstitutionalMemoryDate("2024-03-01", -1), "2024-02-29");
  assert.equal(shiftInstitutionalMemoryDate("2024-02-29", 1), "2024-03-01");
  assert.throws(() => shiftInstitutionalMemoryDate("2024-02-30", 1));
  assert.throws(() => shiftInstitutionalMemoryDate("2024-02-29", 1.5));
});

test("U25.4 fourteen-day register is chronological, reproducible and cross-links every adjacent file", () => {
  const today = new Date().toISOString().slice(0, 10);
  const records = buildInstitutionalMemory(today, 14);
  const duplicate = buildInstitutionalMemory(today, 14);

  assert.equal(records.length, 14);
  assert.deepEqual(records, duplicate, "the same UTC date must reproduce the same institutional record sequence");
  assert.equal(records[13].issueDate, today);
  assert.equal(records[13].href, "/daily-office");
  assert.equal(records[0].predecessor, null);
  assert.equal(records[13].successor, null);

  for (let index = 0; index < records.length; index += 1) {
    const record = records[index];
    assert.equal(record.issueDate, shiftInstitutionalMemoryDate(records[0].issueDate, index));
    assert.ok(record.reference.startsWith("DD-"), "every daily record must retain its source reference");
    assert.ok(record.caseTheme.length > 0 && record.headline.length > 0);
    assert.ok(record.bulletin.length > 0 && record.postMortem.length > 0);
    assert.ok(record.assignedDepartment.length > 0 && record.disposition.length > 0);
    assert.ok(record.handoffNote.length > 0);
    if (index > 0) {
      assert.equal(record.predecessor?.issueDate, records[index - 1].issueDate);
      assert.equal(record.predecessor?.reference, records[index - 1].reference);
      assert.equal(records[index - 1].successor?.issueDate, record.issueDate);
      assert.match(record.handoffNote, new RegExp(records[index - 1].disposition.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
    if (index < records.length - 1) {
      assert.equal(record.successor?.issueDate, records[index + 1].issueDate);
    }
    assert.ok(record.href === "/daily-office" || record.href === "/daily-office/archive/" + record.issueDate);
  }
});

test("U25.4 daily desk exposes linked historical files without adding visitor-data persistence", () => {
  const dailyPage = readFileSync("app/daily-office/page.tsx", "utf8");
  const client = readFileSync("app/daily-office/daily-client.tsx", "utf8");
  const ledger = readFileSync("app/daily-office/ledger/page.tsx", "utf8");
  const archivedPage = readFileSync("app/daily-office/archive/[date]/page.tsx", "utf8");

  assert.ok(dailyPage.includes('href="/daily-office/ledger"'));
  assert.ok(client.includes('pagePath = "/daily-office"'));
  assert.ok(client.includes("casePath={pagePath}"));
  assert.ok(ledger.includes("buildInstitutionalMemory(issueDate, 14)"));
  assert.ok(ledger.includes("record.predecessor.href"));
  assert.ok(ledger.includes("record.successor.href"));
  assert.ok(archivedPage.includes("isValidInstitutionalMemoryDate(date)"));
  assert.ok(archivedPage.includes('pagePath={route}'));
  assert.ok(archivedPage.includes("robots: { index: false, follow: true }"));
  assert.doesNotMatch(ledger, /localStorage|sessionStorage|recordPassportActivity/);
  assert.doesNotMatch(archivedPage, /localStorage|sessionStorage|recordPassportActivity/);
  assert.match(ledger, /NO VISITOR DATA IS STORED/);
});


test("U25.5 Case Atlas reconciles all 18 themes against three valid offices and existing archive and Museum records", () => {
  const today = new Date().toISOString().slice(0, 10);
  const atlas = buildDepartmentCaseAtlas(today, 90);
  const repeated = buildDepartmentCaseAtlas(today, 90);

  assert.deepEqual(atlas, repeated, "the same as-of UTC date must produce the same Case Atlas");
  assert.equal(atlas.asOfDate, today);
  assert.equal(atlas.lookbackDays, 90);
  assert.equal(atlas.entries.length, 18);
  assert.deepEqual(
    atlas.entries.map((entry) => entry.theme).sort(),
    Object.keys(departmentCaseThreads).sort(),
    "every existing Department narrative thread must appear exactly once",
  );

  for (const entry of atlas.entries) {
    assert.equal(entry.offices.length, 3);
    assert.equal(new Set(entry.offices.map((office) => office.section)).size, 3);
    for (const office of entry.offices) {
      assert.ok(departments.some((department) => department.section === office.section && department.href === office.href && department.title === office.title));
      assert.ok(office.responsibility.length > 20);
    }
    assert.ok(archiveRecords.some((record) => record.accession === entry.precedent.accession && entry.precedent.href === "/archives/records/" + record.slug));
    assert.ok(exhibits.some((exhibit) => exhibit.accession === entry.relic.accession && entry.relic.href === "/museum/exhibits/" + exhibit.slug));
    assert.ok(entry.occurrenceCount >= 0 && entry.occurrenceCount <= 90);
    if (entry.latestOccurrence) {
      assert.ok(entry.latestOccurrence.issueDate <= today);
      assert.ok(entry.latestOccurrence.reference.startsWith("DD-"));
      assert.ok(entry.latestOccurrence.href === "/daily-office" || entry.latestOccurrence.href === "/daily-office/archive/" + entry.latestOccurrence.issueDate);
      assert.ok(entry.occurrenceCount > 0);
    } else {
      assert.equal(entry.occurrenceCount, 0);
    }
  }

  assert.equal(atlas.divisions.length, 10);
  assert.deepEqual(atlas.divisions.map((division) => division.section), departments.map((department) => department.section));
  for (const division of atlas.divisions) {
    const expected = atlas.entries.filter((entry) => entry.offices.some((office) => office.section === division.section));
    assert.ok(expected.length > 0, division.title + " must be connected to at least one case theme");
    assert.equal(division.themeCount, expected.length);
    assert.deepEqual(division.themes, expected.map((entry) => entry.theme));
  }
  assert.throws(() => buildDepartmentCaseAtlas("not-a-date", 90));
  assert.throws(() => buildDepartmentCaseAtlas(today, 0));
  assert.throws(() => buildDepartmentCaseAtlas(today, 241));
});

test("U25.5 Case Atlas is reachable from every division and provides working topic and office filters", () => {
  const atlasPage = readFileSync("app/daily-office/atlas/page.tsx", "utf8");
  const atlasClient = readFileSync("app/daily-office/department-case-atlas-client.tsx", "utf8");
  const atlasEngine = readFileSync("app/daily-office/case-atlas.ts", "utf8");
  const nextSteps = readFileSync("app/components/department-next-steps.tsx", "utf8");
  const dailyPage = readFileSync("app/daily-office/page.tsx", "utf8");
  const ledgerPage = readFileSync("app/daily-office/ledger/page.tsx", "utf8");

  assert.ok(atlasPage.includes("buildDepartmentCaseAtlas(asOfDate, 240)"));
  assert.ok(atlasPage.includes('canonical: "/daily-office/atlas"'));
  assert.ok(atlasClient.includes('type="search"'));
  assert.ok(atlasClient.includes("setQuery"));
  assert.ok(atlasClient.includes("setOfficeFilter"));
  assert.ok(atlasClient.includes("entry.offices.some"));
  assert.ok(atlasClient.includes("entry.precedent.href"));
  assert.ok(atlasClient.includes("entry.relic.href"));
  assert.ok(atlasClient.includes("entry.latestOccurrence.href"));
  assert.ok(atlasEngine.includes("departmentCaseThreads"));
  assert.ok(atlasEngine.includes("archiveRecords"));
  assert.ok(atlasEngine.includes("exhibits"));
  assert.ok(atlasEngine.includes("buildDailyOfficeDispatch"));
  assert.ok(nextSteps.includes('href="/daily-office/atlas"'));
  assert.ok(dailyPage.includes('href="/daily-office/atlas"'));
  assert.ok(ledgerPage.includes('href="/daily-office/atlas"'));
  assert.doesNotMatch(atlasPage + atlasClient + atlasEngine, /localStorage|sessionStorage|recordPassportActivity/);
});


test("U27.5 institutional case themes link to semantically relevant Archive and Museum records", () => {
  const expectedReferences = [
    {
      theme: "CA / LAUNCH CONTEXT",
      archive: "appendix-m-technical-detail",
      museum: "the-screenshot-of-a-screenshot",
      archiveSignal: /deployer control|token purpose|launch route/i,
    },
    {
      theme: "BUNDLE / WALLET THEORIES",
      archive: "the-wallet-graph-does-not-prove-ownership",
      museum: "the-bundle-family-portrait",
      archiveSignal: /wallet graph|common ownership|address|transaction/i,
    },
    {
      theme: "WALLET-GRAPH INTERPRETATION",
      archive: "the-wallet-graph-does-not-prove-ownership",
      museum: "the-bundle-family-portrait",
      archiveSignal: /wallet graph|common ownership|address|transaction/i,
    },
    {
      theme: "SNIPER THEORY",
      archive: "the-wallet-graph-does-not-prove-ownership",
      museum: "the-bundle-family-portrait",
      archiveSignal: /wallet graph|common ownership|address|transaction/i,
    },
    {
      theme: "DELETED KOL CALL",
      archive: "seventeenth-rocket-custody",
      museum: "the-screenshot-of-a-screenshot",
      archiveSignal: /preservation memo|launch-call screenshot|screenshot/i,
    },
    {
      theme: "100X ENTRY TIMING",
      archive: "the-entry-was-impeccable",
      museum: "the-screenshot-of-a-screenshot",
      archiveSignal: /late.entry|five.minute chart|KOL reply/i,
    },
    {
      theme: "BAGHOLDER ENTRY HISTORY",
      archive: "the-entry-was-impeccable",
      museum: "the-screenshot-of-a-screenshot",
      archiveSignal: /late.entry|five.minute chart|KOL reply/i,
    },
  ] as const;

  assert.equal(new Set(archiveRecords.map((record) => record.slug)).size, archiveRecords.length);
  assert.equal(new Set(archiveRecords.map((record) => record.accession)).size, archiveRecords.length);
  assert.equal(new Set(exhibits.map((exhibit) => exhibit.slug)).size, exhibits.length);
  assert.equal(new Set(exhibits.map((exhibit) => exhibit.accession)).size, exhibits.length);

  for (const expected of expectedReferences) {
    const thread = departmentCaseThreads[expected.theme];
    assert.ok(thread, expected.theme + " must have a registered institutional thread");
    assert.equal(thread.archiveSlug, expected.archive, expected.theme + " must reference its matching Archive precedent");
    assert.equal(thread.exhibitSlug, expected.museum, expected.theme + " must reference its matching Museum relic");

    const archive = archiveRecords.find((record) => record.slug === thread.archiveSlug);
    const exhibit = exhibits.find((item) => item.slug === thread.exhibitSlug);
    assert.ok(archive, expected.theme + " Archive precedent must exist");
    assert.ok(exhibit, expected.theme + " Museum relic must exist");

    const archiveCopy = [
      archive.title,
      archive.summary,
      archive.finding,
      ...archive.sections.flatMap((section) => [section.heading, ...section.paragraphs]),
    ].join(" ");
    const museumCopy = [exhibit.title, exhibit.description, exhibit.curatorNote, exhibit.plaque, ...exhibit.keywords].join(" ");
    assert.match(archiveCopy, expected.archiveSignal, expected.theme + " Archive copy must describe the same subject");
    assert.ok(museumCopy.length > 80);
    assert.ok(archive.relatedHref.startsWith("/"), "Archive related actions must use an internal site route");
  }

  const walletRecord = archiveRecords.find((record) => record.slug === "the-wallet-graph-does-not-prove-ownership");
  assert.ok(walletRecord);
  assert.equal(walletRecord.accession, "DDA-016");
  assert.match(walletRecord.finding, /COMMON OWNERSHIP NOT ESTABLISHED/);
  assert.match(walletRecord.sections.map((section) => section.paragraphs.join(" ")).join(" "), /observation|inference|unknown/i);
  assert.equal(walletRecord.relatedHref, "/museum/exhibits/the-bundle-family-portrait");
});

test("U25.6 Archive and Museum detail records provide reciprocal Case Atlas cross-references", () => {
  const archivePage = readFileSync("app/archives/records/[slug]/page.tsx", "utf8");
  const museumPage = readFileSync("app/museum/exhibits/[slug]/page.tsx", "utf8");
  const referenceComponent = readFileSync("app/components/department-case-references.tsx", "utf8");
  const atlasClient = readFileSync("app/daily-office/department-case-atlas-client.tsx", "utf8");

  assert.ok(archivePage.includes('<DepartmentCaseReferences source="archive" slug={record.slug} />'));
  assert.ok(museumPage.includes('<DepartmentCaseReferences source="museum" slug={exhibit.slug} />'));
  assert.ok(atlasClient.includes('id={"case-thread-" + getDepartmentCaseThemeAnchor(entry.theme)}'));
  assert.ok(referenceComponent.includes('"/daily-office/atlas#" + reference.anchor'));
  assert.ok(referenceComponent.includes("reference.counterpart.href"));

  const anchors = Object.keys(departmentCaseThreads).map(getDepartmentCaseThemeAnchor);
  assert.equal(new Set(anchors).size, anchors.length, "all 18 Atlas case anchors must be unique");

  let archiveReferenceCount = 0;
  for (const record of archiveRecords) {
    const references = getDepartmentCaseReferences("archive", record.slug);
    archiveReferenceCount += references.length;
    for (const reference of references) {
      assert.ok(departmentCaseThreads[reference.theme]);
      assert.equal(reference.anchor, "case-thread-" + getDepartmentCaseThemeAnchor(reference.theme));
      assert.equal(reference.offices.length, 3);
      assert.equal(new Set(reference.offices.map((office) => office.section)).size, 3);
      assert.ok(reference.offices.every((office) => departments.some((department) => department.section === office.section && department.href === office.href)));
      assert.ok(exhibits.some((exhibit) => reference.counterpart.href === "/museum/exhibits/" + exhibit.slug && reference.counterpart.accession === exhibit.accession));
    }
  }

  let museumReferenceCount = 0;
  for (const exhibit of exhibits) {
    const references = getDepartmentCaseReferences("museum", exhibit.slug);
    museumReferenceCount += references.length;
    for (const reference of references) {
      assert.ok(departmentCaseThreads[reference.theme]);
      assert.equal(reference.anchor, "case-thread-" + getDepartmentCaseThemeAnchor(reference.theme));
      assert.equal(reference.offices.length, 3);
      assert.ok(archiveRecords.some((record) => reference.counterpart.href === "/archives/records/" + record.slug && reference.counterpart.accession === record.accession));
    }
  }

  assert.equal(archiveReferenceCount, 18, "all 18 threads must point back from their Archive precedent");
  assert.equal(museumReferenceCount, 18, "all 18 threads must point back from their Museum exhibit");
  assert.ok(Object.keys(departmentCaseThreads).some((theme) => getDepartmentCaseReferences("archive", departmentCaseThreads[theme].archiveSlug).some((reference) => reference.theme === theme)));
  assert.doesNotMatch(referenceComponent, /localStorage|sessionStorage|recordPassportActivity/);
});


test("U25.7 Case Atlas retains every daily appearance and links the complete 90-day chronology", () => {
  const today = new Date().toISOString().slice(0, 10);
  const atlas = buildDepartmentCaseAtlas(today, 90);
  const windowStart = shiftInstitutionalMemoryDate(today, -89);
  const expectedByTheme = new Map<string, Array<{ issueDate: string; reference: string; headline: string }>>();

  for (let offset = 0; offset < 90; offset += 1) {
    const issueDate = shiftInstitutionalMemoryDate(today, -offset);
    const dispatch = buildDailyOfficeDispatch(issueDate);
    const list = expectedByTheme.get(dispatch.caseTheme) ?? [];
    list.push({ issueDate, reference: dispatch.reference, headline: dispatch.headline });
    expectedByTheme.set(dispatch.caseTheme, list);
  }

  let totalOccurrences = 0;
  for (const entry of atlas.entries) {
    const expected = expectedByTheme.get(entry.theme) ?? [];
    assert.equal(entry.occurrenceCount, expected.length);
    assert.equal(entry.occurrences.length, expected.length);
    assert.equal(entry.latestOccurrence?.issueDate ?? null, expected[0]?.issueDate ?? null);
    assert.deepEqual(
      entry.occurrences.map(({ issueDate, reference, headline }) => ({ issueDate, reference, headline })),
      expected,
      entry.theme + " must expose its full most-recent-first history",
    );

    entry.occurrences.forEach((occurrence, index) => {
      assert.ok(occurrence.issueDate >= windowStart && occurrence.issueDate <= today);
      assert.ok(occurrence.reference.startsWith("DD-"));
      assert.equal(occurrence.reference, expected[index].reference);
      assert.ok(occurrence.href === "/daily-office" && occurrence.issueDate === today ||
        occurrence.href === "/daily-office/archive/" + occurrence.issueDate);
      assert.ok(occurrence.headline.length > 0);
    });
    totalOccurrences += entry.occurrences.length;
  }

  assert.equal(totalOccurrences, 90, "each of the 90 daily briefs must belong to exactly one thematic thread");
  assert.equal(
    atlas.entries.reduce((sum, entry) => sum + entry.occurrenceCount, 0),
    90,
  );
});

test("U25.7 Case Atlas renders an accessible expandable history for each thematic thread", () => {
  const atlasClient = readFileSync("app/daily-office/department-case-atlas-client.tsx", "utf8");
  const atlasEngine = readFileSync("app/daily-office/case-atlas.ts", "utf8");
  assert.ok(atlasClient.includes("<details className=\"department-case-atlas__timeline\""));
  assert.ok(atlasClient.includes("<summary>"));
  assert.ok(atlasClient.includes("entry.occurrences.map"));
  assert.ok(atlasClient.includes('dateTime={occurrence.issueDate}'));
  assert.ok(atlasClient.includes('href={occurrence.href}'));
  assert.ok(atlasEngine.includes("occurrences: DepartmentCaseAtlasOccurrence[]"));
  assert.ok(atlasEngine.includes("existing.occurrences.push(occurrence)"));
  assert.ok(atlasEngine.includes("const occurrences = appearance?.occurrences ?? []"));
});


test("U25.8 Case Atlas recurrence analysis reports exact UTC gaps without inventing missing history", () => {
  const today = new Date().toISOString().slice(0, 10);
  const atlas = buildDepartmentCaseAtlas(today, 90);

  const utcGap = (newerDate: string, olderDate: string) =>
    Math.round((Date.parse(newerDate + "T00:00:00.000Z") - Date.parse(olderDate + "T00:00:00.000Z")) / 86400000);

  for (const entry of atlas.entries) {
    const occurrences = entry.occurrences;
    const expectedIntervals = occurrences.slice(1).map((older, index) => ({
      newerIssueDate: occurrences[index].issueDate,
      olderIssueDate: older.issueDate,
      days: utcGap(occurrences[index].issueDate, older.issueDate),
    }));
    const gaps = expectedIntervals.map((interval) => interval.days);
    const recurrence = entry.recurrence;

    assert.deepEqual(recurrence.intervals, expectedIntervals, entry.theme + " must preserve every adjacent recurrence gap");
    assert.equal(recurrence.daysSinceLatest, occurrences[0] ? utcGap(today, occurrences[0].issueDate) : null);
    assert.equal(recurrence.previousOccurrence?.issueDate ?? null, occurrences[1]?.issueDate ?? null);
    assert.equal(recurrence.averageIntervalDays, gaps.length ? gaps.reduce((sum, days) => sum + days, 0) / gaps.length : null);
    assert.equal(recurrence.shortestIntervalDays, gaps.length ? Math.min(...gaps) : null);
    assert.equal(recurrence.longestIntervalDays, gaps.length ? Math.max(...gaps) : null);
    assert.ok(recurrence.daysSinceLatest === null || recurrence.daysSinceLatest >= 0);
    assert.ok(recurrence.intervals.every((interval) => interval.days > 0));
    recurrence.intervals.forEach((interval, index) => {
      assert.equal(interval.newerIssueDate, occurrences[index].issueDate);
      assert.equal(interval.olderIssueDate, occurrences[index + 1].issueDate);
      assert.equal(utcGap(interval.newerIssueDate, interval.olderIssueDate), interval.days);
      assert.ok(occurrences[index].href === "/daily-office" || occurrences[index].href === "/daily-office/archive/" + interval.newerIssueDate);
      assert.ok(occurrences[index + 1].href === "/daily-office" || occurrences[index + 1].href === "/daily-office/archive/" + interval.olderIssueDate);
    });
    assert.equal(recurrence.intervals.length, Math.max(0, occurrences.length - 1));
  }

  const singleDayAtlas = buildDepartmentCaseAtlas(today, 1);
  const todaysTheme = buildDailyOfficeDispatch(today).caseTheme;
  assert.equal(singleDayAtlas.entries.filter((entry) => entry.occurrenceCount === 1).length, 1);
  for (const entry of singleDayAtlas.entries) {
    if (entry.theme === todaysTheme) {
      assert.equal(entry.recurrence.daysSinceLatest, 0);
      assert.equal(entry.recurrence.previousOccurrence, null);
      assert.deepEqual(entry.recurrence.intervals, []);
      assert.equal(entry.recurrence.averageIntervalDays, null);
      assert.equal(entry.recurrence.shortestIntervalDays, null);
      assert.equal(entry.recurrence.longestIntervalDays, null);
    } else {
      assert.equal(entry.recurrence.daysSinceLatest, null);
      assert.equal(entry.recurrence.previousOccurrence, null);
      assert.deepEqual(entry.recurrence.intervals, []);
      assert.equal(entry.recurrence.averageIntervalDays, null);
      assert.equal(entry.recurrence.shortestIntervalDays, null);
      assert.equal(entry.recurrence.longestIntervalDays, null);
    }
  }
});

test("U25.8 Case Atlas presents recurrence calculations with accessible links and explicit fictional-data limits", () => {
  const atlasClient = readFileSync("app/daily-office/department-case-atlas-client.tsx", "utf8");
  const atlasPage = readFileSync("app/daily-office/atlas/page.tsx", "utf8");
  const css = readFileSync("app/globals.css", "utf8");

  assert.ok(atlasClient.includes('className="department-case-atlas__recurrence"'));
  assert.ok(atlasClient.includes("AGE OF LATEST FILE"));
  assert.ok(atlasClient.includes("MOST RECENT GAP"));
  assert.ok(atlasClient.includes("MEAN GAP"));
  assert.ok(atlasClient.includes("SHORTEST GAP"));
  assert.ok(atlasClient.includes("LONGEST GAP"));
  assert.ok(atlasClient.includes("entry.recurrence.previousOccurrence.href"));
  assert.ok(atlasClient.includes("entry.recurrence.intervals[0]?.days"));
  assert.ok(atlasClient.includes("NO PRIOR FILE IN WINDOW"));
  assert.ok(atlasClient.includes("NO FILE IN WINDOW"));
  assert.ok(atlasClient.includes('className="department-case-atlas__interval-ledger"'));
  assert.ok(atlasClient.includes("OPEN INTERVAL EVIDENCE"));
  assert.ok(atlasClient.includes("newerOccurrence.href"));
  assert.ok(atlasClient.includes("olderOccurrence.href"));
  assert.ok(atlasClient.includes("interval.days"));
  assert.ok(atlasClient.includes("AT LEAST TWO APPEARANCES ARE REQUIRED"));
  assert.ok(atlasClient.includes("NO FORECAST OR REAL-WORLD INFERENCE"));
  assert.ok(atlasPage.includes("recurrence intervals"));
  assert.ok(css.includes(".department-case-atlas__recurrence-grid"));
  assert.ok(css.includes(".department-case-atlas__interval-ledger"));
  assert.ok(css.includes("@media (max-width: 680px)"));
  assert.ok(css.includes("@media (max-width: 680px)"));
  assert.doesNotMatch(atlasClient + atlasPage, /localStorage|sessionStorage|fetch\(|WebSocket|wallet connect/i);
});


test("U25.10 Case Atlas date-window selector reconciles exact 14, 30, 60, 90 and 120-day histories", () => {
  const today = new Date().toISOString().slice(0, 10);
  const sourceAtlas = buildDepartmentCaseAtlas(today, 240);
  const sourceOccurrences = sourceAtlas.entries.map((entry) => ({
    theme: entry.theme,
    occurrences: entry.occurrences.map((occurrence) => occurrence.issueDate + "|" + occurrence.reference),
  }));

  for (const days of [14, 30, 60, 90, 120]) {
    const selectedAtlas = selectDepartmentCaseAtlasWindow(sourceAtlas, days);
    const startDate = shiftInstitutionalMemoryDate(today, -(days - 1));
    const expectedByTheme = new Map<string, Array<{ issueDate: string; reference: string; headline: string; href: string }>>();

    for (let offset = 0; offset < days; offset += 1) {
      const dispatch = buildDailyOfficeDispatch(shiftInstitutionalMemoryDate(today, -offset));
      const list = expectedByTheme.get(dispatch.caseTheme) ?? [];
      list.push({
        issueDate: dispatch.issueDate,
        reference: dispatch.reference,
        headline: dispatch.headline,
        href: dispatch.issueDate === today ? "/daily-office" : "/daily-office/archive/" + dispatch.issueDate,
      });
      expectedByTheme.set(dispatch.caseTheme, list);
    }

    assert.equal(selectedAtlas.asOfDate, today);
    assert.equal(selectedAtlas.lookbackDays, days);
    assert.equal(selectedAtlas.entries.length, 18);

    let totalOccurrences = 0;
    for (const entry of selectedAtlas.entries) {
      const expected = expectedByTheme.get(entry.theme) ?? [];
      assert.equal(entry.occurrenceCount, expected.length, entry.theme + " count must match selected range");
      assert.deepEqual(entry.occurrences, expected, entry.theme + " must expose precisely the selected range");
      assert.equal(entry.latestOccurrence?.issueDate ?? null, expected[0]?.issueDate ?? null);
      assert.equal(entry.recurrence.daysSinceLatest, expected[0] ? Math.round((Date.parse(today + "T00:00:00.000Z") - Date.parse(expected[0].issueDate + "T00:00:00.000Z")) / 86400000) : null);

      const gaps = expected.slice(1).map((older, index) =>
        Math.round((Date.parse(expected[index].issueDate + "T00:00:00.000Z") - Date.parse(older.issueDate + "T00:00:00.000Z")) / 86400000),
      );
      assert.equal(entry.recurrence.intervals.length, Math.max(0, expected.length - 1));
      assert.deepEqual(entry.recurrence.intervals.map((interval) => interval.days), gaps);
      assert.equal(entry.recurrence.previousOccurrence?.issueDate ?? null, expected[1]?.issueDate ?? null);
      assert.equal(entry.recurrence.averageIntervalDays, gaps.length ? gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length : null);
      assert.equal(entry.recurrence.shortestIntervalDays, gaps.length ? Math.min(...gaps) : null);
      assert.equal(entry.recurrence.longestIntervalDays, gaps.length ? Math.max(...gaps) : null);
      assert.ok(entry.occurrences.every((occurrence) => occurrence.issueDate >= startDate && occurrence.issueDate <= today));
      totalOccurrences += entry.occurrences.length;
    }
    assert.equal(totalOccurrences, days, "each daily issue must be assigned to exactly one theme in the selected window");
  }

  assert.deepEqual(
    sourceAtlas.entries.map((entry) => ({
      theme: entry.theme,
      occurrences: entry.occurrences.map((occurrence) => occurrence.issueDate + "|" + occurrence.reference),
    })),
    sourceOccurrences,
    "changing a selected window must not mutate the full source history",
  );
  assert.throws(() => selectDepartmentCaseAtlasWindow(sourceAtlas, 0));
  assert.throws(() => selectDepartmentCaseAtlasWindow(sourceAtlas, 121));
  assert.throws(() => selectDepartmentCaseAtlasWindow({ ...sourceAtlas, asOfDate: "2099-01-01" }, 30));
});

test("U25.10 Case Atlas provides an accessible date-window control without changing its division and topic filters", () => {
  const atlasClient = readFileSync("app/daily-office/department-case-atlas-client.tsx", "utf8");
  const atlasPage = readFileSync("app/daily-office/atlas/page.tsx", "utf8");
  const atlasEngine = readFileSync("app/daily-office/case-atlas.ts", "utf8");
  const css = readFileSync("app/globals.css", "utf8");

  assert.ok(atlasClient.includes("const ATLAS_WINDOW_OPTIONS = [14, 30, 60, 90, 120] as const"));
  assert.ok(atlasClient.includes('aria-label="Select Atlas date window"'));
  assert.ok(atlasClient.includes("setWindowDays"));
  assert.ok(atlasClient.includes("selectedAtlas.entries.filter"));
  assert.ok(atlasClient.includes("selectedAtlas.lookbackDays"));
  assert.ok(atlasClient.includes("setOfficeFilter"));
  assert.ok(atlasClient.includes("setQuery"));
  assert.ok(atlasEngine.includes("export function selectDepartmentCaseAtlasWindow"));
  assert.ok(atlasEngine.includes("occurrence.issueDate >= firstDate && occurrence.issueDate <= atlas.asOfDate"));
  assert.ok(atlasPage.includes("buildDepartmentCaseAtlas(asOfDate, 240)"));
  assert.ok(css.includes(".department-case-atlas__filters label:nth-child(3) select"));
  assert.ok(css.includes("grid-template-columns: repeat(2, minmax(0, 1fr))"));
  assert.doesNotMatch(atlasClient + atlasPage + atlasEngine, /localStorage|sessionStorage|fetch\(|WebSocket|wallet connect/i);
});


test("U25.11 Case Atlas compares every selected period with the immediately preceding equal-length window", () => {
  const today = new Date().toISOString().slice(0, 10);
  const sourceAtlas = buildDepartmentCaseAtlas(today, 240);
  assert.equal(sourceAtlas.lookbackDays, 240);
  assert.equal(sourceAtlas.comparisonWindow, null);
  assert.ok(sourceAtlas.entries.every((entry) => entry.periodComparison === null));

  const utcGap = (newerDate: string, olderDate: string) =>
    Math.round((Date.parse(newerDate + "T00:00:00.000Z") - Date.parse(olderDate + "T00:00:00.000Z")) / 86400000);

  for (const days of [14, 30, 60, 90, 120]) {
    const selected = selectDepartmentCaseAtlasWindow(sourceAtlas, days);
    const currentStart = shiftInstitutionalMemoryDate(today, -(days - 1));
    const previousEnd = shiftInstitutionalMemoryDate(currentStart, -1);
    const previousStart = shiftInstitutionalMemoryDate(previousEnd, -(days - 1));
    assert.deepEqual(selected.comparisonWindow, {
      currentStartDate: currentStart,
      currentEndDate: today,
      previousStartDate: previousStart,
      previousEndDate: previousEnd,
    });
    assert.equal(utcGap(currentStart, previousEnd), 1, "the two matched periods must be adjacent with no overlap");
    assert.equal(utcGap(today, previousStart), days * 2 - 1, "the matched periods must span exactly twice the selected days");

    const expectedCurrent = new Map<string, number>();
    const expectedPrevious = new Map<string, number>();
    for (let offset = 0; offset < days; offset += 1) {
      const current = buildDailyOfficeDispatch(shiftInstitutionalMemoryDate(today, -offset));
      expectedCurrent.set(current.caseTheme, (expectedCurrent.get(current.caseTheme) ?? 0) + 1);
      const previous = buildDailyOfficeDispatch(shiftInstitutionalMemoryDate(today, -(days + offset)));
      expectedPrevious.set(previous.caseTheme, (expectedPrevious.get(previous.caseTheme) ?? 0) + 1);
    }

    let currentTotal = 0;
    let previousTotal = 0;
    for (const entry of selected.entries) {
      const currentCount = expectedCurrent.get(entry.theme) ?? 0;
      const previousCount = expectedPrevious.get(entry.theme) ?? 0;
      const delta = currentCount - previousCount;
      const expectedDirection = previousCount === 0
        ? currentCount === 0 ? "unchanged" : "new"
        : delta > 0 ? "increase" : delta < 0 ? "decrease" : "unchanged";
      const comparison = entry.periodComparison;

      assert.ok(comparison);
      assert.equal(entry.occurrenceCount, currentCount);
      assert.equal(comparison.previousWindowCount, previousCount);
      assert.equal(comparison.occurrenceDelta, delta);
      assert.equal(comparison.percentageChange, previousCount === 0 ? null : delta / previousCount * 100);
      assert.equal(comparison.direction, expectedDirection);
      assert.ok(entry.occurrences.every((occurrence) => occurrence.issueDate >= currentStart && occurrence.issueDate <= today));
      currentTotal += currentCount;
      previousTotal += previousCount;
    }
    assert.equal(currentTotal, days, "current-window issues must reconcile to one theme each");
    assert.equal(previousTotal, days, "previous-window issues must reconcile to one theme each");
  }

  const fullHistoryBefore = sourceAtlas.entries.map((entry) => entry.occurrences.map((item) => item.issueDate + "|" + item.reference));
  selectDepartmentCaseAtlasWindow(sourceAtlas, 14);
  selectDepartmentCaseAtlasWindow(sourceAtlas, 120);
  assert.deepEqual(
    sourceAtlas.entries.map((entry) => entry.occurrences.map((item) => item.issueDate + "|" + item.reference)),
    fullHistoryBefore,
    "period selection must not mutate the full 240-day source history",
  );
  assert.throws(() => selectDepartmentCaseAtlasWindow(sourceAtlas, 0));
  assert.throws(() => selectDepartmentCaseAtlasWindow(sourceAtlas, 121));
  assert.throws(() => selectDepartmentCaseAtlasWindow({ ...sourceAtlas, lookbackDays: 120 }, 90));
});

test("U25.11 Case Atlas explains matched periods and displays non-predictive theme activity comparisons", () => {
  const atlasClient = readFileSync("app/daily-office/department-case-atlas-client.tsx", "utf8");
  const atlasPage = readFileSync("app/daily-office/atlas/page.tsx", "utf8");
  const atlasEngine = readFileSync("app/daily-office/case-atlas.ts", "utf8");
  const css = readFileSync("app/globals.css", "utf8");

  assert.ok(atlasClient.includes('className="department-case-atlas__comparison-window"'));
  assert.ok(atlasClient.includes("MATCHED-PERIOD METHOD / NON-OVERLAPPING UTC WINDOWS"));
  assert.ok(atlasClient.includes("selectedAtlas.comparisonWindow.currentStartDate"));
  assert.ok(atlasClient.includes("selectedAtlas.comparisonWindow.previousStartDate"));
  assert.ok(atlasClient.includes('className="department-case-atlas__period-comparison"'));
  assert.ok(atlasClient.includes("PREVIOUS WINDOW"));
  assert.ok(atlasClient.includes("CURRENT WINDOW"));
  assert.ok(atlasClient.includes("NET CHANGE"));
  assert.ok(atlasClient.includes("CHANGE VS PREVIOUS"));
  assert.ok(atlasClient.includes('entry.periodComparison.direction === "new"'));
  assert.ok(atlasClient.includes("NOT A MEASURE OF TOKEN PERFORMANCE OR MARKET MOMENTUM"));
  assert.ok(atlasEngine.includes("previousWindowCount"));
  assert.ok(atlasEngine.includes("previousStartDate"));
  assert.ok(atlasEngine.includes("previousEndDate"));
  assert.ok(atlasPage.includes("buildDepartmentCaseAtlas(asOfDate, 240)"));
  assert.ok(css.includes(".department-case-atlas__period-comparison-grid"));
  assert.ok(css.includes("@media (max-width: 680px)"));
  assert.doesNotMatch(atlasClient + atlasPage + atlasEngine, /localStorage|sessionStorage|fetch\(|WebSocket|wallet connect/i);
});


test("U25.12 Case Atlas reconciles division routing assignments across all matched-period windows", () => {
  const today = new Date().toISOString().slice(0, 10);
  const sourceAtlas = buildDepartmentCaseAtlas(today, 240);
  assert.equal(sourceAtlas.divisions.length, 10);
  assert.ok(sourceAtlas.divisions.every((division) => division.routingComparison === null));

  const countOfficeAssignments = (startOffset: number, days: number) => {
    const counts = new Map<string, { count: number; themes: Set<string> }>();
    for (let offset = startOffset; offset < startOffset + days; offset += 1) {
      const issueDate = shiftInstitutionalMemoryDate(today, -offset);
      const dispatch = buildDailyOfficeDispatch(issueDate);
      const thread = departmentCaseThreads[dispatch.caseTheme];
      assert.ok(thread, "Every date-seeded daily case must resolve to a known narrative thread.");
      assert.equal(thread.offices.length, 3, "Each daily case must route to exactly three offices.");
      for (const office of thread.offices) {
        const current = counts.get(office.section) ?? { count: 0, themes: new Set<string>() };
        current.count += 1;
        current.themes.add(dispatch.caseTheme);
        counts.set(office.section, current);
      }
    }
    return counts;
  };

  for (const days of [14, 30, 60, 90, 120]) {
    const selected = selectDepartmentCaseAtlasWindow(sourceAtlas, days);
    const current = countOfficeAssignments(0, days);
    const previous = countOfficeAssignments(days, days);
    let currentTotal = 0;
    let previousTotal = 0;

    assert.equal(selected.divisions.length, 10);
    for (const division of selected.divisions) {
      const currentExpected = current.get(division.section) ?? { count: 0, themes: new Set<string>() };
      const previousExpected = previous.get(division.section) ?? { count: 0, themes: new Set<string>() };
      const comparison = division.routingComparison;
      const delta = currentExpected.count - previousExpected.count;
      const expectedDirection = previousExpected.count === 0
        ? currentExpected.count === 0 ? "unchanged" : "new"
        : delta > 0 ? "increase" : delta < 0 ? "decrease" : "unchanged";

      assert.ok(comparison, division.title + " must expose matched-period routing comparison.");
      assert.equal(comparison.currentWindowCount, currentExpected.count);
      assert.equal(comparison.previousWindowCount, previousExpected.count);
      assert.equal(comparison.occurrenceDelta, delta);
      assert.equal(comparison.percentageChange, previousExpected.count === 0 ? null : delta / previousExpected.count * 100);
      assert.equal(comparison.direction, expectedDirection);
      assert.equal(comparison.currentActiveThemeCount, currentExpected.themes.size);
      assert.equal(comparison.previousActiveThemeCount, previousExpected.themes.size);
      assert.equal(division.themeCount, division.themes.length, "the permanent connected-theme count must remain unchanged");
      currentTotal += comparison.currentWindowCount;
      previousTotal += comparison.previousWindowCount;
    }

    assert.equal(currentTotal, days * 3, "current office routing assignments must reconcile to three routes per daily file");
    assert.equal(previousTotal, days * 3, "previous office routing assignments must reconcile to three routes per daily file");
  }
});

test("U25.12 Case Atlas labels division metrics as routed assignments, not unique files", () => {
  const atlasClient = readFileSync("app/daily-office/department-case-atlas-client.tsx", "utf8");
  const atlasEngine = readFileSync("app/daily-office/case-atlas.ts", "utf8");
  const css = readFileSync("app/globals.css", "utf8");

  assert.ok(atlasClient.includes("selectedAtlas.divisions.map((division)"));
  assert.ok(atlasClient.includes('className="department-case-atlas__division-routing"'));
  assert.ok(atlasClient.includes("CURRENT ROUTING ASSIGNMENTS"));
  assert.ok(atlasClient.includes("PREVIOUS ROUTING ASSIGNMENTS"));
  assert.ok(atlasClient.includes("division.routingComparison.currentWindowCount"));
  assert.ok(atlasClient.includes("currentActiveThemeCount"));
  assert.ok(atlasClient.includes("previousActiveThemeCount"));
  assert.ok(atlasClient.includes("ASSIGNMENTS, NOT UNIQUE FILES"));
  assert.ok(atlasClient.includes("EACH DAILY CASE ROUTES TO THREE OFFICES"));
  assert.ok(atlasEngine.includes("export type DepartmentCaseAtlasDivisionRoutingComparison"));
  assert.ok(atlasEngine.includes("buildPeriodComparison(currentWindowCount, previousWindowCount)"));
  assert.ok(atlasEngine.includes("routingComparison"));
  assert.ok(css.includes(".department-case-atlas__division-routing"));
  assert.ok(css.includes(".department-case-atlas__division-routing > div > strong.is-increase"));
  assert.doesNotMatch(atlasClient + atlasEngine, /localStorage|sessionStorage|fetch\(|WebSocket|wallet connect/i);
});


test("U25.13 Case Atlas reconciles per-theme division routing composition across every matched-period window", () => {
  const today = new Date().toISOString().slice(0, 10);
  const sourceAtlas = buildDepartmentCaseAtlas(today, 240);

  for (const days of [14, 30, 60, 90, 120]) {
    const selected = selectDepartmentCaseAtlasWindow(sourceAtlas, days);
    const countThemes = (startOffset: number) => {
      const counts = new Map<string, number>();
      for (let offset = startOffset; offset < startOffset + days; offset += 1) {
        const dispatch = buildDailyOfficeDispatch(shiftInstitutionalMemoryDate(today, -offset));
        counts.set(dispatch.caseTheme, (counts.get(dispatch.caseTheme) ?? 0) + 1);
      }
      return counts;
    };
    const currentCounts = countThemes(0);
    const previousCounts = countThemes(days);

    for (const division of selected.divisions) {
      const routing = division.routingComparison;
      assert.ok(routing, division.title + " must expose routing comparison data.");
      assert.deepEqual(
        routing.themeRouting.map((item) => item.theme),
        division.themes,
        division.title + " must preserve the complete connected-theme registry order, including inactive themes.",
      );

      let currentTotal = 0;
      let previousTotal = 0;
      let currentActive = 0;
      let previousActive = 0;
      for (const item of routing.themeRouting) {
        const current = currentCounts.get(item.theme) ?? 0;
        const previous = previousCounts.get(item.theme) ?? 0;
        const delta = current - previous;
        const direction = previous === 0
          ? current === 0 ? "unchanged" : "new"
          : delta > 0 ? "increase" : delta < 0 ? "decrease" : "unchanged";

        assert.equal(item.currentWindowCount, current);
        assert.equal(item.previousWindowCount, previous);
        assert.equal(item.occurrenceDelta, delta);
        assert.equal(item.percentageChange, previous === 0 ? null : delta / previous * 100);
        assert.equal(item.direction, direction);
        currentTotal += current;
        previousTotal += previous;
        if (current > 0) currentActive += 1;
        if (previous > 0) previousActive += 1;
      }

      assert.equal(currentTotal, routing.currentWindowCount, division.title + " current theme rows must sum to its division total.");
      assert.equal(previousTotal, routing.previousWindowCount, division.title + " previous theme rows must sum to its division total.");
      assert.equal(currentActive, routing.currentActiveThemeCount);
      assert.equal(previousActive, routing.previousActiveThemeCount);
    }
  }
});

test("U25.13 Case Atlas presents an accessible per-theme routing breakdown without introducing live data or tracking", () => {
  const atlasClient = readFileSync("app/daily-office/department-case-atlas-client.tsx", "utf8");
  const atlasEngine = readFileSync("app/daily-office/case-atlas.ts", "utf8");
  const css = readFileSync("app/globals.css", "utf8");

  assert.ok(atlasClient.includes('className="department-case-atlas__routing-breakdown"'));
  assert.ok(atlasClient.includes("OPEN THEME ROUTING"));
  assert.ok(atlasClient.includes("division.routingComparison.themeRouting.map"));
  assert.ok(atlasClient.includes("theme.currentWindowCount"));
  assert.ok(atlasClient.includes("theme.previousWindowCount"));
  assert.ok(atlasClient.includes("getDepartmentCaseThemeAnchor(theme.theme)"));
  assert.ok(atlasClient.includes("COUNTS ARE FICTIONAL ASSIGNMENTS, NOT MARKET EVENTS"));
  assert.ok(atlasEngine.includes("export type DepartmentCaseAtlasThemeRoutingComparison"));
  assert.ok(atlasEngine.includes("themeRouting: DepartmentCaseAtlasThemeRoutingComparison[]"));
  assert.ok(css.includes(".department-case-atlas__routing-breakdown"));
  assert.ok(css.includes("@media (max-width: 560px)"));
  assert.doesNotMatch(atlasClient + atlasEngine, /localStorage|sessionStorage|fetch\(|WebSocket|wallet connect/i);
});


test("U25.14 Case Atlas routing evidence links exact theme files in both matched UTC windows", () => {
  const today = new Date().toISOString().slice(0, 10);
  const sourceAtlas = buildDepartmentCaseAtlas(today, 240);
  const expectedEvidence = (theme: string, startOffset: number, days: number) => {
    const matches: Array<{ issueDate: string; reference: string; headline: string; href: string }> = [];
    for (let offset = startOffset; offset < startOffset + days; offset += 1) {
      const issueDate = shiftInstitutionalMemoryDate(today, -offset);
      const dispatch = buildDailyOfficeDispatch(issueDate);
      if (dispatch.caseTheme === theme) {
        matches.push({
          issueDate: dispatch.issueDate,
          reference: dispatch.reference,
          headline: dispatch.headline,
          href: issueDate === today ? "/daily-office" : "/daily-office/archive/" + issueDate,
        });
      }
    }
    return matches;
  };

  for (const days of [14, 30, 60, 90, 120]) {
    const selected = selectDepartmentCaseAtlasWindow(sourceAtlas, days);
    for (const division of selected.divisions) {
      const routing = division.routingComparison;
      assert.ok(routing);
      for (const item of routing.themeRouting) {
        assert.deepEqual(item.currentOccurrences, expectedEvidence(item.theme, 0, days));
        assert.deepEqual(item.previousOccurrences, expectedEvidence(item.theme, days, days));
        assert.equal(item.currentOccurrences.length, item.currentWindowCount);
        assert.equal(item.previousOccurrences.length, item.previousWindowCount);
        assert.ok([...item.currentOccurrences, ...item.previousOccurrences].every((occurrence) =>
          occurrence.issueDate <= today && occurrence.href.startsWith("/daily-office"),
        ));
      }
    }
  }
});

test("U25.14 Case Atlas exposes collapsible source evidence for current and previous office/theme routes", () => {
  const atlasClient = readFileSync("app/daily-office/department-case-atlas-client.tsx", "utf8");
  const atlasEngine = readFileSync("app/daily-office/case-atlas.ts", "utf8");
  const css = readFileSync("app/globals.css", "utf8");

  assert.ok(atlasClient.includes('className="department-case-atlas__routing-evidence"'));
  assert.ok(atlasClient.includes("VIEW FILE EVIDENCE"));
  assert.ok(atlasClient.includes("theme.currentOccurrences.map"));
  assert.ok(atlasClient.includes("theme.previousOccurrences.map"));
  assert.ok(atlasClient.includes("occurrence.href"));
  assert.ok(atlasClient.includes("INTERNAL CASE-ROUTING EVIDENCE, NOT A LIVE MARKET RECORD"));
  assert.ok(atlasEngine.includes("currentOccurrences: DepartmentCaseAtlasOccurrence[]"));
  assert.ok(atlasEngine.includes("previousOccurrences: DepartmentCaseAtlasOccurrence[]"));
  assert.ok(css.includes(".department-case-atlas__routing-evidence"));
  assert.ok(css.includes(".department-case-atlas__routing-evidence > div"));
  assert.ok(css.includes("@media (max-width: 560px)"));
  assert.doesNotMatch(atlasClient + atlasEngine, /localStorage|sessionStorage|fetch\(|WebSocket|wallet connect/i);
});


test("U25 audit correction marks a viewing division clearly when it is outside today's three-office case route", () => {
  const routePages = [
    ["app/simulator/page.tsx", "simulator"],
    ["app/club/page.tsx", "club"],
    ["app/audit/page.tsx", "audit"],
    ["app/daily-office/page.tsx", "daily"],
    ["app/archives/page.tsx", "archives"],
    ["app/roadmap-generator/page.tsx", "roadmap"],
    ["app/whitepaper-factory/page.tsx", "whitepaper"],
    ["app/utility-inspector/page.tsx", "utility"],
    ["app/museum/page.tsx", "museum"],
    ["app/cope-index/page.tsx", "cope"],
  ] as const;
  const nextSteps = readFileSync("app/components/department-next-steps.tsx", "utf8");
  const chainClient = readFileSync("app/components/department-case-chain.tsx", "utf8");

  assert.ok(nextSteps.includes("<DepartmentCaseChain currentDepartment={currentDepartment as DepartmentSection} />"));
  assert.ok(chainClient.includes("const currentOfficeIsRouted = narrative.offices.some((office) => office.isCurrent)"));
  assert.ok(chainClient.includes("CURRENT OFFICE / ROUTED TODAY"));
  assert.ok(chainClient.includes("VIEWING OFFICE / NOT ON THIS ROUTE"));

  for (const [path, section] of routePages) {
    const page = readFileSync(path, "utf8");
    assert.ok(page.includes('<DepartmentNextSteps currentDepartment="' + section + '" />'), path + " must pass its own division context to the shared case chain.");
  }

  for (let index = 0; index < 90; index += 1) {
    const issueDate = new Date(Date.UTC(2026, 0, 1 + index)).toISOString().slice(0, 10);
    const dispatch = buildDailyOfficeDispatch(issueDate);
    const thread = departmentCaseThreads[dispatch.caseTheme];
    assert.ok(thread);
    assert.equal(thread.offices.length, 3);

    for (const department of departments) {
      const narrative = buildDepartmentNarrative(issueDate, department.section);
      const activeSteps = narrative.offices.filter((office) => office.isCurrent);
      const expectedMembership = thread.offices.some((office) => office.section === department.section);
      assert.equal(activeSteps.length, expectedMembership ? 1 : 0, department.title + " must only be marked current when it belongs to today's three-office route.");
      assert.equal(activeSteps.every((office) => office.href === null), true);
      assert.equal(narrative.currentOffice.title, department.title);
    }
  }
});


test("Case Atlas labels thread chronology as the selected date window rather than implying all 240 source days are open", () => {
  const atlasClient = readFileSync("app/daily-office/department-case-atlas-client.tsx", "utf8");
  assert.ok(atlasClient.includes("OPEN SELECTED-WINDOW HISTORY / {entry.occurrences.length} MATCHING FILES"));
  assert.doesNotMatch(atlasClient, /OPEN FULL THREAD HISTORY/);
  assert.ok(atlasClient.includes("{windowDays} UTC-DAY WINDOW"));
  assert.ok(atlasClient.includes("{entry.occurrenceCount} / {selectedAtlas.lookbackDays} RECENT ISSUES"));
});

test("U27.6 production experience keeps collection counts, filter semantics and responsive navigation accurate", () => {
  const archivePage = readFileSync("app/archives/page.tsx", "utf8");
  const archivesClient = readFileSync("app/archives/archives-client.tsx", "utf8");
  const museumClient = readFileSync("app/museum/museum-client.tsx", "utf8");
  const homePage = readFileSync("app/page.tsx", "utf8");
  const header = readFileSync("app/components/department-header.tsx", "utf8");
  const css = readFileSync("app/globals.css", "utf8");

  assert.ok(archivePage.includes('description: archiveRecords.length + " fictional case records'));
  assert.doesNotMatch(archivePage, /Fifteen fictional case records|DDA-015/);
  assert.ok(archivePage.includes("archiveRecords[archiveRecords.length - 1]?.accession"));
  assert.equal(archiveRecords.length, 16);
  assert.equal(archiveRecords[archiveRecords.length - 1].accession, "DDA-016");

  assert.ok(archivesClient.includes('role="group" aria-label="Filter archive category"'));
  assert.ok(museumClient.includes('role="group" aria-label="Filter exhibits by category"'));
  assert.ok(archivesClient.includes('aria-pressed={category === item}'));
  assert.ok(museumClient.includes('aria-pressed={category === item}'));
  assert.ok(archivesClient.includes('aria-live="polite"'));
  assert.ok(museumClient.includes('aria-live="polite"'));

  assert.ok(homePage.includes("Ten numbered divisions. Three routing groups."));
  assert.equal(departments.length, 10);
  assert.equal(departmentGroups.length, 3);

  assert.ok(header.includes('aria-controls={menuId}'));
  assert.ok(header.includes('aria-expanded={menuOpen}'));
  assert.ok(header.includes('hidden={!menuOpen}'));
  assert.ok(header.includes('event.key === "Escape"'));
  assert.ok(header.includes('aria-label="Main navigation"'));
  assert.ok(header.includes('aria-label="Department directory"'));

  assert.ok(css.includes("@media (max-width: 1120px)"));
  assert.ok(css.includes("max-height: calc(100dvh - 112px)"));
  assert.ok(css.includes(".mobile-nav__scroll"));
  assert.ok(css.includes("overflow-y: auto"));
  assert.ok(css.includes(":where(a, button, input, textarea, select):focus-visible"));
  assert.ok(css.includes("@media (prefers-reduced-motion: reduce)"));
});

test("U26 navigation labels and links match the exact destination pages and directory sections", () => {
  const routePages = [
    ["simulator", "app/simulator/page.tsx", "THE BAGHOLDER SIMULATOR"],
    ["club", "app/club/page.tsx", "THE 99% CLUB"],
    ["audit", "app/audit/page.tsx", "THE DYOR AUDIT 2.0"],
    ["daily", "app/daily-office/page.tsx", "THE TRENCHES DESK"],
    ["archives", "app/archives/page.tsx", "THE DEPARTMENT ARCHIVES"],
    ["roadmap", "app/roadmap-generator/page.tsx", "THE CTO TAKEOVER ROADMAP"],
    ["whitepaper", "app/whitepaper-factory/page.tsx", "THE TOKEN DOSSIER FACTORY"],
    ["utility", "app/utility-inspector/page.tsx", "THE TOKEN-PURPOSE INSPECTOR"],
    ["museum", "app/museum/page.tsx", "THE TRENCHES RELIC MUSEUM"],
    ["cope", "app/cope-index/page.tsx", "THE GLOBAL COPE INDEX"],
  ] as const;
  assert.equal(departments.length, routePages.length);
  assert.equal(divisionNavigationGroups.length, departmentGroups.length);

  for (const [index, group] of departmentGroups.entries()) {
    const navGroup = divisionNavigationGroups[index];
    assert.equal(navGroup.label, group.title);
    assert.equal(navGroup.descriptor, group.code);
    assert.equal(navGroup.anchorId, "department-group-" + group.number);
    assert.deepEqual(
      navGroup.items.map((item) => ({ number: item.number, label: item.label, href: item.href, section: item.section })),
      group.items.map((item) => ({ number: item.number, label: item.pageTitle, href: item.href, section: item.section })),
      "Every navigation item must use the destination page heading and its actual route",
    );
  }

  for (const [section, path, pageTitle] of routePages) {
    const department = departments.find((item) => item.section === section);
    assert.ok(department, section + " division record must exist");
    assert.equal(department.pageTitle, pageTitle);
    const page = readFileSync(path, "utf8");
    const visibleHeading = page.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
    assert.ok(visibleHeading.includes(pageTitle + "."), path + " heading must match its navigation label");
    const navItem = divisionNavigationGroups.flatMap((group) => group.items).find((item) => item.section === section);
    assert.ok(navItem);
    assert.equal(navItem.label, pageTitle);
    assert.equal(navItem.href, department.href);
  }

  const home = readFileSync("app/page.tsx", "utf8");
  const header = readFileSync("app/components/department-header.tsx", "utf8");
  const css = readFileSync("app/globals.css", "utf8");
  const publicRoutes = [...routePages.map(([, path]) => path), "app/passport/page.tsx"];
  for (const path of publicRoutes) {
    const page = readFileSync(path, "utf8");
    assert.ok(page.includes('id="content-start"'), path + " must provide the navigation skip-link target");
  }
  assert.ok(home.includes('id={"department-group-" + group.number}'));
  assert.ok(header.includes('href={"/#" + group.anchorId}'));
  assert.equal(header.split("navigationGroups.map(").length - 1, 2, "Desktop and mobile menus must render the same current route map");
  assert.ok(header.includes('label: "THE DEPARTMENT PASSPORT"'));
  assert.ok(header.includes("{passportItem.label}"), "Desktop Passport navigation text must match the destination identity");
  assert.ok(header.includes('aria-label="Passport"'));
  assert.ok(header.includes('href: "/passport"'));
  assert.ok(header.includes('ctaLabel = "START DYOR AUDIT 2.0"'));
  assert.ok(header.includes('ctaHref = "/audit"'));
  assert.ok(header.includes('href={departmentsHref}'));
  assert.ok(header.includes('href={manifestoHref}'));
  assert.ok(home.includes('id="departments"'));
  assert.ok(home.includes('id="manifesto"'));
  assert.ok(css.includes(".main-nav__panel-heading a"));
  assert.ok(css.includes(".mobile-nav__section-heading a"));
});



test("U28.1 Club adds twelve persistent, criteria-based achievements to the existing Passport collection", () => {
  const expectedClubBadges = [
    "club-not-my-fault",
    "club-next-one-is-mine",
    "club-dyor-certified",
    "club-diamond-hands",
    "club-average-downer",
    "club-cto-believer",
    "club-exit-liquidity",
    "club-100x-visionary",
    "club-still-early",
    "club-cope-engineer",
    "club-kol-disciple",
    "club-certified-bagholder",
  ];
  assert.deepEqual(CLUB_BADGE_IDS, expectedClubBadges);
  assert.deepEqual(
    PASSPORT_ACHIEVEMENTS.filter((badge) => badge.id.startsWith("club-")).map((badge) => badge.id),
    ["club-admitted", ...expectedClubBadges],
  );
  assert.equal(PASSPORT_ACHIEVEMENTS.length, 23);
  assert.equal(PASSPORT_ACHIEVEMENTS.filter((badge) => badge.id.startsWith("club-")).length, 13);

  const passport = makePassport({
    clubMembershipAnswers: [0, 0, 0, 0, 0],
    clubApplicationCount: 1,
    clubChallengeAnswers: {
      "fault-allocation": 2,
      "next-entry": 0,
      "research-receipt": 0,
    },
    clubBadgeIds: [
      "club-not-my-fault",
      "club-next-one-is-mine",
      "club-dyor-certified",
      "club-cope-engineer",
      "club-certified-bagholder",
    ],
  });
  const statuses = new Map(getPassportAchievementStatuses(passport).map((badge) => [badge.id, badge]));
  assert.equal(statuses.get("club-not-my-fault")?.earned, true);
  assert.equal(statuses.get("club-next-one-is-mine")?.earned, true);
  assert.equal(statuses.get("club-dyor-certified")?.earned, true);
  assert.equal(statuses.get("club-cope-engineer")?.progress, 3);
  assert.equal(statuses.get("club-cope-engineer")?.target, 3);
  assert.equal(statuses.get("club-cope-engineer")?.earned, true);
  assert.equal(statuses.get("club-certified-bagholder")?.earned, true);
  assert.equal(statuses.get("club-diamond-hands")?.earned, false);
});

test("U28.1 legacy Passport records migrate to v3 without losing existing visit stamps or completed activities", () => {
  const store = readFileSync("app/passport/passport-store.ts", "utf8");
  assert.ok(store.includes("export const PASSPORT_VERSION = 3"));
  assert.ok(store.includes("candidate.version === 1 || candidate.version === 2"));
  assert.ok(store.includes("visitedDepartments: candidate.visitedDepartments as DepartmentId[]"));
  assert.ok(store.includes("completedActivities,"));
  assert.ok(store.includes("clubMembershipAnswers: null"));
  assert.ok(store.includes("clubChallengeAnswers: {}"));
  assert.ok(store.includes("clubBadgeIds: []"));
});

test("U28.1 Club challenge desk uses only the optional local Passport and exposes all unlock conditions", () => {
  const challenges = readFileSync("app/club/club-challenges.tsx", "utf8");
  const clubPage = readFileSync("app/club/page.tsx", "utf8");
  const badgeAssets = readFileSync("app/passport/badge-assets.ts", "utf8");
  const passportClient = readFileSync("app/passport/passport-client.tsx", "utf8");
  const passportPage = readFileSync("app/passport/page.tsx", "utf8");

  assert.equal((challenges.match(/id: "(?:fault-allocation|next-entry|research-receipt)"/g) ?? []).length, 3);
  assert.ok(challenges.includes("recordClubChallenge"));
  assert.ok(challenges.includes("PASSPORT_UPDATED_EVENT"));
  assert.ok(challenges.includes('href="/passport"'));
  assert.ok(challenges.includes("club-badge-case__grid"));
  assert.ok(challenges.includes("BADGE CASE."));
  assert.ok(clubPage.includes("<ClubChallenges />"));
  assert.ok(clubPage.includes("IT'S NEVER OUR FAULT. THE NEXT ONE IS MINE."));
  const clubBadgeArt = badgeAssets.split("export const CLUB_BADGE_MARKS")[1] ?? "";
  assert.equal((clubBadgeArt.match(/"club-[^"]+":/g) ?? []).length, 12);
  assert.ok(passportClient.includes("badgeCollectionSvgHeight(statuses)"));
  assert.ok(passportClient.includes("getBadgeArtworkHref(item.id, assetBaseUrl)"));
  assert.ok(passportPage.includes("23 ACHIEVEMENT BADGES"));
  assert.doesNotMatch(challenges, /fetch\(|WebSocket|wallet connect|supabase|prisma/i);
});
