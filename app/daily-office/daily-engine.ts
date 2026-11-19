export const DAILY_OFFICE_VERSION = 1;

export type DailyOfficeSection = {
  label: string;
  heading: string;
  body: string;
  stamp: string;
};

export type DailyOfficeDispatch = {
  issueDate: string;
  reference: string;
  headline: string;
  subheading: string;
  bulletin: string;
  sections: DailyOfficeSection[];
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
];

const methodology =
  "This daily dispatch is deterministic editorial fiction selected from fixed Department templates using the UTC issue date. It does not summarize actual news, market events, tokens, projects, wallets, communities or visitor activity. No external feed or live data is used.";

function hashText(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pick<T>(items: T[], seed: number, salt: number): T {
  const mixed = Math.imul(seed ^ (salt * 0x45d9f3b), 0x27d4eb2d) >>> 0;
  return items[mixed % items.length];
}

export function buildDailyOfficeDispatch(issueDate: string): DailyOfficeDispatch {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(issueDate)) {
    throw new Error("A valid UTC issue date is required.");
  }

  const parsed = new Date(issueDate + "T00:00:00.000Z");
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== issueDate) {
    throw new Error("A valid UTC issue date is required.");
  }

  const seed = hashText("THE-DYOR-DEPARTMENT/DAILY-OFFICE/" + issueDate);
  const incident = pick(incidents, seed, 13);
  const memo = pick(memos, seed, 29);
  const headline = pick(headlines, seed, 43);
  const bulletin = pick(bulletins, seed, 59);
  const quote = pick(quotes, seed, 71);
  const assignedDepartment = pick(departments, seed, 83);
  const disposition = pick(dispositions, seed, 97);
  const referenceNumber = String((seed % 9000) + 1000);

  return {
    issueDate,
    reference: "DD-" + issueDate.replace(/-/g, "") + "-" + referenceNumber,
    headline,
    subheading: "THE DAILY DEPARTMENTAL ABSURDITY / ISSUE " + referenceNumber,
    bulletin,
    sections: [
      {
        label: "INCIDENT REPORT",
        heading: incident.heading,
        body: incident.body,
        stamp: incident.stamp,
      },
      {
        label: "INTERNAL CORRESPONDENCE",
        heading: memo.heading,
        body: memo.body,
        stamp: memo.stamp,
      },
    ],
    quote,
    assignedDepartment,
    disposition,
    footer: "THE DAY HAS BEEN FILED. THE MARKET HAS NOT BEEN CONSULTED.",
    methodology,
  };
}
