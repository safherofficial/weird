import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../../components/department-header";
import DepartmentFooter from "../../components/department-footer";
import { getOnchainReport, getOnchainReportIndex } from "./onchain-data";
import OnchainReportView from "./onchain-report-view";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Onchain Intelligence Desk | Daily Solana Reports",
  description: "Real Solana DEX snapshots, reported with the unapologetically satirical voice of THE DYOR DEPARTMENT. Every roast is tied to a metric.",
  alternates: { canonical: "/daily-office/onchain" },
  openGraph: {
    title: "THE DYOR DEPARTMENT / ONCHAIN INTELLIGENCE",
    description: "Public Solana DEX data, transparent selection rules and satirical Department commentary. No invented market events.",
  },
  twitter: {
    card: "summary",
    title: "THE DYOR DEPARTMENT / ONCHAIN INTELLIGENCE",
    description: "Real DEX snapshots. WEIRD commentary. No fabricated market stories.",
  },
};

export default async function OnchainIntelligencePage() {
  let index = null;
  let latest = null;
  let report = null;
  let archiveUnavailable = false;

  try {
    index = await getOnchainReportIndex();
    latest = index?.reports[0] ?? null;
    report = latest ? await getOnchainReport(latest.issueDate) : null;
    if (latest && !report) archiveUnavailable = true;
  } catch {
    archiveUnavailable = true;
  }

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
            A daily report built from real public Solana DEX snapshots. Liquidity, volume, prices and recorded transactions stay factual; the Department’s commentary is free to be gloriously unserious. Every punchline has to earn its place in the data.
          </p>
          <div className="onchain-page-intro__notice">
            <span>METHOD / FREE PUBLIC DATA</span>
            <strong>NO PAID API. NO AI API. NO DATABASE.</strong>
            <small>REAL DEX METRICS / SATIRICAL DEPARTMENT COMMENTARY / NO WALLET-LEVEL CLAIMS OR FINANCIAL ADVICE.</small>
          </div>
          <div className="onchain-page-intro__actions">
            <Link className="button button--quiet" href="/daily-office/onchain/archive">BROWSE ALL DAILY FILES ↗</Link>
            <Link className="button button--quiet" href="/daily-office">RETURN TO THE TRENCHES DESK ↗</Link>
          </div>
        </header>

        {report ? (
          <OnchainReportView report={report} />
        ) : archiveUnavailable ? (
          <section className="onchain-waiting onchain-waiting--error" role="status">
            <span>ARCHIVE STATUS / SOURCE COULD NOT BE VERIFIED</span>
            <h2>THE FILE IS NOT<br /><span>AVAILABLE FOR REVIEW.</span></h2>
            <p>The Department could not verify the public repository or retrieve the latest indexed report. This is a source-availability problem, not evidence of a quiet market day. No substitute story has been generated.</p>
            <Link className="button button--primary" href="/daily-office/onchain/archive">CHECK THE ARCHIVE ↗</Link>
          </section>
        ) : (
          <section className="onchain-waiting">
            <span>PUBLICATION STATUS / WAITING FOR FIRST VERIFIED SNAPSHOT</span>
            <h2>THE DESK IS OPEN.<br /><span>THE DATA COMES FIRST.</span></h2>
            <p>The daily publisher has not filed an issue yet. No report is fabricated as a placeholder. The automated collection is scheduled every morning at 09:17 Europe/Rome.</p>
            <Link className="button button--primary" href="/daily-office/onchain/archive">CHECK THE ARCHIVE ↗</Link>
          </section>
        )}
      </div>
      <DepartmentFooter message={["THE DATA HAS BEEN FILED.", "THE INTERPRETATION REMAINS SUBJECT TO EVIDENCE."]} />
    </main>
  );
}
