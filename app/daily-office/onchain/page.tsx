import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import { getOnchainReport, getOnchainReportIndex } from "../onchain/onchain-data";
import OnchainReportView from "../onchain/onchain-report-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Onchain Intelligence Desk | Daily Solana Reports",
  description: "Daily data-led Solana DEX observations from public DEX Screener pair data. Real market snapshots, transparent thresholds and clear limits.",
  alternates: { canonical: "/daily-office/onchain" },
  openGraph: {
    title: "THE DYOR DEPARTMENT / ONCHAIN INTELLIGENCE",
    description: "Daily Solana DEX market observations, published from public pair data without paid data feeds or generated market claims.",
  },
  twitter: {
    card: "summary",
    title: "THE DYOR DEPARTMENT / ONCHAIN INTELLIGENCE",
    description: "Real DEX pair snapshots. Transparent selection. No fabricated market stories.",
  },
};

export default async function OnchainIntelligencePage() {
  const index = await getOnchainReportIndex();
  const latest = index?.reports[0] ?? null;
  const report = latest ? await getOnchainReport(latest.issueDate) : null;

  return (
    <main className="audit-page onchain-intelligence-page" id="main-content">
      <DepartmentHeader
        activeSection="daily"
        statusMessage="ONCHAIN INTELLIGENCE / PUBLIC SOLANA DEX DATA"
        ctaHref="/daily-office"
        ctaLabel="BACK TO DAILY DESK"
      />
      <div className="onchain-page-shell shell" id="content-start" tabIndex={-1}>
        <header className="onchain-page-intro">
          <div className="audit-intro__meta">
            <span>DAILY PUBLIC-DATA REPORT / SOLANA</span>
            <span>NO TOKEN PROMOTIONS / NO PAID FEED</span>
          </div>
          <p className="eyebrow">THE DYOR DEPARTMENT / ONCHAIN INTELLIGENCE UNIT</p>
          <h1>THE DATA<br /><span>DESK.</span></h1>
          <p className="audit-intro__lead">
            A daily editorial report built from public Solana token-discovery feeds and DEX pair statistics.
            The numbers are real snapshots. The commentary is templated. The Department does not invent a story when the evidence is thin.
          </p>
          <div className="onchain-page-intro__notice">
            <span>METHOD / FREE PUBLIC DATA</span>
            <strong>NO PAID API. NO AI API. NO DATABASE.</strong>
            <small>PAIR ACTIVITY IS OBSERVED THROUGH DEX SCREENER. THIS IS NOT WALLET-LEVEL FORENSICS OR FINANCIAL ADVICE.</small>
          </div>
          <div className="onchain-page-intro__actions">
            <Link className="button button--quiet" href="/daily-office/onchain/archive">BROWSE ALL DAILY FILES ↗</Link>
            <Link className="button button--quiet" href="/daily-office">RETURN TO THE TRENCHES DESK ↗</Link>
          </div>
        </header>

        {report ? (
          <OnchainReportView report={report} />
        ) : (
          <section className="onchain-waiting">
            <span>PUBLICATION STATUS / WAITING FOR FIRST VERIFIED SNAPSHOT</span>
            <h2>THE DESK IS OPEN.<br /><span>THE DATA COMES FIRST.</span></h2>
            <p>The daily publisher has not filed an issue yet, or the public archive could not be reached. No report is fabricated as a placeholder. The automated collection is scheduled every morning at 09:17 Europe/Rome.</p>
            <Link className="button button--primary" href="/daily-office/onchain/archive">CHECK THE ARCHIVE ↗</Link>
          </section>
        )}
      </div>
      <DepartmentFooter message={["THE DATA HAS BEEN FILED.", "THE INTERPRETATION REMAINS SUBJECT TO EVIDENCE."]} />
    </main>
  );
}
