import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import BridgeIncidentClient from "./bridge-incident-client";

export const metadata: Metadata = {
  alternates: { canonical: "/bridge-incident-office" },
  title: "Bridge Incident Office | Interchain Transfer Review",
  description: "Seven fictional questions about cross-chain transfer receipts, source and destination status, route evidence and support tickets. No wallet or live transfer is checked.",
  openGraph: {
    title: "THE BRIDGE INCIDENT OFFICE",
    description: "Source confirmed. Destination pending. File the incident without turning a refresh into evidence.",
    images: ["/bridge-incident-office/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE BRIDGE INCIDENT OFFICE",
    description: "Seven fictional questions. Three departmental scores. No wallet, bridge or live transfer check.",
    images: ["/bridge-incident-office/opengraph-image"],
  },
};

export default function BridgeIncidentOfficePage() {
  return (
    <main className="audit-page utility-page bridge-incident-page" id="main-content">
      <DepartmentHeader activeSection="bridge" statusMessage="INTERCHAIN INCIDENT / SETTLEMENT NOT CERTIFIED" ctaHref="/bridge-incident-office" ctaLabel="FILE TRANSFER INCIDENT" />

      <div className="utility-shell shell" id="content-start" tabIndex={-1}>
        <aside className="utility-intro bridge-intro">
          <div className="audit-intro__meta"><span>FORM BIO-001</span><span>SOURCE / DESTINATION / UNDER REVIEW</span></div>
          <p className="eyebrow">BRIDGE INCIDENT OFFICE / INTERCHAIN TRANSFER REVIEW</p>
          <h1>THE BRIDGE<br /><span>INCIDENT OFFICE.</span></h1>
          <p className="audit-intro__lead">The source network says complete. The destination says pending. Your group chat has declared a total loss, appointed a recovery specialist and opened seventeen support tickets.</p>
          <div className="utility-intro__stamp bridge-intro__stamp">
            <span>OFFICIAL DEPARTMENTAL REMINDER</span>
            <strong>ONE RECEIPT IS NOT TWO SETTLEMENTS.</strong>
            <small>A SOURCE CONFIRMATION IS NOT DESTINATION DELIVERY.</small>
          </div>
          <div className="utility-intro__fineprint">FICTIONAL ENTERTAINMENT ONLY. NO WALLET, NETWORK, BRIDGE, TRANSACTION, ROUTE OR LIVE TRANSFER IS CHECKED.</div>
        </aside>
        <BridgeIncidentClient />
      </div>

      <section className="bridge-reference shell" aria-labelledby="bridge-reference-title">
        <div><span>RELATED DEPARTMENT RECORDS / FICTIONAL ARCHIVE</span><h2 id="bridge-reference-title">THE WAITING ROOM.</h2><p>The Department has already preserved two exhibits from the interchain queue. Both distinguish a source-side record from destination settlement.</p></div>
        <div className="bridge-reference__links">
          <Link href="/archives/records/the-bridge-receipt-that-arrived-late">READ THE LATE BRIDGE RECEIPT ↗</Link>
          <Link href="/museum/exhibits/the-bridge-queue-ticket">OPEN THE BRIDGE QUEUE TICKET ↗</Link>
          <Link href="/daily-office/atlas">TRACE THE CASE THROUGH THE DEPARTMENT ATLAS ↗</Link>
        </div>
      </section>

      <div className="shell">
        <DepartmentNextSteps currentDepartment="bridge" />
      </div>
      <DepartmentFooter message={["YOUR SOURCE RECEIPT HAS BEEN FILED.", "THE DESTINATION WINDOW HAS NOT SIGNED FOR IT."]} />
    </main>
  );
}
