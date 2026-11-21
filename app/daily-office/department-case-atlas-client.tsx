"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { selectDepartmentCaseAtlasWindow, type DepartmentCaseAtlasData } from "./case-atlas";
import type { DepartmentSection } from "../divisions";
import { getDepartmentCaseThemeAnchor } from "./case-theme-anchor";

type DepartmentCaseAtlasClientProps = {
  atlas: DepartmentCaseAtlasData;
};

const ATLAS_WINDOW_OPTIONS = [14, 30, 60, 90, 120] as const;
type AtlasWindowDays = (typeof ATLAS_WINDOW_OPTIONS)[number];

export default function DepartmentCaseAtlasClient({ atlas }: DepartmentCaseAtlasClientProps) {
  const [query, setQuery] = useState("");
  const [officeFilter, setOfficeFilter] = useState<DepartmentSection | "ALL">("ALL");
  const [windowDays, setWindowDays] = useState<AtlasWindowDays>(90);
  const selectedAtlas = useMemo(() => selectDepartmentCaseAtlasWindow(atlas, windowDays), [atlas, windowDays]);

  const visibleEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return selectedAtlas.entries.filter((entry) => {
      const officeMatch = officeFilter === "ALL" ||
        entry.offices.some((office) => office.section === officeFilter);
      const searchable = [
        entry.theme,
        entry.narrative,
        entry.precedent.title,
        entry.precedent.summary,
        entry.relic.title,
        entry.relic.description,
        ...entry.offices.flatMap((office) => [office.title, office.responsibility]),
      ].join(" ").toLowerCase();
      return officeMatch && (!normalized || searchable.includes(normalized));
    });
  }, [selectedAtlas.entries, officeFilter, query]);

  return (
    <div className="department-case-atlas">
      <section className="department-case-atlas__division-network" aria-labelledby="case-atlas-network-title">
        <div className="department-case-atlas__section-heading">
          <div>
            <span>INTER-DIVISION ROUTING / 10 OFFICES</span>
            <h2 id="case-atlas-network-title">THE DEPARTMENT NETWORK.</h2>
          </div>
          <p>Each office is connected to the fictional case themes it handles. Select a division to filter the registry below.</p>
        </div>
        <div className="department-case-atlas__division-grid">
          {atlas.divisions.map((division) => (
            <article className={"department-case-atlas__division" + (officeFilter === division.section ? " is-active" : "")} key={division.section}>
              <span>DIVISION / {division.number}</span>
              <strong>{division.title}</strong>
              <b>{String(division.themeCount).padStart(2, "0")} CONNECTED THEMES</b>
              <button
                type="button"
                aria-pressed={officeFilter === division.section}
                onClick={() => setOfficeFilter((current) => current === division.section ? "ALL" : division.section)}
              >
                {officeFilter === division.section ? "CLEAR FILTER" : "VIEW CASES"}
              </button>
              <Link href={division.href}>OPEN OFFICE ↗</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="department-case-atlas__registry" aria-labelledby="case-atlas-registry-title">
        <div className="department-case-atlas__section-heading">
          <div>
            <span>THEMATIC REGISTER / {atlas.entries.length} CASE THREADS / {windowDays} UTC-DAY WINDOW</span>
            <h2 id="case-atlas-registry-title">THE CASE ATLAS.</h2>
          </div>
          <p>Search the subject, the assigned responsibility, the precedent file or the museum object. All routes point to existing Department records.</p>
        </div>

        <div className="department-case-atlas__filters">
          <label>
            <span>SEARCH THE REGISTER</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try CTO, KOL, liquidity, wallet…"
            />
          </label>
          <label>
            <span>FILTER BY DIVISION</span>
            <select
              value={officeFilter}
              onChange={(event) => setOfficeFilter(event.target.value as DepartmentSection | "ALL")}
            >
              <option value="ALL">ALL TEN DIVISIONS</option>
              {atlas.divisions.map((division) => (
                <option value={division.section} key={division.section}>
                  {division.number} / {division.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>DATE WINDOW</span>
            <select
              aria-label="Select Atlas date window"
              value={windowDays}
              onChange={(event) => setWindowDays(Number(event.target.value) as AtlasWindowDays)}
            >
              {ATLAS_WINDOW_OPTIONS.map((days) => (
                <option value={days} key={days}>{days} UTC DAYS</option>
              ))}
            </select>
          </label>
          <p role="status" aria-live="polite">
            SHOWING {visibleEntries.length} OF {atlas.entries.length} CASE THREADS / {windowDays} UTC DAYS
          </p>
        </div>

        {selectedAtlas.comparisonWindow ? (
          <section className="department-case-atlas__comparison-window" aria-label="Matched period comparison">
            <span>MATCHED-PERIOD METHOD / NON-OVERLAPPING UTC WINDOWS</span>
            <div>
              <small>CURRENT WINDOW / {windowDays} DAYS</small>
              <strong>{selectedAtlas.comparisonWindow.currentStartDate} → {selectedAtlas.comparisonWindow.currentEndDate}</strong>
            </div>
            <div>
              <small>PREVIOUS WINDOW / {windowDays} DAYS</small>
              <strong>{selectedAtlas.comparisonWindow.previousStartDate} → {selectedAtlas.comparisonWindow.previousEndDate}</strong>
            </div>
            <p>The previous window ends one UTC day before the current window begins. Both periods contain the same number of date-seeded daily files.</p>
          </section>
        ) : null}

        {visibleEntries.length > 0 ? (
          <div className="department-case-atlas__case-grid">
            {visibleEntries.map((entry, index) => (
              <article
                className="department-case-atlas__case"
                key={entry.theme}
                id={"case-thread-" + getDepartmentCaseThemeAnchor(entry.theme)}
              >
                <div className="department-case-atlas__case-top">
                  <span>CASE THREAD / {String(index + 1).padStart(2, "0")}</span>
                  <span>{entry.occurrenceCount} / {selectedAtlas.lookbackDays} RECENT ISSUES</span>
                </div>
                <p className="department-case-atlas__theme-code">{entry.theme}</p>
                <h3>{entry.narrative}</h3>

                <div className="department-case-atlas__offices">
                  <span>RESPONSIBLE OFFICES / ROUTE OF THREE</span>
                  {entry.offices.map((office, officeIndex) => (
                    <div key={office.section}>
                      <b>{office.number} / {office.title}</b>
                      <p>{office.responsibility}</p>
                      <Link href={office.href}>OPEN DIVISION {officeIndex + 1} ↗</Link>
                    </div>
                  ))}
                </div>

                <div className="department-case-atlas__references">
                  <article>
                    <span>ARCHIVE PRECEDENT / {entry.precedent.accession}</span>
                    <strong>{entry.precedent.title}</strong>
                    <Link href={entry.precedent.href}>READ ARCHIVE FILE ↗</Link>
                  </article>
                  <article>
                    <span>MUSEUM OBJECT / {entry.relic.accession}</span>
                    <strong>{entry.relic.title}</strong>
                    <Link href={entry.relic.href}>OPEN EXHIBIT ↗</Link>
                  </article>
                </div>

                <div className="department-case-atlas__appearance">
                  {entry.latestOccurrence ? (
                    <>
                      <span>LATEST DATE-SEEDED APPEARANCE / {entry.latestOccurrence.issueDate} UTC</span>
                      <Link href={entry.latestOccurrence.href}>
                        {entry.latestOccurrence.reference} / OPEN DAILY FILE ↗
                      </Link>
                    </>
                  ) : (
                    <span>NO APPEARANCE IN THIS {selectedAtlas.lookbackDays}-DAY WINDOW / REFERENCE THREAD REMAINS IN THE REGISTER</span>
                  )}
                </div>

                <section className="department-case-atlas__recurrence" aria-label={"Recurrence profile for " + entry.theme}>
                  <div className="department-case-atlas__recurrence-heading">
                    <span>REPEAT-FILING PROFILE / {entry.recurrence.intervals.length} OBSERVED INTERVALS</span>
                  </div>
                  <div className="department-case-atlas__recurrence-grid">
                    <div>
                      <small>AGE OF LATEST FILE</small>
                      <strong>
                        {entry.recurrence.daysSinceLatest === null
                          ? "NO FILE IN WINDOW"
                          : entry.recurrence.daysSinceLatest === 0
                            ? "TODAY"
                            : entry.recurrence.daysSinceLatest + " DAYS"}
                      </strong>
                    </div>
                    <div>
                      <small>MOST RECENT GAP</small>
                      {entry.recurrence.previousOccurrence ? (
                        <>
                          <strong>{entry.recurrence.intervals[0]?.days} DAYS</strong>
                          <Link href={entry.recurrence.previousOccurrence.href}>
                            PRIOR FILE / {entry.recurrence.previousOccurrence.issueDate} ↗
                          </Link>
                        </>
                      ) : (
                        <strong>{entry.latestOccurrence ? "NO PRIOR FILE IN WINDOW" : "NO FILE IN WINDOW"}</strong>
                      )}
                    </div>
                    <div>
                      <small>MEAN GAP</small>
                      <strong>
                        {entry.recurrence.averageIntervalDays === null
                          ? "NOT CALCULABLE"
                          : entry.recurrence.averageIntervalDays.toFixed(1) + " DAYS"}
                      </strong>
                    </div>
                    <div>
                      <small>SHORTEST GAP</small>
                      <strong>
                        {entry.recurrence.shortestIntervalDays === null
                          ? "NOT RECORDED"
                          : entry.recurrence.shortestIntervalDays + " DAYS"}
                      </strong>
                    </div>
                    <div>
                      <small>LONGEST GAP</small>
                      <strong>
                        {entry.recurrence.longestIntervalDays === null
                          ? "NOT RECORDED"
                          : entry.recurrence.longestIntervalDays + " DAYS"}
                      </strong>
                    </div>
                  </div>
                  <p>GAPS ARE UTC DAY DIFFERENCES BETWEEN ADJACENT FICTIONAL FILES IN THIS WINDOW. DESCRIPTIVE ONLY; NO FORECAST OR REAL-WORLD INFERENCE.</p>
                </section>

                {entry.periodComparison ? (
                  <section className="department-case-atlas__period-comparison" aria-label={"Matched period activity for " + entry.theme}>
                    <span>THEME ACTIVITY / MATCHED WINDOW COMPARISON</span>
                    <div className="department-case-atlas__period-comparison-grid">
                      <div>
                        <small>PREVIOUS WINDOW</small>
                        <strong>{entry.periodComparison.previousWindowCount} FILES</strong>
                      </div>
                      <div>
                        <small>CURRENT WINDOW</small>
                        <strong>{entry.occurrenceCount} FILES</strong>
                      </div>
                      <div>
                        <small>NET CHANGE</small>
                        <strong className={"is-" + entry.periodComparison.direction}>
                          {entry.periodComparison.occurrenceDelta > 0 ? "+" : ""}{entry.periodComparison.occurrenceDelta} FILES
                        </strong>
                      </div>
                      <div>
                        <small>CHANGE VS PREVIOUS</small>
                        <strong className={"is-" + entry.periodComparison.direction}>
                          {entry.periodComparison.percentageChange === null
                            ? entry.periodComparison.direction === "new" ? "NEW" : "NOT CALCULABLE"
                            : (entry.periodComparison.percentageChange > 0 ? "+" : "") + entry.periodComparison.percentageChange.toFixed(1) + "%"}
                        </strong>
                      </div>
                    </div>
                    <p>
                      {entry.periodComparison.direction === "new"
                        ? "THIS THEME HAS APPEARED IN THE CURRENT WINDOW, BUT NOT IN THE PREVIOUS ONE."
                        : entry.periodComparison.direction === "unchanged"
                          ? "THE NUMBER OF FICTIONAL DAILY APPEARANCES IS UNCHANGED."
                          : entry.periodComparison.direction === "increase"
                            ? "MORE FICTIONAL DAILY APPEARANCES THAN IN THE MATCHED PREVIOUS WINDOW."
                            : "FEWER FICTIONAL DAILY APPEARANCES THAN IN THE MATCHED PREVIOUS WINDOW."}
                      {" "}DESCRIPTIVE COUNTS ONLY; NOT A MEASURE OF TOKEN PERFORMANCE OR MARKET MOMENTUM.
                    </p>
                  </section>
                ) : null}

                {entry.recurrence.intervals.length > 0 ? (
                  <details className="department-case-atlas__interval-ledger">
                    <summary>OPEN INTERVAL EVIDENCE / {entry.recurrence.intervals.length} ADJACENT PAIRS</summary>
                    <ol>
                      {entry.recurrence.intervals.map((interval, intervalIndex) => {
                        const newerOccurrence = entry.occurrences[intervalIndex];
                        const olderOccurrence = entry.occurrences[intervalIndex + 1];
                        return (
                          <li key={interval.newerIssueDate + "-" + interval.olderIssueDate}>
                            <strong>{String(intervalIndex + 1).padStart(2, "0")} / {interval.days} UTC DAYS</strong>
                            <div>
                              <span>NEWER DAILY FILE</span>
                              <Link href={newerOccurrence.href}>
                                {newerOccurrence.issueDate} / {newerOccurrence.reference} ↗
                              </Link>
                            </div>
                            <div>
                              <span>PREVIOUS DAILY FILE</span>
                              <Link href={olderOccurrence.href}>
                                {olderOccurrence.issueDate} / {olderOccurrence.reference} ↗
                              </Link>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </details>
                ) : (
                  <p className="department-case-atlas__interval-empty">
                    NO INTERVAL EVIDENCE / AT LEAST TWO APPEARANCES ARE REQUIRED TO MEASURE A GAP.
                  </p>
                )}

                {entry.occurrences.length > 0 ? (
                  <details className="department-case-atlas__timeline">
                    <summary>OPEN FULL THREAD HISTORY / {entry.occurrences.length} MATCHING FILES</summary>
                    <ol>
                      {entry.occurrences.map((occurrence, occurrenceIndex) => (
                        <li key={occurrence.issueDate}>
                          <span>{String(occurrenceIndex + 1).padStart(2, "0")}</span>
                          <time dateTime={occurrence.issueDate}>{occurrence.issueDate} / UTC</time>
                          <Link href={occurrence.href}>
                            {occurrence.reference} / {occurrence.headline} ↗
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </details>
                ) : (
                  <p className="department-case-atlas__timeline-empty">
                    NO HISTORICAL APPEARANCES TO OPEN / REFERENCE THREAD REMAINS IN THE REGISTER.
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="department-case-atlas__empty">
            <strong>NO MATCHING CASE THREAD FOUND.</strong>
            <p>Change the search or clear the division filter. The register has not deleted the file.</p>
            <button type="button" onClick={() => { setQuery(""); setOfficeFilter("ALL"); }}>
              CLEAR SEARCH AND FILTER
            </button>
          </div>
        )}
      </section>
      <p className="department-case-atlas__notice">
        FICTIONAL EDITORIAL INDEX / THE SELECTED WINDOW COUNTS REFER ONLY TO DATE-SEEDED DAILY THEMES. NO LIVE TOKENS,
        WALLETS, ACCOUNTS, PEOPLE OR MARKET EVENTS ARE TRACKED.
      </p>
    </div>
  );
}
