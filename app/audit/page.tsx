import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import AuditClient from "./audit-client";

export const metadata: Metadata = {
  title: "The DYOR Audit",
  description: "Submit your research process for an entirely unnecessary investigation.",
};

export default function AuditPage() {
  return (
    <main className="audit-page" id="main-content">
      <DepartmentHeader activeSection="audit" statusMessage="CASE INTAKE OPEN" ctaHref="/" ctaLabel="BACK TO HQ" />

      <div className="audit-shell shell" id="content-start" tabIndex={-1}>
        <div className="audit-intro">
          <div className="audit-intro__meta"><span>FORM DYOR-001</span><span>CONFIDENTIAL(ISH)</span></div>
          <p className="eyebrow">OFFICE OF QUESTIONABLE DUE DILIGENCE</p>
          <h1>THE DYOR<br /><span>AUDIT.</span></h1>
          <p className="audit-intro__lead">Six questions. One deeply unnecessary investigation. Find out what kind of financial decision-maker you have become.</p>
          <div className="audit-warning"><span>!</span><p>THIS IS A SATIRICAL PERSONALITY QUIZ. It does not assess actual investment skill, risk tolerance or financial decisions. No real assets or wallets involved.</p></div>
        </div>
        <AuditClient />
      </div>
      <DepartmentFooter message={["YOUR RESEARCH HAS BEEN ACKNOWLEDGED.", "YOUR LOSSES REMAIN YOURS."]} />
    </main>
  );
}