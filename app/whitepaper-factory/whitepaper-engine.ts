import type { DepartmentCrossRead } from "../lib/department-cross-read";

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
  crossRead: DepartmentCrossRead;
  answers: number[];
  projectSlug: string;
  projectLabel: string;
  sector: string;
  problemStatement: string;
  architecture: string;
  consensus: string;
  tokenModel: string;
  governanceModel: string;
  adoptionModel: string;
  riskPosture: string;
  narrative: string;
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
    prompt: "WHICH NARRATIVE ARE YOU SELLING TO THE TIMELINE?",
    note: "The Department requires one narrative. “Everything on Solana” is not a narrative.",
    options: [
      { label: "AI-powered meme infrastructure. The agents are already drafting the KOL thread.", technical: 4, buzzwords: 5, clarity: 2, tag: "abstract-maximalist" },
      { label: "Community-powered culture. We are decentralizing the act of posting a ticker.", technical: 4, buzzwords: 4, clarity: 3, tag: "interoperability-evangelist" },
      { label: "A frog-themed financial revolution. The frog has not reviewed the terms.", technical: 4, buzzwords: 3, clarity: 4, tag: "abstract-maximalist" },
      { label: "A memecoin with a lore-based roadmap. The lore is longer than the product brief.", technical: 2, buzzwords: 4, clarity: 2, tag: "product-not-found" },
    ],
  },
  {
    prompt: "WHAT IS THE TOKEN'S REASON TO EXIST AFTER LAUNCH?",
    note: "A token narrative should identify what it is. “Number go up” is not a whitepaper.",
    options: [
      { label: "A clearly defined product or community need with a reason to use this token.", technical: 4, buzzwords: 2, clarity: 5, tag: "utility-archaeologist" },
      { label: "The community lacks a clear operating model, documented responsibilities and a reason to stay after launch.", technical: 5, buzzwords: 4, clarity: 3, tag: "interoperability-evangelist" },
      { label: "People have not yet understood that the ticker is the future of culture.", technical: 1, buzzwords: 5, clarity: 0, tag: "abstract-maximalist" },
      { label: "The problem is that not every online joke has a ticker. We intend to change that.", technical: 1, buzzwords: 4, clarity: 1, tag: "product-not-found" },
    ],
  },
  {
    prompt: "WHAT DOES THE TOKEN ACTUALLY RUN ON?",
    note: "Choose the architecture paragraph that will make a simple launch sound institutional.",
    options: [
      { label: "A documented chain, program and token standard with verifiable technical details.", technical: 5, buzzwords: 2, clarity: 5, tag: "consensus-poet" },
      { label: "A proprietary launch architecture. The proof is classified until the next Spaces.", technical: 5, buzzwords: 5, clarity: 2, tag: "zero-knowledge-enthusiast" },
      { label: "An omnichain, AI-native, quantum-ready meme liquidity superstructure.", technical: 2, buzzwords: 5, clarity: 1, tag: "abstract-maximalist" },
      { label: "The architecture is a pinned diagram. The implementation is planned for Phase 4.", technical: 0, buzzwords: 3, clarity: 0, tag: "appendix-empire" },
    ],
  },
  {
    prompt: "HOW IS THE LAUNCH AND ITS OWNERSHIP EXPLAINED?",
    note: "A Telegram vote is not a launch audit. The Department has checked.",
    options: [
      { label: "Launch mechanics, ownership roles and risks are documented with verifiable source links.", technical: 5, buzzwords: 1, clarity: 5, tag: "consensus-poet" },
      { label: "A defined operator and governance model with explicit access and recovery procedures.", technical: 5, buzzwords: 2, clarity: 4, tag: "risk-footnote" },
      { label: "Community consensus, powered by conviction and a message that says “trust the process”.", technical: 1, buzzwords: 4, clarity: 1, tag: "dao-diplomat" },
      { label: "The launch is fair because the pinned post says so. Further details are coming soon.", technical: 0, buzzwords: 4, clarity: 0, tag: "appendix-empire" },
    ],
  },
  {
    prompt: "WHAT IS THE TOKENOMICS STORY?",
    note: "A supply chart is not a complete tokenomics explanation. The footnotes still matter.",
    options: [
      { label: "A defined role with transparent mechanics, supply assumptions and clear limits.", technical: 5, buzzwords: 1, clarity: 5, tag: "tokenomics-cartographer" },
      { label: "It supports a documented incentive or governance model with clear limits.", technical: 4, buzzwords: 2, clarity: 4, tag: "dao-diplomat" },
      { label: "It unlocks utility after the next narrative pivot and the second community takeover.", technical: 1, buzzwords: 5, clarity: 1, tag: "utility-archaeologist" },
      { label: "It represents access to the future of posting “still early” under every green candle.", technical: 0, buzzwords: 5, clarity: 0, tag: "product-not-found" },
    ],
  },
  {
    prompt: "WHO IS ACCOUNTABLE WHEN THE DEPLOYER DISAPPEARS?",
    note: "A new CTO handle is not a governance process. Name the people and their responsibilities.",
    options: [
      { label: "Named roles, documented access controls and transparent decision procedures.", technical: 5, buzzwords: 1, clarity: 5, tag: "dao-diplomat" },
      { label: "A documented transition from the deployer to a community team with scoped permissions.", technical: 4, buzzwords: 2, clarity: 4, tag: "dao-diplomat" },
      { label: "The community decides, unless the new admin decides something unexpected.", technical: 1, buzzwords: 4, clarity: 1, tag: "dao-diplomat" },
      { label: "A council of KOLs whose responsibilities will be disclosed after the next announcement.", technical: 0, buzzwords: 3, clarity: 0, tag: "appendix-empire" },
    ],
  },
  {
    prompt: "WHAT HAPPENS WHEN LIQUIDITY AND ATTENTION LEAVE?",
    note: "The Department is required to ask about risks before the final “100x incoming” post.",
    options: [
      { label: "Documented risks, access controls, an incident process and clear residual limitations.", technical: 5, buzzwords: 0, clarity: 5, tag: "risk-footnote" },
      { label: "A public review process with named owners, verifiable findings and staged remediation.", technical: 4, buzzwords: 1, clarity: 4, tag: "risk-footnote" },
      { label: "The community is decentralised, so nobody is responsible for anything.", technical: 1, buzzwords: 4, clarity: 1, tag: "dao-diplomat" },
      { label: "All risks are covered by the strength of the community and a pinned rocket emoji.", technical: 0, buzzwords: 5, clarity: 0, tag: "product-not-found" },
    ],
  },
];

export const classifications: Record<WhitepaperArchetypeId, WhitepaperArchetype> = {
  "abstract-maximalist": {
    title: "THE MEMECOIN ABSTRACT MAXIMALIST",
    subtitle: "A universal ticker for a universal timeline, with a remarkably selective definition of utility.",
    roast: "Your abstract has achieved consensus with seventeen CT adjectives. The use case remains a disputed screenshot.",
    disposition: "REFERRED TO THE OFFICE OF UNBOUNDED NARRATIVE.",
  },
  "consensus-poet": {
    title: "THE SOURCE-LINKED TECHNICAL AUTHOR",
    subtitle: "The chain, program, token standard and launch mechanics are documented with references. The Department found something it can actually check.",
    roast: "Your technical appendix contains primary links. The CT desk has requested that you replace them with a screenshot.",
    disposition: "RELEASED FOR INDEPENDENT TECHNICAL REVIEW.",
  },
  "tokenomics-cartographer": {
    title: "THE SUPPLY-CHART CARTOGRAPHER",
    subtitle: "Every fictional unit has a destination. Whether it has a lock, owner or vesting schedule is another matter.",
    roast: "Your allocation chart has more detail than the deployer handover. The pie chart has requested wallet access.",
    disposition: "REFERRED TO THE OFFICE OF CIRCULAR SUPPLY DISTRIBUTION.",
  },
  "dao-diplomat": {
    title: "THE CTO DIPLOMAT",
    subtitle: "All decisions are community-led, except the ones made by the new admin without a public vote.",
    roast: "Your governance framework has committees to appoint the moderators who will review the framework.",
    disposition: "PLACED ON THE AGENDA FOR A FUTURE COMMUNITY SPACE.",
  },
  "interoperability-evangelist": {
    title: "THE COMMUNITY-COORDINATION MAXIMALIST",
    subtitle: "The community is described as the operating layer. The responsibilities, decision process and post-launch purpose remain to be written.",
    roast: "You have decentralised the act of posting. The Department is still waiting for someone to own the deliverables.",
    disposition: "REFERRED TO THE OFFICE OF COMMUNITY OPERATING MODELS.",
  },
  "zero-knowledge-enthusiast": {
    title: "THE PROPRIETARY-PROOF ARCHITECT",
    subtitle: "The launch architecture is described as proprietary. Its technical proof will be discussed in a future Spaces session.",
    roast: "The proof is classified until the next Spaces. The Department has filed a request for an explanation that can survive daylight.",
    disposition: "REQUESTED TO PRODUCE THE TECHNICAL DETAILS.",
  },
  "utility-archaeologist": {
    title: "THE TOKEN-PURPOSE ARCHAEOLOGIST",
    subtitle: "You have found a use case beneath several layers of launch lore and future-phase sediment.",
    roast: "There may be a real role here. Please stop digging until the Department has secured the evidence.",
    disposition: "CLEARED TO CONTINUE EXCAVATION UNDER SUPERVISION.",
  },
  "risk-footnote": {
    title: "THE POST-GRADUATION RISK FOOTNOTE",
    subtitle: "You have acknowledged that the pool can thin, the deployer can vanish and the community can disagree.",
    roast: "There is an actual risk section. Someone from the KOL desk has been asked to read it.",
    disposition: "RELEASED WITH A DOCUMENTED TRENCHES RISK REGISTER.",
  },
  "appendix-empire": {
    title: "THE CTO APPENDIX EMPIRE",
    subtitle: "The handover details are in Appendix M, pending the publication of Appendix N.",
    roast: "Your dossier is 94 pages long. The answer to who has the keys is on page 95 and marked confidential.",
    disposition: "ARCHIVED UNDER: HANDOVER DETAIL TO FOLLOW.",
  },
  "product-not-found": {
    title: "ERROR 404: PURPOSE & RISK FRAMEWORK NOT FOUND",
    subtitle: "A ticker, a CA, a vision and a Telegram group have been located. A defensible use case or a credible account of project risks has not.",
    roast: "The Department searched the executive summary, tokenomics and risk section. It found a use case-shaped hole and a rocket emoji.",
    disposition: "REFERRED TO THE OFFICE OF POST-LAUNCH PURPOSE AND RISK RECOVERY.",
  },
};

const sectors = [
  "AI-POWERED MEME INFRASTRUCTURE",
  "COMMUNITY-POWERED CULTURE / SOCIAL COORDINATION",
  "FROG-THEMED MEMECOIN / FINANCIAL SATIRE",
  "LORE-LED MEMECOIN / FUTURE-PHASE ROADMAP",
];
const architectures = [
  "DOCUMENTED SOLANA PROGRAM / TOKEN STANDARD",
  "PROPRIETARY LAUNCH STACK / TECHNICAL DETAILS WITHHELD",
  "OMNICHAIN / AI-NATIVE MEME SUPERSTRUCTURE",
  "PINNED ARCHITECTURE DIAGRAM / IMPLEMENTATION PENDING",
];
const consensusModels = [
  "SOURCE-LINKED LAUNCH / OWNERSHIP DOCUMENTATION",
  "NAMED OPERATOR / GOVERNANCE AND ACCESS CONTROLS",
  "COMMUNITY CONSENSUS / TRUST-THE-PROCESS RATIFICATION",
  "PINNED-POST SELF-CERTIFICATION / DETAILS COMING SOON",
];
const tokenModels = [
  "DEFINED TOKEN ROLE / TRANSPARENT MECHANICS",
  "COMMUNITY INCENTIVES / GOVERNANCE ROLE / LIMITS",
  "FUTURE UTILITY / PHASE 4 DEPENDENCY",
  "CULTURAL TICKER / PURPOSE STILL UNDEFINED",
];
const governanceModels = [
  "NAMED ROLES / PUBLIC RESPONSIBILITY MAP",
  "STAGED CTO HANDOVER / SCOPED PERMISSIONS",
  "COMMUNITY DECIDES / SUBJECT TO ADMIN APPROVAL",
  "KOL ADVISORY COUNCIL / IDENTITIES IN APPENDIX",
];
const adoptionModels = [
  "AI / AGENT-FOCUSED USERS / AUTOMATION NARRATIVE",
  "COMMUNITY CONTRIBUTORS / CULTURE PARTICIPATION",
  "MEME-CULTURE PARTICIPANTS / FROG-LED COMMUNITY",
  "LORE-FIRST HOLDERS / FUTURE-PHASE FOLLOWERS",
];
const riskPostures = [
  "DOCUMENTED RISK REGISTER / ACCESS CONTROLS / INCIDENT RESPONSE",
  "PUBLIC REVIEW / NAMED OWNERS / VERIFIABLE REMEDIATION",
  "DIFFUSED ACCOUNTABILITY / DECENTRALISATION CLAIM",
  "COMMUNITY CONVICTION / ROCKET-EMOJI RISK CONTROL",
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
  return slug.length >= 1 ? slug : "PROJECT-PENDING";
}

export function isValidWhitepaperAnswers(value: unknown): value is number[] {
  return Array.isArray(value) &&
    value.length === WHITEPAPER_QUESTIONS &&
    Array.from(value).every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4);
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
      !Array.from(answers).every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)) {
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
      { label: "DEPLOYER / ORIGINAL OPERATORS", percentage: 15, explanation: "A notional fictional allocation to the people named in the launch dossier. Ownership is not established." },
      { label: "EARLY LAUNCH WALLETS", percentage: 15, explanation: "An illustrative category for early buyers. It does not represent real wallets or bundle activity." },
      { label: "COMMUNITY RESERVE", percentage: 25, explanation: "A fictional community allocation with no live distribution or claim process." },
      { label: "KOL / MEDIA BUDGET", percentage: 10, explanation: "A parody line item for timeline amplification. It is not a paid-promotion offer." },
      { label: "LIQUIDITY ALLOCATION", percentage: 20, explanation: "A number in a fictional table, not actual liquidity or a market commitment." },
      { label: "TREASURY / OPERATIONS", percentage: 10, explanation: "A notional reserve whose custody and controls are not defined." },
      { label: "RISK / INCIDENT RESERVE", percentage: 5, explanation: "A token allocation cannot substitute for a response plan." },
    ],
    [
      { label: "COMMUNITY TAKEOVER TEAM", percentage: 25, explanation: "A fictional allocation for named operators, if any are ever identified." },
      { label: "LIQUIDITY ALLOCATION", percentage: 20, explanation: "Notional only. It does not create pool depth or guarantee an exit." },
      { label: "COMMUNITY CONTRIBUTORS", percentage: 20, explanation: "Illustrative support for people doing more than posting 'send it'." },
      { label: "TREASURY", percentage: 15, explanation: "A reserve awaiting a public responsibility and access map." },
      { label: "KOL / COMMUNICATIONS", percentage: 10, explanation: "A satirical category for narrative amplification, not an endorsement." },
      { label: "SECURITY / OPERATIONS", percentage: 10, explanation: "The checklist is fictional; actual permissions and risks are not assessed." },
    ],
    [
      { label: "COMMUNITY / HOLDER REWARDS", percentage: 35, explanation: "A fictional incentive pool. No eligibility, distribution or token claim exists." },
      { label: "TREASURY", percentage: 20, explanation: "The destination of funds pending a destination and a custodian." },
      { label: "LIQUIDITY ALLOCATION", percentage: 15, explanation: "A table entry is not a liquidity lock, depth or guarantee." },
      { label: "CTO / CONTRIBUTORS", percentage: 10, explanation: "A placeholder for operators and builders whose responsibilities remain to be defined." },
      { label: "KOL / COMMUNITY CAMPAIGNS", percentage: 10, explanation: "An invented communications category, not evidence of a real campaign." },
      { label: "RISK / INCIDENT RESERVE", percentage: 10, explanation: "A minimal allocation for a maximal amount of fictional confidence." },
    ],
    [
      { label: "PURPOSE TBD / NARRATIVE RESERVE", percentage: 40, explanation: "A placeholder pending the invention of a defensible token role." },
      { label: "TREASURY", percentage: 20, explanation: "A fictional reserve that is not yet sure what it is reserving for." },
      { label: "EARLY CONTRIBUTORS", percentage: 15, explanation: "The team, the community and the concept artists." },
      { label: "COMMUNITY", percentage: 10, explanation: "A community allocation for the community narrative." },
      { label: "LIQUIDITY ALLOCATION", percentage: 10, explanation: "An amount on a pie chart, not a promise of liquidity." },
      { label: "RISK / OPERATIONS", percentage: 5, explanation: "The appendix has accepted responsibility." },
    ],
  ];
  return models[tokenAnswer] ?? models[0];
}

function buildSections(
  projectLabel: string,
  narrative: string,
  sector: string,
  problemStatement: string,
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
      title: "EXECUTIVE LAUNCH ABSTRACT",
      eyebrow: "THE MEME / SUBJECT TO TIMELINE REVISION",
      paragraphs: [
        projectLabel + " is presented as a fictional Solana token narrative in " + sector.toLowerCase() + ". Its stated ambition is to address the following claimed gap: \"" + problemStatement + "\". The launch story is described as " + architecture.toLowerCase() + ".",
        "This document is a fictional whitepaper parody generated from a visitor's answers. It contains invented terminology and notional token allocations. It is not a technical specification, token offer, project disclosure or statement about an existing token, team or community.",
      ],
      bullets: ["Primary classification: " + profile.title, "Narrative clarity index: " + progress.productClarity + "/100", "Launch status: FICTIONAL / NOT INDEPENDENTLY VERIFIED"],
    },
    {
      number: "02",
      title: "NARRATIVE & INTENDED AUDIENCE",
      eyebrow: "THE CA HAS A STORY. DOES THE STORY HAVE A SOURCE?",
      paragraphs: [
        "The selected narrative is: \"" + narrative + "\". The Department has not verified that this narrative, the intended audience or the alleged demand exists. " + (progress.productClarity >= 60 ? "The answers suggest a specific community role, although independent evidence is still absent." : "The intended holder, user and practical purpose remain subject to clarification."),
        "No CT audience research, KOL disclosure review, holder survey or community activity sample has been conducted by this generator. A follower count, reply count or launch-day raid is not proof of durable demand.",
      ],
      bullets: ["Declared audience model: " + adoptionModel, "Demand validation: NOT PROVIDED", "KOL / promotion disclosures: NOT REVIEWED"],
    },
    {
      number: "03",
      title: "LAUNCH ROUTE & TOKEN MECHANICS",
      eyebrow: "THE DIAGRAM WOULD LOOK VERY CONFIDENT",
      paragraphs: [
        "The selected launch route is " + architecture.toLowerCase() + ". The fictional dossier assumes a launch path, a set of participants and a post-launch stage, but does not specify real programs, addresses, transaction signatures or technical implementation.",
        "A real launch record would distinguish deployer activity, early buyer distribution, sniper or bundle allegations, curve progress and the post-graduation pool. This generator inspects none of those things and supplies no chain data.",
      ],
      bullets: ["Launch route: " + architecture, "Wallet / transaction evidence: NOT ATTACHED", "Implementation status: NOT VERIFIED"],
    },
    {
      number: "04",
      title: "DEPLOYER, CTO & COMMUNITY CONTROL",
      eyebrow: "A NEW X BIO IS NOT A HANDOVER",
      paragraphs: [
        "The selected launch-and-ownership approach is " + consensus.toLowerCase() + ". This is a category chosen from the intake form, not proof that a deployer, community team, wallet custodian or operational handover exists.",
        "A real takeover record would identify who controls relevant permissions, who can publish updates, which responsibilities have changed and how disagreements are resolved. No team, wallet or access permission is inspected here.",
      ],
      bullets: ["Governance model: " + governanceModel, "Access / custody map: NOT PROVIDED", "Independent handover verification: NOT PERFORMED"],
    },
    {
      number: "05",
      title: "TOKENOMICS & NOTIONAL ALLOCATION",
      eyebrow: "A PIE CHART DOES NOT CREATE A POOL",
      paragraphs: [
        "The fictional token model is described as " + tokenModel.toLowerCase() + ". The following allocation is invented solely to parody the confident supply tables often found in token dossiers.",
        "The model uses a notional maximum supply of 1,000,000,000 fictional units. This number, the categories and every percentage are invented. They are not a token design, valuation, vesting schedule, holder distribution, lock or liquidity commitment.",
      ],
      bullets: ["Notional maximum supply: 1,000,000,000 FICTIONAL UNITS", "Token purpose: " + tokenModel, "Real circulating supply / valuation / vesting: NOT DEFINED"],
    },
    {
      number: "06",
      title: "CT, KOL & COMMUNITY DISTRIBUTION",
      eyebrow: "REACH IS NOT CORROBORATION",
      paragraphs: [
        "The selected audience model for " + projectLabel + " is " + adoptionModel.toLowerCase() + ". This generator does not monitor X, Telegram, KOL accounts, followers, paid calls, raids or wallet activity.",
        "Multiple accounts repeating the same CA or chart screenshot do not create independent confirmation. Any real promotion, campaign, payment or contributor relationship would need to be disclosed outside this fictional document.",
      ],
      bullets: ["Audience narrative: " + adoptionModel, "KOL / campaign source: NOT VERIFIED", "Community retention: NOT MEASURED"],
    },
    {
      number: "07",
      title: "POST-LAUNCH & CTO ROADMAP",
      eyebrow: "DELIVERY WINDOW: SOON™",
      paragraphs: [
        "The illustrative roadmap begins with a fictional CA launch, proceeds through curve and graduation questions, and reaches a community takeover or new narrative phase. Each phase depends on a named owner appearing before the next announcement.",
        "No dates, team commitments, launch results, migration details, pool depth or partner confirmations are provided. A real handover would require owners, access, scope, responsibilities and a public change log.",
      ],
      bullets: ["Phase 01: LAUNCH THREAD / SOURCE CHECK", "Phase 02: CURVE & GRADUATION / CONTEXT REQUIRED", "Phase 03: CTO HANDOVER / ACCESS NOT VERIFIED"],
    },
    {
      number: "08",
      title: "RISKS & LIMITATIONS",
      eyebrow: "THE FOOTNOTE THAT THE TIMELINE SKIPS",
      paragraphs: [
        "The selected risk posture is " + riskPosture.toLowerCase() + ". This generated dossier does not assess contract security, deployer permissions, wallet concentration, bundle behaviour, slippage, pool depth, promotion disclosure or operational resilience.",
        "All technical and market language is illustrative placeholder text. No real token, project, wallet, KOL, contract, launch or market has been inspected. The content must not be presented as evidence about an identifiable person or project.",
      ],
      bullets: ["Contract / permission risk: NOT ASSESSED", "Wallet / holder distribution: NOT ASSESSED", "Post-graduation liquidity / slippage: NOT ASSESSED", "KOL / promotion disclosure: NOT REVIEWED"],
    },
    {
      number: "09",
      title: "CONCLUSION",
      eyebrow: "THE DOSSIER IS COMPLETE. THE HANDOVER MAY NOT BE.",
      paragraphs: [
        projectLabel + " has received a complete fictional token dossier. The Department records the primary finding as: " + profile.title + ".",
        "The document is marked COMPLETE FOR ENTERTAINMENT PURPOSES ONLY. Actual ownership, supply, launch mechanics, contributors, product purpose, governance and market conditions remain outside this generated dossier.",
      ],
      bullets: ["Primary archetype: " + profile.title, "Secondary archetype: " + secondaryProfile.title, "Final disposition: DOSSIER FILED / NO REAL TOKEN VERIFIED"],
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
  const narrative = questions[0].options[answers[0]].label;
  const sector = sectors[answers[0]];
  const problemStatement = questions[1].options[answers[1]].label;
  const architecture = architectures[answers[2]];
  const consensus = consensusModels[answers[3]];
  const tokenModel = tokenModels[answers[4]];
  const governanceModel = governanceModels[answers[5]];
  const adoptionModel = adoptionModels[answers[0]];
  const riskPosture = riskPostures[answers[6]];
  const selected = answers.map((answer, index) => questions[index].options[answer]);
  const strongestClarity = selected.reduce((best, item, index) =>
    item.clarity > selected[best].clarity ? index : best, 0);
  const highestBuzzwords = selected.reduce((best, item, index) =>
    item.buzzwords > selected[best].buzzwords ? index : best, 0);
  const clarityItem = selected[strongestClarity];
  const buzzwordItem = selected[highestBuzzwords];
  const crossRead: DepartmentCrossRead = {
    headline: progress.productClarity <= 35 && progress.buzzwordDensity >= 65
      ? "THE ABSTRACT HAS A PRODUCT-SHAPED HOLE"
      : progress.productClarity >= 65 && progress.buzzwordDensity >= 65
        ? "CLEAR PRODUCT CLAIM / HEAVY NARRATIVE PACKAGING"
        : progress.productClarity >= 65 && progress.technicalDensity >= 65
          ? "THE DOSSIER CONTAINS A DEFINABLE CORE"
          : progress.buzzwordDensity >= 65
            ? "BUZZWORD DENSITY IS LEADING THE DOCUMENT"
            : "TECHNICAL / PRODUCT SIGNALS REMAIN MIXED",
    interpretation:
      "This fictional dossier scores " + progress.technicalDensity + "/100 technical density, " + progress.buzzwordDensity +
      "/100 buzzword density and " + progress.productClarity + "/100 product clarity. The comparison below pairs the clearest product answer with the most buzzword-heavy answer. Technical-sounding language is not treated as proof of implementation.",
    signals: [
      {
        label: "CLEAREST PRODUCT-CLARITY ANSWER",
        context: questions[strongestClarity].prompt,
        answer: clarityItem.label,
        detail: "Clarity " + clarityItem.clarity + "/5 · Technical " + clarityItem.technical + "/5 · Buzzwords " + clarityItem.buzzwords + "/5.",
      },
      {
        label: "HIGHEST BUZZWORD-DENSITY ANSWER",
        context: questions[highestBuzzwords].prompt,
        answer: buzzwordItem.label,
        detail: "Buzzwords " + buzzwordItem.buzzwords + "/5 · Technical " + buzzwordItem.technical + "/5 · Clarity " + buzzwordItem.clarity + "/5.",
      },
    ],
  };
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
  const sections = buildSections(projectLabel, narrative, sector, problemStatement, architecture, consensus, tokenModel, governanceModel, adoptionModel, riskPosture, progress, profile, secondaryProfile);

  return {
    ...progress,
    crossRead,
    answers: [...answers],
    projectSlug,
    projectLabel,
    sector,
    problemStatement,
    architecture,
    consensus,
    tokenModel,
    governanceModel,
    adoptionModel,
    riskPosture,
    narrative,
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
    "# " + result.projectLabel + " — FICTIONAL TOKEN DOSSIER",
    "",
    "**THE DYOR DEPARTMENT / EXIT LIQUIDITY DEPARTMENT**",
    "",
    "> FICTIONAL ENTERTAINMENT DOCUMENT. NOT A TECHNICAL SPECIFICATION, TOKEN OFFER, INVESTMENT DOCUMENT OR REAL PROJECT DISCLOSURE.",
    "",
    "- Case No.: " + result.caseNumber,
    "- Classification: " + result.profile.title,
    "- Secondary classification: " + result.secondaryProfile.title,
    "- Departmental finding: " + result.finding,
    "- Departmental disposition: " + result.profile.disposition,
    "- Claimed core problem: " + result.problemStatement,
    "- Technical density: " + result.technicalDensity + "/100",
    "- Buzzword density: " + result.buzzwordDensity + "/100",
    "- Product clarity: " + result.productClarity + "/100",
    "",
    "## " + result.profile.subtitle,
    "",
    result.profile.roast,
    "",
    "## BEHAVIOURAL CROSS-READ / SELECTED-ANSWER PATTERN",
    "",
    "**" + result.crossRead.headline + "**",
    "",
    result.crossRead.interpretation,
    "",
    ...result.crossRead.signals.flatMap((signal) => [
      "**" + signal.label + "**",
      signal.context,
      signal.answer,
      signal.detail,
      "",
    ]),
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
  const crossReadHtml = "<section><p class=\"eyebrow\">BEHAVIOURAL CROSS-READ / SELECTED-ANSWER PATTERN</p><h2>" + escape(result.crossRead.headline) + "</h2>" +
    "<p>" + escape(result.crossRead.interpretation) + "</p>" +
    result.crossRead.signals.map((signal) => "<article><p class=\"eyebrow\">" + escape(signal.label) + "</p><p>" + escape(signal.context) + "</p><p><strong>" + escape(signal.answer) + "</strong><br>" + escape(signal.detail) + "</p></article>").join("") +
    "</section>";
  const summaryHtml = "<section><p class=\"eyebrow\">DEPARTMENTAL FINDING</p><h2>" + escape(result.finding) + "</h2>" +
    "<p><strong>Primary classification:</strong> " + escape(result.profile.title) + "<br><strong>Secondary classification:</strong> " + escape(result.secondaryProfile.title) + "<br><strong>Departmental disposition:</strong> " + escape(result.profile.disposition) + "</p>" +
    "<p><strong>Claimed core problem:</strong> " + escape(result.problemStatement) + "</p>" +
    "<p><strong>Technical density:</strong> " + result.technicalDensity + "/100 · <strong>Buzzword density:</strong> " + result.buzzwordDensity + "/100 · <strong>Product clarity:</strong> " + result.productClarity + "/100</p>" +
    "<p>Notional supply: 1,000,000,000 fictional units. All scores and token allocations are invented.</p></section>";
  return "<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>" + escape(result.projectLabel + " — Fictional Token Dossier") + "</title><style>" +
    "body{margin:0;background:#eceee9;color:#20251f;font:16px/1.7 Georgia,serif}main{max-width:850px;margin:40px auto;padding:60px 72px;background:#fff;box-shadow:0 10px 40px #0001}header{border-bottom:3px solid #b6ff65;padding-bottom:28px;margin-bottom:36px}header small,.eyebrow{font:11px/1.5 monospace;letter-spacing:.12em;color:#687264}h1{font:800 42px/1.08 Arial,sans-serif;letter-spacing:-.04em}h2{font:700 25px/1.2 Arial,sans-serif;margin:8px 0 18px}h3{font:700 16px Arial,sans-serif}p{margin:0 0 16px}section{padding:24px 0;border-bottom:1px solid #dfe3dc}li{margin:6px 0}table{width:100%;border-collapse:collapse;margin:20px 0;font:13px Arial,sans-serif}td,th{padding:10px;border-bottom:1px solid #dfe3dc;text-align:left}th{background:#f2f4ee}.disclaimer{padding:18px;background:#f2f4ee;border-left:4px solid #b6ff65;font:12px/1.7 monospace}.toolbar{display:flex;justify-content:flex-end;gap:10px;margin:0 auto 16px;max-width:990px}.toolbar button{padding:12px 18px;border:0;background:#172016;color:#b6ff65;font:12px monospace;cursor:pointer}@media print{body{background:#fff}main{margin:0;padding:22mm 18mm;max-width:none;box-shadow:none}.toolbar{display:none}section{break-inside:avoid}h2{break-after:avoid}}@media(max-width:700px){main{margin:0;padding:28px 22px}h1{font-size:32px}}"+
    "</style></head><body><div class=\"toolbar\"><button onclick=\"window.print()\">PRINT / SAVE AS PDF</button></div><main><header><small>THE DYOR DEPARTMENT / EXIT LIQUIDITY DEPARTMENT / CASE " + escape(result.caseNumber) + "</small><h1>" + escape(result.projectLabel) + "<br>FICTIONAL TOKEN DOSSIER</h1><p>" + escape(result.profile.subtitle) + "</p><p class=\"disclaimer\">FICTIONAL ENTERTAINMENT DOCUMENT. NOT A TECHNICAL SPECIFICATION, TOKEN OFFER, INVESTMENT DOCUMENT OR REAL PROJECT DISCLOSURE.</p></header>" + summaryHtml + crossReadHtml + sectionHtml +
    "<section><p class=\"eyebrow\">TOKENOMICS / NOTIONAL MODEL</p><h2>FICTIONAL TOKEN ALLOCATION</h2><p>Notional supply: 1,000,000,000 fictional units. No real token or allocation is being described.</p><table><thead><tr><th>Category</th><th>Share</th><th>Departmental explanation</th></tr></thead><tbody>" + tableRows + "</tbody></table></section>" +
    "<p class=\"disclaimer\">This document is generated from selected answers for satire. No real project, token, contract, team, company, market, security or legal position has been inspected or verified. Do not present this output as an actual project whitepaper.</p></main></body></html>";
}
