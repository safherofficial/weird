import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../components/department-header";
import DepartmentFooter from "../components/department-footer";
import DepartmentNextSteps from "../components/department-next-steps";
import DailyOfficeClient from "./daily-client";
import OnchainDailyTeaser from "./onchain-teaser";
import DailyOfficeRelatedLinks from "./daily-office-related-links";
import { buildDailyOfficeDispatch } from "./daily-engine";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/daily-office" },
  title: "The Trenches Desk | Daily CT Briefing",
  description: "A satirical date-seeded CT briefing, alongside a separate daily on-chain desk publishing real Solana DEX observations from public data.",
  openGraph: {
    title: "THE TRENCHES DESK / DAILY CT BRIEFING",
    description: "The fictional Trenches Desk and a separate daily on-chain intelligence report sourced from public Solana DEX data.",
    images: ["/daily-office/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "THE TRENCHES DESK / DAILY CT BRIEFING",
    description: "Daily satirical CT dispatches plus a separate real-data Solana DEX report.",
    images: ["/daily-office/opengraph-image"],
  },
};

export default function DailyOfficePage() {
  const issueDate = new Date().toISOString().slice(0, 10);
  const dispatch = buildDailyOfficeDispatch(issueDate);

  return (
    <main className="audit-page daily-office-page" id="main-content">
      <DepartmentHeader activeSection="daily" statusMessage="DAILY DESK / FICTIONAL EDITORIAL CONTENT" ctaHref="/daily-office" ctaLabel="READ TODAY'S FILE" />

      <div className="daily-office-shell shell" id="content-start" tabIndex={-1}>
        <header className="daily-office-intro">
          <div className="audit-intro__meta">
            <span>DAILY REGISTER / {dispatch.reference}</span>
            <span>ISSUED / {dispatch.issueDate} UTC</span>
          </div>
          <p className="eyebrow">KOL SURVEILLANCE / DAILY CT & SOLANA TRENCHES BRIEFING</p>
          <h1>THE TRENCHES<br /><span>DESK.</span></h1>
          <p className="audit-intro__lead">
            One UTC-dated fictional CT briefing: copied KOL calls, pump.fun launch incidents, bundle-wallet theories, CTO handovers, liquidity denial and a post-mortem that refuses to admit defeat.
          </p>
          <div className="daily-office-intro__notice">
            <span>EDITORIAL NOTICE / NOT A NEWS SERVICE</span>
            <strong>THIS TRENCHES DESK BRIEFING IS FICTIONAL AND DATE-SEEDED.</strong>
            <small>REAL SOLANA DEX ACTIVITY IS PUBLISHED SEPARATELY IN ONCHAIN INTELLIGENCE.</small>
          </div>
        </header>
        <OnchainDailyTeaser />
        <DailyOfficeClient dispatch={dispatch} />
        <DailyOfficeRelatedLinks dispatch={dispatch} />
        <div className="daily-office-quick-links">
          <Link className="button button--quiet" href="/cope-index">READ THE MATCHING GLOBAL COPE INDEX ↗</Link>
          <Link className="button button--quiet" href="/daily-office/ledger">OPEN THE INSTITUTIONAL MEMORY LEDGER ↗</Link>
          <Link className="button button--quiet" href="/daily-office/atlas">EXPLORE THE CROSS-DIVISION CASE ATLAS ↗</Link>
        </div>
      </div>

      <div className="shell">
        <DepartmentNextSteps currentDepartment="daily" />
      </div>

      <DepartmentFooter message={["TODAY'S TRENCHES REPORT HAS BEEN FILED.", "TOMORROW'S PROBLEMS ARE ALREADY IN REVIEW."]} />
    </main>
  );
}
