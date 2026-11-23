export type ClubWeeklyChallenge = {
  weekKey: string;
  weekNumber: number;
  title: string;
  prompt: string;
  note: string;
  options: { label: string; finding: string }[];
};

const weeklyCases = [
  {
    title: "THE LIQUIDITY EXPLANATION",
    prompt: "THE POOL HAS THINNED OUT. WHICH DEPARTMENTAL EXPLANATION GOES ON THE RECORD?",
    note: "One weekly file. One official explanation. The Department will not be accepting responsibility.",
    options: [
      { label: "THE LIQUIDITY IS RESTING BEFORE THE NEXT LEG.", finding: "POOL STATUS RECLASSIFIED AS A TEMPORARY RECOVERY PERIOD." },
      { label: "THE WHALES ARE TESTING THE COMMUNITY.", finding: "LARGE SELL ORDERS HAVE BEEN RECLASSIFIED AS A CONFIDENCE EXERCISE." },
      { label: "THE CHART DOES NOT SHOW THE FULL VISION.", finding: "THE DEPARTMENT HAS ACCEPTED A NON-CHART-BASED DEFENCE." },
    ],
  },
  {
    title: "THE KOL RECEIPT",
    prompt: "THE KOL HAS DELETED THE CALL. WHAT IS YOUR OFFICIAL INTERPRETATION?",
    note: "The original post cannot be located. The conviction remains fully searchable.",
    options: [
      { label: "IT WAS A TEST OF OUR INDEPENDENT CONVICTION.", finding: "DELETED POST RECLASSIFIED AS AN ADVANCED COMMUNITY FILTER." },
      { label: "THE CALL WAS FOR A DIFFERENT TIMEFRAME.", finding: "THE TIMEFRAME HAS BEEN EXTENDED TO INCLUDE ALL POSSIBLE OUTCOMES." },
      { label: "THE KOL IS BUILDING IN SILENCE.", finding: "ABSENCE OF EVIDENCE ENTERED AS A STRATEGIC COMMUNICATION." },
    ],
  },
  {
    title: "THE CTO HANDOVER",
    prompt: "THE NEW CTO HAS POSTED A SINGLE GREEN CHECKMARK. WHAT HAS BEEN DELIVERED?",
    note: "No roadmap, code or liquidity evidence is attached to this exercise.",
    options: [
      { label: "THE FOUNDATION OF A NEW ERA.", finding: "ONE CHECKMARK HAS BEEN ACCEPTED AS A MULTI-PHASE DELIVERY SIGNAL." },
      { label: "THE TEAM IS WORKING BEHIND THE SCENES.", finding: "THE SCENES HAVE BEEN CLASSIFIED AS CONFIDENTIAL." },
      { label: "WE SHOULD GIVE THEM ANOTHER WEEK.", finding: "THE DEPARTMENT HAS ISSUED AN AUTOMATIC SEVEN-DAY EXTENSION." },
    ],
  },
  {
    title: "THE ENTRY PRICE REVIEW",
    prompt: "YOUR ENTRY IS NOW A HISTORICAL HIGH. HOW SHOULD THE FILE DESCRIBE IT?",
    note: "The entry price is fictional. The confidence level is not under review.",
    options: [
      { label: "A PREMIUM EARLY-ACCESS POSITION.", finding: "HISTORICAL HIGH RECLASSIFIED AS A FOUNDING-LEVEL ENTRY." },
      { label: "A LONG-TERM AVERAGE-IN OPPORTUNITY.", finding: "THE POSITION HAS BEEN MOVED TO THE FAMILY-OFFICE DIVISION." },
      { label: "A PRICE DISCOVERY EVENT THAT GOT OUT OF HAND.", finding: "THE DEPARTMENT HAS ACCEPTED THE WORD 'EVENT' AS MITIGATION." },
    ],
  },
  {
    title: "THE STILL-EARLY CERTIFICATE",
    prompt: "THE PROJECT HAS BEEN 'STILL EARLY' FOR SIX MONTHS. WHAT DOES THAT MEAN?",
    note: "Time is a social construct. The archived launch date is not.",
    options: [
      { label: "THE MARKET HAS NOT UNDERSTOOD THE THESIS YET.", finding: "MARKET UNDERSTANDING REMAINS UNDER INDEFINITE REVIEW." },
      { label: "THE COMMUNITY IS STILL FORMING.", finding: "THE COMMUNITY FORMATION WINDOW HAS BEEN EXTENDED WITHOUT A DEADLINE." },
      { label: "WE ARE EARLY TO THE NEXT NARRATIVE.", finding: "THE FILE HAS BEEN TRANSFERRED TO THE NEXT TICKER DEPARTMENT." },
    ],
  },
  {
    title: "THE WALLET GRAPH",
    prompt: "THREE WALLETS SOLD. WHAT DOES THIS PROVE ABOUT OWNERSHIP?",
    note: "Transaction patterns alone are not proof of common ownership or intent.",
    options: [
      { label: "NOTHING WITHOUT MORE EVIDENCE. FILE THE LIMITATION.", finding: "THE DEPARTMENT HAS RECORDED A RARE DISTINCTION BETWEEN OBSERVATION AND ATTRIBUTION." },
      { label: "THE GROUP CHAT HAS ALREADY IDENTIFIED THE SAME PERSON.", finding: "COMMUNITY CONFIDENCE HAS BEEN LOGGED. EVIDENCE HAS NOT." },
      { label: "THE GRAPH LOOKS LIKE A FAMILY TREE.", finding: "A VISUAL SIMILARITY HAS BEEN PROMOTED TO A FULL NARRATIVE." },
    ],
  },
  {
    title: "THE REVENGE ENTRY",
    prompt: "THE PREVIOUS BAG IS DOWN. A NEW TICKER IS TRENDING. WHAT IS YOUR NEXT MOVE?",
    note: "The Department records the conviction, not the performance.",
    options: [
      { label: "NEW TICKER. CLEAN SLATE. THE NEXT ONE IS MINE.", finding: "THE PREVIOUS FILE HAS BEEN CLOSED WITHOUT A LESSONS-LEARNED SECTION." },
      { label: "I WILL RESEARCH UNTIL I FIND A REASON TO ENTER.", finding: "RESEARCH SCOPE HAS BEEN EXPANDED TO MATCH THE DESIRED CONCLUSION." },
      { label: "I WILL WAIT FOR A SECOND GREEN CANDLE.", finding: "THE DEPARTMENT HAS LOGGED A TWO-CANDLE CONFIRMATION STANDARD." },
    ],
  },
  {
    title: "THE FINAL EXPLANATION",
    prompt: "THE TOKEN HAS STOPPED MOVING. WHICH STATEMENT PROTECTS YOUR ORIGINAL THESIS?",
    note: "All available explanations have been exhausted at least once.",
    options: [
      { label: "THE MARKET IS QUIET BEFORE THE REAL MOVE.", finding: "INACTIVITY HAS BEEN RECLASSIFIED AS A PRE-MOVE CONDITION." },
      { label: "THE COMMUNITY IS CONSOLIDATING CONVICTION.", finding: "LOW ACTIVITY HAS BEEN RECORDED AS AN INTERNAL ALIGNMENT EXERCISE." },
      { label: "THE NEXT ONE IS MINE. THIS ONE WAS PRACTICE.", finding: "THE DEPARTMENT HAS OPENED A NEW FILE. THE OLD ONE REMAINS UNRESOLVED." },
    ],
  },  {
    "title": "THE BRIDGE-HOP REVIEW",
    "prompt": "THE CROSS-CHAIN TRANSFER IS STILL PENDING. WHICH OFFICIAL EXPLANATION GOES INTO THE FILE?",
    "note": "This is a fictional scenario. No actual transfer, address or network is being inspected.",
    "options": [
      {
        "label": "THE ROUTE IS TAKING THE SCENIC PATH.",
        "finding": "WAITING TIME RECLASSIFIED AS AN UNPLANNED CULTURAL EXPERIENCE."
      },
      {
        "label": "THE DESTINATION NETWORK HAS NOT READ THE BRIEFING.",
        "finding": "THE HANDOFF HAS BEEN REFERRED TO INTER-DEPARTMENTAL COMMUNICATIONS."
      },
      {
        "label": "I WILL CALL IT A LONG-TERM CROSS-CHAIN POSITION.",
        "finding": "A PENDING TRANSFER HAS BEEN PROMOTED TO A STRATEGIC HOLDING PERIOD."
      }
    ]
  },
  {
    "title": "THE UNLOCK CALENDAR REVIEW",
    "prompt": "THE TOKEN UNLOCK WAS ON THE PUBLIC CALENDAR. WHY IS THE FILE MARKED UNEXPECTED?",
    "note": "The calendar and the scenario are fictional. The Department does not track real token schedules.",
    "options": [
      {
        "label": "I WAS WATCHING THE COMMUNITY SENTIMENT INSTEAD.",
        "finding": "PUBLIC INFORMATION HAS BEEN OUTRANKED BY A PINNED BULLISH THREAD."
      },
      {
        "label": "THE DATE WAS CLEAR. MY INTERPRETATION WAS NOT.",
        "finding": "THE DEPARTMENT HAS ACCEPTED A RARE ADMISSION OF ATTENTION FAILURE."
      },
      {
        "label": "THE UNLOCK IS PART OF THE LONG-TERM STORY.",
        "finding": "A SCHEDULED EVENT HAS BEEN RECLASSIFIED AS NARRATIVE DEVELOPMENT."
      }
    ]
  },
  {
    "title": "THE AIRDROP ELIGIBILITY APPEAL",
    "prompt": "EVERY FICTIONAL TASK WAS COMPLETED. THE ELIGIBILITY RESULT SAYS OTHERWISE. WHAT IS YOUR APPEAL?",
    "note": "No actual airdrop, eligibility checker or wallet is involved in this exercise.",
    "options": [
      {
        "label": "THE CHECKLIST AND I HAVE DIFFERENT DEFINITIONS OF COMPLETE.",
        "finding": "THE DEPARTMENT HAS OPENED A SEMANTIC REVIEW OF THE WORD 'EVERY'."
      },
      {
        "label": "THE ALLOCATION IS PROBABLY STILL PROCESSING.",
        "finding": "NO ALLOCATION HAS BEEN FOUND. PROCESSING REMAINS A PROMISING THEORY."
      },
      {
        "label": "I WOULD LIKE TO APPEAL THE APPEAL PROCESS.",
        "finding": "THE CASE HAS ENTERED AN INFINITE ADMINISTRATIVE LOOP."
      }
    ]
  },
  {
    "title": "THE GOVERNANCE QUORUM",
    "prompt": "THE FICTIONAL PROPOSAL PASSED. THE GROUP CHAT DISAGREES. WHICH RESULT IS OFFICIAL?",
    "note": "The scenario is satire and does not describe any real governance vote or protocol.",
    "options": [
      {
        "label": "THE PUBLISHED RESULT. FILE THE RECEIPT.",
        "finding": "THE DEPARTMENT HAS RECORDED A RARE DISTINCTION BETWEEN A RESULT AND A REACTION."
      },
      {
        "label": "THE GROUP CHAT NEEDS ONE MORE POLL.",
        "finding": "THE VOTE HAS BEEN REOPENED IN THE UNOFFICIAL DISCUSSION LAYER."
      },
      {
        "label": "THE RESULT IS VALID UNTIL SOMEONE POSTS A SCREENSHOT.",
        "finding": "GOVERNANCE FINALITY HAS BEEN PLACED ON A SOCIAL-MEDIA REVIEW PERIOD."
      }
    ]
  }

] as const;

export function getIsoClubWeekKey(date: Date): { weekKey: string; weekNumber: number; year: number } {
  const utcDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - day);
  const year = utcDate.getUTCFullYear();
  const yearStart = new Date(Date.UTC(year, 0, 1));
  const weekNumber = Math.ceil((((utcDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return { weekKey: year + "-W" + String(weekNumber).padStart(2, "0"), weekNumber, year };
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
// ISO week 41 (5 October 2026) maps to the first case. This keeps the
// previously active 2026-W48 case in place while the expanded library rolls forward.
const WEEKLY_ROTATION_ANCHOR_UTC = Date.UTC(2026, 9, 5);

function getWeeklyRotationIndex(date: Date): number {
  if (!Number.isFinite(date.getTime())) throw new TypeError("A valid Club challenge date is required.");
  const monday = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const weekday = monday.getUTCDay() || 7;
  monday.setUTCDate(monday.getUTCDate() - weekday + 1);
  const elapsedWeeks = Math.floor((monday.getTime() - WEEKLY_ROTATION_ANCHOR_UTC) / WEEK_MS);
  return ((elapsedWeeks % weeklyCases.length) + weeklyCases.length) % weeklyCases.length;
}

export function getCurrentClubWeeklyChallenge(now = new Date()): ClubWeeklyChallenge {
  const { weekKey, weekNumber } = getIsoClubWeekKey(now);
  const current = weeklyCases[getWeeklyRotationIndex(now)];
  return {
    weekKey,
    weekNumber,
    title: current.title,
    prompt: current.prompt,
    note: current.note,
    options: current.options.map((option) => ({ ...option })),
  };
}

export const CLUB_WEEKLY_CHALLENGE_ROTATION_LENGTH = weeklyCases.length;
