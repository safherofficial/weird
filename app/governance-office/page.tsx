import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import GovernanceClient from "./governance-client";

export const metadata: Metadata = {
  alternates: { canonical: "/governance-office" },
  title: "Governance Accountability Office | The Quorum Tribunal",
  description: "Seven fictional questions about proposal scope, voter eligibility, cross-chain aggregation, quorum and execution. No DAO or live vote is checked.",
  openGraph: {
    title: "THE GOVERNANCE ACCOUNTABILITY OFFICE",
    description: "A vote is not an executed decision. File your fictional proposal and quorum review.",
    images: ["/governance-office/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE QUORUM TRIBUNAL",
    description: "Seven questions. Three fictional governance scores. No DAO, proposal or vote inspection.",
    images: ["/governance-office/opengraph-image"],
  },
};

export default function GovernanceOfficePage() {
  return (
    <main className="audit-page utility-page governance-page" id="main-content">
      <DepartmentHeader activeSection="governance" statusMessage="QUORUM TRIBUNAL / GOVERNANCE AUTHORITY NOT CERTIFIED" ctaHref="/governance-office" ctaLabel="FILE GOVERNANCE REVIEW" />
      <div className="utility-shell shell" id="content-start" tabIndex={-1}>
        <aside className="utility-intro governance-intro">
          <div className="audit-intro__meta"><span>FORM GAO-001</span><span>PROPOSAL / QUORUM / EXECUTION UNDER REVIEW</span></div>
          <p className="eyebrow">GOVERNANCE ACCOUNTABILITY OFFICE / THE QUORUM TRIBUNAL</p>
          <h1>THE QUORUM<br /><span>TRIBUNAL.</span></h1>
          <p className="audit-intro__lead">The proposal passed in the group chat. The dashboard counted three networks twice. Someone has declared a mandate, although nobody can locate the quorum denominator or the account responsible for execution.</p>
          <div className="utility-intro__stamp governance-intro__stamp">
            <span>OFFICIAL DEPARTMENTAL REMINDER</span>
            <strong>A VOTE IS NOT AN EXECUTED DECISION.</strong>
            <small>A QUORUM IS NOT A UNIVERSAL UNIT.</small>
          </div>
          <div className="utility-intro__fineprint">FICTIONAL ENTERTAINMENT ONLY. NO DAO, PROPOSAL, WALLET, VOTE, VOTING POWER, SNAPSHOT, QUORUM OR EXECUTION IS CHECKED.</div>
        </aside>
        <GovernanceClient />
      </div>
      <section className="governance-reference shell" aria-labelledby="governance-reference-title">
        <div>
          <span>RELATED DEPARTMENT RECORDS / FICTIONAL ARCHIVE</span>
          <h2 id="governance-reference-title">THE COUNTING ROOM.</h2>
          <p>The Department has already preserved a governance circular about combining voting totals and a compass whose needles follow separate network dashboards. Neither exhibit describes a real DAO or vote.</p>
        </div>
        <div className="governance-reference__links">
          <Link href="/archives/records/circular-quorum-migration">READ CIRCULAR 04 / THE GOVERNANCE QUORUM ↗</Link>
          <Link href="/museum/exhibits/the-multichain-quorum-compass">OPEN THE MULTICHAIN QUORUM COMPASS ↗</Link>
          <Link href="/daily-office/atlas">TRACE THE CASE THROUGH THE DEPARTMENT ATLAS ↗</Link>
        </div>
      </section>
      <div className="shell">
        <DepartmentNextSteps currentDepartment="governance" />
      </div>
      <DepartmentFooter message={["THE VOTE HAS BEEN RECORDED IN THE FILE.", "EXECUTION STILL REQUIRES ITS OWN AUTHORITY."]} />
    </main>
  );
}
