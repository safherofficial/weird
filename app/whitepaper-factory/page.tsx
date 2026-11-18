import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import WhitepaperFactoryClient from "./whitepaper-factory-client";

export const metadata: Metadata = {
  title: "Whitepaper Factory",
  description: "Seven questions. Nine sections. Generate a fictional crypto whitepaper filled with technical-sounding language, tokenomics and appropriately neglected footnotes.",
  openGraph: {
    title: "THE WHITEPAPER FACTORY",
    description: "A whitepaper-shaped document for a project that may or may not exist.",
    images: ["/whitepaper-factory/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE WHITEPAPER FACTORY",
    description: "Seven questions. Nine sections. One technically impressive PDF-shaped situation.",
    images: ["/whitepaper-factory/opengraph-image"],
  },
};

export default function WhitepaperFactoryPage() {
  return (
    <main className="audit-page whitepaper-page" id="main-content">
      <DepartmentHeader activeSection="whitepaper" statusMessage="DOCUMENT INTAKE / TECHNICAL CLAIMS UNVERIFIED" ctaHref="/whitepaper-factory" ctaLabel="MAKE A WHITEPAPER" />

      <div className="whitepaper-shell shell" id="content-start" tabIndex={-1}>
        <aside className="whitepaper-intro">
          <div className="audit-intro__meta"><span>FORM WPF-001</span><span>PAGE COUNT / FLEXIBLE</span></div>
          <p className="eyebrow">OFFICE OF TECHNICAL-SOUNDING DOCUMENTATION</p>
          <h1>THE WHITEPAPER<br /><span>FACTORY.</span></h1>
          <p className="audit-intro__lead">
            Give us a project name and seven answers. We will give you nine sections, a token allocation and enough terminology to request a conference panel.
          </p>
          <div className="whitepaper-intro__stamp">
            <span>OFFICIAL DOCUMENT CONTROL</span>
            <strong>ABSTRACT COMPLETE.</strong>
            <small>PRODUCT STATUS / NOT LOCATED.</small>
          </div>
          <div className="whitepaper-intro__fineprint">
            THIS IS A SATIRE GENERATOR. THE RESULT IS NOT A REAL TECHNICAL OR INVESTMENT DOCUMENT.
          </div>
        </aside>

        <WhitepaperFactoryClient />
      </div>

      <DepartmentFooter message={["YOUR TECHNICAL VISION HAS BEEN DOCUMENTED.", "YOUR PRODUCT REMAINS SUBJECT TO VERIFICATION."]} />
    </main>
  );
}
