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

export function getClubFactionById(value: unknown): ClubFaction | null {
  if (typeof value !== "string") return null;
  return Object.values(factions).find((faction) => faction.id === value) ?? null;
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
    prompt: "WHAT ROLE DO YOU PLAY IN YOUR CRYPTO COMMUNITY?",
    note: "Choose the fictional contribution that best fits your membership identity. No real account, wallet or holding information is requested.",
    options: [
      { label: "I preserve the community's origin story, campaign receipts and the lore that brought members together.", conviction: 5, cope: 4, chatDependency: 1, tag: "conviction-custodian" },
      { label: "I keep every chapter alive and can turn a quiet season into another lore expansion.", conviction: 5, cope: 5, chatDependency: 2, tag: "average-down-citizen" },
      { label: "I carry updates across X, Discord and Telegram and keep different corners of the community connected.", conviction: 3, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "I document departures, old promises and what remains after the crowd moves on.", conviction: 1, cope: 2, chatDependency: 1, tag: "exit-liquidity-witness" },
    ],
  },
  {
    prompt: "WHAT DO YOU BRING WHEN A NEW ECOSYSTEM JOINS THE CONVERSATION?",
    note: "This is a cross-chain community role, not a review of any real ecosystem or project.",
    options: [
      { label: "A living archive of its origin story, milestones and community-made lore.", conviction: 4, cope: 2, chatDependency: 1, tag: "conviction-custodian" },
      { label: "A cross-channel recap that translates announcements for members in different time zones.", conviction: 3, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "A welcome thread explaining why this is the start of an even bigger chapter.", conviction: 5, cope: 5, chatDependency: 2, tag: "average-down-citizen" },
      { label: "A reminder that participation is voluntary and changing your mind is not a betrayal.", conviction: 2, cope: 1, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
  {
    prompt: "WHICH COMMUNITY RITUAL FEELS MOST LIKE HOME?",
    note: "There is no preferred level of online presence. The Department recognises lurkers as members too.",
    options: [
      { label: "A weekly digest, with no expectation to be online every minute.", conviction: 2, cope: 1, chatDependency: 0, tag: "chart-hermit" },
      { label: "Live spaces, group chats and a relay of every important community update.", conviction: 4, cope: 3, chatDependency: 3, tag: "telegram-veteran" },
      { label: "Maintaining a shared timeline of milestones, inside jokes and lessons from each cycle.", conviction: 5, cope: 5, chatDependency: 1, tag: "conviction-custodian" },
      { label: "Mute the noise, join when it matters, and leave the notifications unopened.", conviction: 1, cope: 2, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
  {
    prompt: "HOW SHOULD A HEALTHY CRYPTO COMMUNITY HANDLE DISAGREEMENT?",
    note: "The Department supports fictional community standards, not permanent loyalty tests.",
    options: [
      { label: "Make room for quiet members; nobody should have to perform online presence.", conviction: 4, cope: 4, chatDependency: 0, tag: "chart-hermit" },
      { label: "Keep the shared story alive with new lore, inside jokes and another chapter.", conviction: 5, cope: 5, chatDependency: 1, tag: "average-down-citizen" },
      { label: "Open the floor, gather replies and carry the conversation across channels.", conviction: 3, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "Let members change their minds or leave without turning it into a public trial.", conviction: 1, cope: 1, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
  {
    prompt: "CHOOSE THE INSCRIPTION FOR YOUR COMMUNITY MEMBERSHIP PLAQUE.",
    note: "Your plaque is fictional, permanent and has less liquidity than the token that inspired it.",
    options: [
      { label: "THE ORIGIN STORY IS PRESERVED. THE FOOTNOTES ARE STILL OPEN.", conviction: 5, cope: 5, chatDependency: 1, tag: "conviction-custodian" },
      { label: "ONE MORE CHAPTER AND THIS LORE BECOMES A FRANCHISE.", conviction: 5, cope: 5, chatDependency: 0, tag: "average-down-citizen" },
      { label: "IF IT WASN'T PINNED, DID THE COMMUNITY EVEN SEE IT?", conviction: 4, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "I LEFT THE CHAT. I KEPT THE FRIENDS.", conviction: 1, cope: 1, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
];

export const profiles: Record<ClubArchetypeId, ClubProfile> = {
  "conviction-custodian": {
    title: "THE CONVICTION CUSTODIAN",
    subtitle: "You preserve the community's origin story, campaign receipts and the footnotes that explain how the lore changed.",
    motto: "THE LORE IS PRESERVED. THE FOOTNOTES ARE STILL OPEN.",
    roast: "You were asked for a two-line recap. You delivered a community archive with version history.",
    membership: "PERMANENT LORE CUSTODIAN / COMMUNITY ARCHIVE",
  },
  "average-down-citizen": {
    title: "THE AVERAGE-DOWN CITIZEN",
    subtitle: "Every new community chapter becomes a sequel. Nobody requested one, but the franchise continues.",
    motto: "ONE MORE CHAPTER AND THIS LORE BECOMES A FRANCHISE.",
    roast: "You do not let a narrative end. You give it a spin-off, a prequel and a Discord role.",
    membership: "HONORARY MEMBER / EXPANDED UNIVERSE DEPARTMENT",
  },
  "telegram-veteran": {
    title: "THE CT / TELEGRAM VETERAN",
    subtitle: "You can carry an announcement from X to Discord to Telegram before the original author finishes the thread.",
    motto: "IF IT WASN'T PINNED, DID THE COMMUNITY EVEN SEE IT?",
    roast: "Your community recap has its own distribution network and a timezone conversion table.",
    membership: "DISTINGUISHED MEMBER / CROSS-CHANNEL RELAY OFFICE",
  },
  "exit-liquidity-witness": {
    title: "THE POST-GRADUATION EXIT-LIQUIDITY WITNESS",
    subtitle: "You keep a record of what the community built, who moved on and which promises survived the group chat.",
    motto: "WE KEPT THE RECEIPTS. THE MEMBERSHIP LIST CHANGED.",
    roast: "You are the only person who brought meeting minutes to the nostalgia thread.",
    membership: "WITNESS STATUS / COMMUNITY HISTORY ARCHIVE",
  },
  "chart-hermit": {
    title: "THE CHART HERMIT",
    subtitle: "You prefer a weekly digest and meaningful participation to a permanent live presence across every channel.",
    motto: "PRESENT IN SPIRIT. MUTED BY DESIGN.",
    roast: "You treat notifications as optional and the community still knows your name. Suspiciously healthy.",
    membership: "QUIET MEMBER / LOW-NOTIFICATION CHAPTER",
  },
  "paper-hands-survivor": {
    title: "THE PAPER-HANDS SURVIVOR",
    subtitle: "You know belonging does not require constant posting, endless notifications or a permanent position.",
    motto: "I LEFT THE CHAT. I KEPT THE FRIENDS.",
    roast: "You set a boundary, touched grass and somehow remained on the invite list.",
    membership: "PROVISIONAL SURVIVOR / VOLUNTARY PARTICIPATION UNIT",
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
