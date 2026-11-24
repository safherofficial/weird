import type { Metadata } from "next";
import DepartmentHeader from "../../components/department-header";
import DepartmentFooter from "../../components/department-footer";
import DepartmentPublicShare from "../../components/department-public-share";
import { buildDepartmentShareText } from "../../lib/department-share-copy";
import DepartmentCaseAtlasClient from "../department-case-atlas-client";
import { buildDepartmentCaseAtlas } from "../case-atlas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Department Case Atlas",
  description: "An interactive index of 18 fictional case themes, their assigned offices, archive precedents, Museum exhibits and date-seeded recurrence intervals and matched-period comparisons across selectable 14-to-120-day windows.",
  alternates: { canonical: "/daily-office/atlas" },
  robots: { index: false, follow: true },
};

export default function DepartmentCaseAtlasPage() {
  const asOfDate = new Date().toISOString().slice(0, 10);
  const atlas = buildDepartmentCaseAtlas(asOfDate, 240);
  const shareText = buildDepartmentShareText({
    opening: "THE DYOR DEPARTMENT / CASE ATLAS.",
    finding: atlas.entries.length + " fictional themes routed across " + atlas.divisions.length + " offices.",
    evidence: atlas.lookbackDays + " date-seeded UTC issues; recurrence and matched-period comparisons.",
    punchline: "Every route leads to a record. None leads to market insight.",
    invitation: "Search the fictional register.",
  });

  return (
    <main className="audit-page department-case-atlas-page" id="main-content">
      <DepartmentHeader
        activeSection="daily"
        statusMessage="CASE ATLAS / FICTIONAL CROSS-DIVISION REGISTER"
        ctaHref="/daily-office"
        ctaLabel="TODAY'S FILE"
      />
      <div className="department-case-atlas-shell shell" id="content-start" tabIndex={-1}>
        <header className="department-case-atlas-intro">
          <div className="audit-intro__meta">
            <span>INSTITUTIONAL REFERENCE / 18 THEMATIC THREADS</span>
            <span>240 UTC ISSUES AVAILABLE / THROUGH {asOfDate}</span>
          </div>
          <p className="eyebrow">THE DYOR DEPARTMENT / CROSS-DIVISION INDEX</p>
          <h1>THE CASE<br /><span>ATLAS.</span></h1>
          <p className="audit-intro__lead">
            Eighteen recurring fictional case themes. Ten divisions. Thirty-six archive and Museum reference points. The Atlas shows who handles each file, which old records inform it, how often the theme reappeared and how many UTC days separated its fictional daily filings.
          </p>
          <div className="department-case-atlas-intro__notice">
            <span>INDEX METHOD / DETERMINISTIC REFERENCE DATA</span>
            <strong>EVERY ROUTE LEADS TO AN EXISTING DEPARTMENT RECORD.</strong>
            <small>COUNTS, RECURRENCE GAPS AND MATCHED-PERIOD COMPARISONS USE ONLY FICTIONAL UTC BRIEFINGS, NOT LIVE MARKET ACTIVITY.</small>
          </div>
        </header>
        <section className="department-reference-share" aria-label="Share the Department Case Atlas">
          <span>PUBLIC REFERENCE / X-READY SUMMARY</span>
          <div className="department-reference-share__actions">
            <DepartmentPublicShare
              title="THE DYOR DEPARTMENT / Case Atlas"
              shareText={shareText}
              casePath="/daily-office/atlas"
              resourceLabel="CASE ATLAS"
            />
          </div>
        </section>
        <DepartmentCaseAtlasClient atlas={atlas} />
      </div>
      <DepartmentFooter message={["THE CASES HAVE BEEN CROSS-REFERENCED.", "THE DEPARTMENT HAS NOT LEARNED FROM THEM."]} />
    </main>
  );
}
