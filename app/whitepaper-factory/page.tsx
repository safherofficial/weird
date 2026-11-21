import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import WhitepaperFactoryClient from "./whitepaper-factory-client";

export const metadata: Metadata = {
  alternates: { canonical: "/whitepaper-factory" },
  title: "Exit Liquidity Department | Fictional Token Dossier",
  description: "Generate a fictional Solana token dossier: launch narrative, deployer roles, notional allocation, KOL distribution, community governance and post-graduation risk.",
  openGraph: {
    title: "EXIT LIQUIDITY DEPARTMENT | TOKEN DOSSIER",
    description: "A fictional Solana token dossier covering launch lore, deployer control, notional tokenomics, CT promotion and post-graduation exit-liquidity questions.",
    images: ["/whitepaper-factory/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "EXIT LIQUIDITY DEPARTMENT | TOKEN DOSSIER",
    description: "Seven questions. Nine fictional sections. One invented token allocation and a carefully worded post-graduation risk disclaimer.",
    images: ["/whitepaper-factory/opengraph-image"],
  },
};

export default function WhitepaperFactoryPage() {
  return (
    <main className="audit-page whitepaper-page" id="main-content">
      <DepartmentHeader activeSection="whitepaper" statusMessage="DOCUMENT INTAKE / TOKEN CLAIMS / FICTIONAL DOSSIER" ctaHref="/whitepaper-factory" ctaLabel="GENERATE TOKEN DOSSIER" />

      <div className="whitepaper-shell shell" id="content-start" tabIndex={-1}>
        <aside className="whitepaper-intro">
          <div className="audit-intro__meta"><span>FORM WPF-001</span><span>TOKEN SUPPLY / NOTIONAL</span></div>
          <p className="eyebrow">EXIT LIQUIDITY DEPARTMENT / TOKEN DOSSIER OFFICE</p>
          <h1>THE TOKEN DOSSIER<br /><span>FACTORY.</span></h1>
          <p className="audit-intro__lead">
            Give the fictional token a public label and answer seven questions. The Department will produce nine sections of launch lore, tokenomics, deployer roles, KOL distribution and carefully neglected footnotes.
          </p>
          <div className="whitepaper-intro__stamp">
            <span>TOKEN DOSSIER / FICTIONAL ISSUE</span>
            <strong>TOKENOMICS TABLE COMPLETE.</strong>
            <small>EXIT LIQUIDITY / NOT GUARANTEED.</small>
          </div>
          <div className="whitepaper-intro__fineprint">
            THIS IS A SATIRE GENERATOR. THE RESULT IS NOT A REAL TECHNICAL OR INVESTMENT DOCUMENT.
          </div>
        </aside>

        <WhitepaperFactoryClient />
      </div>

      <div className="shell">
        <DepartmentNextSteps currentDepartment="whitepaper" />
      </div>

      <DepartmentFooter message={["YOUR TOKEN NARRATIVE HAS BEEN DOCUMENTED.", "YOUR COMMUNITY STILL NEEDS A REASON TO STAY."]} />
    </main>
  );
}
