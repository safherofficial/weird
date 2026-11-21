"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { DepartmentCaseAtlasData, DepartmentSection } from "./case-atlas";

type DepartmentCaseAtlasClientProps = {
  atlas: DepartmentCaseAtlasData;
};

export default function DepartmentCaseAtlasClient({ atlas }: DepartmentCaseAtlasClientProps) {
  const [query, setQuery] = useState("");
  const [officeFilter, setOfficeFilter] = useState<DepartmentSection | "ALL">("ALL");

  const visibleEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return atlas.entries.filter((entry) => {
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
  }, [atlas.entries, officeFilter, query]);

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
            <span>THEMATIC REGISTER / {atlas.entries.length} CASE THREADS</span>
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
          <p role="status" aria-live="polite">
            SHOWING {visibleEntries.length} OF {atlas.entries.length} CASE THREADS
          </p>
        </div>

        {visibleEntries.length > 0 ? (
          <div className="department-case-atlas__case-grid">
            {visibleEntries.map((entry, index) => (
              <article className="department-case-atlas__case" key={entry.theme}>
                <div className="department-case-atlas__case-top">
                  <span>CASE THREAD / {String(index + 1).padStart(2, "0")}</span>
                  <span>{entry.occurrenceCount} / {atlas.lookbackDays} RECENT ISSUES</span>
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
                    <span>NO APPEARANCE IN THIS {atlas.lookbackDays}-DAY WINDOW / REFERENCE THREAD REMAINS IN THE REGISTER</span>
                  )}
                </div>
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
        FICTIONAL EDITORIAL INDEX / THE 90-DAY COUNTS REFER ONLY TO DATE-SEEDED DAILY THEMES. NO LIVE TOKENS,
        WALLETS, ACCOUNTS, PEOPLE OR MARKET EVENTS ARE TRACKED.
      </p>
    </div>
  );
}
