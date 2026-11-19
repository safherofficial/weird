import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import SimulatorClient from "./simulator-client";

export const metadata: Metadata = {
  alternates: { canonical: "/simulator" },
  title: "The Bagholder Simulator",
  description: "Seven rounds, four questionable decisions and one completely fictional asset. Find out how you would handle the imaginary bag.",
  openGraph: {
    title: "THE BAGHOLDER SIMULATOR",
    description: "Seven rounds. Four questionable decisions. One imaginary bag. No real money involved.",
    images: ["/simulator/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE BAGHOLDER SIMULATOR",
    description: "Seven rounds. Four questionable decisions. One imaginary bag.",
    images: ["/simulator/opengraph-image"],
  },
};

export default function SimulatorPage() {
  return (
    <main className="audit-page simulator-page" id="main-content">
      <DepartmentHeader activeSection="simulator" statusMessage="PAPER MARKET / COMPLETELY FICTIONAL" ctaHref="/" ctaLabel="BACK TO HQ" />

      <div className="simulator-shell shell" id="content-start" tabIndex={-1}>
        <div className="simulator-intro">
          <div className="audit-intro__meta"><span>FORM BHS-001</span><span>RISK-FREE FINANCIAL REGRET</span></div>
          <p className="eyebrow">OFFICE OF IMAGINARY MARKET LOSSES</p>
          <h1>THE BAGHOLDER<br /><span>SIMULATOR.</span></h1>
          <p className="audit-intro__lead">
            Seven rounds. Four questionable options. One fictional asset.
            Every decision is yours. Every market event is made up.
          </p>
          <div className="audit-warning">
            <span>!</span>
            <p>THIS IS A SCRIPTED ENTERTAINMENT SIMULATION. All assets, prices, events, balances and outcomes are fictional. DPC means Department Paper Credits. No real money, token, wallet or market feed is involved.</p>
          </div>
        </div>
        <SimulatorClient />
      </div>

      <DepartmentFooter message={["YOUR PAPER CAPITAL HAS BEEN ACKNOWLEDGED.", "YOUR REAL FINANCIAL DIGNITY IS NOT UNDER REVIEW."]} />
    </main>
  );
}
