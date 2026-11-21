"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AchievementEmblem from "../passport/achievement-emblem";
import {
  PASSPORT_UPDATED_EVENT,
  getPassportAchievementStatuses,
  readPassport,
  recordClubChallenge,
  type ClubChallengeId,
  type PassportData,
} from "../passport/passport-store";

type Challenge = {
  id: ClubChallengeId;
  reference: string;
  title: string;
  prompt: string;
  note: string;
  options: { label: string; finding: string }[];
};

const challenges: readonly Challenge[] = [
  {
    id: "fault-allocation",
    reference: "99C / 01",
    title: "FAULT ALLOCATION",
    prompt: "THE TOKEN IS DOWN 96%. WHO SHOULD THE DEPARTMENT HOLD RESPONSIBLE?",
    note: "A fictional post-mortem. Select the explanation you would like entered into the official record.",
    options: [
      { label: "THE MARKET MAKERS HUNTED MY ENTRY.", finding: "LIABILITY TRANSFERRED TO MARKET CONDITIONS. PERSONAL CONVICTION REMAINS UNCHANGED." },
      { label: "THE TIMELINE WAS TOO EARLY TO UNDERSTAND THE THESIS.", finding: "THE DEPARTMENT HAS CLASSIFIED THE LOSS AS A TEMPORARY COMMUNICATION FAILURE." },
      { label: "THE LIQUIDITY LEFT BEFORE THE NARRATIVE WAS FINISHED.", finding: "THE EXIT HAS BEEN REFRAMED AS AN UNEXPECTED COMMUNITY-LED DISTRIBUTION EVENT." },
    ],
  },
  {
    id: "next-entry",
    reference: "99C / 02",
    title: "THE NEXT ENTRY",
    prompt: "A NEW TICKER HAS APPEARED. YOUR LAST THESIS IS STILL UNDER REVIEW. WHAT HAPPENS NEXT?",
    note: "The Department recognizes no cooling-off period in this fictional exercise.",
    options: [
      { label: "NEW TICKER. SAME CONVICTION. THIS ONE IS MINE.", finding: "FORWARD CONVICTION REGISTERED. THE PREVIOUS CASE HAS NOT BEEN CLOSED." },
      { label: "I HAVE LEARNED FROM THE LAST ONE. I WILL RESEARCH TWICE AS HARD.", finding: "RESEARCH HOURS DOUBLED. POSITION-SIZING EVIDENCE NOT REQUESTED." },
      { label: "I AM STILL EARLY. THE MARKET HAS NOT CAUGHT UP.", finding: "THE DEPARTMENT HAS EXTENDED THE DEFINITION OF 'EARLY' INDEFINITELY." },
    ],
  },
  {
    id: "research-receipt",
    reference: "99C / 03",
    title: "THE DYOR RECEIPT",
    prompt: "THE DEPARTMENT REQUESTS PROOF OF YOUR INDEPENDENT RESEARCH. WHAT CAN YOU PRODUCE?",
    note: "Choose the fictional receipt that best describes your research ritual.",
    options: [
      { label: "I READ THE DOCUMENTS, CHECKED THE AUTHORITIES AND TRACED THE LAUNCH TRANSACTIONS.", finding: "PRIMARY-SOURCE PAPERWORK RECEIVED. THE DEPARTMENT IS ALMOST IMPRESSED." },
      { label: "I CHECKED THE CA, THEN ASKED CT IF IT WAS THE RIGHT CA.", finding: "INDEPENDENT VERIFICATION WAS FOLLOWED BY CROWD-SOURCED REASSURANCE." },
      { label: "I WATCHED A KOL EXPLAIN ANOTHER KOL'S THREAD.", finding: "THE RESEARCH TRAIL HAS BEEN CLASSIFIED AS SECOND-HAND CONVICTION." },
    ],
  },
];

const EMPTY_PASSPORT: PassportData = {
  version: 3,
  enabled: true,
  createdAt: "2026-01-01T00:00:00.000Z",
  visitedDepartments: [],
  dailyOfficeDates: [],
  bestDailyStreak: 0,
  completedActivities: [],
  clubMembershipAnswers: null,
  clubApplicationCount: 0,
  clubChallengeAnswers: {},
  clubBadgeIds: [],
};

export default function ClubChallenges() {
  const [passport, setPassport] = useState<PassportData | null>(null);
  const [sessionAnswers, setSessionAnswers] = useState<Partial<Record<ClubChallengeId, number>>>({});
  const [pendingAnswers, setPendingAnswers] = useState<Partial<Record<ClubChallengeId, number>>>({});
  const [notice, setNotice] = useState("");

  useEffect(() => {
    function syncPassport() {
      const current = readPassport();
      setPassport(current);
      if (current) setSessionAnswers((existing) => ({ ...existing, ...current.clubChallengeAnswers }));
    }

    syncPassport();
    window.addEventListener("storage", syncPassport);
    window.addEventListener(PASSPORT_UPDATED_EVENT, syncPassport);
    return () => {
      window.removeEventListener("storage", syncPassport);
      window.removeEventListener(PASSPORT_UPDATED_EVENT, syncPassport);
    };
  }, []);

  const snapshot = passport ?? EMPTY_PASSPORT;
  const clubBadges = getPassportAchievementStatuses(snapshot).filter((badge) =>
    badge.id.startsWith("club-"),
  );
  const unlockedCount = clubBadges.filter((badge) => badge.earned).length;

  function chooseAnswer(id: ClubChallengeId, answer: number) {
    setPendingAnswers((current) => ({ ...current, [id]: answer }));
    setNotice("");
  }

  function fileResponse(challenge: Challenge) {
    const id = challenge.id;
    const pending = pendingAnswers[id];
    const saved = passport?.clubChallengeAnswers[id];
    const session = sessionAnswers[id];

    if (pending === undefined) {
      const existing = saved ?? session;
      if (existing !== undefined) {
        setPendingAnswers((current) => ({ ...current, [id]: existing }));
        setNotice("FILE REOPENED. SELECT A RESPONSE AND FILE THE UPDATED POSITION.");
      }
      return;
    }

    const updated = recordClubChallenge(id, pending);
    if (updated) {
      setPassport(updated);
      setSessionAnswers((current) => ({ ...current, [id]: pending }));
      setPendingAnswers((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
      setNotice("RESPONSE SAVED TO YOUR LOCAL PASSPORT. QUALIFYING CLUB BADGES HAVE BEEN UPDATED.");
      return;
    }

    setSessionAnswers((current) => ({ ...current, [id]: pending }));
    setPendingAnswers((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    setNotice("RESPONSE FILED FOR THIS SESSION ONLY. ENABLE YOUR OPTIONAL LOCAL PASSPORT TO KEEP CHALLENGE PROGRESS AND BADGES.");
  }

  return (
    <section className="club-challenges" aria-labelledby="club-challenges-title">
      <header className="club-challenges__header">
        <div>
          <span>THE 99% CLUB / INTERACTIVE CONVICTION DESK</span>
          <h2 id="club-challenges-title">THE EXCUSE <em>DEPARTMENT.</em></h2>
          <p>Three short case exercises. Three chances to explain why the next one is still yours.</p>
        </div>
        <div className="club-challenges__counter">
          <strong>{unlockedCount}<small>/12</small></strong>
          <span>CLUB BADGES<br />UNLOCKED</span>
        </div>
      </header>

      <div className="club-challenges__grid">
        {challenges.map((challenge, index) => {
          const savedAnswer = passport?.clubChallengeAnswers[challenge.id];
          const sessionAnswer = sessionAnswers[challenge.id];
          const pendingAnswer = pendingAnswers[challenge.id];
          const selected = pendingAnswer ?? savedAnswer ?? sessionAnswer;
          const stored = savedAnswer !== undefined;
          const filedInSession = !stored && sessionAnswer !== undefined;

          return (
            <article className="club-challenge" key={challenge.id}>
              <div className="club-challenge__top">
                <span>{challenge.reference}</span>
                <span className={stored ? "is-filed" : ""}>{stored ? "LOCAL FILED" : filedInSession ? "SESSION FILED" : "AWAITING RESPONSE"}</span>
              </div>
              <p className="eyebrow">CHALLENGE / 0{index + 1}</p>
              <h3>{challenge.title}</h3>
              <strong className="club-challenge__prompt">{challenge.prompt}</strong>
              <p className="club-challenge__note">{challenge.note}</p>
              <div className="club-challenge__options" role="group" aria-label={challenge.title + " response options"}>
                {challenge.options.map((option, optionIndex) => (
                  <button
                    key={option.label}
                    type="button"
                    className={selected === optionIndex ? "is-selected" : ""}
                    aria-pressed={selected === optionIndex}
                    onClick={() => chooseAnswer(challenge.id, optionIndex)}
                  >
                    <span>{String.fromCharCode(65 + optionIndex)}</span>
                    <strong>{option.label}</strong>
                  </button>
                ))}
              </div>
              {selected !== undefined && (
                <div className="club-challenge__finding" aria-live="polite">
                  <span>PROVISIONAL DEPARTMENTAL FINDING</span>
                  <p>{challenge.options[selected].finding}</p>
                </div>
              )}
              <button
                className="club-challenge__file"
                type="button"
                disabled={selected === undefined}
                onClick={() => fileResponse(challenge)}
              >
                {pendingAnswer !== undefined
                  ? "FILE RESPONSE"
                  : stored || filedInSession
                    ? "REOPEN / AMEND FILE"
                    : "FILE MY POSITION"} <span>↗</span>
              </button>
            </article>
          );
        })}
      </div>

      <div className="club-badge-case" aria-labelledby="club-badge-case-title">
        <div className="club-badge-case__heading">
          <div>
            <span>COLLECTION / 12 CLUB-EXCLUSIVE ACHIEVEMENTS</span>
            <h3 id="club-badge-case-title">THE CLUB <em>BADGE CASE.</em></h3>
          </div>
          <strong>{unlockedCount} / 12 UNLOCKED</strong>
        </div>
        <p className="club-badge-case__intro">
          Membership answers and completed challenges unlock these badges automatically. Enable the Passport before filing to save your collection on this device.
        </p>
        <div className="club-badge-case__grid">
          {clubBadges.map((badge) => (
            <article className={"club-badge" + (badge.earned ? " is-earned" : "")} key={badge.id}>
              <AchievementEmblem id={badge.id} rarity={badge.rarity} earned={badge.earned} />
              <div>
                <span>{badge.rarity} / {badge.earned ? "UNLOCKED" : badge.progress ? "IN PROGRESS" : "LOCKED"}</span>
                <h4>{badge.title}</h4>
                <p>{badge.description}</p>
                <small>{badge.requirement}</small>
              </div>
            </article>
          ))}
        </div>
        {!passport && (
          <div className="club-badge-case__optin">
            <p><strong>LOCAL COLLECTION / NOT ENABLED</strong>Your challenge responses can be tried now, but badges and progress are not saved until you enable the optional Passport.</p>
            <Link className="button button--outline" href="/passport">ENABLE MY LOCAL PASSPORT ↗</Link>
          </div>
        )}
      </div>

      {notice && <p className="audit-notice" role="status">{notice}</p>}
      <p className="club-challenges__disclaimer">ALL CHALLENGES, SCORES AND BADGES ARE FICTIONAL SATIRE. NO WALLET DATA, PURCHASES, TOKEN HOLDINGS OR FINANCIAL PERFORMANCE ARE USED. YOUR OPTIONAL COLLECTION STAYS IN THIS BROWSER.</p>
    </section>
  );
}
