export const ROADMAP_VERSION = 1;
export const ROADMAP_QUESTIONS = 6;

export type RoadmapArchetypeId =
  | "actually-shipping"
  | "forever-beta"
  | "soon-architect"
  | "ticker-decoration"
  | "partnership-vaporist"
  | "community-amplifier"
  | "global-adoption-intern"
  | "multiverse-expansionist"
  | "documentation-empire"
  | "milestone-matryoshka";

export type RoadmapOption = {
  label: string;
  delivery: number;
  realism: number;
  inflation: number;
  tag: RoadmapArchetypeId;
};

export type RoadmapQuestion = {
  prompt: string;
  note: string;
  options: RoadmapOption[];
};

export type RoadmapArchetype = {
  title: string;
  subtitle: string;
  roast: string;
  disposition: string;
};

export type RoadmapMilestone = {
  phase: string;
  title: string;
  description: string;
  eta: string;
  status: string;
};

export type RoadmapProgress = {
  completedQuestions: number;
  delivery: number;
  realism: number;
  inflation: number;
};

export type RoadmapResult = RoadmapProgress & {
  answers: number[];
  projectSlug: string;
  projectLabel: string;
  primaryTag: RoadmapArchetypeId;
  secondaryTag: RoadmapArchetypeId;
  profile: RoadmapArchetype;
  secondaryProfile: RoadmapArchetype;
  finding: string;
  disposition: string;
  caseNumber: string;
  summary: string;
  milestones: RoadmapMilestone[];
};

export const questions: RoadmapQuestion[] = [
  {
    prompt: "WHAT ACTUALLY EXISTS RIGHT NOW?",
    note: "Please distinguish between a working product and a very well-aligned Figma file.",
    options: [
      { label: "A live product with users, shipped features and an actual release history.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A public testnet or beta with known limitations and a visible backlog.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "A prototype is being polished. The announcement is ready.", delivery: 2, realism: 2, inflation: 3, tag: "soon-architect" },
      { label: "A whitepaper, a domain and an extremely confident cover image.", delivery: 0, realism: 0, inflation: 5, tag: "documentation-empire" },
    ],
  },
  {
    prompt: "HOW ARE YOUR DEADLINES CALCULATED?",
    note: "The phrase 'soon' is not a unit of time. The Department has checked.",
    options: [
      { label: "By scope, owners, dependencies and delivery capacity.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "By quarterly targets, with explicit room for revisions.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "Soon. We are waiting for the right moment to announce soon.", delivery: 1, realism: 1, inflation: 4, tag: "soon-architect" },
      { label: "Before the next listing. Whatever that means.", delivery: 0, realism: 0, inflation: 5, tag: "milestone-matryoshka" },
    ],
  },
  {
    prompt: "WHAT IS THE TOKEN'S ROLE IN THE ROADMAP?",
    note: "Please do not submit 'number go up' as a product requirement.",
    options: [
      { label: "A defined function connected to a real product workflow.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "Governance or incentives, with scope still being tested.", delivery: 3, realism: 3, inflation: 2, tag: "forever-beta" },
      { label: "The token will unlock utility in a future ecosystem phase.", delivery: 1, realism: 1, inflation: 4, tag: "ticker-decoration" },
      { label: "It is the foundation of an entirely new financial civilization.", delivery: 0, realism: 0, inflation: 5, tag: "multiverse-expansionist" },
    ],
  },
  {
    prompt: "HOW REAL ARE THE PARTNERSHIPS?",
    note: "A follow on X is not a strategic alliance. An emoji is not an MOU.",
    options: [
      { label: "Signed agreements with named counterparties and published scope.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A pilot or MOU exists, with details and dependencies disclosed.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "We are in active discussions with several major players.", delivery: 1, realism: 1, inflation: 4, tag: "partnership-vaporist" },
      { label: "The right people are watching. We cannot say more.", delivery: 0, realism: 0, inflation: 5, tag: "partnership-vaporist" },
    ],
  },
  {
    prompt: "HOW DO YOU MEASURE COMMUNITY GROWTH?",
    note: "A large Telegram number is not the same thing as a large number of users.",
    options: [
      { label: "Returning users, completed product tasks and useful feedback.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A mix of active contributors, product users and public support.", delivery: 4, realism: 4, inflation: 1, tag: "community-amplifier" },
      { label: "Followers, impressions and the occasional trending hashtag.", delivery: 2, realism: 2, inflation: 3, tag: "community-amplifier" },
      { label: "Community size is a state of mind. The number keeps going up.", delivery: 0, realism: 0, inflation: 5, tag: "global-adoption-intern" },
    ],
  },
  {
    prompt: "WHAT DOES THE FINAL MILESTONE LOOK LIKE?",
    note: "The phrase 'global adoption' has been flagged for excessive ambition.",
    options: [
      { label: "A stable product, measurable outcomes and a clear next release.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A wider ecosystem with defined integrations and actual users.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "Multi-chain expansion, mass adoption and institutional recognition.", delivery: 1, realism: 1, inflation: 4, tag: "global-adoption-intern" },
      { label: "AI, gaming, RWA, DePIN, metaverse and the interplanetary economy.", delivery: 0, realism: 0, inflation: 5, tag: "multiverse-expansionist" },
    ],
  },
];

export const classifications: Record<RoadmapArchetypeId, RoadmapArchetype> = {
  "actually-shipping": {
    title: "THE RELUCTANT SHIPPER",
    subtitle: "You have deliverables, owners and a slightly concerning relationship with deadlines.",
    roast: "The Department has detected actual work. Please stop immediately and explain how this happened.",
    disposition: "RELEASED UNDER OBSERVATION FOR EXCESSIVE EXECUTION.",
  },
  "forever-beta": {
    title: "THE FOREVER BETA",
    subtitle: "The beta is public. The product is improving. The finish line has moved again.",
    roast: "Your roadmap is technically progressing. It is just progressing in a circular direction.",
    disposition: "PLACED IN PERMANENT BETA REVIEW.",
  },
  "soon-architect": {
    title: "THE SOON™ ARCHITECT",
    subtitle: "Every milestone is imminent. The calendar has requested legal representation.",
    roast: "You have turned 'soon' into a multi-phase delivery methodology.",
    disposition: "REFERRED TO THE OFFICE OF TEMPORAL AMBIGUITY.",
  },
  "ticker-decoration": {
    title: "THE TICKER DECORATION",
    subtitle: "The token has a future role. The present role is appearing on the chart.",
    roast: "The roadmap gives the token utility in Phase 6. Phase 6 has been moved to Phase 6.5.",
    disposition: "REQUESTED TO PROVIDE A TOKEN PURPOSE BEFORE THE NEXT ANNOUNCEMENT.",
  },
  "partnership-vaporist": {
    title: "THE PARTNERSHIP VAPORIST",
    subtitle: "Strategic conversations are happening in rooms that cannot be independently located.",
    roast: "You have announced the pre-announcement of a partnership with the possibility of a conversation.",
    disposition: "REFERRED TO THE OFFICE OF MUTUAL NON-DISCLOSURE.",
  },
  "community-amplifier": {
    title: "THE COMMUNITY AMPLIFIER",
    subtitle: "The community is growing. The product team is still checking the numbers.",
    roast: "Your roadmap has a very active social layer and a product layer currently set to private.",
    disposition: "ASSIGNED TO THE DEPARTMENT OF ENGAGEMENT-BASED DELIVERY.",
  },
  "global-adoption-intern": {
    title: "THE GLOBAL ADOPTION INTERN",
    subtitle: "You have been asked to achieve mass adoption before the first public release.",
    roast: "Your final milestone serves eight billion users. Your beta has seventeen test accounts.",
    disposition: "PROMOTED TO VICE PRESIDENT OF THE ENTIRE PLANET.",
  },
  "multiverse-expansionist": {
    title: "THE MULTIVERSE EXPANSIONIST",
    subtitle: "One product. Twelve sectors. Three dimensions. No known constraints.",
    roast: "You are building the everything-app for everyone, including several markets that do not exist.",
    disposition: "REFERRED TO THE OFFICE OF INTERGALACTIC ROADMAP COORDINATION.",
  },
  "documentation-empire": {
    title: "THE DOCUMENTATION EMPIRE",
    subtitle: "The documentation has a roadmap. The product has a table of contents.",
    roast: "Your whitepaper has shipped three sequels. The first button is still in development.",
    disposition: "ARCHIVED UNDER: DOCUMENTATION COMPLETE / PRODUCT TBD.",
  },
  "milestone-matryoshka": {
    title: "THE MILESTONE MATRYOSHKA",
    subtitle: "Every milestone unlocks another milestone that unlocks another milestone.",
    roast: "Your Phase 2 is a roadmap for Phase 2. Phase 2.1 will explain the dependencies.",
    disposition: "PLACED INSIDE THE ROADMAP FOR FURTHER ROADMAP REVIEW.",
  },
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function slugifyProjectName(value: string): string {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24)
    .replace(/-+$/g, "");
  return slug.length >= 2 ? slug : "PROJECT-SOON";
}

export function isValidRoadmapAnswers(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length === ROADMAP_QUESTIONS &&
    value.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)
  );
}

export function encodeRoadmapCode(answers: number[], projectName: string): string {
  if (!isValidRoadmapAnswers(answers)) {
    throw new Error("A complete, valid roadmap questionnaire is required.");
  }
  return "r" + ROADMAP_VERSION + "-" + answers.join("") + "-" + slugifyProjectName(projectName);
}

export function decodeRoadmapCode(value: unknown): { answers: number[]; projectSlug: string } | null {
  if (typeof value !== "string") return null;
  const match = value.match(new RegExp("^r" + ROADMAP_VERSION + "-([0-3]{" + ROADMAP_QUESTIONS + "})-([A-Z0-9]+(?:-[A-Z0-9]+)*)$"));
  if (!match) return null;
  const answers = [...match[1]].map(Number);
  const projectSlug = match[2];
  if (!isValidRoadmapAnswers(answers) || projectSlug.length > 24) return null;
  return { answers, projectSlug };
}

export function inspectRoadmapProgress(answers: number[]): RoadmapProgress {
  if (
    !Array.isArray(answers) ||
    answers.length > ROADMAP_QUESTIONS ||
    !answers.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)
  ) {
    throw new Error("Roadmap answers are invalid.");
  }
  const selected = answers.map((answer, index) => questions[index].options[answer]);
  const maxScore = Math.max(1, answers.length * 5);
  return {
    completedQuestions: answers.length,
    delivery: answers.length ? round((selected.reduce((sum, option) => sum + option.delivery, 0) / maxScore) * 100) : 0,
    realism: answers.length ? round((selected.reduce((sum, option) => sum + option.realism, 0) / maxScore) * 100) : 0,
    inflation: answers.length ? round((selected.reduce((sum, option) => sum + option.inflation, 0) / maxScore) * 100) : 0,
  };
}

function chooseProfiles(answers: number[]) {
  const tallies = new Map<RoadmapArchetypeId, { count: number; inflation: number; firstIndex: number }>();
  answers.forEach((answer, index) => {
    const option = questions[index].options[answer];
    const current = tallies.get(option.tag);
    if (current) {
      current.count += 1;
      current.inflation += option.inflation;
    } else {
      tallies.set(option.tag, { count: 1, inflation: option.inflation, firstIndex: index });
    }
  });
  const ranking = [...tallies.entries()].sort((a, b) =>
    b[1].count - a[1].count || b[1].inflation - a[1].inflation || a[1].firstIndex - b[1].firstIndex
  );
  return {
    primaryTag: ranking[0]?.[0] ?? "soon-architect",
    secondaryTag: ranking[1]?.[0] ?? ranking[0]?.[0] ?? "soon-architect",
  };
}

function getFinding(progress: RoadmapProgress) {
  if (progress.delivery >= 75 && progress.realism >= 75) return "DELIVERABLES DETECTED. THIS MAY BE A REAL ROADMAP.";
  if (progress.inflation >= 80) return "PROMISE INFLATION EXCEEDS DEPARTMENTAL LIMITS.";
  if (progress.realism <= 20) return "TIMELINE CLASSIFIED AS A THEORETICAL CONSTRUCT.";
  if (progress.delivery <= 25) return "MILESTONES RECEIVED. EVIDENCE OF SHIPPING NOT LOCATED.";
  if (progress.inflation >= 60) return "ROADMAP CONTAINS A SIGNIFICANT AMOUNT OF SOON.";
  return "MILESTONE PLAN ACCEPTED PENDING A DATE THAT MEANS SOMETHING.";
}

function getDisposition(progress: RoadmapProgress) {
  if (progress.delivery >= 75 && progress.realism >= 75) return "APPROVED FOR A LIMITED PERIOD OF ACTUAL DELIVERY.";
  if (progress.inflation >= 80) return "ESCALATE TO THE OFFICE OF UNBOUNDED AMBITION.";
  if (progress.realism <= 20) return "SUSPEND ALL CALENDAR REFERENCES UNTIL FURTHER NOTICE.";
  if (progress.delivery <= 25) return "REQUEST A DEMO. THEN REQUEST ANOTHER DEMO.";
  return "RETURN FOR REVIEW AFTER THE NEXT COMMUNITY UPDATE.";
}

function buildMilestones(answers: number[], projectLabel: string): RoadmapMilestone[] {
  const maturity = answers[0];
  const timeline = answers[1];
  const token = answers[2];
  const partnerships = answers[3];
  const community = answers[4];
  const ambition = answers[5];

  const schedules = [
    ["NEXT QUARTER", "THE QUARTER AFTER NEXT", "WHEN THE BETA IS READY", "TBD / PLEASE STOP ASKING"],
    ["AFTER THE NEXT AMA", "SOON™", "VERY SOON™", "BEFORE THE NEXT LISTING"],
    ["Q∞ / UNDER DISCUSSION", "AFTER MAINNET", "WHEN THE MARKET IMPROVES", "IN THE NEXT ANNOUNCEMENT"],
    ["WHEN DEPENDENCIES CLEAR", "AFTER PARTNERSHIP CONFIRMATION", "ONCE THE COMMUNITY IS ALIGNED", "WHEN THE STARS ALIGN"],
  ][timeline];

  const productStatus = maturity === 0
    ? "LIVE / ITERATION REQUIRED"
    : maturity === 1
      ? "BETA OPEN / MAINNET STILL LOADING"
      : maturity === 2
        ? "IN DEVELOPMENT / ANNOUNCEMENT READY"
        : "DOCUMENTED / NOT YET LOCATED";
  const partnershipStatus = partnerships === 0
    ? "SIGNED / SCOPE SUBJECT TO REVIEW"
    : partnerships === 1
      ? "PILOT OR MOU / DETAILS PENDING"
      : partnerships === 2
        ? "IN ACTIVE DISCUSSIONS™"
        : "STRATEGIC ALIGNMENT DETECTED BY VIBES";
  const tokenStatus = token === 0
    ? "TOKEN ROLE DEFINED / REVIEW OPEN"
    : token === 1
      ? "GOVERNANCE / INCENTIVES IN TESTING"
      : token === 2
        ? "UTILITY EXPECTED IN A FUTURE PHASE"
        : "TICKER CONFIRMED / PURPOSE PENDING";
  const communityStatus = community === 0
    ? "USER FEEDBACK / ACTION REQUIRED"
    : community === 1
      ? "CONTRIBUTOR EXPANSION / ONGOING"
      : community === 2
        ? "ENGAGEMENT METRICS / VERY POSITIVE"
        : "GLOBAL MOVEMENT / DEFINITION PENDING";

  const finalGoal = ambition === 0
    ? "SHIP THE NEXT VERSION"
    : ambition === 1
      ? "EXPAND THE ECOSYSTEM"
      : ambition === 2
        ? "ACHIEVE GLOBAL ADOPTION"
        : "ONBOARD THE MULTIVERSE";
  const finalDescription = ambition === 0
    ? "Release, measure, learn and publish what changed. The Department has requested proof."
    : ambition === 1
      ? "Connect additional networks, partners and integrations. Scope may expand during the announcement."
      : ambition === 2
        ? "Bring the product to every user, institution and jurisdiction currently represented by a slide."
        : "Extend the ecosystem into AI, gaming, RWA, DePIN and any acronym announced before the deadline.";

  return [
    {
      phase: "PHASE 01 / THE BEGINNING",
      title: "FOUNDATION OF THE FOUNDATION",
      description: projectLabel + " establishes the core vision, aligns all stakeholders and opens a working document titled FINAL_FINAL_v7.",
      eta: "ALREADY IN PROGRESS",
      status: "99% COMPLETE / THE 1% IS PRODUCT",
    },
    {
      phase: "PHASE 02 / DOCUMENTATION",
      title: "ROADMAP FOR THE ROADMAP",
      description: "Publish the whitepaper, revise the whitepaper and create a dedicated roadmap explaining when the roadmap will be final.",
      eta: schedules[0],
      status: "DRAFTING / VERSION NUMBER NOT FINAL",
    },
    {
      phase: "PHASE 03 / PRODUCT",
      title: maturity === 0 ? "PRODUCT ITERATION & SCALE" : "PUBLIC BETA / PRIVATE WAITLIST",
      description: maturity === 0
        ? "Ship incremental improvements based on user feedback. The team has agreed not to rename the beta."
        : "Open a limited test environment, collect feedback and prepare the announcement for a wider beta announcement.",
      eta: schedules[1],
      status: productStatus,
    },
    {
      phase: "PHASE 04 / PARTNERSHIPS",
      title: "STRATEGIC PARTNERSHIPS",
      description: partnerships === 0
        ? "Activate the named agreements, publish the scope and finally use the word partnership correctly."
        : "Continue confidential discussions with major ecosystem participants. A logo wall is being prepared as a precaution.",
      eta: schedules[2],
      status: partnershipStatus,
    },
    {
      phase: "PHASE 05 / TOKEN UTILITY",
      title: "TOKEN UTILITY ACTIVATION",
      description: token === 0
        ? "Connect the defined token role to the product and document its limitations."
        : "Unlock the utility layer in a future ecosystem phase. The exact phase is itself subject to a future phase.",
      eta: schedules[3],
      status: tokenStatus,
    },
    {
      phase: "PHASE 06 / COMMUNITY",
      title: "COMMUNITY-LED EXPANSION",
      description: community === 0
        ? "Convert product feedback into a public change log. The community has been asked to read it before posting."
        : "Expand the global community, increase ecosystem visibility and introduce a new ambassador programme for the existing ambassador programme.",
      eta: schedules[(timeline + 1) % schedules.length][2] || schedules[0],
      status: communityStatus,
    },
    {
      phase: "PHASE 07 / THE DESTINATION",
      title: finalGoal,
      description: finalDescription,
      eta: "SOON™ / SUBJECT TO ALL PREVIOUS PHASES",
      status: ambition === 0 ? "DELIVERY TARGET / NOT A PROMISE" : "VISIONARY / CALENDAR NOT REQUIRED",
    },
  ];
}

export function buildRoadmapResult(answers: number[], projectName: string): RoadmapResult {
  if (!isValidRoadmapAnswers(answers)) {
    throw new Error("A complete, valid roadmap questionnaire is required.");
  }
  const projectSlug = slugifyProjectName(projectName);
  const projectLabel = projectSlug.replace(/-/g, " ");
  const progress = inspectRoadmapProgress(answers);
  const { primaryTag, secondaryTag } = chooseProfiles(answers);
  const seed = answers.reduce((sum, answer, index) => ((sum * 37) + (answer + 1) * (index + 19)) % 900000, 707070);
  const caseNumber = String(seed + 100000).slice(-6);
  const summary = [
    progress.delivery + "/100 DELIVERY CLARITY",
    progress.realism + "/100 TIMELINE REALISM",
    progress.inflation + "/100 PROMISE INFLATION",
  ].join(" / ");

  return {
    ...progress,
    answers: [...answers],
    projectSlug,
    projectLabel,
    primaryTag,
    secondaryTag,
    profile: classifications[primaryTag],
    secondaryProfile: classifications[secondaryTag],
    finding: getFinding(progress),
    disposition: getDisposition(progress),
    caseNumber,
    summary,
    milestones: buildMilestones(answers, projectLabel),
  };
}
