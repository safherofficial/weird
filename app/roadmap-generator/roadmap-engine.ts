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
    prompt: "WHAT ACTUALLY EXISTS AFTER THE LAUNCH POST?",
    note: "Please distinguish between a working product, a token launch and a well-designed pinned thread.",
    options: [
      { label: "A live product or service with real users, shipped features and a verifiable release history.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A public beta with clear limits, visible owners and a backlog that can be checked.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "The token is live. The product is still a pinned post and a “building” status.", delivery: 2, realism: 2, inflation: 3, tag: "soon-architect" },
      { label: "A CA, a banner, a Telegram group and an extremely confident launch thread.", delivery: 0, realism: 0, inflation: 5, tag: "documentation-empire" },
    ],
  },
  {
    prompt: "WHEN DOES “SOON” BECOME A DELIVERABLE?",
    note: "“After graduation” is not a delivery date. The Department has checked.",
    options: [
      { label: "By named owners, concrete deliverables, dependencies and actual capacity.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "By dated milestones with clear acceptance criteria and public revisions.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "After the next catalyst. The catalyst is currently being discussed on Spaces.", delivery: 1, realism: 1, inflation: 4, tag: "soon-architect" },
      { label: "Before the next 100x. The calendar has declined to confirm which one.", delivery: 0, realism: 0, inflation: 5, tag: "milestone-matryoshka" },
    ],
  },
  {
    prompt: "WHAT HAPPENS TO THE TOKEN AFTER THE FIRST PUMP?",
    note: "Please do not submit “number go up” as a post-graduation operating plan.",
    options: [
      { label: "A defined token function connected to an actual product or community workflow.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A scoped governance or incentive role, with limits and trade-offs disclosed.", delivery: 3, realism: 3, inflation: 2, tag: "forever-beta" },
      { label: "Utility will arrive after the CTO takeover, the next exchange rumour and Phase 4.", delivery: 1, realism: 1, inflation: 4, tag: "ticker-decoration" },
      { label: "The ticker will power the future of the entire Solana ecosystem.", delivery: 0, realism: 0, inflation: 5, tag: "multiverse-expansionist" },
    ],
  },
  {
    prompt: "HOW REAL ARE THE KOL AND ECOSYSTEM PARTNERSHIPS?",
    note: "A follow, a quote-tweet or a rocket emoji is not a strategic alliance.",
    options: [
      { label: "Named counterparties, documented scope and a deliverable that can be independently checked.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A disclosed campaign or pilot exists, with scope, dates and any paid promotion made clear.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "Several KOLs have posted the same chart. The Department is still looking for the original source.", delivery: 1, realism: 1, inflation: 4, tag: "partnership-vaporist" },
      { label: "The right wallets are watching. We cannot say which ones or why.", delivery: 0, realism: 0, inflation: 5, tag: "partnership-vaporist" },
    ],
  },
  {
    prompt: "HOW DO YOU MEASURE REAL COMMUNITY GROWTH?",
    note: "A trending CA and a large follower count do not prove a durable community.",
    options: [
      { label: "Returning contributors, real product use and useful feedback beyond launch-day replies.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A mix of active holders, builders and contributors—not just copy-pasted “send it” replies.", delivery: 4, realism: 4, inflation: 1, tag: "community-amplifier" },
      { label: "X followers, impressions, Spaces attendance and the occasional trending badge.", delivery: 2, realism: 2, inflation: 3, tag: "community-amplifier" },
      { label: "Community growth is measured by how many people still post after the chart turns red.", delivery: 0, realism: 0, inflation: 5, tag: "global-adoption-intern" },
    ],
  },
  {
    prompt: "WHAT DOES SUCCESS LOOK LIKE AFTER GRADUATION?",
    note: "The Department has flagged “100x” as a price target, not a delivery milestone.",
    options: [
      { label: "A durable product or community, transparent ownership and a clear next release.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A wider ecosystem with real integrations, responsible operators and actual users.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "A new ticker, another launchpad and a global army of holders.", delivery: 1, realism: 1, inflation: 4, tag: "global-adoption-intern" },
      { label: "AI, gaming, DePIN, RWA, a second CTO and the interplanetary pump.", delivery: 0, realism: 0, inflation: 5, tag: "multiverse-expansionist" },
    ],
  },
];

export const classifications: Record<RoadmapArchetypeId, RoadmapArchetype> = {
  "actually-shipping": {
    title: "THE RARELY SHIPPING CTO",
    subtitle: "You have named owners, working access and a public handover checklist. The Department is suspicious.",
    roast: "The community takeover contains actual deliverables. CT has asked whether the deployer is feeling alright.",
    disposition: "RELEASED UNDER OBSERVATION FOR EXCESSIVE EXECUTION.",
  },
  "forever-beta": {
    title: "THE FOREVER COMMUNITY TAKEOVER",
    subtitle: "The new account is active. The handover is improving. The promised relaunch is still in a private channel.",
    roast: "Your CTO is technically progressing. It is just progressing through a new pinned post every week.",
    disposition: "PLACED IN PERMANENT HANDOVER REVIEW.",
  },
  "soon-architect": {
    title: "THE SOON™ CTO",
    subtitle: "Every recovery phase is imminent. The calendar has blocked the account.",
    roast: "You have turned 'soon' into a seven-stage community takeover methodology.",
    disposition: "REFERRED TO THE OFFICE OF DEPLOYER SILENCE.",
  },
  "ticker-decoration": {
    title: "THE TICKER WITH A FUTURE JOB",
    subtitle: "The token will become useful after the relaunch, the rebrand and the next three announcements.",
    roast: "The roadmap gives the ticker a purpose in Phase 6. Phase 6 is waiting for the new banner.",
    disposition: "REQUESTED TO PROVIDE A TOKEN PURPOSE BEFORE THE NEXT CTO SPACE.",
  },
  "partnership-vaporist": {
    title: "THE STRATEGIC KOL ALLIANCE",
    subtitle: "Several accounts have posted the same CA. The Department is still looking for the original source.",
    roast: "You have announced the pre-announcement of a KOL partnership with the possibility of a quote-tweet.",
    disposition: "REFERRED TO THE OFFICE OF INDEPENDENT SOURCE VALIDATION.",
  },
  "community-amplifier": {
    title: "THE TELEGRAM REPLY FARM",
    subtitle: "The community is active. The chat is moving. The deployer access checklist is still blank.",
    roast: "Your roadmap has a very active social layer and a handover layer currently set to private.",
    disposition: "ASSIGNED TO THE DEPARTMENT OF COMMUNITY-BASED RECOVERY.",
  },
  "global-adoption-intern": {
    title: "THE 100X REBRAND INTERN",
    subtitle: "You have been asked to rebuild the entire Solana timeline before the next five-minute candle.",
    roast: "Your final milestone serves every wallet on the planet. Your CTO Telegram has seventeen active members.",
    disposition: "PROMOTED TO VICE PRESIDENT OF THE ENTIRE TIMELINE.",
  },
  "multiverse-expansionist": {
    title: "THE NARRATIVE MULTIVERSE EXPANSIONIST",
    subtitle: "One ticker. Twelve narratives. Three separate CT accounts. No named owner.",
    roast: "You are building the everything-memecoin for every chain, including several that only exist in the pinned thread.",
    disposition: "REFERRED TO THE OFFICE OF INTERGALACTIC CTO COORDINATION.",
  },
  "documentation-empire": {
    title: "THE PINNED-THREAD EMPIRE",
    subtitle: "The takeover thread has a roadmap. The recovery has a table of contents.",
    roast: "Your CTO has shipped three pinned posts. The first access question is still waiting for an answer.",
    disposition: "ARCHIVED UNDER: HANDOVER DOCUMENTED / CONTROL NOT VERIFIED.",
  },
  "milestone-matryoshka": {
    title: "THE PHASE TWO MATRYOSHKA",
    subtitle: "Every recovery phase unlocks another recovery phase that explains the previous phase.",
    roast: "Your Phase 2 is a roadmap for Phase 2. Phase 2.1 will explain who has the keys.",
    disposition: "PLACED INSIDE THE TAKEOVER ROADMAP FOR FURTHER REVIEW.",
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
  if (progress.delivery >= 75 && progress.realism >= 75) return "HANDOVER OWNERS AND DELIVERABLES DETECTED. PLEASE REMAIN CALM.";
  if (progress.inflation >= 80) return "CTO PROMISE INFLATION EXCEEDS DEPARTMENTAL LIMITS.";
  if (progress.realism <= 20) return "COMMUNITY TAKEOVER CLASSIFIED AS A THEORETICAL CONSTRUCT.";
  if (progress.delivery <= 25) return "RECOVERY PHASES RECEIVED. EVIDENCE OF ACCESS OR HANDOVER NOT LOCATED.";
  if (progress.inflation >= 60) return "TAKEOVER PLAN CONTAINS A SIGNIFICANT AMOUNT OF SOON™.";
  return "COMMUNITY TAKEOVER PLAN ACCEPTED PENDING A NAMED OWNER AND A DATE THAT MEANS SOMETHING.";
}

function getDisposition(progress: RoadmapProgress) {
  if (progress.delivery >= 75 && progress.realism >= 75) return "APPROVED FOR A LIMITED PERIOD OF VERIFIED COMMUNITY DELIVERY.";
  if (progress.inflation >= 80) return "ESCALATE TO THE OFFICE OF UNBOUNDED CTO AMBITION.";
  if (progress.realism <= 20) return "SUSPEND ALL HANDOVER TIMELINES UNTIL ACCESS IS EXPLAINED.";
  if (progress.delivery <= 25) return "REQUEST THE DEPLOYER HANDOVER. THEN REQUEST THE KEYS.";
  return "RETURN FOR REVIEW AFTER THE NEXT CT / TELEGRAM HANDOVER UPDATE.";
}

function buildMilestones(answers: number[], projectLabel: string): RoadmapMilestone[] {
  const maturity = answers[0];
  const timeline = answers[1];
  const token = answers[2];
  const partnerships = answers[3];
  const community = answers[4];
  const ambition = answers[5];

  // Each timeline track reflects the answer selected in question 02.
  const schedules = [
    [
      "AFTER THE NAMED OWNER ACCEPTS THE DELIVERABLE",
      "AFTER THE DOCUMENTED ACCEPTANCE CHECK",
      "WHEN THE VERIFIED CURVE MILESTONE IS REACHED",
      "AFTER THE HANDOVER RECORD IS PUBLISHED",
    ],
    [
      "ON THE PUBLISHED CTO MILESTONE DATE",
      "ON THE DATED RELEASE CHECKPOINT",
      "AFTER THE SCHEDULED COMMUNITY REVIEW",
      "ON THE VERSIONED DELIVERY DATE",
    ],
    [
      "AFTER THE NEXT CT SPACE",
      "AFTER THE NEXT CURVE MILESTONE",
      "WHEN THE DEPLOYER REPLIES",
      "IN THE NEXT PINNED THREAD",
    ],
    [
      "BEFORE THE NEXT 100X CALL",
      "BEFORE THE NEXT GREEN-CANDLE SCREENSHOT",
      "AFTER THE NEXT NARRATIVE PIVOT",
      "WHEN THE CALENDAR ACCEPTS VIBES",
    ],
  ][timeline];

  const productStatus = [
    "LIVE PRODUCT CLAIMED / RELEASE HISTORY NOT INDEPENDENTLY VERIFIED",
    "PUBLIC BETA / SCOPE AND OWNERS REPORTED",
    "TOKEN LIVE / PRODUCT STILL A PINNED POST",
    "CA AND TELEGRAM LOCATED / PRODUCT DELIVERABLE NOT DESCRIBED",
  ][maturity];

  const productTitle = [
    "LIVE PRODUCT / RELEASE HISTORY REVIEW",
    "PUBLIC BETA / SCOPE REVIEW",
    "TOKEN LIVE / PRODUCT STILL A PINNED POST",
    "CA LOCATED / PRODUCT DELIVERABLE NOT FOUND",
  ][maturity];

  const productDescription = [
    "The intake reports a live product, real users and shipped features. Record the release evidence, name the operators and show what remains active after launch attention fades.",
    "The public beta is reported as active. Document its scope, limitations, named owners and acceptance criteria before calling the handover complete.",
    "The token is live, but the product is still described as a pinned post. Separate token availability from actual product delivery and name the next verifiable release.",
    "The CA and Telegram are present, but no working product or service has been described. File an actual deliverable before announcing another phase.",
  ][maturity];

  const partnershipTitle = [
    "NAMED COUNTERPARTIES ENTER THE RECORD",
    "THE PILOT HAS A SCOPE AND A DATE",
    "THE TIMELINE DISCOVERS THE SAME CA",
    "THE RIGHT WALLETS ARE WATCHING / SOURCE NOT LOCATED",
  ][partnerships];

  const partnershipStatus = [
    "NAMED COUNTERPARTIES / SCOPE AND SOURCES REPORTED",
    "DISCLOSED PILOT / SCOPE AND DATES REPORTED",
    "KOL / MODERATOR DISCUSSIONS™",
    "UNNAMED WALLET WATCHERS / SOURCE NOT LOCATED",
  ][partnerships];

  const partnershipDescription = [
    "Publish the named counterparties, agreed scope, deliverables and source links. Distinguish paid promotion from independent commentary.",
    "Record the pilot's scope, dates, named owners and acceptance criteria. Disclose paid promotion or other incentives clearly.",
    "Several KOL-style accounts are repeating the same call. Trace the original source and disclose any coordinated or paid campaign.",
    "The claim that 'the right wallets are watching' has no names or checkable context. Identify the counterparties or withdraw the claim.",
  ][partnerships];

  const tokenStatus = [
    "DEFINED TOKEN FUNCTION / WORKFLOW IDENTIFIED",
    "INCENTIVE OR GOVERNANCE ROLE / LIMITS TO DOCUMENT",
    "FUTURE UTILITY / CTO PHASE DEPENDENCY",
    "TICKER CONFIRMED / PURPOSE PENDING",
  ][token];

  const tokenDescription = [
    "Document the token's defined function, the product workflow it supports and why that workflow requires an on-chain token.",
    "Publish the incentive or governance role, its limits and its trade-offs. The Department requests the small print.",
    "The utility is deferred until after the CTO takeover and the next narrative pivot. Put a named owner and a verifiable milestone on that dependency.",
    "The ticker exists, but no token-specific function has been identified. Mark the purpose as unresolved rather than inventing one.",
  ][token];

  const communityStatus = [
    "REPEAT USERS / RETURNING CONTRIBUTORS REPORTED",
    "ACTIVE HOLDERS / BUILDERS / CONTRIBUTORS REPORTED",
    "FOLLOWERS / IMPRESSIONS / SPACES ATTENDANCE",
    "POST-RED-CANDLE REPLIES / RETENTION NOT VERIFIED",
  ][community];

  const communityDescription = [
    "Report returning contributors, repeat product use and useful feedback. The Department requests defined measures rather than a launch-day screenshot.",
    "Separate active holders, builders and contributors. Record participation that goes beyond copy-pasted 'send it' replies.",
    "Follower counts, impressions and Spaces attendance are not retention metrics. Add evidence of repeat participation or product use.",
    "Record how many people remain after the chart turns red, then distinguish continued posting from continued use.",
  ][community];

  const finalGoal = [
    "SHIP AND MAINTAIN A DURABLE PRODUCT OR COMMUNITY",
    "EXPAND A REAL, INTEGRATED ECOSYSTEM",
    "LAUNCH ANOTHER TICKER / THE NEXT 100X STORY",
    "BUILD THE MEME-MULTIVERSE",
  ][ambition];

  const finalDescription = [
    "Publish the next release, name accountable owners and show how the product or community remains useful beyond the launch cycle.",
    "Document real integrations, responsible operators and actual users. The Department requests a working deliverable rather than a partner-logo wall.",
    "Prepare the next ticker, launchpad and global-holder announcement. The current file remains open until the previous post-mortem is complete.",
    "Extend the narrative across AI, gaming, DePIN and RWA before the current product or token purpose has been established.",
  ][ambition];

  const finalStatus = [
    "DELIVERY TARGET / NOT A PROMISE",
    "INTEGRATION TARGET / EVIDENCE REQUIRED",
    "VISIONARY / COMMUNITY SIZE NOT VERIFIED",
    "VISIONARY / CALENDAR NOT REQUIRED",
  ][ambition];

  return [
    {
      phase: "PHASE 01 / LAUNCH AFTERMATH",
      title: "THE DEPLOYER GOES QUIET",
      description: projectLabel + " begins with a CA, a launch thread and a deployer account that has stopped answering questions. The Department requests a named status update.",
      eta: "ALREADY IN PROGRESS",
      status: "CA LOCATED / HANDOVER NOT VERIFIED",
    },
    {
      phase: "PHASE 02 / COMMUNITY TAKEOVER",
      title: "THE CTO ACCOUNT APPEARS",
      description: "Publish the handover thread, name the people taking responsibility and explain which permissions, channels and project assets have actually changed hands.",
      eta: schedules[0],
      status: "BANNER UPDATED / ACCESS REVIEW OPEN",
    },
    {
      phase: "PHASE 03 / LAUNCH & CURVE",
      title: productTitle,
      description: productDescription,
      eta: schedules[1],
      status: productStatus,
    },
    {
      phase: "PHASE 04 / CT & KOL COORDINATION",
      title: partnershipTitle,
      description: partnershipDescription,
      eta: schedules[2],
      status: partnershipStatus,
    },
    {
      phase: "PHASE 05 / TOKEN PURPOSE",
      title: "A TICKER NEEDS MORE THAN A CHART",
      description: tokenDescription,
      eta: schedules[3],
      status: tokenStatus,
    },
    {
      phase: "PHASE 06 / COMMUNITY OPERATIONS",
      title: "FROM CT REPLIES TO RESPONSIBLE OPERATORS",
      description: communityDescription,
      eta: schedules[(timeline + 1) % schedules.length],
      status: communityStatus,
    },
    {
      phase: "PHASE 07 / THE DESTINATION",
      title: finalGoal,
      description: finalDescription,
      eta: schedules[3],
      status: finalStatus,
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
