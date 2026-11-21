import type { DepartmentCrossRead } from "../lib/department-cross-read";

export const CLUB_VERSION = 1;
export const CLUB_QUESTIONS = 5;

export type ClubArchetypeId =
  | "conviction-custodian"
  | "average-down-citizen"
  | "telegram-veteran"
  | "exit-liquidity-witness"
  | "chart-hermit"
  | "paper-hands-survivor";

export type ClubOption = {
  label: string;
  conviction: number;
  cope: number;
  chatDependency: number;
  tag: ClubArchetypeId;
};

export type ClubQuestion = {
  prompt: string;
  note: string;
  options: ClubOption[];
};

export type ClubProfile = {
  title: string;
  subtitle: string;
  motto: string;
  roast: string;
  membership: string;
};

export const CLUB_FACTION_IDS = [
  "thesis-preservation-society",
  "averaging-down-commission",
  "signal-reliance-union",
  "exit-liquidity-witnesses",
  "chart-exile-order",
  "early-exit-mutual-aid",
] as const;
export type ClubFactionId = typeof CLUB_FACTION_IDS[number];

export type ClubFaction = {
  id: ClubFactionId;
  code: string;
  title: string;
  designation: string;
  motto: string;
  creed: string;
  ritual: string;
  archetype: ClubArchetypeId;
  seal: string;
};

export const factions: Record<ClubArchetypeId, ClubFaction> = {
  "conviction-custodian": {
    id: "thesis-preservation-society",
    code: "TPS",
    title: "THE THESIS PRESERVATION SOCIETY",
    designation: "OFFICE OF PERMANENT CONVICTION",
    motto: "THE THESIS IS INTACT. THE PRICE IS TEMPORARY.",
    creed: "A red chart cannot invalidate a document that has already been pinned.",
    ritual: "Re-read the original thesis. Add one more footnote. Never amend the conclusion.",
    archetype: "conviction-custodian",
    seal: "T",
  },
  "average-down-citizen": {
    id: "averaging-down-commission",
    code: "ADC",
    title: "THE AVERAGING-DOWN COMMISSION",
    designation: "BUREAU OF ADDITIONAL BAG ACQUISITION",
    motto: "EVERY LOWER PRICE IS A NEW DEPARTMENTAL OPPORTUNITY.",
    creed: "The entry did not get worse. The position merely became more comprehensive.",
    ritual: "Rename the average entry price and issue a fresh conviction statement.",
    archetype: "average-down-citizen",
    seal: "↓",
  },
  "telegram-veteran": {
    id: "signal-reliance-union",
    code: "SRU",
    title: "THE SIGNAL RELIANCE UNION",
    designation: "COMMUNITY INTELLIGENCE & NOTIFICATION OFFICE",
    motto: "THE PINNED MESSAGE IS OUR PRIMARY SOURCE.",
    creed: "No thesis is complete until three admins and one KOL have repeated it.",
    ritual: "Refresh the group chat. Interpret silence as strategic communications.",
    archetype: "telegram-veteran",
    seal: "↗",
  },
  "exit-liquidity-witness": {
    id: "exit-liquidity-witnesses",
    code: "ELW",
    title: "THE EXIT LIQUIDITY WITNESSES",
    designation: "POST-GRADUATION TESTIMONY REGISTER",
    motto: "WE SAW THE POOL. WE WERE THE POOL.",
    creed: "The first wallet out is a case study. The last wallet out is a committee.",
    ritual: "Prepare a timeline of the exit. Include the unanswered DM as Exhibit A.",
    archetype: "exit-liquidity-witness",
    seal: "↘",
  },
  "chart-hermit": {
    id: "chart-exile-order",
    code: "CEO",
    title: "THE CHART EXILE ORDER",
    designation: "REMOTE OBSERVATION & SELECTIVE VISIBILITY UNIT",
    motto: "ZOOM OUT UNTIL THE CANDLE BECOMES AN ARCHAEOLOGICAL SITE.",
    creed: "A chart not opened cannot hurt the member's conviction in real time.",
    ritual: "Close the five-minute chart. Check it again only when someone says volume.",
    archetype: "chart-hermit",
    seal: "⌁",
  },
  "paper-hands-survivor": {
    id: "early-exit-mutual-aid",
    code: "EEMA",
    title: "THE EARLY EXIT MUTUAL AID SOCIETY",
    designation: "PROVISIONAL EXIT PROCEDURE COLLECTIVE",
    motto: "WE LEFT THE TRENCHES. THE GROUP CHAT HAS NOT FORGIVEN US.",
    creed: "Preserving capital is suspicious behaviour in a room full of conviction.",
    ritual: "Decline one revenge-entry notification and file the refusal in triplicate.",
    archetype: "paper-hands-survivor",
    seal: "E",
  },
};

export function getClubFaction(archetype: ClubArchetypeId): ClubFaction {
  return factions[archetype];
}

export type ClubProgress = {
  completedQuestions: number;
  conviction: number;
  cope: number;
  chatDependency: number;
};

export type ClubResult = ClubProgress & {
  crossRead: DepartmentCrossRead;
  answers: number[];
  memberNumber: string;
  primaryTag: ClubArchetypeId;
  secondaryTag: ClubArchetypeId;
  profile: ClubProfile;
  secondaryProfile: ClubProfile;
  faction: ClubFaction;
  secondaryFaction: ClubFaction;
  membershipClass: string;
  finding: string;
};

export const questions: ClubQuestion[] = [
  {
    prompt: "WHAT IS YOUR RELATIONSHIP WITH THE BAG AFTER GRADUATION?",
    note: "Choose the fictional behavior that best fits the joke. Do not enter real wallet or holding information.",
    options: [
      { label: "The curve graduated. I have decided the bag is now a long-term character arc.", conviction: 5, cope: 4, chatDependency: 1, tag: "conviction-custodian" },
      { label: "Every dip became another bag. My wallet now has a family tree.", conviction: 5, cope: 5, chatDependency: 2, tag: "average-down-citizen" },
      { label: "I am waiting for the CTO account to post the next pinned update.", conviction: 3, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "I watched the early wallets leave the pool. I am still writing the witness statement.", conviction: 1, cope: 2, chatDependency: 1, tag: "exit-liquidity-witness" },
    ],
  },
  {
    prompt: "WHERE DID YOUR ORIGINAL CONVICTION COME FROM ON CT?",
    note: "The Department accepts no cropped chart, paid call or reposted screenshot as independent evidence.",
    options: [
      { label: "A launch transaction, wallet trail and thesis I checked before the ticker trended.", conviction: 4, cope: 2, chatDependency: 1, tag: "conviction-custodian" },
      { label: "A “CA?” reply from an account with a suspiciously large following.", conviction: 3, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "A green candle and a KOL quote-tweet. Since then, every dip has looked like another chance to add.", conviction: 5, cope: 5, chatDependency: 2, tag: "average-down-citizen" },
      { label: "I saw the risk, made a decision and closed the chart before the next candle.", conviction: 2, cope: 1, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
  {
    prompt: "HOW OFTEN DO YOU CHECK THE FIVE-MINUTE CHART?",
    note: "There are no correct answers. There are only browser-history consequences and unread notifications.",
    options: [
      { label: "Once a week. My notifications are off and my life has other tabs.", conviction: 2, cope: 1, chatDependency: 0, tag: "chart-hermit" },
      { label: "Whenever CT says “volume is waking up”.", conviction: 4, cope: 3, chatDependency: 3, tag: "telegram-veteran" },
      { label: "Every candle. The bonding curve and I share custody of my attention.", conviction: 5, cope: 5, chatDependency: 1, tag: "conviction-custodian" },
      { label: "I closed the chart. A “CA just sent” notification tried to reopen it; I ignored it.", conviction: 1, cope: 2, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
  {
    prompt: "WHAT IS YOUR OFFICIAL COPING MECHANISM WHEN THE DEV DISAPPEARS?",
    note: "The Department is not qualified to recommend coping mechanisms. These are jokes, not advice.",
    options: [
      { label: "Zoom out until the post-graduation chart becomes an archaeological record.", conviction: 4, cope: 4, chatDependency: 0, tag: "chart-hermit" },
      { label: "Average down and call the new CTO post a fresh catalyst.", conviction: 5, cope: 5, chatDependency: 1, tag: "average-down-citizen" },
      { label: "Ask Telegram whether the deployer silence means the community is taking over.", conviction: 3, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "Close X, close Telegram and decline the next “one more entry” notification.", conviction: 1, cope: 1, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
  {
    prompt: "CHOOSE THE INSCRIPTION FOR YOUR TRENCHES PLAQUE.",
    note: "Your plaque is fictional, permanent and has less liquidity than the token that inspired it.",
    options: [
      { label: "THE CTO IS ALIVE. THE DEPLOYER IS NOT REPLYING.", conviction: 5, cope: 5, chatDependency: 1, tag: "conviction-custodian" },
      { label: "ONE MORE DIP AND THE ENTRY PRICE BECOMES LORE.", conviction: 5, cope: 5, chatDependency: 0, tag: "average-down-citizen" },
      { label: "KOL SAID STILL EARLY. I BELIEVE IN STILL EARLY.", conviction: 4, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "I SURVIVED THE TRENCHES BY CLOSING THE TIMELINE.", conviction: 1, cope: 1, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
];

export const profiles: Record<ClubArchetypeId, ClubProfile> = {
  "conviction-custodian": {
    title: "THE CONVICTION CUSTODIAN",
    subtitle: "You are not holding a position. You are safeguarding a post-graduation thesis of national importance.",
    motto: "THE CTO IS ALIVE. THE DEPLOYER IS NOT REPLYING.",
    roast: "The Department asked for the deployer handover. You submitted a thread explaining why the original vision remains intact.",
    membership: "PERMANENT CUSTODIAN / BAG PRESERVATION DIVISION",
  },
  "average-down-citizen": {
    title: "THE AVERAGE-DOWN CITIZEN",
    subtitle: "Your relationship with the bag has entered a complicated stage of post-graduation family planning.",
    motto: "ONE MORE DIP AND THE ENTRY PRICE BECOMES LORE.",
    roast: "You did not catch the falling knife. You opened a family office for it.",
    membership: "HONORARY MEMBER / ADDITIONAL BAG ACQUISITION UNIT",
  },
  "telegram-veteran": {
    title: "THE CT / TELEGRAM VETERAN",
    subtitle: "You have memorized every CTO account's posting schedule and still have no confirmed deliverable.",
    motto: "KOL SAID STILL EARLY. I BELIEVE IN STILL EARLY.",
    roast: "Your CTO notifications are more developed than the actual handover plan.",
    membership: "DISTINGUISHED MEMBER / COMMUNITY INTELLIGENCE OFFICE",
  },
  "exit-liquidity-witness": {
    title: "THE POST-GRADUATION EXIT-LIQUIDITY WITNESS",
    subtitle: "You were present when the fictional post-graduation pool thinned. Your witness statement includes screenshots and one unanswered DM.",
    motto: "I SAW THE SPREAD. I SAW THE SPREAD.",
    roast: "Your account is a first-hand record of CT calling a sell-off healthy rotation while the pool tells another story.",
    membership: "WITNESS STATUS / MARKET EVENTS ARCHIVE",
  },
  "chart-hermit": {
    title: "THE CHART HERMIT",
    subtitle: "You have achieved distance from the chart. The chart has not achieved distance from you.",
    motto: "ZOOM OUT UNTIL IT BECOMES HISTORY.",
    roast: "You claim to check the chart once a week. Your browser disagrees, but we respect your privacy.",
    membership: "QUIET MEMBER / REMOTE OBSERVATION DEPARTMENT",
  },
  "paper-hands-survivor": {
    title: "THE PAPER-HANDS SURVIVOR",
    subtitle: "You located the exit and used it. The Department is processing this unusual outcome.",
    motto: "I CLOSED THE TAB. I KEPT MY SANITY.",
    roast: "You left before the plot twist. The group chat has described this as a betrayal.",
    membership: "PROVISIONAL SURVIVOR / EXIT PROCEDURE UNIT",
  },
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function isValidClubAnswers(value: unknown): value is number[] {
  return Array.isArray(value) &&
    value.length === CLUB_QUESTIONS &&
    Array.from(value).every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4);
}

export function encodeClubCode(answers: number[]): string {
  if (!isValidClubAnswers(answers)) throw new Error("A complete Club membership form is required.");
  return "c" + CLUB_VERSION + "-" + answers.join("");
}

export function decodeClubCode(value: unknown): number[] | null {
  if (typeof value !== "string") return null;
  const match = value.match(new RegExp("^c" + CLUB_VERSION + "-([0-3]{" + CLUB_QUESTIONS + "})$"));
  if (!match) return null;
  const answers = [...match[1]].map(Number);
  return isValidClubAnswers(answers) ? answers : null;
}

export function inspectClubProgress(answers: number[]): ClubProgress {
  if (!Array.isArray(answers) || answers.length > CLUB_QUESTIONS ||
      !Array.from(answers).every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)) {
    throw new Error("Club answers are invalid.");
  }
  const selected = answers.map((answer, index) => questions[index].options[answer]);
  const maxScore = Math.max(1, answers.length * 5);
  return {
    completedQuestions: answers.length,
    conviction: answers.length ? round(selected.reduce((sum, item) => sum + item.conviction, 0) / maxScore * 100) : 0,
    cope: answers.length ? round(selected.reduce((sum, item) => sum + item.cope, 0) / maxScore * 100) : 0,
    chatDependency: answers.length ? round(selected.reduce((sum, item) => sum + item.chatDependency, 0) / maxScore * 100) : 0,
  };
}

function rankProfiles(answers: number[]) {
  const tally = new Map<ClubArchetypeId, { count: number; cope: number; first: number }>();
  answers.forEach((answer, index) => {
    const selected = questions[index].options[answer];
    const current = tally.get(selected.tag);
    if (current) {
      current.count += 1;
      current.cope += selected.cope;
    } else {
      tally.set(selected.tag, { count: 1, cope: selected.cope, first: index });
    }
  });
  const ranking = [...tally.entries()].sort((a, b) =>
    b[1].count - a[1].count || b[1].cope - a[1].cope || a[1].first - b[1].first
  );
  return {
    primaryTag: ranking[0]?.[0] ?? "conviction-custodian",
    secondaryTag: ranking[1]?.[0] ?? ranking[0]?.[0] ?? "conviction-custodian",
  };
}

export function buildClubResult(answers: number[]): ClubResult {
  if (!isValidClubAnswers(answers)) throw new Error("A complete Club membership form is required.");
  const progress = inspectClubProgress(answers);
  const { primaryTag, secondaryTag } = rankProfiles(answers);
  const seed = answers.reduce((sum, answer, index) => ((sum * 43) + (answer + 1) * (index + 31)) % 900000, 990099);
  const memberNumber = "99-" + String(seed + 100000).slice(-6);
  const profile = profiles[primaryTag];
  const secondaryProfile = profiles[secondaryTag];
  const membershipClass = progress.conviction >= 80
    ? "FOUNDING-LEVEL CONVICTION"
    : progress.chatDependency >= 70
      ? "COMMUNITY-DEPENDENT MEMBERSHIP"
      : progress.cope >= 65
        ? "ADVANCED COPE CERTIFICATION"
        : "GENERAL BAGHOLDER MEMBERSHIP";
  const finding = progress.conviction >= 80
    ? "CONVICTION LEVELS EXCEED THE DEPARTMENTAL REFERENCE RANGE."
    : progress.chatDependency >= 70
      ? "MEMBERSHIP STATUS REQUIRES A DAILY TELEGRAM CHECK-IN."
      : progress.cope >= 65
        ? "COPE RESERVES ARE BEING USED AT AN ELEVATED RATE."
        : "MEMBERSHIP APPROVED / BENEFITS NOT INCLUDED.";
  const selected = answers.map((answer, index) => questions[index].options[answer]);
  const strongestConviction = selected.reduce((best, item, index) =>
    item.conviction > selected[best].conviction ? index : best, 0);
  const strongestChat = selected.reduce((best, item, index) =>
    item.chatDependency > selected[best].chatDependency ? index : best, 0);
  const convictionItem = selected[strongestConviction];
  const chatItem = selected[strongestChat];
  const crossRead: DepartmentCrossRead = {
    headline: progress.conviction >= 65 && progress.chatDependency >= 60
      ? "CONVICTION MEETS A LIVE CHAT FEED"
      : progress.chatDependency >= 60
        ? "THE GROUP CHAT IS IN THE OPERATING MODEL"
        : progress.cope >= 65
          ? "THE BAG HAS ITS OWN NARRATIVE"
          : progress.conviction >= 65
            ? "THE THESIS REMAINS PINNED"
            : "THE MEMBER FILE IS MIXED",
    interpretation:
      "Your fictional membership answers average " + progress.conviction + "/100 conviction, " + progress.cope +
      "/100 cope and " + progress.chatDependency + "/100 chat dependency. The two examples below show where conviction peaked and where the selected answer leaned most heavily on the group chat. They are answer scores, not a reading of your real life or holdings.",
    signals: [
      {
        label: "STRONGEST CONVICTION ANSWER",
        context: questions[strongestConviction].prompt,
        answer: convictionItem.label,
        detail: "Conviction " + convictionItem.conviction + "/5 · Cope " + convictionItem.cope + "/5 · Chat " + convictionItem.chatDependency + "/5.",
      },
      {
        label: "HIGHEST CHAT-DEPENDENCY ANSWER",
        context: questions[strongestChat].prompt,
        answer: chatItem.label,
        detail: "Chat " + chatItem.chatDependency + "/5 · Conviction " + chatItem.conviction + "/5 · Cope " + chatItem.cope + "/5.",
      },
    ],
  };

  return {
    ...progress,
    crossRead,
    answers: [...answers],
    memberNumber,
    primaryTag,
    secondaryTag,
    profile,
    secondaryProfile,
    faction: getClubFaction(primaryTag),
    secondaryFaction: getClubFaction(secondaryTag),
    membershipClass,
    finding,
  };
}
