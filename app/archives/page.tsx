import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import ArchivesClient from "./archives-client";
import { archiveRecords } from "./archive-data";

export const metadata: Metadata = {
  title: "Department Archives",
  description: "A searchable archive of fictional Department memos, incident reports, technical appendices, membership files and public notices.",
  openGraph: {
    title: "THE DEPARTMENT ARCHIVES",
    description: "Twelve fictional records. No real market history. Nothing to redact.",
    images: ["/archives/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DEPARTMENT ARCHIVES",
    description: "Twelve fictional records from the archive of questionable conviction.",
    images: ["/archives/opengraph-image"],
  },
};

export default function ArchivesPage() {
  return (
    <main className="audit-page archives-page" id="main-content">
      <DepartmentHeader activeSection="archives" statusMessage="ARCHIVE OPEN / ALL FILES FICTIONAL" ctaHref="/archives" ctaLabel="SEARCH THE ARCHIVE" />

      <div className="archives-shell shell" id="content-start" tabIndex={-1}>
        <header className="archives-intro">
          <div className="audit-intro__meta"><span>REGISTER / DDA-001–012</span><span>ACCESS / PUBLIC COLLECTION</span></div>
          <p className="eyebrow">OFFICE OF PRESERVED QUESTIONABLE DECISIONS</p>
          <h1>THE DEPARTMENT<br /><span>ARCHIVES.</span></h1>
          <p className="audit-intro__lead">
            Memos, incident reports and technical appendices recovered from the fictional administrative aftermath of doing your own research.
          </p>
          <div className="archives-intro__notice">
            <span>COLLECTION NOTICE</span>
            <strong>{String(archiveRecords.length).padStart(2, "0")} CURATED RECORDS / FIVE CATEGORIES</strong>
            <small>ALL RECORDS ARE ORIGINAL FICTIONAL SATIRE. NO REAL EVENTS OR ENTITIES ARE DEPICTED.</small>
          </div>
        </header>

        <ArchivesClient />
      </div>

      <DepartmentFooter message={["THE RECORDS HAVE BEEN FILED.", "THE LESSONS REMAIN UNCLAIMED."]} />
    </main>
  );
}
