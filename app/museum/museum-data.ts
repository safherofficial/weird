export type MuseumCategory = "DOCUMENTS" | "DIGITAL RELICS" | "FIELD SPECIMENS" | "INSTITUTIONAL OBJECTS";

export type MuseumExhibit = {
  slug: string;
  accession: string;
  title: string;
  category: MuseumCategory;
  era: string;
  condition: string;
  emotionalWeight: string;
  description: string;
  curatorNote: string;
  plaque: string;
  keywords: string[];
};

export const museumCategories: Array<"ALL" | MuseumCategory> = [
  "ALL",
  "DOCUMENTS",
  "DIGITAL RELICS",
  "FIELD SPECIMENS",
  "INSTITUTIONAL OBJECTS",
];

export const exhibits: MuseumExhibit[] = [
  {
    slug: "the-seventeenth-rocket",
    accession: "BHM-001",
    title: "THE SEVENTEENTH ROCKET",
    category: "DIGITAL RELICS",
    era: "THE AGE OF IMMINENT ANNOUNCEMENTS",
    condition: "PINNED / NEVER CONFIRMED",
    emotionalWeight: "SEVERE ANTICIPATION",
    description: "A single chat message containing seventeen rocket emojis, three exclamation marks and no actual information. Believed to have triggered several unnecessary market orders.",
    curatorNote: "Observe the punctuation. The sender has not been online since the announcement, but the message remains pinned as a historical source of confidence.",
    plaque: "SOON IS A STATE OF MIND.",
    keywords: ["telegram", "rocket", "announcement", "community", "soon"],
  },
  {
    slug: "the-roadmap-without-a-date",
    accession: "BHM-002",
    title: "THE ROADMAP WITHOUT A DATE",
    category: "DOCUMENTS",
    era: "THE PERPETUAL DEVELOPMENT PERIOD",
    condition: "DRAFT / VERSION FINAL-FINAL-7",
    emotionalWeight: "CHRONIC HOPE",
    description: "A beautifully aligned sequence of milestones. Every phase depends on the previous phase, and every estimated arrival is listed as 'soon'.",
    curatorNote: "The roadmap has been revised twelve times. Its final destination is an additional roadmap explaining how the current roadmap will be finalized.",
    plaque: "ALL MILESTONES ARE SUBJECT TO FURTHER MILESTONES.",
    keywords: ["roadmap", "milestone", "soon", "deadline", "document"],
  },
  {
    slug: "the-screenshot-of-a-screenshot",
    accession: "BHM-003",
    title: "THE SCREENSHOT OF A SCREENSHOT",
    category: "DOCUMENTS",
    era: "THE AGE OF CIRCULAR EVIDENCE",
    condition: "LOW RESOLUTION / SOURCE UNKNOWN",
    emotionalWeight: "UNWARRANTED CERTAINTY",
    description: "A compressed image of a cropped image showing a chart, a green arrow and the words 'insider knows'. No original source has been identified.",
    curatorNote: "The exhibit is frequently cited as proof of an event that has not yet happened. The Department recommends viewing it from a safe distance.",
    plaque: "SOURCE: TRUST ME BRO.",
    keywords: ["screenshot", "chart", "rumour", "evidence", "insider"],
  },
  {
    slug: "the-liquidity-puddle",
    accession: "BHM-004",
    title: "THE LIQUIDITY PUDDLE",
    category: "FIELD SPECIMENS",
    era: "THE THIN-BOOK PERIOD",
    condition: "SHALLOW / EASILY DISTURBED",
    emotionalWeight: "EXIT ANXIETY",
    description: "A laboratory rendering of a liquidity pool so shallow that one moderately sized order would require a public consultation.",
    curatorNote: "Please do not tap the glass. The depth may change dramatically, and the pool's caretaker has requested that we stop using the word 'exit'.",
    plaque: "DEPTH: SUBJECT TO COMMUNITY SENTIMENT.",
    keywords: ["liquidity", "pool", "slippage", "exit", "market"],
  },
  {
    slug: "the-confidential-partnership",
    accession: "BHM-005",
    title: "THE CONFIDENTIAL PARTNERSHIP",
    category: "DOCUMENTS",
    era: "THE STRATEGIC CONVERSATION AGE",
    condition: "REDACTED / COUNTERPARTY NOT LOCATED",
    emotionalWeight: "SPECULATIVE VALIDATION",
    description: "A partnership announcement consisting of two black rectangles, the phrase 'major players' and a request to wait for further details.",
    curatorNote: "The agreement has been described as imminent, strategic and ecosystem-defining. The museum has not been able to establish which ecosystem is involved.",
    plaque: "THE LOGO WILL BE REVEALED IN A FUTURE PHASE.",
    keywords: ["partnership", "mou", "logo", "announcement", "confidential"],
  },
  {
    slug: "the-vesting-cliff",
    accession: "BHM-006",
    title: "THE VESTING CLIFF",
    category: "INSTITUTIONAL OBJECTS",
    era: "THE TOKENOMICS DISCOVERY PERIOD",
    condition: "SCHEDULED / SUDDENLY RELEVANT",
    emotionalWeight: "CALENDAR-BASED DREAD",
    description: "A diagram showing a long, calm vesting line followed by a vertical event that several holders only noticed after reading the footnotes.",
    curatorNote: "Visitors often ask whether the cliff is a metaphor. The Department confirms that it is a chart, and the chart has been available for some time.",
    plaque: "THE UNLOCK WAS ALWAYS IN THE DOCUMENT.",
    keywords: ["vesting", "unlock", "tokenomics", "cliff", "supply"],
  },
  {
    slug: "the-founder-pfp-upgrade",
    accession: "BHM-007",
    title: "THE FOUNDER PFP UPGRADE",
    category: "DIGITAL RELICS",
    era: "THE BRAND EVOLUTION PERIOD",
    condition: "UPDATED / ROADMAP UNCHANGED",
    emotionalWeight: "NARRATIVE REASSURANCE",
    description: "A new profile picture introduced during a period of unusual silence. The artwork is brighter, the background is different and the product status remains under review.",
    curatorNote: "The update was described as the beginning of a new era. No further information about the era has been supplied.",
    plaque: "NEW PICTURE. SAME PHASE TWO.",
    keywords: ["founder", "profile", "pfp", "brand", "update"],
  },
  {
    slug: "the-dao-voting-button",
    accession: "BHM-008",
    title: "THE DAO VOTING BUTTON",
    category: "INSTITUTIONAL OBJECTS",
    era: "THE GOVERNANCE THEATRE PERIOD",
    condition: "FUNCTIONAL / OUTCOME PRESELECTED",
    emotionalWeight: "PARTICIPATORY OPTIMISM",
    description: "A large green button labelled 'COMMUNITY GOVERNANCE'. Pressing it opens a page explaining that the final decision will be made by the core team.",
    curatorNote: "The button has been pressed 4,000 times. Its operational purpose is currently being evaluated by a committee appointed by the button.",
    plaque: "DECENTRALIZED UNTIL FURTHER NOTICE.",
    keywords: ["dao", "governance", "vote", "community", "button"],
  },
  {
    slug: "the-audited-whitepaper",
    accession: "BHM-009",
    title: "THE AUDITED WHITEPAPER",
    category: "DOCUMENTS",
    era: "THE TECHNICAL-LOOKING DOCUMENT AGE",
    condition: "NINETY PAGES / ONE SENTENCE OF PRODUCT",
    emotionalWeight: "ACADEMIC INTIMIDATION",
    description: "A comprehensive technical document with detailed diagrams, a glossary of new terminology and a product description hidden in the conclusion.",
    curatorNote: "The appendix contains an appendix explaining why the first appendix is not yet final. A working demo has not been included.",
    plaque: "PAGE COUNT IS NOT PRODUCT-MARKET FIT.",
    keywords: ["whitepaper", "appendix", "technical", "abstract", "product"],
  },
  {
    slug: "the-last-online-moderator",
    accession: "BHM-010",
    title: "THE LAST ONLINE MODERATOR",
    category: "FIELD SPECIMENS",
    era: "THE COMMUNITY SUPPORT ERA",
    condition: "LAST SEEN / 03:17 UTC",
    emotionalWeight: "DELEGATED CONVICTION",
    description: "A preserved status indicator showing a moderator online at 03:17 while the community asks whether the project is still alive.",
    curatorNote: "The moderator's final message reads 'team is cooking'. The kitchen has not been located, but the message remains in active circulation.",
    plaque: "PLEASE BE PATIENT. WE ARE ALSO WAITING.",
    keywords: ["moderator", "telegram", "team", "community", "online"],
  },
  {
    slug: "the-locked-liquidity-certificate",
    accession: "BHM-011",
    title: "THE LOCKED LIQUIDITY CERTIFICATE",
    category: "INSTITUTIONAL OBJECTS",
    era: "THE CERTIFICATE OF CONFIDENCE PERIOD",
    condition: "CERTIFICATE PRESENT / CONTEXT REQUIRED",
    emotionalWeight: "BORROWED SECURITY",
    description: "A ceremonial certificate declaring that liquidity has been locked. The document does not specify every relevant control, exception or associated wallet.",
    curatorNote: "The certificate is not a substitute for reviewing contract permissions, wallet concentration or the actual lock terms. The museum has placed a large explanatory label beside it.",
    plaque: "A BADGE IS NOT A THREAT MODEL.",
    keywords: ["liquidity", "locked", "certificate", "wallet", "security"],
  },
  {
    slug: "the-number-go-up-switch",
    accession: "BHM-012",
    title: "THE NUMBER-GO-UP SWITCH",
    category: "DIGITAL RELICS",
    era: "THE UNIVERSAL UTILITY AGE",
    condition: "DECORATIVE / NOT CONNECTED",
    emotionalWeight: "PERMANENT CONVICTION",
    description: "A fictional switch mounted beneath a presentation slide. It is labelled 'UTILITY ACTIVATION' but has no cable, power source or documented function.",
    curatorNote: "The switch is expected to become operational in Phase 4. Phase 4 has been moved to a future phase pending alignment with the ecosystem.",
    plaque: "THE ONLY THING IT POWERS IS THE NARRATIVE.",
    keywords: ["utility", "token", "switch", "phase", "number"],
  },
  {
    slug: "the-bonding-curve-progress-bar",
    accession: "BHM-013",
    title: "THE BONDING CURVE PROGRESS BAR",
    category: "DIGITAL RELICS",
    era: "THE REFRESH-UNTIL-GRADUATION PERIOD",
    condition: "99% COMPLETE / CONTEXT NOT INCLUDED",
    emotionalWeight: "PREMATURE CELEBRATION",
    description: "A preserved progress bar from a fictional launch. It was refreshed so frequently that the visitor began to believe the final percentage point was a personal responsibility.",
    curatorNote: "Graduation is a protocol milestone, not a certificate of durable demand, healthy distribution or a guaranteed exit. The Department has placed this label directly over the confetti button.",
    plaque: "THE BAR FILLED. THE QUESTIONS DID NOT.",
    keywords: ["pump.fun", "bonding curve", "graduation", "progress", "launch"],
  },
  {
    slug: "the-bundle-family-portrait",
    accession: "BHM-014",
    title: "THE BUNDLE FAMILY PORTRAIT",
    category: "FIELD SPECIMENS",
    era: "THE ORGANIC DEMAND DISCUSSION",
    condition: "WALLETS LABELLED / OWNERSHIP UNKNOWN",
    emotionalWeight: "SUSPICIOUS TOGETHERNESS",
    description: "A fictional wallet diagram showing several early buyers connected by arrows, circles and a very confident headline about organic community momentum.",
    curatorNote: "The diagram does not establish common ownership, intent or coordination. It is retained as an example of how quickly a chart can become a family tree.",
    plaque: "A CLUSTER IS A QUESTION, NOT A VERDICT.",
    keywords: ["bundle", "sniper", "wallet", "launch", "pump.fun"],
  },
  {
    slug: "the-cto-handover-banner",
    accession: "BHM-015",
    title: "THE CTO HANDOVER BANNER",
    category: "DIGITAL RELICS",
    era: "THE COMMUNITY TAKEOVER PERIOD",
    condition: "NEW HANDLE / OLD UNANSWERED QUESTIONS",
    emotionalWeight: "DELEGATED HOPE",
    description: "A fictional X banner announcing that the community is taking over after the deployer disappears. The artwork is new; the access checklist remains blank.",
    curatorNote: "A community takeover may create a new chapter, but a new bio is not a transfer of authority, wallet access or operational responsibility.",
    plaque: "NEW BANNER. WHO HAS THE KEYS?",
    keywords: ["CTO", "community takeover", "deployer", "X", "handover"],
  },
];

export function getExhibit(slug: string): MuseumExhibit | undefined {
  return exhibits.find((exhibit) => exhibit.slug === slug);
}

export function searchExhibits(query: string, category: string): MuseumExhibit[] {
  const normalized = query.trim().toLowerCase();
  return exhibits.filter((exhibit) => {
    const categoryMatch = category === "ALL" || exhibit.category === category;
    const searchable = [
      exhibit.title,
      exhibit.category,
      exhibit.description,
      exhibit.curatorNote,
      exhibit.plaque,
      ...exhibit.keywords,
    ].join(" ").toLowerCase();
    return categoryMatch && (!normalized || searchable.includes(normalized));
  });
}
