import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import AuditClient from "./audit-client";

export const metadata: Metadata = {
  alternates: { canonical: "/audit" },
  title: "The DYOR Audit 2.0",
  description: "Ten-question satirical DYOR Audit with 17 fictional degen archetypes, dynamic social case cards and challenge-a-friend links.",
  openGraph: {
    title: "THE DYOR AUDIT 2.0",
    description: "Ten questions. Seventeen fictional archetypes. Three unnecessary scores. Get your Department case file.",
    images: ["/audit/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DYOR AUDIT 2.0",
    description: "Ten questions. Seventeen fictional archetypes. Three unnecessary scores.",
    images: ["/audit/opengraph-image"],
  },
};

export default function AuditPage() {
  return (
    <main className="audit-page" id="main-content">
      <DepartmentHeader activeSection="audit" statusMessage="CASE INTAKE OPEN" ctaHref="/" ctaLabel="BACK TO HQ" />

      <div className="audit-shell shell" id="content-start" tabIndex={-1}>
        <div className="audit-intro">
          <div className="audit-intro__meta"><span>FORM DYOR-002</span><span>CONFIDENTIAL(ISH)</span></div>
          <p className="eyebrow">OFFICE OF QUESTIONABLE DUE DILIGENCE</p>
          <h1>THE DYOR<br /><span>AUDIT 2.0.</span></h1>
          <p className="audit-intro__lead">Ten questions. Three fictional dimensions. One deeply unnecessary investigation. Receive your personal Department case file and share it with the group chat.</p>
          <div className="audit-warning"><span>!</span><p>THIS IS A SATIRICAL PERSONALITY QUIZ. Scores and classifications are fictional entertainment, not an assessment of investment skill, risk tolerance or financial decisions. No wallets or assets involved.</p></div>
        </div>
        <AuditClient />
      </div>
      <DepartmentFooter message={["YOUR RESEARCH HAS BEEN ACKNOWLEDGED.", "YOUR LOSSES REMAIN YOURS."]} />
    </main>
  );
}