import Link from "next/link";
import DepartmentCaseChain from "./department-case-chain";
import type { DepartmentSection } from "../divisions";

type DepartmentJourneyId =
  | "audit"
  | "simulator"
  | "utility"
  | "roadmap"
  | "whitepaper"
  | "club"
  | "cope"
  | "daily"
  | "archives"
  | "museum";

type DepartmentDestination = {
  href: string;
  title: string;
  description: string;
};

const departmentRoutes: Record<DepartmentJourneyId, readonly DepartmentDestination[]> = {
  audit: [
    {
      href: "/simulator",
      title: "PUMP.FUN INTELLIGENCE / PAPER MARKET SIMULATOR",
      description: "Follow a fictional pump.fun launch from CA drop through bonding-curve graduation, CTO noise and the post-graduation pool.",
    },
    {
      href: "/cope-index",
      title: "COPIUM ADMINISTRATION / GLOBAL COPE INDEX",
      description: "Check your fictional CT echo, launch FOMO, Telegram dependency and post-graduation optimism.",
    },
  ],
  simulator: [
    {
      href: "/audit",
      title: "FOMO CONTROL UNIT / DYOR AUDIT",
      description: "Audit the path from a KOL quote-tweet and green candle to a late entry and a missing exit plan.",
    },
    {
      href: "/club",
      title: "SOLANA TRENCHES / 99% CLUB",
      description: "Apply for fictional survivor status after missed calls, late entries, deployer silence and bagholder rehabilitation.",
    },
  ],
  utility: [
    {
      href: "/roadmap-generator",
      title: "CTO EMERGENCY OFFICE / TAKEOVER ROADMAP",
      description: "Build seven fictional recovery phases after the deployer goes quiet and a new CTO account takes over the timeline.",
    },
    {
      href: "/whitepaper-factory",
      title: "EXIT LIQUIDITY DEPARTMENT / TOKEN DOSSIER",
      description: "Turn a fictional token narrative into a supply chart, deployer-role section and tokenomics document with exit-liquidity footnotes.",
    },
  ],
  roadmap: [
    {
      href: "/whitepaper-factory",
      title: "EXIT LIQUIDITY DEPARTMENT / TOKEN DOSSIER",
      description: "The CTO plan has seven phases. The token still needs nine sections of technical-sounding paperwork.",
    },
    {
      href: "/utility-inspector",
      title: "100X RESEARCH BUREAU / TOKEN-PURPOSE INSPECTION",
      description: "Inspect what the token does after the launch thread, the KOL call and the first green candle.",
    },
  ],
  whitepaper: [
    {
      href: "/utility-inspector",
      title: "100X RESEARCH BUREAU / TOKEN-PURPOSE INSPECTION",
      description: "Put the token narrative back under review. A ticker, a KOL call and a token dossier do not establish a use case.",
    },
    {
      href: "/museum",
      title: "BAGHOLDER REHABILITATION / MUSEUM OF TRENCHES RELICS",
      description: "Explore fictional Pump.fun launch relics, copied KOL screenshots, bonding-curve trophies and CTO handover banners.",
    },
  ],
  club: [
    {
      href: "/cope-index",
      title: "COPIUM ADMINISTRATION / GLOBAL COPE INDEX",
      description: "Check your personal fictional cope profile alongside the synthetic daily trenches index.",
    },
    {
      href: "/archives",
      title: "WHALE & WALLET INVESTIGATION / DEPARTMENT ARCHIVES",
      description: "Browse fictional bundle-wallet dossiers, mystery-whale theories, copied CA calls and pump.fun incident reports.",
    },
  ],
  daily: [
    {
      href: "/archives",
      title: "WHALE & WALLET INVESTIGATION / DEPARTMENT ARCHIVES",
      description: "Follow the fictional dispatch trail into archived wallet theories, copied calls and unexplained on-chain lore.",
    },
    {
      href: "/cope-index",
      title: "COPIUM ADMINISTRATION / GLOBAL COPE INDEX",
      description: "Compare the day's fictional briefing with the Department's synthetic CT, FOMO and post-graduation readings.",
    },
  ],
  archives: [
    {
      href: "/daily-office",
      title: "THE TRENCHES DESK / DAILY CT BRIEFING",
      description: "Return to the date-seeded fictional report behind the Department's latest trench incident.",
    },
    {
      href: "/museum",
      title: "BAGHOLDER REHABILITATION / MUSEUM OF TRENCHES RELICS",
      description: "See the artifacts left behind by fictional launches, copied calls and exits that never happened.",
    },
  ],
  museum: [
    {
      href: "/archives",
      title: "WHALE & WALLET INVESTIGATION / DEPARTMENT ARCHIVES",
      description: "Move from preserved relics to the fictional case records, wallet theories and incident files behind them.",
    },
    {
      href: "/club",
      title: "SOLANA TRENCHES / 99% CLUB",
      description: "Apply for fictional survivor status. The collection is permanent; the benefits remain unavailable.",
    },
  ],
  cope: [
    {
      href: "/daily-office",
      title: "THE TRENCHES DESK / DAILY CT BRIEFING",
      description: "Read today's fictional CT briefing, pump.fun incident report, wallet theory and bagholder post-mortem.",
    },
    {
      href: "/club",
      title: "SOLANA TRENCHES / 99% CLUB",
      description: "Apply to the fictional Solana trenches survivor registry. No privileges, no token, no financial benefits.",
    },
  ],
};

type DepartmentNextStepsProps = {
  currentDepartment: DepartmentJourneyId;
};

export default function DepartmentNextSteps({ currentDepartment }: DepartmentNextStepsProps) {
  const destinations = departmentRoutes[currentDepartment];

  return (
    <section className="department-next-steps" aria-labelledby="department-next-steps-title">
      <div className="department-next-steps__heading">
        <div>
          <span className="department-next-steps__eyebrow">DEPARTMENTAL ROUTING / YOUR FILE IS NOT THE LAST</span>
          <h2 id="department-next-steps-title">WHAT HAPPENS NEXT?</h2>
        </div>
        <span className="department-next-steps__count">NEXT ASSIGNMENT / 02 OFFICES</span>
      </div>

      <div className="department-next-steps__grid">
        {destinations.map((destination, index) => (
          <Link
            className="department-next-steps__card"
            href={destination.href}
            key={destination.href}
            aria-label={"Open " + destination.title + ". " + destination.description}
          >
            <span className="department-next-steps__number">ROUTE / 0{index + 1}</span>
            <strong>{destination.title}</strong>
            <span className="department-next-steps__description">{destination.description}</span>
            <span className="department-next-steps__cta">ENTER DEPARTMENT <span aria-hidden="true">↗</span></span>
          </Link>
        ))}
      </div>

      <div className="department-next-steps__atlas-link">
        <div>
          <span>INSTITUTIONAL REFERENCE / 18 THEMATIC FILES</span>
          <strong>TRACE THIS OFFICE THROUGH THE ENTIRE DEPARTMENT.</strong>
          <p>Open the Case Atlas to follow shared cases, archive precedents and Museum records across all ten divisions.</p>
        </div>
        <Link className="button button--quiet" href="/daily-office/atlas">OPEN THE CASE ATLAS ↗</Link>
      </div>

      <DepartmentCaseChain currentDepartment={currentDepartment as DepartmentSection} />

      <div className="department-next-steps__passport">
        <p>
          <span>KEEP THE RECORD</span>
          With the Passport enabled, department visits and completed-experience badges are saved locally on this device. Enable it before starting.
        </p>
        <Link href="/passport">OPEN / ENABLE PASSPORT ↗</Link>
      </div>
    </section>
  );
}
