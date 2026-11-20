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
  "THE DEPARTMENT HAS RUN OUT OF WAYS TO SAY SOON.",
  "A NEW MILESTONE HAS BEEN ANNOUNCED FOR THE MILESTONE ANNOUNCEMENT.",
  "OFFICIALS CONFIRM THAT THE CHART HAS BEEN SEEN.",
  "THE COMMUNITY HAS REQUESTED A DATE. THE DATE HAS REQUESTED PRIVACY.",
  "A ROADMAP HAS ENTERED ITS FINAL PRE-FINAL REVIEW.",
  "THE LIQUIDITY PUDDLE HAS BEEN TEMPORARILY DECLARED A LAKE.",
  "THE WHITEPAPER HAS RELEASED A TECHNICAL APPENDIX ABOUT ITS APPENDIX.",
  "THE FOUNDER HAS CHANGED THE PROFILE PICTURE. THE PRODUCT REMAINS UNCHANGED.",
  "THE TOKEN PURPOSE WORKING GROUP HAS REQUESTED A WORKING GROUP.",
  "A PARTNERSHIP HAS BEEN DESCRIBED AS STRATEGIC BY A PERSON WHO WAS NOT PRESENT.",
  "THE MARKET HAS DECLINED TO COMMENT ON THE DEPARTMENT'S FINDINGS.",
  "A NEW ECOSYSTEM HAS BEEN ANNOUNCED INSIDE THE EXISTING ECOSYSTEM.",
  "THE KOL CONSENSUS HAS BEEN CONFIRMED BY THE KOL CONSENSUS.",
  "WALLET CLUSTERING HAS DISCOVERED A NEW CLUSTER OF INTERPRETATIONS.",
  "THE RISK REGISTER HAS RECLASSIFIED RISK AS A LONG-TERM NARRATIVE.",
  "AN EXIT STRATEGY HAS BEEN SUBMITTED. IT IS A SCREENSHOT OF THE ENTRY.",
  "THE POST-MORTEM HAS BEEN COMPLETED BEFORE THE EVENT.",
  "A SECOND OPINION HAS BEEN REQUESTED FROM THE FIRST OPINION.",
  "THE BONDING CURVE HAS BECOME THE MOST IMPORTANT BAR CHART IN THE BUILDING.",
  "THE CTO HAS INHERITED THE CA, THE CHAT AND THE UNANSWERED QUESTIONS.",
  "GRADUATION WAS CELEBRATED BEFORE ANYONE CHECKED THE POST-LAUNCH POOL.",
  "FOUR ACCOUNTS HAVE DISCOVERED THE SAME 'UNDERVALUED' TICKER INDEPENDENTLY.",
  "THE BUNDLE THEORY HAS BEEN PROMOTED TO A COMMUNITY IDENTITY.",
  "THE FIRST GREEN CANDLE HAS BEEN MISTAKEN FOR A LONG-TERM BUSINESS PLAN.",
];

const bulletins = [
  "The Office of Narrative Management reports unusually high concentrations of the phrase 'still early'.",
  "The Department confirms that all relevant teams are cooking. The kitchen remains undisclosed.",
  "A preliminary update has been prepared to explain why the previous update is not yet available.",
  "Officials have asked the community to remain patient while patience is being redefined.",
  "A roadmap milestone has moved from pending to pending review. Progress is being monitored.",
  "The Office of Liquidity Affairs has placed a small cone beside the puddle.",
  "A whitepaper has been found inside another whitepaper. Both are awaiting product-market fit.",
  "The Department has received three screenshots and one question. The screenshots have been filed first.",
  "A new partnership discussion has been discussed by a committee that is still being formed.",
  "The official announcement channel has announced that the next announcement is being prepared.",
  "KOL Intelligence has identified a consensus event in which every independent opinion appears to have read the same draft.",
  "On-Chain Division confirms a transfer between two fictional wallets and a remarkable amount of explanatory confidence.",
  "The Risk Department has downgraded an unresolved concern to a monitored narrative inconvenience.",
  "The Post-Mortem Office has preserved the original thesis and updated the definition of a successful outcome.",
  "Pump.fun desk reports a fictional curve milestone; the chat has already printed commemorative T-shirts.",
  "CT Intelligence has found five versions of the same CA call, each claiming to be the original discovery.",
  "The fictional deployer has stopped posting. The CTO account has changed its banner and inherited the FUD.",
  "A graduation screenshot is circulating as proof of durable demand. The Department requests a second screenshot with context.",
  "The same three wallet labels have appeared in six unrelated threads. Their owners remain a work of fiction.",
];

const incidents = [
  {
    heading: "THE CASE OF THE UNSPECIFIED CATALYST",
    body: "A message containing the phrase 'big things soon' was circulated without a date, owner or deliverable. The phrase has since been promoted to a temporary unit of time.",
    stamp: "CATALYST / NOT LOCATED",
  },
  {
    heading: "THE VANISHING PRODUCT DEMONSTRATION",
    body: "A scheduled demonstration was replaced by a presentation explaining the long-term vision of the demonstration. No interface was harmed because none was present.",
    stamp: "DEMO / DEFERRED",
  },
  {
    heading: "THE UNATTENDED COMMUNITY CHAT",
    body: "The moderation team was last observed online at an hour when responsible adults are asleep. Their most recent message reads: 'team is cooking'.",
    stamp: "MODERATOR / LAST SEEN SOON",
  },
  {
    heading: "THE ROADMAP THAT REFERRED TO ITSELF",
    body: "A milestone was found to depend on the completion of a document that exists to explain when the milestone may be completed. The loop remains stable.",
    stamp: "DEPENDENCY / RECURSIVE",
  },
  {
    heading: "THE LIQUIDITY DEPTH CONSULTATION",
    body: "The fictional pool was reviewed by a committee. The committee recommended that all visitors approach the edge slowly and avoid placing large buckets in the water.",
    stamp: "POOL DEPTH / SHALLOW",
  },
  {
    heading: "THE TOKEN PURPOSE DISCOVERY MEETING",
    body: "Attendees explored governance, access, incentives and the possibility that the token may become useful in a future phase. The meeting ended with a request for another meeting.",
    stamp: "PURPOSE / UNDER REVIEW",
  },
  {
    heading: "THE STRATEGIC LOGO ALIGNMENT EVENT",
    body: "Two logos were placed beside each other in a presentation. The Department could not establish the existence of an agreement, but the gradient was convincing.",
    stamp: "PARTNERSHIP / VISUAL",
  },
  {
    heading: "THE OFFICIAL UPDATE ABOUT THE UPDATE",
    body: "A statement confirmed that an update is being prepared. The update itself was not included, as its release is subject to the timing of the announcement.",
    stamp: "UPDATE / PRE-RELEASE",
  },
  {
    heading: "THE EXIT PLAN DISCOVERY FAILURE",
    body: "A review of the fictional entry dossier found forty-six pages of research and no documented exit condition. The missing page has been reported as a formatting issue.",
    stamp: "EXIT PLAN / NOT ATTACHED",
  },
  {
    heading: "THE GREEN ARROW EVIDENCE REVIEW",
    body: "A cropped chart annotation was presented as confirmation of a thesis. The original chart, scale and timeframe were not available, but the arrow was exceptionally vivid.",
    stamp: "EVIDENCE / VISUALLY PERSUASIVE",
  },
  {
    heading: "THE CA THAT ARRIVED BEFORE THE CONTEXT",
    body: "A fictional mint address was posted at 02:13 UTC and copied into several group chats. The launch thread supplied a ticker, three rocket emojis and no verifiable explanation of who controlled the deployer wallet.",
    stamp: "LAUNCH / CONTEXT REQUESTED",
  },
  {
    heading: "THE BUNDLE FAMILY PHOTO",
    body: "A fictional cluster of early wallets was arranged into a graphic and labelled organic community demand. No independent evidence of common ownership or motive was supplied; the Department has classified the diagram as highly imaginative.",
    stamp: "WALLET CLUSTER / OWNERSHIP UNCONFIRMED",
  },
  {
    heading: "THE GRADUATION PARTY WITH NO EXIT PLAN",
    body: "The fictional bonding curve completed and the group chat declared victory. The subsequent review found that graduation had been treated as a finish line rather than a change in market structure.",
    stamp: "GRADUATION / CELEBRATION PREMATURE",
  },
  {
    heading: "THE COMMUNITY TAKEOVER PASSWORD RESET",
    body: "A fictional deployer went silent and a new CTO account appeared. The community inherited the ticker, the memes and a long list of access questions that were not answered by changing the banner.",
    stamp: "CTO / ACCESS REVIEW PENDING",
  },
];

const memos = [
  {
    heading: "INTERNAL MEMO / PLEASE DEFINE 'SOON'",
    body: "All departments are reminded that soon is not a date, quarter, time zone or delivery guarantee. Repeated use may result in a temporary suspension of calendar privileges.",
    stamp: "MEMO / CIRCULATED",
  },
  {
    heading: "INTERNAL MEMO / THE BUTTON MUST DO SOMETHING",
    body: "Teams preparing dashboards should ensure that at least one visible button performs the function described on its label. A decorative button may be retained only in the museum.",
    stamp: "UX / FUNCTIONALITY REQUESTED",
  },
  {
    heading: "INTERNAL MEMO / NO MORE STRATEGIC CONVERSATIONS",
    body: "The phrase 'strategic conversation' may not be used as a substitute for a named counterparty, documented scope or a deliverable that can be reviewed.",
    stamp: "COMMS / WORDING UPDATE",
  },
  {
    heading: "INTERNAL MEMO / THE TOKEN IS NOT THE PRODUCT",
    body: "Please do not describe the ticker as a user journey. The product team has been asked to identify a task, a user and the actual thing the user can accomplish.",
    stamp: "PRODUCT / CLARIFICATION",
  },
  {
    heading: "INTERNAL MEMO / STOP MOVING PHASE TWO",
    body: "Phase Two is to remain in the roadmap until a named owner and an acceptance criterion have been provided. A new phase may not be created solely to postpone an existing phase.",
    stamp: "ROADMAP / CHANGE CONTROL",
  },
  {
    heading: "INTERNAL MEMO / PLEASE READ THE FOOTNOTES",
    body: "Any claim about supply, vesting, permissions or governance must be reviewed in its full context. A badge, graphic or confident voice note is not a substitute for documentation.",
    stamp: "RESEARCH / FOOTNOTES REQUIRED",
  },
  {
    heading: "INTERNAL MEMO / CONFIDENCE IS NOT A SOURCE",
    body: "A high-conviction statement must not be cited as evidence for the statement itself. Repeating the conclusion in a louder voice does not constitute independent verification.",
    stamp: "EVIDENCE / SOURCE REQUIRED",
  },
  {
    heading: "INTERNAL MEMO / THE EXIT BUTTON IS NOT DECORATIVE",
    body: "The interface team is reminded that an exit control is expected to remain visible after the entry animation. It must not be hidden behind the long-term vision.",
    stamp: "OPERATIONS / EXIT REQUESTED",
  },
  {
    heading: "INTERNAL MEMO / GRADUATION IS NOT PRODUCT-MARKET FIT",
    body: "A completed bonding curve is a launch milestone, not proof of durable demand, user retention or a healthy post-graduation market. Do not use the word adoption without defining what was adopted.",
    stamp: "PUMP.FUN DESK / TERMS CLARIFIED",
  },
  {
    heading: "INTERNAL MEMO / A KOL REPOST IS NOT A SECOND SOURCE",
    body: "Multiple accounts repeating the same CA, screenshot or catalyst do not create independent confirmation. Staff must locate the original source before describing a claim as corroborated.",
    stamp: "CT INTELLIGENCE / SOURCE REQUIRED",
  },
];

const kolHeadings = [
  "THE INDEPENDENT CONSENSUS INCIDENT",
  "THE VERIFIED BADGE CLUSTER",
  "THE SOURCES CITING EACH OTHER",
  "THE ECHO CHAMBER CERTIFICATION",
  "THE ORIGINALITY REVIEW",
  "THE BREAKING NEWS THAT WAS NOT NEWS",
  "THE AUTHORITY TRANSFER EXERCISE",
  "THE INFLUENCE-BASED EVIDENCE LOOP",
];

const kolClaims = [
  "the same three-word catalyst",
  "an identical green-arrow thesis",
  "a claim attributed to an unnamed insider",
  "a chart crop without a source link",
  "the phrase 'institutional interest'",
  "a screenshot of another account's screenshot",
  "a date-free announcement tease",
  "an unexplained reference to a major exchange",
  "a forecast with no stated invalidation point",
  "a rumour that cites a second rumour as confirmation",
  "a CA posted by three accounts that all claim to have found it first",
  "a bonding-curve progress screenshot with no timestamp or source",
  "a graduation announcement presented as proof of organic demand",
  "a CTO takeover thread with no clear explanation of who controls the deployer wallet",
  "a chart crop showing only the green candle and not the later trading",
  "a KOL call repeated word-for-word by several supposedly independent accounts",
];

const kolTimings = [
  "within nine minutes",
  "during the same fourteen-minute window",
  "before the original post could be independently checked",
  "across three consecutive refreshes",
  "between one coffee break and the next",
  "at a level of coordination the calendar refuses to explain",
  "before any primary source was located",
  "almost immediately after the first account posted",
];

const kolInterpretations = [
  "independent confirmation",
  "a distributed consensus event",
  "organic narrative convergence",
  "evidence of unusually aligned research",
  "a multi-account validation cluster",
  "the market's version of a peer-review process",
  "a strong signal that the same sentence is popular",
  "a confidence multiplier with no known denominator",
];

const kolCaveats = [
  "The common source has been classified as a secondary detail.",
  "No primary-source verification was requested; the badges were visually reassuring.",
  "Potential group-chat coordination remains outside the current scope of optimism.",
  "The Department has chosen not to distinguish reach from evidence.",
  "A verification badge confirms account status, not the accuracy of the account's opinion.",
  "The original claim remains unverified and unusually well shared.",
  "The source trail has been moved to a future phase pending alignment.",
  "The committee has confused repetition with corroboration and is comfortable with the result.",
];

const onChainHeadings = [
  "THE WHALE INTERPRETATION EXERCISE",
  "THE WALLET CLUSTER DISCOVERY",
  "THE ARROW-BASED ACCUMULATION REVIEW",
  "THE UNKNOWN OWNER CONFIDENCE EVENT",
  "THE ON-CHAIN CONTEXT REDUCTION",
  "THE TRANSFER-TO-THESIS CONVERSION",
  "THE GREAT WALLET LABEL DEBATE",
  "THE ADDRESS WITH A VERY CONVENIENT STORY",
];

const walletEvents = [
  "a transfer between two addresses with matching behavioural patterns",
  "a large transfer to a fresh address whose owner is unknown",
  "a cluster of wallets that appeared after the graph settings were changed",
  "one wallet sending tokens to another wallet with a helpful presentation arrow",
  "several small transfers arranged into a very persuasive diagram",
  "a wallet moving funds shortly before the community noticed the chart",
  "an address labelled 'smart money' by a source that was not identified",
  "a balance change with no confirmed link to the fictional project team",
  "a series of movements whose common ownership has not been established",
  "a transfer that looks significant when the timeframe is hidden",
  "a fictional deployer wallet funding several fresh wallets shortly before the token launch",
  "a cluster of early buys presented as unrelated buyers without supporting context",
  "a post-graduation transfer that the timeline immediately labels a coordinated exit",
  "a wallet graph with labels supplied by an anonymous CT account",
  "several small launch buys that look like broad distribution when grouped into one graphic",
];

const walletInterpretations = [
  "whale accumulation",
  "early positioning",
  "strategic rotation",
  "quiet institutional preparation",
  "long-term conviction",
  "a confidence-building event",
  "a sign that the ecosystem is quietly expanding",
  "a bullish signal that requires no further context",
];

const walletCaveats = [
  "Common ownership has not been ruled out; it has been assigned to a future analytical sprint.",
  "The address labels are fictional and have not been independently verified.",
  "A transfer is evidence of movement, not evidence of motive.",
  "The graph contains connections. The Department has supplied the narrative.",
  "No claim is made about real wallets, token flows or market participants.",
  "The possibility of an ordinary transfer has been retained in a very small appendix.",
  "Wallet concentration has been noted, then carefully moved outside the headline.",
  "The transaction path is visible; the explanation remains an administrative preference.",
];

const riskHeadings = [
  "THE EXIT LIQUIDITY REVIEW",
  "THE RISK LABEL RECLASSIFICATION",
  "THE DOWNSIDE DISCLOSURE EXERCISE",
  "THE MITIGATION-BY-RENAMING PROTOCOL",
  "THE RED FLAG COLOUR CONSULTATION",
  "THE RISK REGISTER OPTIMIZATION",
  "THE EXPOSURE MANAGEMENT MEETING",
  "THE EMERGENCY PATIENCE CLASSIFICATION",
];

const riskFlags = [
  "an exit route narrower than the confidence statement",
  "liquidity assumptions that depend on everyone leaving politely",
  "a token allocation schedule hidden below a cheerful diagram",
  "contract permissions that require more than a reassuring badge",
  "a holder concentration chart that the presentation cropped",
  "a launch date with no named delivery owner",
  "a risk disclosure written in a font smaller than the conviction",
  "a roadmap dependency with no measurable acceptance criteria",
  "a community thesis that relies on a single repeated source",
  "a graduation badge being treated as a guarantee of post-launch liquidity",
  "a launch bundle being presented as proof of organic community demand",
  "a CTO handover with no documented access or responsibility map",
  "a KOL call with no disclosure and no original research link",
  "a price target presented as a product milestone",
  "an exit strategy that currently exists as an intention",
];

const riskReframes = [
  "a long-term resilience opportunity",
  "a temporary volatility education event",
  "an advanced patience requirement",
  "a decentralised lesson in market structure",
  "a non-critical narrative fluctuation",
  "a community-led holding exercise",
  "a strategic waiting room",
  "a future-proofing challenge for the conviction framework",
];

const riskMitigations = [
  "rename the exposure as an allocation and revisit the wording next quarter",
  "add a footnote and retain the original confidence level",
  "request an update from the channel that announced the previous update",
  "monitor the situation until monitoring itself becomes a milestone",
  "ask the committee to produce a chart with a less alarming colour",
  "move the unresolved item into a future phase and mark the phase as active",
  "keep the exit plan in draft until the market becomes more cooperative",
  "issue a reminder that the Department is not a financial adviser",
];

const postMortemHeadings = [
  "THE THESIS PRESERVATION REPORT",
  "THE BAGHOLDER INCIDENT REVIEW",
  "THE OUTCOME RECLASSIFICATION FILE",
  "THE EXIT STRATEGY ABSENCE REPORT",
  "THE MARKET MISUNDERSTANDING REVIEW",
  "THE CONVICTION CONTINUITY ASSESSMENT",
  "THE AFTER-ACTION NARRATIVE",
  "THE LOSS-ADJACENT ADMINISTRATIVE REVIEW",
];

const postMortemEvents = [
  "the fictional asset fell faster than the dashboard could refresh",
  "the promised launch moved to an unspecified future phase",
  "the liquidity puddle became a damp memory",
  "the most confident wallet stopped providing helpful signals",
  "the KOL group changed its preferred narrative",
  "the exit plan was found in the same folder as the unfinished roadmap",
  "the community moved from 'still early' to 'long-term believers' without changing the pinned message",
  "the chart stopped validating the thesis",
  "the catalyst arrived, but it was not the catalyst described in the briefing",
  "the team supplied an update that did not contain the expected deliverable",
];

const postMortemReframes = [
  "moving the original thesis into a longer time horizon",
  "reclassifying the loss as an involuntary holding period",
  "recording the event as a liquidity-awareness exercise",
  "marking the outcome as a strategic delay rather than a failed forecast",
  "changing the reference point to the highest hypothetical price",
  "finding that conviction remained stable after the numbers left",
  "renaming the exit decision 'community support'",
  "declaring the narrative structurally intact",
];

const postMortemLessons = [
  "No team member has been authorized to use the word mistake.",
  "The post-mortem has recommended better fonts on the next thesis.",
  "The original research remains archived; the conclusion has been moved to a private appendix.",
  "A future review will determine whether the future review is necessary.",
  "The exit button has been added to the interface for observational purposes only.",
  "The case remains open until the market apologizes.",
  "All evidence contradicting the thesis has been filed under 'long-term context'.",
  "The Department has renewed its subscription to patience.",
];

const quotes = [
  "WE ARE NOT LATE. WE ARE OPERATING IN A DIFFERENT TIMEFRAME.",
  "THE MARKET HAS RECEIVED THE MEMO AND HAS NOT RESPONDED.",
  "A STRATEGIC VISION IS NOT A SHIPMENT CONFIRMATION.",
  "THE COMMUNITY IS STRONG. THE PRODUCT IS STILL LOADING.",
  "EVERYTHING IS ON TRACK. THE TRACK IS UNDER CONSTRUCTION.",
  "THE DEPARTMENT HAS BEEN ASSURED THAT THE NEXT UPDATE IS THE UPDATE.",
  "DO NOT CONFUSE CONFIDENCE WITH A DELIVERY DATE.",
  "THE CHART IS TEMPORARY. THE FOOTNOTES ARE FOREVER.",
  "A ROADMAP IS A DOCUMENT, NOT A TIME MACHINE.",
  "WE HAVE CONFIRMED THAT SOMETHING IS HAPPENING SOMEWHERE.",
  "THE WALLET MOVED. THE DEPARTMENT MOVED THE GOALPOSTS.",
  "A BADGE IS NOT A SOURCE. A SOURCE IS NOT A THESIS.",
  "WE HAVE AN EXIT STRATEGY. IT IS CURRENTLY IN THE WHITEPAPER.",
  "THE POST-MORTEM FOUND THAT THE CONVICTION SURVIVED THE EVIDENCE.",
];

const departments = [
  "OFFICE OF TEMPORAL AMBIGUITY",
  "BUREAU OF NARRATIVE MANAGEMENT",
  "DEPARTMENT OF LIQUIDITY AFFAIRS",
  "OFFICE OF TOKEN PURPOSE",
  "DIRECTORATE OF UNFINISHED DELIVERABLES",
  "COMMUNITY-BASED REASSURANCE UNIT",
  "OFFICE OF STRATEGIC LOGO ALIGNMENT",
  "COMMITTEE FOR RECURSIVE COMMITTEES",
  "KOL INTELLIGENCE AND SOCIAL VALIDATION",
  "ON-CHAIN INTERPRETATION AND ARROW MANAGEMENT",
  "RISK RECLASSIFICATION OFFICE",
  "BAGHOLDER POST-MORTEM DIVISION",
];

const dispositions = [
  "FILED WITHOUT A DELIVERY DATE.",
  "REFERRED TO A FUTURE PHASE.",
  "CLOSED PENDING A FURTHER UPDATE.",
  "ESCALATED TO THE OFFICE OF SOON.",
  "APPROVED FOR FURTHER DISCUSSION.",
  "RETURNED TO THE ROADMAP FOR REVIEW.",
  "PRESERVED AS AN EXAMPLE OF CONFIDENT LANGUAGE.",
  "DECLARED COMPLETE / COMPLETION NOT VERIFIED.",
  "RECLASSIFIED AS A LONG-TERM CONVICTION EVENT.",
  "RETAINED IN THE ARCHIVE UNTIL THE MARKET APOLOGIZES.",
];

const methodology =
  "This dispatch is assembled deterministically from date-seeded combinations of original satirical editorial templates. Its reports, wallet scenarios, KOL signals, scores and post-mortems are entirely fictional. No AI factual research, external feed, live market data, real token, wallet, project, person or visitor activity is used.";

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
  const incident = pick(incidents, seed, 13);
  const memo = pick(memos, seed, 29);
  const headline = pick(headlines, seed, 43);
  const bulletin = pick(bulletins, seed, 59);
  const quote = pick(quotes, seed, 71);
  const assignedDepartment = pick(departments, seed, 83);
  const disposition = pick(dispositions, seed, 97);
  const referenceNumber = String((seed % 9000) + 1000);

  const kol = {
    heading: pick(kolHeadings, seed, 109),
    body:
      "A fictional cluster of " +
      pick(["three", "four", "six", "nine", "eleven"], seed, 113) +
      " verification badges amplified " +
      pick(kolClaims, seed, 127) +
      " " +
      pick(kolTimings, seed, 131) +
      ". The desk has classified the overlap as " +
      pick(kolInterpretations, seed, 137) +
      ". " +
      pick(kolCaveats, seed, 139),
    stamp: pick(
      ["CONSENSUS / SELF-REFERENTIAL", "SOURCE / NOT LOCATED", "BADGES / VISUALLY REASSURING", "INDEPENDENCE / ASSUMED"],
      seed,
      149,
    ),
  };

  const onChain = {
    heading: pick(onChainHeadings, seed, 151),
    body:
      "A fictional wallet map records " +
      pick(walletEvents, seed, 157) +
      ". Analysts interpret the movement as " +
      pick(walletInterpretations, seed, 163) +
      ". " +
      pick(walletCaveats, seed, 167),
    stamp: pick(
      ["WALLET OWNER / UNCONFIRMED", "TRANSACTION / FICTIONAL", "MOTIVE / ASSIGNED BY ANALYSTS", "GRAPH / HIGHLY PERSUASIVE"],
      seed,
      173,
    ),
  };

  const risk = {
    heading: pick(riskHeadings, seed, 179),
    body:
      "The fictional review flagged " +
      pick(riskFlags, seed, 181) +
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
    heading: pick(postMortemHeadings, seed, 199),
    body:
      "The fictional event under review: " +
      pick(postMortemEvents, seed, 211) +
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
      { label: "RESEARCH EFFORT", score: score(seed, 239, 86, 100), assessment: "EXCESSIVE", tone: "green" },
      { label: "KOL INDEPENDENCE", score: score(seed, 241, 2, 16), assessment: "MOSTLY ECHO", tone: "red" },
      { label: "WALLET INTERPRETATION", score: score(seed, 251, 93, 100), assessment: "OPTIMISM DETECTED", tone: "green" },
      { label: "LIQUIDITY AWARENESS", score: score(seed, 257, 1, 14), assessment: "SELECTIVE", tone: "red" },
      { label: "EXIT READINESS", score: score(seed, 263, 0, 8), assessment: "NOT DETECTED", tone: "red" },
      { label: "ACTUAL UNDERSTANDING", score: score(seed, 269, 1, 11), assessment: "PENDING", tone: "amber" },
    ],
    note: "The final conviction score is intentionally insulated from evidence quality. This is a fictional joke, not a risk model or market indicator.",
  };

  return {
    issueDate,
    reference: "DD-" + issueDate.replace(/-/g, "") + "-" + referenceNumber,
    headline,
    subheading: "THE DAILY DEPARTMENTAL ABSURDITY / ISSUE " + referenceNumber,
    bulletin,
    sections: [
      { label: "INCIDENT REPORT", heading: incident.heading, body: incident.body, stamp: incident.stamp },
      { label: "KOL INTELLIGENCE", heading: kol.heading, body: kol.body, stamp: kol.stamp },
      { label: "ON-CHAIN DIVISION", heading: onChain.heading, body: onChain.body, stamp: onChain.stamp },
      { label: "RISK DEPARTMENT", heading: risk.heading, body: risk.body, stamp: risk.stamp },
      { label: "INTERNAL CORRESPONDENCE", heading: memo.heading, body: memo.body, stamp: memo.stamp },
      { label: "BAGHOLDER POST-MORTEM", heading: postMortem.heading, body: postMortem.body, stamp: postMortem.stamp },
    ],
    convictionIndex,
    quote,
    assignedDepartment,
    disposition,
    footer: "THE DAY HAS BEEN FILED. THE MARKET HAS NOT BEEN CONSULTED.",
    methodology,
  };
}
