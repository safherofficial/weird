import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import DepartmentNextSteps from "../../../components/department-next-steps";
import DepartmentCrossRead from "../../../components/department-cross-read";
import DepartmentPublicShare from "../../../components/department-public-share";
import { buildDepartmentShareText } from "../../../lib/department-share-copy";
import { buildBridgeResult, decodeBridgeCode, encodeBridgeCode } from "../../bridge-engine";

type BridgeCasePageProps = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: BridgeCasePageProps): Promise<Metadata> {
  const { code } = await params;
  const answers = decodeBridgeCode(code);
  if (!answers) {
    return {
      title: "Unrecognized Bridge Incident File",
      description: "This fictional cross-chain transfer case could not be reconstructed.",
      robots: { index: false, follow: false },
    };
  }

  const result = buildBridgeResult(answers);
  const title = result.profile.title + " | THE BRIDGE INCIDENT OFFICE";
  const description = result.crossRead.headline + ". " + result.profile.subtitle + " " + result.profile.roast;
  const route = "/bridge-incident-office/case/" + encodeURIComponent(code);
  const image = route + "/opengraph-image";
  return {
    title,
    description,
    alternates: { canonical: route },
    robots: { index: false, follow: true },
    openGraph: { title, description, type: "website", url: route, images: [{ url: image, width: 1200, height: 630, alt: "Fictional Bridge Incident Office case file: " + result.profile.title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function BridgeCasePage({ params }: BridgeCasePageProps) {
  const { code } = await params;
  const answers = decodeBridgeCode(code);
  if (!answers) notFound();

  const result = buildBridgeResult(answers);
  const canonicalCode = encodeBridgeCode(answers);
  const caseUrl = "/bridge-incident-office/case/" + encodeURIComponent(canonicalCode);
  const challengeUrl = "/bridge-incident-office?challenge=" + encodeURIComponent(canonicalCode);
  const xText = buildDepartmentShareText({
    opening: "THE BRIDGE INCIDENT OFFICE filed my fictional transfer case.",
    finding: "Classification: " + result.profile.title + ".",
    evidence: "Receipts: " + result.receiptQuality + "/100. Route literacy: " + result.routeLiteracy + "/100. Patience: " + result.patienceDiscipline + "/100.",
    punchline: result.profile.roast,
    invitation: "File your own interchain incident report.",
  });

  return (
    <main className="audit-page utility-page bridge-incident-page bridge-case-page" id="main-content">
      <DepartmentHeader activeSection="bridge" statusMessage="PUBLIC INCIDENT FILE / FICTIONAL" ctaHref="/bridge-incident-office" ctaLabel="FILE TRANSFER INCIDENT" />
      <section className="utility-shell shell" id="content-start" tabIndex={-1}>
        <aside className="utility-intro bridge-intro">
          <div className="audit-intro__meta"><span>FORM BIO-001</span><span>PUBLIC CASE / FICTIONAL</span></div>
          <p className="eyebrow">BRIDGE INCIDENT OFFICE / INTERCHAIN TRANSFER REVIEW</p>
          <h1>THE BRIDGE<br /><span>INCIDENT OFFICE.</span></h1>
          <p className="audit-intro__lead">A public record of a fictional interview about source and destination receipts, route status and the support ticket that became a second occupation.</p>
          <div className="utility-intro__stamp bridge-intro__stamp"><span>DEPARTMENTAL REMINDER</span><strong>ONE RECEIPT IS NOT TWO SETTLEMENTS.</strong><small>NO LIVE TRANSFER STATUS WAS CHECKED.</small></div>
          <div className="utility-intro__fineprint">NO WALLET, NETWORK, BRIDGE OR TRANSACTION WAS QUERIED.</div>
        </aside>
        <section className="utility-panel utility-result bridge-result bridge-public-result">
          <div className="utility-panel__header"><span>PUBLIC INCIDENT RECORD / CASE No. {result.caseNumber}</span><span className="utility-status utility-status--closed">● FILED</span></div>
          <p className="eyebrow">FINAL DETERMINATION / FORM BIO-001</p>
          <h2>{result.profile.title}</h2>
          <p className="utility-result__subtitle">{result.profile.subtitle}</p>
          <div className="utility-finding bridge-finding"><span>DEPARTMENTAL FINDING / NOT A TRANSFER STATUS REPORT</span><strong>{result.finding}</strong><small>{result.profile.disposition}</small></div>
          <div className="utility-metrics bridge-metrics">
            <div><span>RECEIPT QUALITY</span><strong>{result.receiptQuality}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
            <div><span>ROUTE LITERACY</span><strong className="utility-fog">{result.routeLiteracy}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
            <div><span>PATIENCE DISCIPLINE</span><strong className="utility-token">{result.patienceDiscipline}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
          </div>
          <DepartmentCrossRead read={result.crossRead} />
          <div className="utility-secondary bridge-secondary"><span>SECONDARY PATTERN DETECTED</span><strong>{result.secondaryProfile.title}</strong><small>{result.secondaryProfile.subtitle}</small></div>
          <div className="utility-roast bridge-roast"><span>THE DEPARTMENT HAS A COMMENT</span><p>“{result.profile.roast}”</p></div>
          <div className="utility-history bridge-history">
            <div className="utility-history__heading"><span>INCIDENT INTERVIEW RECORD</span><span>7 ANSWERS RECORDED</span></div>
            {result.history.map((item, index) => (
              <div className="utility-history__row" key={index}><span>0{index + 1}</span><div><strong>{item.question}</strong><small>{item.answer}</small></div><b>{item.receiptQuality}/5</b></div>
            ))}
          </div>
          <div className="utility-public-case__actions bridge-actions">
            <Link className="button button--primary" href={challengeUrl}>CHALLENGE ANOTHER TRAVELLER <span>↗</span></Link>
            <DepartmentPublicShare title="Bridge Incident Office case file" shareText={xText} casePath={caseUrl} />
            <Link className="button button--quiet" href="/bridge-incident-office">FILE YOUR OWN INCIDENT ↗</Link>
          </div>
          <p className="utility-disclaimer">This public file reconstructs answer choices encoded in its URL. It does not check wallets, transactions, networks, bridges, messages, route providers, transfer states, refunds or support tickets. Scores are fictional entertainment only.</p>
        </section>
      </section>
      <div className="shell"><DepartmentNextSteps currentDepartment="bridge" /></div>
      <DepartmentFooter message={["A PUBLIC RECORD OF A FICTIONAL INTERCHAIN INCIDENT.", "THE DESTINATION WINDOW HAS NOT SIGNED FOR IT."]} />
    </main>
  );
}
