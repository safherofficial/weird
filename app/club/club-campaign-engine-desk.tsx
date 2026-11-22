"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  buildClubCampaignPack,
  getClubCampaignSchedule,
  type ClubCampaignSchedule,
} from "./club-campaign-engine";

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Continue to the browser compatibility fallback.
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

function formatUtcDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(value + "T00:00:00.000Z")).toUpperCase();
}

export default function ClubCampaignEngineDesk() {
  const [schedule, setSchedule] = useState<ClubCampaignSchedule | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setSchedule(getClubCampaignSchedule(new Date()));
  }, []);

  async function copyFullPack() {
    if (!schedule) return;
    try {
      await copyText(buildClubCampaignPack(schedule.current));
      setNotice("FULL CAMPAIGN KIT COPIED. THE DEPARTMENT HAS NOT PRESSED PUBLISH.");
    } catch {
      setNotice("COPY UNAVAILABLE. SELECT THE CAMPAIGN KIT AND COPY IT MANUALLY.");
    }
  }

  async function copyMainPost() {
    if (!schedule) return;
    try {
      await copyText(schedule.current.xPost);
      setNotice("MAIN CAMPAIGN POST COPIED. EDIT IT BEFORE PUBLISHING.");
    } catch {
      setNotice("COPY UNAVAILABLE. SELECT THE POST TEXT AND COPY IT MANUALLY.");
    }
  }

  function openMainPostOnX() {
    if (!schedule) return;
    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", schedule.current.xPost);
    intent.searchParams.set("url", new URL("/club#club-campaign-engine", window.location.origin).toString());
    window.open(intent.toString(), "_blank", "noopener,noreferrer");
    setNotice("X DRAFT OPENED. REVIEW THE COPY AND PUBLISH IT YOURSELF.");
  }

  return (
    <section className="club-campaign-engine" id="club-campaign-engine" aria-labelledby="club-campaign-engine-title">
      <header className="club-campaign-engine__header">
        <div>
          <span>THE 99% CLUB / U28.9 CAMPAIGN ENGINE</span>
          <h2 id="club-campaign-engine-title">ONE WEEK.<br /><em>ONE SHARED EXCUSE.</em></h2>
          <p>A rotating campaign brief connects one editorial post, one meme format and one public challenge. The weekly drop is selected from the UTC calendar, so everyone sees the same theme.</p>
        </div>
        <div className="club-campaign-engine__seal"><strong>WEEKLY</strong><span>CAMPAIGN<br />CYCLE</span></div>
      </header>

      {schedule ? (
        <>
          <div className="club-campaign-engine__current">
            <div className="club-campaign-engine__current-topline">
              <span>ACTIVE CAMPAIGN / {schedule.current.weekKey}</span>
              <span>{formatUtcDate(schedule.current.weekStarts)} — {formatUtcDate(schedule.current.weekEnds)} UTC</span>
            </div>
            <h3>{schedule.current.theme.title}</h3>
            <p>{schedule.current.theme.brief}</p>
          </div>

          <div className="club-campaign-engine__assets">
            <article>
              <span>01 / EDITORIAL POST</span>
              <h4>{schedule.current.culturePost.title}</h4>
              <blockquote>{schedule.current.xPost}</blockquote>
              <small>{schedule.current.xPost.length} CHARACTERS / X DRAFT</small>
              <button type="button" className="button button--quiet" onClick={() => void copyMainPost()}>COPY MAIN POST</button>
            </article>
            <article>
              <span>02 / MEME FORMAT</span>
              <h4>{schedule.current.memeTemplate.name}</h4>
              <div className="club-campaign-engine__meme-copy">
                <strong>{schedule.current.memeTemplate.topText}</strong>
                <i>↓</i>
                <strong>{schedule.current.memeTemplate.bottomText}</strong>
              </div>
              <p>{schedule.current.memeTemplate.caption}</p>
              <Link className="button button--quiet" href="#club-meme-studio">OPEN MEME OFFICE ↗</Link>
            </article>
            <article>
              <span>03 / PUBLIC CHALLENGE</span>
              <h4>{schedule.current.challenge.title}</h4>
              <p>{schedule.current.challenge.brief}</p>
              <blockquote>{schedule.current.challenge.prompt}</blockquote>
              <Link className="button button--quiet" href="#club-challenge-board">OPEN CHALLENGE BOARD ↗</Link>
            </article>
          </div>

          <div className="club-campaign-engine__actions">
            <button type="button" className="button button--primary" onClick={() => void copyFullPack()}>COPY FULL CAMPAIGN KIT ↓</button>
            <button type="button" className="button button--x" onClick={openMainPostOnX}>OPEN MAIN POST ON X ↗</button>
          </div>

          <div className="club-campaign-engine__next" role="group" aria-label="Next week campaign preview">
            <span>NEXT WEEK / {schedule.next.weekKey}</span>
            <strong>{schedule.next.theme.title}</strong>
            <p>{schedule.next.theme.brief}</p>
          </div>
        </>
      ) : (
        <p className="club-campaign-engine__loading" role="status">ALIGNING THE WEEKLY CAMPAIGN FILE…</p>
      )}

      {notice && <p className="audit-notice" role="status" aria-live="polite">{notice}</p>}
      <p className="club-campaign-engine__disclaimer">A STATIC, DATE-ROTATED CONTENT SYSTEM. NO DATABASE, ACCOUNT, TRACKING, SERVER STORAGE OR AUTO-POSTING. X OPENS A DRAFT ONLY. THE CAMPAIGN ROTATION IS EDITORIAL SATIRE, NOT A MARKET SIGNAL OR FINANCIAL ADVICE.</p>
    </section>
  );
}
