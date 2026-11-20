import type { Metadata } from "next";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import SimulatorClient from "./simulator-client";

export const metadata: Metadata = {
  alternates: { canonical: "/simulator" },
  title: "Pump.fun Paper Market Simulator",
  description: "A fictional Solana launch from first CA drop to bonding-curve graduation, CTO noise and post-graduation exit liquidity. Seven paper-market decisions.",
  openGraph: {
    title: "PUMP.FUN PAPER MARKET SIMULATOR",
    description: "A fictional launch cycle: CA drop, bundle chatter, KOL calls, graduation, CTO and the post-launch pool. No real token or money.",
    images: ["/simulator/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "PUMP.FUN PAPER MARKET SIMULATOR",
    description: "Seven fictional launch events. Four choices per round. Your imaginary bag is on the record.",
    images: ["/simulator/opengraph-image"],
  },
};

export default function SimulatorPage() {
  return (
    <main className="audit-page simulator-page" id="main-content">
      <DepartmentHeader activeSection="simulator" statusMessage="PAPER MARKET / COMPLETELY FICTIONAL" ctaHref="/" ctaLabel="BACK TO HQ" />

      <div className="simulator-shell shell" id="content-start" tabIndex={-1}>
        <div className="simulator-intro">
          <div className="audit-intro__meta"><span>FORM BHS-001</span><span>PUMP.FUN PAPER MARKET / FICTIONAL LAUNCH</span></div>
          <p className="eyebrow">PUMP.FUN INTELLIGENCE / PAPER MARKET DESK</p>
          <h1>THE BAGHOLDER<br /><span>SIMULATOR.</span></h1>
          <p className="audit-intro__lead">
            Seven rounds. One fictional Solana launch. From the first CA drop to graduation, a community takeover and the post-launch pool.
            Your decisions change the paper bag. The scripted market does not care.
          </p>
          <div className="audit-warning">
            <span>!</span>
            <p>THIS IS A SCRIPTED ENTERTAINMENT SIMULATION. All assets, prices, events, balances and outcomes are fictional. DPC means Department Paper Credits. No real money, token, wallet or market feed is involved.</p>
          </div>
        </div>
        <SimulatorClient />
      </div>

      <DepartmentFooter message={["YOUR FICTIONAL LAUNCH HAS BEEN FILED.", "YOUR EXIT PLAN IS STILL MISSING."]} />
    </main>
  );
}
