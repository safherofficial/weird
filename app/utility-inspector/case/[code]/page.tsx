import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import DepartmentNextSteps from "../../../components/department-next-steps";
import { buildUtilityResult, decodeUtilityCode, encodeUtilityCode } from "../../utility-engine";

type UtilityCasePageProps = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: UtilityCasePageProps): Promise<Metadata> {
  const { code } = await params;
  const answers = decodeUtilityCode(code);

  if (!answers) {
    return {
      title: "Unrecognized Utility File",
      description: "This fictional Department inspection could not be verified.",
      robots: { index: false, follow: false },
    };
  }

  const result = buildUtilityResult(answers);
  const title = result.profile.title + " | THE UTILITY INSPECTOR";
  const description = result.profile.subtitle + " " + result.profile.roast;
  const route = "/utility-inspector/case/" + encodeURIComponent(code);
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
      images: [{ url: image, width: 1200, height: 630, alt: "Fictional Utility Inspector case file: " + result.profile.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function UtilityCasePage({ params }: UtilityCasePageProps) {
  const { code } = await params;
  const answers = decodeUtilityCode(code);
  if (!answers) notFound();

  const result = buildUtilityResult(answers);
  const canonicalCode = encodeUtilityCode(answers);
  const caseUrl = "/utility-inspector/case/" + encodeURIComponent(canonicalCode);
  const challengeUrl = "/utility-inspector?challenge=" + encodeURIComponent(canonicalCode);
  const xText = [
    "THE DYOR DEPARTMENT inspected my utility claims.",
    "Verdict: " + result.profile.title + ".",
    "Utility: " + result.evidence + "/100. Fog: " + result.fog + "/100. Token fit: " + result.tokenFit + "/100.",
    result.profile.roast.length > 60 ? result.profile.roast.slice(0, 56) + "…" : result.profile.roast,
    "Inspect yours.",
  ].join(" ");
  const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(
    "https://weird-zeta.vercel.app" + caseUrl
  );

  return (
    <main className="audit-page utility-case-page" id="main-content">
      <DepartmentHeader activeSection="utility" statusMessage="PUBLIC INSPECTION FILE / FICTIONAL" ctaHref="/utility-inspector" ctaLabel="INSPECT UTILITY" />

      <section className="utility-public-case shell" id="content-start" tabIndex={-1}>
        <div className="utility-public-case__meta">
          <span>PUBLIC INSPECTION RECORD / CASE No. {result.caseNumber}</span>
          <span>FORM UTI-001 / FICTIONAL REVIEW</span>
        </div>

        <p className="eyebrow">FINAL DETERMINATION / CLAIMS REVIEWED</p>
        <h1>{result.profile.title}</h1>
        <p className="utility-result__subtitle">{result.profile.subtitle}</p>

        <div className="utility-finding">
          <span>DEPARTMENTAL FINDING</span>
          <strong>{result.finding}</strong>
          <small>{result.profile.disposition}</small>
        </div>

        <div className="utility-metrics">
          <div><span>UTILITY EVIDENCE</span><strong>{result.evidence}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
          <div><span>NARRATIVE FOG</span><strong className="utility-fog">{result.fog}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
          <div><span>TOKEN JUSTIFICATION</span><strong className="utility-token">{result.tokenFit}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
        </div>

        <div className="utility-secondary">
          <span>SECONDARY PATTERN DETECTED</span>
          <strong>{result.secondaryProfile.title}</strong>
          <small>{result.secondaryProfile.subtitle}</small>
        </div>

        <div className="utility-roast">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <p>“{result.profile.roast}”</p>
        </div>

        <div className="utility-history">
          <div className="utility-history__heading">
            <span>INSPECTION CHECKLIST</span>
            <span>7 ANSWERS RECORDED</span>
          </div>
          {result.history.map((item, index) => (
            <div className="utility-history__row" key={index}>
              <span>0{index + 1}</span>
              <div>
                <strong>{item.question}</strong>
                <small>{item.answer}</small>
              </div>
              <b>{item.evidence}/5</b>
            </div>
          ))}
        </div>

        <div className="utility-public-case__actions">
          <Link className="button button--primary" href={challengeUrl}>CHALLENGE A DEGEN <span>↗</span></Link>
          <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">SHARE THIS CASE ON X <span>↗</span></a>
          <Link className="button button--quiet" href="/utility-inspector">SUBMIT YOUR OWN CLAIMS ↗</Link>
        </div>

        <DepartmentNextSteps currentDepartment="utility" />

        <p className="utility-disclaimer">
          This public case reconstructs anonymous answer choices encoded in its URL. It is a fictional entertainment
          inspection only. It does not inspect or assess any real project, token, contract, business or investment.
        </p>
      </section>

      <DepartmentFooter message={["A PUBLIC RECORD OF CLAIMED UTILITY.", "PROOF IS A SEPARATE DEPARTMENT."]} />
    </main>
  );
}
