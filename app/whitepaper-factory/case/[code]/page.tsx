import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import { buildWhitepaperResult, decodeWhitepaperCode, encodeWhitepaperCode } from "../../whitepaper-engine";

type WhitepaperCasePageProps = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: WhitepaperCasePageProps): Promise<Metadata> {
  const { code } = await params;
  const decoded = decodeWhitepaperCode(code);

  if (!decoded) {
    return {
      title: "Unrecognized Whitepaper File",
      description: "This fictional Department document could not be verified.",
      robots: { index: false, follow: false },
    };
  }

  const result = buildWhitepaperResult(decoded.answers, decoded.projectSlug);
  const title = result.projectLabel + " — " + result.profile.title;
  const description = result.profile.subtitle + " " + result.profile.roast;
  const route = "/whitepaper-factory/case/" + encodeURIComponent(encodeWhitepaperCode(decoded.answers, decoded.projectSlug));
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
      images: [{ url: image, width: 1200, height: 630, alt: "Fictional whitepaper case for " + result.projectLabel }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function WhitepaperCasePage({ params }: WhitepaperCasePageProps) {
  const { code } = await params;
  const decoded = decodeWhitepaperCode(code);
  if (!decoded) notFound();

  const result = buildWhitepaperResult(decoded.answers, decoded.projectSlug);
  const canonicalCode = encodeWhitepaperCode(decoded.answers, decoded.projectSlug);
  const caseUrl = "/whitepaper-factory/case/" + encodeURIComponent(canonicalCode);
  const challengeUrl = "/whitepaper-factory?challenge=" + encodeURIComponent(canonicalCode);
  const xText = [
    "THE DYOR DEPARTMENT issued a whitepaper for " + result.projectLabel + ".",
    result.profile.title + ".",
    "Technical density: " + result.technicalDensity + "/100. Buzzword density: " + result.buzzwordDensity + "/100. Product clarity: " + result.productClarity + "/100.",
    result.profile.roast.length > 62 ? result.profile.roast.slice(0, 58) + "…" : result.profile.roast,
    "Your turn. Submit your technical vision.",
  ].join(" ");
  const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(
    "https://weird-zeta.vercel.app" + caseUrl
  );

  return (
    <main className="audit-page whitepaper-case-page" id="main-content">
      <DepartmentHeader activeSection="whitepaper" statusMessage="PUBLIC WHITEPAPER FILE / FICTIONAL" ctaHref="/whitepaper-factory" ctaLabel="MAKE A WHITEPAPER" />

      <section className="whitepaper-public-case shell" id="content-start" tabIndex={-1}>
        <div className="whitepaper-public-case__meta">
          <span>PUBLIC DOCUMENT RECORD / CASE No. {result.caseNumber}</span>
          <span>PROJECT: {result.projectLabel} / FORM WPF-001</span>
        </div>

        <div className="whitepaper-cover">
          <p className="eyebrow">THE DYOR DEPARTMENT / WHITEPAPER FACTORY</p>
          <p className="whitepaper-cover__case">CASE No. {result.caseNumber} / TECHNICAL DOCUMENTATION UNIT</p>
          <h1>{result.projectLabel}<br /><span>WHITEPAPER.</span></h1>
          <p className="whitepaper-cover__subtitle">{result.profile.subtitle}</p>
          <div className="whitepaper-cover__stamp">FICTIONAL ENTERTAINMENT DOCUMENT</div>
          <div className="whitepaper-cover__scores">
            <div><span>TECHNICAL DENSITY</span><strong>{result.technicalDensity}<small>/100</small></strong></div>
            <div><span>BUZZWORD DENSITY</span><strong className="whitepaper-buzz">{result.buzzwordDensity}<small>/100</small></strong></div>
            <div><span>PRODUCT CLARITY</span><strong className="whitepaper-clarity">{result.productClarity}<small>/100</small></strong></div>
          </div>
        </div>

        <div className="whitepaper-executive">
          <span>DEPARTMENTAL FINDING</span>
          <strong>{result.finding}</strong>
          <small>PRIMARY CLASSIFICATION / {result.profile.title}</small>
        </div>

        {result.sections.map((section) => (
          <article className="whitepaper-section" key={section.number}>
            <div className="whitepaper-section__number">{section.number}</div>
            <div className="whitepaper-section__content">
              <span>{section.eyebrow}</span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              {section.number === "05" && (
                <div className="whitepaper-allocation">
                  <div className="whitepaper-allocation__heading">
                    <strong>FICTIONAL TOKEN ALLOCATION</strong>
                    <small>NOTIONAL SUPPLY / 1,000,000,000 UNITS</small>
                  </div>
                  {result.allocations.map((item) => (
                    <div className="whitepaper-allocation__row" key={item.label}>
                      <div><span>{item.label}</span><b>{item.percentage}%</b></div>
                      <div className="whitepaper-allocation__bar"><i style={{ width: item.percentage + "%" }} /></div>
                      <small>{item.explanation}</small>
                    </div>
                  ))}
                </div>
              )}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
            </div>
          </article>
        ))}

        <div className="whitepaper-result__profile">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <strong>{result.profile.title}</strong>
          <p>“{result.profile.roast}”</p>
          <small>SECONDARY FILE / {result.secondaryProfile.title}</small>
        </div>

        <div className="whitepaper-public-case__actions">
          <Link className="button button--primary" href={challengeUrl}>CHALLENGE A DEGEN <span>↗</span></Link>
          <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">SHARE WHITEPAPER ON X <span>↗</span></a>
          <Link className="button button--quiet" href="/whitepaper-factory">MAKE YOUR OWN WHITEPAPER ↗</Link>
        </div>

        <p className="whitepaper-disclaimer">
          This public document reconstructs anonymous answer choices encoded in the URL. The project label is visible
          to anyone with the link. All content, architecture labels, supply and allocations are fictional. No real
          project, company, token, contract, team, market, security or legal position has been inspected or verified.
        </p>
      </section>

      <DepartmentFooter message={["A PUBLIC RECORD OF TECHNICAL-SOUNDING INTENT.", "DOCUMENT FILED / PRODUCT NOT VERIFIED."]} />
    </main>
  );
}
