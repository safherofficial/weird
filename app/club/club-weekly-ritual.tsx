"use client";

import { useEffect, useState } from "react";
import {
  PASSPORT_UPDATED_EVENT,
  readPassport,
  recordClubWeeklyChallenge,
  type PassportData,
} from "../passport/passport-store";
import { getCurrentClubWeeklyChallenge, type ClubWeeklyChallenge } from "./club-weekly";

export default function ClubWeeklyRitual() {
  const [challenge, setChallenge] = useState<ClubWeeklyChallenge | null>(null);
  const [passport, setPassport] = useState<PassportData | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [sessionFiled, setSessionFiled] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    function refresh() {
      const current = getCurrentClubWeeklyChallenge();
      setChallenge(current);
      const record = readPassport();
      setPassport(record);
      const saved = record?.clubWeeklyChallengeAnswers[current.weekKey];
      setSelected(saved === undefined ? null : saved);
      setSessionFiled(false);
    }

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(PASSPORT_UPDATED_EVENT, refresh);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(PASSPORT_UPDATED_EVENT, refresh);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  function fileWeeklyPosition() {
    if (!challenge || selected === null) return;
    const updated = recordClubWeeklyChallenge(challenge.weekKey, selected);
    if (updated) {
      setPassport(updated);
      setSessionFiled(false);
      setNotice("WEEKLY RESPONSE FILED TO YOUR LOCAL PASSPORT. THE DEPARTMENT ACKNOWLEDGES YOUR RETURN.");
      return;
    }
    setSessionFiled(true);
    setNotice("RESPONSE FILED FOR THIS SESSION ONLY. ENABLE YOUR OPTIONAL PASSPORT TO RECORD THIS WEEK'S RITUAL.");
  }

  if (!challenge) {
    return (
      <section className="club-weekly-ritual" aria-labelledby="club-weekly-title">
        <span>WEEKLY RITUAL / UTC ROTATION</span>
        <h3 id="club-weekly-title">THE WEEKLY TRENCHES FILE.</h3>
        <p>THE DEPARTMENT IS PREPARING THIS WEEK'S PAPERWORK.</p>
      </section>
    );
  }

  const savedAnswer = passport?.clubWeeklyChallengeAnswers[challenge.weekKey];
  const filed = savedAnswer !== undefined;

  return (
    <section className="club-weekly-ritual" aria-labelledby="club-weekly-title">
      <header className="club-weekly-ritual__header">
        <div>
          <span>RECURRING RITUAL / {challenge.weekKey} / WEEK {String(challenge.weekNumber).padStart(2, "0")}</span>
          <h3 id="club-weekly-title">THE WEEKLY <em>TRENCHES FILE.</em></h3>
          <p>One new case every UTC week. Return next week for a different file. Three different weeks earn a classified achievement.</p>
        </div>
        <div className="club-weekly-ritual__status">
          <strong>{Math.min(Object.keys(passport?.clubWeeklyChallengeAnswers ?? {}).length, 3)}<small>/3</small></strong>
          <span>WEEKLY<br />ATTENDANCE</span>
        </div>
      </header>

      <article className="club-weekly-ritual__case">
        <div className="club-weekly-ritual__case-top">
          <span>WEEKLY CASE / {challenge.weekKey}</span>
          <span>{filed ? "LOCAL FILED" : sessionFiled ? "SESSION FILED" : "OPEN FOR RESPONSE"}</span>
        </div>
        <p className="eyebrow">CURRENT DEPARTMENTAL REVIEW</p>
        <h4>{challenge.title}</h4>
        <strong className="club-weekly-ritual__prompt">{challenge.prompt}</strong>
        <p className="club-weekly-ritual__note">{challenge.note}</p>
        <div className="club-weekly-ritual__options" role="group" aria-label="Weekly challenge response options">
          {challenge.options.map((option, index) => (
            <button
              type="button"
              key={option.label}
              className={selected === index ? "is-selected" : ""}
              aria-pressed={selected === index}
              onClick={() => { setSelected(index); setNotice(""); }}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <strong>{option.label}</strong>
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="club-weekly-ritual__finding" aria-live="polite">
            <span>PROVISIONAL FINDING</span>
            <p>{challenge.options[selected].finding}</p>
          </div>
        )}
        <button className="club-weekly-ritual__file" type="button" disabled={selected === null} onClick={fileWeeklyPosition}>
          {filed ? "UPDATE THIS WEEK'S POSITION" : "FILE THIS WEEK'S POSITION"} <span>↗</span>
        </button>
      </article>
      {notice && <p className="audit-notice" role="status">{notice}</p>}
      <p className="club-weekly-ritual__disclaimer">THE ROTATION USES THE UTC CALENDAR WEEK. REPLACING A RESPONSE DOES NOT ADD AN EXTRA WEEK. WEEKLY ATTENDANCE IS STORED LOCALLY AND IS NOT A PUBLIC STREAK OR VERIFIED COMMUNITY COUNT.</p>
    </section>
  );
}
