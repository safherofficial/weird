import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import ClubClient from "./club-client";
import ClubChallenges from "./club-challenges";
import ClubTokenNotice from "./club-token-notice";
import ClubCampaignDesk from "./club-campaign-desk";
import ClubCampaignEngineDesk from "./club-campaign-engine-desk";
import ClubCampaignContinuity from "./club-campaign-continuity";
import ClubCultureDesk from "./club-culture-desk";
import ClubWarRoomLazy from "./club-war-room-lazy";
import ClubCommunityIntelligence from "./club-community-intelligence";
import ClubContributionStudio from "./club-contribution-studio";
import ClubParticipationLoop from "./club-participation-loop";
import ClubCampaignContinuityProvider from "./club-campaign-context";
import journey from "./club-journey.module.css";
import { factions } from "./club-engine";

export const metadata: Metadata = {
  alternates: { canonical: "/club" },
  title: "The 99% Club",
  description: "The 99% Club is a satire of crypto investors across all chains: six fictional factions, unwavering conviction, self-declared research and the next trade.",
  openGraph: {
    title: "THE 99% CLUB",
    description: "It's never our fault when we lose. The next one is mine. Six fictional crypto factions for the self-assured crypto trenches.",
    images: ["/club/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE 99% CLUB",
    description: "It's never our fault when we lose. The next one is mine. Find your fictional crypto faction and use the 99% Club content desk across all chains.",
    images: ["/club/opengraph-image"],
  },
};

export default function ClubPage() {
  return (
    <main className="audit-page club-page" id="main-content">
      <DepartmentHeader activeSection="club" statusMessage="MEMBERSHIP OFFICE / LIABILITY NOT ACCEPTED" ctaHref="/club" ctaLabel="APPLY FOR MEMBERSHIP" />

      <ClubCampaignContinuityProvider>
        <nav className={journey.nav} aria-label="99% Club five-stage journey">
          <Link href="#club-journey-identity"><span>01</span><strong>MEMBERSHIP &amp; IDENTITY</strong><small>APPLY / CLUB STATUS</small></Link>
          <Link href="#club-journey-factions"><span>02</span><strong>FACTION CLASSIFICATION</strong><small>CHOOSE YOUR EXCUSE</small></Link>
          <Link href="#club-journey-campaign"><span>03</span><strong>WEEKLY CAMPAIGN</strong><small>THIS WEEK'S BRIEF</small></Link>
          <Link href="#club-journey-content"><span>04</span><strong>COMMUNITY CONTENT STUDIO</strong><small>CREATE / EDIT / SHARE</small></Link>
          <Link href="#club-journey-participation"><span>05</span><strong>PARTICIPATION &amp; PASSPORT</strong><small>CONTRIBUTE / KEEP YOUR FILE</small></Link>
        </nav>

        <section className={journey.stage + " " + journey.identityStage} id="club-journey-identity" aria-label="Stage 1: Membership and identity">
          <div className={journey.stageMarker}><span className={journey.stageNumber}>01</span><div><strong>MEMBERSHIP &amp; IDENTITY</strong><small>START HERE / APPLICATION AND OFFICIAL CLUB STATUS</small></div></div>
          <div className="club-shell shell" id="content-start" tabIndex={-1}>
        <aside className="club-intro">
          <div className="audit-intro__meta"><span>FORM 99C-001</span><span>MEMBER BENEFITS / NONE</span></div>
          <p className="eyebrow">CRYPTO MARKETS / ALL CHAINS / 99% SURVIVOR REGISTRY</p>
          <h1>THE 99%<br /><span>CLUB.</span></h1>
          <p className="audit-intro__lead">
            For the 99% of crypto culture who trust their skills, believe their own research and know that every loss has an explanation. Every chain. Every cycle. The next one is always ours.
          </p>
          <div className="club-intro__stamp">
            <span>OFFICIAL CLUB MOTTO</span>
            <strong>IT'S NEVER OUR FAULT WHEN WE LOSE. THE NEXT ONE IS MINE.</strong>
            <small>I DID MY OWN RESEARCH. I KNOW EXACTLY WHAT I'M DOING.</small>
          </div>
          <div className="club-intro__fineprint">
            “99%” IS A SATIRICAL IDENTITY, NOT A MEASURED STATISTIC ABOUT REAL INVESTORS.
          </div>
        </aside>

        <ClubClient />
      </div>

          <div className="shell">
            <ClubTokenNotice placement="club" />
          </div>
        </section>

        <section className={journey.stage} id="club-journey-factions" aria-label="Stage 2: Faction classification">
          <div className={journey.stageMarker}><span className={journey.stageNumber}>02</span><div><strong>FACTION CLASSIFICATION</strong><small>SIX FICTIONAL IDENTITIES / ONE PRIMARY ARCHETYPE</small></div></div>
          <div className="shell">
            <section className="club-faction-directory" aria-labelledby="club-factions-title">
          <header>
            <div><span>THE 99% CLUB / SIX FICTIONAL FACTIONS</span><h2 id="club-factions-title">PICK YOUR <em>EXCUSE.</em></h2></div>
            <p>Your membership archetype determines your faction. This fictional classification does not inspect wallets or token holdings, confer real-world status or establish token eligibility.</p>
          </header>
          <div className="club-faction-directory__grid">
            {Object.values(factions).map((faction) => (
              <article className="club-faction-tile" key={faction.id}>
                <div className="club-faction-tile__seal">{faction.seal}</div>
                <div><span>{faction.code} / {faction.designation}</span><h3>{faction.title}</h3><strong>“{faction.motto}”</strong><p>{faction.creed}</p><small>RITUAL / {faction.ritual}</small><Link className="club-faction-tile__link" href={"/club/factions/" + faction.id}>OPEN FACTION DOSSIER ↗</Link></div>
              </article>
            ))}
          </div>
            </section>
          </div>
        </section>

        <section className={journey.stage} id="club-journey-campaign" aria-label="Stage 3: Current weekly campaign">
          <div className={journey.stageMarker}><span className={journey.stageNumber}>03</span><div><strong>CURRENT WEEKLY CAMPAIGN</strong><small>ONE SHARED BRIEF / SIX FACTION LENSES</small></div></div>
          <div className="shell"><ClubCampaignDesk /></div>
          <div className="shell"><ClubCampaignEngineDesk /></div>
          <div className="shell"><ClubCampaignContinuity /></div>
        </section>

        <section className={journey.stage} id="club-journey-content" aria-label="Stage 4: Community content studio">
          <div className={journey.stageMarker}><span className={journey.stageNumber}>04</span><div><strong>COMMUNITY CONTENT STUDIO</strong><small>WRITE / DESIGN / PACKAGE THE WEEKLY STORY</small></div></div>
          <div className="shell"><ClubCultureDesk /></div>
          <div className="shell"><ClubContributionStudio /></div>
          <div className="shell"><ClubWarRoomLazy /></div>
        </section>

        <section className={journey.stage} id="club-journey-participation" aria-label="Stage 5: Participation and Passport">
          <div className={journey.stageMarker}><span className={journey.stageNumber}>05</span><div><strong>PARTICIPATION &amp; PASSPORT</strong><small>TAKE PART / FILE YOUR RITUALS / SEE WHAT IS ACTUALLY SAVED</small></div></div>
          <div className="shell"><ClubParticipationLoop /></div>
          <div className="shell"><ClubChallenges /></div>
          <div className="shell"><ClubCommunityIntelligence /></div>
        </section>
      </ClubCampaignContinuityProvider>

      <div className="shell">
        <DepartmentNextSteps currentDepartment="club" />
      </div>

      <DepartmentFooter message={["WELCOME BACK TO THE TRENCHES.", "YOUR BENEFITS HAVE BEEN DECLINED IN ADVANCE."]} />
    </main>
  );
}
