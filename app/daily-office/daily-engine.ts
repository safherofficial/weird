export type DailyNotice = {
  issueDate: string;
  docketNumber: string;
  department: string;
  classification: string;
  headline: string;
  subject: string;
  body: string[];
  finding: string;
  action: string;
  relatedLabel: string;
  relatedHref: string;
  templateNumber: number;
  methodology: string;
};

type NoticeTemplate = Omit<DailyNotice, "issueDate" | "docketNumber" | "templateNumber" | "methodology">;

const templates: NoticeTemplate[] = [
  {
    department: "OFFICE OF TEMPORAL AMBIGUITY",
    classification: "DEADLINE / NON-BINDING",
    headline: "THE WORD 'SOON' HAS BEEN EXTENDED.",
    subject: "Request for clarification on the expected arrival of soon.",
    body: [
      "The Department has received several requests asking whether 'soon' refers to a calendar date, a quarter, or a separate phase of the roadmap.",
      "After review, the office has confirmed that soon remains a flexible delivery window and may be extended without prior notice.",
    ],
    finding: "TEMPORAL CERTAINTY NOT LOCATED.",
    action: "Applicants are invited to check back after the next announcement about the announcement.",
    relatedLabel: "GENERATE A ROADMAP",
    relatedHref: "/roadmap-generator",
  },
  {
    department: "BUREAU OF CONVICTION PRESERVATION",
    classification: "THESIS / FRAGILE",
    headline: "THE THESIS HAS REQUESTED A QUIET ROOM.",
    subject: "Temporary relocation of an overworked investment thesis.",
    body: [
      "A fictional thesis has requested relief from repeated chart checks, increasingly elaborate explanations and the phrase 'nothing has changed'.",
      "The Department has provided a quiet room, three blank appendices and a laminated copy of the original entry rationale.",
    ],
    finding: "CONVICTION REMAINS UNDER OBSERVATION.",
    action: "Please avoid asking the thesis to explain the last candle.",
    relatedLabel: "OPEN THE DYOR AUDIT",
    relatedHref: "/audit",
  },
  {
    department: "LIQUIDITY RESPONSE UNIT",
    classification: "POOL / SHALLOW",
    headline: "THE LIQUIDITY PUDDLE HAS BEEN CORDONED OFF.",
    subject: "Public safety notice concerning a fictional shallow pool.",
    body: [
      "Visitors are reminded that the marked liquidity puddle is a satirical exhibit. Its depth may appear greater when viewed from a very optimistic angle.",
      "No actual pool, token, wallet or order book has been measured. The yellow tape is decorative and should not be interpreted as a security assessment.",
    ],
    finding: "DEPTH CLASSIFIED AS EMOTIONALLY VARIABLE.",
    action: "Do not attempt to exit the puddle with a market order.",
    relatedLabel: "RUN THE BAGHOLDER SIMULATOR",
    relatedHref: "/simulator",
  },
  {
    department: "COMMUNITY REASSURANCE OFFICE",
    classification: "MESSAGE / UNVERIFIED",
    headline: "ADMIN HAS BEEN ONLINE FOR SEVEN SECONDS.",
    subject: "Emergency interpretation of a green online indicator.",
    body: [
      "A green presence indicator has caused an increase in message refresh activity at the Department's fictional community desk.",
      "The phrase 'team is cooking' has been recorded, although no kitchen, recipe or delivery schedule has been identified.",
    ],
    finding: "ONLINE STATUS DOES NOT CONSTITUTE A PRODUCT UPDATE.",
    action: "Please return to your previous activity and stop refreshing the chat.",
    relatedLabel: "VISIT THE 99% CLUB",
    relatedHref: "/club",
  },
  {
    department: "DOCUMENTATION COMPLIANCE",
    classification: "APPENDIX / EXPANDING",
    headline: "APPENDIX N HAS REQUESTED ITS OWN APPENDIX.",
    subject: "Unplanned growth in the supporting-documentation family.",
    body: [
      "Appendix N has submitted a request for an additional explanatory appendix covering the terminology introduced in Appendix M.",
      "The Department has approved the request on the condition that the product description remains at least one paragraph long.",
    ],
    finding: "DOCUMENTATION DENSITY EXCEEDS DEMONSTRATION DENSITY.",
    action: "Please include a working demo before requesting Appendix O.",
    relatedLabel: "OPEN THE WHITEPAPER FACTORY",
    relatedHref: "/whitepaper-factory",
  },
  {
    department: "OFFICE OF STRATEGIC ALIGNMENT",
    classification: "PARTNERSHIP / PRE-ANNOUNCED",
    headline: "A PARTNERSHIP HAS BEEN SCHEDULED TO BE ANNOUNCED.",
    subject: "Notice of a possible announcement concerning a possible partnership.",
    body: [
      "The Department has received a draft statement indicating that discussions may be progressing toward a possible future announcement.",
      "No counterparty, scope, agreement or deliverable is identified in the fictional notice. A logo wall has nevertheless been reserved.",
    ],
    finding: "COUNTERPARTY NOT LOCATED / EXCITEMENT CONFIRMED.",
    action: "Please do not describe a follow as a signed agreement.",
    relatedLabel: "INSPECT THE UTILITY CLAIMS",
    relatedHref: "/utility-inspector",
  },
  {
    department: "CHART OBSERVATION DIVISION",
    classification: "CANDLE / REPEATED",
    headline: "THE FIVE-MINUTE CHART HAS REQUESTED SPACE.",
    subject: "A chart's formal request to reduce the number of visits.",
    body: [
      "The chart reports that it has been opened, zoomed, annotated, refreshed and reopened approximately as often as the application allows.",
      "The Department has granted a temporary period of reduced attention, subject to the next notification.",
    ],
    finding: "SCREEN TIME HAS BEEN RECLASSIFIED AS RESEARCH-ADJACENT.",
    action: "Consider letting the chart finish its own business.",
    relatedLabel: "CHECK THE GLOBAL COPE INDEX",
    relatedHref: "/cope-index",
  },
  {
    department: "ROADMAP APPEALS BOARD",
    classification: "PHASE / RECURSIVE",
    headline: "PHASE TWO HAS ENTERED PHASE TWO OF ITS REVIEW.",
    subject: "Recursive review of a milestone that was already under review.",
    body: [
      "The milestone review has identified a dependency on the completion of the previous milestone, which is currently waiting for the review of the milestone after it.",
      "The Board has opened a new phase to document the dependencies between the existing phases.",
    ],
    finding: "SEQUENCE OF EVENTS REFERRED TO THE SEQUENCE OF EVENTS.",
    action: "A revised timeline will be considered once the timeline is finalized.",
    relatedLabel: "GENERATE A ROADMAP",
    relatedHref: "/roadmap-generator",
  },
  {
    department: "MUSEUM COLLECTIONS OFFICE",
    classification: "ARTIFACT / FRAGILE",
    headline: "THE SEVENTEENTH ROCKET HAS BEEN RE-COUNTED.",
    subject: "Routine conservation check on a chat relic.",
    body: [
      "The Museum has confirmed that the preserved message still contains seventeen rocket emojis, three exclamation marks and no verifiable delivery information.",
      "The artifact remains in the same condition. The catalyst it once suggested remains absent from the collection.",
    ],
    finding: "EMOJI COUNT VERIFIED / CATALYST NOT FOUND.",
    action: "Please keep the message pinned and away from actual decision-making.",
    relatedLabel: "VISIT THE BAGHOLDER MUSEUM",
    relatedHref: "/museum",
  },
  {
    department: "CENTRAL RECORDS OFFICE",
    classification: "FILE / DUPLICATE",
    headline: "A COPY OF THE ORIGINAL COPY HAS BEEN FILED.",
    subject: "Duplicate preservation of a document whose original is not final.",
    body: [
      "The Department has received a file labelled FINAL_FINAL_v9_REAL_THIS_TIME, together with a request to preserve the previous final version.",
      "Both files have been retained. Neither has been designated the final record.",
    ],
    finding: "VERSION CONTROL HAS BEEN REFERRED TO VERSION CONTROL.",
    action: "Please do not delete the folder named OLD_FINALS.",
    relatedLabel: "SEARCH THE DEPARTMENT ARCHIVES",
    relatedHref: "/archives",
  },
  {
    department: "EXIT PROCEDURE OFFICE",
    classification: "EXIT / UNDER DISCUSSION",
    headline: "THE EXIT BUTTON HAS BEEN RELOCATED.",
    subject: "Temporary absence of a clearly labelled exit procedure.",
    body: [
      "A fictional participant has reported that the exit button is now located behind a submenu, a warning notice and a community poll.",
      "The Department has confirmed that the button was not physically removed. It may simply be waiting for the next interface update.",
    ],
    finding: "EXIT VISIBILITY BELOW THE DEPARTMENTAL REFERENCE LEVEL.",
    action: "Do not mistake a closed tab for a completed position.",
    relatedLabel: "READ THE BAGHOLDER MUSEUM",
    relatedHref: "/museum",
  },
  {
    department: "OFFICE OF TOKEN PURPOSE",
    classification: "UTILITY / PENDING",
    headline: "THE TOKEN HAS ASKED WHAT ITS JOB IS.",
    subject: "Internal role clarification request from a fictional ticker.",
    body: [
      "The token has submitted a request for a clear description of the task it performs, the user who needs it and the reason the product requires it.",
      "The Department has forwarded the request to the utility committee. The committee has asked whether the token can be used as the committee's logo.",
    ],
    finding: "ROLE DESCRIPTION PENDING / TICKER PRESENT.",
    action: "Please provide a use case before the next ecosystem phase.",
    relatedLabel: "INSPECT THE UTILITY CLAIMS",
    relatedHref: "/utility-inspector",
  },
  {
    department: "MEMBERSHIP OFFICE",
    classification: "BENEFITS / NONE",
    headline: "THE CLUB HAS APPROVED ANOTHER BENEFIT: NONE.",
    subject: "Clarification of the current membership privilege schedule.",
    body: [
      "The 99% Club has reviewed its benefits catalogue and confirmed that it remains intentionally empty.",
      "Members will continue to receive a deterministic number, a fictional classification and the privilege of explaining that the card has no practical value.",
    ],
    finding: "MEMBERSHIP GRANTED / EXPECTATIONS MANAGED.",
    action: "Please do not attempt to redeem the card for anything.",
    relatedLabel: "APPLY TO THE 99% CLUB",
    relatedHref: "/club",
  },
  {
    department: "GLOBAL COPE INDEX / SYNTHETIC METRICS",
    classification: "INDEX / NOT REAL",
    headline: "THE DEPARTMENT HAS DETECTED ELEVATED LEVELS OF SOON.",
    subject: "Daily fictional reading from the office of narrative volatility.",
    body: [
      "A synthetic date-seeded reading has identified a higher-than-usual presence of soon, strategic patience and chart-related optimism.",
      "The result is generated from a fixed fictional template rotation. It is not sampled from visitors, traders, exchanges or markets.",
    ],
    finding: "GLOBAL IN NAME / SYNTHETIC BY DESIGN.",
    action: "Please read the methodology before quoting the index.",
    relatedLabel: "OPEN THE GLOBAL COPE INDEX",
    relatedHref: "/cope-index",
  },
  {
    department: "OFFICE OF ENTRY PRICE RECONCILIATION",
    classification: "ENTRY / HISTORICAL",
    headline: "THE ORIGINAL ENTRY PRICE HAS REQUESTED A REFERENCE.",
    subject: "A missing number has been requested for an imaginary reconciliation.",
    body: [
      "The Department received a request to compare the original entry price with a price remembered from a screenshot saved before the chart was refreshed.",
      "The screenshot has been cropped. The date has been removed. The number is now a matter of institutional folklore.",
    ],
    finding: "REFERENCE PRICE NOT INDEPENDENTLY REPRODUCIBLE.",
    action: "Please attach the original source and stop using the phrase 'I remember'.",
    relatedLabel: "OPEN THE DYOR AUDIT",
    relatedHref: "/audit",
  },
  {
    department: "WHITEPAPER FORMATTING UNIT",
    classification: "DOCUMENT / COMPLETE",
    headline: "THE ABSTRACT HAS BEEN PROMOTED TO THE PRODUCT.",
    subject: "Document hierarchy correction following a missing demonstration.",
    body: [
      "After several reviews, the Abstract has been granted product status until such time as a working interface can be located.",
      "The team has been asked to avoid referring to the Abstract as a beta, since no one has yet been able to click it.",
    ],
    finding: "ABSTRACT AVAILABLE / PRODUCT NOT LOCATED.",
    action: "Please submit a user journey in addition to the abstract.",
    relatedLabel: "MAKE A WHITEPAPER",
    relatedHref: "/whitepaper-factory",
  },
  {
    department: "PUBLIC COMMUNICATIONS",
    classification: "STATEMENT / NON-COMMITTAL",
    headline: "THE MARKET HAS DECLINED TO COMMENT.",
    subject: "A short statement on the difference between research and outcomes.",
    body: [
      "The Department confirms that all research documents have been received, stamped and placed in the correct folder.",
      "The market has declined to provide a response, a timetable or a customer-service number.",
    ],
    finding: "RESEARCH RECEIVED / OUTCOME INDEPENDENT.",
    action: "Please do not interpret acknowledgement as a guarantee.",
    relatedLabel: "REVISIT THE DYOR AUDIT",
    relatedHref: "/audit",
  },
  {
    department: "DEPARTMENT OF DEPARTMENTAL REVIEW",
    classification: "REVIEW / RECURSIVE",
    headline: "THE REVIEW OF THE REVIEW HAS BEEN POSTPONED.",
    subject: "Status update on the review of the review process.",
    body: [
      "The review committee has requested more time to review the findings from the review of the previous review.",
      "A new working group has been formed to determine whether the review should itself be reviewed.",
    ],
    finding: "REVIEW CAPACITY FULL / REVIEW STATUS UNCHANGED.",
    action: "Please submit no further review requests until the review team returns.",
    relatedLabel: "OPEN THE DEPARTMENT ARCHIVES",
    relatedHref: "/archives",
  },
];

export function isValidUtcDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value + "T00:00:00Z");
  return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

export function shiftUtcDate(value: string, days: number): string {
  if (!isValidUtcDate(value) || !Number.isInteger(days)) {
    throw new Error("A valid UTC issue date and whole-day shift are required.");
  }
  const date = new Date(value + "T00:00:00Z");
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function buildDailyNotice(issueDate: string): DailyNotice {
  if (!isValidUtcDate(issueDate)) {
    throw new Error("A valid UTC issue date is required.");
  }
  const dayNumber = Math.floor(Date.parse(issueDate + "T00:00:00Z") / 86_400_000);
  const index = ((dayNumber % templates.length) + templates.length) % templates.length;
  const template = templates[index];
  const compact = issueDate.replace(/-/g, "");
  return {
    ...template,
    issueDate,
    docketNumber: "DDB-" + compact + "-" + String(index + 1).padStart(2, "0"),
    templateNumber: index + 1,
    methodology: "This daily notice is selected deterministically from a fixed set of fictional templates using the UTC issue date. It is not current news, market data, an external event report or a visitor-generated submission. The template rotation repeats; it does not claim to produce unique reporting every day.",
  };
}
