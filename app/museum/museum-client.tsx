"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { exhibits, museumCategories, searchExhibits } from "./museum-data";

export default function MuseumClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const filtered = useMemo(() => searchExhibits(query, category), [query, category]);

  return (
    <section className="museum-gallery" aria-label="Bagholder Museum exhibition gallery">
      <div className="museum-gallery__toolbar">
        <label className="museum-search">
          <span>SEARCH THE COLLECTION</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="TRY: LIQUIDITY, ROADMAP, TELEGRAM..."
          />
        </label>
        <div className="museum-filters" aria-label="Filter exhibits by category">
          {museumCategories.map((item) => (
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

      <div className="museum-gallery__summary" aria-live="polite">
        <span>COLLECTION INDEX / {String(filtered.length).padStart(2, "0")} EXHIBITS FOUND</span>
        <span>ALL ITEMS / FICTIONAL / NON-TRANSFERABLE</span>
      </div>

      {filtered.length ? (
        <div className="museum-grid">
          {filtered.map((exhibit) => (
            <article className="museum-card" key={exhibit.slug}>
              <div className="museum-card__visual">
                <span>{exhibit.accession}</span>
                <b aria-hidden="true">{exhibit.accession.slice(-3)}</b>
                <small>{exhibit.category}</small>
              </div>
              <div className="museum-card__body">
                <div className="museum-card__meta">
                  <span>{exhibit.era}</span>
                  <span>{exhibit.condition}</span>
                </div>
                <h2>{exhibit.title}</h2>
                <p>{exhibit.description}</p>
                <div className="museum-card__plaque">“{exhibit.plaque}”</div>
                <Link href={"/museum/exhibits/" + exhibit.slug}>
                  VIEW EXHIBIT <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="museum-empty">
          <span>NO MATCHING SPECIMEN FOUND.</span>
          <p>The archive has been searched. The Department suggests trying fewer buzzwords.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("ALL"); }}>RESET THE SEARCH ↺</button>
        </div>
      )}
    </section>
  );
}
