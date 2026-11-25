import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import AirdropClient from "./airdrop-client";

export const metadata: Metadata = {
  alternates: { canonical: "/airdrop-office" },
  title: "Airdrop Entitlement Office | The Snapshot Tribunal",
  description: "Seven fictional questions about airdrop farming, points, snapshot rules, eligibility receipts and allocation expectations. No wallet or real airdrop is checked.",
  openGraph: {
    title: "THE AIRDROP ENTITLEMENT OFFICE",
    description: "Points were counted. Were the rules? File your fictional snapshot and eligibility dossier.",
    images: ["/airdrop-office/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE AIRDROP ENTITLEMENT OFFICE",
    description: "The Snapshot Tribunal / seven questions / no wallet connection / no real eligibility check.",
    images: ["/airdrop-office/opengraph-image"],
  },
};

export default function AirdropOfficePage() {
  return (
    <main className="audit-page utility-page airdrop-page" id="main-content">
      <DepartmentHeader activeSection="airdrop" statusMessage="SNAPSHOT TRIBUNAL / ENTITLEMENT NOT CONFIRMED" ctaHref="/airdrop-office" ctaLabel="FILE ELIGIBILITY CASE" />

      <div className="utility-shell shell" id="content-start" tabIndex={-1}>
        <aside className="utility-intro airdrop-intro">
          <div className="audit-intro__meta"><span>FORM AEO-001</span><span>SNAPSHOT / ELIGIBILITY UNDER REVIEW</span></div>
          <p className="eyebrow">AIRDROP ENTITLEMENT OFFICE / CROSS-CHAIN SNAPSHOT TRIBUNAL</p>
          <h1>THE SNAPSHOT<br /><span>TRIBUNAL.</span></h1>
          <p className="audit-intro__lead">You bridged, farmed, collected points, held the role and kept the screenshots. Now the Department would like to see the rules that promised you anything.</p>
          <div className="utility-intro__stamp airdrop-intro__stamp">
            <span>OFFICIAL DEPARTMENTAL REMINDER</span>
            <strong>POINTS ARE NOT AN ALLOCATION.</strong>
            <small>ACTIVITY IS NOT AUTOMATIC ELIGIBILITY.</small>
          </div>
          <div className="utility-intro__fineprint">FICTIONAL ENTERTAINMENT ONLY. NO WALLET, NETWORK, POINTS PROGRAMME, SNAPSHOT OR CLAIM STATUS IS CHECKED.</div>
        </aside>
        <AirdropClient />
      </div>

      <section className="airdrop-reference shell" aria-labelledby="airdrop-reference-title">
        <div><span>RELATED DEPARTMENT RECORDS / FICTIONAL ARCHIVE</span><h2 id="airdrop-reference-title">THE PAPER TRAIL.</h2><p>The Department has already preserved a few familiar exhibits from the eligibility season. None describes a real programme or confirms a real allocation.</p></div>
        <div className="airdrop-reference__links">
          <Link href="/archives/records/airdrop-snapshot-eligibility-appeal">READ THE SNAPSHOT ELIGIBILITY APPEAL ↗</Link>
          <Link href="/museum/exhibits/the-airdrop-passport-stamp-book">OPEN THE AIRDROP PASSPORT STAMP BOOK ↗</Link>
          <Link href="/daily-office/atlas">TRACE THE CASE THROUGH THE DEPARTMENT ATLAS ↗</Link>
        </div>
      </section>

      <div className="shell">
        <DepartmentNextSteps currentDepartment="airdrop" />
      </div>
      <DepartmentFooter message={["YOUR POINTS HAVE BEEN RECEIVED.", "THE SNAPSHOT RULES ARE STILL A SEPARATE DOCUMENT."]} />
    </main>
  );
}
