import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import { buildRoadmapResult, decodeRoadmapCode, encodeRoadmapCode } from "../../roadmap-engine";

type RoadmapCasePageProps = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: RoadmapCasePageProps): Promise<Metadata> {
  const { code } = await params;
  const decoded = decodeRoadmapCode(code);

  if (!decoded) {
    return {
      title: "Unrecognized Roadmap File",
      description: "This fictional Department roadmap could not be verified.",
      robots: { index: false, follow: false },
    };
  }

  const result = buildRoadmapResult(decoded.answers, decoded.projectSlug);
  const title = result.projectLabel + " — " + result.profile.title;
  const description = result.profile.subtitle + " " + result.profile.roast;
  const route = "/roadmap-generator/case/" + encodeURIComponent(encodeRoadmapCode(decoded.answers, decoded.projectSlug));
  const image = route + "/opengraph-image";

  return {
    title: title + " | THE DYOR DEPARTMENT",
    description,
    alternates: { canonical: route },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url: route,
      images: [{ url: image, width: 1200, height: 630, alt: "Fictional roadmap case for " + result.projectLabel }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function RoadmapCasePage({ params }: RoadmapCasePageProps) {
  const { code } = await params;
  const decoded = decodeRoadmapCode(code);
  if (!decoded) notFound();

  const result = buildRoadmapResult(decoded.answers, decoded.projectSlug);
  const canonicalCode = encodeRoadmapCode(decoded.answers, decoded.projectSlug);
  const caseUrl = "/roadmap-generator/case/" + encodeURIComponent(canonicalCode);
  const challengeUrl = "/roadmap-generator?challenge=" + encodeURIComponent(canonicalCode);
  const xText = [
    "THE DYOR DEPARTMENT generated a roadmap for " + result.projectLabel + ".",
    "Classification: " + result.profile.title + ".",
    "Delivery: " + result.delivery + "/100. Timeline realism: " + result.realism + "/100. Promise inflation: " + result.inflation + "/100.",
    result.profile.roast.length > 65 ? result.profile.roast.slice(0, 61) + "…" : result.profile.roast,
    "Your turn. Put your milestones on paper.",
  ].join(" ");
  const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(
    "https://weird-zeta.vercel.app" + caseUrl
  );

  return (
    <main className="audit-page roadmap-case-page" id="main-content">
      <DepartmentHeader activeSection="roadmap" statusMessage="PUBLIC ROADMAP FILE / FICTIONAL" ctaHref="/roadmap-generator" ctaLabel="GENERATE ROADMAP" />

      <section className="roadmap-public-case shell" id="content-start" tabIndex={-1}>
        <div className="roadmap-public-case__meta">
          <span>PUBLIC ROADMAP RECORD / CASE No. {result.caseNumber}</span>
          <span>PROJECT: {result.projectLabel} / FORM RPG-001</span>
        </div>

        <p className="eyebrow">FINAL ROADMAP DETERMINATION / SEVEN PHASES</p>
        <h1>{result.profile.title}</h1>
        <p className="roadmap-result__subtitle">{result.profile.subtitle}</p>

        <div className="roadmap-finding">
          <span>DEPARTMENTAL FINDING</span>
          <strong>{result.finding}</strong>
          <small>{result.disposition}</small>
        </div>

        <div className="roadmap-metrics">
          <div><span>DELIVERY CLARITY</span><strong>{result.delivery}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
          <div><span>TIMELINE REALISM</span><strong className="roadmap-realism">{result.realism}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
          <div><span>PROMISE INFLATION</span><strong className="roadmap-inflation">{result.inflation}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
        </div>

        <div className="roadmap-secondary">
          <span>SECONDARY PATTERN DETECTED</span>
          <strong>{result.secondaryProfile.title}</strong>
          <small>{result.secondaryProfile.subtitle}</small>
        </div>

        <div className="roadmap-list">
          <div className="roadmap-list__heading">
            <span>OFFICIAL ROADMAP / {result.projectLabel}</span>
            <span>7 PHASES / ETA: SOON™</span>
          </div>
          {result.milestones.map((milestone, index) => (
            <article className="roadmap-milestone" key={milestone.phase}>
              <div className="roadmap-milestone__index">{String(index + 1).padStart(2, "0")}</div>
              <div className="roadmap-milestone__body">
                <div className="roadmap-milestone__top">
                  <span>{milestone.phase}</span>
                  <b>{milestone.status}</b>
                </div>
                <h2>{milestone.title}</h2>
                <p>{milestone.description}</p>
              </div>
              <div className="roadmap-milestone__eta">
                <span>ESTIMATED ARRIVAL</span>
                <strong>{milestone.eta}</strong>
              </div>
            </article>
          ))}
        </div>

        <div className="roadmap-roast">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <p>“{result.profile.roast}”</p>
        </div>

        <div className="roadmap-public-case__actions">
          <Link className="button button--primary" href={challengeUrl}>CHALLENGE A DEGEN <span>↗</span></Link>
          <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">SHARE THIS ROADMAP ON X <span>↗</span></a>
          <Link className="button button--quiet" href="/roadmap-generator">GENERATE YOUR OWN ROADMAP ↗</Link>
        </div>

        <p className="roadmap-disclaimer">
          This public roadmap is a fictional parody generated from selected answers. Its project label is included
          in the URL and is visible to anyone with the link. Milestones, statuses and estimated arrivals are
          invented and are not real commitments, predictions or a project plan.
        </p>
      </section>

      <DepartmentFooter message={["A PUBLIC RECORD OF FUTURE DELIVERABLES.", "ETA: SOON™ / SUBJECT TO FURTHER REVIEW."]} />
    </main>
  );
}
