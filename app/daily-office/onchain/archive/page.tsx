import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import { formatOnchainMoney, getOnchainReportIndex } from "../onchain-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Onchain Intelligence Archive | THE DYOR DEPARTMENT",
  description: "A dated archive of daily Solana DEX market observations, built from public DEX Screener pair data.",
  alternates: { canonical: "/daily-office/onchain/archive" },
};

export default async function OnchainArchivePage() {
  let index = null;
  let archiveUnavailable = false;
  try {
    index = await getOnchainReportIndex();
  } catch {
    archiveUnavailable = true;
  }
  const reports = index?.reports ?? [];

  return (
    <main className="audit-page onchain-intelligence-page onchain-archive-page" id="main-content">
      <DepartmentHeader
        activeSection="daily"
        statusMessage="ONCHAIN INTELLIGENCE / PERMANENT DAILY REGISTER"
        ctaHref="/daily-office/onchain"
        ctaLabel="LATEST ONCHAIN FILE"
      />
      <div className="onchain-page-shell shell" id="content-start" tabIndex={-1}>
        <header className="onchain-page-intro onchain-archive-intro">
          <div className="audit-intro__meta">
            <span>ONCHAIN INTELLIGENCE / DAILY ARCHIVE</span>
            <span>{reports.length} FILES REGISTERED</span>
          </div>
          <p className="eyebrow">THE DYOR DEPARTMENT / PUBLIC-DATA RECORDS</p>
          <h1>THE PAPER<br /><span>TRAIL.</span></h1>
          <p className="audit-intro__lead">
            Every issue is stored as a dated JSON record in the public repository. The archive is append-only in normal operation: each daily run adds a new report without a database or paid storage.
          </p>
          <div className="onchain-page-intro__actions">
            <Link className="button button--primary" href="/daily-office/onchain">READ THE LATEST REPORT ↗</Link>
            <Link className="button button--quiet" href="/daily-office">BACK TO THE TRENCHES DESK ↗</Link>
          </div>
        </header>

        {archiveUnavailable ? (
          <section className="onchain-waiting onchain-waiting--error" role="status">
            <span>ARCHIVE STATUS / PUBLIC SOURCE UNAVAILABLE</span>
            <h2>THE REGISTER<br /><span>COULD NOT BE VERIFIED.</span></h2>
            <p>The public repository could not be reached or its index could not be validated. The Department will not describe an unavailable archive as an empty one.</p>
            <Link className="button button--primary" href="/daily-office/onchain">RETURN TO ONCHAIN INTELLIGENCE ↗</Link>
          </section>
        ) : reports.length > 0 ? (
          <section className="onchain-archive-list" aria-label="Daily onchain reports">
            {reports.map((report, index) => (
              <article className="onchain-archive-entry" key={report.issueDate}>
                <div className="onchain-archive-entry__index">FILE / {String(reports.length - index).padStart(3, "0")}</div>
                <div className="onchain-archive-entry__main">
                  <div className="onchain-archive-entry__meta">
                    <time dateTime={report.issueDate}>{report.issueDate} / EUROPE-ROME</time>
                    <span>{report.classification}</span>
                  </div>
                  <h2><Link href={"/daily-office/onchain/" + report.issueDate}>{report.title}</Link></h2>
                  <p>{report.standfirst}</p>
                  {report.featuredSymbol && (
                    <div className="onchain-archive-entry__metrics">
                      <span>FEATURED / ${report.featuredSymbol}</span>
                      <span>LIQUIDITY / {formatOnchainMoney(report.liquidityUsd)}</span>
                      <span>24H VOLUME / {formatOnchainMoney(report.volume24hUsd)}</span>
                    </div>
                  )}
                </div>
                <Link className="onchain-archive-entry__open" href={"/daily-office/onchain/" + report.issueDate}>OPEN FILE ↗</Link>
              </article>
            ))}
          </section>
        ) : (
          <section className="onchain-waiting">
            <span>ARCHIVE STATUS / NO FILES REGISTERED</span>
            <h2>THE FIRST REPORT<br /><span>IS IN THE PIPELINE.</span></h2>
            <p>Nothing has been published yet. The publisher will add the first verified issue after its next successful daily data collection. No fake historical records are used to fill this archive.</p>
          </section>
        )}

        {index?.updatedAt && (
          <p className="onchain-archive-updated">ARCHIVE INDEX LAST UPDATED / {index.updatedAt}</p>
        )}
      </div>
      <DepartmentFooter message={["THE ARCHIVE IS CHRONOLOGICAL.", "THE DEPARTMENT WILL NOT EDIT THE NUMBERS TO FIT THE STORY."]} />
    </main>
  );
}
