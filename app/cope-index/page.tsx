import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import CopeIndexClient from "./cope-index-client";
import { buildDailyCopeIndex } from "./cope-engine";
import { getDailyEditorialCase } from "../daily-office/daily-engine";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/cope-index" },
  title: "Global Cope Index",
  description: "A synthetic daily Cope Index for Solana trenches behaviour: CT dependency, KOL echo, bonding-curve FOMO, CTO hope and post-graduation liquidity anxiety.",
  openGraph: {
    title: "COPIUM ADMINISTRATION / GLOBAL COPE INDEX",
    description: "Daily trenches readings. Entirely synthetic. Emotionally familiar.",
    images: ["/cope-index/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "COPIUM ADMINISTRATION / GLOBAL COPE INDEX",
    description: "A fictional daily reading of CT echo, post-graduation anxiety and the promise that the next ticker will be the one.",
    images: ["/cope-index/opengraph-image"],
  },
};

export default function CopeIndexPage() {
  const issueDate = new Date().toISOString().slice(0, 10);
  const dailyIndex = buildDailyCopeIndex(issueDate, getDailyEditorialCase(issueDate));

  return (
    <main className="audit-page cope-index-page" id="main-content">
      <DepartmentHeader activeSection="cope" statusMessage="DAILY INDEX / SYNTHETIC VALUES ONLY" ctaHref="/cope-index" ctaLabel="CHECK THE INDEX" />

      <div className="cope-index-shell shell" id="content-start" tabIndex={-1}>
        <header className="cope-index-intro">
          <div className="audit-intro__meta"><span>INDEX No. GCI-001</span><span>ISSUE / UTC {issueDate}</span></div>
          <p className="eyebrow">COPIUM ADMINISTRATION / SYNTHETIC TRENCHES INDEX</p>
          <h1>THE GLOBAL<br /><span>COPE INDEX.</span></h1>
          <p className="audit-intro__lead">
            A date-seeded reading of fictional CT echo, launch FOMO, CTO optimism and exit-liquidity denial. The numbers are synthetic. The situations are painfully familiar.
          </p>
          <div className="cope-index-intro__warning">
            <strong>NOT A LIVE MARKET OR COMMUNITY INDEX.</strong>
            <span>NO EXCHANGE FEED / NO VISITOR POLL / NO REAL-WORLD SAMPLE</span>
          </div>
        </header>

        <CopeIndexClient dailyIndex={dailyIndex} />
      </div>

      <div className="shell">
        <DepartmentNextSteps currentDepartment="cope" />
      </div>

      <DepartmentFooter message={["THE INDEX HAS BEEN CALCULATED.", "THE MARKET HAS NOT BEEN CONSULTED."]} />
    </main>
  );
}
