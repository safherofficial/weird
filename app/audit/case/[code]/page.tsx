import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import DepartmentNextSteps from "../../../components/department-next-steps";
import { buildResult, decodeCaseCode, encodeCaseCode } from "../../audit-engine";

type CasePageProps = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const { code } = await params;
  const answers = decodeCaseCode(code);

  if (!answers) {
    return {
      title: "Unrecognized Case File",
      description: "This Department case number could not be verified.",
      robots: { index: false, follow: false },
    };
  }

  const result = buildResult(answers);
  const title = result.profile.title + " | THE DYOR DEPARTMENT";
  const description = result.profile.subtitle + " " + result.profile.roast;
  const route = "/audit/case/" + encodeURIComponent(code);
  const image = route + "/opengraph-image";
  const imageAlt = "A fictional DYOR Department case file for " + result.profile.title;

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
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function PublicCasePage({ params }: CasePageProps) {
  const { code } = await params;
  const answers = decodeCaseCode(code);

  if (!answers) notFound();

  const result = buildResult(answers);
  const canonicalCode = encodeCaseCode(answers);
  const challengeUrl = "/audit?challenge=" + encodeURIComponent(canonicalCode);
  const caseUrl = "/audit/case/" + encodeURIComponent(canonicalCode);
  const xText = [
    "THE DYOR DEPARTMENT has reviewed my case.",
    "Classification: " + result.profile.title + ".",
    "Research: " + result.research + "/100. Cope: " + result.cope + "/100. Crowd dependency: " + result.crowd + "/100.",
    result.profile.roast.length > 82 ? result.profile.roast.slice(0, 78) + "…" : result.profile.roast,
    "Your turn. Submit your own audit.",
  ].join(" ");
  const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(
    "https://weird-zeta.vercel.app" + caseUrl
  );

  return (
    <main className="audit-page public-case-page" id="main-content">
      <DepartmentHeader activeSection="audit" statusMessage="PUBLIC CASE FILE / VERIFIED FORMAT" ctaHref="/audit" ctaLabel="SUBMIT YOUR OWN CASE" />

      <section className="public-case shell" id="content-start" tabIndex={-1}>
        <div className="public-case__meta">
          <span>PUBLIC RECORD / CASE No. {result.caseNumber}</span>
          <span>DYOR AUDIT // VERSION 2</span>
        </div>

        <p className="eyebrow">THE DEPARTMENT HAS REVIEWED THIS FILE</p>
        <h1>{result.profile.title}</h1>
        <p className="public-case__subtitle">{result.profile.subtitle}</p>

        <div className="result-finding">
          <span>DEPARTMENTAL FINDING</span>
          <strong>{result.finding}</strong>
          <small>{result.disposition}</small>
        </div>

        <div className="result-metrics result-metrics--three public-case__metrics">
          <div>
            <span>RESEARCH EFFORT</span>
            <strong>{result.research}<small>/100</small></strong>
            <i>HOW MUCH HOMEWORK WAS CLAIMED</i>
          </div>
          <div>
            <span>COPE INDEX</span>
            <strong className="red-text">{result.cope}<small>/100</small></strong>
            <i>HOW HARD THE HOLDER IS HOLDING ON</i>
          </div>
          <div>
            <span>CROWD DEPENDENCY</span>
            <strong className="crowd-score">{result.crowd}<small>/100</small></strong>
            <i>HOW MUCH THE CHAT DECIDES</i>
          </div>
        </div>

        <div className="result-secondary">
          <span>SECONDARY PATTERN DETECTED</span>
          <strong>{result.secondaryProfile.title}</strong>
          <small>{result.secondaryProfile.subtitle}</small>
        </div>

        <div className="result-roast">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <p>“{result.profile.roast}”</p>
        </div>

        <div className="public-case__footer-note">
          <span>FINAL NOTICE</span>
          <strong>YOUR RESEARCH HAS BEEN ACKNOWLEDGED.<br />YOUR LOSSES REMAIN YOURS.</strong>
        </div>

        <div className="public-case__actions">
          <Link className="button button--primary" href={challengeUrl}>ACCEPT THE CHALLENGE <span>↗</span></Link>
          <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">SHARE THIS CASE ON X <span>↗</span></a>
          <Link className="button button--quiet" href="/audit">START A NEW AUDIT ↗</Link>
        </div>

        <DepartmentNextSteps currentDepartment="audit" />

        <p className="public-case__disclaimer">
          This is a public, fictional entertainment result reconstructed from anonymous answer choices in the URL.
          It does not identify the visitor or assess actual investment skill, risk or financial performance.
        </p>
      </section>

      <DepartmentFooter message={["A PUBLIC RECORD OF QUESTIONABLE CONVICTION.", "NO FINANCIAL ADVICE. NO REAL MARKET DATA."]} />
    </main>
  );
}
