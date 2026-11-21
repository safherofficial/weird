import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import ClubClient from "./club-client";

export const metadata: Metadata = {
  alternates: { canonical: "/club" },
  title: "The 99% Club",
  description: "The Solana Trenches survivor registry: five fictional questions about late entries, missed 100x calls, CTO updates, revenge trades and bagholding. No benefits.",
  openGraph: {
    title: "THE 99% CLUB",
    description: "You survived the launch thread. The bag survived the graduation. Apply for completely useless trenches survivor status.",
    images: ["/club/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE 99% CLUB",
    description: "Five questions. Three fictional indices. No benefits.",
    images: ["/club/opengraph-image"],
  },
};

export default function ClubPage() {
  return (
    <main className="audit-page club-page" id="main-content">
      <DepartmentHeader activeSection="club" statusMessage="MEMBERSHIP OFFICE / BENEFITS NOT INCLUDED" ctaHref="/club" ctaLabel="APPLY FOR MEMBERSHIP" />

      <div className="club-shell shell" id="content-start" tabIndex={-1}>
        <aside className="club-intro">
          <div className="audit-intro__meta"><span>FORM 99C-001</span><span>MEMBER BENEFITS / NONE</span></div>
          <p className="eyebrow">SOLANA TRENCHES / 99% SURVIVOR REGISTRY</p>
          <h1>THE 99%<br /><span>CLUB.</span></h1>
          <p className="audit-intro__lead">
            For the people who chased the green candle, missed the first exit, lived through a deployer disappearance and still know the next CA by heart.
          </p>
          <div className="club-intro__stamp">
            <span>OFFICIAL CLUB MOTTO</span>
            <strong>YOU SURVIVED THE LAUNCH THREAD.</strong>
            <small>THE TRENCHES KEPT THE RECEIPTS.</small>
          </div>
          <div className="club-intro__fineprint">
            “99%” IS A SATIRICAL CLUB NAME. IT IS NOT A REAL MARKET OR COMMUNITY STATISTIC.
          </div>
        </aside>

        <ClubClient />
      </div>

      <DepartmentNextSteps currentDepartment="club" />

      <DepartmentFooter message={["WELCOME BACK TO THE TRENCHES.", "YOUR BENEFITS HAVE BEEN DECLINED IN ADVANCE."]} />
    </main>
  );
}
