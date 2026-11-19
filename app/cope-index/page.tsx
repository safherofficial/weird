import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import CopeIndexClient from "./cope-index-client";
import { buildDailyCopeIndex } from "./cope-engine";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Global Cope Index",
  description: "A fictional daily dashboard for conviction pressure, narrative fog, Telegram reliance, liquidity anxiety and the eternal promise of soon.",
  openGraph: {
    title: "THE GLOBAL COPE INDEX",
    description: "Daily departmental readings. Entirely synthetic. Emotionally familiar.",
    images: ["/cope-index/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE GLOBAL COPE INDEX",
    description: "A daily synthetic reading of the Department's fictional cope levels.",
    images: ["/cope-index/opengraph-image"],
  },
};

export default function CopeIndexPage() {
  const issueDate = new Date().toISOString().slice(0, 10);
  const dailyIndex = buildDailyCopeIndex(issueDate);

  return (
    <main className="audit-page cope-index-page" id="main-content">
      <DepartmentHeader activeSection="cope" statusMessage="DAILY INDEX / SYNTHETIC VALUES ONLY" ctaHref="/cope-index" ctaLabel="CHECK THE INDEX" />

      <div className="cope-index-shell shell" id="content-start" tabIndex={-1}>
        <header className="cope-index-intro">
          <div className="audit-intro__meta"><span>INDEX No. GCI-001</span><span>ISSUE / UTC {issueDate}</span></div>
          <p className="eyebrow">OFFICE OF COLLECTIVE NARRATIVE VOLATILITY</p>
          <h1>THE GLOBAL<br /><span>COPE INDEX.</span></h1>
          <p className="audit-intro__lead">
            A daily reading of the Department's fictional emotional climate. The numbers are synthetic. The situations are painfully familiar.
          </p>
          <div className="cope-index-intro__warning">
            <strong>NOT A LIVE MARKET OR COMMUNITY INDEX.</strong>
            <span>NO EXCHANGE FEED / NO VISITOR POLL / NO REAL-WORLD SAMPLE</span>
          </div>
        </header>

        <CopeIndexClient dailyIndex={dailyIndex} />
      </div>

      <DepartmentFooter message={["THE INDEX HAS BEEN CALCULATED.", "THE MARKET HAS NOT BEEN CONSULTED."]} />
    </main>
  );
}
