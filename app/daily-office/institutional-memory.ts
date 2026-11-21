import { buildDailyOfficeDispatch, type DailyOfficeDispatch } from "./daily-engine";

export type InstitutionalMemoryReference = {
  issueDate: string;
  reference: string;
  caseTheme: string;
  headline: string;
  href: string;
};

export type InstitutionalMemoryRecord = InstitutionalMemoryReference & {
  bulletin: string;
  assignedDepartment: string;
  disposition: string;
  postMortem: string;
  predecessor: InstitutionalMemoryReference | null;
  successor: InstitutionalMemoryReference | null;
  handoffNote: string;
};

function parseUtcDate(value: string): Date | null {
  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) return null;
  const parsed = new Date(value + "T00:00:00.000Z");
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value) return null;
  return parsed;
}

function utcToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function isValidInstitutionalMemoryDate(issueDate: string, latestAllowed = utcToday()): boolean {
  const parsed = parseUtcDate(issueDate);
  const latest = parseUtcDate(latestAllowed);
  return parsed !== null && latest !== null && issueDate <= latestAllowed;
}

export function shiftInstitutionalMemoryDate(issueDate: string, offsetDays: number): string {
  const parsed = parseUtcDate(issueDate);
  if (!parsed || !Number.isInteger(offsetDays)) {
    throw new Error("A valid UTC issue date and whole-day offset are required.");
  }
  parsed.setUTCDate(parsed.getUTCDate() + offsetDays);
  return parsed.toISOString().slice(0, 10);
}

function referenceFor(dispatch: DailyOfficeDispatch): InstitutionalMemoryReference {
  const today = utcToday();
  return {
    issueDate: dispatch.issueDate,
    reference: dispatch.reference,
    caseTheme: dispatch.caseTheme,
    headline: dispatch.headline,
    href: dispatch.issueDate === today
      ? "/daily-office"
      : "/daily-office/archive/" + dispatch.issueDate,
  };
}

export function buildInstitutionalMemory(issueDate: string, days = 14): InstitutionalMemoryRecord[] {
  if (!isValidInstitutionalMemoryDate(issueDate)) {
    throw new Error("Institutional memory can only be generated for a valid past or current UTC issue date.");
  }
  if (!Number.isInteger(days) || days < 2 || days > 30) {
    throw new Error("The institutional memory window must contain between 2 and 30 days.");
  }

  const firstDate = shiftInstitutionalMemoryDate(issueDate, -(days - 1));
  const dispatches = Array.from({ length: days }, (_, index) =>
    buildDailyOfficeDispatch(shiftInstitutionalMemoryDate(firstDate, index)),
  );

  return dispatches.map((dispatch, index) => {
    const previous = dispatches[index - 1];
    const next = dispatches[index + 1];
    const previousReference = previous ? referenceFor(previous) : null;
    const nextReference = next ? referenceFor(next) : null;
    const postMortem = dispatch.sections.find((section) => section.label === "BAGHOLDER POST-MORTEM");

    const handoffNote = previous
      ? "The preceding file closed with “" + previous.disposition + "”. This issue routes the unfinished paperwork to " +
        dispatch.assignedDepartment + ". The connection is fictional editorial continuity, not evidence of a real event or causal chain."
      : "Opening entry in this selected window. The Department has inherited no earlier file in this register; the paperwork is already incomplete.";

    return {
      ...referenceFor(dispatch),
      bulletin: dispatch.bulletin,
      assignedDepartment: dispatch.assignedDepartment,
      disposition: dispatch.disposition,
      postMortem: postMortem?.body ?? dispatch.footer,
      predecessor: previousReference,
      successor: nextReference,
      handoffNote,
    };
  });
}
