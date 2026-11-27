import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import DepartmentNextSteps from "../../../components/department-next-steps";
import DepartmentCrossRead from "../../../components/department-cross-read";
import { buildDepartmentShareText } from "../../../lib/department-share-copy";
import DepartmentPublicShare from "../../../components/department-public-share";
import { buildSimulatorResult, decodeSimulatorCode, encodeSimulatorCode } from "../../simulator-engine";

type SimulatorCasePageProps = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: SimulatorCasePageProps): Promise<Metadata> {
  const { code } = await params;
  const decisions = decodeSimulatorCode(code);

  if (!decisions) {
    return {
      title: "Unrecognized Pump.fun Paper Market File",
      description: "This fictional Pump.fun paper-market case could not be verified.",
      robots: { index: false, follow: false },
    };
  }

  const result = buildSimulatorResult(decisions);
  const title = result.profile.title + " | PUMP.FUN INTELLIGENCE / PAPER MARKET SIMULATOR";
  const description = result.crossRead.headline + ". " + result.profile.subtitle + " " + result.profile.roast;
  const route = "/simulator/case/" + encodeURIComponent(encodeSimulatorCode(decisions));
  const image = route + "/opengraph-image";

  return {
    title,
    description,
    alternates: { canonical: route },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: route,
      images: [{ url: image, width: 1200, height: 630, alt: "Fictional Pump.fun Paper Market case file: " + result.profile.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function SimulatorCasePage({ params }: SimulatorCasePageProps) {
  const { code } = await params;
  const decisions = decodeSimulatorCode(code);
  if (!decisions) notFound();

  const result = buildSimulatorResult(decisions);
  const canonicalCode = encodeSimulatorCode(decisions);
  const caseUrl = "/simulator/case/" + encodeURIComponent(canonicalCode);
  const challengeUrl = "/simulator?challenge=" + encodeURIComponent(canonicalCode);
  const xText = buildDepartmentShareText({
    opening: "THE DYOR DEPARTMENT filed my fictional Pump.fun Paper Market case.",
    finding: "Classification: " + result.profile.title + ". Cross-read: " + result.crossRead.headline + ".",
    evidence: "Paper P/L: " + (result.paperPnl >= 0 ? "+" : "") + result.paperPnl.toFixed(2) + " DPC.",
    punchline: result.profile.roast,
    invitation: "Run the paper market.",
  });

  return (
    <main className="audit-page simulator-case-page" id="main-content">
      <DepartmentHeader activeSection="simulator" statusMessage="PUBLIC PUMP.FUN PAPER MARKET FILE / FICTIONAL" ctaHref="/simulator" ctaLabel="RUN PAPER MARKET" />

      <section className="simulator-public-case shell" id="content-start" tabIndex={-1}>
        <div className="simulator-public-case__meta">
          <span>PUBLIC SIMULATION RECORD / CASE No. {result.caseNumber}</span>
          <span>HYPE-404 / NOT A REAL TOKEN</span>
        </div>

        <p className="eyebrow">FINAL DISPOSITION / PAPER MARKET CLOSED</p>
        <h1>{result.profile.title}</h1>
        <p className="simulator-result__subtitle">{result.profile.subtitle}</p>

        <div className="simulator-ending">
          <span>DEPARTMENTAL DISPOSITION</span>
          <strong>{result.profile.ending}</strong>
        </div>

        <div className="simulator-result__metrics">
          <div><span>FINAL PAPER NET WORTH</span><strong>{result.netWorth.toFixed(2)} <small>DPC</small></strong></div>
          <div>
            <span>PAPER PROFIT / LOSS</span>
            <strong className={result.paperPnl >= 0 ? "simulator-positive" : "red-text"}>
              {result.paperPnl >= 0 ? "+" : ""}{result.paperPnl.toFixed(2)} <small>DPC</small>
            </strong>
          </div>
          <div>
            <span>FICTIONAL RETURN</span>
            <strong className={result.paperReturn >= 0 ? "simulator-positive" : "red-text"}>
              {result.paperReturn > 0 ? "+" : ""}{result.paperReturn.toFixed(1)}<small>%</small>
            </strong>
          </div>
          <div>
            <span>RESEARCH INTEGRITY / {3 - result.intelFilesRemaining} FILES CHECKED</span>
            <strong>{result.researchScore}<small>/100</small></strong>
          </div>
          <div>
            <span>CHAT DEPENDENCY</span>
            <strong className={result.chatHeat >= 55 ? "red-text" : "simulator-positive"}>{result.chatHeat}<small>/100</small></strong>
          </div>
          <div>
            <span>EXIT DISCIPLINE / {result.guardsTriggered} GUARDS TRIGGERED</span>
            <strong>{result.exitDiscipline}<small>/100</small></strong>
          </div>
        </div>

        <DepartmentCrossRead read={result.crossRead} />

        <div className="simulator-roast">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <p>“{result.profile.roast}”</p>
        </div>

        <div className="simulator-decision-summary">
          <span>DECISIONS RECORDED</span>
          <strong>{result.decisionSummary}</strong>
        </div>

        <div className="simulator-history">
          {result.history.map((entry) => (
            <div className="simulator-history__row" key={entry.day}>
              <span>DAY {String(entry.day).padStart(2, "0")}</span>
              <div>
                <strong>{entry.headline}</strong>
                <small>{entry.actionLabel} / PAPER PRICE {entry.movement}</small>
              </div>
              <b>{entry.netWorthAfter.toFixed(0)} DPC</b>
            </div>
          ))}
        </div>

        <div className="simulator-roast simulator-public-case__roast">
          <span>THE DEPARTMENT HAS A SECOND COMMENT</span>
          <p>“{result.profile.ending}”</p>
        </div>

        <div className="simulator-public-case__actions">
          <Link className="button button--primary" href={challengeUrl}>ACCEPT THE CHALLENGE <span>↗</span></Link>
          <DepartmentPublicShare title="Pump.fun Paper Market case file" shareText={xText} casePath={caseUrl} />
          <Link className="button button--quiet" href="/simulator">RUN YOUR OWN PAPER MARKET ↗</Link>
        </div>

        <DepartmentNextSteps currentDepartment="simulator" />

        <p className="simulator-disclaimer">
          This public case reconstructs anonymous choices encoded in its URL. All assets, prices, events,
          balances and outcomes are fictional. DPC is not a currency and HYPE-404 is not a token.
          This is entertainment, not financial advice or a simulation of actual market conditions.
        </p>
      </section>

      <DepartmentFooter message={["A PUBLIC RECORD OF A FICTIONAL PUMP.FUN LAUNCH.", "NO TOKEN. NO REAL MONEY. NO FINANCIAL ADVICE."]} />
    </main>
  );
}
