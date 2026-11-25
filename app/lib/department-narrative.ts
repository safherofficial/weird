import { archiveRecords } from "../archives/archive-data";
import { departments, type DepartmentSection } from "../divisions";
import { buildDailyOfficeDispatch, type DailyOfficeDispatch } from "../daily-office/daily-engine";
import { exhibits } from "../museum/museum-data";

type OfficeStep = {
  section: DepartmentSection;
  responsibility: string;
};

type CaseThreadDefinition = {
  narrative: string;
  offices: [OfficeStep, OfficeStep, OfficeStep];
  archiveSlug: string;
  exhibitSlug: string;
};

type OfficeSection = Exclude<DepartmentSection, "home" | "passport">;

type OfficeEvidenceProfile = {
  source: "INCIDENT REPORT" | "KOL INTELLIGENCE" | "ON-CHAIN DIVISION" | "RISK DEPARTMENT" | "INTERNAL CORRESPONDENCE" | "BAGHOLDER POST-MORTEM" | "CONVICTION INDEX";
  outputLabel: string;
  reviewQuestion: string;
};

type DepartmentNarrativeEvidence = {
  receivedFrom: string;
  receivedArtifact: string;
  source: string;
  outputLabel: string;
  excerpt: string;
  reviewQuestion: string;
};

type DepartmentNarrativeHandoff = {
  label: string;
  note: string;
  destinations: Array<{ title: string; href: string }>;
};

/**
 * Defines what each office actually contributes to a shared file.
 * The source is drawn from the same date-seeded dispatch shown at the Trenches Desk;
 * this table only changes how an existing fictional record is reviewed and routed.
 */
const officeEvidenceProfiles: Record<OfficeSection, OfficeEvidenceProfile> = {
  simulator: {
    source: "ON-CHAIN DIVISION",
    outputLabel: "PAPER-MARKET SEQUENCE",
    reviewQuestion: "What does the fictional transaction sequence show, and what remains unknown about ownership or execution?",
  },
  club: {
    source: "BAGHOLDER POST-MORTEM",
    outputLabel: "SURVIVOR AFTERCARE FILE",
    reviewQuestion: "Which consequences remain after the original thesis has been rewritten as long-term conviction?",
  },
  audit: {
    source: "INCIDENT REPORT",
    outputLabel: "DECISION-CHAIN RECONSTRUCTION",
    reviewQuestion: "Which decision relied on an assumption that the incident record does not establish?",
  },
  daily: {
    source: "KOL INTELLIGENCE",
    outputLabel: "SOURCE-PROVENANCE REPORT",
    reviewQuestion: "Can the claim be traced to an original source, or is the file counting repeated copies?",
  },
  archives: {
    source: "ON-CHAIN DIVISION",
    outputLabel: "OBSERVATION / INFERENCE LEDGER",
    reviewQuestion: "What is directly recorded, and what is only an interpretation of the fictional wallet activity?",
  },
  roadmap: {
    source: "INTERNAL CORRESPONDENCE",
    outputLabel: "ACCESS / ACCOUNTABILITY CHECKLIST",
    reviewQuestion: "Who owns the next measurable action, and what would count as an accepted handover?",
  },
  whitepaper: {
    source: "RISK DEPARTMENT",
    outputLabel: "TOKENOMICS / CONTROL DISCLOSURE",
    reviewQuestion: "Do the allocation, control and liquidity claims have support inside the fictional file?",
  },
  museum: {
    source: "BAGHOLDER POST-MORTEM",
    outputLabel: "PRESERVED RELIC / CONTEXT LABEL",
    reviewQuestion: "What artifact survives, and what does that artifact fail to prove?",
  },
  cope: {
    source: "CONVICTION INDEX",
    outputLabel: "SYNTHETIC CONFIDENCE READING",
    reviewQuestion: "How much of the reading is confidence theatre rather than evidence about the fictional case?",
  },
  airdrop: {
    source: "RISK DEPARTMENT",
    outputLabel: "SNAPSHOT / ELIGIBILITY DUE-PROCESS REVIEW",
    reviewQuestion: "Are qualifying actions, snapshot timing, wallet attribution and appeal conditions actually stated in the fictional record?",
  },
  utility: {
    source: "INCIDENT REPORT",
    outputLabel: "TOKEN-PURPOSE CLAIM REVIEW",
    reviewQuestion: "What does the token claim to do beyond its ticker, promotion or launch milestone?",
  },
};

function excerptFromDispatch(dispatch: DailyOfficeDispatch, profile: OfficeEvidenceProfile): string {
  if (profile.source === "CONVICTION INDEX") {
    const reading = dispatch.convictionIndex.readings.find((item) =>
      /BUNDLE|KOL|CA RESEARCH/.test(item.label),
    );
    if (!reading) throw new Error("The synthetic conviction reading is missing from the daily case.");
    return reading.label + ": " + reading.score + "/100 — " + reading.assessment + ". " + dispatch.convictionIndex.note;
  }

  const section = dispatch.sections.find((item) => item.label === profile.source);
  if (!section) {
    throw new Error("A Department evidence profile references a missing dispatch section: " + profile.source + ".");
  }

  return section.body
    .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
    .slice(0, 2)
    .join(" ");
}

export const departmentCaseThreads: Record<string, CaseThreadDefinition> = {
  "CA / LAUNCH CONTEXT": {
    narrative: "The CA arrives before a defensible thesis. Token-purpose claims are logged first, copied promotion is checked for an original source, and the paper-market desk records what the launch thread leaves unanswered.",
    offices: [
      { section: "utility", responsibility: "Records the token-purpose claim and separates a ticker from an actual use case." },
      { section: "daily", responsibility: "Checks whether the fictional KOL chorus points back to one copied source." },
      { section: "simulator", responsibility: "Reconstructs the launch sequence without placing a real trade." },
    ],
    archiveSlug: "appendix-m-technical-detail",
    exhibitSlug: "the-screenshot-of-a-screenshot",
  },
  "BONDING-CURVE GRADUATION": {
    narrative: "Graduation closes one launch milestone, not the questions around distribution or exit capacity. The simulator records the transition, the archive checks the fictional wallet story, and the dossier office refuses to certify a pool from a progress bar.",
    offices: [
      { section: "simulator", responsibility: "Records the fictional graduation and post-graduation paper-market sequence." },
      { section: "archives", responsibility: "Reviews the wallet and holder claims attached to the celebration." },
      { section: "whitepaper", responsibility: "Checks whether the token dossier explains supply, control and exit assumptions." },
    ],
    archiveSlug: "the-curve-completed-the-thesis-did-not",
    exhibitSlug: "the-bonding-curve-progress-bar",
  },
  "DEPLOYER / CTO HANDOVER": {
    narrative: "The deployer goes quiet and the banner changes. The CTO office lists the access still missing, the archive preserves the handover evidence, and the survivor registry records what a community takeover did not automatically transfer.",
    offices: [
      { section: "roadmap", responsibility: "Turns the fictional takeover into milestones with owners and acceptance conditions." },
      { section: "archives", responsibility: "Keeps the handover trail and unanswered access questions on record." },
      { section: "club", responsibility: "Records the community's survivor status after the takeover announcement." },
    ],
    archiveSlug: "the-cto-handover-file",
    exhibitSlug: "the-founder-pfp-upgrade",
  },
  "KOL ECHO / COPIED CALLS": {
    narrative: "One call is repeated until repetition resembles consensus. KOL Surveillance preserves the source trail, FOMO Control reconstructs the resulting entry pressure, and the Research Bureau separates popularity from evidence.",
    offices: [
      { section: "daily", responsibility: "Documents the fictional call relay and asks for the original source." },
      { section: "audit", responsibility: "Reconstructs how repeated social proof affected the entry decision." },
      { section: "utility", responsibility: "Separates a popular catalyst from evidence of token purpose." },
    ],
    archiveSlug: "the-independent-kol-consensus",
    exhibitSlug: "the-screenshot-of-a-screenshot",
  },
  "GREEN-CANDLE CONVICTION": {
    narrative: "A green candle is promoted into a long-term thesis. FOMO Control reviews the decision, the paper simulator records the fictional follow-through, and the Museum preserves the screenshot that outlived the explanation.",
    offices: [
      { section: "audit", responsibility: "Reconstructs the late-entry decision and the confidence attached to it." },
      { section: "simulator", responsibility: "Shows the fictional paper-market consequences after the candle." },
      { section: "museum", responsibility: "Preserves the chart crop as an artifact of post-hoc conviction." },
    ],
    archiveSlug: "the-entry-was-impeccable",
    exhibitSlug: "the-screenshot-of-a-screenshot",
  },
  "BUNDLE / WALLET THEORIES": {
    narrative: "A wallet diagram is promoted as proof of coordinated intent. The archive records what is visible and what is unknown, KOL Surveillance traces the caption's source, and the dossier office checks whether the claimed distribution is actually documented.",
    offices: [
      { section: "archives", responsibility: "Separates fictional transaction observations from assumptions about ownership." },
      { section: "daily", responsibility: "Checks whether the wallet story is being repeated as independent confirmation." },
      { section: "whitepaper", responsibility: "Reviews whether supply and allocation claims have any supporting context." },
    ],
    archiveSlug: "the-wallet-graph-does-not-prove-ownership",
    exhibitSlug: "the-bundle-family-portrait",
  },
  "POST-GRADUATION LIQUIDITY": {
    narrative: "The graduation badge looks official; the pool still has to answer for depth and exit conditions. The simulator records the paper-market squeeze, the archive preserves the certificate dispute, and the token dossier is asked to define what its liquidity language means.",
    offices: [
      { section: "simulator", responsibility: "Records the fictional post-graduation pool and paper-only exit conditions." },
      { section: "archives", responsibility: "Keeps the liquidity certificate and its missing context on file." },
      { section: "whitepaper", responsibility: "Checks token allocation and liquidity claims without certifying real funds." },
    ],
    archiveSlug: "liquidity-puddle-incident",
    exhibitSlug: "the-liquidity-puddle",
  },
  "COMMUNITY TAKEOVER": {
    narrative: "A poll appoints the next admins but does not transfer keys by magic. The survivor registry records the announcement, the CTO office demands a real handover checklist, and the archive preserves the vote and its limits.",
    offices: [
      { section: "club", responsibility: "Records the community's fictional takeover vote and survivor paperwork." },
      { section: "roadmap", responsibility: "Turns the announcement into a sequence of access and delivery checks." },
      { section: "archives", responsibility: "Preserves the decision trail and the responsibilities still unassigned." },
    ],
    archiveSlug: "dao-button-outcome",
    exhibitSlug: "the-dao-voting-button",
  },
  "DELETED KOL CALL": {
    narrative: "The call disappears from the timeline, but screenshots have already circulated. KOL Surveillance logs the echo, FOMO Control reconstructs the decision made around it, and the Museum preserves the relic without treating it as proof.",
    offices: [
      { section: "daily", responsibility: "Records the fictional deletion and the copies that remain in circulation." },
      { section: "audit", responsibility: "Reconstructs the influence of the call on the fictional entry decision." },
      { section: "museum", responsibility: "Preserves the screenshot as an artifact, not as an authenticated claim." },
    ],
    archiveSlug: "seventeenth-rocket-custody",
    exhibitSlug: "the-screenshot-of-a-screenshot",
  },
  "100X ENTRY TIMING": {
    narrative: "The next 100x is found before the previous post-mortem is closed. The Research Bureau checks the thesis, FOMO Control reviews the timing, and the survivor registry records the familiar aftercare application.",
    offices: [
      { section: "utility", responsibility: "Asks what the fictional token is supposed to do beyond the price target." },
      { section: "audit", responsibility: "Reviews the route from KOL exposure to late entry." },
      { section: "club", responsibility: "Files the fictional survivor application after the outcome." },
    ],
    archiveSlug: "the-entry-was-impeccable",
    exhibitSlug: "the-screenshot-of-a-screenshot",
  },
  "CA SOURCE VERIFICATION": {
    narrative: "Three accounts claim to have found the same CA first. KOL Surveillance follows the copied source, the Research Bureau checks the underlying claim, and the archive records the difference between a repeated address and corroborated evidence.",
    offices: [
      { section: "daily", responsibility: "Traces the fictional repost chain back toward its missing original source." },
      { section: "utility", responsibility: "Checks the token-purpose claim independently of the CA's popularity." },
      { section: "archives", responsibility: "Stores the source trail and records what could not be verified." },
    ],
    archiveSlug: "the-independent-kol-consensus",
    exhibitSlug: "the-screenshot-of-a-screenshot",
  },
  "CTO ACCESS CHECKLIST": {
    narrative: "A CTO Space is underway while access is still pending. The recovery roadmap names the missing controls, the archive records the appeal, and the Museum preserves the banner that was mistaken for a completed handover.",
    offices: [
      { section: "roadmap", responsibility: "Lists custody, permissions, operators and measurable recovery milestones." },
      { section: "archives", responsibility: "Keeps the Phase Two appeal and access gaps in the official record." },
      { section: "museum", responsibility: "Preserves the takeover banner as evidence of an announcement, not a transfer." },
    ],
    archiveSlug: "phase-two-appeal",
    exhibitSlug: "the-cto-handover-banner",
  },
  "WALLET-GRAPH INTERPRETATION": {
    narrative: "The arrows are visible; ownership and motive remain unconfirmed. The archive keeps those limits attached to the diagram, the dossier reviews distribution language, and Copium Administration records the fictional confidence gap.",
    offices: [
      { section: "archives", responsibility: "Distinguishes visible transfers from assumptions about wallet ownership or intent." },
      { section: "whitepaper", responsibility: "Checks whether token distribution claims match the fictional dossier." },
      { section: "cope", responsibility: "Measures synthetic confidence without presenting it as real sentiment." },
    ],
    archiveSlug: "the-wallet-graph-does-not-prove-ownership",
    exhibitSlug: "the-bundle-family-portrait",
  },
  "EXIT-PLAN ABSENCE": {
    narrative: "Forty-six pages of research have produced no exit condition. The dossier office documents the supply story, the simulator tests paper-only outcomes, and the survivor registry receives the application nobody planned to submit.",
    offices: [
      { section: "whitepaper", responsibility: "Documents allocation and fictional liquidity assumptions without inventing an exit route." },
      { section: "simulator", responsibility: "Shows the paper-only consequence of decisions made without an exit condition." },
      { section: "club", responsibility: "Files the resulting fictional trenches-survivor paperwork." },
    ],
    archiveSlug: "liquidity-puddle-incident",
    exhibitSlug: "the-liquidity-puddle",
  },
  "GREEN-CANDLE EVIDENCE": {
    narrative: "A cropped chart is offered as confirmation after the move has already happened. FOMO Control asks what the screenshot actually proves, KOL Surveillance checks who copied it, and the Museum preserves the crop with its missing timeframe.",
    offices: [
      { section: "audit", responsibility: "Reviews the decision made from the cropped chart and its missing timeframe." },
      { section: "daily", responsibility: "Checks the fictional repost chain and the absent original context." },
      { section: "museum", responsibility: "Preserves the chart fragment with its source limitations attached." },
    ],
    archiveSlug: "the-entry-was-impeccable",
    exhibitSlug: "the-screenshot-of-a-screenshot",
  },
  "SNIPER THEORY": {
    narrative: "A few early buys become a complete theory of coordinated ownership. The archive separates observation from allegation, the paper simulator records the launch context, and FOMO Control examines how the theory became a reason to chase.",
    offices: [
      { section: "archives", responsibility: "Keeps the fictional wallet cluster and the unknown ownership status together." },
      { section: "simulator", responsibility: "Reconstructs the fictional launch timeline without identifying real wallets." },
      { section: "audit", responsibility: "Reviews how the sniper narrative influenced the entry decision." },
    ],
    archiveSlug: "the-wallet-graph-does-not-prove-ownership",
    exhibitSlug: "the-bundle-family-portrait",
  },
  "MIGRATION CLAIM": {
    narrative: "A migration screenshot is mistaken for proof of durable demand. The simulator records the graduation event, the CTO office checks who owns the next operational step, and the Research Bureau refuses to treat a milestone as a product thesis.",
    offices: [
      { section: "simulator", responsibility: "Records the fictional curve graduation and migration sequence." },
      { section: "roadmap", responsibility: "Checks whether a named operator owns the next delivery milestone." },
      { section: "utility", responsibility: "Separates a launch milestone from evidence of working token purpose." },
    ],
    archiveSlug: "the-curve-completed-the-thesis-did-not",
    exhibitSlug: "the-bonding-curve-progress-bar",
  },

  "AIRDROP SNAPSHOT / ELIGIBILITY APPEAL": {
    narrative: "The applicant spread activity across networks, collected points and expected every task to qualify. The Snapshot Tribunal checks the published-rule assumptions, the Archive preserves the appeal and the 99% Club records the cross-chain aftercare story without turning activity into an entitlement.",
    offices: [
      { section: "airdrop", responsibility: "Reviews the fictional qualifying actions, snapshot window, attribution rules and expectation of an allocation." },
      { section: "archives", responsibility: "Preserves the eligibility notice and separates recorded evidence from retrospective assumptions." },
      { section: "club", responsibility: "Records the cross-chain survivor narrative without treating points or activity as a promised reward." },
    ],
    archiveSlug: "airdrop-snapshot-eligibility-appeal",
    exhibitSlug: "the-airdrop-passport-stamp-book",
  },

  "BAGHOLDER ENTRY HISTORY": {
    narrative: "The entry price has been promoted to a historical event. FOMO Control reconstructs the original decision, the survivor registry records the aftercare paperwork, and the Museum preserves the artifact that the subject refuses to call an exit warning.",
    offices: [
      { section: "audit", responsibility: "Reconstructs the original CA, KOL and entry decisions." },
      { section: "club", responsibility: "Records the fictional survivor status and its complete lack of benefits." },
      { section: "museum", responsibility: "Preserves the evidence after the thesis has become a long-term archive item." },
    ],
    archiveSlug: "the-entry-was-impeccable",
    exhibitSlug: "the-screenshot-of-a-screenshot",
  },
};

export type DepartmentNarrative = {
  issueDate: string;
  reference: string;
  caseTheme: string;
  headline: string;
  narrative: string;
  currentOffice: { number: string; title: string; href: string };
  offices: Array<{
    number: string;
    title: string;
    href: string | null;
    section: DepartmentSection;
    responsibility: string;
    isCurrent: boolean;
    evidence: DepartmentNarrativeEvidence;
    handoff: DepartmentNarrativeHandoff;
  }>;
  precedent: { accession: string; title: string; summary: string; href: string };
  relic: { accession: string; title: string; description: string; href: string };
};

export function buildDepartmentNarrative(issueDate: string, currentDepartment: DepartmentSection): DepartmentNarrative {
  const dispatch = buildDailyOfficeDispatch(issueDate);
  const thread = departmentCaseThreads[dispatch.caseTheme];
  if (!thread) throw new Error("No Department narrative thread is defined for the daily editorial case.");

  const currentOffice = departments.find((department) => department.section === currentDepartment);
  if (!currentOffice) throw new Error("A valid Department office is required for narrative routing.");

  const precedent = archiveRecords.find((record) => record.slug === thread.archiveSlug);
  const relic = exhibits.find((exhibit) => exhibit.slug === thread.exhibitSlug);
  if (!precedent || !relic) throw new Error("A Department narrative thread references a missing precedent or relic.");

  const offices = thread.offices.map((step, index) => {
    const department = departments.find((item) => item.section === step.section);
    if (!department) throw new Error("A Department narrative thread references an unknown office.");
    const isCurrent = department.section === currentOffice.section;
    const profile = officeEvidenceProfiles[department.section as OfficeSection];
    if (!profile) throw new Error("A Department narrative thread references an office without an evidence profile.");
    const previousStep = thread.offices[index - 1];
    const previousDepartment = previousStep
      ? departments.find((item) => item.section === previousStep.section)
      : null;
    const previousProfile = previousStep
      ? officeEvidenceProfiles[previousStep.section as OfficeSection]
      : null;
    const evidence: DepartmentNarrativeEvidence = {
      receivedFrom: previousDepartment?.title ?? "THE TRENCHES DESK / DAILY CASE INTAKE",
      receivedArtifact: previousProfile?.outputLabel ?? "ORIGINAL DAILY DISPATCH / INTAKE RECORD",
      source: profile.source,
      outputLabel: profile.outputLabel,
      excerpt: excerptFromDispatch(dispatch, profile),
      reviewQuestion: profile.reviewQuestion,
    };

    const nextStep = thread.offices[index + 1];
    const nextDepartment = nextStep
      ? departments.find((item) => item.section === nextStep.section)
      : null;
    const handoff: DepartmentNarrativeHandoff = nextDepartment
      ? {
          label: "NEXT HANDOFF / OFFICE " + nextDepartment.number,
          note: "Forward " + profile.outputLabel.toLowerCase() + " to " + nextDepartment.title + " for its assigned review: " + nextStep.responsibility,
          destinations: [{ title: nextDepartment.number + " / " + nextDepartment.title, href: nextDepartment.href }],
        }
      : {
          label: "FINAL DEPOSIT / INSTITUTIONAL MEMORY",
          note: "The three-office review is filed against the archive precedent and preserved beside the Museum relic. Neither record is presented as evidence about a real market event.",
          destinations: [
            { title: "ARCHIVE / " + precedent.title, href: "/archives/records/" + precedent.slug },
            { title: "MUSEUM / " + relic.title, href: "/museum/exhibits/" + relic.slug },
          ],
        };

    return {
      number: department.number,
      title: department.title,
      href: isCurrent ? null : department.href,
      section: department.section,
      responsibility: step.responsibility,
      isCurrent,
      evidence,
      handoff,
    };
  });

  return {
    issueDate: dispatch.issueDate,
    reference: dispatch.reference,
    caseTheme: dispatch.caseTheme,
    headline: dispatch.headline,
    narrative: thread.narrative,
    currentOffice: { number: currentOffice.number, title: currentOffice.title, href: currentOffice.href },
    offices,
    precedent: {
      accession: precedent.accession,
      title: precedent.title,
      summary: precedent.summary,
      href: "/archives/records/" + precedent.slug,
    },
    relic: {
      accession: relic.accession,
      title: relic.title,
      description: relic.description,
      href: "/museum/exhibits/" + relic.slug,
    },
  };
}
