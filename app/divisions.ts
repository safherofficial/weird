export type DepartmentSection = "home" | "audit" | "simulator" | "utility" | "roadmap" | "whitepaper" | "museum" | "club" | "cope" | "archives" | "daily" | "airdrop" | "passport";

export type DepartmentDivision = {
  number: string; title: string; pageTitle: string; category: string; description: string;
  status: string; href: string; symbol: string; section: DepartmentSection; mandate: string;
};

export const departments: DepartmentDivision[] = [
  { number: "01", title: "PUMP.FUN INTELLIGENCE", pageTitle: "THE BAGHOLDER SIMULATOR", category: "PAPER MARKET SIMULATOR", description: "Follow a fictional launch from ape-in through bonding curve graduation, migration, KOL noise and the moment your exit plan becomes someone else's liquidity.", status: "PAPER MARKET OPEN", href: "/simulator", symbol: "↘", section: "simulator", mandate: "LAUNCH CYCLE / BONDING CURVE · GRADUATION · MIGRATION" },
  { number: "02", title: "CROSS-CHAIN TRENCHES", pageTitle: "THE 99% CLUB", category: "99% CLUB / CROSS-CHAIN SURVIVOR REGISTRY", description: "Apply for completely useless crypto-trenches survivor status. Across every chain and cycle, missed 100x calls, revenge entries and unexplained re-entries count as experience.", status: "SURVIVOR INTAKE OPEN", href: "/club", symbol: "◉", section: "club", mandate: "CROSS-CHAIN SURVIVOR REGISTRY / PRIOR RUGS ARE NOT CREDENTIALS" },
  { number: "03", title: "FOMO CONTROL UNIT", pageTitle: "THE DYOR AUDIT 2.0", category: "DYOR AUDIT / BEHAVIOURAL CASE FILE", description: "Reconstruct the decision chain: one KOL quote, a green candle, five Telegram refreshes and an entry that you officially renamed conviction.", status: "FOMO CASES ACCEPTED", href: "/audit", symbol: "⌁", section: "audit", mandate: "BEHAVIOURAL CASEWORK / KOL CALLS · GREEN CANDLES · LATE ENTRIES" },
  { number: "04", title: "KOL SURVEILLANCE", pageTitle: "THE TRENCHES DESK", category: "DAILY FICTIONAL CT BRIEFING", description: "Read date-seeded fictional briefings on copied calls, badge-based authority, suspicious consensus and alpha that cites another post.", status: "FICTIONAL BRIEFING FILED", href: "/daily-office", symbol: "◎", section: "daily", mandate: "FICTIONAL CT BRIEFING / NO REAL ACCOUNTS ARE MONITORED" },
  { number: "05", title: "WHALE & WALLET INVESTIGATION", pageTitle: "THE DEPARTMENT ARCHIVES", category: "FICTIONAL CASE ARCHIVE", description: "Browse mystery-whale dossiers, sniper lore, suspicious wallet labels and screenshots whose original source has entered witness protection.", status: "CASE ARCHIVE OPEN", href: "/archives", symbol: "⌕", section: "archives", mandate: "CASE ARCHIVE / FICTIONAL WALLETS & UNSOURCED SCREENSHOTS" },
  { number: "06", title: "CTO EMERGENCY OFFICE", pageTitle: "THE CTO TAKEOVER ROADMAP", category: "COMMUNITY TAKEOVER / CTO RECOVERY PLAN", description: "The dev has gone quiet. Telegram has appointed three new admins. Generate seven fictional recovery phases, each with a remarkably flexible ETA.", status: "EMERGENCY MILESTONES OPEN", href: "/roadmap-generator", symbol: "⇢", section: "roadmap", mandate: "COMMUNITY TAKEOVER RESPONSE / ETA: SUBJECT TO SOON" },
  { number: "07", title: "EXIT LIQUIDITY DEPARTMENT", pageTitle: "THE TOKEN DOSSIER FACTORY", category: "FICTIONAL TOKEN DOSSIER / TOKENOMICS FACTORY", description: "Generate a fictional Solana token dossier with tokenomics polished enough to make the post-graduation pool look like it has a communications team.", status: "DOCUMENT INTAKE OPEN", href: "/whitepaper-factory", symbol: "▤", section: "whitepaper", mandate: "FICTIONAL TOKEN DOCUMENTATION / EXIT LIQUIDITY IS NOT A UTILITY" },
  { number: "08", title: "100X RESEARCH BUREAU", pageTitle: "THE TOKEN-PURPOSE INSPECTOR", category: "TOKEN UTILITY / NARRATIVE INSPECTION", description: "Before calling a microcap the next 100x, submit its fictional utility claims for seven questions and three scores that should never be mistaken for alpha.", status: "CLAIMS / UNVERIFIED", href: "/utility-inspector", symbol: "⌗", section: "utility", mandate: "TOKEN NARRATIVE REVIEW / NO ACTUAL ALPHA INSIDE" },
  { number: "09", title: "BAGHOLDER REHABILITATION", pageTitle: "THE TRENCHES RELIC MUSEUM", category: "MUSEUM OF TRENCHES RELICS", description: "Visit the permanent collection of missed exits, bonding-curve trophies, copied KOL screenshots, CTO banners and conviction that outlived the chart.", status: "COLLECTION OPEN", href: "/museum", symbol: "▧", section: "museum", mandate: "RECOVERY COLLECTION / NO REFUNDS · NO ACTUAL TREATMENT" },
  { number: "10", title: "COPIUM ADMINISTRATION", pageTitle: "THE GLOBAL COPE INDEX", category: "GLOBAL COPE INDEX / SYNTHETIC TRENCHES READINGS", description: "Check fictional daily readings for CT echo, launch FOMO, Telegram reassurance, CTO hope and post-graduation denial.", status: "COPE INDEX / SYNTHETIC", href: "/cope-index", symbol: "∞", section: "cope", mandate: "DATE-SEEDED READINGS / NO LIVE SENTIMENT DATA" },
  { number: "11", title: "AIRDROP ENTITLEMENT OFFICE", pageTitle: "THE SNAPSHOT TRIBUNAL", category: "AIRDROP SNAPSHOT / ELIGIBILITY INTERVIEW", description: "File a fictional review of points farming, snapshot assumptions, cross-chain activity, eligibility receipts and allocation expectations. No real programme or wallet is checked.", status: "ELIGIBILITY FILES ACCEPTED", href: "/airdrop-office", symbol: "◇", section: "airdrop", mandate: "AIRDROP ELIGIBILITY / SNAPSHOT RULES · POINTS · CLAIM WINDOWS" },
];

export const departmentGroups = [
  { number: "01", code: "ENTRY & SURVIVAL / DIVISIONS 01—03", title: "ENTRY & SURVIVAL", description: "The launch, the trench and the moment FOMO gets mistaken for a research process.", items: departments.slice(0, 3) },
  { number: "02", code: "INTELLIGENCE & OPERATIONS / DIVISIONS 04—08", title: "INTELLIGENCE & OPERATIONS", description: "KOL narratives, mystery wallets, emergency community takeovers, fictional token dossiers and the next supposedly life-changing gem.", items: departments.slice(3, 8) },
  { number: "03", code: "AFTERCARE & ENTITLEMENT / DIVISIONS 09—11", title: "AFTERCARE & ENTITLEMENT", description: "The relics, official coping mechanisms and eligibility paperwork left after the market has finished its business.", items: departments.slice(8, 11) },
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
