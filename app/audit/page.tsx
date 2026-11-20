import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import AuditClient from "./audit-client";

export const metadata: Metadata = {
  alternates: { canonical: "/audit" },
  title: "The DYOR Audit 2.0",
  description: "Ten-question FOMO Control Unit audit of CA chasing, KOL calls, green-candle entries, bundle excuses and bagholder behaviour. Fictional case files.",
  openGraph: {
    title: "THE DYOR AUDIT 2.0",
    description: "Trace the path from a CA in the replies to a late entry, crowd conviction and a missing exit plan.",
    images: ["/audit/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DYOR AUDIT 2.0",
    description: "Ten questions. Seventeen degen archetypes. Three fictional scores. One FOMO case file.",
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
          <p className="eyebrow">FOMO CONTROL UNIT / KOL-TRIGGERED ENTRY DESK</p>
          <h1>THE DYOR<br /><span>AUDIT 2.0.</span></h1>
          <p className="audit-intro__lead">Ten questions. Three fictional dimensions. Reconstruct the moment a KOL call, a green candle or a “CA?” reply turned into an entry. Receive your FOMO case file and send it to the group chat.</p>
          <div className="audit-warning"><span>!</span><p>THIS IS A SATIRICAL PERSONALITY QUIZ. Scores and classifications are fictional entertainment, not an assessment of investment skill, risk tolerance or financial decisions. No wallets or assets involved.</p></div>
        </div>
        <AuditClient />
      </div>
      <DepartmentFooter message={["YOUR RESEARCH HAS BEEN ACKNOWLEDGED.", "YOUR LOSSES REMAIN YOURS."]} />
    </main>
  );
}