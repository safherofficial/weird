import { archiveRecords } from "../archives/archive-data";
import { departments, type DepartmentSection } from "../divisions";
import { exhibits } from "../museum/museum-data";
import { departmentCaseThreads } from "../lib/department-narrative";
import { buildDailyOfficeDispatch } from "./daily-engine";
import { isValidInstitutionalMemoryDate, shiftInstitutionalMemoryDate } from "./institutional-memory";

export type DepartmentCaseAtlasOffice = {
  section: DepartmentSection;
  number: string;
  title: string;
  href: string;
  responsibility: string;
};

export type DepartmentCaseAtlasOccurrence = {
  issueDate: string;
  reference: string;
  headline: string;
  href: string;
};

export type DepartmentCaseAtlasInterval = {
  newerIssueDate: string;
  olderIssueDate: string;
  days: number;
};

export type DepartmentCaseAtlasRecurrence = {
  daysSinceLatest: number | null;
  previousOccurrence: DepartmentCaseAtlasOccurrence | null;
  intervals: DepartmentCaseAtlasInterval[];
  averageIntervalDays: number | null;
  shortestIntervalDays: number | null;
  longestIntervalDays: number | null;
};

export type DepartmentCaseAtlasEntry = {
  theme: string;
  narrative: string;
  offices: DepartmentCaseAtlasOffice[];
  precedent: {
    accession: string;
    title: string;
    summary: string;
    href: string;
  };
  relic: {
    accession: string;
    title: string;
    description: string;
    href: string;
  };
  occurrenceCount: number;
  latestOccurrence: DepartmentCaseAtlasOccurrence | null;
  occurrences: DepartmentCaseAtlasOccurrence[];
  recurrence: DepartmentCaseAtlasRecurrence;
};

export type DepartmentCaseAtlasData = {
  asOfDate: string;
  lookbackDays: number;
  entries: DepartmentCaseAtlasEntry[];
  divisions: Array<{
    section: DepartmentSection;
    number: string;
    title: string;
    href: string;
    themeCount: number;
    themes: string[];
  }>;
};

export type DepartmentCaseReferenceSource = "archive" | "museum";

export type DepartmentCaseReference = {
  theme: string;
  anchor: string;
  narrative: string;
  offices: Array<{
    number: string;
    title: string;
    href: string;
    section: DepartmentSection;
  }>;
  counterpart: {
    label: string;
    accession: string;
    title: string;
    href: string;
  };
};

import { getDepartmentCaseThemeAnchor } from "./case-theme-anchor";

export function getDepartmentCaseReferences(
  source: DepartmentCaseReferenceSource,
  slug: string,
): DepartmentCaseReference[] {
  return Object.entries(departmentCaseThreads)
    .filter(([, thread]) => source === "archive" ? thread.archiveSlug === slug : thread.exhibitSlug === slug)
    .map(([theme, thread]) => {
      const offices = thread.offices.map((step) => {
        const department = departments.find((item) => item.section === step.section);
        if (!department) {
          throw new Error("A case reference contains an unknown Department office for " + theme + ".");
        }
        return {
          number: department.number,
          title: department.title,
          href: department.href,
          section: department.section,
        };
      });

      if (source === "archive") {
        const counterpart = exhibits.find((exhibit) => exhibit.slug === thread.exhibitSlug);
        if (!counterpart) {
          throw new Error("A case reference contains a missing Museum counterpart for " + theme + ".");
        }
        return {
          theme,
          anchor: "case-thread-" + getDepartmentCaseThemeAnchor(theme),
          narrative: thread.narrative,
          offices,
          counterpart: {
            label: "RELATED MUSEUM OBJECT",
            accession: counterpart.accession,
            title: counterpart.title,
            href: "/museum/exhibits/" + counterpart.slug,
          },
        };
      }

      const counterpart = archiveRecords.find((record) => record.slug === thread.archiveSlug);
      if (!counterpart) {
        throw new Error("A case reference contains a missing archive counterpart for " + theme + ".");
      }
      return {
        theme,
        anchor: "case-thread-" + getDepartmentCaseThemeAnchor(theme),
        narrative: thread.narrative,
        offices,
        counterpart: {
          label: "RELATED ARCHIVE PRECEDENT",
          accession: counterpart.accession,
          title: counterpart.title,
          href: "/archives/records/" + counterpart.slug,
        },
      };
    });
}

function dailyRecordHref(issueDate: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return issueDate === today ? "/daily-office" : "/daily-office/archive/" + issueDate;
}

function utcDayDistance(newerDate: string, olderDate: string): number {
  const newer = Date.parse(newerDate + "T00:00:00.000Z");
  const older = Date.parse(olderDate + "T00:00:00.000Z");
  return Math.round((newer - older) / 86400000);
}

export function buildDepartmentCaseAtlas(asOfDate: string, lookbackDays = 90): DepartmentCaseAtlasData {
  if (!isValidInstitutionalMemoryDate(asOfDate)) {
    throw new Error("The Case Atlas requires a valid current or past UTC issue date.");
  }
  if (!Number.isInteger(lookbackDays) || lookbackDays < 1 || lookbackDays > 120) {
    throw new Error("The Case Atlas lookback window must contain between 1 and 120 UTC days.");
  }

  const appearances = new Map<string, {
    count: number;
    latest: DepartmentCaseAtlasOccurrence | null;
    occurrences: DepartmentCaseAtlasOccurrence[];
  }>();
  for (let offset = 0; offset < lookbackDays; offset += 1) {
    const issueDate = shiftInstitutionalMemoryDate(asOfDate, -offset);
    const dispatch = buildDailyOfficeDispatch(issueDate);
    const existing = appearances.get(dispatch.caseTheme);
    const occurrence: DepartmentCaseAtlasOccurrence = {
      issueDate: dispatch.issueDate,
      reference: dispatch.reference,
      headline: dispatch.headline,
      href: dailyRecordHref(dispatch.issueDate),
    };

    if (existing) {
      existing.count += 1;
      existing.occurrences.push(occurrence);
    } else {
      appearances.set(dispatch.caseTheme, {
        count: 1,
        latest: occurrence,
        occurrences: [occurrence],
      });
    }
  }

  const entries: DepartmentCaseAtlasEntry[] = Object.entries(departmentCaseThreads).map(([theme, thread]) => {
    const precedent = archiveRecords.find((record) => record.slug === thread.archiveSlug);
    const relic = exhibits.find((exhibit) => exhibit.slug === thread.exhibitSlug);
    if (!precedent || !relic) {
      throw new Error("The Case Atlas contains a missing archive precedent or museum exhibit for " + theme + ".");
    }

    const offices = thread.offices.map((step) => {
      const department = departments.find((item) => item.section === step.section);
      if (!department) {
        throw new Error("The Case Atlas contains an unknown Department office for " + theme + ".");
      }
      return {
        section: department.section,
        number: department.number,
        title: department.title,
        href: department.href,
        responsibility: step.responsibility,
      };
    });

    const appearance = appearances.get(theme);
    const occurrences = appearance?.occurrences ?? [];
    const intervals: DepartmentCaseAtlasInterval[] = occurrences.slice(1).map((olderOccurrence, index) => ({
      newerIssueDate: occurrences[index].issueDate,
      olderIssueDate: olderOccurrence.issueDate,
      days: utcDayDistance(occurrences[index].issueDate, olderOccurrence.issueDate),
    }));
    const intervalValues = intervals.map((interval) => interval.days);
    const latestOccurrence = occurrences[0] ?? null;

    return {
      theme,
      narrative: thread.narrative,
      offices,
      precedent: {
        accession: precedent.accession,
        title: precedent.title,
        summary: precedent.summary,
        href: "/archives/records/" + precedent.slug,
      },
      relic: {
        accession: relic.accession,
        title: relic.title,
        description: relic.description,
        href: "/museum/exhibits/" + relic.slug,
      },
      occurrenceCount: appearance?.count ?? 0,
      latestOccurrence,
      occurrences,
      recurrence: {
        daysSinceLatest: latestOccurrence ? utcDayDistance(asOfDate, latestOccurrence.issueDate) : null,
        previousOccurrence: occurrences[1] ?? null,
        intervals,
        averageIntervalDays: intervalValues.length ? intervalValues.reduce((sum, days) => sum + days, 0) / intervalValues.length : null,
        shortestIntervalDays: intervalValues.length ? Math.min(...intervalValues) : null,
        longestIntervalDays: intervalValues.length ? Math.max(...intervalValues) : null,
      },
    };
  });

  const divisions = departments.map((department) => {
    const related = entries.filter((entry) =>
      entry.offices.some((office) => office.section === department.section),
    );
    return {
      section: department.section,
      number: department.number,
      title: department.title,
      href: department.href,
      themeCount: related.length,
      themes: related.map((entry) => entry.theme),
    };
  });

  return { asOfDate, lookbackDays, entries, divisions };
}

export function selectDepartmentCaseAtlasWindow(
  atlas: DepartmentCaseAtlasData,
  lookbackDays: number,
): DepartmentCaseAtlasData {
  if (!isValidInstitutionalMemoryDate(atlas.asOfDate)) {
    throw new Error("A valid current or past UTC Atlas date is required.");
  }
  if (!Number.isInteger(lookbackDays) || lookbackDays < 1 || lookbackDays > atlas.lookbackDays) {
    throw new Error("The selected Atlas window must fit within the available UTC history.");
  }

  const firstDate = shiftInstitutionalMemoryDate(atlas.asOfDate, -(lookbackDays - 1));
  const entries = atlas.entries.map((entry) => {
    const occurrences = entry.occurrences.filter((occurrence) =>
      occurrence.issueDate >= firstDate && occurrence.issueDate <= atlas.asOfDate,
    );
    const intervals: DepartmentCaseAtlasInterval[] = occurrences.slice(1).map((olderOccurrence, index) => ({
      newerIssueDate: occurrences[index].issueDate,
      olderIssueDate: olderOccurrence.issueDate,
      days: utcDayDistance(occurrences[index].issueDate, olderOccurrence.issueDate),
    }));
    const intervalValues = intervals.map((interval) => interval.days);
    const latestOccurrence = occurrences[0] ?? null;

    return {
      ...entry,
      occurrenceCount: occurrences.length,
      latestOccurrence,
      occurrences,
      recurrence: {
        daysSinceLatest: latestOccurrence ? utcDayDistance(atlas.asOfDate, latestOccurrence.issueDate) : null,
        previousOccurrence: occurrences[1] ?? null,
        intervals,
        averageIntervalDays: intervalValues.length
          ? intervalValues.reduce((sum, days) => sum + days, 0) / intervalValues.length
          : null,
        shortestIntervalDays: intervalValues.length ? Math.min(...intervalValues) : null,
        longestIntervalDays: intervalValues.length ? Math.max(...intervalValues) : null,
      },
    };
  });

  return { ...atlas, lookbackDays, entries };
}
