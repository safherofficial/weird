"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { archiveCategories, archiveRecords, filterArchiveRecords } from "./archive-data";

export default function ArchivesClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL FILES");
  const records = useMemo(() => filterArchiveRecords(query, category), [query, category]);

  return (
    <section className="archives-library" aria-label="Department archives library">
      <div className="archives-library__toolbar">
        <label className="archives-search">
          <span>SEARCH THE RECORDS</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="TRY: BRIDGE, AIRDROP, UNLOCKS, QUORUM..."
          />
        </label>
        <div className="archives-categories" role="group" aria-label="Filter archive category">
          {archiveCategories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "is-active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="archives-library__summary" aria-live="polite">
        <span>REGISTER SEARCH / {String(records.length).padStart(2, "0")} FILES LOCATED</span>
        <span>COLLECTION TOTAL / {String(archiveRecords.length).padStart(2, "0")}</span>
      </div>

      {records.length ? (
        <div className="archives-grid">
          {records.map((record) => (
            <article className="archives-card" key={record.slug}>
              <div className="archives-card__top">
                <span>{record.accession}</span>
                <span>{record.clearance}</span>
              </div>
              <div className="archives-card__visual">
                <span>{record.category}</span>
                <b>{record.accession.slice(-3)}</b>
                <small>OFFICIAL RECORD / FICTIONAL</small>
              </div>
              <div className="archives-card__body">
                <div className="archives-card__department">{record.department}</div>
                <h2>{record.title}</h2>
                <p>{record.summary}</p>
                <div className="archives-card__finding">
                  <span>DEPARTMENTAL FINDING</span>
                  <strong>{record.finding}</strong>
                </div>
                <Link href={"/archives/records/" + record.slug}>
                  OPEN FILE <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="archives-empty">
          <span>NO RECORDS MATCH THE SEARCH.</span>
          <p>The filing cabinet has been checked. Try another word or restore the full archive.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("ALL FILES"); }}>RESET ARCHIVE SEARCH ↺</button>
        </div>
      )}
    </section>
  );
}
