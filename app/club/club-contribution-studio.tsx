"use client";

import { useState } from "react";
import { useClubCampaignContext } from "./club-campaign-context";
import type { ClubCampaignContinuity } from "./club-campaign-continuity-data";
import {
  CLUB_CONTRIBUTION_CHARACTER_BUDGET,
  getClubContributionStarters,
  getClubContributionWritingCue,
} from "./club-contribution-engine";
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

export default function ClubContributionStudio() {
  const { continuity, ready } = useClubCampaignContext();

  if (!ready || !continuity) {
    return (
      <section className={styles.contribution} id="club-contribution-studio" aria-label="Club contribution studio loading">
        <p className={styles.loading} role="status">ALIGNING THE CONTENT STUDIO WITH THIS WEEK'S CAMPAIGN…</p>
      </section>
    );
  }

  return (
    <ClubContributionStudioEditor
      key={continuity.weekKey + ":" + continuity.campaign.theme.id + ":" + (continuity.faction?.id ?? "unassigned")}
      continuity={continuity}
    />
  );
}

function ClubContributionStudioEditor({ continuity }: Props) {
  const starters = getClubContributionStarters(continuity);
  const [starterIndex, setStarterIndex] = useState(0);
  const [draft, setDraft] = useState(starters[0].text);
  const [notice, setNotice] = useState("");

  const trimmedDraft = draft.trim();
  const withinBudget = trimmedDraft.length > 0 && trimmedDraft.length <= CLUB_CONTRIBUTION_CHARACTER_BUDGET;

  function nextStarter() {
    const nextIndex = (starterIndex + 1) % starters.length;
    setStarterIndex(nextIndex);
    setDraft(starters[nextIndex].text);
    setNotice("");
  }

  async function copyContribution() {
    if (!withinBudget) {
      setNotice("EDIT THE CONTRIBUTION TO FIT THE CHARACTER BUDGET BEFORE COPYING.");
      return;
    }

    const clubUrl = new URL("/club#club-contribution-studio", window.location.origin).toString();
    try {
      await copyText(trimmedDraft + "\n\n" + clubUrl);
      setNotice("CONTRIBUTION AND CLUB LINK COPIED. NOTHING HAS BEEN PUBLISHED.");
    } catch {
      setNotice("COPY UNAVAILABLE. SELECT YOUR CONTRIBUTION AND COPY IT MANUALLY.");
    }
  }

  function openOnX() {
    if (!withinBudget) {
      setNotice("EDIT THE CONTRIBUTION TO FIT THE CHARACTER BUDGET BEFORE OPENING X.");
      return;
    }

    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", trimmedDraft);
    intent.searchParams.set("url", new URL("/club#club-contribution-studio", window.location.origin).toString());
    window.open(intent.toString(), "_blank", "noopener,noreferrer");
    setNotice("X DRAFT OPENED. REVIEW AND PUBLISH IT YOURSELF.");
  }

  const characterClass = trimmedDraft.length > CLUB_CONTRIBUTION_CHARACTER_BUDGET
    ? styles.characterCount + " " + styles.characterCountOver
    : styles.characterCount;

  return (
    <section className={styles.contribution} id="club-contribution-studio" aria-labelledby="club-contribution-title">
      <div className={styles.contributionHeader}>
        <div>
          <span className={styles.eyebrow}>U33 / COMMUNITY CONTRIBUTION STUDIO</span>
          <h3 id="club-contribution-title">DON'T JUST READ THE BRIEF.<br /><em>ADD YOUR EXCUSE.</em></h3>
          <p>
            Build one original post from this week's shared brief and your faction angle. For replies, follow-up questions and hand-offs, use the conversation relay in Stage 5.
          </p>
        </div>
        <div className={styles.contributionStamp}><strong>YOUR</strong><span>WORDS<br />YOUR CALL</span></div>
      </div>

      <div className={styles.contributionContext}>
        <div>
          <span>THIS WEEK'S SOURCE</span>
          <strong>{continuity.campaign.theme.title}</strong>
          <p>{continuity.campaign.theme.brief}</p>
        </div>
        <div>
          <span>WRITING CUE / {continuity.faction?.code ?? "OPEN MEMBERSHIP"}</span>
          <p>{getClubContributionWritingCue(continuity)}</p>
        </div>
      </div>

      <div className={styles.contributionEditor}>
        <div className={styles.contributionEditorTop}>
          <span>EDITABLE PUBLIC CONTRIBUTION / {starters[starterIndex].label}</span>
          <button type="button" className={styles.starterButton} onClick={nextStarter}>NEW STARTER ↻</button>
        </div>
        <label className={styles.contributionLabel} htmlFor="club-contribution-draft">YOUR CONTRIBUTION</label>
        <textarea
          id="club-contribution-draft"
          value={draft}
          onChange={(event) => setDraft(event.currentTarget.value)}
          rows={4}
          spellCheck
          aria-describedby="club-contribution-help club-contribution-count"
        />
        <div className={styles.contributionEditorFoot}>
          <small id="club-contribution-help">EDIT THE PLACEHOLDER. DO NOT INCLUDE PRIVATE WALLET DETAILS OR IDENTIFY OTHER PEOPLE.</small>
          <strong id="club-contribution-count" className={characterClass}>
            {trimmedDraft.length} / {CLUB_CONTRIBUTION_CHARACTER_BUDGET} TEXT CHARACTERS
          </strong>
        </div>
        <div className={styles.contributionActions}>
          <button type="button" className="button button--primary" onClick={() => void copyContribution()} disabled={!withinBudget}>COPY WITH CLUB LINK ↓</button>
          <button type="button" className="button button--x" onClick={openOnX} disabled={!withinBudget}>OPEN DRAFT ON X ↗</button>
        </div>
      </div>

      {notice && <p className="audit-notice" role="status" aria-live="polite">{notice}</p>}
      <p className={styles.contributionDisclosure}>
        DRAFTS ARE CREATED IN THIS BROWSER SESSION ONLY. NOTHING IS SAVED, SENT, POSTED OR COUNTED AS ENGAGEMENT.
        X OPENS A COMPOSER; YOU DECIDE WHETHER TO PUBLISH.
      </p>
    </section>
  );
}
