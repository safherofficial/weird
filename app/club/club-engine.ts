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

export type ClubProgress = {
  completedQuestions: number;
  conviction: number;
  cope: number;
  chatDependency: number;
};

export type ClubResult = ClubProgress & {
  answers: number[];
  memberNumber: string;
  primaryTag: ClubArchetypeId;
  secondaryTag: ClubArchetypeId;
  profile: ClubProfile;
  secondaryProfile: ClubProfile;
  membershipClass: string;
  finding: string;
};

export const questions: ClubQuestion[] = [
  {
    prompt: "WHAT IS YOUR CURRENT RELATIONSHIP WITH THE BAG?",
    note: "Choose the fictional behavior that best fits the joke. Do not enter actual holdings or financial information.",
    options: [
      { label: "We have been through things. I am not leaving now.", conviction: 5, cope: 4, chatDependency: 1, tag: "conviction-custodian" },
      { label: "I have introduced the bag to several other bags.", conviction: 5, cope: 5, chatDependency: 2, tag: "average-down-citizen" },
      { label: "I am waiting for the next important Telegram update.", conviction: 3, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "We mutually agreed to see other charts.", conviction: 1, cope: 1, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
  {
    prompt: "WHERE DID YOUR ORIGINAL CONVICTION COME FROM?",
    note: "The Department accepts no screenshots as independent evidence.",
    options: [
      { label: "A technical document I read twice and understood once.", conviction: 4, cope: 2, chatDependency: 1, tag: "conviction-custodian" },
      { label: "A message from an admin with a green online dot.", conviction: 3, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "A chart, a narrative and a feeling I cannot reproduce.", conviction: 5, cope: 5, chatDependency: 2, tag: "average-down-citizen" },
      { label: "I saw the risk, made a decision and left the tab open.", conviction: 2, cope: 1, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
  {
    prompt: "HOW OFTEN DO YOU CHECK THE CHART?",
    note: "There are no correct answers. There are only browser-history consequences.",
    options: [
      { label: "Once a week. I have achieved inner peace.", conviction: 2, cope: 1, chatDependency: 0, tag: "chart-hermit" },
      { label: "Whenever someone says 'interesting volume'.", conviction: 4, cope: 3, chatDependency: 3, tag: "telegram-veteran" },
      { label: "Every candle. The chart and I share custody of my attention.", conviction: 5, cope: 5, chatDependency: 1, tag: "conviction-custodian" },
      { label: "I closed the tab. The tab reopened itself.", conviction: 1, cope: 2, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
  {
    prompt: "WHAT IS YOUR OFFICIAL COPING MECHANISM?",
    note: "The Department is not qualified to recommend coping mechanisms. These are jokes.",
    options: [
      { label: "Zoom out until the chart becomes a historical document.", conviction: 4, cope: 4, chatDependency: 0, tag: "chart-hermit" },
      { label: "Average down and call it a long-term thesis.", conviction: 5, cope: 5, chatDependency: 1, tag: "average-down-citizen" },
      { label: "Ask the group chat whether the dip is healthy.", conviction: 3, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "Close the app, take a breath and decline the next notification.", conviction: 1, cope: 1, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
  {
    prompt: "CHOOSE THE INSCRIPTION FOR YOUR CLUB PLAQUE.",
    note: "Your plaque will be fictional, permanent and completely without resale value.",
    options: [
      { label: "THE THESIS IS ALIVE. THE PRICE IS BEING DIFFICULT.", conviction: 5, cope: 5, chatDependency: 1, tag: "conviction-custodian" },
      { label: "ONE MORE AVERAGE AND WE ARE EVEN.", conviction: 5, cope: 5, chatDependency: 0, tag: "average-down-citizen" },
      { label: "ADMIN SAID SOON. I BELIEVE IN SOON.", conviction: 4, cope: 4, chatDependency: 5, tag: "telegram-veteran" },
      { label: "I SURVIVED THE CHART BY STOPPING THE CHART.", conviction: 1, cope: 1, chatDependency: 0, tag: "paper-hands-survivor" },
    ],
  },
];

export const profiles: Record<ClubArchetypeId, ClubProfile> = {
  "conviction-custodian": {
    title: "THE CONVICTION CUSTODIAN",
    subtitle: "You are not holding a position. You are safeguarding a thesis of national importance.",
    motto: "THE THESIS IS ALIVE. THE PRICE IS BEING DIFFICULT.",
    roast: "The Department has requested the return of your original entry price. You have submitted a philosophical essay.",
    membership: "PERMANENT CUSTODIAN / BAG PRESERVATION DIVISION",
  },
  "average-down-citizen": {
    title: "THE AVERAGE-DOWN CITIZEN",
    subtitle: "Your relationship with the bag has entered a complicated stage of portfolio family planning.",
    motto: "ONE MORE AVERAGE AND WE ARE EVEN.",
    roast: "You did not catch the falling knife. You opened a family office for it.",
    membership: "HONORARY MEMBER / ADDITIONAL BAG ACQUISITION UNIT",
  },
  "telegram-veteran": {
    title: "THE TELEGRAM VETERAN",
    subtitle: "You have memorized every admin's timezone and still have no confirmed delivery date.",
    motto: "ADMIN SAID SOON. I BELIEVE IN SOON.",
    roast: "Your community notification settings are more developed than the product roadmap.",
    membership: "DISTINGUISHED MEMBER / COMMUNITY INTELLIGENCE OFFICE",
  },
  "exit-liquidity-witness": {
    title: "THE EXIT-LIQUIDITY WITNESS",
    subtitle: "You were present when the liquidity left. You have agreed to testify under a pseudonym.",
    motto: "I SAW THE SPREAD. I SAW THE SPREAD.",
    roast: "Your account is a first-hand record of the market doing market things.",
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
    value.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4);
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
      !answers.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)) {
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

  return {
    ...progress,
    answers: [...answers],
    memberNumber,
    primaryTag,
    secondaryTag,
    profile,
    secondaryProfile,
    membershipClass,
    finding,
  };
}
