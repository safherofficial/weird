import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import ArchivesClient from "./archives-client";
import { archiveRecords } from "./archive-data";

export const metadata: Metadata = {
  alternates: { canonical: "/archives" },
  title: "Department Archives",
  description: archiveRecords.length + " fictional case records across the crypto trenches: bridge-transfer incidents, airdrop eligibility appeals, multi-chain unlock schedules, wallet inferences and governance handovers.",
  openGraph: {
    title: "THE DEPARTMENT ARCHIVES",
    description: archiveRecords.length + " fictional cross-chain case files. No live wallets, real assets or actual market history.",
    images: ["/archives/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DEPARTMENT ARCHIVES",
    description: archiveRecords.length + " fictional case files from the cross-chain trenches and crypto conviction cycle.",
    images: ["/archives/opengraph-image"],
  },
};

export default function ArchivesPage() {
  return (
    <main className="audit-page archives-page" id="main-content">
      <DepartmentHeader activeSection="archives" statusMessage="ARCHIVE OPEN / ALL FILES FICTIONAL" ctaHref="/archives" ctaLabel="SEARCH THE ARCHIVE" />

      <div className="archives-shell shell" id="content-start" tabIndex={-1}>
        <header className="archives-intro">
          <div className="audit-intro__meta"><span>REGISTER / {archiveRecords[0]?.accession ?? "NO RECORDS"}–{archiveRecords[archiveRecords.length - 1]?.accession ?? "NO RECORDS"}</span><span>ACCESS / PUBLIC COLLECTION</span></div>
          <p className="eyebrow">WHALE & WALLET INVESTIGATION / FICTIONAL CASE ARCHIVE</p>
          <h1>THE DEPARTMENT<br /><span>ARCHIVES.</span></h1>
          <p className="audit-intro__lead">
            Fictional case records from across the crypto trenches: bridge transfers, airdrop eligibility, wallet inferences, unlock schedules and community governance.
          </p>
          <div className="archives-intro__notice">
            <span>COLLECTION NOTICE</span>
            <strong>{String(archiveRecords.length).padStart(2, "0")} CURATED RECORDS / FIVE CATEGORIES</strong>
            <small>ALL RECORDS ARE ORIGINAL FICTIONAL SATIRE. NO REAL EVENTS OR ENTITIES ARE DEPICTED.</small>
          </div>
        </header>

        <ArchivesClient />
      </div>

      <div className="shell">
        <DepartmentNextSteps currentDepartment="archives" />
      </div>

      <DepartmentFooter message={["THE RECORDS HAVE BEEN FILED.", "THE LESSONS REMAIN UNCLAIMED."]} />
    </main>
  );
}
