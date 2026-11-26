export type DepartmentSection = "home" | "audit" | "simulator" | "utility" | "roadmap" | "whitepaper" | "museum" | "club" | "cope" | "archives" | "daily" | "airdrop" | "bridge" | "governance" | "passport";

export type DepartmentDivision = {
  number: string; title: string; pageTitle: string; category: string; description: string;
  status: string; href: string; symbol: string; section: DepartmentSection; mandate: string;
};

export const departments: DepartmentDivision[] = [
  { number: "01", title: "PUMP.FUN INTELLIGENCE", pageTitle: "THE BAGHOLDER SIMULATOR", category: "PAPER MARKET SIMULATOR", description: "Follow a fictional launch from ape-in to graduation, migration and the exit liquidity nobody planned for.", status: "PAPER MARKET OPEN", href: "/simulator", symbol: "↘", section: "simulator", mandate: "LAUNCH CYCLE / BONDING CURVE · GRADUATION · MIGRATION" },
  { number: "02", title: "CROSS-CHAIN TRENCHES", pageTitle: "THE 99% CLUB", category: "99% CLUB / CROSS-CHAIN SURVIVOR REGISTRY", description: "A cross-chain survivor registry for missed 100x calls, revenge entries and the conviction to re-enter.", status: "SURVIVOR INTAKE OPEN", href: "/club", symbol: "◉", section: "club", mandate: "CROSS-CHAIN SURVIVOR REGISTRY / PRIOR RUGS ARE NOT CREDENTIALS" },
  { number: "03", title: "FOMO CONTROL UNIT", pageTitle: "THE DYOR AUDIT 2.0", category: "DYOR AUDIT / BEHAVIOURAL CASE FILE", description: "Turn one KOL quote, a green candle and a few Telegram refreshes into an official FOMO case file.", status: "FOMO CASES ACCEPTED", href: "/audit", symbol: "⌁", section: "audit", mandate: "BEHAVIOURAL CASEWORK / KOL CALLS · GREEN CANDLES · LATE ENTRIES" },
  { number: "04", title: "KOL SURVEILLANCE", pageTitle: "THE TRENCHES DESK", category: "DAILY CT BRIEFING", description: "Date-seeded briefings on copied calls, badge-based authority and alpha that cites itself.", status: "DAILY BRIEFING FILED", href: "/daily-office", symbol: "◎", section: "daily", mandate: "FICTIONAL CT BRIEFING / NO REAL ACCOUNTS ARE MONITORED" },
  { number: "05", title: "WHALE & WALLET INVESTIGATION", pageTitle: "THE DEPARTMENT ARCHIVES", category: "CASE ARCHIVE", description: "Fictional dossiers on mystery whales, sniper lore and screenshots whose sources went missing.", status: "CASE ARCHIVE OPEN", href: "/archives", symbol: "⌕", section: "archives", mandate: "CASE ARCHIVE / FICTIONAL WALLETS & UNSOURCED SCREENSHOTS" },
  { number: "06", title: "CTO EMERGENCY OFFICE", pageTitle: "THE CTO TAKEOVER ROADMAP", category: "COMMUNITY TAKEOVER / CTO RECOVERY PLAN", description: "Generate seven fictional CTO recovery phases, each with a remarkably flexible ETA.", status: "EMERGENCY MILESTONES OPEN", href: "/roadmap-generator", symbol: "⇢", section: "roadmap", mandate: "COMMUNITY TAKEOVER RESPONSE / ETA: SUBJECT TO SOON" },
  { number: "07", title: "EXIT LIQUIDITY DEPARTMENT", pageTitle: "THE TOKEN DOSSIER FACTORY", category: "TOKEN DOSSIER / TOKENOMICS FACTORY", description: "Create a fictional token dossier with polished tokenomics and a post-graduation liquidity problem.", status: "DOCUMENT INTAKE OPEN", href: "/whitepaper-factory", symbol: "▤", section: "whitepaper", mandate: "FICTIONAL TOKEN DOCUMENTATION / EXIT LIQUIDITY IS NOT A UTILITY" },
  { number: "08", title: "100X RESEARCH BUREAU", pageTitle: "THE TOKEN-PURPOSE INSPECTOR", category: "TOKEN UTILITY / NARRATIVE INSPECTION", description: "Inspect fictional utility claims with seven questions and three scores. No alpha guaranteed.", status: "CLAIMS / UNVERIFIED", href: "/utility-inspector", symbol: "⌗", section: "utility", mandate: "TOKEN NARRATIVE REVIEW / NO ACTUAL ALPHA INSIDE" },
  { number: "09", title: "BAGHOLDER REHABILITATION", pageTitle: "THE TRENCHES RELIC MUSEUM", category: "MUSEUM OF TRENCHES RELICS", description: "Explore relics of missed exits, copied calls and conviction that outlived the chart.", status: "COLLECTION OPEN", href: "/museum", symbol: "▧", section: "museum", mandate: "RECOVERY COLLECTION / NO REFUNDS · NO ACTUAL TREATMENT" },
  { number: "10", title: "COPIUM ADMINISTRATION", pageTitle: "THE GLOBAL COPE INDEX", category: "GLOBAL COPE INDEX / TRENCHES READINGS", description: "Daily fictional readings of CT echo, launch FOMO and post-graduation denial.", status: "DAILY INDEX FILED", href: "/cope-index", symbol: "∞", section: "cope", mandate: "DATE-SEEDED READINGS / NO LIVE SENTIMENT DATA" },
  { number: "11", title: "AIRDROP ENTITLEMENT OFFICE", pageTitle: "THE SNAPSHOT TRIBUNAL", category: "AIRDROP SNAPSHOT / ELIGIBILITY INTERVIEW", description: "Review points farming, snapshot assumptions and the airdrop allocation you already spent.", status: "ELIGIBILITY FILES ACCEPTED", href: "/airdrop-office", symbol: "◇", section: "airdrop", mandate: "AIRDROP ELIGIBILITY / SNAPSHOT RULES · POINTS · CLAIM WINDOWS" },
  { number: "12", title: "BRIDGE INCIDENT OFFICE", pageTitle: "THE BRIDGE INCIDENT OFFICE", category: "INTERCHAIN TRANSFER / INCIDENT REVIEW", description: "Reconstruct a fictional bridge incident from source receipts to destination settlement.", status: "INTERCHAIN INCIDENTS ACCEPTED", href: "/bridge-incident-office", symbol: "⇄", section: "bridge", mandate: "CROSS-CHAIN TRANSFERS / SOURCE CONFIRMATION · DESTINATION SETTLEMENT" },
  { number: "13", title: "GOVERNANCE ACCOUNTABILITY OFFICE", pageTitle: "THE QUORUM TRIBUNAL", category: "DAO GOVERNANCE / PROPOSAL & QUORUM REVIEW", description: "Review fictional DAO proposal scope, voter eligibility, quorum and execution authority.", status: "GOVERNANCE REVIEWS ACCEPTED", href: "/governance-office", symbol: "⌘", section: "governance", mandate: "GOVERNANCE PROCESS / ELIGIBILITY · VOTING WEIGHT · QUORUM · EXECUTION" },
];

export const departmentGroups = [
  { number: "01", code: "ENTRY & SURVIVAL / DIVISIONS 01—03", title: "ENTRY & SURVIVAL", description: "The launch, the trench and the moment FOMO gets mistaken for a research process.", items: departments.slice(0, 3) },
  { number: "02", code: "INTELLIGENCE & OPERATIONS / DIVISIONS 04—08", title: "INTELLIGENCE & OPERATIONS", description: "KOL narratives, mystery wallets, emergency community takeovers, fictional token dossiers and the next supposedly life-changing gem.", items: departments.slice(3, 8) },
  { number: "03", code: "AFTERCARE, INTERCHAIN & GOVERNANCE OPERATIONS / DIVISIONS 09—13", title: "AFTERCARE & GOVERNANCE", description: "The relics, official coping mechanisms, eligibility paperwork, transfer incidents and voting rules left after the market has finished its business.", items: departments.slice(8, 13) },
];

// Route labels intentionally mirror each destination page's H1, not its separate division identity.
export const divisionNavigationGroups = departmentGroups.map((group) => ({
  number: group.number,
  label: group.title,
  descriptor: group.code,
  anchorId: "department-group-" + group.number,
  items: group.items.map((d) => ({ number: d.number, label: d.pageTitle, href: d.href, section: d.section })),
}));

export const divisionIdentityBySection: Partial<Record<DepartmentSection, DepartmentDivision>> = Object.fromEntries(departments.map((d) => [d.section, d]));
