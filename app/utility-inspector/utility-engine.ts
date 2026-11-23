import type { DepartmentCrossRead } from "../lib/department-cross-read";

export const INSPECTOR_VERSION = 1;
export const INSPECTOR_QUESTIONS = 7;

export type UtilityArchetypeId =
  | "product-builder"
  | "solution-search"
  | "whitepaper-architect"
  | "community-powered"
  | "token-with-a-job"
  | "ticker-decoration"
  | "metric-magician"
  | "roadmap-romantic"
  | "institutional-mirage"
  | "actually-useful";

export type UtilityOption = {
  label: string;
  evidence: number;
  fog: number;
  tokenFit: number;
  tag: UtilityArchetypeId;
};

export type UtilityQuestion = {
  prompt: string;
  note: string;
  options: UtilityOption[];
};

export type UtilityArchetype = {
  title: string;
  subtitle: string;
  roast: string;
  disposition: string;
};

export type UtilityHistory = {
  question: string;
  answer: string;
  evidence: number;
  fog: number;
  tokenFit: number;
};

export type UtilityProgress = {
  completedQuestions: number;
  evidence: number;
  fog: number;
  tokenFit: number;
  history: UtilityHistory[];
};

export type UtilityResult = UtilityProgress & {
  crossRead: DepartmentCrossRead;
  answers: number[];
  primaryTag: UtilityArchetypeId;
  secondaryTag: UtilityArchetypeId;
  profile: UtilityArchetype;
  secondaryProfile: UtilityArchetype;
  finding: string;
  caseNumber: string;
  decisionSummary: string;
};

export const questions: UtilityQuestion[] = [
  {
    prompt: "WHICH TASK IS THIS PRODUCT CLAIMED TO PERFORM RIGHT NOW?",
    note: "Describe one present-tense job a user can complete. A broad ecosystem promise is not a task.",
    options: [
      { label: "A clearly defined product or service performs a specific task today, with evidence beyond the launch thread.", evidence: 5, fog: 0, tokenFit: 2, tag: "product-builder" },
      { label: "A plausible task exists in a working beta, although its audience and limits are still being established.", evidence: 3, fog: 2, tokenFit: 2, tag: "roadmap-romantic" },
      { label: "The product's task is still described as “the ticker will change everything”.", evidence: 1, fog: 4, tokenFit: 2, tag: "solution-search" },
      { label: "It is a movement, an ecosystem and the future of everything. The actual task is in the next thread.", evidence: 0, fog: 5, tokenFit: 0, tag: "institutional-mirage" },
    ],
  },
  {
    prompt: "CAN A NEW USER REPEAT THE TASK WITHOUT AN INSIDER EXPLANATION?",
    note: "A user journey should be possible to follow, not reconstructed from a pinned post and three private messages.",
    options: [
      { label: "A user can follow a clear, repeatable flow and complete the described task without private intervention.", evidence: 5, fog: 0, tokenFit: 3, tag: "actually-useful" },
      { label: "A working beta supports the flow, with disclosed steps, constraints and known failure points.", evidence: 4, fog: 1, tokenFit: 2, tag: "product-builder" },
      { label: "The dashboard opens, but the only repeatable action is watching the price chart.", evidence: 1, fog: 4, tokenFit: 1, tag: "metric-magician" },
      { label: "Read the pinned thread and imagine the user journey.", evidence: 0, fog: 5, tokenFit: 0, tag: "whitepaper-architect" },
    ],
  },
  {
    prompt: "WHO IS COMPLETING THAT TASK TODAY?",
    note: "A future holder count is not the same as identifiable, repeat use of a product.",
    options: [
      { label: "A defined group of current users completes the task repeatedly in ways that can be verified.", evidence: 5, fog: 0, tokenFit: 2, tag: "actually-useful" },
      { label: "A small group of current users or contributors provides traceable activity and direct feedback.", evidence: 4, fog: 1, tokenFit: 2, tag: "product-builder" },
      { label: "A busy Telegram and X timeline mostly discusses what the product might become.", evidence: 1, fog: 4, tokenFit: 2, tag: "community-powered" },
      { label: "A future army of users has not discovered the product yet.", evidence: 0, fog: 5, tokenFit: 0, tag: "institutional-mirage" },
    ],
  },
  {
    prompt: "DOES THE TOKEN HAVE A NECESSARY ROLE IN THE CURRENT USER FLOW?",
    note: "Test the present workflow. Do not confuse a token design paragraph with a demonstrated user need.",
    options: [
      { label: "A defined token function is required by the current workflow, with the reason and limits stated.", evidence: 5, fog: 0, tokenFit: 5, tag: "token-with-a-job" },
      { label: "The token supports a disclosed incentive or governance step in the current flow, with trade-offs explained.", evidence: 4, fog: 1, tokenFit: 4, tag: "token-with-a-job" },
      { label: "The token mainly gives the community something to rally around and post about.", evidence: 2, fog: 3, tokenFit: 2, tag: "community-powered" },
      { label: "The product flow could work without the token, but then what would the chart be about?", evidence: 0, fog: 5, tokenFit: 0, tag: "ticker-decoration" },
    ],
  },
  {
    prompt: "WHAT RECORD SHOWS THAT THE TASK WAS COMPLETED?",
    note: "A green candle, view count or volume screenshot does not demonstrate a completed product task.",
    options: [
      { label: "A repeatable completion event or usage record has a clear definition and traceable source.", evidence: 5, fog: 0, tokenFit: 3, tag: "actually-useful" },
      { label: "A small reproducible sample shows users completing the task, with limitations disclosed.", evidence: 4, fog: 1, tokenFit: 2, tag: "product-builder" },
      { label: "A dashboard shows impressive numbers, but task completion, users and retention are undefined.", evidence: 1, fog: 4, tokenFit: 1, tag: "metric-magician" },
      { label: "The community is excited. The first usable evidence is coming after the next announcement.", evidence: 0, fog: 5, tokenFit: 0, tag: "community-powered" },
    ],
  },
  {
    prompt: "WHAT REMAINS USEFUL WHEN REWARDS AND ATTENTION STOP?",
    note: "This is about the current task and its reason to continue—not a future release schedule.",
    options: [
      { label: "The same task remains useful without trading attention, promotional rewards or a launch campaign.", evidence: 5, fog: 0, tokenFit: 5, tag: "token-with-a-job" },
      { label: "The incentives may change, but users still have a reason to complete the core task.", evidence: 4, fog: 1, tokenFit: 4, tag: "product-builder" },
      { label: "Most activity stops when the chart and promotional rewards disappear.", evidence: 1, fog: 4, tokenFit: 1, tag: "ticker-decoration" },
      { label: "The team says the question is FUD and redirects everyone to a listing rumour.", evidence: 0, fog: 5, tokenFit: 0, tag: "whitepaper-architect" },
    ],
  },
  {
    prompt: "CAN THE CLAIMED TASK BE DEMONSTRATED IN A REPEATABLE LIVE FLOW TODAY?",
    note: "A live demo is a reproducible task, not a countdown, prototype screenshot or roadmap promise.",
    options: [
      { label: "A repeatable demonstration shows the task from user input to a defined result.", evidence: 5, fog: 0, tokenFit: 3, tag: "product-builder" },
      { label: "A constrained beta demonstrates part of the flow, and its missing steps are clearly disclosed.", evidence: 4, fog: 1, tokenFit: 2, tag: "product-builder" },
      { label: "A static prototype or dashboard screenshot stands in for a working flow.", evidence: 1, fog: 4, tokenFit: 1, tag: "metric-magician" },
      { label: "The demo is promised in a pinned post, but no repeatable task can be shown today.", evidence: 0, fog: 5, tokenFit: 0, tag: "whitepaper-architect" },
    ],
  },
];

export const classifications: Record<UtilityArchetypeId, UtilityArchetype> = {
  "product-builder": {
    title: "THE RARE PRODUCT BUILDER",
    subtitle: "A repeatable product task exists beyond the ticker, campaign and launch thread.",
    roast: "The Department found a feature that does something after the launch hype. CT has requested a second opinion.",
    disposition: "REFERRED TO THE OFFICE OF UNUSUALLY CLEAR TOKEN PURPOSE.",
  },
  "solution-search": {
    title: "THE NARRATIVE IN SEARCH OF A USE CASE",
    subtitle: "The product claim has arrived. The specific user task and its expected result are still being negotiated.",
    roast: "You have built a very impressive narrative bridge. The repeatable task, the user and the completed result are still missing.",
    disposition: "ASSIGNED TO THE BUREAU OF POST-LAUNCH PURPOSE.",
  },
  "whitepaper-architect": {
    title: "THE PINNED-THREAD ARCHITECT",
    subtitle: "A thousand characters of possibility. No repeatable user task in sight.",
    roast: "The pinned thread has achieved narrative-market fit with six other pinned threads.",
    disposition: "ARCHIVE UNDER: TOKEN PURPOSE PENDING.",
  },
  "community-powered": {
    title: "THE TELEGRAM-POWERED UTILITY",
    subtitle: "The most active workflow is a Telegram group with 40,000 unread messages and one permanently online mod.",
    roast: "Your community is active, engaged and currently doing the job the token's utility was supposed to do.",
    disposition: "REFERRED TO THE OFFICE OF COMMUNITY-BASED PRODUCT DESIGN.",
  },
  "token-with-a-job": {
    title: "THE TOKEN WITH A DEFINED JOB",
    subtitle: "A necessary token role has been tied to a current user workflow. The Department is cautiously impressed.",
    roast: "You explained why the token exists without saying 'number go up'. Please remain under observation.",
    disposition: "GRANTED A PROVISIONAL CERTIFICATE OF TOKEN PURPOSE.",
  },
  "ticker-decoration": {
    title: "THE DECORATIVE CROSS-CHAIN TICKER",
    subtitle: "A working task was optional. A ticker, a contract address and a trending screenshot were apparently essential.",
    roast: "Remove the ticker and the narrative goes quiet. Add another CA and the launch thread comes back to life.",
    disposition: "REFERRED TO THE DEPARTMENT OF SYMBOLIC UTILITY.",
  },
  "metric-magician": {
    title: "THE CT METRIC MAGICIAN",
    subtitle: "The chart, view count and trending badge are impressive. The definitions and source links are elsewhere.",
    roast: "You have 98 dashboards and one metric called 'engagement'. Even the spreadsheet is asking questions.",
    disposition: "REQUESTED TO PRODUCE THE DENOMINATOR.",
  },
  "roadmap-romantic": {
    title: "THE CTO ROADMAP ROMANTIC",
    subtitle: "The next community takeover looks incredible. The current handover is still in another tab.",
    roast: "Your milestones are not late. They are exploring alternative temporal frameworks.",
    disposition: "PLACED ON THE WAITLIST FOR THE WAITLIST.",
  },
  "institutional-mirage": {
    title: "THE ECOSYSTEM EXPANSION MIRAGE",
    subtitle: "The token is a movement, an ecosystem and the future of everything. The future holder army has not found the CA yet.",
    roast: "You have promised the entire Solana timeline a place in the ecosystem. No one has been assigned to build the welcome desk.",
    disposition: "REFERRED TO THE OFFICE OF HYPOTHETICAL SCALE.",
  },
  "actually-useful": {
    title: "THE ACTUALLY USEFUL PROJECT",
    subtitle: "An identifiable user completed a repeatable task beyond watching a chart. The Department is unsettled.",
    roast: "There is evidence of utility here. We are opening a separate file to investigate how this happened.",
    disposition: "RELEASED WITH A SUSPICIOUSLY POSITIVE REFERENCE.",
  },
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function isValidUtilityAnswers(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length === INSPECTOR_QUESTIONS &&
    Array.from(value).every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)
  );
}

export function encodeUtilityCode(answers: number[]): string {
  if (!isValidUtilityAnswers(answers)) {
    throw new Error("A complete, valid utility inspection is required.");
  }
  return "u" + INSPECTOR_VERSION + "-" + answers.join("");
}

export function decodeUtilityCode(value: unknown): number[] | null {
  if (typeof value !== "string") return null;
  const match = value.match(new RegExp("^u" + INSPECTOR_VERSION + "-([0-3]{" + INSPECTOR_QUESTIONS + "})$"));
  if (!match) return null;
  const answers = [...match[1]].map(Number);
  return isValidUtilityAnswers(answers) ? answers : null;
}

export function inspectProgress(answers: number[]): UtilityProgress {
  if (
    !Array.isArray(answers) ||
    answers.length > INSPECTOR_QUESTIONS ||
    !Array.from(answers).every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)
  ) {
    throw new Error("Utility inspection answers are invalid.");
  }

  const history = answers.map((answer, index) => {
    const option = questions[index].options[answer];
    return {
      question: questions[index].prompt,
      answer: option.label,
      evidence: option.evidence,
      fog: option.fog,
      tokenFit: option.tokenFit,
    };
  });

  const maxScore = Math.max(1, answers.length * 5);
  return {
    completedQuestions: answers.length,
    evidence: answers.length ? round((history.reduce((sum, item) => sum + item.evidence, 0) / maxScore) * 100) : 0,
    fog: answers.length ? round((history.reduce((sum, item) => sum + item.fog, 0) / maxScore) * 100) : 0,
    tokenFit: answers.length ? round((history.reduce((sum, item) => sum + item.tokenFit, 0) / maxScore) * 100) : 0,
    history,
  };
}

function selectFinding(progress: UtilityProgress) {
  if (progress.evidence >= 78 && progress.fog <= 24 && progress.tokenFit >= 65) {
    return "UTILITY DETECTED. REPEAT: UTILITY DETECTED.";
  }
  if (progress.fog >= 75) return "NARRATIVE OVERLOAD / PRODUCT SIGNAL LOST.";
  if (progress.evidence <= 28) return "NO VERIFIABLE USE CASE FOUND.";
  if (progress.tokenFit <= 25) return "TOKEN ROLE REQUIRES IMMEDIATE EXPLANATION.";
  if (progress.evidence >= 60) return "PARTIAL UTILITY / ADDITIONAL DOCUMENTATION REQUIRED.";
  return "UTILITY CLAIMS RECEIVED / INDEPENDENT EVIDENCE PENDING.";
}

function selectProfile(progress: UtilityProgress, answers: number[]) {
  const tallies = new Map<UtilityArchetypeId, { count: number; fog: number; firstIndex: number }>();
  answers.forEach((answer, index) => {
    const tag = questions[index].options[answer].tag;
    const current = tallies.get(tag);
    if (current) {
      current.count += 1;
      current.fog += questions[index].options[answer].fog;
    } else {
      tallies.set(tag, { count: 1, fog: questions[index].options[answer].fog, firstIndex: index });
    }
  });

  const ranking = [...tallies.entries()].sort((a, b) =>
    b[1].count - a[1].count || b[1].fog - a[1].fog || a[1].firstIndex - b[1].firstIndex
  );

  const primaryTag = ranking[0]?.[0] ?? "solution-search";
  const secondaryTag = ranking[1]?.[0] ?? primaryTag;
  return { primaryTag, secondaryTag };
}

export function buildUtilityResult(answers: number[]): UtilityResult {
  if (!isValidUtilityAnswers(answers)) {
    throw new Error("A complete, valid utility inspection is required.");
  }

  const progress = inspectProgress(answers);
  const { primaryTag, secondaryTag } = selectProfile(progress, answers);
  const seed = answers.reduce((sum, answer, index) => ((sum * 31) + (answer + 1) * (index + 17)) % 900000, 606060);
  const caseNumber = String(seed + 100000).slice(-6);
  const decisionSummary = answers.map((answer, index) => "0" + (index + 1) + " / " + ["A", "B", "C", "D"][answer]).join("  •  ");
  const strongestEvidence = progress.history.reduce((best, item, index, history) =>
    item.evidence > history[best].evidence ? index : best, 0);
  const highestFog = progress.history.reduce((best, item, index, history) =>
    item.fog > history[best].fog ? index : best, 0);
  const evidenceItem = progress.history[strongestEvidence];
  const fogItem = progress.history[highestFog];
  const crossRead: DepartmentCrossRead = {
    headline: progress.evidence >= 60 && progress.fog >= 60
      ? "THE PROOF / PITCH COLLISION"
      : progress.fog >= 65
        ? "NARRATIVE VOLUME EXCEEDS THE SIGNAL"
        : progress.evidence >= 65 && progress.tokenFit >= 60
          ? "A USE CASE WITH A PLACE FOR THE TOKEN"
          : progress.tokenFit <= 30
            ? "THE TOKEN'S JOB IS STILL UNASSIGNED"
            : "CLAIMS FILED / EVIDENCE STILL MIXED",
    interpretation:
      "Your selected answers average " + progress.evidence + "/100 for evidence, " + progress.fog +
      "/100 for narrative fog and " + progress.tokenFit + "/100 for token justification. The two signals below identify the answers that contributed the most evidence and the most narrative fog in this fictional inspection. No external project data was checked.",
    signals: [
      {
        label: "STRONGEST EVIDENCE ANSWER",
        context: evidenceItem.question,
        answer: evidenceItem.answer,
        detail: "Evidence " + evidenceItem.evidence + "/5 · Fog " + evidenceItem.fog + "/5 · Token fit " + evidenceItem.tokenFit + "/5.",
      },
      {
        label: "HIGHEST NARRATIVE-FOG ANSWER",
        context: fogItem.question,
        answer: fogItem.answer,
        detail: "Evidence " + fogItem.evidence + "/5 · Fog " + fogItem.fog + "/5 · Token fit " + fogItem.tokenFit + "/5.",
      },
    ],
  };

  return {
    ...progress,
    crossRead,
    answers: [...answers],
    primaryTag,
    secondaryTag,
    profile: classifications[primaryTag],
    secondaryProfile: classifications[secondaryTag],
    finding: selectFinding(progress),
    caseNumber,
    decisionSummary,
  };
}
