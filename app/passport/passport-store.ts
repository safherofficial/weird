export const PASSPORT_VERSION = 2;
// Keep the v1 storage key so existing opted-in Passports can be migrated in place.
export const PASSPORT_STORAGE_KEY = "dyor-department:passport:v1";
export const ACHIEVEMENT_UNLOCK_EVENT = "dyor:achievement-unlocked";

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
};

export type PassportData = {
  version: 2;
  enabled: true;
  createdAt: string;
  visitedDepartments: DepartmentId[];
  dailyOfficeDates: string[];
  bestDailyStreak: number;
  completedActivities: PassportActivityId[];
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

  if (candidate.version === 2) {
    if (
      !Array.isArray(candidate.completedActivities) ||
      !candidate.completedActivities.every((id) => typeof id === "string" && activityIds.has(id)) ||
      new Set(candidate.completedActivities).size !== candidate.completedActivities.length
    ) return null;

    return { data: candidate as unknown as PassportData, migrated: false };
  }

  if (candidate.version === 1) {
    // Preserve every existing visit stamp and streak. Page visits are deliberately
    // not promoted into completion badges during migration.
    return {
      data: {
        version: 2,
        enabled: true,
        createdAt: candidate.createdAt as string,
        visitedDepartments: candidate.visitedDepartments as DepartmentId[],
        dailyOfficeDates: candidate.dailyOfficeDates as string[],
        bestDailyStreak: candidate.bestDailyStreak as number,
        completedActivities: [],
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
  };

  try {
    storage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(record));
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
