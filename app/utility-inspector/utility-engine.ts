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
    prompt: "WHAT PROBLEM DOES THIS PROJECT SOLVE?",
    note: "Please describe the problem without using the words revolutionary, disruptive or ecosystem.",
    options: [
      { label: "A specific user problem, backed by evidence and a clearly defined audience.", evidence: 5, fog: 0, tokenFit: 2, tag: "product-builder" },
      { label: "A real problem, although the target user is still being figured out.", evidence: 3, fog: 2, tokenFit: 2, tag: "roadmap-romantic" },
      { label: "The problem is that the industry has not adopted our solution yet.", evidence: 1, fog: 4, tokenFit: 2, tag: "solution-search" },
      { label: "We are reimagining the future of everything, everywhere, all at once.", evidence: 0, fog: 5, tokenFit: 0, tag: "institutional-mirage" },
    ],
  },
  {
    prompt: "WHAT CAN A USER ACTUALLY DO TODAY?",
    note: "A waitlist is not a product. A logo is not a user journey.",
    options: [
      { label: "Use a working product to complete a task and get a measurable outcome.", evidence: 5, fog: 0, tokenFit: 3, tag: "actually-useful" },
      { label: "Try a limited beta with clear functionality and known limitations.", evidence: 4, fog: 1, tokenFit: 2, tag: "product-builder" },
      { label: "Explore a polished dashboard. Several buttons are marked coming soon.", evidence: 1, fog: 4, tokenFit: 1, tag: "metric-magician" },
      { label: "Read the whitepaper and imagine the possibilities.", evidence: 0, fog: 5, tokenFit: 0, tag: "whitepaper-architect" },
    ],
  },
  {
    prompt: "WHO IS USING IT?",
    note: "“The community” is a group, not a customer segment.",
    options: [
      { label: "Identifiable user groups with repeat usage and independently verifiable feedback.", evidence: 5, fog: 0, tokenFit: 2, tag: "actually-useful" },
      { label: "A small group of beta users with direct feedback and usage records.", evidence: 4, fog: 1, tokenFit: 2, tag: "product-builder" },
      { label: "Community members who mostly discuss the potential of the product.", evidence: 1, fog: 4, tokenFit: 2, tag: "community-powered" },
      { label: "Future institutions, global enterprises and people not yet born.", evidence: 0, fog: 5, tokenFit: 0, tag: "institutional-mirage" },
    ],
  },
  {
    prompt: "WHY DOES THE PROJECT NEED A TOKEN?",
    note: "“Because crypto” is not a token design document.",
    options: [
      { label: "A defined function users need, with a clear reason it belongs on-chain.", evidence: 5, fog: 0, tokenFit: 5, tag: "token-with-a-job" },
      { label: "A documented incentive or governance role, with limits and trade-offs explained.", evidence: 4, fog: 1, tokenFit: 4, tag: "token-with-a-job" },
      { label: "The token mainly helps with community alignment and rewards.", evidence: 2, fog: 3, tokenFit: 2, tag: "community-powered" },
      { label: "The product could work without it, but then what would the ticker be?", evidence: 0, fog: 5, tokenFit: 0, tag: "ticker-decoration" },
    ],
  },
  {
    prompt: "WHAT PROVES THAT PEOPLE USE IT?",
    note: "A screenshot of a dashboard is not automatically evidence of demand.",
    options: [
      { label: "Transparent usage data, clear definitions and verifiable product activity.", evidence: 5, fog: 0, tokenFit: 3, tag: "actually-useful" },
      { label: "A public beta, real user feedback and a small but traceable usage history.", evidence: 4, fog: 1, tokenFit: 2, tag: "product-builder" },
      { label: "A chart with impressive numbers and no explanation of what they measure.", evidence: 1, fog: 4, tokenFit: 1, tag: "metric-magician" },
      { label: "The community is extremely excited. The metrics are coming next week.", evidence: 0, fog: 5, tokenFit: 0, tag: "community-powered" },
    ],
  },
  {
    prompt: "WHAT HAPPENS IF YOU REMOVE THE TOKEN?",
    note: "A useful product should have a reason to exist beyond its ticker.",
    options: [
      { label: "The core product remains useful; the token has a separate, justified role.", evidence: 5, fog: 0, tokenFit: 5, tag: "token-with-a-job" },
      { label: "Some incentives change, but the product still delivers its main function.", evidence: 4, fog: 1, tokenFit: 4, tag: "product-builder" },
      { label: "Most of the activity disappears because rewards drive nearly everything.", evidence: 1, fog: 4, tokenFit: 1, tag: "ticker-decoration" },
      { label: "The team says it is impossible to answer a hypothetical that dangerous.", evidence: 0, fog: 5, tokenFit: 0, tag: "whitepaper-architect" },
    ],
  },
  {
    prompt: "HOW DOES THE ROADMAP BECOME REALITY?",
    note: "A milestone needs an owner, a deliverable and some form of accountability.",
    options: [
      { label: "Named deliverables, accountable owners, public progress and realistic milestones.", evidence: 5, fog: 0, tokenFit: 3, tag: "product-builder" },
      { label: "A clear sequence of releases, although timelines may change with evidence.", evidence: 4, fog: 1, tokenFit: 2, tag: "roadmap-romantic" },
      { label: "Several phases, each ending in another phase and a bigger announcement.", evidence: 1, fog: 4, tokenFit: 1, tag: "roadmap-romantic" },
      { label: "The roadmap is a living document. It has been alive for years.", evidence: 0, fog: 5, tokenFit: 0, tag: "whitepaper-architect" },
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
