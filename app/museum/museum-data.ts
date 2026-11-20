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
    title: "THE SEVENTEENTH CT ROCKET",
    category: "DIGITAL RELICS",
    era: "THE PUMP.FUN LAUNCH-THREAD PERIOD",
    condition: "PINNED / NEVER CONFIRMED",
    emotionalWeight: "SEVERE ANTICIPATION",
    description: "A fictional CT post containing seventeen rocket emojis, three exclamation marks and no actual information. It was quote-posted before anyone had opened the CA.",
    curatorNote: "Observe the punctuation. The original poster has deleted the call, but the screenshot remains pinned in three fictional Telegram groups as a source of confidence.",
    plaque: "SOON IS A STATE OF MIND.",
    keywords: ["crypto twitter", "CT", "pump.fun", "rocket", "CA", "telegram"],
  },
  {
    slug: "the-roadmap-without-a-date",
    accession: "BHM-002",
    title: "THE CTO ROADMAP WITHOUT A DATE",
    category: "DOCUMENTS",
    era: "THE PERPETUAL COMMUNITY TAKEOVER PERIOD",
    condition: "DRAFT / VERSION FINAL-FINAL-7",
    emotionalWeight: "CHRONIC HOPE",
    description: "A seven-phase CTO recovery plan in which each handover depends on the previous handover and every estimated arrival is listed as 'after the next update'.",
    curatorNote: "The takeover plan has been revised twelve times. Its final destination is a fresh pinned thread explaining when the deployer access checklist will be finalized.",
    plaque: "ALL MILESTONES ARE SUBJECT TO FURTHER MILESTONES.",
    keywords: ["CTO", "community takeover", "roadmap", "milestone", "soon"],
  },
  {
    slug: "the-screenshot-of-a-screenshot",
    accession: "BHM-003",
    title: "THE REPOSTED CA SCREENSHOT",
    category: "DOCUMENTS",
    era: "THE CT SCREENSHOT RELAY PERIOD",
    condition: "LOW RESOLUTION / SOURCE UNKNOWN",
    emotionalWeight: "UNWARRANTED CERTAINTY",
    description: "A compressed image of a cropped chart showing a fictional CA, a green arrow and the words 'insider knows'. Every account claims to have found the token first; no original source is identified.",
    curatorNote: "The screenshot has been reposted across CT as independent confirmation. The Department recommends locating the original post before believing the caption.",
    plaque: "SOURCE: TRUST ME BRO.",
    keywords: ["CA", "Crypto Twitter", "CT", "screenshot", "KOL", "rumour"],
  },
  {
    slug: "the-liquidity-puddle",
    accession: "BHM-004",
    title: "THE POST-GRADUATION LIQUIDITY PUDDLE",
    category: "FIELD SPECIMENS",
    era: "THE AFTER-GRADUATION POOL PERIOD",
    condition: "SHALLOW / EASILY DISTURBED",
    emotionalWeight: "EXIT ANXIETY",
    description: "A fictional post-graduation pool so shallow that one moderately sized order would require a public consultation and a new group-chat poll.",
    curatorNote: "Please do not tap the glass. Graduation changed the launch stage, not the need to understand pool depth, holder distribution and slippage.",
    plaque: "DEPTH: SUBJECT TO COMMUNITY SENTIMENT.",
    keywords: ["pump.fun", "graduation", "post-graduation", "pool", "slippage", "exit"],
  },
  {
    slug: "the-confidential-partnership",
    accession: "BHM-005",
    title: "THE CONFIDENTIAL KOL PARTNERSHIP",
    category: "DOCUMENTS",
    era: "THE KOL LOGO-WALL ERA",
    condition: "REDACTED / COUNTERPARTY NOT LOCATED",
    emotionalWeight: "SPECULATIVE VALIDATION",
    description: "A fictional partnership announcement consisting of two black rectangles, three KOL quote-posts, the phrase 'major players' and a request to wait for the actual agreement.",
    curatorNote: "The announcement has been described as independent validation. The museum has not located a signed scope, paid-promotion disclosure or original source.",
    plaque: "THE LOGO WILL BE REVEALED IN A FUTURE PHASE.",
    keywords: ["KOL", "Crypto Twitter", "partnership", "logo", "quote-post", "announcement"],
  },
  {
    slug: "the-vesting-cliff",
    accession: "BHM-006",
    title: "THE POST-LAUNCH VESTING CLIFF",
    category: "INSTITUTIONAL OBJECTS",
    era: "THE FIRST UNLOCK AFTER LAUNCH",
    condition: "SCHEDULED / SUDDENLY RELEVANT",
    emotionalWeight: "CALENDAR-BASED DREAD",
    description: "A fictional supply chart showing a calm vesting line followed by an unlock several late entrants only noticed after the KOL campaign and launch thread.",
    curatorNote: "The unlock was not hidden by the chain. It was hidden below the part of the thread containing the target price and rocket emojis.",
    plaque: "THE UNLOCK WAS ALWAYS IN THE DOCUMENT.",
    keywords: ["vesting", "unlock", "tokenomics", "cliff", "supply"],
  },
  {
    slug: "the-founder-pfp-upgrade",
    accession: "BHM-007",
    title: "THE DEPLOYER PFP REBRAND",
    category: "DIGITAL RELICS",
    era: "THE DEPLOYER SILENCE / NEW BANNER PERIOD",
    condition: "UPDATED / ROADMAP UNCHANGED",
    emotionalWeight: "NARRATIVE REASSURANCE",
    description: "A fresh deployer profile picture appears during a period of unusual silence. The artwork is brighter, the banner is new and nobody has answered the handover questions.",
    curatorNote: "The update was described as a new chapter. The Department has not located a working access map, an operator list or a change to the original launch status.",
    plaque: "NEW PICTURE. SAME PHASE TWO.",
    keywords: ["deployer", "PFP", "CTO", "banner", "community takeover", "update"],
  },
  {
    slug: "the-dao-voting-button",
    accession: "BHM-008",
    title: "THE COMMUNITY TAKEOVER VOTING BUTTON",
    category: "INSTITUTIONAL OBJECTS",
    era: "THE CTO POLL / GOVERNANCE THEATRE PERIOD",
    condition: "FUNCTIONAL / OUTCOME PRESELECTED",
    emotionalWeight: "PARTICIPATORY OPTIMISM",
    description: "A large green button labelled 'COMMUNITY TAKEOVER'. Pressing it opens a poll whose result is followed by a pinned message explaining that the new admins will decide what happens next.",
    curatorNote: "The poll received thousands of fictional votes. The Department is still waiting for a named operator, access permissions and a clear responsibility map.",
    plaque: "DECENTRALIZED UNTIL FURTHER NOTICE.",
    keywords: ["CTO", "community takeover", "vote", "poll", "Telegram", "button"],
  },
  {
    slug: "the-audited-whitepaper",
    accession: "BHM-009",
    title: "THE AUDITED-LOOKING TOKEN DOSSIER",
    category: "DOCUMENTS",
    era: "THE TOKEN-DOSSIER / TOKENOMICS THEATRE PERIOD",
    condition: "NINETY PAGES / ONE SENTENCE OF TOKEN PURPOSE",
    emotionalWeight: "ACADEMIC INTIMIDATION",
    description: "A fictional token dossier with detailed allocation graphics, a glossary of launch terminology and a single sentence explaining what the ticker is meant to do.",
    curatorNote: "The appendix contains an appendix explaining why the deployer and wallet-control details are not yet final. A verifiable product or utility demo has not been included.",
    plaque: "PAGE COUNT IS NOT TOKEN PURPOSE.",
    keywords: ["token dossier", "tokenomics", "whitepaper", "deployer", "utility", "appendix"],
  },
  {
    slug: "the-last-online-moderator",
    accession: "BHM-010",
    title: "THE LAST ONLINE TELEGRAM MODERATOR",
    category: "FIELD SPECIMENS",
    era: "THE DEPLOYER-SILENCE COMMUNITY SUPPORT ERA",
    condition: "LAST SEEN / 03:17 UTC",
    emotionalWeight: "DELEGATED CONVICTION",
    description: "A preserved Telegram status indicator showing a moderator online at 03:17 while CT asks whether the deployer is still building.",
    curatorNote: "The moderator's final message reads 'team is cooking'. The new CTO account has reposted it, but nobody can identify who controls the original deployer wallet.",
    plaque: "PLEASE BE PATIENT. WE ARE ALSO WAITING.",
    keywords: ["moderator", "telegram", "team", "community", "online"],
  },
  {
    slug: "the-locked-liquidity-certificate",
    accession: "BHM-011",
    title: "THE LOCKED-LIQUIDITY BADGE",
    category: "INSTITUTIONAL OBJECTS",
    era: "THE POST-GRADUATION CERTIFICATE OF CONFIDENCE PERIOD",
    condition: "CERTIFICATE PRESENT / CONTEXT REQUIRED",
    emotionalWeight: "BORROWED SECURITY",
    description: "A ceremonial badge declaring that liquidity has been locked. The screenshot does not specify the actual lock terms, exceptions, associated wallets or post-graduation pool depth.",
    curatorNote: "The certificate is not a substitute for reviewing contract permissions, wallet concentration or the actual lock terms. The museum has placed a large explanatory label beside it.",
    plaque: "A BADGE IS NOT A THREAT MODEL.",
    keywords: ["liquidity", "locked", "certificate", "wallet", "security"],
  },
  {
    slug: "the-number-go-up-switch",
    accession: "BHM-012",
    title: "THE UTILITY-ACTIVATION SWITCH",
    category: "DIGITAL RELICS",
    era: "THE PHASE-FOUR UTILITY PROMISE AGE",
    condition: "DECORATIVE / NOT CONNECTED",
    emotionalWeight: "PERMANENT CONVICTION",
    description: "A fictional switch mounted beneath a launch thread. It is labelled 'UTILITY ACTIVATION' but has no cable, power source or documented function beyond appearing in the next 100x presentation.",
    curatorNote: "The switch is expected to become operational in Phase 4. Phase 4 has been moved to a future phase pending the next CTO update and a new community banner.",
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
