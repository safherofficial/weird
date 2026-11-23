"use server";

import Link from "next/link";
import { archiveRecords } from "../archives/archive-data";
import { departments } from "../divisions";
import { departmentCaseThreads } from "../lib/department-narrative";
import { exhibits } from "../museum/museum-data";
import { getDepartmentCaseThemeAnchor } from "./case-theme-anchor";
import { getPreviousDailyOfficeFocusIssue, type DailyOfficeDispatch } from "./daily-engine";
import styles from "./daily-office-related-links.module.css";

type DailyOfficeRelatedLinksProps = {
  dispatch: DailyOfficeDispatch;
};

export default function DailyOfficeRelatedLinks({ dispatch }: DailyOfficeRelatedLinksProps) {
  const thread = departmentCaseThreads[dispatch.caseTheme];
  if (!thread) {
    throw new Error("The daily dispatch is missing its cross-division case thread.");
  }

  const precedent = archiveRecords.find((record) => record.slug === thread.archiveSlug);
  const relic = exhibits.find((exhibit) => exhibit.slug === thread.exhibitSlug);
  if (!precedent || !relic) {
    throw new Error("The daily dispatch references a missing archive or Museum counterpart.");
  }

  const offices = thread.offices.map((step) => {
    const office = departments.find((item) => item.section === step.section);
    if (!office) {
      throw new Error("The daily dispatch references an unknown Department office.");
    }
    return office;
  });

  const previousIssue = getPreviousDailyOfficeFocusIssue(dispatch.issueDate);
  const atlasHref = "/daily-office/atlas#case-thread-" + getDepartmentCaseThemeAnchor(dispatch.caseTheme);

  return (
    <section className={styles.related} aria-labelledby="daily-office-related-title">
      <header className={styles.header}>
        <div>
          <span>CASE ROUTING / EDITORIAL CROSS-REFERENCES</span>
          <h2 id="daily-office-related-title">FOLLOW THE FILE.</h2>
        </div>
        <strong className={styles.focus}>{dispatch.focusType.toUpperCase()} FOCUS</strong>
      </header>

      <div className={styles.cards}>
        {previousIssue ? (
          <Link className={styles.card} href={previousIssue.href}>
            <span>PREVIOUS ISSUE / SAME FOCUS</span>
            <strong>{previousIssue.reference}</strong>
            <b>{previousIssue.caseTheme}</b>
            <p>{previousIssue.headline}</p>
            <small>OPEN RELATED UTC FILE ↗</small>
          </Link>
        ) : (
          <article className={styles.card}>
            <span>PREVIOUS ISSUE / SAME FOCUS</span>
            <strong>NO MATCH IN LOOKBACK WINDOW</strong>
            <p>No earlier file in this editorial family was found inside the bounded 240-day window.</p>
          </article>
        )}

        <Link className={styles.card} href={atlasHref}>
          <span>THEMATIC REFERENCE</span>
          <strong>DEPARTMENT CASE ATLAS</strong>
          <b>{dispatch.caseTheme}</b>
          <p>Inspect the exact theme thread, its three offices, recurrence and dated evidence.</p>
          <small>OPEN THIS ATLAS ENTRY ↗</small>
        </Link>

        <Link className={styles.card} href={"/archives/records/" + precedent.slug}>
          <span>ARCHIVE PRECEDENT / {precedent.accession}</span>
          <strong>{precedent.title}</strong>
          <p>{precedent.summary}</p>
          <small>READ THE PREVIOUS CASE ↗</small>
        </Link>

        <Link className={styles.card} href={"/museum/exhibits/" + relic.slug}>
          <span>MUSEUM OBJECT / {relic.accession}</span>
          <strong>{relic.title}</strong>
          <p>{relic.description}</p>
          <small>OPEN THE PRESERVED RELIC ↗</small>
        </Link>
      </div>

      <div className={styles.route}>
        <span>THREE-OFFICE HANDOFF / {dispatch.reference}</span>
        <div>
          {offices.map((office, index) => (
            <Link href={office.href} key={office.section}>
              <small>0{index + 1} / OFFICE</small>
              <strong>{office.title}</strong>
              <b>OPEN DIVISION ↗</b>
            </Link>
          ))}
        </div>
      </div>

      <p className={styles.note}>
        FICTIONAL EDITORIAL CONTINUITY ONLY. THESE LINKS CONNECT SYNTHETIC CASE FILES, NOT REAL PROJECTS OR MARKET EVENTS.
      </p>
    </section>
  );
}
