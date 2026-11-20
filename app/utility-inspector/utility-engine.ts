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
    prompt: "WHAT IS THIS TOKEN TRYING TO BE?",
    note: "Describe the meme, product or community promise without hiding behind “ecosystem” and “number go up”.",
    options: [
      { label: "A clearly defined product or community purpose with evidence beyond the launch thread.", evidence: 5, fog: 0, tokenFit: 2, tag: "product-builder" },
      { label: "A plausible use or community role, although the audience is still being figured out.", evidence: 3, fog: 2, tokenFit: 2, tag: "roadmap-romantic" },
      { label: "The problem is that CT has not understood the ticker yet.", evidence: 1, fog: 4, tokenFit: 2, tag: "solution-search" },
      { label: "The token is a movement, an ecosystem and the future of everything. The details are in the next thread.", evidence: 0, fog: 5, tokenFit: 0, tag: "institutional-mirage" },
    ],
  },
  {
    prompt: "WHAT CAN A HOLDER ACTUALLY DO BESIDES WATCH THE CHART?",
    note: "A pinned post is not a product. A ticker is not a user journey.",
    options: [
      { label: "Use a working product or service that performs a clearly described task today.", evidence: 5, fog: 0, tokenFit: 3, tag: "actually-useful" },
      { label: "Try a working beta with a defined role and limitations that are actually disclosed.", evidence: 4, fog: 1, tokenFit: 2, tag: "product-builder" },
      { label: "Open a polished token dashboard. The only active feature is the price chart.", evidence: 1, fog: 4, tokenFit: 1, tag: "metric-magician" },
      { label: "Read the pinned thread and imagine the possibilities.", evidence: 0, fog: 5, tokenFit: 0, tag: "whitepaper-architect" },
    ],
  },
  {
    prompt: "WHO IS ACTUALLY HERE AFTER THE FIRST PUMP?",
    note: "A follower count is not active demand, and a reply is not a returning user.",
    options: [
      { label: "A defined group using the product or participating repeatedly in ways that can be verified.", evidence: 5, fog: 0, tokenFit: 2, tag: "actually-useful" },
      { label: "A small group of real users or contributors with traceable activity and direct feedback.", evidence: 4, fog: 1, tokenFit: 2, tag: "product-builder" },
      { label: "A busy Telegram and X timeline, mostly discussing what the token might become.", evidence: 1, fog: 4, tokenFit: 2, tag: "community-powered" },
      { label: "A future army of holders who have not discovered the CA yet.", evidence: 0, fog: 5, tokenFit: 0, tag: "institutional-mirage" },
    ],
  },
  {
    prompt: "WHY DOES THE PROJECT NEED THIS TOKEN?",
    note: "“Because the ticker is the product” is not a token design document.",
    options: [
      { label: "A defined token function with a clear reason it needs to exist on-chain.", evidence: 5, fog: 0, tokenFit: 5, tag: "token-with-a-job" },
      { label: "A documented incentive or governance role, with limits and trade-offs explained.", evidence: 4, fog: 1, tokenFit: 4, tag: "token-with-a-job" },
      { label: "The token mainly gives the community something to rally around and post about.", evidence: 2, fog: 3, tokenFit: 2, tag: "community-powered" },
      { label: "The product could work without it, but then what would the chart be about?", evidence: 0, fog: 5, tokenFit: 0, tag: "ticker-decoration" },
    ],
  },
  {
    prompt: "WHAT PROVES THAT THE HYPE IS MORE THAN A SCREENSHOT?",
    note: "A green candle, trending badge or KOL repost is not automatically evidence of demand.",
    options: [
      { label: "Verifiable usage or activity with clear definitions—not just volume screenshots.", evidence: 5, fog: 0, tokenFit: 3, tag: "actually-useful" },
      { label: "A small but traceable base of repeat users, holders or contributors.", evidence: 4, fog: 1, tokenFit: 2, tag: "product-builder" },
      { label: "A chart full of impressive numbers, with no explanation of holders, volume or retention.", evidence: 1, fog: 4, tokenFit: 1, tag: "metric-magician" },
      { label: "The community is extremely excited. The real metrics are coming after graduation.", evidence: 0, fog: 5, tokenFit: 0, tag: "community-powered" },
    ],
  },
  {
    prompt: "WHAT SURVIVES IF THE HYPE DISAPPEARS?",
    note: "A useful product or community should have a reason to exist beyond the green candle.",
    options: [
      { label: "The product or community still has a defined purpose if trading attention disappears.", evidence: 5, fog: 0, tokenFit: 5, tag: "token-with-a-job" },
      { label: "Some incentives change, but the core activity still has a reason to continue.", evidence: 4, fog: 1, tokenFit: 4, tag: "product-builder" },
      { label: "Most activity disappears when the chart stops moving and the rewards stop coming.", evidence: 1, fog: 4, tokenFit: 1, tag: "ticker-decoration" },
      { label: "The team says the question is FUD and asks everyone to focus on the next listing rumour.", evidence: 0, fog: 5, tokenFit: 0, tag: "whitepaper-architect" },
    ],
  },
  {
    prompt: "WHAT DOES THE ROADMAP MEAN AFTER THE LAUNCH THREAD?",
    note: "“Next catalyst” is not a milestone. A real milestone has an owner and a verifiable result.",
    options: [
      { label: "Named deliverables, accountable owners and progress that can be checked outside CT.", evidence: 5, fog: 0, tokenFit: 3, tag: "product-builder" },
      { label: "A sequence of releases with measurable checkpoints and disclosed dependencies.", evidence: 4, fog: 1, tokenFit: 2, tag: "roadmap-romantic" },
      { label: "A roadmap that moves from “community takeover” to “ecosystem expansion” without shipping anything.", evidence: 1, fog: 4, tokenFit: 1, tag: "roadmap-romantic" },
      { label: "The roadmap is a pinned thread that has been edited so many times nobody remembers the first version.", evidence: 0, fog: 5, tokenFit: 0, tag: "whitepaper-architect" },
    ],
  },
];

export const classifications: Record<UtilityArchetypeId, UtilityArchetype> = {
  "product-builder": {
    title: "THE PRODUCT BUILDER",
    subtitle: "There is a product, a user and an irritating amount of actual work.",
    roast: "The Department has reviewed your case and found an alarming shortage of buzzwords. Please explain yourself.",
    disposition: "REFERRED TO THE OFFICE OF UNREASONABLE FUNCTIONALITY.",
  },
  "solution-search": {
    title: "THE SOLUTION IN SEARCH OF A PROBLEM",
    subtitle: "The answer has arrived. The question is still being negotiated.",
    roast: "You have built a very impressive bridge. Unfortunately, nobody has found the river.",
    disposition: "ASSIGNED TO THE DEPARTMENT OF BACKWARDS PRODUCT-MARKET FIT.",
  },
  "whitepaper-architect": {
    title: "THE WHITEPAPER ARCHITECT",
    subtitle: "A thousand pages of possibility. Not a button in sight.",
    roast: "The document has achieved product-market fit with other documents.",
    disposition: "ARCHIVE UNDER: IMPLEMENTATION PENDING.",
  },
  "community-powered": {
    title: "THE COMMUNITY-POWERED UTILITY",
    subtitle: "The strongest product feature is a chat with 40,000 unread messages.",
    roast: "Your community is active, engaged and currently doing the job the product was supposed to do.",
    disposition: "REFERRED TO THE OFFICE OF COMMUNITY-BASED PRODUCT DESIGN.",
  },
  "token-with-a-job": {
    title: "THE TOKEN WITH A JOB",
    subtitle: "A token role has been identified. The Department is cautiously impressed.",
    roast: "You explained why the token exists without saying 'number go up'. Please remain under observation.",
    disposition: "GRANTED A PROVISIONAL CERTIFICATE OF TOKEN PURPOSE.",
  },
  "ticker-decoration": {
    title: "THE TICKER DECORATION",
    subtitle: "A product was optional. A token ticker was apparently essential.",
    roast: "Remove the token and the business model vanishes. Add a new ticker and the pitch deck comes back to life.",
    disposition: "REFERRED TO THE DEPARTMENT OF SYMBOLIC UTILITY.",
  },
  "metric-magician": {
    title: "THE METRIC MAGICIAN",
    subtitle: "The dashboard is full. The definitions are elsewhere.",
    roast: "You have 98 charts and one metric called 'engagement'. Even the spreadsheet is asking questions.",
    disposition: "REQUESTED TO PRODUCE THE DENOMINATOR.",
  },
  "roadmap-romantic": {
    title: "THE ROADMAP ROMANTIC",
    subtitle: "The future is looking incredible. The present is in another tab.",
    roast: "Your milestones are not late. They are exploring alternative temporal frameworks.",
    disposition: "PLACED ON THE WAITLIST FOR THE WAITLIST.",
  },
  "institutional-mirage": {
    title: "THE INSTITUTIONAL MIRAGE",
    subtitle: "Global adoption is imminent, according to a slide with no footnotes.",
    roast: "You are already serving the world's largest institutions. One of them might even know about it.",
    disposition: "REFERRED TO THE OFFICE OF HYPOTHETICAL PARTNERSHIPS.",
  },
  "actually-useful": {
    title: "THE ACTUALLY USEFUL ONE",
    subtitle: "An identifiable user performed an identifiable task. The Department is unsettled.",
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
    value.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)
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
    !answers.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)
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

  return {
    ...progress,
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
