import { CLUB_FACTION_IDS, type ClubFactionId } from "../club/club-engine";

export const PASSPORT_VERSION = 4;

export const CLUB_CHALLENGE_IDS = ["fault-allocation", "next-entry", "research-receipt"] as const;
export type ClubChallengeId = typeof CLUB_CHALLENGE_IDS[number];

export const CLUB_BADGE_IDS = [
  "club-not-my-fault",
  "club-next-one-is-mine",
  "club-dyor-certified",
  "club-diamond-hands",
  "club-average-downer",
  "club-cto-believer",
  "club-exit-liquidity",
  "club-100x-visionary",
  "club-still-early",
  "club-cope-engineer",
  "club-kol-disciple",
  "club-certified-bagholder",
  "club-faction-aligned",
  "club-departmental-echo",
  "club-weekly-regular",
] as const;
export type ClubBadgeId = typeof CLUB_BADGE_IDS[number];

const CLUB_CHALLENGE_OPTION_COUNTS: Record<ClubChallengeId, number> = {
  "fault-allocation": 3,
  "next-entry": 3,
  "research-receipt": 3,
};

function isValidClubAnswers(value: unknown): value is number[] {
  return Array.isArray(value) && value.length === 5 &&
    value.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4);
}

function isValidClubChallengeAnswers(value: unknown): value is Partial<Record<ClubChallengeId, number>> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.entries(value as Record<string, unknown>).every(([id, answer]) =>
    CLUB_CHALLENGE_IDS.includes(id as ClubChallengeId) &&
    Number.isInteger(answer) &&
    (answer as number) >= 0 &&
    (answer as number) < CLUB_CHALLENGE_OPTION_COUNTS[id as ClubChallengeId],
  );
}

function isValidClubWeeklyAnswers(value: unknown): value is Record<string, number> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const entries = Object.entries(value as Record<string, unknown>);
  return entries.length <= 104 && entries.every(([weekKey, answer]) =>
    /^\d{4}-W(?:0[1-9]|[1-4]\d|5[0-3])$/.test(weekKey) &&
    Number.isInteger(answer) &&
    (answer as number) >= 0 &&
    (answer as number) < 3,
  );
}
// Keep the v1 storage key so existing opted-in Passports can be migrated in place.
export const PASSPORT_STORAGE_KEY = "dyor-department:passport:v1";
export const ACHIEVEMENT_UNLOCK_EVENT = "dyor:achievement-unlocked";
export const PASSPORT_UPDATED_EVENT = "dyor:passport-updated";

export type DepartmentId =
  | "audit"
  | "simulator"
  | "utility"
  | "roadmap"
  | "whitepaper"
  | "museum"
  | "club"
  | "cope"
  | "archives"
  | "daily";

export type PassportActivityId =
  | "audit"
  | "simulator"
  | "utility"
  | "roadmap"
  | "whitepaper"
  | "club"
  | "cope"
  | "museum-exhibit"
  | "archive-record";

export type BadgeRarity = "COMMON" | "UNCOMMON" | "RARE" | "LEGENDARY";
export type BadgeIcon =
  | "file"
  | "audit"
  | "simulator"
  | "utility"
  | "roadmap"
  | "whitepaper"
  | "club"
  | "cope"
  | "museum"
  | "streak"
  | "circuit";

export type DepartmentStamp = {
  id: DepartmentId;
  number: string;
  title: string;
  label: string;
};

export type PassportAchievement = {
  id: string;
  title: string;
  description: string;
  requirement: string;
  rarity: BadgeRarity;
  icon: BadgeIcon;
  secret?: boolean;
};

export type PassportData = {
  version: 4;
  enabled: true;
  createdAt: string;
  visitedDepartments: DepartmentId[];
  dailyOfficeDates: string[];
  bestDailyStreak: number;
  completedActivities: PassportActivityId[];
  clubMembershipAnswers: number[] | null;
  clubApplicationCount: number;
  clubChallengeAnswers: Partial<Record<ClubChallengeId, number>>;
  clubBadgeIds: ClubBadgeId[];
  clubFactionId: ClubFactionId | null;
  clubWeeklyChallengeAnswers: Record<string, number>;
};

export type PassportAchievementStatus = PassportAchievement & {
  earned: boolean;
  progress: number;
  target: number;
};

const CORE_ACTIVITIES: PassportActivityId[] = [
  "audit",
  "simulator",
  "utility",
  "roadmap",
  "whitepaper",
  "club",
  "cope",
];

export const DEPARTMENT_STAMPS: DepartmentStamp[] = [
  { id: "simulator", number: "01", title: "PUMP.FUN INTELLIGENCE / PAPER MARKET SIMULATOR", label: "PAPER LAUNCH COMPLETED" },
  { id: "club", number: "02", title: "SOLANA TRENCHES / 99% SURVIVOR REGISTRY", label: "SURVIVOR STATUS REVIEWED" },
  { id: "audit", number: "03", title: "FOMO CONTROL UNIT / DYOR AUDIT", label: "RESEARCH FILED" },
  { id: "daily", number: "04", title: "KOL SURVEILLANCE / THE TRENCHES DESK", label: "DAILY CT BRIEFING READ" },
  { id: "archives", number: "05", title: "WHALE & WALLET INVESTIGATION / CASE ARCHIVE", label: "FICTIONAL CASES REVIEWED" },
  { id: "roadmap", number: "06", title: "CTO EMERGENCY OFFICE / TAKEOVER ROADMAP", label: "TAKEOVER PHASES ISSUED" },
  { id: "whitepaper", number: "07", title: "EXIT LIQUIDITY DEPARTMENT / TOKEN DOSSIER", label: "TOKEN DOSSIER GENERATED" },
  { id: "utility", number: "08", title: "100X RESEARCH BUREAU / TOKEN-PURPOSE INSPECTION", label: "TOKEN PURPOSE REVIEWED" },
  { id: "museum", number: "09", title: "BAGHOLDER REHABILITATION / TRENCHES RELIC MUSEUM", label: "TRENCHES RELICS VISITED" },
  { id: "cope", number: "10", title: "COPIUM ADMINISTRATION / GLOBAL COPE INDEX", label: "SYNTHETIC TRENCHES INDEX VIEWED" },
];

export const PASSPORT_ACHIEVEMENTS: PassportAchievement[] = [
  {
    id: "first-case-filed",
    title: "FIRST CASE FILED",
    description: "The Department has received your first completed case.",
    requirement: "Complete any one of the seven interactive experiences.",
    rarity: "COMMON",
    icon: "file",
  },
  {
    id: "forensic-auditor",
    title: "FORENSIC AUDITOR",
    description: "A complete DYOR Audit has been filed.",
    requirement: "Finish all questions in THE DYOR AUDIT.",
    rarity: "COMMON",
    icon: "audit",
  },
  {
    id: "paper-survivor",
    title: "PAPER MARKET SURVIVOR",
    description: "You completed a full simulation without risking actual funds.",
    requirement: "Finish all rounds in the Pump.fun Intelligence paper-market simulator.",
    rarity: "UNCOMMON",
    icon: "simulator",
  },
  {
    id: "utility-witness",
    title: "TOKEN-PURPOSE WITNESS",
    description: "The fictional Solana token's purpose has been formally inspected.",
    requirement: "Complete the 100X Research Bureau token-purpose inspection.",
    rarity: "COMMON",
    icon: "utility",
  },
  {
    id: "roadmap-architect",
    title: "CTO TAKEOVER ARCHITECT",
    description: "A seven-phase fictional community takeover plan has been issued.",
    requirement: "Generate a complete CTO takeover recovery plan.",
    rarity: "UNCOMMON",
    icon: "roadmap",
  },
  {
    id: "whitepaper-author",
    title: "TOKEN DOSSIER AUTHOR",
    description: "A complete fictional Solana token dossier has entered the archive.",
    requirement: "Generate a complete fictional token dossier in the Exit Liquidity Department.",
    rarity: "UNCOMMON",
    icon: "whitepaper",
  },
  {
    id: "club-admitted",
    title: "CLUB ADMITTED",
    description: "Your application to THE 99% CLUB has been processed.",
    requirement: "Complete all five membership questions.",
    rarity: "UNCOMMON",
    icon: "club",
  },
  {
    id: "cope-analyst",
    title: "COPE ANALYST",
    description: "Your personal synthetic index calibration is complete.",
    requirement: "Complete all questions in THE GLOBAL COPE INDEX calibration.",
    rarity: "RARE",
    icon: "cope",
  },
  {
    id: "culture-curator",
    title: "CULTURE CURATOR",
    description: "You have examined an artifact and declassified a record.",
    requirement: "Open at least one Museum exhibit and one Archive record.",
    rarity: "RARE",
    icon: "museum",
  },
  {
    id: "seven-day-desk",
    title: "SEVEN-DAY TRENCHES DESK DUTY",
    description: "A full week of consecutive Trenches Desk visits.",
    requirement: "Visit The Trenches Desk on seven consecutive UTC dates.",
    rarity: "RARE",
    icon: "streak",
  },
  {
    id: "complete-circuit",
    title: "THE COMPLETE CIRCUIT",
    description: "Every interactive experience has produced a completed file.",
    requirement: "Complete all seven interactive experiences at least once.",
    rarity: "LEGENDARY",
    icon: "circuit",
  },
  {
    id: "club-not-my-fault",
    title: "NOT MY FAULT",
    description: "The Department has received your official external-cause explanation.",
    requirement: "File a response in the Club's Fault Allocation challenge.",
    rarity: "COMMON",
    icon: "club",
  },
  {
    id: "club-next-one-is-mine",
    title: "NEXT ONE IS MINE",
    description: "Your conviction has survived another round of paperwork.",
    requirement: "Complete the Next Entry challenge.",
    rarity: "COMMON",
    icon: "club",
  },
  {
    id: "club-dyor-certified",
    title: "DYOR CERTIFIED",
    description: "A research receipt has been filed with the Department.",
    requirement: "Complete the membership interview with an independent-research answer, or choose the document-and-transaction review in Research Receipt.",
    rarity: "UNCOMMON",
    icon: "club",
  },
  {
    id: "club-diamond-hands",
    title: "DIAMOND HANDS",
    description: "The exit tab remains unopened. The thesis remains under protection.",
    requirement: "Choose a long-term-bag or unbreakable-CTO-conviction answer in the membership interview.",
    rarity: "UNCOMMON",
    icon: "club",
  },
  {
    id: "club-average-downer",
    title: "PROFESSIONAL AVERAGE-DOWNER",
    description: "Every lower price has been reclassified as a family-office opportunity.",
    requirement: "Choose an averaging-down answer in the membership interview.",
    rarity: "RARE",
    icon: "club",
  },
  {
    id: "club-cto-believer",
    title: "CTO BELIEVER",
    description: "The handover thread has been added to your list of trusted literature.",
    requirement: "Choose a Telegram or CTO-dependent answer in the membership interview.",
    rarity: "UNCOMMON",
    icon: "club",
  },
  {
    id: "club-exit-liquidity",
    title: "EXIT LIQUIDITY LEGEND",
    description: "You were there when the early wallets discovered the exit.",
    requirement: "Choose the post-graduation witness answer in the membership interview.",
    rarity: "RARE",
    icon: "club",
  },
  {
    id: "club-100x-visionary",
    title: "100X VISIONARY",
    description: "One green candle has supplied enough evidence for a lifetime thesis.",
    requirement: "Choose the green-candle-and-KOL conviction answer in the membership interview.",
    rarity: "RARE",
    icon: "club",
  },
  {
    id: "club-still-early",
    title: "STILL EARLY",
    description: "Time has passed. Your entry thesis refuses to acknowledge it.",
    requirement: "Choose a still-early or CA-reply conviction answer in the interview or Research Receipt challenge.",
    rarity: "UNCOMMON",
    icon: "club",
  },
  {
    id: "club-cope-engineer",
    title: "COPE ENGINEER",
    description: "Three separate explanations have been filed. None accepts responsibility.",
    requirement: "Complete all three interactive Club challenges.",
    rarity: "LEGENDARY",
    icon: "club",
  },
  {
    id: "club-kol-disciple",
    title: "KOL DISCIPLE",
    description: "Your independent research has been peer-reviewed by a quote-tweet.",
    requirement: "Choose the KOL-thread option in Research Receipt or a KOL-dependent membership answer.",
    rarity: "RARE",
    icon: "club",
  },
  {
    id: "club-certified-bagholder",
    title: "CERTIFIED BAGHOLDER",
    description: "Your membership file is complete. Your exit strategy remains classified.",
    requirement: "Complete all five questions in the 99% Club membership interview.",
    rarity: "COMMON",
    icon: "club",
  },
  {
    id: "club-faction-aligned",
    title: "FACTION AFFILIATION",
    description: "Your archetype has been assigned to one of the six official Club factions.",
    requirement: "Complete the membership interview and receive your faction designation.",
    rarity: "UNCOMMON",
    icon: "club",
  },
  {
    id: "club-departmental-echo",
    title: "THE DEPARTMENTAL ECHO",
    description: "Three separate case files. Exactly the same explanation. Absolutely no personal liability.",
    requirement: "File the same response position in all three original Club challenges.",
    rarity: "LEGENDARY",
    icon: "club",
    secret: true,
  },
  {
    id: "club-weekly-regular",
    title: "THREE-WEEK REGULAR",
    description: "You have returned for three separate weekly Club rituals.",
    requirement: "File the weekly challenge during three different UTC calendar weeks.",
    rarity: "LEGENDARY",
    icon: "club",
    secret: true,
  },
];

const departmentIds = new Set<string>(DEPARTMENT_STAMPS.map((stamp) => stamp.id));
const activityIds = new Set<string>([
  "audit", "simulator", "utility", "roadmap", "whitepaper", "club", "cope", "museum-exhibit", "archive-record",
]);

function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + "T00:00:00.000Z");
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isValidSharedFields(value: Record<string, unknown>) {
  return (
    value.enabled === true &&
    typeof value.createdAt === "string" &&
    Number.isFinite(Date.parse(value.createdAt)) &&
    Array.isArray(value.visitedDepartments) &&
    value.visitedDepartments.every((id) => typeof id === "string" && departmentIds.has(id)) &&
    new Set(value.visitedDepartments).size === value.visitedDepartments.length &&
    Array.isArray(value.dailyOfficeDates) &&
    value.dailyOfficeDates.every(isIsoDate) &&
    new Set(value.dailyOfficeDates).size === value.dailyOfficeDates.length &&
    value.dailyOfficeDates.length <= 366 &&
    typeof value.bestDailyStreak === "number" &&
    Number.isInteger(value.bestDailyStreak) &&
    value.bestDailyStreak >= 0 &&
    value.bestDailyStreak <= 3660
  );
}

function normalizePassport(value: unknown): { data: PassportData; migrated: boolean } | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Record<string, unknown>;
  if (!isValidSharedFields(candidate)) return null;

  const validActivities = (activities: unknown): activities is PassportActivityId[] =>
    Array.isArray(activities) &&
    activities.every((id) => typeof id === "string" && activityIds.has(id)) &&
    new Set(activities).size === activities.length;

  const validClubV3Fields = () =>
    (candidate.clubMembershipAnswers === null || isValidClubAnswers(candidate.clubMembershipAnswers)) &&
    Number.isInteger(candidate.clubApplicationCount) &&
    (candidate.clubApplicationCount as number) >= 0 &&
    (candidate.clubApplicationCount as number) <= 10000 &&
    isValidClubChallengeAnswers(candidate.clubChallengeAnswers) &&
    Array.isArray(candidate.clubBadgeIds) &&
    candidate.clubBadgeIds.every((id) => CLUB_BADGE_IDS.includes(id as ClubBadgeId)) &&
    new Set(candidate.clubBadgeIds).size === candidate.clubBadgeIds.length;

  if (candidate.version === 4) {
    if (
      !validActivities(candidate.completedActivities) ||
      !validClubV3Fields() ||
      !(candidate.clubFactionId === null || CLUB_FACTION_IDS.includes(candidate.clubFactionId as ClubFactionId)) ||
      !isValidClubWeeklyAnswers(candidate.clubWeeklyChallengeAnswers)
    ) return null;

    return { data: candidate as unknown as PassportData, migrated: false };
  }

  if (candidate.version === 1 || candidate.version === 2 || candidate.version === 3) {
    const completedActivities = candidate.version === 1
      ? []
      : candidate.completedActivities;
    if (!validActivities(completedActivities)) return null;

    const hasV3ClubFields = candidate.version === 3;
    if (hasV3ClubFields && !validClubV3Fields()) return null;

    return {
      data: {
        version: 4,
        enabled: true,
        createdAt: candidate.createdAt as string,
        visitedDepartments: candidate.visitedDepartments as DepartmentId[],
        dailyOfficeDates: candidate.dailyOfficeDates as string[],
        bestDailyStreak: candidate.bestDailyStreak as number,
        completedActivities,
        clubMembershipAnswers: hasV3ClubFields ? candidate.clubMembershipAnswers as number[] | null : null,
        clubApplicationCount: hasV3ClubFields ? candidate.clubApplicationCount as number : 0,
        clubChallengeAnswers: hasV3ClubFields ? candidate.clubChallengeAnswers as Partial<Record<ClubChallengeId, number>> : {},
        clubBadgeIds: hasV3ClubFields ? candidate.clubBadgeIds as ClubBadgeId[] : [],
        clubFactionId: null,
        clubWeeklyChallengeAnswers: {},
      },
      migrated: true,
    };
  }

  return null;
}

function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function longestConsecutiveUtcStreak(dates: string[]) {
  const sorted = [...dates].sort();
  let best = 0;
  let current = 0;
  let previousDay = -2;

  for (const date of sorted) {
    const day = Math.floor(Date.parse(date + "T00:00:00.000Z") / 86400000);
    if (day === previousDay) continue;
    current = day === previousDay + 1 ? current + 1 : 1;
    best = Math.max(best, current);
    previousDay = day;
  }

  return best;
}

function announcePassportUpdate() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(PASSPORT_UPDATED_EVENT));
}

function announceNewAchievements(previous: PassportData, updated: PassportData) {
  if (typeof window === "undefined") return;
  const previousIds = new Set(getPassportAchievements(previous).map((achievement) => achievement.id));
  const newlyEarned = getPassportAchievements(updated).filter((achievement) => !previousIds.has(achievement.id));
  for (const achievement of newlyEarned) {
    window.dispatchEvent(new CustomEvent(ACHIEVEMENT_UNLOCK_EVENT, { detail: achievement }));
  }
}

export function readPassport(): PassportData | null {
  const storage = getBrowserStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(PASSPORT_STORAGE_KEY);
    if (!raw) return null;
    const normalized = normalizePassport(JSON.parse(raw) as unknown);
    if (!normalized) return null;
    if (normalized.migrated) storage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(normalized.data));
    return normalized.data;
  } catch {
    return null;
  }
}

export function enablePassport(now = new Date()): PassportData | null {
  const storage = getBrowserStorage();
  if (!storage) return null;

  const existing = readPassport();
  if (existing) return existing;

  const record: PassportData = {
    version: PASSPORT_VERSION,
    enabled: true,
    createdAt: now.toISOString(),
    visitedDepartments: [],
    dailyOfficeDates: [],
    bestDailyStreak: 0,
    completedActivities: [],
    clubMembershipAnswers: null,
    clubApplicationCount: 0,
    clubChallengeAnswers: {},
    clubBadgeIds: [],
    clubFactionId: null,
    clubWeeklyChallengeAnswers: {},
  };

  try {
    storage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(record));
    announcePassportUpdate();
    return record;
  } catch {
    return null;
  }
}

function readStoredPassport(storage: Storage): PassportData | null {
  const raw = storage.getItem(PASSPORT_STORAGE_KEY);
  if (!raw) return null;
  const normalized = normalizePassport(JSON.parse(raw) as unknown);
  if (!normalized) return null;
  if (normalized.migrated) storage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(normalized.data));
  return normalized.data;
}

export function recordDepartmentVisit(section: string | undefined, now = new Date()): PassportData | null {
  if (!section || !departmentIds.has(section)) return null;
  const storage = getBrowserStorage();
  if (!storage) return null;

  try {
    const previous = readStoredPassport(storage);
    if (!previous) return null;
    const id = section as DepartmentId;
    const visitedDepartments = previous.visitedDepartments.includes(id)
      ? previous.visitedDepartments
      : [...previous.visitedDepartments, id];

    let dailyOfficeDates = previous.dailyOfficeDates;
    let bestDailyStreak = previous.bestDailyStreak;
    if (id === "daily") {
      const utcDate = now.toISOString().slice(0, 10);
      if (!dailyOfficeDates.includes(utcDate)) {
        dailyOfficeDates = [...dailyOfficeDates, utcDate].sort().slice(-366);
      }
      bestDailyStreak = Math.max(bestDailyStreak, longestConsecutiveUtcStreak(dailyOfficeDates));
    }

    const updated: PassportData = { ...previous, visitedDepartments, dailyOfficeDates, bestDailyStreak };
    storage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(updated));
    announcePassportUpdate();
    announceNewAchievements(previous, updated);
    return updated;
  } catch {
    return null;
  }
}

export function recordPassportActivity(activity: PassportActivityId): PassportData | null {
  if (!activityIds.has(activity)) return null;
  const storage = getBrowserStorage();
  if (!storage) return null;

  try {
    const previous = readStoredPassport(storage);
    if (!previous || previous.completedActivities.includes(activity)) return previous;
    const updated: PassportData = {
      ...previous,
      completedActivities: [...previous.completedActivities, activity],
    };
    storage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(updated));
    announcePassportUpdate();
    announceNewAchievements(previous, updated);
    return updated;
  } catch {
    return null;
  }
}

function getMembershipBadgeUnlocks(answers: number[]): ClubBadgeId[] {
  const unlocked = new Set<ClubBadgeId>(["club-certified-bagholder"]);
  const [bag, source, , dev, plaque] = answers;

  if (source === 0) unlocked.add("club-dyor-certified");
  if (bag === 0 || plaque === 0) unlocked.add("club-diamond-hands");
  if (bag === 1 || source === 2 || dev === 1 || plaque === 1) unlocked.add("club-average-downer");
  if (answers.some((answer, index) =>
    (index === 0 && answer === 2) ||
    (index === 1 && answer === 1) ||
    (index === 2 && answer === 1) ||
    (index === 3 && answer === 2) ||
    (index === 4 && answer === 2),
  )) unlocked.add("club-cto-believer");
  if (bag === 3) unlocked.add("club-exit-liquidity");
  if (source === 2) unlocked.add("club-100x-visionary");
  if (source === 1 || plaque === 2) unlocked.add("club-still-early");
  if (source === 1 || plaque === 2) unlocked.add("club-kol-disciple");
  return [...unlocked];
}

export function recordClubMembership(answers: number[], factionId: ClubFactionId): PassportData | null {
  if (!isValidClubAnswers(answers) || !CLUB_FACTION_IDS.includes(factionId)) return null;
  const storage = getBrowserStorage();
  if (!storage) return null;

  try {
    const previous = readStoredPassport(storage);
    if (!previous) return null;
    const unlocks = getMembershipBadgeUnlocks(answers);
    const nextBadgeIds = [...new Set([...previous.clubBadgeIds, ...unlocks])];
    const updated: PassportData = {
      ...previous,
      clubMembershipAnswers: [...answers],
      clubApplicationCount: Math.min(previous.clubApplicationCount + 1, 10000),
      clubBadgeIds: [...new Set<ClubBadgeId>([...nextBadgeIds, "club-faction-aligned"])],
      clubFactionId: factionId,
    };
    storage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(updated));
    announcePassportUpdate();
    announceNewAchievements(previous, updated);
    return updated;
  } catch {
    return null;
  }
}

export function recordClubChallenge(id: ClubChallengeId, answerIndex: number): PassportData | null {
  if (!CLUB_CHALLENGE_IDS.includes(id) ||
      !Number.isInteger(answerIndex) ||
      answerIndex < 0 ||
      answerIndex >= CLUB_CHALLENGE_OPTION_COUNTS[id]) return null;
  const storage = getBrowserStorage();
  if (!storage) return null;

  try {
    const previous = readStoredPassport(storage);
    if (!previous) return null;
    const clubChallengeAnswers = { ...previous.clubChallengeAnswers, [id]: answerIndex };
    const unlocks = new Set<ClubBadgeId>(previous.clubBadgeIds);
    if (id === "fault-allocation") unlocks.add("club-not-my-fault");
    if (id === "next-entry") unlocks.add("club-next-one-is-mine");
    if (id === "research-receipt") {
      if (answerIndex === 0) unlocks.add("club-dyor-certified");
      if (answerIndex === 1) unlocks.add("club-still-early");
      if (answerIndex === 2) unlocks.add("club-kol-disciple");
    }
    if (CLUB_CHALLENGE_IDS.every((challengeId) =>
      Number.isInteger(clubChallengeAnswers[challengeId]),
    )) unlocks.add("club-cope-engineer");
    const filedPositions = CLUB_CHALLENGE_IDS.map((challengeId) => clubChallengeAnswers[challengeId]);
    if (filedPositions.every((answer) => Number.isInteger(answer)) &&
        filedPositions.every((answer) => answer === filedPositions[0])) {
      unlocks.add("club-departmental-echo");
    }

    const updated: PassportData = {
      ...previous,
      clubChallengeAnswers,
      clubBadgeIds: [...unlocks],
    };
    storage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(updated));
    announcePassportUpdate();
    announceNewAchievements(previous, updated);
    return updated;
  } catch {
    return null;
  }
}

export function recordClubWeeklyChallenge(weekKey: string, answerIndex: number): PassportData | null {
  if (!/^\d{4}-W(?:0[1-9]|[1-4]\d|5[0-3])$/.test(weekKey) ||
      !Number.isInteger(answerIndex) ||
      answerIndex < 0 ||
      answerIndex >= 3) return null;
  const storage = getBrowserStorage();
  if (!storage) return null;

  try {
    const previous = readStoredPassport(storage);
    if (!previous) return null;
    const weeklyAnswers = {
      ...previous.clubWeeklyChallengeAnswers,
      [weekKey]: answerIndex,
    };
    const trimmedEntries = Object.entries(weeklyAnswers)
      .sort(([left], [right]) => left.localeCompare(right))
      .slice(-104);
    const clubWeeklyChallengeAnswers = Object.fromEntries(trimmedEntries);
    const unlocks = new Set<ClubBadgeId>(previous.clubBadgeIds);
    if (Object.keys(clubWeeklyChallengeAnswers).length >= 3) {
      unlocks.add("club-weekly-regular");
    }
    const updated: PassportData = {
      ...previous,
      clubWeeklyChallengeAnswers,
      clubBadgeIds: [...unlocks],
    };
    storage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(updated));
    announcePassportUpdate();
    announceNewAchievements(previous, updated);
    return updated;
  } catch {
    return null;
  }
}

export function deletePassport() {
  const storage = getBrowserStorage();
  if (!storage) return false;
  try {
    storage.removeItem(PASSPORT_STORAGE_KEY);
    announcePassportUpdate();
    return true;
  } catch {
    return false;
  }
}

export function getPassportAchievementStatuses(data: PassportData): PassportAchievementStatus[] {
  const completed = new Set(data.completedActivities);
  const coreCompleted = CORE_ACTIVITIES.filter((activity) => completed.has(activity)).length;
  const conditions: Record<string, { progress: number; target: number }> = {
    "first-case-filed": { progress: Math.min(coreCompleted, 1), target: 1 },
    "forensic-auditor": { progress: completed.has("audit") ? 1 : 0, target: 1 },
    "paper-survivor": { progress: completed.has("simulator") ? 1 : 0, target: 1 },
    "utility-witness": { progress: completed.has("utility") ? 1 : 0, target: 1 },
    "roadmap-architect": { progress: completed.has("roadmap") ? 1 : 0, target: 1 },
    "whitepaper-author": { progress: completed.has("whitepaper") ? 1 : 0, target: 1 },
    "club-admitted": { progress: completed.has("club") ? 1 : 0, target: 1 },
    "cope-analyst": { progress: completed.has("cope") ? 1 : 0, target: 1 },
    "culture-curator": {
      progress: Number(completed.has("museum-exhibit")) + Number(completed.has("archive-record")),
      target: 2,
    },
    "seven-day-desk": { progress: Math.min(data.bestDailyStreak, 7), target: 7 },
    "complete-circuit": { progress: coreCompleted, target: CORE_ACTIVITIES.length },
    "club-not-my-fault": { progress: Number(data.clubBadgeIds.includes("club-not-my-fault")), target: 1 },
    "club-next-one-is-mine": { progress: Number(data.clubBadgeIds.includes("club-next-one-is-mine")), target: 1 },
    "club-dyor-certified": { progress: Number(data.clubBadgeIds.includes("club-dyor-certified")), target: 1 },
    "club-diamond-hands": { progress: Number(data.clubBadgeIds.includes("club-diamond-hands")), target: 1 },
    "club-average-downer": { progress: Number(data.clubBadgeIds.includes("club-average-downer")), target: 1 },
    "club-cto-believer": { progress: Number(data.clubBadgeIds.includes("club-cto-believer")), target: 1 },
    "club-exit-liquidity": { progress: Number(data.clubBadgeIds.includes("club-exit-liquidity")), target: 1 },
    "club-100x-visionary": { progress: Number(data.clubBadgeIds.includes("club-100x-visionary")), target: 1 },
    "club-still-early": { progress: Number(data.clubBadgeIds.includes("club-still-early")), target: 1 },
    "club-cope-engineer": { progress: data.clubBadgeIds.includes("club-cope-engineer") ? 3 : Object.keys(data.clubChallengeAnswers).length, target: 3 },
    "club-kol-disciple": { progress: Number(data.clubBadgeIds.includes("club-kol-disciple")), target: 1 },
    "club-certified-bagholder": { progress: Number(data.clubBadgeIds.includes("club-certified-bagholder")), target: 1 },
    "club-faction-aligned": { progress: Number(data.clubBadgeIds.includes("club-faction-aligned")), target: 1 },
    "club-departmental-echo": { progress: Number(data.clubBadgeIds.includes("club-departmental-echo")), target: 3 },
    "club-weekly-regular": { progress: Math.min(Object.keys(data.clubWeeklyChallengeAnswers).length, 3), target: 3 },
  };

  return PASSPORT_ACHIEVEMENTS.map((achievement) => {
    const progress = conditions[achievement.id];
    return { ...achievement, ...progress, earned: progress.progress >= progress.target };
  });
}

export function getPassportAchievements(data: PassportData): PassportAchievement[] {
  return getPassportAchievementStatuses(data)
    .filter((achievement) => achievement.earned)
    .map(({ earned: _earned, progress: _progress, target: _target, ...achievement }) => achievement);
}

export function getDailyOfficeVisitStreak(data: PassportData) {
  return longestConsecutiveUtcStreak(data.dailyOfficeDates);
}
