import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import UtilityInspectorClient from "./utility-inspector-client";

export const metadata: Metadata = {
  alternates: { canonical: "/utility-inspector" },
  title: "100X Research Bureau | Utility Inspector",
  description: "The 100X Research Bureau inspects fictional Solana token narratives: actual use, post-launch purpose, community demand and evidence beyond the KOL thread.",
  openGraph: {
    title: "THE 100X TOKEN-PURPOSE INSPECTOR",
    description: "Before calling the next Solana microcap a 100x, explain what the ticker does after the launch thread.",
    images: ["/utility-inspector/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE 100X TOKEN-PURPOSE INSPECTOR",
    description: "Seven fictional questions. Three scores. No live token scanner, wallet analysis or actual alpha.",
    images: ["/utility-inspector/opengraph-image"],
  },
};

export default function UtilityInspectorPage() {
  return (
    <main className="audit-page utility-page" id="main-content">
      <DepartmentHeader activeSection="utility" statusMessage="CLAIMS INTAKE / EVIDENCE NOT GUARANTEED" ctaHref="/utility-inspector" ctaLabel="INSPECT UTILITY" />

      <div className="utility-shell shell" id="content-start" tabIndex={-1}>
        <aside className="utility-intro">
          <div className="audit-intro__meta"><span>FORM UTI-001</span><span>TOKEN PURPOSE / UNDER REVIEW</span></div>
          <p className="eyebrow">100X RESEARCH BUREAU / NARRATIVE & TOKEN PURPOSE DESK</p>
          <h1>THE TOKEN-PURPOSE<br /><span>INSPECTOR.</span></h1>
          <p className="audit-intro__lead">
            Every ticker has a story. The Bureau wants to know what remains when the first pump, KOL thread and Telegram raid are over.
          </p>
          <div className="utility-intro__stamp">
            <span>DEPARTMENTAL REMINDER</span>
            <strong>A TOKEN IS NOT A PRODUCT.</strong>
            <small>A TICKER IS NOT A USE CASE.</small>
          </div>
          <div className="utility-intro__fineprint">
            THIS IS A SATIRICAL QUESTIONNAIRE. NO PROJECT, TOKEN, SMART CONTRACT OR MARKET DATA IS INSPECTED.
          </div>
        </aside>

        <UtilityInspectorClient />
      </div>

      <DepartmentFooter message={["THE NARRATIVE HAS BEEN RECEIVED.", "THE ACTUAL USE CASE IS STILL UNDER REVIEW."]} />
    </main>
  );
}
