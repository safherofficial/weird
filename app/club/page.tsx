import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import ClubClient from "./club-client";
import ClubChallenges from "./club-challenges";

export const metadata: Metadata = {
  alternates: { canonical: "/club" },
  title: "The 99% Club",
  description: "The 99% Club: fictional crypto archetypes, local achievement badges and interactive excuses for why the next entry is still yours.",
  openGraph: {
    title: "THE 99% CLUB",
    description: "Five questions, twelve Club badges and three interactive excuses. The next one is yours.",
    images: ["/club/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE 99% CLUB",
    description: "Five questions, twelve Club badges and three interactive excuses.",
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
        <ClubChallenges />
      </div>

      <div className="shell">
        <DepartmentNextSteps currentDepartment="club" />
      </div>

      <DepartmentFooter message={["WELCOME BACK TO THE TRENCHES.", "YOUR BENEFITS HAVE BEEN DECLINED IN ADVANCE."]} />
    </main>
  );
}
