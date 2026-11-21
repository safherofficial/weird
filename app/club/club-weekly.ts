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
  },
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

export function getCurrentClubWeeklyChallenge(now = new Date()): ClubWeeklyChallenge {
  const { weekKey, weekNumber } = getIsoClubWeekKey(now);
  const current = weeklyCases[(weekNumber - 1) % weeklyCases.length];
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
