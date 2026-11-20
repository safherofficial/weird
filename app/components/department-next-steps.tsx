import Link from "next/link";

type DepartmentJourneyId =
  | "audit"
  | "simulator"
  | "utility"
  | "roadmap"
  | "whitepaper"
  | "club"
  | "cope";

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
      title: "100X RESEARCH BUREAU / UTILITY INSPECTOR",
      description: "Inspect what the token does after the launch thread, the KOL call and the first green candle.",
    },
  ],
  whitepaper: [
    {
      href: "/utility-inspector",
      title: "100X RESEARCH BUREAU / UTILITY INSPECTOR",
      description: "Put the token narrative back under review. A ticker, a KOL call and a whitepaper do not establish a use case.",
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

      <div className="department-next-steps__passport">
        <p>
          <span>KEEP THE RECORD</span>
          Enable the optional Department Passport to collect visit stamps locally on this device.
        </p>
        <Link href="/passport">OPEN DEPARTMENT PASSPORT ↗</Link>
      </div>
    </section>
  );
}
