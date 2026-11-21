import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import ClubClient from "./club-client";
import ClubChallenges from "./club-challenges";
import { factions } from "./club-engine";

export const metadata: Metadata = {
  alternates: { canonical: "/club" },
  title: "The 99% Club",
  description: "The 99% Club: fictional crypto archetypes, local achievement badges and interactive excuses for why the next entry is still yours.",
  openGraph: {
    title: "THE 99% CLUB",
    description: "Five questions, thirteen Club badges and three interactive excuses. The next one is yours.",
    images: ["/club/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE 99% CLUB",
    description: "Five questions, thirteen Club badges and three interactive excuses.",
    images: ["/club/opengraph-image"],
  },
};

export default function ClubPage() {
  return (
    <main className="audit-page club-page" id="main-content">
      <DepartmentHeader activeSection="club" statusMessage="MEMBERSHIP OFFICE / LIABILITY NOT ACCEPTED" ctaHref="/club" ctaLabel="APPLY FOR MEMBERSHIP" />

      <div className="club-shell shell" id="content-start" tabIndex={-1}>
        <aside className="club-intro">
          <div className="audit-intro__meta"><span>FORM 99C-001</span><span>MEMBER BENEFITS / NONE</span></div>
          <p className="eyebrow">SOLANA TRENCHES / 99% SURVIVOR REGISTRY</p>
          <h1>THE 99%<br /><span>CLUB.</span></h1>
          <p className="audit-intro__lead">
            For the people who trust their research, defend every entry and can turn any red candle into a reason to try again.
          </p>
          <div className="club-intro__stamp">
            <span>OFFICIAL CLUB MOTTO</span>
            <strong>IT'S NEVER OUR FAULT. THE NEXT ONE IS MINE.</strong>
            <small>I DID MY OWN RESEARCH. PLEASE FILE NO FURTHER QUESTIONS.</small>
          </div>
          <div className="club-intro__fineprint">
            “99%” IS A SATIRICAL IDENTITY, NOT A MEASURED STATISTIC ABOUT REAL INVESTORS.
          </div>
        </aside>

        <ClubClient />
      </div>

      <div className="shell">
        <section className="club-faction-directory" aria-labelledby="club-factions-title">
          <header>
            <div><span>THE 99% CLUB / SIX FICTIONAL FACTIONS</span><h2 id="club-factions-title">PICK YOUR <em>EXCUSE.</em></h2></div>
            <p>Your primary membership archetype determines your faction. No wallets, applications, token holdings or real-world groups are involved.</p>
          </header>
          <div className="club-faction-directory__grid">
            {Object.values(factions).map((faction) => (
              <article className="club-faction-tile" key={faction.id}>
                <div className="club-faction-tile__seal">{faction.seal}</div>
                <div><span>{faction.code} / {faction.designation}</span><h3>{faction.title}</h3><strong>“{faction.motto}”</strong><p>{faction.creed}</p><small>RITUAL / {faction.ritual}</small></div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="shell">
        <ClubChallenges />
      </div>

      <div className="shell">
        <DepartmentNextSteps currentDepartment="club" />
      </div>

      <DepartmentFooter message={["WELCOME BACK TO THE TRENCHES.", "YOUR BENEFITS HAVE BEEN DECLINED IN ADVANCE."]} />
    </main>
  );
}
