import type { DepartmentSection } from "../divisions";

export type DepartmentJourneyId = Exclude<DepartmentSection, "home" | "passport">;

export type DepartmentDestination = {
  href: string;
  title: string;
  description: string;
};

/**
 * Curated next steps for each operational division.
 * Keep this graph connected so every Department experience can lead back
 * into the wider editorial network without dead ends or self-links.
 */
export const departmentJourneys: Record<DepartmentJourneyId, readonly DepartmentDestination[]> = {
  audit: [
    {
      href: "/simulator",
      title: "PUMP.FUN INTELLIGENCE / PAPER MARKET SIMULATOR",
      description: "Replay the fictional launch sequence from CA discovery through bonding-curve graduation, CTO noise and the post-graduation pool.",
    },
    {
      href: "/utility-inspector",
      title: "100X RESEARCH BUREAU / TOKEN-PURPOSE INSPECTION",
      description: "Carry the thesis into seven self-reported questions about a token narrative and its claimed purpose. The result remains fictional, not real due diligence.",
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
      title: "CROSS-CHAIN TRENCHES / 99% CLUB",
      description: "Apply to the fictional cross-chain survivor registry after missed calls, late entries, deployer silence and bagholder rehabilitation.",
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
      description: "Inspect what the token narrative claims to do after the launch thread, the KOL call and the first green candle.",
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
      href: "/simulator",
      title: "PUMP.FUN INTELLIGENCE / PAPER MARKET SIMULATOR",
      description: "Return to the launch cycle in a paper-only simulation: CA discovery, bonding-curve graduation, migration and the exit that never arrived.",
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
      title: "CROSS-CHAIN TRENCHES / 99% CLUB",
      description: "Apply to the fictional cross-chain crypto survivor registry. No privileges, no token, no financial benefits.",
    },
  ],
};
