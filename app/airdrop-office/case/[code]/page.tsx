import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import DepartmentNextSteps from "../../../components/department-next-steps";
import DepartmentCrossRead from "../../../components/department-cross-read";
import DepartmentPublicShare from "../../../components/department-public-share";
import { buildDepartmentShareText } from "../../../lib/department-share-copy";
import { buildAirdropResult, decodeAirdropCode, encodeAirdropCode } from "../../airdrop-engine";

type AirdropCasePageProps = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: AirdropCasePageProps): Promise<Metadata> {
  const { code } = await params;
  const answers = decodeAirdropCode(code);
  if (!answers) {
    return {
      title: "Unrecognized Airdrop Entitlement File",
      description: "This fictional snapshot and eligibility case could not be verified.",
      robots: { index: false, follow: false },
    };
  }

  const result = buildAirdropResult(answers);
  const title = result.profile.title + " | THE AIRDROP ENTITLEMENT OFFICE";
  const description = result.crossRead.headline + ". " + result.profile.subtitle + " " + result.profile.roast;
  const route = "/airdrop-office/case/" + encodeURIComponent(code);
  const image = route + "/opengraph-image";
  return {
    title,
    description,
    alternates: { canonical: route },
    robots: { index: false, follow: true },
    openGraph: { title, description, type: "website", url: route, images: [{ url: image, width: 1200, height: 630, alt: "Fictional Airdrop Entitlement Office case file: " + result.profile.title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function AirdropCasePage({ params }: AirdropCasePageProps) {
  const { code } = await params;
  const answers = decodeAirdropCode(code);
  if (!answers) notFound();

  const result = buildAirdropResult(answers);
  const canonicalCode = encodeAirdropCode(answers);
  const caseUrl = "/airdrop-office/case/" + encodeURIComponent(canonicalCode);
  const challengeUrl = "/airdrop-office?challenge=" + encodeURIComponent(canonicalCode);
  const xText = buildDepartmentShareText({
    opening: "THE AIRDROP ENTITLEMENT OFFICE filed my fictional snapshot case.",
    finding: "Classification: " + result.profile.title + ".",
    evidence: "Receipts: " + result.receipts + "/100. Rule awareness: " + result.ruleAwareness + "/100. Expectation control: " + result.expectationControl + "/100.",
    punchline: result.profile.roast,
    invitation: "File your own eligibility paperwork.",
  });

  return (
    <main className="audit-page utility-page airdrop-page airdrop-case-page" id="main-content">
      <DepartmentHeader activeSection="airdrop" statusMessage="PUBLIC ENTITLEMENT FILE / FICTIONAL" ctaHref="/airdrop-office" ctaLabel="FILE ELIGIBILITY CASE" />
      <section className="utility-shell shell" id="content-start" tabIndex={-1}>
        <aside className="utility-intro airdrop-intro">
          <div className="audit-intro__meta"><span>FORM AEO-001</span><span>PUBLIC CASE / FICTIONAL</span></div>
          <p className="eyebrow">AIRDROP ENTITLEMENT OFFICE / SNAPSHOT TRIBUNAL</p>
          <h1>THE SNAPSHOT<br /><span>TRIBUNAL.</span></h1>
          <p className="audit-intro__lead">A public record of a fictional interview about receipts, eligibility rules and the reward expectations attached to airdrop farming.</p>
          <div className="utility-intro__stamp airdrop-intro__stamp"><span>DEPARTMENTAL REMINDER</span><strong>POINTS ARE NOT AN ALLOCATION.</strong><small>ACTIVITY IS NOT AUTOMATIC ELIGIBILITY.</small></div>
          <div className="utility-intro__fineprint">NO WALLET, PROGRAMME, POINTS DASHBOARD OR REAL CLAIM STATUS WAS CHECKED.</div>
        </aside>
        <section className="utility-panel utility-result airdrop-result airdrop-public-result">
          <div className="utility-panel__header"><span>PUBLIC ENTITLEMENT RECORD / CASE No. {result.caseNumber}</span><span className="utility-status utility-status--closed">● FILED</span></div>
          <p className="eyebrow">FINAL DETERMINATION / FORM AEO-001</p>
          <h2>{result.profile.title}</h2>
          <p className="utility-result__subtitle">{result.profile.subtitle}</p>
          <div className="utility-finding airdrop-finding"><span>DEPARTMENTAL FINDING / NOT AN ELIGIBILITY DECISION</span><strong>{result.finding}</strong><small>{result.profile.disposition}</small></div>
          <div className="utility-metrics airdrop-metrics">
            <div><span>RECEIPT QUALITY</span><strong>{result.receipts}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
            <div><span>RULE AWARENESS</span><strong className="utility-fog">{result.ruleAwareness}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
            <div><span>EXPECTATION CONTROL</span><strong className="utility-token">{result.expectationControl}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
          </div>
          <DepartmentCrossRead read={result.crossRead} />
          <div className="utility-secondary airdrop-secondary"><span>SECONDARY PATTERN DETECTED</span><strong>{result.secondaryProfile.title}</strong><small>{result.secondaryProfile.subtitle}</small></div>
          <div className="utility-roast airdrop-roast"><span>THE DEPARTMENT HAS A COMMENT</span><p>“{result.profile.roast}”</p></div>
          <div className="utility-history airdrop-history">
            <div className="utility-history__heading"><span>INTERVIEW RECORD</span><span>7 ANSWERS RECORDED</span></div>
            {result.history.map((item, index) => (
              <div className="utility-history__row" key={index}><span>0{index + 1}</span><div><strong>{item.question}</strong><small>{item.answer}</small></div><b>{item.receipts}/5</b></div>
            ))}
          </div>
          <div className="utility-public-case__actions airdrop-actions">
            <Link className="button button--primary" href={challengeUrl}>CHALLENGE ANOTHER FARMER <span>↗</span></Link>
            <DepartmentPublicShare title="Airdrop Entitlement Office case file" shareText={xText} casePath={caseUrl} />
            <Link className="button button--quiet" href="/airdrop-office">FILE YOUR OWN ELIGIBILITY CASE ↗</Link>
          </div>
          <p className="utility-disclaimer">This public file reconstructs answer choices encoded in its URL. It does not check or assess any real airdrop, wallet, network, points programme, snapshot, eligibility, allocation or claim. Scores are fictional entertainment only.</p>
        </section>
      </section>
      <div className="shell"><DepartmentNextSteps currentDepartment="airdrop" /></div>
      <DepartmentFooter message={["A PUBLIC RECORD OF A FICTIONAL ELIGIBILITY INTERVIEW.", "THE SNAPSHOT RULES REMAIN A SEPARATE DOCUMENT."]} />
    </main>
  );
}
