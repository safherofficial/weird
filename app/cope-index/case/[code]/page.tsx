import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import DepartmentNextSteps from "../../../components/department-next-steps";
import DepartmentPublicShare from "../../../components/department-public-share";
import { buildPersonalCopeResult, decodeCopeCode, encodeCopeCode } from "../../cope-engine";

type CopeCasePageProps = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: CopeCasePageProps): Promise<Metadata> {
  const { code } = await params;
  const answers = decodeCopeCode(code);
  if (!answers) {
    return {
      title: "Unrecognized Cope File",
      description: "This fictional personal reading could not be verified.",
      robots: { index: false, follow: false },
    };
  }

  const result = buildPersonalCopeResult(answers);
  const title = result.profile.title + " | GLOBAL COPE INDEX";
  const description = result.profile.subtitle + " " + result.profile.roast;
  const route = "/cope-index/case/" + encodeURIComponent(encodeCopeCode(answers));
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
      images: [{ url: image, width: 1200, height: 630, alt: "Fictional Solana Trenches cope reading: " + result.profile.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CopeCasePage({ params }: CopeCasePageProps) {
  const { code } = await params;
  const answers = decodeCopeCode(code);
  if (!answers) notFound();

  const result = buildPersonalCopeResult(answers);
  const canonicalCode = encodeCopeCode(answers);
  const caseUrl = "/cope-index/case/" + encodeURIComponent(canonicalCode);
  const challengeUrl = "/cope-index?challenge=" + encodeURIComponent(canonicalCode);
  const xText = [
    "THE DYOR DEPARTMENT issued my fictional Solana Trenches cope reading.",
    result.profile.title + ".",
    "Cope: " + result.copeScore + "/100. Patience: " + result.patienceScore + "/100. Chat dependency: " + result.chatDependency + "/100.",
    result.profile.roast.length > 70 ? result.profile.roast.slice(0, 66) + "…" : result.profile.roast,
    "Your turn.",
  ].join(" ");

  return (
    <main className="audit-page cope-case-page" id="main-content">
      <DepartmentHeader activeSection="cope" statusMessage="PUBLIC TRENCHES READING / FICTIONAL" ctaHref="/cope-index" ctaLabel="CHECK THE INDEX" />

      <article className="cope-public-case shell" id="content-start" tabIndex={-1}>
        <div className="cope-public-case__meta">
          <span>PERSONAL CASE FILE / No. {result.caseNumber}</span>
          <span>COPIUM ADMINISTRATION / SELF-REPORTED TRENCHES ANSWERS</span>
        </div>

        <p className="eyebrow">PERSONAL CALIBRATION / FINAL READING</p>
        <h1>{result.profile.title}</h1>
        <p className="cope-public-case__subtitle">{result.profile.subtitle}</p>

        <div className="cope-personal-result__finding">
          <span>DEPARTMENTAL FINDING</span>
          <strong>{result.finding}</strong>
        </div>

        <div className="cope-personal-result__metrics">
          <div><span>COPE INDEX</span><strong>{result.copeScore}<small>/100</small></strong></div>
          <div><span>PATIENCE INDEX</span><strong>{result.patienceScore}<small>/100</small></strong></div>
          <div><span>CHAT DEPENDENCY</span><strong>{result.chatDependency}<small>/100</small></strong></div>
        </div>

        <div className="cope-personal-result__roast">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <p>“{result.profile.roast}”</p>
          <small>SECONDARY PATTERN / {result.secondaryProfile.title}</small>
        </div>

        <div className="cope-public-case__actions">
          <Link className="button button--primary" href={challengeUrl}>CHALLENGE A DEGEN <span>↗</span></Link>
          <DepartmentPublicShare title="Solana Trenches cope reading" shareText={xText} casePath={caseUrl} />
          <Link className="button button--quiet" href="/cope-index">CALIBRATE YOUR OWN COPE ↗</Link>
        </div>

        <DepartmentNextSteps currentDepartment="cope" />

        <p className="cope-personal-result__disclaimer">
          This reading is fictional and is reconstructed from anonymous answer choices encoded in the URL.
          It is not a measure of mental health, financial behaviour, investment skill, real market sentiment or
          trader performance. The daily Global Cope Index is a separate synthetic, date-seeded trenches joke.
        </p>
      </article>

      <DepartmentFooter message={["A PERSONAL READING HAS BEEN FILED.", "THE INDEX REMAINS FICTIONAL."]} />
    </main>
  );
}
