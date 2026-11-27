import Link from "next/link";
import type { OnchainReport } from "./onchain-data";
import {
  formatOnchainMoney,
  formatOnchainPercent,
  truncateAddress,
} from "./onchain-data";

type OnchainReportViewProps = {
  report: OnchainReport;
  compact?: boolean;
};

function formatIssuedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export default function OnchainReportView({ report, compact = false }: OnchainReportViewProps) {
  const featured = report.featuredToken;

  return (
    <article className={"onchain-report" + (compact ? " onchain-report--compact" : "")}>
      <div className="onchain-report__topline">
        <span>ONCHAIN INTELLIGENCE / DAILY FILE</span>
        <time dateTime={report.issueDate}>{report.issueDate} / EUROPE-ROME</time>
      </div>

      <div className="onchain-report__classification">
        <span className={featured ? "onchain-report__signal" : "onchain-report__signal onchain-report__signal--quiet"}>
          <i /> {report.classification}
        </span>
        <span>DATA SNAPSHOT / {formatIssuedAt(report.issuedAt)}</span>
      </div>

      <header className="onchain-report__header">
        <p className="eyebrow">THE DYOR DEPARTMENT / REAL DATA, NO REAL-TIME HYPE</p>
        <h2>{report.title}</h2>
        <p>{report.standfirst}</p>
      </header>

      {featured ? (
        <section className="onchain-feature" aria-label="Featured Solana DEX pair">
          <div className="onchain-feature__identity">
            <div>
              <span>FEATURED PAIR / {featured.discoveryType}</span>
              <strong>{featured.name} <small>${featured.symbol}</small></strong>
              <code title={featured.address}>{truncateAddress(featured.address)}</code>
            </div>
            <a href={featured.pairUrl} target="_blank" rel="noreferrer">
              OPEN DEX SCREENER ↗
            </a>
          </div>
          <div className="onchain-feature__metrics">
            <div><span>PAIR PRICE / USD</span><strong>{featured.priceUsd === null ? "N/D" : "$" + featured.priceUsd.toPrecision(6)}</strong></div>
            <div><span>POOL LIQUIDITY</span><strong>{formatOnchainMoney(featured.liquidityUsd)}</strong></div>
            <div><span>24H VOLUME</span><strong>{formatOnchainMoney(featured.volume24hUsd)}</strong></div>
            <div><span>24H PRICE CHANGE</span><strong className={featured.priceChange24hPct === null ? "" : featured.priceChange24hPct >= 0 ? "onchain-positive" : "onchain-negative"}>{formatOnchainPercent(featured.priceChange24hPct)}</strong></div>
            <div><span>24H BUYS / SELLS</span><strong>{featured.buys24h.toLocaleString("en-US")} / {featured.sells24h.toLocaleString("en-US")}</strong></div>
            <div><span>VOLUME / LIQUIDITY</span><strong>{featured.volumeLiquidityRatio === null ? "N/D" : featured.volumeLiquidityRatio.toFixed(2) + "×"}</strong></div>
          </div>
          <div className="onchain-feature__footer">
            <span>DEX / {featured.dexId}</span>
            <span>24H TXNS / {featured.totalTransactions24h.toLocaleString("en-US")}</span>
            <span>BUY SHARE / {featured.buySharePct === null ? "N/D" : featured.buySharePct.toFixed(1) + "%"}</span>
          </div>
        </section>
      ) : (
        <section className="onchain-quiet" aria-label="No qualifying featured token">
          <span>NO FEATURE WAS FORCED TODAY</span>
          <strong>{report.counts.qualifyingCandidates} candidates passed the initial threshold; {report.counts.freshQualifyingCandidates} were new to the recent archive.</strong>
          <p>The Department records a quiet day instead of manufacturing a market story to fill a slot.</p>
        </section>
      )}

      <div className="onchain-report__body">
        {report.sections.map((section) => (
          <section className="onchain-report__section" key={section.heading}>
            <h3>{section.heading}</h3>
            {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </section>
        ))}
      </div>

      {report.observations.length > 0 && (
        <section className="onchain-observations">
          <div className="onchain-observations__heading">
            <span>ADDITIONAL PAIRS IN THE SAME DISCOVERY SAMPLE</span>
            <small>{report.observations.length} OBSERVATIONS</small>
          </div>
          <div className="onchain-observations__grid">
            {report.observations.map((item) => (
              <a className="onchain-observation" href={item.pairUrl} target="_blank" rel="noreferrer" key={item.address}>
                <span>{item.discoveryType}</span>
                <strong>{item.name} <small>${item.symbol}</small></strong>
                <div>
                  <span>LIQUIDITY <b>{formatOnchainMoney(item.liquidityUsd)}</b></span>
                  <span>24H VOLUME <b>{formatOnchainMoney(item.volume24hUsd)}</b></span>
                </div>
                <em>INSPECT PAIR ↗</em>
              </a>
            ))}
          </div>
        </section>
      )}

      <footer className="onchain-report__footer">
        <div>
          <span>COLLECTION COUNTS / DISCOVERY SAMPLE</span>
          <p>{report.counts.solanaProfiles} Solana profiles · {report.counts.solanaTakeovers} takeovers · {report.counts.pairsReturned} DEX pairs · {report.counts.qualifyingCandidates} qualifying pairs.</p>
        </div>
        <div>
          <span>SOURCE AND LIMITATIONS</span>
          <p>{report.sourceSummary} Aggregated pair data is not a wallet-level investigation. Transaction counts do not represent unique traders.</p>
          <p>{report.sources.map((source, index) => (
            <span key={source.url}>{index > 0 ? " / " : ""}<a href={source.url} target="_blank" rel="noreferrer">{source.label} ↗</a></span>
          ))}</p>
        </div>
      </footer>

      {!compact && (
        <details className="onchain-methodology">
          <summary>OPEN THE COLLECTION METHOD / WHAT THE DEPARTMENT ACTUALLY CHECKED</summary>
          <ol>
            {report.methodology.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </details>
      )}

      {!compact && (
        <div className="onchain-report__actions">
          <Link className="button button--primary" href="/daily-office/onchain/archive">OPEN THE DAILY ONCHAIN ARCHIVE ↗</Link>
          <Link className="button button--quiet" href="/daily-office">BACK TO THE TRENCHES DESK ↗</Link>
        </div>
      )}
    </article>
  );
}
