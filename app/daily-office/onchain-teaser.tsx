import Link from "next/link";
import { getOnchainReportIndex } from "./onchain/onchain-data";

export default async function OnchainDailyTeaser() {
  let latest = null;
  let archiveUnavailable = false;
  try {
    const index = await getOnchainReportIndex();
    latest = index?.reports[0] ?? null;
  } catch {
    archiveUnavailable = true;
  }

  return (
    <section className="onchain-desk-teaser" aria-labelledby="onchain-desk-teaser-title">
      <div className="onchain-desk-teaser__stamp">
        <span>PUBLIC DEX SNAPSHOT / SOLANA PAIRS</span>
        <b><i /> AUTO-PUBLISHED / DAILY</b>
      </div>
      <div className="onchain-desk-teaser__body">
        <p className="eyebrow">THE NEW EDITORIAL DESK / DATA FIRST. DIGNITY OPTIONAL.</p>
        <h2 id="onchain-desk-teaser-title">ONCHAIN<br /><span>INTELLIGENCE.</span></h2>
        {archiveUnavailable ? (
          <>
            <div className="onchain-desk-teaser__meta">SOURCE STATUS / ARCHIVE UNAVAILABLE</div>
            <strong className="onchain-desk-teaser__headline">THE FILE CANNOT BE VERIFIED.</strong>
            <p>The public report source could not be reached. This is an archive connection issue, not a quiet market day. No report will be invented to fill the gap.</p>
            <div className="onchain-desk-teaser__links">
              <Link className="button button--primary" href="/daily-office/onchain">CHECK ONCHAIN INTELLIGENCE ↗</Link>
            </div>
          </>
        ) : latest ? (
          <>
            <div className="onchain-desk-teaser__meta">LATEST FILE / {latest.issueDate} / {latest.classification}</div>
            <strong className="onchain-desk-teaser__headline">{latest.title}</strong>
            <p>{latest.standfirst}</p>
            <div className="onchain-desk-teaser__links">
              <Link className="button button--primary" href={"/daily-office/onchain/" + latest.issueDate}>READ THE LATEST REPORT ↗</Link>
              <Link className="button button--quiet" href="/daily-office/onchain/archive">OPEN ARCHIVE ↗</Link>
            </div>
          </>
        ) : (
          <>
            <div className="onchain-desk-teaser__meta">FIRST AUTOMATED ISSUE / PENDING COLLECTION</div>
            <strong className="onchain-desk-teaser__headline">THE DATA DESK IS OPEN.</strong>
            <p>The first daily report will appear here after the scheduled public-data collection. No market story is generated when the source feed cannot be verified.</p>
            <div className="onchain-desk-teaser__links">
              <Link className="button button--primary" href="/daily-office/onchain">OPEN ONCHAIN INTELLIGENCE ↗</Link>
            </div>
          </>
        )}
      </div>
      <div className="onchain-desk-teaser__footer">
        <span>REAL PAIR METRICS / UNOFFICIAL DEPARTMENT VERDICT</span>
        <span>NO PAID API / NO AI API / NO DATABASE</span>
      </div>
    </section>
  );
}
