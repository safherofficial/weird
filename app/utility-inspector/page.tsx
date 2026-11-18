import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import UtilityInspectorClient from "./utility-inspector-client";

export const metadata: Metadata = {
  title: "Utility Inspector",
  description: "Seven questions. Three departmental scores. Find out whether your project pitch contains a product, a token with a job or a suspicious amount of narrative fog.",
  openGraph: {
    title: "THE UTILITY INSPECTOR",
    description: "Show us the utility. Seven questions, three fictional scores and one uncomfortable inspection.",
    images: ["/utility-inspector/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE UTILITY INSPECTOR",
    description: "Show us the utility. Seven questions. Three fictional scores.",
    images: ["/utility-inspector/opengraph-image"],
  },
};

export default function UtilityInspectorPage() {
  return (
    <main className="audit-page utility-page" id="main-content">
      <DepartmentHeader activeSection="utility" statusMessage="CLAIMS INTAKE / EVIDENCE NOT GUARANTEED" ctaHref="/utility-inspector" ctaLabel="INSPECT UTILITY" />

      <div className="utility-shell shell" id="content-start" tabIndex={-1}>
        <aside className="utility-intro">
          <div className="audit-intro__meta"><span>FORM UTI-001</span><span>USE CASE / UNKNOWN</span></div>
          <p className="eyebrow">OFFICE OF CLAIMED REVOLUTIONARY SOLUTIONS</p>
          <h1>THE UTILITY<br /><span>INSPECTOR.</span></h1>
          <p className="audit-intro__lead">
            Every project promises to change everything. We would like to know what it actually does.
          </p>
          <div className="utility-intro__stamp">
            <span>DEPARTMENTAL REMINDER</span>
            <strong>A TOKEN IS NOT A PRODUCT.</strong>
            <small>A WHITEPAPER IS NOT A DEMO.</small>
          </div>
          <div className="utility-intro__fineprint">
            THIS IS A SATIRICAL QUESTIONNAIRE. NO PROJECT, TOKEN, SMART CONTRACT OR MARKET DATA IS INSPECTED.
          </div>
        </aside>

        <UtilityInspectorClient />
      </div>

      <DepartmentFooter message={["UTILITY CLAIMS HAVE BEEN RECEIVED.", "PROOF IS A SEPARATE DEPARTMENT."]} />
    </main>
  );
}
