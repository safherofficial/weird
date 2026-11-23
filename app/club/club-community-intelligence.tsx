"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CLUB_BADGE_IDS,
  PASSPORT_UPDATED_EVENT,
  readPassport,
  type PassportData,
} from "../passport/passport-store";
import {
  getClubCommunityContentInventory,
  getClubLocalPassportEvidence,
} from "./club-community-intelligence-data";
import styles from "./club-community-intelligence.module.css";

const inventory = getClubCommunityContentInventory();

export default function ClubCommunityIntelligence() {
  const [passport, setPassport] = useState<PassportData | null>(null);
  const [passportChecked, setPassportChecked] = useState(false);

  useEffect(() => {
    function syncLocalPassport() {
      setPassport(readPassport());
      setPassportChecked(true);
    }

    syncLocalPassport();
    window.addEventListener("storage", syncLocalPassport);
    window.addEventListener(PASSPORT_UPDATED_EVENT, syncLocalPassport);
    return () => {
      window.removeEventListener("storage", syncLocalPassport);
      window.removeEventListener(PASSPORT_UPDATED_EVENT, syncLocalPassport);
    };
  }, []);

  const evidence = getClubLocalPassportEvidence(passport);

  return (
    <section className={styles.root} aria-labelledby="club-community-intelligence-title">
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>U31 / THE 99% CLUB / COMMUNITY INTELLIGENCE</span>
          <h2 id="club-community-intelligence-title">WHAT WE CAN <em>PROVE.</em></h2>
          <p>
            No invented member counts. This desk separates the content the Club has ready,
            the progress saved in your own optional Passport and the public activity this site cannot verify.
          </p>
        </div>
        <div className={styles.seal} aria-label="Evidence standard">
          <strong>NO FAKE</strong>
          <span>COMMUNITY<br />NUMBERS</span>
        </div>
      </header>

      <div className={styles.grid}>
        <article className={styles.panel}>
          <div className={styles.panelTop}>
            <span>01 / CONTENT INVENTORY</span>
            <strong>VERIFIABLE</strong>
          </div>
          <p className={styles.panelIntro}>
            These figures count published assets in the application code, not views, usage or engagement.
          </p>
          <dl className={styles.metrics}>
            <div><dt>Social post drafts</dt><dd>{inventory.socialDrafts}</dd></div>
            <div><dt>Meme formats</dt><dd>{inventory.memeTemplates}</dd></div>
            <div><dt>Public challenge prompts</dt><dd>{inventory.publicChallenges}</dd></div>
            <div><dt>Coordinated campaign themes</dt><dd>{inventory.weeklyCampaigns}</dd></div>
            <div><dt>Weekly ritual cases</dt><dd>{inventory.weeklyRitualCases}</dd></div>
          </dl>
          <small className={styles.note}>STATIC CONTENT SUPPLY / NOT PARTICIPATION DATA</small>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelTop}>
            <span>02 / YOUR LOCAL PASSPORT</span>
            <strong>{passportChecked ? (evidence.passportEnabled ? "LOCAL RECORD" : "PASSPORT OFF") : "CHECKING"}</strong>
          </div>
          {passportChecked && evidence.passportEnabled ? (
            <>
              <p className={styles.panelIntro}>
                Existing records from this browser only. These values are not uploaded, pooled or visible to other visitors.
              </p>
              <dl className={styles.metrics}>
                <div><dt>Membership interview</dt><dd>{evidence.membershipInterviewFiled ? "FILED" : "—"}</dd></div>
                <div><dt>Core challenge files</dt><dd>{evidence.completedChallengeFiles}/3</dd></div>
                <div><dt>Weekly ritual weeks filed</dt><dd>{evidence.weeklyRitualWeeksFiled}</dd></div>
                <div><dt>Club badges earned</dt><dd>{evidence.clubBadgesEarned}/{CLUB_BADGE_IDS.length}</dd></div>
                <div><dt>Faction assigned</dt><dd>{evidence.factionAssigned ? "YES" : "—"}</dd></div>
              </dl>
              <small className={styles.note}>ONE BROWSER / ONE OPTED-IN PASSPORT / NOT A COMMUNITY TOTAL</small>
            </>
          ) : passportChecked ? (
            <div className={styles.emptyState}>
              <strong>NO PERSISTENT LOCAL RECORD.</strong>
              <p>Your Passport is optional and currently not enabled in this browser. Session-only answers are not reconstructed here.</p>
              <Link href="/passport" className={styles.link}>READ ABOUT THE OPTIONAL PASSPORT ↗</Link>
            </div>
          ) : (
            <p className={styles.emptyState} role="status">CHECKING THIS BROWSER'S OPTIONAL PASSPORT…</p>
          )}
        </article>

        <article className={styles.panel}>
          <div className={styles.panelTop}>
            <span>03 / GLOBAL COMMUNITY SIGNALS</span>
            <strong>NOT COLLECTED</strong>
          </div>
          <p className={styles.panelIntro}>
            The site has no server-side participation ledger or connected social publishing feed.
          </p>
          <dl className={styles.metrics}>
            <div><dt>Verified unique members</dt><dd>NOT AVAILABLE</dd></div>
            <div><dt>Posts actually published on X</dt><dd>NOT VERIFIED</dd></div>
            <div><dt>Public replies and contributors</dt><dd>NOT COLLECTED</dd></div>
            <div><dt>Participation by chain</dt><dd>NOT MEASURED</dd></div>
          </dl>
          <small className={styles.note}>OPENING AN X DRAFT DOES NOT PROVE THAT A POST WAS PUBLISHED</small>
        </article>
      </div>

      <p className={styles.disclaimer}>
        EVIDENCE RULE: content inventory is counted from built-in assets; personal progress is read from the existing opt-in Passport on this device; global community activity remains unmeasured. This panel creates no new stored record, analytics event, network request or account.
      </p>
    </section>
  );
}
