export type ArchiveCategory =
  | "OFFICIAL MEMOS"
  | "INCIDENT REPORTS"
  | "TECHNICAL APPENDICES"
  | "MEMBERSHIP FILES"
  | "PUBLIC NOTICES";

export type ArchiveSection = {
  heading: string;
  paragraphs: string[];
};

export type ArchiveRecord = {
  slug: string;
  accession: string;
  title: string;
  category: ArchiveCategory;
  department: string;
  clearance: string;
  summary: string;
  finding: string;
  stamp: string;
  sections: ArchiveSection[];
  relatedLabel: string;
  relatedHref: string;
  keywords: string[];
};

export const archiveCategories: Array<"ALL FILES" | ArchiveCategory> = [
  "ALL FILES",
  "OFFICIAL MEMOS",
  "INCIDENT REPORTS",
  "TECHNICAL APPENDICES",
  "MEMBERSHIP FILES",
  "PUBLIC NOTICES",
];

export const archiveRecords: ArchiveRecord[] = [
  {
    slug: "the-entry-was-impeccable",
    accession: "DDA-001",
    title: "THE GREEN-CANDLE ENTRY WAS IMPECCABLE",
    category: "INCIDENT REPORTS",
    department: "FOMO CONTROL UNIT / GREEN-CANDLE ENTRY REVIEW",
    clearance: "PUBLIC / FICTIONAL CASE STUDY",
    summary: "A fictional late-entry review in which the CA was copied from a KOL reply, the five-minute chart was green and the market declined to honour the timeline's 100x thesis.",
    finding: "KOL CALL ACKNOWLEDGED / ENTRY TIMING NOT CERTIFIED.",
    stamp: "THESIS FILED / PRICE UNAVAILABLE",
    sections: [
      { heading: "INCIDENT OVERVIEW", paragraphs: ["The applicant reported a complete launch check, including a CA review, a look at the five-minute chart and multiple visits to the CT replies and Telegram chat.", "The fictional case demonstrates the Department's central principle: seeing a green candle and a repeated KOL call does not establish a defensible entry or future demand."] },
      { heading: "DEPARTMENTAL OBSERVATION", paragraphs: ["No actual transaction, asset, investor or market event is represented in this file. The record is a satirical illustration of overconfidence after research."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The Department acknowledges the effort. It declines to certify the entry as impeccable, inevitable or immune to the market."] },
    ],
    relatedLabel: "OPEN THE FOMO CONTROL UNIT AUDIT",
    relatedHref: "/audit",
    keywords: ["CA", "KOL", "green candle", "FOMO", "late entry", "audit"],
  },
  {
    slug: "liquidity-puddle-incident",
    accession: "DDA-002",
    title: "THE LIQUIDITY PUDDLE INCIDENT",
    category: "INCIDENT REPORTS",
    department: "PUMP.FUN INTELLIGENCE / PAPER MARKET RESPONSE",
    clearance: "PUBLIC / SIMULATED INCIDENT",
    summary: "A fictional pump.fun paper-market bulletin described the post-graduation pool as a puddle. The incident triggered a review of imaginary exit conditions.",
    finding: "EXIT CAPACITY CLASSIFIED AS WEATHER-DEPENDENT.",
    stamp: "NO ACTUAL LIQUIDITY WAS DISTURBED",
    sections: [
      { heading: "INCIDENT OVERVIEW", paragraphs: ["The fictional HYPE-404 launch had graduated and displayed a shallow post-graduation pool. A single moderately sized imaginary order would have required a public consultation.", "The event belongs to the deterministic Pump.fun Intelligence paper-market simulation. It is not based on a real token, pool or market feed."] },
      { heading: "RESPONSE", paragraphs: ["Participants were offered the opportunity to hold, trim, average down or consult CT / Telegram. The post-graduation puddle remained a puddle throughout the exercise."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The Department reminds visitors that simulated paper values are not market data, financial outcomes or execution estimates."] },
    ],
    relatedLabel: "OPEN THE PUMP.FUN INTELLIGENCE SIMULATOR",
    relatedHref: "/simulator",
    keywords: ["pump.fun", "graduation", "post-graduation", "pool", "slippage", "paper market"],
  },
  {
    slug: "directive-on-the-word-soon",
    accession: "DDA-003",
    title: "DIRECTIVE ON THE WORD 'SOON'",
    category: "OFFICIAL MEMOS",
    department: "CTO EMERGENCY OFFICE / COMMUNITY TAKEOVER ROADMAP",
    clearance: "PUBLIC / INTERNAL HUMOUR",
    summary: "A departmental memo requests that all CTO recovery phases define whether 'soon' means a date, a handover milestone or another pinned update.",
    finding: "TEMPORAL AMBIGUITY REMAINS THE LEADING DELIVERY METHOD.",
    stamp: "ETA: SUBJECT TO FURTHER REVIEW",
    sections: [
      { heading: "PURPOSE", paragraphs: ["This memo establishes a satirical classification for community takeover milestones whose estimated arrival is listed as 'soon', 'after the next CTO Space' or 'when the deployer replies'."] },
      { heading: "RECOMMENDED FORMATTING", paragraphs: ["A real community handover should identify operators, responsibilities, permissions, dependencies and a verifiable completion condition. This fictional memo does not establish a real team or recovery schedule."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The word 'soon' remains admissible for parody. It is not recognized as a calendar date."] },
    ],
    relatedLabel: "OPEN THE CTO EMERGENCY OFFICE ROADMAP",
    relatedHref: "/roadmap-generator",
    keywords: ["soon", "roadmap", "milestone", "deadline", "memo"],
  },
  {
    slug: "partnership-pre-announcement",
    accession: "DDA-004",
    title: "NOTICE OF A KOL PRE-ANNOUNCEMENT",
    category: "PUBLIC NOTICES",
    department: "KOL SURVEILLANCE / FICTIONAL CAMPAIGN REVIEW",
    clearance: "PUBLIC / FICTITIOUS NOTICE",
    summary: "A notice records that several fictional KOL-style accounts have hinted at a major announcement after posting the same CA and cropped chart.",
    finding: "ORIGINAL SOURCE NOT LOCATED / CT EXCITEMENT CONFIRMED.",
    stamp: "SAME CA / DIFFERENT BIOS",
    sections: [
      { heading: "NOTICE", paragraphs: ["The Department has received a fictional notice of a possible KOL campaign. No original source, disclosure, counterparty, scope or deliverable is identified."] },
      { heading: "EVIDENCE REVIEW", paragraphs: ["A follow, a verification badge, a quote-post or a sentence containing 'smart money is here' is not proof of independent research or a commercial partnership."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The notice is filed as a satirical exhibit. It should not be interpreted as a statement about any real organization."] },
    ],
    relatedLabel: "VISIT THE 100X RESEARCH BUREAU",
    relatedHref: "/utility-inspector",
    keywords: ["partnership", "announcement", "mou", "logo", "notice"],
  },
  {
    slug: "appendix-m-technical-detail",
    accession: "DDA-005",
    title: "APPENDIX M: TOKEN DOSSIER DETAIL",
    category: "TECHNICAL APPENDICES",
    department: "EXIT LIQUIDITY DEPARTMENT / TOKEN DOSSIER CONTROL",
    clearance: "PUBLIC / FICTIONAL APPENDIX",
    summary: "A technical-looking token appendix records the launch route as proprietary, deployer control as pending and the token purpose as available in Appendix N.",
    finding: "TOKEN DOSSIER DENSITY EXCEEDS LAUNCH CLARITY.",
    stamp: "PLEASE REFER TO THE NEXT APPENDIX",
    sections: [
      { heading: "ABSTRACT", paragraphs: ["This appendix describes a fictional Solana meme-token launch whose bonding-curve route, post-graduation pool and deployer access will be described in a later appendix."] },
      { heading: "IMPLEMENTATION STATUS", paragraphs: ["No real contract, token, wallet, program or architecture has been audited or verified by this record. Launch terminology is generated solely for satire."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The appendix is complete. The product remains outside the scope of the archive."] },
    ],
    relatedLabel: "OPEN THE EXIT LIQUIDITY DEPARTMENT DOSSIER",
    relatedHref: "/whitepaper-factory",
    keywords: ["token dossier", "pump.fun", "deployer", "bonding curve", "post-graduation", "appendix"],
  },
  {
    slug: "dao-button-outcome",
    accession: "DDA-006",
    title: "THE CTO COMMUNITY TAKEOVER BUTTON",
    category: "INCIDENT REPORTS",
    department: "SOLANA TRENCHES / COMMUNITY TAKEOVER UNIT",
    clearance: "PUBLIC / FICTIONAL OBSERVATION",
    summary: "A fictional CTO poll received thousands of imaginary votes before informing the community that the new admin team would decide what happened next.",
    finding: "PARTICIPATION RECORDED / AUTHORITY UNCHANGED.",
    stamp: "DECENTRALIZED UNTIL FURTHER NOTICE",
    sections: [
      { heading: "INCIDENT OVERVIEW", paragraphs: ["The button labelled COMMUNITY TAKEOVER opened a pinned thread explaining that all final decisions would be made by the new admin account."] },
      { heading: "COMMITTEE RESPONSE", paragraphs: ["A committee appointed by the new admin has been asked to review the handover framework. The community has been asked to wait for an update."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["This is a fictional satire record, not an allegation about a real DAO, protocol or governance process."] },
    ],
    relatedLabel: "OPEN THE SOLANA TRENCHES 99% CLUB",
    relatedHref: "/club",
    keywords: ["dao", "governance", "button", "voting", "community"],
  },
  {
    slug: "membership-privileges-denied",
    accession: "DDA-007",
    title: "MEMBERSHIP PRIVILEGES DENIED",
    category: "MEMBERSHIP FILES",
    department: "SOLANA TRENCHES / 99% SURVIVOR REGISTRY",
    clearance: "PUBLIC / NO BENEFITS",
    summary: "A fictional trenches survivor application was approved, a card was printed and the benefits desk confirmed that no token, status or practical benefit had been issued.",
    finding: "MEMBERSHIP GRANTED / EXPECTATIONS MANAGED.",
    stamp: "CARD VALID / PERKS INVALID",
    sections: [
      { heading: "APPLICATION", paragraphs: ["The fictional applicant completed the five-question Solana trenches interview and received a deterministic survivor number."] },
      { heading: "BENEFITS REVIEW", paragraphs: ["The Club provides no token, account, transfer value, financial product, discounts or real-world membership status."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The card is approved for entertainment purposes and may be shared as a fictional case file."] },
    ],
    relatedLabel: "APPLY TO THE SOLANA TRENCHES 99% CLUB",
    relatedHref: "/club",
    keywords: ["99% club", "membership", "card", "benefits", "member"],
  },
  {
    slug: "daily-cope-methodology",
    accession: "DDA-008",
    title: "DAILY COPE METHODOLOGY",
    category: "TECHNICAL APPENDICES",
    department: "COPIUM ADMINISTRATION / SYNTHETIC TRENCHES INDEX",
    clearance: "PUBLIC / METHODOLOGY NOTE",
    summary: "A methodology notice confirms that the Global Cope Index uses a deterministic UTC date seed to generate fictional CT echo, launch FOMO and post-graduation cope readings.",
    finding: "GLOBAL IN NAME / TRENCHES-ONLY FICTION BY DESIGN.",
    stamp: "NO LIVE FEED / NO REAL SAMPLE",
    sections: [
      { heading: "CALCULATION", paragraphs: ["Daily Cope Index dimensions are generated deterministically from the UTC issue date. The same date produces the same fictional CT and Solana trenches reading for all visitors."] },
      { heading: "DATA SOURCES", paragraphs: ["No exchange feed, X account, Telegram group, wallet, token, visitor poll or external sentiment source is queried by the index."] },
      { heading: "LIMITATIONS", paragraphs: ["The index is a satirical display, not an indicator, market forecast, survey result or representation of global investor sentiment."] },
    ],
    relatedLabel: "OPEN THE GLOBAL COPE INDEX / COPIUM ADMINISTRATION",
    relatedHref: "/cope-index",
    keywords: ["cope index", "methodology", "synthetic", "daily", "UTC", "data"],
  },
  {
    slug: "seventeenth-rocket-custody",
    accession: "DDA-009",
    title: "CUSTODY OF THE SEVENTEENTH ROCKET",
    category: "OFFICIAL MEMOS",
    department: "BAGHOLDER REHABILITATION / TRENCHES RELIC COLLECTION",
    clearance: "PUBLIC / FICTIONAL CUSTODY",
    summary: "A preservation memo records the transfer of a CT launch-call screenshot containing seventeen rocket emojis to the fictional trenches relic collection.",
    finding: "MESSAGE PRESERVED / CATALYST NOT FOUND.",
    stamp: "DO NOT REMOVE FROM PINNED MESSAGES",
    sections: [
      { heading: "CUSTODY RECORD", paragraphs: ["The post is preserved as a fictional specimen from the age of imminent CA announcements. Its sender, KOL and token do not exist in this archive."] },
      { heading: "CURATORIAL NOTE", paragraphs: ["The emoji count is part of the joke. No actual market activity, person or community is being described."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The exhibit remains available for public viewing. Please do not tap the glass."] },
    ],
    relatedLabel: "VISIT THE BAGHOLDER REHABILITATION MUSEUM",
    relatedHref: "/museum",
    keywords: ["museum", "Crypto Twitter", "CT", "pump.fun", "rocket", "CA"],
  },
  {
    slug: "market-declined-to-comment",
    accession: "DDA-010",
    title: "THE CT TIMELINE DECLINED TO COMMENT",
    category: "PUBLIC NOTICES",
    department: "KOL SURVEILLANCE / OFFICE OF DELETED CALLS",
    clearance: "PUBLIC / SATIRICAL STATEMENT",
    summary: "A one-line fictional CT statement confirms that the timeline has received the KOL thesis and is under no obligation to validate the next 100x target.",
    finding: "RESEARCH RECEIVED / OUTCOME INDEPENDENT.",
    stamp: "NO FURTHER QUESTIONS AT THIS TIME",
    sections: [
      { heading: "STATEMENT", paragraphs: ["The Department confirms that the CA, quote-posts and green-candle screenshots have been received. The CT timeline has declined to confirm the thesis."] },
      { heading: "CLARIFICATION", paragraphs: ["This notice is a satirical phrase, not a market event or statement from an exchange, issuer or company."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The file is closed without a forecast."] },
    ],
    relatedLabel: "REOPEN THE DYOR AUDIT",
    relatedHref: "/audit",
    keywords: ["market", "research", "statement", "press", "notice"],
  },
  {
    slug: "liquidity-certificate-context",
    accession: "DDA-011",
    title: "POST-GRADUATION LIQUIDITY CERTIFICATE / CONTEXT REQUIRED",
    category: "TECHNICAL APPENDICES",
    department: "WHALE & WALLET INVESTIGATION / POST-GRADUATION POOL REVIEW",
    clearance: "PUBLIC / FICTIONAL EXPLANATORY NOTE",
    summary: "A fictional certificate is reviewed and found insufficient to establish post-graduation pool depth, deployer permissions, wallet concentration or actual exit capacity.",
    finding: "CERTIFICATE PRESENT / DUE DILIGENCE STILL REQUIRED.",
    stamp: "A BADGE IS NOT A THREAT MODEL",
    sections: [
      { heading: "DOCUMENT REVIEW", paragraphs: ["The fictional certificate declares that liquidity has been locked. It does not specify the complete terms, exceptions, pool depth or wallets relevant to post-graduation exit capacity."] },
      { heading: "LIMITATIONS", paragraphs: ["A badge or screenshot alone cannot establish the safety of a real asset or protocol. This archive does not inspect real contracts or token pools."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The exhibit is retained as satire and must not be used as evidence about any real project."] },
    ],
    relatedLabel: "INSPECT THE FICTIONAL UTILITY CLAIMS",
    relatedHref: "/utility-inspector",
    keywords: ["liquidity", "certificate", "security", "contract", "permissions"],
  },
  {
    slug: "phase-two-appeal",
    accession: "DDA-012",
    title: "APPEAL TO REOPEN THE CTO ROADMAP PHASE",
    category: "MEMBERSHIP FILES",
    department: "CTO EMERGENCY OFFICE / TAKEOVER ROADMAP APPEALS",
    clearance: "PUBLIC / FICTIONAL APPEAL",
    summary: "An appeal requests that the community takeover roadmap reopen Phase Two because access review is still pending while Phase Three has already been announced on CT.",
    finding: "SEQUENCE OF EVENTS REFERRED BACK TO THE SEQUENCE OF EVENTS.",
    stamp: "PHASE 2.1 UNDER DISCUSSION",
    sections: [
      { heading: "APPEAL", paragraphs: ["The applicant requests a further review of the CTO handover window and the permissions required before the next community recovery milestone."] },
      { heading: "BOARD RESPONSE", paragraphs: ["The board has created a new takeover phase to review the previous handover phase. A date will be announced after the next pinned CTO update."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The appeal is accepted for entertainment purposes. The roadmap remains fictional."] },
    ],
    relatedLabel: "GENERATE ANOTHER CTO EMERGENCY OFFICE ROADMAP",
    relatedHref: "/roadmap-generator",
    keywords: ["phase two", "appeal", "roadmap", "timeline", "milestone"],
  },
  {
    slug: "the-curve-completed-the-thesis-did-not",
    accession: "DDA-013",
    title: "THE CURVE COMPLETED. THE THESIS DID NOT.",
    category: "INCIDENT REPORTS",
    department: "PUMP.FUN INTELLIGENCE / POST-GRADUATION REVIEW",
    clearance: "PUBLIC / FICTIONAL CASE STUDY",
    summary: "A fictional launch reached its bonding-curve milestone. The community treated the graduation screen as a final answer to every unanswered question.",
    finding: "MILESTONE CONFIRMED / DEMAND NOT CERTIFIED.",
    stamp: "GRADUATION IS NOT A GUARANTEE",
    sections: [
      { heading: "INCIDENT OVERVIEW", paragraphs: ["The fictional token completed its bonding curve and the group chat immediately declared the mission accomplished. The next review found that the celebration had not included a clear examination of holder distribution, post-graduation pool conditions or the original thesis.", "The file illustrates the difference between a launch mechanism reaching a milestone and a token establishing durable demand."] },
      { heading: "DEPARTMENTAL OBSERVATION", paragraphs: ["No real token, pool, transaction or launch is represented. The Department does not inspect Pump.fun launches or infer market conditions from this fictional record."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The graduation screenshot is archived as evidence of a celebration. It is not accepted as proof of product-market fit, safe liquidity or future price performance."] },
    ],
    relatedLabel: "OPEN THE PAPER MARKET SIMULATOR",
    relatedHref: "/simulator",
    keywords: ["pump.fun", "bonding curve", "graduation", "PumpSwap", "launch", "token"],
  },
  {
    slug: "the-cto-handover-file",
    accession: "DDA-014",
    title: "THE CTO HANDOVER FILE",
    category: "OFFICIAL MEMOS",
    department: "SOLANA TRENCHES / COMMUNITY TAKEOVER UNIT",
    clearance: "PUBLIC / FICTIONAL INTERNAL MEMO",
    summary: "A fictional community takeover replaced the deployer's posting schedule but did not automatically answer who controlled access, decisions or the next deliverable.",
    finding: "NEW ACCOUNT DETECTED / AUTHORITY TRANSFER NOT ESTABLISHED.",
    stamp: "THE BANNER IS NOT THE HANDOVER",
    sections: [
      { heading: "PURPOSE", paragraphs: ["This memo records the fictional moment when a deployer stops communicating and a new CTO account announces that the community is taking over. The new account inherits the ticker, the memes and a large number of unanswered questions."] },
      { heading: "ACCESS REVIEW", paragraphs: ["A credible handover requires clarity about responsibilities, permissions, custody and decision-making. A changed X bio, fresh banner or pinned thread does not by itself establish any of those things."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The takeover is filed as satire. No real team, project, wallet or X account is being described or monitored."] },
    ],
    relatedLabel: "APPLY TO THE SOLANA TRENCHES 99% CLUB",
    relatedHref: "/club",
    keywords: ["CTO", "community takeover", "deployer", "handover", "Solana", "X"],
  },
  {
    slug: "the-independent-kol-consensus",
    accession: "DDA-015",
    title: "THE INDEPENDENT KOL CONSENSUS",
    category: "PUBLIC NOTICES",
    department: "KOL SURVEILLANCE / SOURCE-VALIDATION DESK",
    clearance: "PUBLIC / FICTIONAL MEDIA REVIEW",
    summary: "Several fictional accounts publish the same CA, chart crop and catalyst while describing the result as independent research.",
    finding: "REPETITION DETECTED / CORROBORATION NOT ESTABLISHED.",
    stamp: "SAME SCREENSHOT. DIFFERENT BIOS.",
    sections: [
      { heading: "NOTICE", paragraphs: ["The Department records a fictional timeline event in which several KOL-style accounts post the same token address and the same cropped chart within a short period. Each account describes the call as an independent discovery."] },
      { heading: "SOURCE REVIEW", paragraphs: ["Repeated claims are not independent corroboration when they may share one original source. A screenshot, a verification badge or a large follower count does not establish the accuracy of the claim."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["This is a fictional satire case. No actual KOL, social account, token or market signal is tracked by the Department."] },
    ],
    relatedLabel: "READ THE TRENCHES DESK / DAILY CT BRIEFING",
    relatedHref: "/daily-office",
    keywords: ["KOL", "Crypto Twitter", "CT", "CA", "screenshot", "social proof"],
  },
  {
    slug: "the-wallet-graph-does-not-prove-ownership",
    accession: "DDA-016",
    title: "THE WALLET GRAPH DOES NOT PROVE OWNERSHIP",
    category: "INCIDENT REPORTS",
    department: "WHALE & WALLET INVESTIGATION / OBSERVATION & INFERENCE DESK",
    clearance: "PUBLIC / FICTIONAL ON-CHAIN CASE REVIEW",
    summary: "A fictional cluster of early buys and transfers was arranged into a wallet graph, then presented as proof of common ownership and coordinated intent without a verified attribution trail.",
    finding: "TRANSACTION LINKS OBSERVED / COMMON OWNERSHIP NOT ESTABLISHED.",
    stamp: "AN ARROW IS NOT AN OWNER.",
    sections: [
      { heading: "OBSERVED MATERIAL", paragraphs: ["The fictional exhibit contains a set of early transfers, several fresh addresses and a graph connecting movements that occurred near the same launch window. The diagram records the relationships its author chose to draw; it does not authenticate who controlled each address.", "No real wallet, token, address, transaction or market participant is represented or monitored by this Department."] },
      { heading: "OBSERVATION / INFERENCE REVIEW", paragraphs: ["Transaction proximity can justify a question about funding relationships. It cannot, without additional evidence, establish common ownership, coordinated control or motive. Address labels supplied by an anonymous chart-maker remain claims, not verified identities.", "The case file separates directly depicted transfers, inferred clusters and confirmed ownership. The final category remains unknown unless an independent attribution record supports it."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The wallet graph is preserved as a fictional example of overconfident on-chain storytelling. The arrows remain in the exhibit; the unsupported ownership verdict has been withdrawn."] },
    ],
    relatedLabel: "VIEW THE BUNDLE FAMILY PORTRAIT",
    relatedHref: "/museum/exhibits/the-bundle-family-portrait",
    keywords: ["wallet graph", "bundle", "sniper", "ownership", "wallet cluster", "transactions", "on-chain", "observation", "inference"],
  },

  {
    slug: "the-bridge-receipt-that-arrived-late",
    accession: "DDA-017",
    title: "INCIDENT REPORT: THE BRIDGE RECEIPT THAT ARRIVED LATE",
    category: "INCIDENT REPORTS",
    department: "INTERCHAIN TRANSFER OFFICE / MESSAGE DELIVERY REVIEW",
    clearance: "PUBLIC / SIMULATED CROSS-CHAIN INCIDENT",
    summary: "A fictional transfer appears complete on its source network while the destination-side record remains pending. The applicant treats one confirmation screen as proof that the entire journey has finished.",
    finding: "SOURCE EVENT LOCATED / DESTINATION SETTLEMENT NOT ESTABLISHED.",
    stamp: "ONE RECEIPT / TWO NETWORKS / NO FINAL ANSWER",
    sections: [
      { heading: "INCIDENT OVERVIEW", paragraphs: ["The applicant submitted a source-chain confirmation, a bridge status panel and a screenshot of the destination wallet. The source event was marked complete; the destination record had not yet been reconciled.", "The case illustrates the difference between a transaction recorded on one network and an asset being available on another. A completed source step does not, by itself, prove destination delivery."] },
      { heading: "EVIDENCE CHAIN", paragraphs: ["A complete cross-chain review would identify the source transaction, bridge or messaging route, destination transaction, required confirmations, applicable delays and any failure or refund procedure.", "This fictional file contains no transaction hash, bridge contract, wallet, network status or live transfer. The Department has not queried a bridge or inspected an actual asset."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The receipt is accepted as evidence that a fictional source-side event was reported. Destination settlement remains unverified, and the case is not certified as a successful transfer."] },
    ],
    relatedLabel: "REVIEW THE FICTIONAL CLAIMS AND THEIR EVIDENCE",
    relatedHref: "/audit",
    keywords: ["bridge", "cross-chain", "interchain", "source chain", "destination chain", "transfer receipt", "settlement"],
  },
  {
    slug: "airdrop-snapshot-eligibility-appeal",
    accession: "DDA-018",
    title: "THE AIRDROP SNAPSHOT ELIGIBILITY APPEAL",
    category: "MEMBERSHIP FILES",
    department: "CROSS-CHAIN MEMBERSHIP / SNAPSHOT APPEALS",
    clearance: "PUBLIC / FICTIONAL APPEAL",
    summary: "A fictional applicant claims that activity was spread across several networks, but the eligibility notice appears to recognise only one snapshot and one wallet view.",
    finding: "ELIGIBILITY CLAIM RECEIVED / SNAPSHOT RULES NOT PRODUCED.",
    stamp: "POINTS REMEMBERED / CRITERIA NOT LOCATED",
    sections: [
      { heading: "APPLICATION", paragraphs: ["The applicant submits a portfolio of activity: a wallet on one network, a bridged asset on another, a governance vote elsewhere and a collection of screenshots labelled 'proof of contribution'. The appeal asks why none of this appears in the fictional eligibility result.", "The Department notes that activity across networks is not automatically combined into a single eligibility record."] },
      { heading: "CRITERIA REVIEW", paragraphs: ["A reproducible snapshot policy would define supported networks, qualifying actions, wallet attribution, snapshot time, exclusions, Sybil controls, appeal windows and the method used to reconcile bridged or wrapped assets.", "No real airdrop, wallet, snapshot, points programme or distribution is represented or checked by this file."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The appeal is retained as a fictional membership dispute. The applicant's effort is acknowledged; eligibility is not granted, denied or inferred by this archive."] },
    ],
    relatedLabel: "VISIT THE FICTIONAL COMMUNITY MEMBERSHIP OFFICE",
    relatedHref: "/club",
    keywords: ["airdrop", "snapshot", "eligibility", "cross-chain", "wallet activity", "points", "appeal", "membership"],
  },
  {
    slug: "appendix-c-multichain-unlock-calendar",
    accession: "DDA-019",
    title: "APPENDIX C: THE MULTI-CHAIN UNLOCK CALENDAR",
    category: "TECHNICAL APPENDICES",
    department: "TOKEN DOSSIER CONTROL / DISTRIBUTION AND VESTING REVIEW",
    clearance: "PUBLIC / FICTIONAL TECHNICAL APPENDIX",
    summary: "A fictional token schedule divides vesting events across several networks, while its supply table presents every allocation as though all balances belonged to one simple ledger.",
    finding: "UNLOCK DATES LISTED / CIRCULATING-SUPPLY MODEL NOT RECONCILED.",
    stamp: "VESTING IS NOT A SINGLE-TIMEZONE EVENT",
    sections: [
      { heading: "SCHEDULE MODEL", paragraphs: ["The fictional appendix contains multiple vesting cliffs, linear releases and bridge movements. Each schedule has a different start condition, timestamp convention and destination network.", "The table looks precise until the reviewer asks whether a bridged representation, a wrapped balance and the original locked allocation are being counted more than once."] },
      { heading: "RECONCILIATION REQUIREMENTS", paragraphs: ["A meaningful disclosure would distinguish total supply, circulating supply, locked balances, vested but unclaimed amounts, bridge escrow, wrapped representations, treasury control and the exact release rules for each network.", "No real token, vesting contract, unlock event, supply figure or market impact is represented or calculated here."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The appendix is filed as a warning against treating a multi-chain unlock calendar as a verified supply audit. Every number and network in the fictional example is illustrative."] },
    ],
    relatedLabel: "GENERATE A FICTIONAL PUBLIC TOKEN SPECIFICATION",
    relatedHref: "/whitepaper-factory",
    keywords: ["multi-chain", "cross-chain", "unlock", "vesting", "supply", "circulating supply", "bridge escrow", "tokenomics"],
  },
  {
    slug: "circular-quorum-migration",
    accession: "DDA-020",
    title: "CIRCULAR 04: THE GOVERNANCE QUORUM CROSSED CHAINS",
    category: "OFFICIAL MEMOS",
    department: "GOVERNANCE COORDINATION / INTERCHAIN VOTING DESK",
    clearance: "PUBLIC / FICTIONAL POLICY CIRCULAR",
    summary: "A fictional proposal counts votes from separate networks under one headline, although the snapshot, voting weight and quorum rules were never aligned.",
    finding: "VOTES DISPLAYED / COMMON QUORUM STANDARD NOT ESTABLISHED.",
    stamp: "DECENTRALIZED UNTIL THE COUNTING BEGINS",
    sections: [
      { heading: "PURPOSE", paragraphs: ["This circular addresses a fictional governance proposal whose supporters report participation on several networks. The public summary adds the displayed totals together and labels the result a single community mandate.", "The Department asks which rules make those ballots comparable before treating a combined number as a quorum."] },
      { heading: "CONTROL REVIEW", paragraphs: ["A defensible cross-chain process would specify eligible identities or voting units, snapshot timing, network inclusion, delegation, duplicate-wallet handling, bridge representation, quorum thresholds, finality assumptions and dispute resolution.", "This memo describes no real DAO, vote, governance contract, token holder or protocol decision."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The circular is filed for procedural review. Separate vote totals remain separate until a documented and reproducible aggregation rule says otherwise."] },
    ],
    relatedLabel: "REVIEW THE PUBLIC SPECIFICATION AND GOVERNANCE RULES",
    relatedHref: "/whitepaper-factory",
    keywords: ["governance", "quorum", "cross-chain voting", "multichain", "snapshot", "delegation", "DAO", "interchain"],
  },
];

export function getArchiveRecord(slug: string): ArchiveRecord | undefined {
  return archiveRecords.find((record) => record.slug === slug);
}

export function filterArchiveRecords(query: string, category: string): ArchiveRecord[] {
  const normalized = query.trim().toLowerCase();
  return archiveRecords.filter((record) => {
    const categoryMatch = category === "ALL FILES" || record.category === category;
    const searchableSections = record.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
    ]);
    const haystack = [
      record.title,
      record.category,
      record.department,
      record.clearance,
      record.summary,
      record.finding,
      record.stamp,
      ...searchableSections,
      ...record.keywords,
    ].join(" ").toLowerCase();
    return categoryMatch && (!normalized || haystack.includes(normalized));
  });
}
