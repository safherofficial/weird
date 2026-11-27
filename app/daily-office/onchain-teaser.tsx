import Link from "next/link";
import { getOnchainReportIndex } from "./onchain/onchain-data";

export default async function OnchainDailyTeaser() {
  const index = await getOnchainReportIndex();
  const latest = index?.reports[0] ?? null;

  return (
    <section className="onchain-desk-teaser" aria-labelledby="onchain-desk-teaser-title">
      <div className="onchain-desk-teaser__stamp">
        <span>LIVE DATA / SOLANA DEX PAIRS</span>
        <b><i /> DAILY AUTOMATION</b>
      </div>
      <div className="onchain-desk-teaser__body">
        <p className="eyebrow">THE NEW EDITORIAL DESK / DATA FIRST. DIGNITY OPTIONAL.</p>
        <h2 id="onchain-desk-teaser-title">ONCHAIN<br /><span>INTELLIGENCE.</span></h2>
        {latest ? (
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
