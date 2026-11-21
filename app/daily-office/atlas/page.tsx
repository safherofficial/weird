import type { Metadata } from "next";
import DepartmentHeader from "../../components/department-header";
import DepartmentFooter from "../../components/department-footer";
import DepartmentCaseAtlasClient from "../department-case-atlas-client";
import { buildDepartmentCaseAtlas } from "../case-atlas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Department Case Atlas | THE DYOR DEPARTMENT",
  description: "An interactive index of 18 fictional case themes, their assigned offices, archive precedents, Museum exhibits and date-seeded recurrence intervals and selectable 14-to-120-day history across all ten Department divisions.",
  alternates: { canonical: "/daily-office/atlas" },
  robots: { index: false, follow: true },
};

export default function DepartmentCaseAtlasPage() {
  const asOfDate = new Date().toISOString().slice(0, 10);
  const atlas = buildDepartmentCaseAtlas(asOfDate, 120);

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
            <span>120 UTC ISSUES AVAILABLE / THROUGH {asOfDate}</span>
          </div>
          <p className="eyebrow">THE DYOR DEPARTMENT / CROSS-DIVISION INDEX</p>
          <h1>THE CASE<br /><span>ATLAS.</span></h1>
          <p className="audit-intro__lead">
            Eighteen recurring fictional case themes. Ten divisions. Thirty-six archive and Museum reference points. The Atlas shows who handles each file, which old records inform it, how often the theme reappeared and how many UTC days separated its fictional daily filings.
          </p>
          <div className="department-case-atlas-intro__notice">
            <span>INDEX METHOD / DETERMINISTIC REFERENCE DATA</span>
            <strong>EVERY ROUTE LEADS TO AN EXISTING DEPARTMENT RECORD.</strong>
            <small>COUNTS AND RECURRENCE GAPS ARE CALCULATED ONLY FROM FICTIONAL UTC BRIEFINGS, NOT LIVE MARKET ACTIVITY.</small>
          </div>
        </header>
        <DepartmentCaseAtlasClient atlas={atlas} />
      </div>
      <DepartmentFooter message={["THE CASES HAVE BEEN CROSS-REFERENCED.", "THE DEPARTMENT HAS NOT LEARNED FROM THEM."]} />
    </main>
  );
}
