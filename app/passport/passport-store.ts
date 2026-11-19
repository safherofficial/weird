export const PASSPORT_VERSION = 1;
export const PASSPORT_STORAGE_KEY = "dyor-department:passport:v1";

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
};

export type PassportData = {
  version: 1;
  enabled: true;
  createdAt: string;
  visitedDepartments: DepartmentId[];
  dailyOfficeDates: string[];
  bestDailyStreak: number;
};

export const DEPARTMENT_STAMPS: DepartmentStamp[] = [
  { id: "audit", number: "01", title: "THE DYOR AUDIT", label: "RESEARCH FILED" },
  { id: "simulator", number: "02", title: "THE BAGHOLDER SIMULATOR", label: "PAPER BAG CARRIED" },
  { id: "utility", number: "03", title: "UTILITY INSPECTOR", label: "UTILITY CLAIMS REVIEWED" },
  { id: "roadmap", number: "04", title: "ROADMAP GENERATOR", label: "MILESTONES ISSUED" },
  { id: "whitepaper", number: "05", title: "WHITEPAPER FACTORY", label: "DOCUMENT GENERATED" },
  { id: "museum", number: "06", title: "THE BAGHOLDER MUSEUM", label: "EXHIBITS VISITED" },
  { id: "club", number: "07", title: "THE 99% CLUB", label: "MEMBERSHIP REVIEWED" },
  { id: "cope", number: "08", title: "THE GLOBAL COPE INDEX", label: "SYNTHETIC INDEX VIEWED" },
  { id: "archives", number: "09", title: "THE DEPARTMENT ARCHIVES", label: "RECORDS DECLASSIFIED" },
  { id: "daily", number: "10", title: "THE DAILY DEPARTMENT", label: "DAILY DISPATCH READ" },
];

export const PASSPORT_ACHIEVEMENTS: PassportAchievement[] = [
  {
    id: "first-stamp",
    title: "FIRST CONTACT",
    description: "Visit your first Department.",
  },
  {
    id: "four-stamps",
    title: "CROSS-DEPARTMENTAL",
    description: "Collect stamps from four different Departments.",
  },
  {
    id: "all-stamps",
    title: "THE COMPLETE FILE",
    description: "Visit all ten Departments.",
  },
  {
    id: "culture-curator",
    title: "CULTURE CURATOR",
    description: "Visit both the Bagholder Museum and the Department Archives.",
  },
  {
    id: "daily-reader",
    title: "DAILY READER",
    description: "Open the Daily Department at least once.",
  },
  {
    id: "seven-day-desk",
    title: "SEVEN-DAY DESK DUTY",
    description: "Visit the Daily Department on seven consecutive UTC dates.",
  },
];

const departmentIds = new Set<string>(DEPARTMENT_STAMPS.map((stamp) => stamp.id));

function isIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + "T00:00:00.000Z");
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function isValidPassport(value: unknown): value is PassportData {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<PassportData>;
  return (
    candidate.version === PASSPORT_VERSION &&
    candidate.enabled === true &&
    typeof candidate.createdAt === "string" &&
    Number.isFinite(Date.parse(candidate.createdAt)) &&
    Array.isArray(candidate.visitedDepartments) &&
    candidate.visitedDepartments.every((id) => typeof id === "string" && departmentIds.has(id)) &&
    new Set(candidate.visitedDepartments).size === candidate.visitedDepartments.length &&
    Array.isArray(candidate.dailyOfficeDates) &&
    candidate.dailyOfficeDates.every(isIsoDate) &&
    new Set(candidate.dailyOfficeDates).size === candidate.dailyOfficeDates.length &&
    typeof candidate.bestDailyStreak === "number" &&
    Number.isInteger(candidate.bestDailyStreak) &&
    candidate.bestDailyStreak >= 0 &&
    candidate.bestDailyStreak <= 3660
  );
}

function getBrowserStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readPassport(): PassportData | null {
  const storage = getBrowserStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(PASSPORT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValidPassport(parsed) ? parsed : null;
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
  };

  try {
    storage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(record));
    return record;
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

export function recordDepartmentVisit(
  section: string | undefined,
  now = new Date()
): PassportData | null {
  if (!section || !departmentIds.has(section)) return null;

  const storage = getBrowserStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(PASSPORT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isValidPassport(parsed)) return null;

    const id = section as DepartmentId;
    const visitedDepartments = parsed.visitedDepartments.includes(id)
      ? parsed.visitedDepartments
      : [...parsed.visitedDepartments, id];

    let dailyOfficeDates = parsed.dailyOfficeDates;
    let bestDailyStreak = parsed.bestDailyStreak;

    if (id === "daily") {
      const utcDate = now.toISOString().slice(0, 10);
      if (!dailyOfficeDates.includes(utcDate)) {
        dailyOfficeDates = [...dailyOfficeDates, utcDate].sort().slice(-366);
      }
      bestDailyStreak = Math.max(
        bestDailyStreak,
        longestConsecutiveUtcStreak(dailyOfficeDates)
      );
    }

    const updated: PassportData = {
      ...parsed,
      visitedDepartments,
      dailyOfficeDates,
      bestDailyStreak,
    };

    storage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(updated));
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

export function getPassportAchievements(data: PassportData): PassportAchievement[] {
  const visited = new Set(data.visitedDepartments);
  const earned = new Set<string>();

  if (visited.size >= 1) earned.add("first-stamp");
  if (visited.size >= 4) earned.add("four-stamps");
  if (visited.size === DEPARTMENT_STAMPS.length) earned.add("all-stamps");
  if (visited.has("museum") && visited.has("archives")) earned.add("culture-curator");
  if (visited.has("daily")) earned.add("daily-reader");
  if (data.bestDailyStreak >= 7) earned.add("seven-day-desk");

  return PASSPORT_ACHIEVEMENTS.filter((achievement) => earned.has(achievement.id));
}

export function getDailyOfficeVisitStreak(data: PassportData) {
  return longestConsecutiveUtcStreak(data.dailyOfficeDates);
}
