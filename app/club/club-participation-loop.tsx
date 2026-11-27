"use client";

import { useState } from "react";
import { useClubCampaignContext } from "./club-campaign-context";
import type { ClubCampaignContinuity } from "./club-campaign-continuity-data";
import {
  CLUB_PARTICIPATION_TEXT_BUDGET,
  getClubParticipationDrafts,
} from "./club-participation-loop-engine";
import styles from "./club-campaign-continuity.module.css";

type Props = {
  continuity: ClubCampaignContinuity;
};

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

export default function ClubParticipationLoop() {
  const { continuity, ready } = useClubCampaignContext();

  if (!ready || !continuity) {
    return (
      <section className={styles.participation} id="club-participation-loop" aria-label="Club participation loop loading">
        <p className={styles.loading} role="status">ALIGNING THE PARTICIPATION LOOP WITH THIS WEEK'S CAMPAIGN…</p>
      </section>
    );
  }

  return (
    <ClubParticipationLoopEditor
      key={continuity.weekKey + ":" + continuity.campaign.theme.id + ":" + (continuity.faction?.id ?? "unassigned")}
      continuity={continuity}
    />
  );
}

function ClubParticipationLoopEditor({ continuity }: Props) {
  const starters = getClubParticipationDrafts(continuity);
  const [drafts, setDrafts] = useState<Record<string, string>>(
    () => Object.fromEntries(starters.map((starter) => [starter.id, starter.text])),
  );
  const [notice, setNotice] = useState("");

  function updateDraft(id: string, value: string) {
    setDrafts((current) => ({ ...current, [id]: value }));
  }

  async function copyDraft(id: string) {
    const value = (drafts[id] ?? "").trim();
    if (!value || value.length > CLUB_PARTICIPATION_TEXT_BUDGET) return;

    try {
      await copyText(value);
      setNotice("DRAFT COPIED. NO REPLY, POST OR PARTICIPATION HAS BEEN RECORDED.");
    } catch {
      setNotice("COPY UNAVAILABLE. SELECT THE TEXT AND COPY IT MANUALLY.");
    }
  }

  function openDraftOnX(id: string) {
    const value = (drafts[id] ?? "").trim();
    if (!value || value.length > CLUB_PARTICIPATION_TEXT_BUDGET) return;

    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", value);
    intent.searchParams.set("url", new URL("/club#club-participation-loop", window.location.origin).toString());
    window.open(intent.toString(), "_blank", "noopener,noreferrer");
    setNotice("X COMPOSER OPENED. REVIEW AND PUBLISH MANUALLY; NOTHING IS TRACKED HERE.");
  }

  return (
    <section className={styles.participation} id="club-participation-loop" aria-labelledby="club-participation-title">
      <header className={styles.participationHeader}>
        <div>
          <span className={styles.eyebrow}>U34 / PUBLIC CONVERSATION RELAY</span>
          <h3 id="club-participation-title">A POST IS A START.<br /><em>KEEP THE FILE MOVING.</em></h3>
          <p>
            Extend the weekly challenge with three optional drafts: your reply, one specific follow-up question and a hand-off. These are conversation tools, separate from the original campaign post in Stage 4.
          </p>
        </div>
        <div className={styles.participationStamp}><strong>NO BOT</strong><span>NO COUNTER<br />JUST THE LOOP</span></div>
      </header>

      <div className={styles.participationContext}>
        <span>ACTIVE PUBLIC CHALLENGE / {continuity.weekKey}</span>
        <strong>{continuity.campaign.challenge.title}</strong>
        <p>{continuity.campaign.challenge.prompt}</p>
      </div>

      <div className={styles.participationSteps}>
        {starters.map((starter) => {
          const value = drafts[starter.id] ?? "";
          const trimmed = value.trim();
          const withinBudget = trimmed.length > 0 && trimmed.length <= CLUB_PARTICIPATION_TEXT_BUDGET;
          const countClass = trimmed.length > CLUB_PARTICIPATION_TEXT_BUDGET
            ? styles.characterCount + " " + styles.characterCountOver
            : styles.characterCount;

          return (
            <article className={styles.participationStep} key={starter.id}>
              <div className={styles.participationStepTop}>
                <span>{starter.step}</span>
                <strong>{starter.title}</strong>
              </div>
              <p>{starter.purpose}</p>
              <label className={styles.contributionLabel} htmlFor={"club-participation-" + starter.id}>{starter.label}</label>
              <textarea
                id={"club-participation-" + starter.id}
                value={value}
                onChange={(event) => updateDraft(starter.id, event.currentTarget.value)}
                rows={3}
                spellCheck
                aria-describedby={"club-participation-count-" + starter.id}
              />
              <div className={styles.participationStepFoot}>
                <small id={"club-participation-count-" + starter.id} className={countClass}>
                  {trimmed.length} / {CLUB_PARTICIPATION_TEXT_BUDGET}
                </small>
                <span>{withinBudget ? "READY TO USE" : trimmed.length === 0 ? "ADD YOUR WORDS" : "OVER TEXT BUDGET"}</span>
              </div>
              <div className={styles.contributionActions}>
                <button type="button" className="button button--quiet" onClick={() => void copyDraft(starter.id)} disabled={!withinBudget}>COPY TEXT</button>
                <button type="button" className="button button--x" onClick={() => openDraftOnX(starter.id)} disabled={!withinBudget}>OPEN ON X ↗</button>
              </div>
            </article>
          );
        })}
      </div>

      {notice && <p className="audit-notice" role="status" aria-live="polite">{notice}</p>}
      <p className={styles.participationDisclosure}>
        THIS IS A MANUAL PUBLISHING WORKFLOW, NOT A COMMUNITY TRACKER. THE SITE DOES NOT READ X REPLIES, COLLECT HANDLES,
        VERIFY PUBLICATION OR COUNT CONTRIBUTORS. ADD MENTIONS ONLY WHEN APPROPRIATE.
      </p>
    </section>
  );
}
