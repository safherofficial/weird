import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import DepartmentNextSteps from "../../../components/department-next-steps";
import { buildClubResult, decodeClubCode, encodeClubCode } from "../../club-engine";

type MemberPageProps = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const { code } = await params;
  const answers = decodeClubCode(code);
  if (!answers) {
    return {
      title: "Unrecognized Club File",
      description: "This fictional 99% Club membership file could not be verified.",
      robots: { index: false, follow: false },
    };
  }

  const result = buildClubResult(answers);
  const title = result.profile.title + " | THE 99% CLUB";
  const description = result.profile.subtitle + " " + result.profile.motto;
  const route = "/club/member/" + encodeURIComponent(encodeClubCode(answers));
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
      images: [{ url: image, width: 1200, height: 630, alt: "Fictional 99% Club membership card for " + result.profile.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ClubMemberPage({ params }: MemberPageProps) {
  const { code } = await params;
  const answers = decodeClubCode(code);
  if (!answers) notFound();

  const result = buildClubResult(answers);
  const canonicalCode = encodeClubCode(answers);
  const caseUrl = "/club/member/" + encodeURIComponent(canonicalCode);
  const challengeUrl = "/club?challenge=" + encodeURIComponent(canonicalCode);
  const xText = [
    "THE DYOR DEPARTMENT has admitted me to THE 99% CLUB.",
    "Member No. " + result.memberNumber + ".",
    result.profile.title + ".",
    "Conviction: " + result.conviction + "/100. Cope: " + result.cope + "/100. Chat dependency: " + result.chatDependency + "/100.",
    result.profile.motto,
    "Your application is pending.",
  ].join(" ");
  const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(
    "https://weird-zeta.vercel.app" + caseUrl
  );

  return (
    <main className="audit-page club-member-page" id="main-content">
      <DepartmentHeader activeSection="club" statusMessage="PUBLIC MEMBER FILE / FICTIONAL" ctaHref="/club" ctaLabel="APPLY FOR MEMBERSHIP" />

      <article className="club-public-member shell" id="content-start" tabIndex={-1}>
        <div className="club-public-member__meta">
          <span>PUBLIC MEMBERSHIP RECORD / {result.memberNumber}</span>
          <span>THE 99% CLUB / NO BENEFITS</span>
        </div>

        <div className="club-membership-card">
          <div className="club-membership-card__top">
            <span>THE DYOR DEPARTMENT / MEMBERSHIP OFFICE</span>
            <span>THE 99% CLUB</span>
          </div>
          <p className="eyebrow">MEMBER No. {result.memberNumber}</p>
          <h1>{result.profile.title}</h1>
          <p className="club-membership-card__subtitle">{result.profile.subtitle}</p>
          <div className="club-membership-card__motto">“{result.profile.motto}”</div>
          <div className="club-membership-card__bottom">
            <div><span>MEMBERSHIP CLASS</span><strong>{result.membershipClass}</strong></div>
            <div><span>BENEFITS</span><strong>NONE / EXPECTATIONS: MANAGED</strong></div>
          </div>
          <div className="club-membership-card__stamp">FICTIONAL<br />MEMBERSHIP</div>
        </div>

        <div className="club-finding">
          <span>DEPARTMENTAL FINDING</span>
          <strong>{result.finding}</strong>
          <small>{result.profile.membership}</small>
        </div>

        <div className="club-metrics">
          <div><span>CONVICTION INDEX</span><strong>{result.conviction}<small>/100</small></strong><i>FICTIONAL ANSWER SCORE</i></div>
          <div><span>COPE INDEX</span><strong className="club-cope">{result.cope}<small>/100</small></strong><i>FICTIONAL ANSWER SCORE</i></div>
          <div><span>CHAT DEPENDENCY</span><strong className="club-chat">{result.chatDependency}<small>/100</small></strong><i>FICTIONAL ANSWER SCORE</i></div>
        </div>

        <div className="club-profile">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <p>“{result.profile.roast}”</p>
          <small>SECONDARY PATTERN / {result.secondaryProfile.title}</small>
        </div>

        <div className="club-public-member__actions">
          <Link className="button button--primary" href={challengeUrl}>NOMINATE ANOTHER DEGEN <span>↗</span></Link>
          <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">SHARE MEMBERSHIP ON X <span>↗</span></a>
          <Link className="button button--quiet" href="/club">APPLY FOR YOUR OWN MEMBERSHIP ↗</Link>
        </div>

        <DepartmentNextSteps currentDepartment="club" />

        <p className="club-result__disclaimer">
          THE 99% CLUB is a fictional satire membership. The name is not a statistic about real investors,
          traders, losses or market participants. This public file reconstructs selected answers from its URL.
          It does not create an account, real membership, benefits, token or financial product.
        </p>
      </article>

      <DepartmentFooter message={["THE CLUB IS OPEN.", "THE BENEFITS REMAIN UNDER REVIEW."]} />
    </main>
  );
}
