"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  PASSPORT_UPDATED_EVENT,
  readPassport,
} from "../passport/passport-store";
import {
  getClubCampaignContinuity,
  type ClubCampaignContinuity as Continuity,
} from "./club-campaign-continuity-data";
import styles from "./club-campaign-continuity.module.css";
import ClubContributionStudio from "./club-contribution-studio";

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

export default function ClubCampaignContinuity() {
  const [continuity, setContinuity] = useState<Continuity | null>(null);
  const [passportChecked, setPassportChecked] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    function refresh() {
      setContinuity(getClubCampaignContinuity(readPassport(), new Date()));
      setPassportChecked(true);
    }

    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(PASSPORT_UPDATED_EVENT, refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(PASSPORT_UPDATED_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  async function copyFactionOrder() {
    if (!continuity?.faction || !continuity.mission) return;
    const text = [
      "THE 99% CLUB / PERSONAL CAMPAIGN ORDER",
      continuity.weekKey + " / " + continuity.campaign.theme.title,
      "FACTION: " + continuity.faction.title,
      "ROLE: " + continuity.mission.title,
      continuity.mission.instruction,
      "DELIVERABLE: " + continuity.mission.deliverable,
      "EDITORIAL FILE: " + continuity.campaign.culturePost.title,
      "PUBLIC CHALLENGE: " + continuity.campaign.challenge.title,
      "WEEKLY RITUAL: " + continuity.weeklyRitual.title,
      "SATIRE / ALL CHAINS / NO FINANCIAL PROMISES.",
    ].join("\n\n");

    try {
      await copyText(text);
      setNotice("FACTION ORDER COPIED. THE DEPARTMENT HAS NOT FILED IT ON YOUR BEHALF.");
    } catch {
      setNotice("COPY UNAVAILABLE. SELECT THE ORDER AND COPY IT MANUALLY.");
    }
  }

  const progress = continuity?.progress;
  const statusText = (value: string) => value === "FILED" || value === "ASSIGNED"
    ? "LOCAL FILED"
    : value === "OPEN" || value === "NOT ASSIGNED"
      ? "OPEN"
      : "NOT SAVED";

  return (
    <section className={styles.root} id="club-campaign-continuity" aria-labelledby="club-campaign-continuity-title">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>U32 / THE 99% CLUB / CAMPAIGN CONTINUITY</span>
          <h2 id="club-campaign-continuity-title">YOUR FACTION.<br /><em>THIS WEEK'S EXCUSE.</em></h2>
          <p>
            The weekly campaign is shared across all six factions. Your saved faction gives it a distinct editorial assignment;
            the linked post, meme and public challenge lead into the separate weekly ritual for the same UTC week.
          </p>
        </div>
        <div className={styles.seal}><strong>ONE</strong><span>CAMPAIGN<br />SIX LENSES</span></div>
      </header>

      {!passportChecked || !continuity ? (
        <p className={styles.loading} role="status">RETRIEVING THE LOCAL CAMPAIGN FILE…</p>
      ) : (
        <>
          <div className={styles.assignment}>
            <div className={styles.assignmentTop}>
              <span>YOUR CAMPAIGN ASSIGNMENT / {continuity.weekKey}</span>
              <span>{continuity.faction ? continuity.faction.code + " / FACTION FILED" : "FACTION NOT CONFIRMED"}</span>
            </div>
            {continuity.faction && continuity.mission ? (
              <>
                <div className={styles.assignmentGrid}>
                  <div>
                    <small>LOCAL FACTION</small>
                    <h3>{continuity.faction.title}</h3>
                    <p>{continuity.faction.motto}</p>
                  </div>
                  <div>
                    <small>THIS WEEK'S EDITORIAL ROLE</small>
                    <h3>{continuity.mission.title}</h3>
                    <p>{continuity.mission.instruction}</p>
                  </div>
                </div>
                <div className={styles.deliverable}>
                  <span>YOUR DELIVERABLE</span>
                  <p>{continuity.mission.deliverable}</p>
                </div>
                <button type="button" className="button button--primary" onClick={() => void copyFactionOrder()}>
                  COPY MY FACTION ORDER ↓
                </button>
              </>
            ) : (
              <div className={styles.noFaction}>
                <strong>NO FACTION ORDER ON FILE.</strong>
                <p>
                  {progress?.passportEnabled
                    ? "Your optional local Passport is enabled, but no recognised faction is saved. Complete or retake the five-question membership interview."
                    : "This browser has no enabled local Passport. A session-only interview result is not reconstructed here; enable the optional Passport before filing to keep a faction assignment on this device."}
                </p>
                <Link className="button button--primary" href="#content-start">TAKE THE FIVE-QUESTION INTERVIEW ↗</Link>
              </div>
            )}
          </div>

          <div className={styles.routeHeader}>
            <div><span>THE CONNECTED ROUTE / {continuity.campaign.theme.title}</span><h3>FROM MEMBERSHIP TO <em>WEEKLY RITUAL.</em></h3></div>
            <p>Follow the same weekly brief through each existing Club tool. X drafts are never counted as published posts.</p>
          </div>

          <div className={styles.steps}>
            <article className={styles.step}>
              <span>01 / MEMBERSHIP</span>
              <strong>{statusText(progress?.membershipInterview ?? "NOT SAVED")}</strong>
              <h4>File your faction</h4>
              <p>{progress?.membershipInterview === "FILED" ? "Your five answers and faction are available in this browser's Passport." : "The interview is the source of the six fictional faction assignments."}</p>
              <Link href="#content-start">OPEN INTERVIEW ↗</Link>
            </article>
            <article className={styles.step}>
              <span>02 / WEEKLY CAMPAIGN</span>
              <strong>ACTIVE / {continuity.weekKey}</strong>
              <h4>{continuity.campaign.theme.title}</h4>
              <p>{continuity.campaign.theme.brief}</p>
              <Link href="#club-campaign-engine">OPEN LINKED EDITORIAL POST ↗</Link>
            </article>
            <article className={styles.step}>
              <span>03 / MEME + PUBLIC CHALLENGE</span>
              <strong>{progress?.passportEnabled ? progress.completedCoreChallenges + " / 3 PERSONAL CHALLENGE FILES" : "NOT SAVED / SESSION ONLY"}</strong>
              <h4>{continuity.campaign.memeTemplate.name}</h4>
              <p>{continuity.campaign.challenge.title}: {continuity.campaign.challenge.brief}</p>
              <div className={styles.stepLinks}>
                <Link href="#club-meme-studio">MEME OFFICE ↗</Link>
                <Link href="#club-challenge-board">PUBLIC CHALLENGE ↗</Link>
                <Link href="#club-challenges">PERSONAL FILES ↗</Link>
              </div>
            </article>
            <article className={styles.step}>
              <span>04 / WEEKLY RITUAL</span>
              <strong>{progress?.currentWeeklyRitualFiled ? "LOCAL FILED" : progress?.passportEnabled ? "OPEN" : "NOT SAVED"}</strong>
              <h4>{continuity.weeklyRitual.title}</h4>
              <p>{continuity.weeklyRitual.prompt}</p>
              <small className={styles.ritualNote}>{progress?.currentWeeklyRitualFiled ? "THIS WEEK'S RESPONSE IS SAVED IN YOUR LOCAL PASSPORT." : "THIS IS THE SEPARATE WEEKLY RITUAL FOR THE SAME UTC WEEK."}</small>
              <Link href="#club-weekly-ritual">FILE THIS WEEK'S RESPONSE ↗</Link>
            </article>
          </div>

          <ClubContributionStudio
            key={continuity.weekKey + ":" + continuity.campaign.theme.id + ":" + (continuity.faction?.id ?? "unassigned")}
            continuity={continuity}
          />

          <p className={styles.privacyNote}>
            {progress?.passportEnabled
              ? "READ-ONLY LOCAL SUMMARY / Existing Passport fields only. This panel creates no new stored record and sends no participation data."
              : "NO PERSISTENT LOCAL RECORD / Interview and challenge answers from this session are not reconstructed or transmitted."}
          </p>
        </>
      )}

      {notice && <p className="audit-notice" role="status" aria-live="polite">{notice}</p>}
    </section>
  );
}
