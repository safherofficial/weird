export const COPE_VERSION = 1;
export const COPE_QUESTIONS = 5;

export type CopeDimensionId =
  | "conviction-pressure"
  | "narrative-fog"
  | "telegram-reliance"
  | "liquidity-anxiety"
  | "soon-intensity";

export type CopeDimension = {
  id: CopeDimensionId;
  label: string;
  shortLabel: string;
  description: string;
  value: number;
};

export type DailyCopeIndex = {
  issueDate: string;
  overall: number;
  status: string;
  bulletin: string;
  dimensions: CopeDimension[];
  methodology: string;
};

export type CopeArchetypeId =
  | "thesis-archivist"
  | "candlelight-watcher"
  | "telegram-dependent"
  | "soon-believer"
  | "liquidity-haunted"
  | "emotionally-liquid";

export type CopeOption = {
  label: string;
  cope: number;
  patience: number;
  chat: number;
  tag: CopeArchetypeId;
};

export type CopeQuestion = {
  prompt: string;
  note: string;
  options: CopeOption[];
};

export type CopeProfile = {
  title: string;
  subtitle: string;
  roast: string;
  diagnosis: string;
};

export type PersonalCopeResult = {
  answers: number[];
  caseNumber: string;
  copeScore: number;
  patienceScore: number;
  chatDependency: number;
  primaryTag: CopeArchetypeId;
  secondaryTag: CopeArchetypeId;
  profile: CopeProfile;
  secondaryProfile: CopeProfile;
  finding: string;
};

export const questions: CopeQuestion[] = [
  {
    prompt: "THE CHART HAS BEEN RED FOR THREE DAYS. WHAT IS YOUR RESPONSE?",
    note: "The Department is not asking about a real holding. Please answer for the fictional situation.",
    options: [
      { label: "I close the chart and go back to my actual life.", cope: 0, patience: 5, chat: 0, tag: "emotionally-liquid" },
      { label: "I zoom out until the problem becomes a geological era.", cope: 2, patience: 4, chat: 0, tag: "candlelight-watcher" },
      { label: "I re-read the thesis and add a paragraph titled 'temporary'.", cope: 4, patience: 2, chat: 1, tag: "thesis-archivist" },
      { label: "I ask Telegram whether the dip is healthy.", cope: 5, patience: 1, chat: 5, tag: "telegram-dependent" },
    ],
  },
  {
    prompt: "THE FOUNDER POSTS 'BIG THINGS SOON'. WHAT DOES 'SOON' MEAN?",
    note: "Calendar terminology is recommended. It is not mandatory.",
    options: [
      { label: "A date, a deliverable and an accountable owner.", cope: 0, patience: 5, chat: 0, tag: "emotionally-liquid" },
      { label: "A rough estimate that may change when new facts arrive.", cope: 1, patience: 4, chat: 1, tag: "thesis-archivist" },
      { label: "A flexible time zone that exists beyond conventional calendars.", cope: 4, patience: 2, chat: 2, tag: "soon-believer" },
      { label: "Soon means soon. Admin has used the word twice.", cope: 5, patience: 1, chat: 5, tag: "telegram-dependent" },
    ],
  },
  {
    prompt: "A LARGE WALLET MOVES. THE CHAT STARTS POSTING EYES.",
    note: "No actual wallet or address is involved in this exercise.",
    options: [
      { label: "I wait for verifiable context before forming a view.", cope: 1, patience: 5, chat: 0, tag: "thesis-archivist" },
      { label: "I watch the candles and pretend this is research.", cope: 3, patience: 2, chat: 1, tag: "candlelight-watcher" },
      { label: "I refresh the chat until someone types 'all good'.", cope: 5, patience: 1, chat: 5, tag: "telegram-dependent" },
      { label: "I have become emotionally unavailable to wallet movements.", cope: 0, patience: 4, chat: 0, tag: "emotionally-liquid" },
    ],
  },
  {
    prompt: "THE LIQUIDITY POOL LOOKS LIKE A SMALL PUDDLE.",
    note: "The Department recommends not testing it with a bucket.",
    options: [
      { label: "I read the actual conditions and leave the simulation alone.", cope: 1, patience: 5, chat: 0, tag: "liquidity-haunted" },
      { label: "I stare at the depth chart and whisper 'spread'.", cope: 4, patience: 2, chat: 1, tag: "candlelight-watcher" },
      { label: "I ask whether the liquidity is locked, bonded or emotionally supported.", cope: 5, patience: 1, chat: 4, tag: "liquidity-haunted" },
      { label: "I leave. The puddle has made its position clear.", cope: 0, patience: 5, chat: 0, tag: "emotionally-liquid" },
    ],
  },
  {
    prompt: "YOUR FRIEND ASKS HOW THE THESIS IS GOING.",
    note: "Please do not answer with a price prediction.",
    options: [
      { label: "I explain what changed, what did not and what I still do not know.", cope: 1, patience: 5, chat: 0, tag: "thesis-archivist" },
      { label: "I send a screenshot zoomed out to the maximum possible distance.", cope: 3, patience: 3, chat: 1, tag: "candlelight-watcher" },
      { label: "I say 'still early' and open the next announcement.", cope: 5, patience: 1, chat: 3, tag: "soon-believer" },
      { label: "I tell them I have retired from explaining the chart.", cope: 0, patience: 4, chat: 0, tag: "emotionally-liquid" },
    ],
  },
];

export const profiles: Record<CopeArchetypeId, CopeProfile> = {
  "thesis-archivist": {
    title: "THE THESIS ARCHIVIST",
    subtitle: "You preserve every original assumption, even the ones the market has formally declined.",
    roast: "Your thesis has version history, footnotes and a small section called 'temporary market misunderstanding'.",
    diagnosis: "REFERRED TO THE OFFICE OF DOCUMENTED CONVICTION.",
  },
  "candlelight-watcher": {
    title: "THE CANDLELIGHT WATCHER",
    subtitle: "You have developed a close personal relationship with every five-minute candle.",
    roast: "You call it technical analysis. Your browser history calls it a cry for horizontal movement.",
    diagnosis: "PLACED UNDER CHART-RELATED OBSERVATION.",
  },
  "telegram-dependent": {
    title: "THE TELEGRAM-DEPENDENT",
    subtitle: "Your emotional state is synchronized with the green online dot of an anonymous moderator.",
    roast: "You have notifications for the admin, the assistant admin and a bot that only posts rocket emojis.",
    diagnosis: "REFERRED TO COMMUNITY-BASED REASSURANCE.",
  },
  "soon-believer": {
    title: "THE SOON BELIEVER",
    subtitle: "You operate in a flexible temporal framework where every milestone is almost here.",
    roast: "Your calendar has stopped asking for dates. It now accepts vibes.",
    diagnosis: "REFERRED TO THE OFFICE OF TEMPORAL AMBIGUITY.",
  },
  "liquidity-haunted": {
    title: "THE LIQUIDITY-HAUNTED",
    subtitle: "You can hear the spread widening even when the application is closed.",
    roast: "You see a pool and immediately ask for its depth, history, permissions and emergency contact.",
    diagnosis: "PLACED UNDER SLIPPAGE-RELATED OBSERVATION.",
  },
  "emotionally-liquid": {
    title: "THE EMOTIONALLY LIQUID",
    subtitle: "You have discovered that closing a tab is a valid portfolio-management interface.",
    roast: "The Department has detected a healthy boundary. Please do not tell the group chat.",
    diagnosis: "RELEASED WITH A RARE NOTE OF APPROVAL.",
  },
};

const bulletinTemplates = [
  "THE DEPARTMENT REPORTS ELEVATED LEVELS OF 'STILL EARLY'.",
  "OFFICIALS HAVE DETECTED A NEW WAVE OF STRATEGIC PATIENCE.",
  "THE WORD 'SOON' HAS BEEN TEMPORARILY PROMOTED TO A UNIT OF TIME.",
  "LIQUIDITY ANXIETY HAS REQUESTED ITS OWN OFFICE.",
  "THE GROUP CHAT HAS ISSUED A STATEMENT ON THE STATEMENT.",
  "CONVICTION REMAINS STABLE. THE CHART HAS DECLINED TO COMMENT.",
  "A FRESH BATCH OF HOPIUM HAS BEEN DELIVERED TO THE BASEMENT.",
];

const methodology =
  "This is a deterministic fictional dashboard generated from the UTC date. Its values are synthetic, not sampled from visitors, traders, exchanges, tokens, wallets, markets or any external source. They are not sentiment data, investment signals or market indicators.";

function hashText(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function makeValue(seed: number, salt: number, min = 18, max = 94) {
  const mixed = Math.imul(seed ^ (salt * 0x45d9f3b), 0x27d4eb2d) >>> 0;
  return min + (mixed % (max - min + 1));
}

export function buildDailyCopeIndex(issueDate: string): DailyCopeIndex {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(issueDate) || !Number.isFinite(Date.parse(issueDate + "T00:00:00Z"))) {
    throw new Error("A valid UTC issue date is required.");
  }
  const seed = hashText("DYOR-DEPARTMENT/" + issueDate);
  const dimensions: CopeDimension[] = [
    {
      id: "conviction-pressure",
      label: "CONVICTION PRESSURE",
      shortLabel: "CONVICTION",
      description: "Synthetic measurement of how firmly the fictional office is holding its thesis.",
      value: makeValue(seed, 11),
    },
    {
      id: "narrative-fog",
      label: "NARRATIVE FOG",
      shortLabel: "NARRATIVE",
      description: "Synthetic reading of how much 'ecosystem synergy' has entered the room.",
      value: makeValue(seed, 23),
    },
    {
      id: "telegram-reliance",
      label: "TELEGRAM RELIANCE",
      shortLabel: "TELEGRAM",
      description: "Synthetic dependence on announcements, green dots and messages ending in 'soon'.",
      value: makeValue(seed, 37),
    },
    {
      id: "liquidity-anxiety",
      label: "LIQUIDITY ANXIETY",
      shortLabel: "LIQUIDITY",
      description: "Synthetic response to the imaginary depth of the Department's puddle.",
      value: makeValue(seed, 49),
    },
    {
      id: "soon-intensity",
      label: "SOON™ INTENSITY",
      shortLabel: "SOON™",
      description: "Synthetic pressure exerted by deadlines that have not selected a date.",
      value: makeValue(seed, 61),
    },
  ];
  const overall = Math.round(
    dimensions.reduce((sum, dimension) => sum + dimension.value, 0) / dimensions.length
  );
  const status = overall >= 75 ? "SEVERE / PAPERWORK ADVISED" :
    overall >= 55 ? "ELEVATED / MONITOR THE CHAT" :
    overall >= 35 ? "MODERATE / THESIS STILL OPEN" :
    "CALM / SUSPICIOUSLY WELL-ADJUSTED";
  const bulletin = bulletinTemplates[seed % bulletinTemplates.length];

  return { issueDate, overall, status, bulletin, dimensions, methodology };
}

export function isValidCopeAnswers(value: unknown): value is number[] {
  return Array.isArray(value) &&
    value.length === COPE_QUESTIONS &&
    value.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4);
}

export function encodeCopeCode(answers: number[]): string {
  if (!isValidCopeAnswers(answers)) throw new Error("A complete personal cope calibration is required.");
  return "g" + COPE_VERSION + "-" + answers.join("");
}

export function decodeCopeCode(value: unknown): number[] | null {
  if (typeof value !== "string") return null;
  const match = value.match(new RegExp("^g" + COPE_VERSION + "-([0-3]{" + COPE_QUESTIONS + "})$"));
  if (!match) return null;
  const answers = [...match[1]].map(Number);
  return isValidCopeAnswers(answers) ? answers : null;
}

export function buildPersonalCopeResult(answers: number[]): PersonalCopeResult {
  if (!isValidCopeAnswers(answers)) throw new Error("A complete personal cope calibration is required.");
  const selected = answers.map((answer, index) => questions[index].options[answer]);
  const copeScore = Math.round(selected.reduce((sum, option) => sum + option.cope, 0) / (COPE_QUESTIONS * 5) * 100);
  const patienceScore = Math.round(selected.reduce((sum, option) => sum + option.patience, 0) / (COPE_QUESTIONS * 5) * 100);
  const chatDependency = Math.round(selected.reduce((sum, option) => sum + option.chat, 0) / (COPE_QUESTIONS * 5) * 100);
  const tally = new Map<CopeArchetypeId, { count: number; cope: number; first: number }>();
  selected.forEach((option, index) => {
    const current = tally.get(option.tag);
    if (current) {
      current.count += 1;
      current.cope += option.cope;
    } else {
      tally.set(option.tag, { count: 1, cope: option.cope, first: index });
    }
  });
  const ranking = [...tally.entries()].sort((a, b) =>
    b[1].count - a[1].count || b[1].cope - a[1].cope || a[1].first - b[1].first
  );
  const primaryTag = ranking[0]?.[0] ?? "thesis-archivist";
  const secondaryTag = ranking[1]?.[0] ?? ranking[0]?.[0] ?? "thesis-archivist";
  const seed = answers.reduce((sum, answer, index) => ((sum * 47) + (answer + 1) * (index + 41)) % 900000, 120120);
  const caseNumber = String(seed + 100000).slice(-6);
  const finding = copeScore >= 75
    ? "COPE LEVELS EXCEED THE DEPARTMENTAL REFERENCE RANGE."
    : chatDependency >= 70
      ? "GROUP CHAT RELIANCE HAS BEEN CLASSIFIED AS OPERATIONAL."
      : patienceScore >= 75
        ? "UNEXPECTED CALM DETECTED. INVESTIGATION CONTINUES."
        : "PERSONAL READING FILED / THE THESIS REMAINS OPEN.";

  return {
    answers: [...answers],
    caseNumber,
    copeScore,
    patienceScore,
    chatDependency,
    primaryTag,
    secondaryTag,
    profile: profiles[primaryTag],
    secondaryProfile: profiles[secondaryTag],
    finding,
  };
}
