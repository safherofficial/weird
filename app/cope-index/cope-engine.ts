import type { DepartmentCrossRead } from "../lib/department-cross-read";
import type { DailyEditorialCaseContext } from "../daily-office/daily-engine";

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
  caseTheme: string;
  caseHeadline: string;
  caseBulletin: string;
  caseReference: string;
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
  crossRead: DepartmentCrossRead;
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
    prompt: "THE TOKEN GRADUATED, THEN THE CHART WENT RED. WHAT IS YOUR RESPONSE?",
    note: "The Department is not asking about a real holding or wallet. This is a fictional post-graduation scenario.",
    options: [
      { label: "I close the chart and remember that I have a life outside the trenches.", cope: 0, patience: 5, chat: 0, tag: "emotionally-liquid" },
      { label: "I zoom out until the launch candle becomes a tiny archaeological artefact.", cope: 2, patience: 4, chat: 0, tag: "candlelight-watcher" },
      { label: "I re-read the thread and add a paragraph titled 'post-graduation temporary weakness'.", cope: 4, patience: 2, chat: 1, tag: "thesis-archivist" },
      { label: "I ask Telegram whether the first post-graduation sell-off is “healthy rotation”.", cope: 5, patience: 1, chat: 5, tag: "telegram-dependent" },
    ],
  },
  {
    prompt: "THE DEPLOYER STOPS POSTING. WHAT DOES THE CTO ANNOUNCEMENT MEAN?",
    note: "The Department recognises that “community takeover” can mean several different things.",
    options: [
      { label: "A named team, working access and a verifiable handover—not just a new X bio.", cope: 0, patience: 5, chat: 0, tag: "thesis-archivist" },
      { label: "A cautious update with clear limits while access and ownership are checked.", cope: 1, patience: 4, chat: 1, tag: "thesis-archivist" },
      { label: "A fresh pinned post, a new banner and the same unanswered questions.", cope: 4, patience: 2, chat: 2, tag: "soon-believer" },
      { label: "CTO means CTO. The new account has posted three rocket emojis.", cope: 5, patience: 1, chat: 5, tag: "telegram-dependent" },
    ],
  },
  {
    prompt: "A CLUSTER OF EARLY WALLETS MOVES. CT STARTS POSTING EYES.",
    note: "No real wallet, transaction or address is involved in this fictional exercise.",
    options: [
      { label: "I wait for wallet context and independent evidence before forming a view.", cope: 1, patience: 5, chat: 0, tag: "thesis-archivist" },
      { label: "I refresh the token page and pretend the wallet labels are research.", cope: 3, patience: 2, chat: 1, tag: "candlelight-watcher" },
      { label: "I refresh CT until someone types “probably just rotation”.", cope: 5, patience: 1, chat: 5, tag: "telegram-dependent" },
      { label: "I have become emotionally unavailable to any wallet labelled “smart money”.", cope: 0, patience: 4, chat: 0, tag: "emotionally-liquid" },
    ],
  },
  {
    prompt: "THE POST-GRADUATION POOL LOOKS LIKE A SMALL PUDDLE.",
    note: "The Department recommends not testing fictional pool depth with a bucket.",
    options: [
      { label: "I check the pool conditions and do not confuse a graduation badge with exit depth.", cope: 1, patience: 5, chat: 0, tag: "liquidity-haunted" },
      { label: "I stare at the pool and whisper “slippage”.", cope: 4, patience: 2, chat: 1, tag: "candlelight-watcher" },
      { label: "I ask whether the pool depth can survive more than the pinned community announcement.", cope: 5, patience: 1, chat: 4, tag: "liquidity-haunted" },
      { label: "I leave. The puddle has issued a very clear statement.", cope: 0, patience: 5, chat: 0, tag: "emotionally-liquid" },
    ],
  },
  {
    prompt: "YOUR FRIEND ASKS WHY YOU ARE STILL HOLDING THE CTO TOKEN.",
    note: "Please do not answer with a price prediction or another screenshot of the launch candle.",
    options: [
      { label: "I explain what changed after the handover and which facts remain unverified.", cope: 1, patience: 5, chat: 0, tag: "thesis-archivist" },
      { label: "I send a screenshot with the launch candle barely visible in the top-left corner.", cope: 3, patience: 3, chat: 1, tag: "candlelight-watcher" },
      { label: "I say “the real community starts now” and open the next CTO announcement.", cope: 5, patience: 1, chat: 3, tag: "soon-believer" },
      { label: "I tell them I have retired from explaining why the deployer is no longer posting.", cope: 0, patience: 4, chat: 0, tag: "emotionally-liquid" },
    ],
  },
];

export const profiles: Record<CopeArchetypeId, CopeProfile> = {
  "thesis-archivist": {
    title: "THE THESIS ARCHIVIST",
    subtitle: "You keep the original thesis, source links and unanswered questions in a file that gets updated when the evidence changes.",
    roast: "Your case file has version history, footnotes and a changelog titled 'what the new evidence changed'.",
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

/**
 * The Cope Index bulletin belongs to the same editorial case as the daily
 * Trenches Desk. Keep each variant inside its named theme so the dashboard
 * cannot announce a CTO handover during a wallet-cluster case, or liquidity
 * anxiety during a source-verification case.
 */
const caseBulletinPools: Record<string, string[]> = {
  "CA / LAUNCH CONTEXT": [
    "THE CA HAS ARRIVED. THE ORIGINAL SOURCE IS STILL BEING ASKED TO IDENTIFY ITSELF.",
    "TOKEN PURPOSE HAS BEEN REFERRED TO A COMMITTEE. THE TICKER HAS ALREADY LEFT THE ROOM.",
  ],
  "BONDING-CURVE GRADUATION": [
    "THE CURVE HAS GRADUATED. POOL DEPTH HAS REQUESTED A SEPARATE MEETING.",
    "CONFETTI DEPLOYED SUCCESSFULLY. DURABLE DEMAND WAS NOT INCLUDED IN THE RELEASE NOTES.",
  ],
  "DEPLOYER / CTO HANDOVER": [
    "THE DEPLOYER HAS GONE QUIET. THE NEW BANNER HAS ACCEPTED THE INTERIM ROLE.",
    "THE CTO HAS INHERITED THE TIMELINE. KEY CUSTODY REMAINS A DIFFERENT DEPARTMENT.",
  ],
  "KOL ECHO / COPIED CALLS": [
    "FOUR ACCOUNTS HAVE CONFIRMED ONE CLAIM. THE SOURCE COUNT REMAINS ONE.",
    "THE SAME CA HAS BEEN DISCOVERED INDEPENDENTLY BY EVERY ACCOUNT USING THE SAME SCREENSHOT.",
  ],
  "GREEN-CANDLE CONVICTION": [
    "THE GREEN CANDLE HAS BEEN PROMOTED TO A FIVE-YEAR THESIS WITHOUT A TIMEFRAME.",
    "THE CHART HAS CLOSED. THE COMMUNITY IS STILL NEGOTIATING WHAT THE CANDLE MEANT.",
  ],
  "BUNDLE / WALLET THEORIES": [
    "THE WALLET GRAPH HAS GAINED THREE ARROWS AND LOST ITS OWNERSHIP CAVEAT.",
    "A CLUSTER HAS BEEN PROMOTED TO A FAMILY TREE. COMMON OWNERSHIP REMAINS UNCONFIRMED.",
  ],
  "POST-GRADUATION LIQUIDITY": [
    "THE POOL HAS BEEN DESCRIBED AS DEEP. THE ASSUMED TRADE SIZE HAS NOT BEEN DISCLOSED.",
    "SLIPPAGE HAS ASKED THE DEPARTMENT TO STOP USING MARKET CAP AS A DEPTH MEASUREMENT.",
  ],
  "COMMUNITY TAKEOVER": [
    "THE COMMUNITY HAS ELECTED NEW ADMINS. THE ACCESS CHECKLIST IS STILL SEEKING AN OWNER.",
    "THE TAKEOVER HAS COMPLETED ITS ANNOUNCEMENT PHASE. OPERATIONAL CONTROL IS A FUTURE MILESTONE.",
  ],
  "DELETED KOL CALL": [
    "THE KOL CALL HAS BEEN DELETED. ITS SCREENSHOTS HAVE REQUESTED PERMANENT ARCHIVE STATUS.",
    "THE ORIGINAL POST IS GONE. THE REPLIES HAVE PRESERVED THE CLAIM WITHOUT ITS CONTEXT.",
  ],
  "100X ENTRY TIMING": [
    "THE NEXT 100X HAS BEEN FOUND AFTER THE CANDLE. THE ENTRY IS OFFICIALLY CALLED EARLY.",
    "THE PREVIOUS POST-MORTEM REMAINS OPEN. A NEW PRICE TARGET HAS ARRIVED TO HELP.",
  ],
  "CA SOURCE VERIFICATION": [
    "THREE ACCOUNTS CLAIM FIRST DISCOVERY. ALL THREE CITE THE SAME MISSING ORIGINAL POST.",
    "THE CA IS VISIBLE IN EVERY SCREENSHOT. THE SOURCE TRAIL IS NOT.",
  ],
  "CTO ACCESS CHECKLIST": [
    "THE CTO SPACE IS LIVE. REPOSITORY, DOMAIN AND TREASURY ACCESS ARE STILL AGENDA ITEMS.",
    "THE BANNER SAYS COMMUNITY-LED. THE SIGNING AUTHORITY FIELD STILL SAYS UNKNOWN.",
  ],
  "WALLET-GRAPH INTERPRETATION": [
    "THE ARROWS HAVE BEEN VERIFIED AS ARROWS. WALLET OWNERSHIP REMAINS A SEPARATE QUESTION.",
    "THE DIAGRAM SHOWS MOVEMENT. THE CAPTION HAS ADDED A MOTIVE THAT THE RECORD DOES NOT.",
  ],
  "EXIT-PLAN ABSENCE": [
    "THE ENTRY THESIS HAS SIX APPENDICES. THE INVALIDATION CONDITION IS STILL MISSING.",
    "THE PRICE TARGET IS FILED. THE EXIT DECISION HAS REQUESTED AN ACTUAL RULE.",
  ],
  "GREEN-CANDLE EVIDENCE": [
    "THE CHART CROP HAS BEEN ADMITTED. THE TIMEFRAME AND SURROUNDING CANDLES ARE STILL OUTSIDE THE FILE.",
    "THE WICK HAS BEEN DESCRIBED AS A CLOSE. THE ORIGINAL CHART HAS DECLINED TO CONFIRM.",
  ],
  "SNIPER THEORY": [
    "EARLY BUYS HAVE BEEN ARRANGED INTO A COORDINATION THEORY. COMMON OWNERSHIP REMAINS UNKNOWN.",
    "THE WALLET CLUSTER HAS A NAME, A COLOUR CODE AND NO VERIFIED OWNER.",
  ],
  "MIGRATION CLAIM": [
    "THE NEW CA HAS BEEN PINNED. THE DOCUMENTARY LINK TO THE OLD TOKEN IS STILL IN TRANSIT.",
    "THE MIGRATION SCREENSHOT HAS ARRIVED BEFORE THE SOURCE RECORD THAT SHOULD CONNECT THE TWO REFERENCES.",
  ],
  "BAGHOLDER ENTRY HISTORY": [
    "THE ENTRY PRICE HAS BEEN DECLARED HISTORIC. THE INVALIDATION CONDITION IS STILL BEING LOCATED.",
    "THE SUBJECT HAS SUBMITTED A LONG-TERM THESIS. THE ORIGINAL ENTRY TIMESTAMP HAS BEEN ATTACHED AS AN APPENDIX.",
  ],
};

const methodology =
  "This is a deterministic fictional dashboard generated from the UTC date. Its shared case theme, headline, bulletin and reference come from the same Trenches Desk dispatch for this UTC date. The dashboard bulletin is selected only from variants written for that case theme. The five index dimensions remain synthetic and are not sampled from visitors, traders, exchanges, tokens, wallets, markets or any external source. They are not sentiment data, investment signals or market indicators.";

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

export function buildDailyCopeIndex(issueDate: string, editorialCase: DailyEditorialCaseContext): DailyCopeIndex {
  const parsedDate = new Date(issueDate + "T00:00:00Z");
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(issueDate) ||
    !Number.isFinite(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== issueDate
  ) {
    throw new Error("A valid UTC issue date is required.");
  }
  if (editorialCase.issueDate !== issueDate) {
    throw new Error("The Global Cope Index and Trenches Desk must use the same UTC issue date.");
  }
  const seed = hashText("DYOR-DEPARTMENT/" + issueDate);
  const dimensions: CopeDimension[] = [
    {
      id: "conviction-pressure",
      label: "POST-LAUNCH CONVICTION PRESSURE",
      shortLabel: "CONVICTION",
      description: "Synthetic measurement of how firmly the fictional timeline defends its launch thesis after the curve graduates and the chart turns red.",
      value: makeValue(seed, 11),
    },
    {
      id: "narrative-fog",
      label: "CT NARRATIVE FOG",
      shortLabel: "NARRATIVE",
      description: "Synthetic reading of how much copied KOL language, vague catalyst talk and 'still early' phrasing has replaced a verifiable source.",
      value: makeValue(seed, 23),
    },
    {
      id: "telegram-reliance",
      label: "CT / TELEGRAM RELIANCE",
      shortLabel: "CT / CHAT",
      description: "Synthetic reliance on CT replies, KOL quote-tweets and Telegram admins for reassurance after a fictional launch event.",
      value: makeValue(seed, 37),
    },
    {
      id: "liquidity-anxiety",
      label: "POST-GRADUATION LIQUIDITY ANXIETY",
      shortLabel: "LIQUIDITY",
      description: "Synthetic response to the fictional post-graduation pool, thin depth and the sudden discovery that a graduation badge is not an exit plan.",
      value: makeValue(seed, 49),
    },
    {
      id: "soon-intensity",
      label: "CTO / SOON™ INTENSITY",
      shortLabel: "SOON™",
      description: "Synthetic pressure created by a vanished deployer, a fresh CTO banner and a promised update with no owner or date.",
      value: makeValue(seed, 61),
    },
  ];
  const overall = Math.round(
    dimensions.reduce((sum, dimension) => sum + dimension.value, 0) / dimensions.length
  );
  const status = overall >= 75 ? "SEVERE / PAPERWORK ADVISED" :
    overall >= 55 ? "ELEVATED / CHAT ECHO PERSISTENT" :
    overall >= 35 ? "MODERATE / THESIS STILL OPEN" :
    "CALM / SUSPICIOUSLY WELL-ADJUSTED";
  const bulletinOptions = caseBulletinPools[editorialCase.caseTheme];
  if (!bulletinOptions || bulletinOptions.length === 0) {
    throw new Error("The Global Cope Index has no bulletin variants for the current editorial case theme.");
  }
  const bulletin = bulletinOptions[makeValue(seed, 73, 0, bulletinOptions.length - 1)];

  return {
    issueDate,
    caseTheme: editorialCase.caseTheme,
    caseHeadline: editorialCase.headline,
    caseBulletin: editorialCase.bulletin,
    caseReference: editorialCase.reference,
    overall,
    status,
    bulletin,
    dimensions,
    methodology,
  };
}

export function isValidCopeAnswers(value: unknown): value is number[] {
  return Array.isArray(value) &&
    value.length === COPE_QUESTIONS &&
    Array.from(value).every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4);
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
      ? "CT / GROUP CHAT RELIANCE HAS BEEN CLASSIFIED AS OPERATIONAL."
      : patienceScore >= 75
        ? "UNEXPECTED CALM DETECTED. INVESTIGATION CONTINUES."
        : "PERSONAL READING FILED / THE THESIS REMAINS OPEN.";
  const strongestPatience = selected.reduce((best, option, index) =>
    option.patience > selected[best].patience ? index : best, 0);
  const highestPressure = selected.reduce((best, option, index) =>
    option.cope + option.chat > selected[best].cope + selected[best].chat ? index : best, 0);
  const patienceItem = selected[strongestPatience];
  const pressureItem = selected[highestPressure];
  const crossRead: DepartmentCrossRead = {
    headline: copeScore >= 60 && chatDependency >= 60
      ? "REASSURANCE IS COMING FROM THE GROUP CHAT"
      : copeScore >= 65
        ? "THE EXPLANATION KEEPS MOVING"
        : patienceScore >= 65
          ? "THE CALM ANSWER SURVIVED"
          : "THE PERSONAL READING IS SPLIT",
    interpretation:
      "Your selected answers average " + copeScore + "/100 cope, " + patienceScore + "/100 patience and " +
      chatDependency + "/100 chat dependency. The reading below pairs your highest patience-scored answer with the answer carrying the strongest combined cope and chat score. This is a fictional self-report exercise, not a mental-health or real-world behaviour assessment.",
    signals: [
      {
        label: "STRONGEST PATIENCE SIGNAL",
        context: questions[strongestPatience].prompt,
        answer: patienceItem.label,
        detail: "Patience " + patienceItem.patience + "/5 · Cope " + patienceItem.cope + "/5 · Chat " + patienceItem.chat + "/5.",
      },
      {
        label: "HIGHEST COPE / CHAT-PRESSURE SIGNAL",
        context: questions[highestPressure].prompt,
        answer: pressureItem.label,
        detail: "Cope " + pressureItem.cope + "/5 · Chat " + pressureItem.chat + "/5 · Patience " + pressureItem.patience + "/5.",
      },
    ],
  };

  return {
    crossRead,
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
