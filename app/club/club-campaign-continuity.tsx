"use client";

import Link from "next/link";
import { useState } from "react";
import { useClubCampaignContext } from "./club-campaign-context";
import styles from "./club-campaign-continuity.module.css";

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
  const { continuity, ready: passportChecked } = useClubCampaignContext();
  const [notice, setNotice] = useState("");

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

  return (
    <section className={styles.root} id="club-campaign-continuity" aria-labelledby="club-campaign-continuity-title">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>U32 / THE 99% CLUB / CAMPAIGN CONTINUITY</span>
          <h2 id="club-campaign-continuity-title">YOUR FACTION.<br /><em>THIS WEEK'S EXCUSE.</em></h2>
          <p>
            Everyone receives the same weekly brief. Your optional saved faction adds one creative assignment, turning the shared campaign into a personal angle without changing the brief.
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
                <div className={styles.assignmentActions}>
                  <button type="button" className="button button--primary" onClick={() => void copyFactionOrder()}>
                    COPY MY FACTION ORDER ↓
                  </button>
                  <Link className="button button--outline" href="#club-contribution-studio">BUILD MY CONTRIBUTION ↗</Link>
                </div>
              </>
            ) : (
              <div className={styles.noFaction}>
                <strong>NO FACTION ORDER ON FILE.</strong>
                <p>
                  {progress?.passportEnabled
                    ? "Your optional local Passport is enabled, but no recognised faction is saved. Complete or retake the five-question membership interview."
                    : "This browser has no enabled local Passport. A session-only interview result is not reconstructed here; enable the optional Passport before filing to keep a faction assignment on this device."}
                </p>
                <div className={styles.assignmentActions}>
                  <Link className="button button--primary" href="#content-start">TAKE THE FIVE-QUESTION INTERVIEW ↗</Link>
                  <Link className="button button--outline" href="#club-contribution-studio">MAKE AN OPEN CONTRIBUTION ↗</Link>
                </div>
              </div>
            )}
          </div>


        </>
      )}

      {notice && <p className="audit-notice" role="status" aria-live="polite">{notice}</p>}
    </section>
  );
}
