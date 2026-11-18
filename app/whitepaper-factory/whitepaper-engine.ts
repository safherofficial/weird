export const WHITEPAPER_VERSION = 1;
export const WHITEPAPER_QUESTIONS = 7;
export const FICTIONAL_SUPPLY = 1_000_000_000;

export type WhitepaperArchetypeId =
  | "abstract-maximalist"
  | "consensus-poet"
  | "tokenomics-cartographer"
  | "dao-diplomat"
  | "interoperability-evangelist"
  | "zero-knowledge-enthusiast"
  | "utility-archaeologist"
  | "risk-footnote"
  | "appendix-empire"
  | "product-not-found";

export type WhitepaperOption = {
  label: string;
  technical: number;
  buzzwords: number;
  clarity: number;
  tag: WhitepaperArchetypeId;
};

export type WhitepaperQuestion = {
  prompt: string;
  note: string;
  options: WhitepaperOption[];
};

export type WhitepaperArchetype = {
  title: string;
  subtitle: string;
  roast: string;
  disposition: string;
};

export type WhitepaperSection = {
  number: string;
  title: string;
  eyebrow: string;
  paragraphs: string[];
  bullets?: string[];
};

export type TokenAllocation = {
  label: string;
  percentage: number;
  explanation: string;
};

export type WhitepaperProgress = {
  completedQuestions: number;
  technicalDensity: number;
  buzzwordDensity: number;
  productClarity: number;
};

export type WhitepaperResult = WhitepaperProgress & {
  answers: number[];
  projectSlug: string;
  projectLabel: string;
  sector: string;
  architecture: string;
  consensus: string;
  tokenModel: string;
  governanceModel: string;
  adoptionModel: string;
  riskPosture: string;
  primaryTag: WhitepaperArchetypeId;
  secondaryTag: WhitepaperArchetypeId;
  profile: WhitepaperArchetype;
  secondaryProfile: WhitepaperArchetype;
  finding: string;
  caseNumber: string;
  supply: number;
  allocations: TokenAllocation[];
  sections: WhitepaperSection[];
};

export const questions: WhitepaperQuestion[] = [
  {
    prompt: "WHICH INDUSTRY ARE YOU REINVENTING?",
    note: "The Department requires one sector. 'Everything' is not a sector.",
    options: [
      { label: "AI infrastructure. The agents are already drafting the announcement.", technical: 4, buzzwords: 5, clarity: 2, tag: "abstract-maximalist" },
      { label: "DePIN. We are decentralizing a physical thing that already works.", technical: 4, buzzwords: 4, clarity: 3, tag: "interoperability-evangelist" },
      { label: "Real-world assets. The real world has been notified.", technical: 4, buzzwords: 3, clarity: 4, tag: "tokenomics-cartographer" },
      { label: "Gaming. The players will definitely read the token mechanics.", technical: 2, buzzwords: 4, clarity: 2, tag: "product-not-found" },
    ],
  },
  {
    prompt: "WHAT IS THE CORE PROBLEM?",
    note: "A problem statement should identify a user. A global paradigm shift is not a user.",
    options: [
      { label: "Fragmented infrastructure, slow settlement and too many intermediaries.", technical: 4, buzzwords: 2, clarity: 5, tag: "utility-archaeologist" },
      { label: "Existing systems are not sufficiently modular, composable or interoperable.", technical: 5, buzzwords: 4, clarity: 3, tag: "interoperability-evangelist" },
      { label: "People have not yet experienced the transformative power of our ecosystem.", technical: 1, buzzwords: 5, clarity: 0, tag: "abstract-maximalist" },
      { label: "The problem is a lack of tokens in sectors that were previously token-free.", technical: 1, buzzwords: 4, clarity: 1, tag: "product-not-found" },
    ],
  },
  {
    prompt: "WHICH ARCHITECTURE POWERS THE VISION?",
    note: "Choose the diagram that will occupy at least three pages of the whitepaper.",
    options: [
      { label: "A modular execution layer with a clearly described settlement path.", technical: 5, buzzwords: 2, clarity: 5, tag: "consensus-poet" },
      { label: "A zero-knowledge proof stack. The proof of concept is still classified.", technical: 5, buzzwords: 5, clarity: 2, tag: "zero-knowledge-enthusiast" },
      { label: "An omnichain, AI-native, quantum-ready interoperability mesh.", technical: 2, buzzwords: 5, clarity: 1, tag: "abstract-maximalist" },
      { label: "The architecture is a proprietary secret revealed after the token launch.", technical: 0, buzzwords: 3, clarity: 0, tag: "appendix-empire" },
    ],
  },
  {
    prompt: "HOW IS NETWORK CONSENSUS SECURED?",
    note: "Consensus is not achieved by agreeing in the Telegram chat.",
    options: [
      { label: "A documented consensus mechanism with explicit assumptions and attack limits.", technical: 5, buzzwords: 1, clarity: 5, tag: "consensus-poet" },
      { label: "A validator or operator model with slashing, monitoring and recovery procedures.", technical: 5, buzzwords: 2, clarity: 4, tag: "risk-footnote" },
      { label: "Community consensus, powered by conviction and a pinned message.", technical: 1, buzzwords: 4, clarity: 1, tag: "dao-diplomat" },
      { label: "The network is secured by a proprietary mechanism we cannot discuss yet.", technical: 0, buzzwords: 4, clarity: 0, tag: "appendix-empire" },
    ],
  },
  {
    prompt: "WHAT DOES THE TOKEN ACTUALLY DO?",
    note: "Tokenomics without a defined function is an unusually decorative spreadsheet.",
    options: [
      { label: "It pays for a necessary network resource with published fee rules.", technical: 5, buzzwords: 1, clarity: 5, tag: "tokenomics-cartographer" },
      { label: "It coordinates governance and incentives, with clear limits on both.", technical: 4, buzzwords: 2, clarity: 4, tag: "dao-diplomat" },
      { label: "It unlocks utility in Phase 4 of the ecosystem expansion.", technical: 1, buzzwords: 5, clarity: 1, tag: "utility-archaeologist" },
      { label: "It represents access to the future of programmable everything.", technical: 0, buzzwords: 5, clarity: 0, tag: "product-not-found" },
    ],
  },
  {
    prompt: "WHO MAKES THE DECISIONS?",
    note: "A DAO is a governance structure, not a substitute for answering this question.",
    options: [
      { label: "Defined roles, transparent proposals, quorum rules and accountable execution.", technical: 5, buzzwords: 1, clarity: 5, tag: "dao-diplomat" },
      { label: "A staged transition from a core team to scoped community governance.", technical: 4, buzzwords: 2, clarity: 4, tag: "dao-diplomat" },
      { label: "The community decides, unless the community decides something unexpected.", technical: 1, buzzwords: 4, clarity: 1, tag: "abstract-maximalist" },
      { label: "A council of advisors whose identities will be disclosed in an appendix.", technical: 0, buzzwords: 3, clarity: 0, tag: "appendix-empire" },
    ],
  },
  {
    prompt: "WHAT HAPPENS WHEN SOMETHING GOES WRONG?",
    note: "The Department is legally required to ask about risks before the final rocket emoji.",
    options: [
      { label: "Threat models, audits, incident response and explicit residual risks.", technical: 5, buzzwords: 0, clarity: 5, tag: "risk-footnote" },
      { label: "A public security process with external reviews and staged mitigations.", technical: 4, buzzwords: 1, clarity: 4, tag: "risk-footnote" },
      { label: "The system is designed to be trustless, so the risks are minimal.", technical: 1, buzzwords: 4, clarity: 1, tag: "zero-knowledge-enthusiast" },
      { label: "All risks are covered by the strength of the community.", technical: 0, buzzwords: 5, clarity: 0, tag: "product-not-found" },
    ],
  },
];

export const classifications: Record<WhitepaperArchetypeId, WhitepaperArchetype> = {
  "abstract-maximalist": {
    title: "THE ABSTRACT MAXIMALIST",
    subtitle: "A universal protocol for a universal future, with a remarkably selective definition of 'universal'.",
    roast: "Your abstract has achieved consensus with several adjectives. The product remains a disputed proposition.",
    disposition: "REFERRED TO THE OFFICE OF UNBOUNDED TERMINOLOGY.",
  },
  "consensus-poet": {
    title: "THE CONSENSUS POET",
    subtitle: "You have turned Byzantine fault tolerance into a literary genre.",
    roast: "The Department found a mechanism, an assumption and something that almost resembles a specification. Suspicious.",
    disposition: "GRANTED A PROVISIONAL CERTIFICATE OF TECHNICAL COHERENCE.",
  },
  "tokenomics-cartographer": {
    title: "THE TOKENOMICS CARTOGRAPHER",
    subtitle: "Every token has a destination. Whether it has a reason to travel is another matter.",
    roast: "Your allocation chart has more detail than the product journey. The pie chart has requested authorship.",
    disposition: "REFERRED TO THE OFFICE OF CIRCULAR SUPPLY DISTRIBUTION.",
  },
  "dao-diplomat": {
    title: "THE DAO DIPLOMAT",
    subtitle: "All decisions are decentralized, except the ones that require a decision.",
    roast: "Your governance framework has committees to appoint the committees that will review the framework.",
    disposition: "PLACED ON THE AGENDA FOR A FUTURE GOVERNANCE CALL.",
  },
  "interoperability-evangelist": {
    title: "THE INTEROPERABILITY EVANGELIST",
    subtitle: "Every chain is connected. The documentation is still bridging.",
    roast: "You have solved fragmentation by introducing six more layers of abstraction.",
    disposition: "REFERRED TO THE OFFICE OF CROSS-CHAIN EXPLANATIONS.",
  },
  "zero-knowledge-enthusiast": {
    title: "THE ZERO-KNOWLEDGE ENTHUSIAST",
    subtitle: "The system proves everything, including the fact that the product cannot be described.",
    roast: "You have provided a proof without revealing the statement. The Department respects the commitment.",
    disposition: "REQUESTED TO DISCLOSE AT LEAST ONE NON-ZERO-KNOWLEDGE DETAIL.",
  },
  "utility-archaeologist": {
    title: "THE UTILITY ARCHAEOLOGIST",
    subtitle: "You have found a use case beneath several layers of ecosystem sediment.",
    roast: "There may be a real user here. Please stop digging until the Department has secured the site.",
    disposition: "CLEARED TO CONTINUE EXCAVATION UNDER SUPERVISION.",
  },
  "risk-footnote": {
    title: "THE RISK FOOTNOTE",
    subtitle: "You have acknowledged that the system can fail. The Department is almost moved.",
    roast: "There is an actual threat model. Someone from the marketing department has been asked to review it.",
    disposition: "RELEASED WITH A DOCUMENTED RISK REGISTER.",
  },
  "appendix-empire": {
    title: "THE APPENDIX EMPIRE",
    subtitle: "The answers are in Appendix M, pending the publication of Appendix N.",
    roast: "Your whitepaper is 94 pages long. The product description is on page 95 and marked confidential.",
    disposition: "ARCHIVED UNDER: TECHNICAL DETAIL TO FOLLOW.",
  },
  "product-not-found": {
    title: "ERROR 404: PRODUCT NOT FOUND",
    subtitle: "A token, a vision and an ecosystem have been located. The product remains missing.",
    roast: "The Department searched the executive summary, the tokenomics and three dimensions. No product was found.",
    disposition: "REFERRED TO THE OFFICE OF PRODUCT RECOVERY.",
  },
};

const sectors = ["AI INFRASTRUCTURE", "DePIN / PHYSICAL NETWORKS", "REAL-WORLD ASSETS", "WEB3 GAMING"];
const architectures = [
  "MODULAR EXECUTION / DEFINED SETTLEMENT",
  "ZERO-KNOWLEDGE PROOF STACK",
  "OMNICHAIN / AI-NATIVE ABSTRACTION MESH",
  "PROPRIETARY ARCHITECTURE / DETAILS PENDING",
];
const consensusModels = [
  "DOCUMENTED CONSENSUS / EXPLICIT ASSUMPTIONS",
  "VALIDATOR NETWORK / SLASHING & RECOVERY",
  "COMMUNITY CONSENSUS / TELEGRAM RATIFICATION",
  "PROPRIETARY CONSENSUS / DISCLOSURE PENDING",
];
const tokenModels = [
  "NETWORK RESOURCE / FEE PAYMENT",
  "GOVERNANCE & INCENTIVE COORDINATION",
  "FUTURE ECOSYSTEM ACCESS / PHASE 4",
  "PROGRAMMABLE EVERYTHING / PURPOSE TBD",
];
const governanceModels = [
  "DEFINED ROLES / PUBLIC PROPOSALS / ACCOUNTABILITY",
  "STAGED TRANSITION TO COMMUNITY GOVERNANCE",
  "COMMUNITY DECIDES / SUBJECT TO COMMUNITY DECISION",
  "ADVISORY COUNCIL / IDENTITIES IN APPENDIX",
];
const adoptionModels = [
  "AI DEVELOPERS / COMPUTE OPERATORS / MEASURABLE TASKS",
  "NODE OPERATORS / PHYSICAL SERVICE USERS",
  "ASSET ISSUERS / CUSTODY & SETTLEMENT USERS",
  "PLAYERS / GAME DEVELOPERS / DIGITAL ITEM USERS",
];
const riskPostures = [
  "THREAT MODEL / AUDITS / INCIDENT RESPONSE",
  "EXTERNAL REVIEW / STAGED MITIGATION",
  "TRUSTLESS BY DESIGN / RISK DISCUSSION MINIMIZED",
  "COMMUNITY CONVICTION / RISK APPENDIX PENDING",
];

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function slugifyProjectName(value: string): string {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24)
    .replace(/-+$/g, "");
  return slug.length >= 2 ? slug : "PROJECT-PENDING";
}

export function isValidWhitepaperAnswers(value: unknown): value is number[] {
  return Array.isArray(value) &&
    value.length === WHITEPAPER_QUESTIONS &&
    value.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4);
}

export function encodeWhitepaperCode(answers: number[], projectName: string): string {
  if (!isValidWhitepaperAnswers(answers)) throw new Error("A complete, valid whitepaper brief is required.");
  return "w" + WHITEPAPER_VERSION + "-" + answers.join("") + "-" + slugifyProjectName(projectName);
}

export function decodeWhitepaperCode(value: unknown): { answers: number[]; projectSlug: string } | null {
  if (typeof value !== "string") return null;
  const match = value.match(new RegExp("^w" + WHITEPAPER_VERSION + "-([0-3]{" + WHITEPAPER_QUESTIONS + "})-([A-Z0-9]+(?:-[A-Z0-9]+)*)$"));
  if (!match) return null;
  const answers = [...match[1]].map(Number);
  const projectSlug = match[2];
  return isValidWhitepaperAnswers(answers) && projectSlug.length <= 24 ? { answers, projectSlug } : null;
}

export function inspectWhitepaperProgress(answers: number[]): WhitepaperProgress {
  if (!Array.isArray(answers) || answers.length > WHITEPAPER_QUESTIONS ||
      !answers.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)) {
    throw new Error("Whitepaper answers are invalid.");
  }
  const selected = answers.map((answer, index) => questions[index].options[answer]);
  const maxScore = Math.max(1, answers.length * 5);
  return {
    completedQuestions: answers.length,
    technicalDensity: answers.length ? round(selected.reduce((sum, item) => sum + item.technical, 0) / maxScore * 100) : 0,
    buzzwordDensity: answers.length ? round(selected.reduce((sum, item) => sum + item.buzzwords, 0) / maxScore * 100) : 0,
    productClarity: answers.length ? round(selected.reduce((sum, item) => sum + item.clarity, 0) / maxScore * 100) : 0,
  };
}

function rankProfiles(answers: number[]) {
  const tallies = new Map<WhitepaperArchetypeId, { count: number; buzzwords: number; first: number }>();
  answers.forEach((answer, index) => {
    const option = questions[index].options[answer];
    const current = tallies.get(option.tag);
    if (current) {
      current.count += 1;
      current.buzzwords += option.buzzwords;
    } else {
      tallies.set(option.tag, { count: 1, buzzwords: option.buzzwords, first: index });
    }
  });
  const sorted = [...tallies.entries()].sort((a, b) =>
    b[1].count - a[1].count || b[1].buzzwords - a[1].buzzwords || a[1].first - b[1].first
  );
  return {
    primaryTag: sorted[0]?.[0] ?? "abstract-maximalist",
    secondaryTag: sorted[1]?.[0] ?? sorted[0]?.[0] ?? "abstract-maximalist",
  };
}

function findingFor(progress: WhitepaperProgress) {
  if (progress.productClarity >= 78 && progress.technicalDensity >= 75) return "A PRODUCT DESCRIPTION HAS BEEN DETECTED. PLEASE REMAIN CALM.";
  if (progress.buzzwordDensity >= 78) return "ABSTRACT DENSITY EXCEEDS THE RECOMMENDED WORD-TO-MEANING RATIO.";
  if (progress.productClarity <= 20) return "PRODUCT NOT LOCATED. EXECUTIVE SUMMARY IS UNDER REVIEW.";
  if (progress.technicalDensity >= 70) return "TECHNICAL CONTENT PRESENT / IMPLEMENTATION EVIDENCE NOT REQUESTED.";
  return "WHITEPAPER CLAIMS ACCEPTED / INDEPENDENT VALIDATION NOT INCLUDED.";
}

function buildAllocations(tokenAnswer: number): TokenAllocation[] {
  const models: TokenAllocation[][] = [
    [
      { label: "NETWORK OPERATIONS", percentage: 25, explanation: "Fictional allocation for operating the imagined network." },
      { label: "COMMUNITY & USERS", percentage: 20, explanation: "Fictional incentives for people expected to use the product." },
      { label: "TREASURY", percentage: 20, explanation: "A reserve whose governance is described elsewhere." },
      { label: "CORE CONTRIBUTORS", percentage: 15, explanation: "For the people writing the roadmap and the roadmap of the roadmap." },
      { label: "LIQUIDITY RESERVE", percentage: 10, explanation: "A decorative line item in this fictional model." },
      { label: "RESEARCH & SECURITY", percentage: 10, explanation: "Testing, audits and the occasional reality check." },
    ],
    [
      { label: "GOVERNANCE & COMMUNITY", percentage: 30, explanation: "Voting, proposals and several emergency working groups." },
      { label: "TREASURY", percentage: 20, explanation: "A reserve subject to future governance discussion." },
      { label: "CORE CONTRIBUTORS", percentage: 18, explanation: "The team and the people who maintain its slide deck." },
      { label: "NETWORK OPERATIONS", percentage: 15, explanation: "Fictional infrastructure and protocol expenses." },
      { label: "LIQUIDITY RESERVE", percentage: 10, explanation: "Theoretical liquidity, not a market commitment." },
      { label: "RESEARCH & SECURITY", percentage: 7, explanation: "Risk reviews scheduled before the next announcement." },
    ],
    [
      { label: "FUTURE ECOSYSTEM INCENTIVES", percentage: 35, explanation: "The utility layer expected in a future phase." },
      { label: "TREASURY", percentage: 20, explanation: "The destination of funds pending a destination." },
      { label: "CORE CONTRIBUTORS", percentage: 15, explanation: "Contributors, advisors and an unnamed appendix." },
      { label: "COMMUNITY REWARDS", percentage: 15, explanation: "For engagement with the concept of engagement." },
      { label: "LIQUIDITY RESERVE", percentage: 10, explanation: "An allocation that does not create actual liquidity." },
      { label: "RESEARCH & SECURITY", percentage: 5, explanation: "A minimal allocation for a maximalist vision." },
    ],
    [
      { label: "ECOSYSTEM / PURPOSE TBD", percentage: 40, explanation: "A placeholder pending the invention of a use case." },
      { label: "TREASURY", percentage: 20, explanation: "A reserve that is not yet sure what it is reserving for." },
      { label: "CORE CONTRIBUTORS", percentage: 15, explanation: "The team, the advisors and the concept artists." },
      { label: "COMMUNITY", percentage: 10, explanation: "A community allocation for the community narrative." },
      { label: "LIQUIDITY RESERVE", percentage: 10, explanation: "An amount on a pie chart, not a promise of liquidity." },
      { label: "RESEARCH & SECURITY", percentage: 5, explanation: "The appendix has accepted responsibility." },
    ],
  ];
  return models[tokenAnswer] ?? models[0];
}

function buildSections(
  projectLabel: string,
  sector: string,
  architecture: string,
  consensus: string,
  tokenModel: string,
  governanceModel: string,
  adoptionModel: string,
  riskPosture: string,
  progress: WhitepaperProgress,
  profile: WhitepaperArchetype,
  secondaryProfile: WhitepaperArchetype
): WhitepaperSection[] {
  return [
    {
      number: "01",
      title: "EXECUTIVE ABSTRACT",
      eyebrow: "THE PROMISE / SUBJECT TO REVISION",
      paragraphs: [
        projectLabel + " is presented as a proposed initiative in " + sector.toLowerCase() + ". Its stated ambition is to coordinate infrastructure, incentives and participants through a system described as " + architecture.toLowerCase() + ".",
        "This document is a fictional whitepaper parody generated from a visitor's answers. It contains illustrative terminology and invented token allocations. It is not a technical specification, offer, solicitation, project disclosure or statement about an existing business.",
      ],
      bullets: ["Primary classification: " + profile.title, "Product clarity index: " + progress.productClarity + "/100", "Current operational status: NOT INDEPENDENTLY VERIFIED"],
    },
    {
      number: "02",
      title: "PROBLEM STATEMENT",
      eyebrow: "A PROBLEM HAS BEEN CLAIMED",
      paragraphs: [
        "The proposed thesis concerns " + sector.toLowerCase() + " and the challenge of delivering a useful product to a defined audience. The selected brief describes a problem involving " + (progress.productClarity >= 60 ? "specific workflows and identifiable user needs." : "a broad market narrative whose intended user remains subject to clarification."),
        "No market sizing, customer research, user interviews or competitor analysis has been conducted by this generator. Any claim of demand would require evidence outside this document.",
      ],
      bullets: ["User definition: TO BE DOCUMENTED", "Demand validation: NOT PROVIDED", "Competitive analysis: OUTSIDE THE SCOPE OF THIS PARODY"],
    },
    {
      number: "03",
      title: "SYSTEM ARCHITECTURE",
      eyebrow: "THE DIAGRAM WOULD BE VERY IMPRESSIVE",
      paragraphs: [
        "The selected architecture is " + architecture.toLowerCase() + ". The design narrative assumes distinct components for execution, coordination and settlement, although this generated text does not specify interfaces, message formats, cryptographic constructions or implementation details.",
        "A real architecture document would identify trust boundaries, failure modes, dependencies, upgrade mechanisms and reproducible design decisions. The present draft intentionally leaves those items as open questions.",
      ],
      bullets: ["Architecture selection: " + architecture, "Integration boundaries: NOT SPECIFIED", "Implementation status: NOT VERIFIED"],
    },
    {
      number: "04",
      title: "CONSENSUS & SECURITY",
      eyebrow: "TRUST IS NOT A THREAT MODEL",
      paragraphs: [
        "The selected consensus description is " + consensus.toLowerCase() + ". This is a category label chosen from the intake form, not proof that such a mechanism exists or is secure.",
        "Security claims would require a threat model, documented assumptions, adversarial analysis, audit scope, incident response and a clear explanation of residual risk. No audit or verification is performed by this generator.",
      ],
      bullets: ["Security posture: " + riskPosture, "Consensus evidence: NOT ATTACHED", "Independent audit: NOT PERFORMED"],
    },
    {
      number: "05",
      title: "TOKENOMICS",
      eyebrow: "A PIE CHART IS NOT A BUSINESS MODEL",
      paragraphs: [
        "The fictional token model is described as " + tokenModel.toLowerCase() + ". The following allocation is an invented illustration that exists only to parody common whitepaper conventions.",
        "The model assumes a notional maximum supply of 1,000,000,000 units. This number, the allocations and every category are fictional and must not be interpreted as a real token design, valuation, vesting schedule or liquidity commitment.",
      ],
      bullets: ["Notional maximum supply: 1,000,000,000 FICTIONAL UNITS", "Token function: " + tokenModel, "Circulating supply, valuation and vesting: NOT DEFINED"],
    },
    {
      number: "06",
      title: "GOVERNANCE & ECOSYSTEM",
      eyebrow: "DECENTRALIZATION IS A PROCESS, APPARENTLY",
      paragraphs: [
        "The governance concept selected for " + projectLabel + " is " + governanceModel.toLowerCase() + ". The ecosystem narrative additionally anticipates " + adoptionModel.toLowerCase() + ".",
        "No legal entity, voting contract, proposal process, delegation model, dispute mechanism or accountability structure is defined by this generated document. These details cannot be inferred from a multiple-choice answer.",
      ],
      bullets: ["Governance model: " + governanceModel, "Adoption narrative: " + adoptionModel, "Roles and accountability: TO BE SPECIFIED"],
    },
    {
      number: "07",
      title: "ROADMAP & ADOPTION",
      eyebrow: "DELIVERY WINDOW: SOON™",
      paragraphs: [
        "The illustrative roadmap begins with documentation, proceeds to a public demonstration, and eventually reaches ecosystem expansion. Each phase is dependent on the previous phase, as well as on the continued availability of the word 'soon'.",
        "No dates, commitments, engineering estimates, partner confirmations or product milestones are provided. A real roadmap would require owners, scope, dependencies, exit criteria and a public change log.",
      ],
      bullets: ["Phase 01: WHITEPAPER FINALIZATION / SOON™", "Phase 02: PUBLIC DEMONSTRATION / AFTER THE ANNOUNCEMENT", "Phase 03: ECOSYSTEM EXPANSION / SUBJECT TO PHASE 02"],
    },
    {
      number: "08",
      title: "RISKS & LIMITATIONS",
      eyebrow: "THE FOOTNOTE THAT EVERYONE SKIPS",
      paragraphs: [
        "The selected risk posture is " + riskPosture.toLowerCase() + ". This generated paper does not measure security, code quality, legal compliance, token risk, liquidity, operational resilience or commercial viability.",
        "All technical statements are illustrative placeholders derived from selected answers. They must not be copied into a real project disclosure without independent engineering, legal, security and business review.",
      ],
      bullets: ["Smart-contract and infrastructure risk: NOT ASSESSED", "Regulatory and legal risk: NOT ASSESSED", "Market, liquidity and execution risk: NOT ASSESSED", "Third-party dependency risk: NOT ASSESSED"],
    },
    {
      number: "09",
      title: "CONCLUSION",
      eyebrow: "THE DOCUMENT IS COMPLETE. THE PRODUCT MAY NOT BE.",
      paragraphs: [
        projectLabel + " has now received a complete fictional whitepaper-shaped document. The Department records the primary finding as: " + profile.title + ".",
        "The whitepaper is hereby marked COMPLETE FOR ENTERTAINMENT PURPOSES ONLY. Actual implementation, users, security, governance and delivery remain outside this generated document.",
      ],
      bullets: ["Primary archetype: " + profile.title, "Secondary archetype: " + secondaryProfile.title, "Final disposition: DOCUMENT FILED / PRODUCT NOT VERIFIED"],
    },
  ];
}

export function buildWhitepaperResult(answers: number[], projectName: string): WhitepaperResult {
  if (!isValidWhitepaperAnswers(answers)) throw new Error("A complete, valid whitepaper brief is required.");
  const projectSlug = slugifyProjectName(projectName);
  const projectLabel = projectSlug.replace(/-/g, " ");
  const progress = inspectWhitepaperProgress(answers);
  const tallies = new Map<WhitepaperArchetypeId, { count: number; buzzwords: number; first: number }>();
  answers.forEach((answer, index) => {
    const option = questions[index].options[answer];
    const current = tallies.get(option.tag);
    if (current) {
      current.count += 1;
      current.buzzwords += option.buzzwords;
    } else {
      tallies.set(option.tag, { count: 1, buzzwords: option.buzzwords, first: index });
    }
  });
  const ranking = [...tallies.entries()].sort((a, b) =>
    b[1].count - a[1].count || b[1].buzzwords - a[1].buzzwords || a[1].first - b[1].first
  );
  const primaryTag = ranking[0]?.[0] ?? "abstract-maximalist";
  const secondaryTag = ranking[1]?.[0] ?? ranking[0]?.[0] ?? "abstract-maximalist";
  const seed = answers.reduce((sum, answer, index) => ((sum * 41) + (answer + 1) * (index + 23)) % 900000, 808080);
  const caseNumber = String(seed + 100000).slice(-6);
  const sector = sectors[answers[0]];
  const architecture = architectures[answers[2]];
  const consensus = consensusModels[answers[3]];
  const tokenModel = tokenModels[answers[4]];
  const governanceModel = governanceModels[answers[5]];
  const adoptionModel = adoptionModels[answers[0]];
  const riskPosture = riskPostures[answers[6]];
  const profile = classifications[primaryTag];
  const secondaryProfile = classifications[secondaryTag];
  const finding = progress.productClarity >= 75 && progress.technicalDensity >= 70
    ? "TECHNICAL CONTENT DETECTED / PRODUCT CLAIMS STILL REQUIRE EVIDENCE."
    : progress.buzzwordDensity >= 75
      ? "WHITEPAPER ABSTRACT EXCEEDS THE RECOMMENDED DENSITY LIMIT."
      : progress.productClarity <= 25
        ? "PRODUCT NOT LOCATED. CHECK THE APPENDIX."
        : "DOCUMENT GENERATED / VALIDATION NOT INCLUDED.";
  const allocations = buildAllocations(answers[4]);
  const sections = buildSections(projectLabel, sector, architecture, consensus, tokenModel, governanceModel, adoptionModel, riskPosture, progress, profile, secondaryProfile);

  return {
    ...progress,
    answers: [...answers],
    projectSlug,
    projectLabel,
    sector,
    architecture,
    consensus,
    tokenModel,
    governanceModel,
    adoptionModel,
    riskPosture,
    primaryTag,
    secondaryTag,
    profile,
    secondaryProfile,
    finding,
    caseNumber,
    supply: FICTIONAL_SUPPLY,
    allocations,
    sections,
  };
}

export function formatWhitepaperMarkdown(result: WhitepaperResult): string {
  const lines = [
    "# " + result.projectLabel + " — WHITEPAPER",
    "",
    "**THE DYOR DEPARTMENT / WHITEPAPER FACTORY**",
    "",
    "> FICTIONAL ENTERTAINMENT DOCUMENT. NOT A TECHNICAL SPECIFICATION, TOKEN OFFER, INVESTMENT DOCUMENT OR REAL PROJECT DISCLOSURE.",
    "",
    "- Case No.: " + result.caseNumber,
    "- Classification: " + result.profile.title,
    "- Secondary classification: " + result.secondaryProfile.title,
    "- Departmental finding: " + result.finding,
    "- Technical density: " + result.technicalDensity + "/100",
    "- Buzzword density: " + result.buzzwordDensity + "/100",
    "- Product clarity: " + result.productClarity + "/100",
    "",
    "## " + result.profile.subtitle,
    "",
    result.profile.roast,
    "",
  ];
  result.sections.forEach((section) => {
    lines.push("## " + section.number + ". " + section.title, "", "*" + section.eyebrow + "*", "");
    section.paragraphs.forEach((paragraph) => lines.push(paragraph, ""));
    if (section.bullets) section.bullets.forEach((bullet) => lines.push("- " + bullet));
    lines.push("");
  });
  lines.push(
    "## TOKEN ALLOCATION / FICTIONAL MODEL",
    "",
    "| Category | Allocation |",
    "|---|---:|",
    ...result.allocations.map((item) => "| " + item.label + " | " + item.percentage + "% |"),
    "",
    "**NOTIONAL SUPPLY: 1,000,000,000 FICTIONAL UNITS.**",
    "",
    "This document is a parody generated from selected answers. No real product, contract, token, company, team or market has been inspected.",
  );
  return lines.join("\n");
}

export function formatWhitepaperHtml(result: WhitepaperResult): string {
  const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;",
  })[char] ?? char);
  const sectionHtml = result.sections.map((section) =>
    "<section><p class=\"eyebrow\">" + escape(section.number + " / " + section.eyebrow) + "</p><h2>" + escape(section.title) + "</h2>" +
    section.paragraphs.map((paragraph) => "<p>" + escape(paragraph) + "</p>").join("") +
    (section.bullets ? "<ul>" + section.bullets.map((item) => "<li>" + escape(item) + "</li>").join("") + "</ul>" : "") +
    "</section>"
  ).join("");
  const tableRows = result.allocations.map((item) => "<tr><td>" + escape(item.label) + "</td><td>" + item.percentage + "%</td><td>" + escape(item.explanation) + "</td></tr>").join("");
  const summaryHtml = "<section><p class=\"eyebrow\">DEPARTMENTAL FINDING</p><h2>" + escape(result.finding) + "</h2>" +
    "<p><strong>Primary classification:</strong> " + escape(result.profile.title) + "<br><strong>Secondary classification:</strong> " + escape(result.secondaryProfile.title) + "</p>" +
    "<p><strong>Technical density:</strong> " + result.technicalDensity + "/100 · <strong>Buzzword density:</strong> " + result.buzzwordDensity + "/100 · <strong>Product clarity:</strong> " + result.productClarity + "/100</p>" +
    "<p>Notional supply: 1,000,000,000 fictional units. All scores and token allocations are invented.</p></section>";
  return "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>" + escape(result.projectLabel + " — Whitepaper") + "</title><style>" +
    "body{margin:0;background:#eceee9;color:#20251f;font:16px/1.7 Georgia,serif}main{max-width:850px;margin:40px auto;padding:60px 72px;background:#fff;box-shadow:0 10px 40px #0001}header{border-bottom:3px solid #b6ff65;padding-bottom:28px;margin-bottom:36px}header small,.eyebrow{font:11px/1.5 monospace;letter-spacing:.12em;color:#687264}h1{font:800 42px/1.08 Arial,sans-serif;letter-spacing:-.04em}h2{font:700 25px/1.2 Arial,sans-serif;margin:8px 0 18px}h3{font:700 16px Arial,sans-serif}p{margin:0 0 16px}section{padding:24px 0;border-bottom:1px solid #dfe3dc}li{margin:6px 0}table{width:100%;border-collapse:collapse;margin:20px 0;font:13px Arial,sans-serif}td,th{padding:10px;border-bottom:1px solid #dfe3dc;text-align:left}th{background:#f2f4ee}.disclaimer{padding:18px;background:#f2f4ee;border-left:4px solid #b6ff65;font:12px/1.7 monospace}.toolbar{display:flex;justify-content:flex-end;gap:10px;margin:0 auto 16px;max-width:990px}.toolbar button{padding:12px 18px;border:0;background:#172016;color:#b6ff65;font:12px monospace;cursor:pointer}@media print{body{background:#fff}main{margin:0;padding:22mm 18mm;max-width:none;box-shadow:none}.toolbar{display:none}section{break-inside:avoid}h2{break-after:avoid}}@media(max-width:700px){main{margin:0;padding:28px 22px}h1{font-size:32px}}"+
    "</style></head><body><div class=\"toolbar\"><button onclick=\"window.print()\">PRINT / SAVE AS PDF</button></div><main><header><small>THE DYOR DEPARTMENT / WHITEPAPER FACTORY / CASE " + escape(result.caseNumber) + "</small><h1>" + escape(result.projectLabel) + "<br>WHITEPAPER</h1><p>" + escape(result.profile.subtitle) + "</p><p class=\"disclaimer\">FICTIONAL ENTERTAINMENT DOCUMENT. NOT A TECHNICAL SPECIFICATION, TOKEN OFFER, INVESTMENT DOCUMENT OR REAL PROJECT DISCLOSURE.</p></header>" + summaryHtml + sectionHtml +
    "<section><p class=\"eyebrow\">TOKENOMICS / NOTIONAL MODEL</p><h2>FICTIONAL TOKEN ALLOCATION</h2><p>Notional supply: 1,000,000,000 fictional units. No real token or allocation is being described.</p><table><thead><tr><th>Category</th><th>Share</th><th>Departmental explanation</th></tr></thead><tbody>" + tableRows + "</tbody></table></section>" +
    "<p class=\"disclaimer\">This document is generated from selected answers for satire. No real project, token, contract, team, company, market, security or legal position has been inspected or verified. Do not present this output as an actual project whitepaper.</p></main></body></html>";
}
