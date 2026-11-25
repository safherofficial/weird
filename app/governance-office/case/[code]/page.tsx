import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import DepartmentNextSteps from "../../../components/department-next-steps";
import DepartmentCrossRead from "../../../components/department-cross-read";
import DepartmentPublicShare from "../../../components/department-public-share";
import { buildDepartmentShareText } from "../../../lib/department-share-copy";
import { buildGovernanceResult, decodeGovernanceCode, encodeGovernanceCode } from "../../governance-engine";

type GovernanceCasePageProps = { params: Promise<{ code: string }> };

export async function generateMetadata({ params }: GovernanceCasePageProps): Promise<Metadata> {
  const { code } = await params;
  const answers = decodeGovernanceCode(code);
  if (!answers) {
    return {
      title: "Unrecognized Governance Review File",
      description: "This fictional proposal and quorum case could not be reconstructed.",
      robots: { index: false, follow: false },
    };
  }
  const result = buildGovernanceResult(answers);
  const title = result.profile.title + " | THE GOVERNANCE ACCOUNTABILITY OFFICE";
  const description = result.crossRead.headline + ". " + result.profile.subtitle + " " + result.profile.roast;
  const route = "/governance-office/case/" + encodeURIComponent(code);
  const image = route + "/opengraph-image";
  return {
    title,
    description,
    alternates: { canonical: route },
    robots: { index: false, follow: true },
    openGraph: { title, description, type: "website", url: route, images: [{ url: image, width: 1200, height: 630, alt: "Fictional Governance Accountability Office case file: " + result.profile.title }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function GovernanceCasePage({ params }: GovernanceCasePageProps) {
  const { code } = await params;
  const answers = decodeGovernanceCode(code);
  if (!answers) notFound();

  const result = buildGovernanceResult(answers);
  const canonicalCode = encodeGovernanceCode(answers);
  const caseUrl = "/governance-office/case/" + encodeURIComponent(canonicalCode);
  const challengeUrl = "/governance-office?challenge=" + encodeURIComponent(canonicalCode);
  const xText = buildDepartmentShareText({
    opening: "THE GOVERNANCE ACCOUNTABILITY OFFICE filed my fictional quorum case.",
    finding: "Classification: " + result.profile.title + ".",
    evidence: "Proposal clarity: " + result.proposalClarity + "/100. Voting discipline: " + result.votingDiscipline + "/100. Execution awareness: " + result.executionAwareness + "/100.",
    punchline: result.profile.roast,
    invitation: "File your own quorum review.",
  });

  return (
    <main className="audit-page utility-page governance-page governance-case-page" id="main-content">
      <DepartmentHeader activeSection="governance" statusMessage="PUBLIC GOVERNANCE FILE / FICTIONAL" ctaHref="/governance-office" ctaLabel="FILE GOVERNANCE REVIEW" />
      <section className="utility-shell shell" id="content-start" tabIndex={-1}>
        <aside className="utility-intro governance-intro">
          <div className="audit-intro__meta"><span>FORM GAO-001</span><span>PUBLIC CASE / FICTIONAL</span></div>
          <p className="eyebrow">GOVERNANCE ACCOUNTABILITY OFFICE / THE QUORUM TRIBUNAL</p>
          <h1>THE QUORUM<br /><span>TRIBUNAL.</span></h1>
          <p className="audit-intro__lead">A public record of a fictional interview about proposal scope, voting rules, cross-chain aggregation and the difference between a passed vote and an executed change.</p>
          <div className="utility-intro__stamp governance-intro__stamp"><span>DEPARTMENTAL REMINDER</span><strong>A VOTE IS NOT AN EXECUTED DECISION.</strong><small>NO LIVE GOVERNANCE PROCESS WAS CHECKED.</small></div>
          <div className="utility-intro__fineprint">NO DAO, PROPOSAL, WALLET, VOTE OR EXECUTION WAS QUERIED.</div>
        </aside>
        <section className="utility-panel utility-result governance-result governance-public-result">
          <div className="utility-panel__header"><span>PUBLIC GOVERNANCE RECORD / CASE No. {result.caseNumber}</span><span className="utility-status utility-status--closed">● FILED</span></div>
          <p className="eyebrow">FINAL DETERMINATION / FORM GAO-001</p>
          <h2>{result.profile.title}</h2>
          <p className="utility-result__subtitle">{result.profile.subtitle}</p>
          <div className="utility-finding governance-finding"><span>DEPARTMENTAL FINDING / NOT A VOTE OR EXECUTION STATUS REPORT</span><strong>{result.finding}</strong><small>{result.profile.disposition}</small></div>
          <div className="utility-metrics governance-metrics">
            <div><span>PROPOSAL CLARITY</span><strong>{result.proposalClarity}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
            <div><span>VOTING DISCIPLINE</span><strong className="utility-fog">{result.votingDiscipline}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
            <div><span>EXECUTION AWARENESS</span><strong className="utility-token">{result.executionAwareness}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
          </div>
          <DepartmentCrossRead read={result.crossRead} />
          <div className="utility-secondary governance-secondary"><span>SECONDARY PATTERN DETECTED</span><strong>{result.secondaryProfile.title}</strong><small>{result.secondaryProfile.subtitle}</small></div>
          <div className="utility-roast governance-roast"><span>THE DEPARTMENT HAS A COMMENT</span><p>“{result.profile.roast}”</p></div>
          <div className="utility-history governance-history">
            <div className="utility-history__heading"><span>GOVERNANCE INTERVIEW RECORD</span><span>7 ANSWERS RECORDED</span></div>
            {result.history.map((item, index) => (
              <div className="utility-history__row" key={index}><span>0{index + 1}</span><div><strong>{item.question}</strong><small>{item.answer}</small></div><b>{item.proposalClarity}/5</b></div>
            ))}
          </div>
          <div className="utility-public-case__actions governance-actions">
            <Link className="button button--primary" href={challengeUrl}>CHALLENGE ANOTHER DELEGATE <span>↗</span></Link>
            <DepartmentPublicShare title="Governance Accountability Office case file" shareText={xText} casePath={caseUrl} />
            <Link className="button button--quiet" href="/governance-office">FILE YOUR OWN GOVERNANCE REVIEW ↗</Link>
          </div>
          <p className="utility-disclaimer">This public file reconstructs only the seven selected answer indexes encoded in its URL. It does not check or assess any real DAO, proposal, wallet, vote, voting contract, voting power, snapshot, delegate identity, quorum or execution. Scores are fictional entertainment only.</p>
        </section>
      </section>
      <div className="shell"><DepartmentNextSteps currentDepartment="governance" /></div>
      <DepartmentFooter message={["A PUBLIC RECORD OF A FICTIONAL GOVERNANCE INTERVIEW.", "EXECUTION STILL REQUIRES ITS OWN AUTHORITY."]} />
    </main>
  );
}
