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
    title: "THE ENTRY WAS IMPECCABLE",
    category: "INCIDENT REPORTS",
    department: "DYOR AUDIT / OFFICE OF SELF-REPORTED RESEARCH",
    clearance: "PUBLIC / FICTIONAL CASE STUDY",
    summary: "A fictional post-entry review in which the research checklist was complete, the chart was confident and the market declined to participate.",
    finding: "RESEARCH ACKNOWLEDGED / OUTCOME NOT GUARANTEED.",
    stamp: "THESIS FILED / PRICE UNAVAILABLE",
    sections: [
      { heading: "INCIDENT OVERVIEW", paragraphs: ["The applicant reported a complete research process, including a whitepaper review, tokenomics inspection and multiple visits to the community chat.", "The fictional case demonstrates the Department's central principle: completing a checklist does not remove uncertainty from a market."] },
      { heading: "DEPARTMENTAL OBSERVATION", paragraphs: ["No actual transaction, asset, investor or market event is represented in this file. The record is a satirical illustration of overconfidence after research."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The Department acknowledges the effort. It declines to certify the entry as impeccable, inevitable or immune to the market."] },
    ],
    relatedLabel: "OPEN THE DYOR AUDIT",
    relatedHref: "/audit",
    keywords: ["audit", "research", "entry", "market", "case file", "due diligence"],
  },
  {
    slug: "liquidity-puddle-incident",
    accession: "DDA-002",
    title: "THE LIQUIDITY PUDDLE INCIDENT",
    category: "INCIDENT REPORTS",
    department: "BAGHOLDER SIMULATOR / PAPER MARKET RESPONSE",
    clearance: "PUBLIC / SIMULATED INCIDENT",
    summary: "A simulated market bulletin described liquidity depth as a puddle. The incident triggered a departmental review of imaginary exit conditions.",
    finding: "EXIT CAPACITY CLASSIFIED AS WEATHER-DEPENDENT.",
    stamp: "NO ACTUAL LIQUIDITY WAS DISTURBED",
    sections: [
      { heading: "INCIDENT OVERVIEW", paragraphs: ["The fictional HYPE-404 paper market displayed a shallow liquidity profile. A single moderately sized imaginary order would have required a public consultation.", "The event belongs to the deterministic Bagholder Simulator sequence. It is not based on a real token or market feed."] },
      { heading: "RESPONSE", paragraphs: ["Participants were offered the opportunity to hold, trim, average down or consult Telegram. The puddle remained a puddle throughout the exercise."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The Department reminds visitors that simulated paper values are not market data, financial outcomes or execution estimates."] },
    ],
    relatedLabel: "OPEN THE BAGHOLDER SIMULATOR",
    relatedHref: "/simulator",
    keywords: ["liquidity", "puddle", "simulator", "slippage", "paper market"],
  },
  {
    slug: "directive-on-the-word-soon",
    accession: "DDA-003",
    title: "DIRECTIVE ON THE WORD 'SOON'",
    category: "OFFICIAL MEMOS",
    department: "ROADMAP GENERATOR / OFFICE OF FUTURE DELIVERABLES",
    clearance: "PUBLIC / INTERNAL HUMOUR",
    summary: "A departmental memo requests that all future delivery estimates define whether 'soon' means a date, a quarter or an entirely new phase.",
    finding: "TEMPORAL AMBIGUITY REMAINS THE LEADING DELIVERY METHOD.",
    stamp: "ETA: SUBJECT TO FURTHER REVIEW",
    sections: [
      { heading: "PURPOSE", paragraphs: ["This memo establishes a satirical classification for milestones whose estimated arrival is listed as 'soon', 'very soon' or 'after the next announcement'."] },
      { heading: "RECOMMENDED FORMATTING", paragraphs: ["A real milestone should identify a deliverable, an accountable owner, dependencies and an exit criterion. This fictional Department memo does not establish a real project schedule."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The word 'soon' remains admissible for parody. It is not recognized as a calendar date."] },
    ],
    relatedLabel: "GENERATE A FICTIONAL ROADMAP",
    relatedHref: "/roadmap-generator",
    keywords: ["soon", "roadmap", "milestone", "deadline", "memo"],
  },
  {
    slug: "partnership-pre-announcement",
    accession: "DDA-004",
    title: "NOTICE OF A PRE-ANNOUNCEMENT",
    category: "PUBLIC NOTICES",
    department: "OFFICE OF HYPOTHETICAL PARTNERSHIPS",
    clearance: "PUBLIC / FICTITIOUS NOTICE",
    summary: "A notice records that a major announcement may be announced following a strategic discussion about a possible future conversation.",
    finding: "COUNTERPARTY NOT LOCATED / EXCITEMENT CONFIRMED.",
    stamp: "LOGO WALL UNDER CONSTRUCTION",
    sections: [
      { heading: "NOTICE", paragraphs: ["The Department has received a fictional notice of a possible partnership pre-announcement. No counterparty, scope, agreement or deliverable is identified."] },
      { heading: "EVIDENCE REVIEW", paragraphs: ["A follow, an emoji, a conference photograph or a sentence containing 'strategic alignment' is not proof of a commercial partnership."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The notice is filed as a satirical exhibit. It should not be interpreted as a statement about any real organization."] },
    ],
    relatedLabel: "VISIT THE UTILITY INSPECTOR",
    relatedHref: "/utility-inspector",
    keywords: ["partnership", "announcement", "mou", "logo", "notice"],
  },
  {
    slug: "appendix-m-technical-detail",
    accession: "DDA-005",
    title: "APPENDIX M: TECHNICAL DETAIL",
    category: "TECHNICAL APPENDICES",
    department: "WHITEPAPER FACTORY / DOCUMENT CONTROL",
    clearance: "PUBLIC / FICTIONAL APPENDIX",
    summary: "A technical-looking appendix records the architecture as proprietary, the implementation as pending and the explanation as available in Appendix N.",
    finding: "DOCUMENTATION DENSITY EXCEEDS PRODUCT CLARITY.",
    stamp: "PLEASE REFER TO THE NEXT APPENDIX",
    sections: [
      { heading: "ABSTRACT", paragraphs: ["This appendix describes a fictional modular, omnichain, AI-native system whose interfaces will be described in a later appendix."] },
      { heading: "IMPLEMENTATION STATUS", paragraphs: ["No code, contract, protocol or architecture has been audited or verified by this record. Terminology is generated solely for satire."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The appendix is complete. The product remains outside the scope of the archive."] },
    ],
    relatedLabel: "OPEN THE WHITEPAPER FACTORY",
    relatedHref: "/whitepaper-factory",
    keywords: ["whitepaper", "appendix", "architecture", "technical", "document"],
  },
  {
    slug: "dao-button-outcome",
    accession: "DDA-006",
    title: "THE DAO BUTTON OUTCOME",
    category: "INCIDENT REPORTS",
    department: "OFFICE OF DECENTRALIZED BUTTONS",
    clearance: "PUBLIC / FICTIONAL OBSERVATION",
    summary: "A fictional governance button received thousands of imaginary presses before informing participants that the final decision had already been made.",
    finding: "PARTICIPATION RECORDED / AUTHORITY UNCHANGED.",
    stamp: "DECENTRALIZED UNTIL FURTHER NOTICE",
    sections: [
      { heading: "INCIDENT OVERVIEW", paragraphs: ["The button labelled COMMUNITY GOVERNANCE opened a page explaining that final decisions would be made by the core team."] },
      { heading: "COMMITTEE RESPONSE", paragraphs: ["A committee appointed by the button has been asked to review the button's governance framework. The button has abstained."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["This is a fictional satire record, not an allegation about a real DAO, protocol or governance process."] },
    ],
    relatedLabel: "OPEN THE 99% CLUB",
    relatedHref: "/club",
    keywords: ["dao", "governance", "button", "voting", "community"],
  },
  {
    slug: "membership-privileges-denied",
    accession: "DDA-007",
    title: "MEMBERSHIP PRIVILEGES DENIED",
    category: "MEMBERSHIP FILES",
    department: "THE 99% CLUB / MEMBERSHIP OFFICE",
    clearance: "PUBLIC / NO BENEFITS",
    summary: "A membership application was approved, a card was printed and the benefits department confirmed that no benefits had been requested or provided.",
    finding: "MEMBERSHIP GRANTED / EXPECTATIONS MANAGED.",
    stamp: "CARD VALID / PERKS INVALID",
    sections: [
      { heading: "APPLICATION", paragraphs: ["The fictional applicant completed the five-question membership interview and received a deterministic member number."] },
      { heading: "BENEFITS REVIEW", paragraphs: ["The Club provides no token, account, transfer value, financial product, discounts or real-world membership status."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The card is approved for entertainment purposes and may be shared as a fictional case file."] },
    ],
    relatedLabel: "APPLY TO THE 99% CLUB",
    relatedHref: "/club",
    keywords: ["99% club", "membership", "card", "benefits", "member"],
  },
  {
    slug: "daily-cope-methodology",
    accession: "DDA-008",
    title: "DAILY COPE METHODOLOGY",
    category: "TECHNICAL APPENDICES",
    department: "GLOBAL COPE INDEX / SYNTHETIC METRICS OFFICE",
    clearance: "PUBLIC / METHODOLOGY NOTE",
    summary: "A methodology notice confirms that the Global Cope Index is generated from a deterministic date seed and does not sample real visitors, traders or markets.",
    finding: "GLOBAL IN NAME / SYNTHETIC BY DESIGN.",
    stamp: "NO LIVE FEED / NO REAL SAMPLE",
    sections: [
      { heading: "CALCULATION", paragraphs: ["Daily dashboard dimensions are generated deterministically from the UTC issue date. The same date produces the same fictional reading for all visitors."] },
      { heading: "DATA SOURCES", paragraphs: ["No exchange feed, wallet, token, visitor poll, location signal, market data provider or external sentiment source is queried by the index."] },
      { heading: "LIMITATIONS", paragraphs: ["The index is a satirical display, not an indicator, market forecast, survey result or representation of global investor sentiment."] },
    ],
    relatedLabel: "OPEN THE GLOBAL COPE INDEX",
    relatedHref: "/cope-index",
    keywords: ["cope index", "methodology", "synthetic", "daily", "UTC", "data"],
  },
  {
    slug: "seventeenth-rocket-custody",
    accession: "DDA-009",
    title: "CUSTODY OF THE SEVENTEENTH ROCKET",
    category: "OFFICIAL MEMOS",
    department: "BAGHOLDER MUSEUM / COLLECTIONS OFFICE",
    clearance: "PUBLIC / FICTIONAL CUSTODY",
    summary: "A preservation memo records the transfer of a chat message containing seventeen rocket emojis to the fictional museum archive.",
    finding: "MESSAGE PRESERVED / CATALYST NOT FOUND.",
    stamp: "DO NOT REMOVE FROM PINNED MESSAGES",
    sections: [
      { heading: "CUSTODY RECORD", paragraphs: ["The message is preserved as a fictional specimen from the age of imminent announcements. Its sender and original project do not exist in this archive."] },
      { heading: "CURATORIAL NOTE", paragraphs: ["The emoji count is part of the joke. No actual market activity, person or community is being described."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The exhibit remains available for public viewing. Please do not tap the glass."] },
    ],
    relatedLabel: "VISIT THE BAGHOLDER MUSEUM",
    relatedHref: "/museum",
    keywords: ["museum", "rocket", "telegram", "emoji", "archive"],
  },
  {
    slug: "market-declined-to-comment",
    accession: "DDA-010",
    title: "THE MARKET DECLINED TO COMMENT",
    category: "PUBLIC NOTICES",
    department: "PUBLIC RELATIONS / OFFICE OF UNEXPECTED OUTCOMES",
    clearance: "PUBLIC / SATIRICAL STATEMENT",
    summary: "A one-line press statement confirms that the market has received the research report and is under no obligation to agree with it.",
    finding: "RESEARCH RECEIVED / OUTCOME INDEPENDENT.",
    stamp: "NO FURTHER QUESTIONS AT THIS TIME",
    sections: [
      { heading: "STATEMENT", paragraphs: ["The Department confirms that research efforts, conviction levels and chart annotations have been received. The market has declined to comment."] },
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
    title: "LIQUIDITY CERTIFICATE / CONTEXT REQUIRED",
    category: "TECHNICAL APPENDICES",
    department: "OFFICE OF DECORATIVE SECURITY BADGES",
    clearance: "PUBLIC / FICTIONAL EXPLANATORY NOTE",
    summary: "A certificate is reviewed and found to be insufficient evidence of contract permissions, wallet concentration, custody terms or actual liquidity.",
    finding: "CERTIFICATE PRESENT / DUE DILIGENCE STILL REQUIRED.",
    stamp: "A BADGE IS NOT A THREAT MODEL",
    sections: [
      { heading: "DOCUMENT REVIEW", paragraphs: ["The fictional certificate declares that liquidity has been locked. It does not specify the relevant control rights, exceptions, wallets or complete terms."] },
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
    title: "APPEAL TO REOPEN PHASE TWO",
    category: "MEMBERSHIP FILES",
    department: "ROADMAP APPEALS / TEMPORAL REVIEW BOARD",
    clearance: "PUBLIC / FICTIONAL APPEAL",
    summary: "An appeal requests that Phase Two be reopened because Phase Three depends on it, while Phase Two is waiting for Phase One to be finalized.",
    finding: "SEQUENCE OF EVENTS REFERRED BACK TO THE SEQUENCE OF EVENTS.",
    stamp: "PHASE 2.1 UNDER DISCUSSION",
    sections: [
      { heading: "APPEAL", paragraphs: ["The applicant requests a further review of the Phase Two delivery window and the dependencies attached to the next milestone."] },
      { heading: "BOARD RESPONSE", paragraphs: ["The board has created a new phase to review the phase that was created to review the previous phase. A date will be announced in a future phase."] },
      { heading: "FINAL DISPOSITION", paragraphs: ["The appeal is accepted for entertainment purposes. The roadmap remains fictional."] },
    ],
    relatedLabel: "GENERATE ANOTHER ROADMAP",
    relatedHref: "/roadmap-generator",
    keywords: ["phase two", "appeal", "roadmap", "timeline", "milestone"],
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
