export const DAILY_OFFICE_VERSION = 3;

export type DailyOfficeSection = {
  label: string;
  heading: string;
  body: string;
  stamp: string;
};

export type DailyOfficeReading = {
  label: string;
  score: number;
  assessment: string;
  tone: "green" | "red" | "amber";
};

export type DailyOfficeConvictionIndex = {
  score: number;
  classification: string;
  readings: DailyOfficeReading[];
  note: string;
};

export type DailyOfficeDispatch = {
  issueDate: string;
  reference: string;
  caseTheme: string;
  headline: string;
  subheading: string;
  bulletin: string;
  sections: DailyOfficeSection[];
  convictionIndex: DailyOfficeConvictionIndex;
  quote: string;
  assignedDepartment: string;
  disposition: string;
  footer: string;
  methodology: string;
};

const headlines = [
  "THE CA ARRIVED AT 02:13. THE THESIS ARRIVED THREE HOURS LATER.",
  "THE BONDING CURVE GRADUATED. THE GROUP CHAT DECLARED FINANCIAL INDEPENDENCE.",
  "THE DEPLOYER HAS GONE QUIET. THE NEW CTO HAS CHANGED THE BANNER.",
  "FOUR KOLS HAVE DISCOVERED THE SAME TICKER INDEPENDENTLY.",
  "THE FIRST GREEN CANDLE HAS BEEN PROMOTED TO A FIVE-YEAR PLAN.",
  "THE BUNDLE SCREENSHOT HAS BEEN FILED AS A COMMUNITY FAMILY PORTRAIT.",
  "THE POST-GRADUATION POOL HAS REQUESTED A SMALLER AUDIENCE.",
  "THE COMMUNITY TAKEOVER HAS ANNOUNCED A TAKEOVER OF THE TAKEOVER.",
  "THE KOL DELETED THE CALL. THE REPLIES HAVE PRESERVED IT FOR HISTORY.",
  "THE TIMELINE HAS FOUND A NEW 100X BEFORE FINISHING THE LAST POST-MORTEM.",
  "THE CA WAS VERIFIED BY THREE ACCOUNTS THAT ALL COPIED THE SAME SOURCE.",
  "THE CTO SPACE HAS STARTED. THE ACCESS CHECKLIST HAS NOT.",
  "THE TOP WALLET GRAPH HAS BEEN CROPPED TO IMPROVE THE OUTLOOK.",
  "THE EXIT PLAN HAS BEEN FOUND INSIDE THE ORIGINAL LAUNCH THREAD.",
  "THE GREEN CANDLE HAS CLOSED. THE COMMUNITY IS STILL WRITING THE CAPTION.",
  "THE SNIPER THEORY HAS BEEN UPGRADED TO AN OFFICIAL COMMUNITY NARRATIVE.",
  "THE MIGRATION SCREENSHOT HAS BEEN MISTAKEN FOR A GUARANTEE OF DEMAND.",
  "THE BAGHOLDER HAS REQUESTED THAT THE ENTRY PRICE BE RECOGNISED AS A HISTORICAL EVENT.",
];

const bulletins = [
  "The Pump.fun desk reports another fictional CA launch. The ticker was available before the explanation.",
  "The bonding curve reached its milestone. The Department reminds visitors that graduation is not a promise of durable demand.",
  "CT Intelligence identified six identical KOL calls and one missing original source.",
  "The fictional deployer has stopped posting. A new CTO account has inherited the profile banner and the unanswered questions.",
  "A bundle-wallet diagram has been described as organic demand. Ownership and coordination remain unestablished.",
  "The post-graduation pool has been reviewed. The slippage estimate has asked to remain anonymous.",
  "A Telegram moderator has posted 'all good'. No further detail was supplied.",
  "The same CA has appeared in three quote-posts, two Spaces and one emergency community poll.",
  "The Department has received a green-candle screenshot with the timeframe carefully removed.",
  "A new community takeover has been announced. The key custody and responsibility map remain pending.",
  "The KOL desk has separated follower count from independent corroboration. Several accounts have appealed.",
  "The launch thread now contains a roadmap, a roadmap update and a future roadmap update.",
  "Early fictional wallets have moved. The timeline has assigned motive before locating the source.",
  "The next 100x search continues while the last 100x post-mortem remains open.",
  "The post-graduation chart is red. The community has voted to rename the colour 'healthy rotation'.",
  "A new token purpose has been promised for Phase 4. Phase 4 has requested a date.",
  "Exit readiness has been classified as NOT DETECTED. The group chat has requested a more positive label.",
  "The Department's daily numbers are synthetic. The only real thing in this briefing is the confidence of the punctuation.",
];

const incidents = [
  {"heading":"THE CA THAT ARRIVED BEFORE THE CONTEXT","body":"A fictional mint address was posted at 02:13 UTC and copied into several group chats. The launch thread supplied a ticker, three rocket emojis and no verifiable explanation of who controlled the deployer wallet.","stamp":"LAUNCH / CONTEXT REQUESTED"},
  {"heading":"THE BUNDLE FAMILY PHOTO","body":"A fictional cluster of early wallets was arranged into a graphic and labelled organic community demand. No independent evidence of common ownership or motive was supplied.","stamp":"WALLET CLUSTER / OWNERSHIP UNKNOWN"},
  {"heading":"THE GRADUATION PARTY WITH NO EXIT PLAN","body":"The fictional bonding curve completed and the group chat declared the mission accomplished. The review found that nobody had discussed what the graduation milestone did not establish.","stamp":"GRADUATION / CELEBRATION PREMATURE"},
  {"heading":"THE CTO BANNER AND THE MISSING KEYS","body":"A fictional deployer went silent and a new CTO account appeared. The community inherited the ticker, the memes and a list of access questions that were not answered by changing the banner.","stamp":"CTO / ACCESS REVIEW PENDING"},
  {"heading":"THE KOL SCREENSHOT RELAY","body":"Several fictional accounts posted the same CA and chart crop while describing the call as independent research. The original source could not be located in the reply chain.","stamp":"CT INTELLIGENCE / SOURCE NOT LOCATED"},
  {"heading":"THE POST-GRADUATION PUDDLE","body":"The fictional pool was reviewed after graduation. The committee discovered that a milestone badge had been used as a substitute for discussing depth, slippage and holder distribution.","stamp":"POOL / DEPTH REQUIRES CONTEXT"},
  {"heading":"THE SNIPER FAMILY REUNION","body":"A cluster of fictional early buys was presented as a coordinated sniper operation. The Department could not establish common ownership, but the arrows were exceptionally persuasive.","stamp":"SNIPER THEORY / NOT VERIFIED"},
  {"heading":"THE DELETED CALL PRESERVATION ORDER","body":"A fictional KOL deleted an earlier call and returned with a new thesis. The community had already saved the original screenshot and assigned it historical importance.","stamp":"CALL / ORIGINAL IMAGE PRESERVED"},
  {"heading":"THE 100X ENTRY TIMING REVIEW","body":"The applicant entered after a large green candle and described the timing as disciplined patience. The earlier entries had already moved to a different group chat.","stamp":"ENTRY / LATE BUT CONFIDENT"},
  {"heading":"THE TELEGRAM MODERATOR LAST SEEN AT 03:17","body":"The community requested confirmation that the deployer was still building. The only reply was a green online dot and the phrase 'team is cooking'.","stamp":"MODERATOR / REASSURANCE NOT EVIDENCE"},
  {"heading":"THE GREEN-CANDLE EVIDENCE REVIEW","body":"A cropped chart annotation was presented as confirmation of a thesis. The original source, timeframe and later candles were not included, but the arrow was exceptionally vivid.","stamp":"CHART / CONTEXT NOT ATTACHED"},
  {"heading":"THE MIGRATION SCREENSHOT MISUNDERSTANDING","body":"A fictional migration image circulated as proof that the next stage was inevitable. The Department recorded it as evidence that a screenshot had been shared, and nothing more.","stamp":"MIGRATION / CLAIM EXCEEDS EVIDENCE"},
  {"heading":"THE REVENGE-ENTRY REPEAT OFFENDER","body":"After missing the first move, the subject entered a second fictional token because the previous ticker had become emotionally unavailable. The entry thesis referenced a green candle and a familiar KOL.","stamp":"RE-ENTRY / MOTIVE CLASSIFIED AS FOMO"},
  {"heading":"THE EXIT PLAN DISCOVERY FAILURE","body":"A review of the fictional entry dossier found forty-six pages of research and no documented exit condition. The missing page has been reported as a formatting issue.","stamp":"EXIT PLAN / NOT ATTACHED"},
];

const memos = [
  {"heading":"INTERNAL MEMO / GRADUATION IS NOT A GUARANTEE","body":"A completed bonding curve is a launch milestone, not proof of durable demand, holder distribution or a healthy post-graduation pool. Do not use the word adoption without defining what was adopted.","stamp":"PUMP.FUN DESK / TERMS CLARIFIED"},
  {"heading":"INTERNAL MEMO / A KOL REPOST IS NOT A SECOND SOURCE","body":"Multiple accounts repeating the same CA, screenshot or catalyst do not create independent confirmation. Locate the original source before describing a claim as corroborated.","stamp":"CT INTELLIGENCE / SOURCE REQUIRED"},
  {"heading":"INTERNAL MEMO / A NEW CTO BIO IS NOT A HANDOVER","body":"A changed X handle, banner or pinned post does not establish control of wallets, permissions, domains or project operations. Name the people and document the responsibilities.","stamp":"TAKEOVER DESK / ACCESS REQUIRED"},
  {"heading":"INTERNAL MEMO / PLEASE DEFINE 'SOON'","body":"Soon is not a date, quarter, time zone or delivery guarantee. Every recovery phase must name an owner, an observable deliverable and an acceptance condition.","stamp":"CTO OFFICE / CALENDAR REQUIRED"},
  {"heading":"INTERNAL MEMO / THE CA IS NOT THE THESIS","body":"A mint address identifies a token. It does not establish product purpose, holder quality, independent demand or the accuracy of a promotional thread.","stamp":"LAUNCH DESK / PURPOSE REQUIRED"},
  {"heading":"INTERNAL MEMO / A BUNDLE LABEL IS NOT PROOF","body":"Wallet proximity, similar timing or a diagram does not establish common ownership or intent. Label all fictional examples clearly and do not make allegations about real addresses.","stamp":"WALLET DESK / CONTEXT REQUIRED"},
  {"heading":"INTERNAL MEMO / THE EXIT PLAN IS NOT A FUTURE PHASE","body":"The exit condition must not be replaced by a price target, a KOL quote or a belief that the next community update will change the chart.","stamp":"BAGHOLDER OFFICE / EXIT REQUIRED"},
  {"heading":"INTERNAL MEMO / DO NOT CONFUSE REACH WITH DEMAND","body":"Follower count, impressions, Spaces attendance and a trending badge are not interchangeable with repeat use, independent interest or durable community participation.","stamp":"COMMUNITY DESK / DEFINITIONS REQUIRED"},
  {"heading":"INTERNAL MEMO / THE GREEN CANDLE IS NOT A BUSINESS PLAN","body":"A chart movement may trigger a post. It does not establish a working product, token purpose or a successful handover. Please stop writing milestones in candle colours.","stamp":"RESEARCH DESK / EVIDENCE REQUIRED"},
  {"heading":"INTERNAL MEMO / NO REAL WALLETS ARE MONITORED","body":"The daily briefing may describe fictional wallet clusters and imaginary transactions. It does not inspect chain activity, real addresses, tokens, holders or visitor behaviour.","stamp":"ON-CHAIN DESK / FICTION ONLY"},
];

const kolHeadings = [
  "THE INDEPENDENT KOL CONSENSUS INCIDENT",
  "THE SAME-CA SCREENSHOT RELAY",
  "THE SOURCES CITING EACH OTHER",
  "THE VERIFIED BADGE ECHO CHAMBER",
  "THE ORIGINALITY REVIEW",
  "THE BREAKING CALL THAT WAS NOT ORIGINAL",
  "THE PAID-SHILL DISCLOSURE ABSENCE",
  "THE 100X THREAD REPOSTING EXERCISE",
];

const kolClaims = [
  "the same CA and green-candle crop",
  "an identical 'still early' thesis",
  "a claim attributed to an unnamed insider",
  "a bonding-curve screenshot without a timestamp",
  "the phrase 'smart money is accumulating'",
  "a screenshot of another account's screenshot",
  "a CTO announcement with no named operators",
  "an unexplained reference to an exchange listing",
  "a price target with no invalidation point",
  "a rumour citing a second rumour as confirmation",
  "a CA posted by four accounts that each claim to have found it first",
  "a graduation badge presented as proof of durable demand",
  "a bundle-wallet diagram with no source for the labels",
  "a KOL call repeated word-for-word by several supposedly independent accounts",
];

const kolTimings = [
  "within nine minutes",
  "during the same fourteen-minute window",
  "before the original post could be independently checked",
  "across three consecutive timeline refreshes",
  "between one Spaces session and the next",
  "before any primary source was located",
  "almost immediately after the first account posted",
  "before the CA thread finished loading",
];

const kolInterpretations = [
  "independent confirmation",
  "a distributed CT consensus event",
  "organic narrative convergence",
  "evidence of unusually aligned research",
  "a multi-account validation cluster",
  "the timeline's version of peer review",
  "a strong signal that the same sentence is popular",
  "a confidence multiplier with no known denominator",
];

const kolCaveats = [
  "The common source has been classified as a secondary detail.",
  "No primary-source verification was requested; the badges were visually reassuring.",
  "Potential group-chat coordination remains outside the current scope of optimism.",
  "The Department has chosen not to distinguish reach from evidence.",
  "A verification badge confirms account status, not the accuracy of the account's opinion.",
  "The original CA claim remains unverified and unusually well shared.",
  "The source trail has been moved to a future phase pending alignment.",
  "The committee has confused repetition with corroboration and is comfortable with the result.",
];

const onChainHeadings = [
  "THE BUNDLE WALLET INTERPRETATION EXERCISE",
  "THE EARLY-BUY CLUSTER DISCOVERY",
  "THE SNIPER-TO-THESIS CONVERSION",
  "THE UNKNOWN DEPLOYER OWNER CONFIDENCE EVENT",
  "THE POST-GRADUATION TRANSFER REVIEW",
  "THE GREAT WALLET LABEL DEBATE",
  "THE ADDRESS WITH A VERY CONVENIENT STORY",
  "THE HOLDER DISTRIBUTION CONTEXT FAILURE",
];

const walletEvents = [
  "a fictional deployer wallet funding several fresh wallets shortly before launch",
  "a cluster of early buys presented as unrelated buyers without supporting context",
  "a post-graduation transfer that CT immediately labels a coordinated exit",
  "a wallet graph with labels supplied by an anonymous timeline account",
  "several small launch buys grouped into one persuasive 'organic demand' graphic",
  "a transfer between two addresses with matching fictional launch patterns",
  "a large transfer to a fresh address whose owner is unknown",
  "a group of early wallet movements arranged into a family portrait",
  "one wallet sending tokens to another wallet with a presentation arrow",
  "several small transfers arranged into a chart with a very confident title",
  "a wallet moving funds shortly before the community noticed the five-minute candle",
  "an address labelled 'smart money' by a source that was not identified",
  "a balance change with no confirmed link to the fictional deployer",
  "a series of movements whose common ownership has not been established",
  "a transfer that looks significant when the timeframe is hidden",
];

const walletInterpretations = [
  "bundle coordination",
  "early positioning",
  "sniper accumulation",
  "strategic distribution",
  "community takeover funding",
  "long-term conviction",
  "a sign that the fictional holder base is expanding",
  "a bullish signal that requires no further context",
];

const walletCaveats = [
  "Common ownership has not been established; the arrows are editorial decoration.",
  "The address labels are fictional and have not been independently verified.",
  "A transfer is evidence of movement, not evidence of motive.",
  "The graph contains connections. The Department has supplied the narrative.",
  "No claim is made about real wallets, token flows or market participants.",
  "The possibility of unrelated buyers has been retained in a footnote.",
  "Wallet concentration has been noted, then carefully moved outside the headline.",
  "The transaction path is visible; the explanation remains an administrative preference.",
];

const riskHeadings = [
  "THE POST-GRADUATION EXIT-LIQUIDITY REVIEW",
  "THE BUNDLE-RISK RECLASSIFICATION",
  "THE DEPLOYER-ACCESS DISCLOSURE EXERCISE",
  "THE DOWNSIDE-BY-REBRANDING PROTOCOL",
  "THE RED FLAG COLOUR CONSULTATION",
  "THE HOLDER-CONCENTRATION REVIEW",
  "THE CTO HANDOVER EXPOSURE MEETING",
  "THE EMERGENCY PATIENCE CLASSIFICATION",
];

const riskFlags = [
  "an exit route narrower than the KOL confidence statement",
  "post-graduation pool assumptions that depend on everyone leaving politely",
  "a holder concentration chart hidden below a cheerful banner",
  "deployer permissions that require more than a reassuring bio",
  "a wallet cluster presentation with no ownership evidence",
  "a launch date with no named operator",
  "a risk disclosure written in a font smaller than the 100x target",
  "a CTO handover with no measurable access checklist",
  "a community thesis that relies on one repeated KOL source",
  "a graduation badge treated as a guarantee of post-launch liquidity",
  "a launch bundle presented as proof of organic demand",
  "a takeover with no responsibility map",
  "a KOL call with no disclosure and no original research link",
  "a price target presented as a project milestone",
  "an exit strategy that currently exists as an intention",
];

const riskReframes = [
  "a long-term resilience opportunity",
  "a temporary post-graduation education event",
  "an advanced patience requirement",
  "a decentralised lesson in market structure",
  "a non-critical narrative fluctuation",
  "a community-led holding exercise",
  "a strategic waiting room",
  "a future-proofing challenge for the conviction framework",
];

const riskMitigations = [
  "rename the exposure as a community allocation and revisit the wording next quarter",
  "add a footnote and retain the original confidence level",
  "request an update from the channel that announced the previous update",
  "monitor the situation until monitoring itself becomes a milestone",
  "ask the committee to produce a chart with a less alarming colour",
  "move the unresolved item into a future phase and mark the phase as active",
  "keep the exit plan in draft until the pool becomes more cooperative",
  "issue a reminder that the Department does not provide financial advice",
];

const postMortemHeadings = [
  "THE THESIS PRESERVATION REPORT",
  "THE BAGHOLDER INCIDENT REVIEW",
  "THE POST-GRADUATION OUTCOME RECLASSIFICATION",
  "THE EXIT STRATEGY ABSENCE REPORT",
  "THE KOL-CALL MEMORY REVIEW",
  "THE CTO CONVICTION CONTINUITY ASSESSMENT",
  "THE AFTER-ACTION NARRATIVE",
  "THE LOSS-ADJACENT ADMINISTRATIVE REVIEW",
];

const postMortemEvents = [
  "the fictional token fell faster than the timeline could refresh",
  "the deployer stopped posting and the CTO inherited the unanswered questions",
  "the post-graduation pool became a damp memory",
  "the most confident wallet stopped providing helpful screenshots",
  "the KOL group changed its preferred narrative",
  "the exit plan was found in the same folder as the unfinished handover",
  "the community moved from 'still early' to 'long-term believers' without changing the pinned post",
  "the launch catalyst arrived, but it was not the catalyst described in the KOL thread",
  "early fictional wallets distributed while the community celebrated the milestone",
  "the chart stopped validating the original CA thesis",
];

const postMortemReframes = [
  "moving the original thesis into a longer time horizon",
  "reclassifying the loss as an involuntary holding period",
  "recording the event as a post-graduation liquidity lesson",
  "marking the outcome as a strategic delay rather than a failed call",
  "changing the reference point to the highest hypothetical candle",
  "finding that conviction remained stable after the wallet labels changed",
  "renaming the missed exit 'community support'",
  "declaring the narrative structurally intact",
];

const postMortemLessons = [
  "No team member has been authorized to use the word mistake.",
  "The post-mortem has recommended better charts on the next KOL thread.",
  "The original research remains archived; the conclusion has been moved to a private appendix.",
  "A future review will determine whether the future review is necessary.",
  "The exit button has been added to the interface for observational purposes only.",
  "The case remains open until CT apologizes.",
  "All evidence contradicting the thesis has been filed under 'post-graduation context'.",
  "The Department has renewed its subscription to patience.",
];

const quotes = [
  "WE ARE NOT LATE. WE ARE OPERATING IN A DIFFERENT TIMEFRAME.",
  "THE BONDING CURVE GRADUATED. THE EXIT PLAN DID NOT.",
  "A KOL REPOST IS NOT A SECOND SOURCE.",
  "THE DEPLOYER MOVED. THE COMMUNITY MOVED THE GOALPOSTS.",
  "THE FIRST GREEN CANDLE IS NOT A BUSINESS PLAN.",
  "THE CTO BANNER CHANGED. THE ACCESS CHECKLIST DID NOT.",
  "DO NOT CONFUSE A CA WITH A THESIS.",
  "THE POOL IS TEMPORARY. THE SCREENSHOTS ARE FOREVER.",
  "A GRADUATION BADGE IS NOT A LIQUIDITY GUARANTEE.",
  "WE HAVE CONFIRMED THAT THE SAME SCREENSHOT IS HAPPENING EVERYWHERE.",
  "THE WALLET MOVED. THE TIMELINE ASSIGNED A MOTIVE.",
  "THE 100X HAS BEEN ANNOUNCED. THE SOURCE HAS NOT.",
  "THE POST-MORTEM FOUND THAT THE CONVICTION SURVIVED THE EVIDENCE.",
  "THE DEPARTMENT HAS BEEN ASSURED THAT THE NEXT CTO UPDATE IS THE UPDATE.",
];

const departments = [
  "PUMP.FUN LAUNCH & CURVE DESK",
  "CT INTELLIGENCE / KOL SOURCE VALIDATION",
  "DEPARTMENT OF POST-GRADUATION LIQUIDITY",
  "DEPLOYER & CTO HANDOVER OFFICE",
  "BUREAU OF BUNDLE-WALLET INTERPRETATION",
  "COMMUNITY-BASED REASSURANCE UNIT",
  "OFFICE OF CA PURPOSE & TOKEN NARRATIVE",
  "COMMITTEE FOR RECURSIVE COMMUNITY TAKEOVERS",
  "KOL INTELLIGENCE AND SOCIAL VALIDATION",
  "ON-CHAIN INTERPRETATION AND ARROW MANAGEMENT",
  "RISK RECLASSIFICATION / EXIT READINESS",
  "BAGHOLDER POST-MORTEM DIVISION",
];

const dispositions = [
  "FILED WITHOUT A DELIVERY DATE.",
  "REFERRED TO A FUTURE CTO PHASE.",
  "CLOSED PENDING A FURTHER COMMUNITY UPDATE.",
  "ESCALATED TO THE OFFICE OF SOON.",
  "APPROVED FOR FURTHER CT DISCUSSION.",
  "RETURNED TO THE HANDOVER THREAD FOR REVIEW.",
  "PRESERVED AS AN EXAMPLE OF CONFIDENT KOL LANGUAGE.",
  "DECLARED COMPLETE / OWNERSHIP NOT VERIFIED.",
  "RECLASSIFIED AS A POST-GRADUATION CONVICTION EVENT.",
  "RETAINED IN THE ARCHIVE UNTIL THE DEPLOYER REPLIES.",
];

const methodology =
  "This dispatch follows one coherent, date-selected editorial case route. Its headline, bulletin, incident, KOL note, wallet interpretation, risk review, internal memo and post-mortem are selected from compatible topic pools and reinforced with focus-specific operational detail. All reports, wallet scenarios, KOL signals, scores and post-mortems are fictional. No AI factual research, external feed, live market data, real token, wallet, project, person or visitor activity is used.";


type EditorialFocus =
  | "launch"
  | "graduation"
  | "handover"
  | "kol"
  | "chart"
  | "wallet"
  | "liquidity"
  | "exit"
  | "migration";

type EditorialFocusPool = {
  kolHeading: number[];
  kolClaim: number[];
  kolCaveat: number[];
  walletHeading: number[];
  walletEvent: number[];
  walletCaveat: number[];
  riskHeading: number[];
  riskFlag: number[];
  memo: number[];
  postMortemHeading: number[];
  postMortemEvent: number[];
  department: number[];
  disposition: number[];
  quote: number[];
};

const editorialFocusPools: Record<EditorialFocus, EditorialFocusPool> = {
  launch: {
    kolHeading: [1, 5],
    kolClaim: [0, 6, 10],
    kolCaveat: [0, 5, 7],
    walletHeading: [3, 7],
    walletEvent: [0, 5, 6, 13],
    walletCaveat: [1, 2, 4],
    riskHeading: [2, 6],
    riskFlag: [5, 7, 11, 12],
    memo: [4, 9],
    postMortemHeading: [0, 6],
    postMortemEvent: [7, 9],
    department: [0, 6],
    disposition: [0, 4, 7],
    quote: [6, 11],
  },
  graduation: {
    kolHeading: [3, 6],
    kolClaim: [3, 11],
    kolCaveat: [4, 5, 6],
    walletHeading: [4, 7],
    walletEvent: [2, 4, 8],
    walletCaveat: [2, 4, 6],
    riskHeading: [0, 5],
    riskFlag: [1, 9, 10],
    memo: [0, 6],
    postMortemHeading: [2, 3],
    postMortemEvent: [2, 8, 9],
    department: [2, 10],
    disposition: [2, 8],
    quote: [1, 8],
  },
  handover: {
    kolHeading: [5, 7],
    kolClaim: [6, 7],
    kolCaveat: [2, 5, 6],
    walletHeading: [3, 6],
    walletEvent: [0, 6, 7],
    walletCaveat: [0, 1, 4],
    riskHeading: [2, 6],
    riskFlag: [3, 7, 11],
    memo: [2, 3],
    postMortemHeading: [5, 6],
    postMortemEvent: [1, 5],
    department: [3, 7],
    disposition: [1, 5, 9],
    quote: [3, 5, 13],
  },
  kol: {
    kolHeading: [0, 1, 2, 4, 5, 6, 7],
    kolClaim: [0, 5, 9, 13],
    kolCaveat: [0, 1, 3, 4, 7],
    walletHeading: [1, 7],
    walletEvent: [3, 9, 13],
    walletCaveat: [1, 3, 6],
    riskHeading: [4, 5],
    riskFlag: [7, 8, 12],
    memo: [1, 7],
    postMortemHeading: [4, 6],
    postMortemEvent: [4, 7],
    department: [1, 8],
    disposition: [4, 6],
    quote: [2, 9, 11],
  },
  chart: {
    kolHeading: [4, 7],
    kolClaim: [4, 8, 9],
    kolCaveat: [0, 3, 4, 7],
    walletHeading: [2, 6],
    walletEvent: [9, 14],
    walletCaveat: [2, 3, 7],
    riskHeading: [4, 7],
    riskFlag: [6, 13, 14],
    memo: [8],
    postMortemHeading: [0, 3, 7],
    postMortemEvent: [0, 9],
    department: [6, 11],
    disposition: [0, 8],
    quote: [4, 12],
  },
  wallet: {
    kolHeading: [1, 3, 7],
    kolClaim: [10, 11, 12],
    kolCaveat: [2, 5, 7],
    walletHeading: [0, 1, 5, 6, 7],
    walletEvent: [1, 3, 4, 5, 7, 8, 13],
    walletCaveat: [0, 1, 3, 5, 6],
    riskHeading: [1, 5],
    riskFlag: [2, 4, 9, 10],
    memo: [5, 9],
    postMortemHeading: [1, 2],
    postMortemEvent: [3, 8, 9],
    department: [4, 9],
    disposition: [6, 7],
    quote: [10, 11],
  },
  liquidity: {
    kolHeading: [3, 6],
    kolClaim: [1, 3, 11],
    kolCaveat: [1, 4, 5],
    walletHeading: [4, 7],
    walletEvent: [2, 4, 8],
    walletCaveat: [2, 4, 7],
    riskHeading: [0, 5, 7],
    riskFlag: [0, 1, 9, 14],
    memo: [0, 6],
    postMortemHeading: [2, 7],
    postMortemEvent: [2, 8],
    department: [2, 10],
    disposition: [2, 8],
    quote: [1, 8],
  },
  exit: {
    kolHeading: [4, 7],
    kolClaim: [4, 8, 9],
    kolCaveat: [0, 3, 7],
    walletHeading: [1, 4],
    walletEvent: [4, 9, 14],
    walletCaveat: [0, 2, 6],
    riskHeading: [0, 3, 5],
    riskFlag: [0, 1, 6, 14],
    memo: [6, 8],
    postMortemHeading: [3, 7],
    postMortemEvent: [0, 5, 6],
    department: [10, 11],
    disposition: [0, 8, 9],
    quote: [1, 4, 12],
  },
  migration: {
    kolHeading: [3, 5],
    kolClaim: [6, 7, 11],
    kolCaveat: [1, 4, 6],
    walletHeading: [4, 6],
    walletEvent: [2, 4, 6, 13],
    walletCaveat: [0, 1, 2, 4],
    riskHeading: [2, 6],
    riskFlag: [3, 9, 11],
    memo: [0, 2],
    postMortemHeading: [2, 5],
    postMortemEvent: [1, 2, 7],
    department: [3, 7],
    disposition: [1, 5, 9],
    quote: [3, 5, 8],
  },
};

type EditorialDepthPool = {
  incident: string[];
  kol: string[];
  wallet: string[];
  risk: string[];
  memo: string[];
  postMortem: string[];
};

/**
 * Focus-specific operational details make each fictional dispatch read like
 * a recognisable trenches incident rather than a generic crypto paragraph.
 * Every item is illustrative copy, not a claim about a real token or actor.
 */
const editorialDepthPools: Record<EditorialFocus, EditorialDepthPool> = {
  launch: {
    incident: [
      "The intake record contains a mint address and a posting time, but no traceable path from the original announcement to the accounts repeating it.",
      "The fictional launch thread supplied a ticker before it supplied a named use case, a deployer explanation or a link to primary project material.",
      "The first screenshot showed a CA. The follow-up record still could not establish who controlled the deployer or who had verified the address.",
    ],
    kol: [
      "The source trail runs from one anonymous call to three quote-posts that cite one another; the file therefore records one claim with three amplifiers, not three confirmations.",
      "The earliest visible post contains the same cropped CA card later described as independent discovery by several fictional accounts.",
      "The desk found no primary announcement behind the repeated call. Each repost added confidence language, but none added a source.",
    ],
    wallet: [
      "Where applicable, mint authority, freeze authority and metadata-update control are separate questions; the fictional thread bundled them into one reassuring word: verified.",
      "The wallet graphic labels early buyers as a coordinated launch group, but the file contains no established common owner or funding relationship.",
      "A first-buyer list was treated as proof of deployer alignment. The record establishes only that the illustrated addresses appeared early in the fictional scenario.",
    ],
    risk: [
      "The review separates token identification, authority controls and deployer identity. A CA by itself answers none of the other questions.",
      "The main exposure is a source gap: the launch narrative depends on claims that cannot be traced beyond reposts and an unattributed screenshot.",
      "No conclusion about ownership or coordination is supported by the fictional launch graphic; the committee has been instructed to stop turning arrows into evidence.",
    ],
    memo: [
      "Required intake fields remain the original announcement, the exact mint, the stated token purpose and any applicable authority disclosures; a ticker and a CA are not a completed due-diligence record.",
      "The launch register must distinguish what the fictional source actually shows from what the group chat inferred after reading it.",
    ],
    postMortem: [
      "The final file contains one traceable launch post and several copies. The committee has reduced its source count from five to one without reducing its confidence.",
      "The CA survived every screenshot crop. The original explanation did not survive the first request for a source link.",
    ],
  },
  graduation: {
    incident: [
      "The fictional bonding-curve completion was treated as the finish line. The post-graduation pool, migration record and available depth were left for a future committee.",
      "The celebration began when the progress indicator reached its milestone; the incident review began when the group asked what the milestone actually established.",
      "A migration screenshot circulated as proof of durable demand, although the file contained no separate review of the resulting pool or its trading depth.",
    ],
    kol: [
      "The KOL thread uses the graduation badge as its central proof point, then cites other posts using the same badge as independent confirmation.",
      "Several fictional calls describe graduation as adoption. None defines a user action, repeat activity or other evidence behind that word.",
      "The original call stops at the milestone. Every later repost adds a larger target but no new information about the post-graduation pool.",
    ],
    wallet: [
      "The fictional migration diagram shows a destination pool, but it does not establish the depth available at a particular trade size or the distribution of holders.",
      "Early-wallet movement after graduation is presented as coordinated distribution; the file has no verified ownership map or evidence of motive.",
      "The screenshot records a migration event. The bullish caption quietly upgrades that event into a claim about future demand.",
    ],
    risk: [
      "Graduation, pool depth, slippage and holder concentration are separate questions. The report marks the first as an event, not an answer to the other three.",
      "A displayed market-cap figure cannot substitute for an assessment of executable liquidity in the fictional post-graduation pool.",
      "The risk committee found that the celebratory language describes a milestone while the unanswered questions concern what happened after it.",
    ],
    memo: [
      "Every graduation report must keep the milestone, migration and post-graduation pool review in separate fields; completing one does not complete the others.",
      "The word liquidity may not be used as a synonym for a graduation badge, a market-cap screenshot or a crowded celebration thread.",
    ],
    postMortem: [
      "The retrospective confirms that the curve completed on schedule. It does not confirm that the community's assumptions about the next stage did.",
      "The party invitation listed graduation as the outcome. The post-mortem lists it as the first line of a longer unanswered report.",
    ],
  },
  handover: {
    incident: [
      "The fictional CTO announcement changed the account biography and banner, while the incident register still showed unanswered questions about treasury custody, repository access and domain control.",
      "The community inherited the ticker and social account before it could identify who held the operational keys or who was responsible for the next release.",
      "A new takeover team published a roadmap, but the incident file contained no named owners for the codebase, treasury, website or moderation permissions.",
    ],
    kol: [
      "The takeover announcement is repeated as a confirmed handover even though the cited source is the new team's own announcement and no independent access record is attached.",
      "The timeline treats a new X handle as evidence of operational control. The source file contains no separate confirmation of who can ship code or move treasury assets.",
      "The KOL summary says the project is back. The quoted evidence establishes only that a new account has started posting.",
    ],
    wallet: [
      "A changed deployer narrative does not establish control of the old deployer wallet, treasury addresses or any permissions attached to the fictional project.",
      "The takeover graphic connects several wallets to the new team, but labels and arrows are not proof that the keys have changed hands.",
      "The access review distinguishes public-facing accounts from signing authority; the fictional file has evidence for the former and no verified record for the latter.",
    ],
    risk: [
      "The handover remains incomplete until responsibility for treasury, code, domains, deployer permissions and community channels is recorded separately.",
      "A continuity promise without named operators, access boundaries and a verifiable release process is still a promise, even when the banner looks professionally redesigned.",
      "The greatest fictional exposure is a responsibility gap: every participant assumes another person controls the critical account.",
    ],
    memo: [
      "The handover register requires a named owner, access status and acceptance record for each critical asset; a pinned post is not a custody receipt.",
      "A takeover update must distinguish social-account continuity from control of code, domains, treasury and permissions.",
    ],
    postMortem: [
      "The retrospective found that the community transferred the narrative faster than it transferred operational responsibility.",
      "The new team inherited the memes on day one. The access checklist is still waiting for its first confirmed owner.",
    ],
  },
  kol: {
    incident: [
      "The incident began with a chart crop in a large account's post. Within minutes, fictional quote-posts repeated the same caption while presenting the call as separate research.",
      "The original thread, its reposts and a later Spaces recap were filed as three events, although all three point back to the same unsupported claim.",
      "The call acquired a ticker, a target and a community slogan before the desk could locate the source that supposedly justified it.",
    ],
    kol: [
      "The citation chain loops from account A to account B and back to account A; the file counts one originating claim, not an independent research network.",
      "The disclosure line is absent from the fictional screenshot. The desk cannot infer whether the post was paid, gifted or unsolicited and records that uncertainty explicitly.",
      "Follower count, verification status and Spaces attendance are recorded as reach signals only; none verifies the claim or the speaker's source.",
    ],
    wallet: [
      "A wallet label appears in the KOL graphic, but the account supplying the label provides no reproducible basis for linking the address to a known trader.",
      "The same screenshot is used to support both the KOL thesis and a wallet-coordination theory; neither claim becomes independent because the image has two captions.",
      "The fictional address cluster is repeated by several accounts, but repost volume does not establish common ownership, intent or a reliable identity label.",
    ],
    risk: [
      "The report separates audience size, source quality and promotional disclosure. Combining them into a single confidence score would conceal the very gaps under review.",
      "A repeated call can amplify exposure without adding corroboration; the same unsupported source remains unsupported after its tenth quote-post.",
      "No allegation about a real KOL is made. The case concerns a fictional source trail and the habit of treating repetition as verification.",
    ],
    memo: [
      "Editorial records should preserve the earliest available source, timestamp, material edits and any stated promotional disclosure before counting later amplification.",
      "Use 'repeated by' when the source is shared. Reserve 'independently confirmed' for evidence that actually originates elsewhere.",
    ],
    postMortem: [
      "The post-mortem identified one originating claim, a dozen variations of its caption and no additional evidence. The reach report remains impressive.",
      "The community archived every repost but misplaced the original source, which was the only document the review needed.",
    ],
  },
  chart: {
    incident: [
      "The fictional chart screenshot removes the timeframe and the candles immediately before the highlighted move, leaving an arrow with no usable sequence around it.",
      "The entry was described as early after the post went viral; the incident log places the subject's fictional discovery after the candle used to justify the call.",
      "The group circulated a wick as a confirmed close, then used the cropped image to explain why the next entry was still considered early.",
    ],
    kol: [
      "The KOL caption cites a green candle but omits the chart interval, the source of the image and the point at which the screenshot was captured.",
      "The same annotated chart is reposted with different target prices. The underlying image and its missing timeframe remain unchanged.",
      "Several fictional accounts describe the same visible move as confirmation, although their posts all use one cropped chart and no additional source.",
    ],
    wallet: [
      "Wallet movement is narrated around the highlighted candle, but the fictional file does not establish whether the transfers preceded, followed or caused the move.",
      "The chart annotation and wallet labels are presented as one story; the record contains no independent link between the illustrated addresses and the candle.",
      "The screenshot's timestamp is not the transaction timestamp. The desk has opened a separate field for each and left the causal arrow blank.",
    ],
    risk: [
      "A chart crop without interval, timestamp and surrounding price sequence cannot support the confident timeline attached to it.",
      "The review separates a visible price movement from the narrative used to explain it; neither a wick nor a caption establishes the missing context.",
      "The fictional entry note has a target but no recorded invalidation condition. The committee has classified the blank field as a formatting success.",
    ],
    memo: [
      "Chart exhibits must retain the interval, capture time, source and enough surrounding context to show what the crop excludes.",
      "A screenshot time, candle close and wallet transaction time are different records and must not be merged into one convenient timeline.",
    ],
    postMortem: [
      "The review restored the omitted candles and discovered that the original arrow had been carrying most of the thesis.",
      "The screenshot remained green in the archive. The timeframe field remained empty in every version.",
    ],
  },
  wallet: {
    incident: [
      "The fictional wallet map groups addresses by launch timing and visual proximity, then assigns a shared owner without evidence that the addresses are controlled together.",
      "A small set of early transfers became a 'bundle family' graphic before the source, ownership and transaction context had been checked.",
      "The incident file contains an address cluster, several arrows and a confident label; it does not contain proof of coordinated control.",
    ],
    kol: [
      "The KOL post attributes the fictional cluster to smart money but links only to another account's wallet graphic, not to an attributable source or method.",
      "Several accounts repeat the same wallet labels and call the overlap confirmation; none supplies evidence independent of the original diagram.",
      "The source trail records an anonymous label, a repost and a Spaces recap. It does not record a verified wallet owner.",
    ],
    wallet: [
      "Transaction proximity can describe timing; it cannot by itself establish common ownership, coordination or motive for the fictional addresses.",
      "A transfer proves that value moved between the illustrated addresses. It does not prove why it moved or who ultimately controlled either side.",
      "The map distinguishes observed links from analyst-assigned labels, leaving unknown ownership visibly unknown rather than filling it with a bullish theory.",
    ],
    risk: [
      "The review marks wallet identity, funding relationships and motive as separate unknowns instead of treating one speculative label as an answer to all three.",
      "A cluster diagram can be useful for organising questions, but the fictional labels must not be presented as verified ownership or proof of a coordinated operation.",
      "The main risk is false certainty: a persuasive graph has been allowed to replace the evidence needed to explain its connections.",
    ],
    memo: [
      "Wallet exhibits must preserve the distinction between observed transaction paths, inferred clusters and confirmed ownership; the last category cannot be supplied by graphic design.",
      "Record the source and method behind every address label. When ownership is unknown, the published file must say unknown.",
    ],
    postMortem: [
      "The final diagram retained every arrow and lost every caveat. The post-mortem has restored the caveats and left the owner field blank.",
      "The committee has withdrawn the word coordinated and replaced it with the less cinematic but supportable phrase: addresses observed near one another.",
    ],
  },
  liquidity: {
    incident: [
      "The fictional post-graduation report displays a headline valuation while the pool-depth field is empty and the assumed trade size is never stated.",
      "A launch celebration treats the migration as proof of healthy liquidity, although the incident file contains no separate review of pool reserves or execution impact.",
      "The first post-graduation screenshot shows a price. The second, requested by the review team, was supposed to show what size could actually trade near it.",
    ],
    kol: [
      "The KOL thread quotes a market-cap figure as evidence of exit capacity, without showing the pool depth or the size of the hypothetical order being discussed.",
      "The same green valuation screenshot is repeated as a liquidity update by accounts that provide no separate pool or execution context.",
      "A fictional call describes a large headline valuation as deep liquidity; the desk has returned the claim for a definition of 'deep'.",
    ],
    wallet: [
      "The pool diagram shows token movement after graduation, but the fictional case provides no basis for inferring the identity or intention of the wallets involved.",
      "Holder concentration and pool depth appear in separate exhibits; the group chat has combined them into one chart labelled 'healthy'.",
      "The illustrated transfer is not an execution quote. The file keeps wallet movement separate from the question of what the pool could absorb.",
    ],
    risk: [
      "The fictional review separates headline valuation, available pool depth, holder concentration and slippage at a stated trade size; none is a substitute for another.",
      "An attractive displayed price does not establish how much could be exchanged near that price in the scenario being described.",
      "The risk label remains open because the report never specifies the trade size behind its claim of sufficient liquidity.",
    ],
    memo: [
      "Liquidity notes must identify the pool and the assumed trade size before describing depth or slippage; headline valuation is not an execution measure.",
      "Keep holder concentration, pool reserves and price movement in separate evidence fields. A single green dashboard tile cannot answer all three.",
    ],
    postMortem: [
      "The retrospective found a valuation screenshot in every slide deck and a pool-depth figure in none of them.",
      "The committee had a target market cap, a community banner and an unanswered question about the size of the exit it kept promising.",
    ],
  },
  exit: {
    incident: [
      "The fictional entry dossier contains pages of narrative research, a list of KOL accounts and no condition describing when the original thesis would be considered broken.",
      "The subject documented every reason to enter and left the exit field blank, later describing the blank as flexibility.",
      "A target price was entered in the worksheet, but no scenario was recorded for a failed catalyst, a changed deployer or a pool that could not support the assumed trade.",
    ],
    kol: [
      "The KOL target is repeated as if it were an exit plan, although the source never states an invalidation condition or an execution assumption.",
      "The timeline has replaced a missing decision rule with a more confident target and called the resulting screenshot a strategy update.",
      "Several fictional accounts repeat the same upside thesis; none explains what evidence would cause the thesis to be withdrawn.",
    ],
    wallet: [
      "The wallet graphic follows entry activity but does not establish the holder's plan, ownership identity or reason for remaining in the fictional position.",
      "A movement by an early address is treated as a signal for the subject's own exit decision, although the file cannot establish the address owner's motive.",
      "The record has a transaction timeline and no documented decision rule linking that timeline to the subject's fictional position.",
    ],
    risk: [
      "The review distinguishes a price target from an exit condition and both from an executable plan that accounts for the fictional scenario's liquidity assumptions.",
      "No pre-stated invalidation point appears in the dossier. The committee has classified the missing field as 'long-term conviction'.",
      "The risk is not that the fictional subject lacks another bullish explanation; it is that the original thesis has no recorded test that could change the conclusion.",
    ],
    memo: [
      "A complete fictional case record distinguishes entry rationale, invalidation condition, intended holding assumptions and exit mechanics instead of storing them under one price target.",
      "The archive must record what would disconfirm the thesis, not only the evidence selected to keep it alive.",
    ],
    postMortem: [
      "The retrospective found that the entry thesis had seven supporting screenshots and no condition under which the subject would reconsider it.",
      "The missing exit plan has been recovered as a 46-page appendix titled 'Reasons the next update changes everything'.",
    ],
  },
  migration: {
    incident: [
      "The fictional migration announcement names a destination but does not preserve a verifiable link between the old token, the new mint and the transaction claimed to connect them.",
      "A screenshot of a new token page is treated as proof of migration; the incident file has no documented source for the destination address.",
      "The community is circulating two CA references under one ticker, while the fictional record has not established which address the announcement actually identifies.",
    ],
    kol: [
      "The KOL thread links to a destination screenshot, then cites reposts of that screenshot as confirmation that the migration is complete.",
      "Several fictional accounts repeat the new CA but none links the announcement to a verifiable source or a clearly documented migration record.",
      "The call describes the destination as official. The supporting evidence is a repost with the original source cropped out.",
    ],
    wallet: [
      "The fictional transfer graphic is labelled migration proof, but the file does not establish that the sending and receiving addresses represent the same project or controller.",
      "The old and new CA appear in one diagram. No verified link is supplied between the two records, so the arrow remains an editorial annotation.",
      "The migration story combines a token-page screenshot with unrelated wallet movements; the dossier keeps those exhibits separate pending source evidence.",
    ],
    risk: [
      "The review requires an attributable announcement and a verifiable link between the old and new token references before treating the migration claim as established within the fictional case.",
      "A changed ticker or new token page does not independently establish continuity, authority or control of the destination address.",
      "The risk committee has separated the destination claim, the source of the announcement and the identity of the operator; all three remain distinct fields.",
    ],
    memo: [
      "Migration records must preserve the original announcement, both token references and the evidence connecting them; never let a ticker name stand in for that chain of custody.",
      "The archive must label screenshots as screenshots and verified links as verified links. The arrow between them is not a transaction receipt.",
    ],
    postMortem: [
      "The retrospective found that the new CA had been copied into every channel before anyone preserved the original migration announcement.",
      "The community successfully migrated its confidence. The documentary link between the two token references remains in transit.",
    ],
  },
};

const editorialRoutes: Array<{
  label: string;
  headline: number;
  bulletin: number;
  incident: number;
  focus: EditorialFocus;
}> = [
  { label: "CA / LAUNCH CONTEXT", headline: 0, bulletin: 0, incident: 0, focus: "launch" },
  { label: "BONDING-CURVE GRADUATION", headline: 1, bulletin: 1, incident: 2, focus: "graduation" },
  { label: "DEPLOYER / CTO HANDOVER", headline: 2, bulletin: 3, incident: 3, focus: "handover" },
  { label: "KOL ECHO / COPIED CALLS", headline: 3, bulletin: 2, incident: 4, focus: "kol" },
  { label: "GREEN-CANDLE CONVICTION", headline: 4, bulletin: 8, incident: 10, focus: "chart" },
  { label: "BUNDLE / WALLET THEORIES", headline: 5, bulletin: 4, incident: 1, focus: "wallet" },
  { label: "POST-GRADUATION LIQUIDITY", headline: 6, bulletin: 5, incident: 5, focus: "liquidity" },
  { label: "COMMUNITY TAKEOVER", headline: 7, bulletin: 9, incident: 3, focus: "handover" },
  { label: "DELETED KOL CALL", headline: 8, bulletin: 10, incident: 7, focus: "kol" },
  { label: "100X ENTRY TIMING", headline: 9, bulletin: 13, incident: 8, focus: "chart" },
  { label: "CA SOURCE VERIFICATION", headline: 10, bulletin: 7, incident: 4, focus: "launch" },
  { label: "CTO ACCESS CHECKLIST", headline: 11, bulletin: 15, incident: 3, focus: "handover" },
  { label: "WALLET-GRAPH INTERPRETATION", headline: 12, bulletin: 12, incident: 6, focus: "wallet" },
  { label: "EXIT-PLAN ABSENCE", headline: 13, bulletin: 16, incident: 13, focus: "exit" },
  { label: "GREEN-CANDLE EVIDENCE", headline: 14, bulletin: 14, incident: 10, focus: "chart" },
  { label: "SNIPER THEORY", headline: 15, bulletin: 12, incident: 6, focus: "wallet" },
  { label: "MIGRATION CLAIM", headline: 16, bulletin: 1, incident: 11, focus: "migration" },
  { label: "BAGHOLDER ENTRY HISTORY", headline: 17, bulletin: 16, incident: 13, focus: "exit" },
];

type EditorialRoute = (typeof editorialRoutes)[number];

const EDITORIAL_FOCUS_COOLDOWN_DAYS = 4;
const EDITORIAL_ROUTE_EPOCH_DAY = Math.floor(Date.UTC(2000, 0, 1) / 86_400_000);
const editorialRouteCache = new Map<number, EditorialRoute>();
let editorialRouteCacheThrough = EDITORIAL_ROUTE_EPOCH_DAY - 1;

/**
 * Keeps the daily briefing in one coherent editorial lane while preventing
 * that same lane from appearing again in the following four UTC issues.
 * The date-indexed cache makes the schedule stable regardless of which
 * archive date is requested first in a server process.
 */
function selectEditorialRoute(issueDate: string, seed: number): EditorialRoute {
  const issueDay = Math.floor(Date.parse(issueDate + "T00:00:00.000Z") / 86_400_000);
  if (issueDay < EDITORIAL_ROUTE_EPOCH_DAY) {
    return editorialRoutes[mixSeed(seed, 7) % editorialRoutes.length];
  }

  while (editorialRouteCacheThrough < issueDay) {
    const day = editorialRouteCacheThrough + 1;
    const dayDate = new Date(day * 86_400_000).toISOString().slice(0, 10);
    const daySeed = hashText("THE-DYOR-DEPARTMENT/DAILY-OFFICE/V3/" + dayDate);
    const preferredIndex = mixSeed(daySeed, 7) % editorialRoutes.length;
    const recentFocuses = new Set<EditorialFocus>();

    for (let offset = 1; offset <= EDITORIAL_FOCUS_COOLDOWN_DAYS; offset += 1) {
      const recentRoute = editorialRouteCache.get(day - offset);
      if (recentRoute) recentFocuses.add(recentRoute.focus);
    }

    let selectedRoute: EditorialRoute | undefined;
    for (let offset = 0; offset < editorialRoutes.length; offset += 1) {
      const candidate = editorialRoutes[(preferredIndex + offset) % editorialRoutes.length];
      if (!recentFocuses.has(candidate.focus)) {
        selectedRoute = candidate;
        break;
      }
    }

    if (!selectedRoute) {
      throw new Error("The daily editorial rotation could not find a route outside its recent focus window.");
    }

    editorialRouteCache.set(day, selectedRoute);
    editorialRouteCacheThrough = day;
  }

  const selected = editorialRouteCache.get(issueDay);
  if (!selected) {
    throw new Error("The daily editorial route is missing from its date-indexed schedule.");
  }
  return selected;
}

function pickFrom<T>(items: T[], indexes: number[], seed: number, salt: number): T {
  const candidates = indexes
    .map((index) => items[index])
    .filter((item): item is T => item !== undefined);
  if (candidates.length === 0) {
    throw new Error("An editorial focus pool must include at least one valid item.");
  }
  return pick(candidates, seed, salt);
}

function hashText(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mixSeed(seed: number, salt: number) {
  return Math.imul(seed ^ (salt * 0x45d9f3b), 0x27d4eb2d) >>> 0;
}

function pick<T>(items: T[], seed: number, salt: number): T {
  return items[mixSeed(seed, salt) % items.length];
}

function score(seed: number, salt: number, min: number, max: number) {
  return min + (mixSeed(seed, salt) % (max - min + 1));
}

export function buildDailyOfficeDispatch(issueDate: string): DailyOfficeDispatch {
  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(issueDate)) {
    throw new Error("A valid UTC issue date is required.");
  }

  const parsed = new Date(issueDate + "T00:00:00.000Z");
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== issueDate) {
    throw new Error("A valid UTC issue date is required.");
  }

  const seed = hashText("THE-DYOR-DEPARTMENT/DAILY-OFFICE/V3/" + issueDate);
  const route = selectEditorialRoute(issueDate, seed);
  const focus = editorialFocusPools[route.focus];
  const incident = incidents[route.incident];
  const headline = headlines[route.headline];
  const bulletin = bulletins[route.bulletin];
  const memo = pickFrom(memos, focus.memo, seed, 29);
  const quote = pickFrom(quotes, focus.quote, seed, 71);
  const assignedDepartment = pickFrom(departments, focus.department, seed, 83);
  const disposition = pickFrom(dispositions, focus.disposition, seed, 97);
  const referenceNumber = String((seed % 9000) + 1000);
  const depth = editorialDepthPools[route.focus];
  const depthNotes = {
    incident: pick(depth.incident, seed, 307),
    kol: pick(depth.kol, seed, 311),
    wallet: pick(depth.wallet, seed, 313),
    risk: pick(depth.risk, seed, 317),
    memo: pick(depth.memo, seed, 331),
    postMortem: pick(depth.postMortem, seed, 337),
  };

  const kol = {
    heading: pickFrom(kolHeadings, focus.kolHeading, seed, 109),
    body:
      "A fictional cluster of " +
      pick(["three", "four", "six", "nine", "eleven"], seed, 113) +
      " verification badges amplified " +
      pickFrom(kolClaims, focus.kolClaim, seed, 127) +
      " " +
      pick(kolTimings, seed, 131) +
      ". The desk has classified the overlap as " +
      pick(kolInterpretations, seed, 137) +
      ". " +
      pickFrom(kolCaveats, focus.kolCaveat, seed, 139),
    stamp: pick(
      ["CONSENSUS / SELF-REFERENTIAL", "SOURCE / NOT LOCATED", "BADGES / VISUALLY REASSURING", "INDEPENDENCE / ASSUMED"],
      seed,
      149,
    ),
  };

  const onChain = {
    heading: pickFrom(onChainHeadings, focus.walletHeading, seed, 151),
    body:
      "A fictional wallet map records " +
      pickFrom(walletEvents, focus.walletEvent, seed, 157) +
      ". Analysts interpret the movement as " +
      pick(walletInterpretations, seed, 163) +
      ". " +
      pickFrom(walletCaveats, focus.walletCaveat, seed, 167),
    stamp: pick(
      ["WALLET OWNER / UNCONFIRMED", "TRANSACTION / FICTIONAL", "MOTIVE / ASSIGNED BY ANALYSTS", "GRAPH / HIGHLY PERSUASIVE"],
      seed,
      173,
    ),
  };

  const risk = {
    heading: pickFrom(riskHeadings, focus.riskHeading, seed, 179),
    body:
      "The fictional review flagged " +
      pickFrom(riskFlags, focus.riskFlag, seed, 181) +
      ". The committee has reclassified the exposure as " +
      pick(riskReframes, seed, 191) +
      ". Mitigation: " +
      pick(riskMitigations, seed, 193) +
      ".",
    stamp: pick(
      ["RISK / ACKNOWLEDGED IN A FOOTNOTE", "MITIGATION / MOSTLY LINGUISTIC", "EXIT READINESS / NOT DETECTED", "SEVERITY / RECLASSIFIED"],
      seed,
      197,
    ),
  };

  const postMortem = {
    heading: pickFrom(postMortemHeadings, focus.postMortemHeading, seed, 199),
    body:
      "The fictional event under review: " +
      pickFrom(postMortemEvents, focus.postMortemEvent, seed, 211) +
      ". The original thesis has been preserved by " +
      pick(postMortemReframes, seed, 223) +
      ". " +
      pick(postMortemLessons, seed, 227),
    stamp: pick(
      ["LESSON / DEFERRED", "THESIS / STILL INTACT", "ACCOUNTABILITY / UNDER REVIEW", "CASE / REMAINS OPEN"],
      seed,
      229,
    ),
  };

  const convictionIndex: DailyOfficeConvictionIndex = {
    score: score(seed, 233, 96, 99),
    classification: "UNREASONABLY CONFIDENT",
    readings: [
      { label: "CA RESEARCH EFFORT", score: score(seed, 239, 86, 100), assessment: "EXCESSIVE", tone: "green" },
      { label: "KOL SOURCE INDEPENDENCE", score: score(seed, 241, 2, 16), assessment: "MOSTLY ECHO", tone: "red" },
      { label: "BUNDLE THEORY CONFIDENCE", score: score(seed, 251, 93, 100), assessment: "OPTIMISM DETECTED", tone: "green" },
      { label: "POST-GRADUATION LIQUIDITY AWARENESS", score: score(seed, 257, 1, 14), assessment: "SELECTIVE", tone: "red" },
      { label: "EXIT PLAN READINESS", score: score(seed, 263, 0, 8), assessment: "NOT DETECTED", tone: "red" },
      { label: "CTO HANDOVER UNDERSTANDING", score: score(seed, 269, 1, 11), assessment: "PENDING", tone: "amber" },
    ],
    note: "The final conviction score is intentionally insulated from evidence quality. This is a fictional joke, not a risk model or market indicator.",
  };

  return {
    issueDate,
    reference: "DD-" + issueDate.replace(/-/g, "") + "-" + referenceNumber,
    caseTheme: route.label,
    headline,
    subheading: "THE TRENCHES DESK / " + route.label + " / DAILY CT BRIEFING / ISSUE " + referenceNumber,
    bulletin,
    sections: [
      { label: "INCIDENT REPORT", heading: incident.heading, body: incident.body + " " + depthNotes.incident, stamp: incident.stamp },
      { label: "KOL INTELLIGENCE", heading: kol.heading, body: kol.body + " " + depthNotes.kol, stamp: kol.stamp },
      { label: "ON-CHAIN DIVISION", heading: onChain.heading, body: onChain.body + " " + depthNotes.wallet, stamp: onChain.stamp },
      { label: "RISK DEPARTMENT", heading: risk.heading, body: risk.body + " " + depthNotes.risk, stamp: risk.stamp },
      { label: "INTERNAL CORRESPONDENCE", heading: memo.heading, body: memo.body + " " + depthNotes.memo, stamp: memo.stamp },
      { label: "BAGHOLDER POST-MORTEM", heading: postMortem.heading, body: postMortem.body + " " + depthNotes.postMortem, stamp: postMortem.stamp },
    ],
    convictionIndex,
    quote,
    assignedDepartment,
    disposition,
    footer: "THE DAY HAS BEEN FILED. THE MARKET HAS NOT BEEN CONSULTED.",
    methodology,
  };
}


export type DailyEditorialCaseContext = {
  issueDate: string;
  reference: string;
  caseTheme: string;
  headline: string;
  bulletin: string;
};

export function getDailyEditorialCase(issueDate: string): DailyEditorialCaseContext {
  const dispatch = buildDailyOfficeDispatch(issueDate);
  return {
    issueDate: dispatch.issueDate,
    reference: dispatch.reference,
    caseTheme: dispatch.caseTheme,
    headline: dispatch.headline,
    bulletin: dispatch.bulletin,
  };
}
