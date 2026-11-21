"use client";

import { useMemo, useState } from "react";
import {
  CLUB_CULTURE_CATEGORIES,
  CLUB_CULTURE_POSTS,
  type ClubCultureCategory,
  type ClubCulturePost,
} from "./club-culture";

type Filter = "ALL" | ClubCultureCategory;

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Use the compatibility fallback below.
    }
  }

  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.setAttribute("aria-hidden", "true");
  field.style.position = "fixed";
  field.style.opacity = "0";
  field.style.pointerEvents = "none";
  document.body.appendChild(field);
  field.focus();
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  if (!copied) throw new Error("Clipboard access is unavailable.");
}

export default function ClubCultureDesk() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [copiedId, setCopiedId] = useState("");
  const [notice, setNotice] = useState("");

  const visiblePosts = useMemo(
    () => filter === "ALL"
      ? CLUB_CULTURE_POSTS
      : CLUB_CULTURE_POSTS.filter((post) => post.category === filter),
    [filter],
  );

  async function copyPost(post: ClubCulturePost) {
    try {
      await copyText(post.copy);
      setCopiedId(post.id);
      setNotice("POST COPY READY. THE DEPARTMENT HAS NOT PRESSED PUBLISH FOR YOU.");
    } catch {
      setNotice("COPY UNAVAILABLE. SELECT THE POST TEXT AND COPY IT MANUALLY.");
    }
  }

  async function copyPrompt(post: ClubCulturePost) {
    try {
      await copyText(post.replyPrompt);
      setNotice("REPLY PROMPT COPIED. THE COMMENTS SECTION IS NOW YOUR RESPONSIBILITY.");
    } catch {
      setNotice("COPY UNAVAILABLE. SELECT THE PROMPT AND COPY IT MANUALLY.");
    }
  }

  function postToX(post: ClubCulturePost) {
    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", post.copy);
    intent.searchParams.set("url", new URL("/club", window.location.origin).toString());
    window.open(intent.toString(), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="club-culture-desk" aria-labelledby="club-culture-title">
      <header className="club-culture-desk__header">
        <div>
          <span>THE 99% CLUB / COMMUNITY CULTURE DESK</span>
          <h2 id="club-culture-title">THE CONTENT <em>DEPARTMENT.</em></h2>
          <p>Recurring formats for the investor who did the research, knows the market and has already identified the next opportunity to be right about.</p>
        </div>
        <div className="club-culture-desk__count">
          <strong>{CLUB_CULTURE_POSTS.length.toString().padStart(2, "0")}</strong>
          <span>READY-TO-EDIT<br />POST FILES</span>
        </div>
      </header>

      <div className="club-culture-desk__filters" role="group" aria-label="Filter content formats">
        <button type="button" className={filter === "ALL" ? "is-active" : ""} aria-pressed={filter === "ALL"} onClick={() => { setFilter("ALL"); setNotice(""); }}>ALL FORMATS</button>
        {CLUB_CULTURE_CATEGORIES.map((category) => (
          <button type="button" key={category} className={filter === category ? "is-active" : ""} aria-pressed={filter === category} onClick={() => { setFilter(category); setNotice(""); }}>
            {category}
          </button>
        ))}
      </div>

      <div className="club-culture-desk__grid">
        {visiblePosts.map((post, index) => (
          <article className="club-culture-card" key={post.id}>
            <div className="club-culture-card__topline">
              <span>{post.category}</span>
              <span>FILE / {String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>{post.title}</h3>
            <p className="club-culture-card__angle">{post.angle}</p>
            <blockquote>{post.copy}</blockquote>
            <div className="club-culture-card__reply">
              <span>REPLY PROMPT</span>
              <p>{post.replyPrompt}</p>
            </div>
            <div className="club-culture-card__meta">{post.copy.length} CHARACTERS / X POST DRAFT</div>
            <div className="club-culture-card__actions">
              <button type="button" className="button button--primary" onClick={() => void copyPost(post)}>
                {copiedId === post.id ? "COPIED ✓" : "COPY POST"}
              </button>
              <button type="button" className="button button--x" onClick={() => postToX(post)}>OPEN IN X ↗</button>
              <button type="button" className="button button--quiet" onClick={() => void copyPrompt(post)}>COPY REPLY PROMPT</button>
            </div>
          </article>
        ))}
      </div>

      {notice && <p className="audit-notice" role="status" aria-live="polite">{notice}</p>}
      <p className="club-culture-desk__disclaimer">STATIC EDITORIAL TEMPLATES. NOTHING IS AUTO-POSTED, TRACKED OR STORED ON A SERVER. EDIT EVERY DRAFT TO MATCH YOUR OWN VOICE. SATIRE ONLY — NO PROMISE OF REACH OR ENGAGEMENT.</p>
    </section>
  );
}
