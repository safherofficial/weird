import type { DepartmentCrossRead } from "../lib/department-cross-read";

export const BRIDGE_FILE_VERSION = 1;
export const BRIDGE_QUESTIONS = 7;

export type BridgeArchetypeId =
  | "receipt-clerk"
  | "source-chain-optimist"
  | "destination-watcher"
  | "confirmation-collector"
  | "ticket-archivist"
  | "refund-fictionist"
  | "wrong-network-tourist"
  | "refresh-addict";

export type BridgeOption = {
  label: string;
  receiptQuality: number;
  routeLiteracy: number;
  patienceDiscipline: number;
  tag: BridgeArchetypeId;
};

export type BridgeQuestion = {
  prompt: string;
  note: string;
  options: BridgeOption[];
};

export type BridgeArchetype = {
  title: string;
  subtitle: string;
  roast: string;
  disposition: string;
};

export type BridgeHistory = {
  question: string;
  answer: string;
  receiptQuality: number;
  routeLiteracy: number;
  patienceDiscipline: number;
};

export type BridgeProgress = {
  completedQuestions: number;
  receiptQuality: number;
  routeLiteracy: number;
  patienceDiscipline: number;
  history: BridgeHistory[];
};

export type BridgeResult = BridgeProgress & {
  answers: number[];
  caseNumber: string;
  primaryTag: BridgeArchetypeId;
  secondaryTag: BridgeArchetypeId;
  profile: BridgeArchetype;
  secondaryProfile: BridgeArchetype;
  finding: string;
  crossRead: DepartmentCrossRead;
};

export const bridgeQuestions: BridgeQuestion[] = [
  {
    prompt: "WHAT DOES YOUR FIRST TRANSFER RECEIPT ACTUALLY SHOW?",
    note: "A source-side confirmation is one record in a route. It does not automatically establish destination delivery.",
    options: [
      { label: "A dated source transaction reference, network and final status, kept with the route details.", receiptQuality: 5, routeLiteracy: 4, patienceDiscipline: 4, tag: "receipt-clerk" },
      { label: "A screenshot of the source explorer saying success. The rest is surely automatic.", receiptQuality: 2, routeLiteracy: 1, patienceDiscipline: 2, tag: "source-chain-optimist" },
      { label: "A notification that the transfer has started, plus a strong feeling of completion.", receiptQuality: 1, routeLiteracy: 0, patienceDiscipline: 1, tag: "source-chain-optimist" },
      { label: "A crop from a group chat. The transaction hash was in the previous message.", receiptQuality: 0, routeLiteracy: 0, patienceDiscipline: 0, tag: "ticket-archivist" },
    ],
  },
  {
    prompt: "HOW DO YOU RECORD THE ROUTE BETWEEN THE TWO NETWORKS?",
    note: "The source network, destination network, route provider and relevant message or transfer reference are separate pieces of context.",
    options: [
      { label: "I record both networks, the selected route and the identifiers needed to reconcile each side.", receiptQuality: 5, routeLiteracy: 5, patienceDiscipline: 4, tag: "receipt-clerk" },
      { label: "I remember the destination chain. It was the one with the blue logo.", receiptQuality: 1, routeLiteracy: 1, patienceDiscipline: 1, tag: "wrong-network-tourist" },
      { label: "I saved the bridge name, but not which route or destination I selected.", receiptQuality: 2, routeLiteracy: 2, patienceDiscipline: 2, tag: "destination-watcher" },
      { label: "The route is obvious from the token symbol. I have not written anything down.", receiptQuality: 0, routeLiteracy: 0, patienceDiscipline: 0, tag: "wrong-network-tourist" },
    ],
  },
  {
    prompt: "THE SOURCE SIDE SAYS COMPLETE. THE DESTINATION SIDE IS STILL PENDING. WHAT IS YOUR READING?",
    note: "A transfer can involve distinct source, message and destination steps. One completed stage is not proof that every stage settled.",
    options: [
      { label: "I keep the states separate and wait for destination-side evidence before calling it delivered.", receiptQuality: 5, routeLiteracy: 5, patienceDiscipline: 5, tag: "destination-watcher" },
      { label: "The source transaction is final, so the destination balance must already be mine.", receiptQuality: 1, routeLiteracy: 0, patienceDiscipline: 1, tag: "source-chain-optimist" },
      { label: "I refresh the destination wallet every few seconds and treat each reload as a status update.", receiptQuality: 0, routeLiteracy: 1, patienceDiscipline: 0, tag: "refresh-addict" },
      { label: "I declare the bridge broken and start writing the post-mortem before checking the route.", receiptQuality: 1, routeLiteracy: 1, patienceDiscipline: 0, tag: "refund-fictionist" },
    ],
  },
  {
    prompt: "WHICH PART OF THE MESSAGE OR TRANSFER RECORD DO YOU KEEP?",
    note: "A useful fictional incident file distinguishes source transaction, route or message reference, and destination transaction evidence.",
    options: [
      { label: "All available references, timestamps, status transitions and the network for each record.", receiptQuality: 5, routeLiteracy: 5, patienceDiscipline: 4, tag: "confirmation-collector" },
      { label: "Only the source transaction. I assume the bridge can find the rest.", receiptQuality: 2, routeLiteracy: 1, patienceDiscipline: 2, tag: "source-chain-optimist" },
      { label: "The destination screenshot, cropped so the account balance looks more reassuring.", receiptQuality: 1, routeLiteracy: 2, patienceDiscipline: 1, tag: "destination-watcher" },
      { label: "A collection of screenshots with no shared timestamp or reference number.", receiptQuality: 0, routeLiteracy: 0, patienceDiscipline: 0, tag: "ticket-archivist" },
    ],
  },
  {
    prompt: "HOW DO YOU TREAT CONFIRMATIONS, FINALITY AND DELAY WINDOWS?",
    note: "Different networks and routes may have different settlement conditions. This questionnaire does not inspect a live bridge or recommend a transfer action.",
    options: [
      { label: "I read the route's published status definitions and keep the relevant confirmation context.", receiptQuality: 4, routeLiteracy: 5, patienceDiscipline: 5, tag: "confirmation-collector" },
      { label: "One green tick is the universal language of finality.", receiptQuality: 1, routeLiteracy: 0, patienceDiscipline: 1, tag: "source-chain-optimist" },
      { label: "I understand that pending can be a stage, but I have not saved the route's stated conditions.", receiptQuality: 2, routeLiteracy: 3, patienceDiscipline: 3, tag: "destination-watcher" },
      { label: "I have opened seventeen tabs and now believe the longest estimate is a personal insult.", receiptQuality: 0, routeLiteracy: 1, patienceDiscipline: 0, tag: "refresh-addict" },
    ],
  },
  {
    prompt: "WHAT DOES YOUR SUPPORT TICKET CONTAIN?",
    note: "A useful report separates documented facts from guesses. Never share seed phrases, private keys or sensitive account credentials.",
    options: [
      { label: "The route, networks, public transaction references, timestamps and the exact status shown.", receiptQuality: 5, routeLiteracy: 4, patienceDiscipline: 4, tag: "ticket-archivist" },
      { label: "The words 'URGENT' and 'WHERE ARE MY FUNDS' repeated in six paragraphs.", receiptQuality: 0, routeLiteracy: 1, patienceDiscipline: 0, tag: "ticket-archivist" },
      { label: "A screenshot and a promise to provide the reference number after the reply.", receiptQuality: 1, routeLiteracy: 1, patienceDiscipline: 2, tag: "refresh-addict" },
      { label: "A DM to an account offering to recover the transfer for a small upfront fee.", receiptQuality: 0, routeLiteracy: 0, patienceDiscipline: 0, tag: "refund-fictionist" },
    ],
  },
  {
    prompt: "THE INCIDENT REMAINS UNRESOLVED. WHAT GOES INTO YOUR FINAL FILE?",
    note: "Do not infer a refund, loss or recovery from a pending label alone. The real status would require the official route and network records.",
    options: [
      { label: "A timeline of confirmed stages, the unresolved step and the documented support response.", receiptQuality: 5, routeLiteracy: 5, patienceDiscipline: 5, tag: "receipt-clerk" },
      { label: "A refund estimate based on a comment that said 'usually takes ten minutes'.", receiptQuality: 1, routeLiteracy: 1, patienceDiscipline: 1, tag: "refund-fictionist" },
      { label: "A final status of 'lost forever' because the destination balance has not changed yet.", receiptQuality: 0, routeLiteracy: 0, patienceDiscipline: 0, tag: "refund-fictionist" },
      { label: "A folder called BRIDGE FINAL FINAL 7, containing every screenshot except the useful one.", receiptQuality: 0, routeLiteracy: 1, patienceDiscipline: 0, tag: "ticket-archivist" },
    ],
  },
];

export const bridgeClassifications: Record<BridgeArchetypeId, BridgeArchetype> = {
  "receipt-clerk": {
    title: "THE RECEIPT CLERK",
    subtitle: "You keep both sides of the route on file and refuse to certify a transfer from one green tick.",
    roast: "Your evidence folder has a naming convention. The bridge queue has asked whether you can manage its records department.",
    disposition: "REFERRED TO THE OFFICE OF COMPLETE DOCUMENTATION.",
  },
  "source-chain-optimist": {
    title: "THE SOURCE-CHAIN OPTIMIST",
    subtitle: "The source event is complete, and you have decided the destination is a matter of administrative imagination.",
    roast: "One chain said success. You have already planned the destination-side victory lap.",
    disposition: "PLACED ON THE WAITLIST FOR DESTINATION-SIDE CONFIRMATION.",
  },
  "destination-watcher": {
    title: "THE DESTINATION WATCHER",
    subtitle: "You understand the second half of the route, but the pending label has become your full-time occupation.",
    roast: "Your destination wallet has been refreshed so often it is considering a change of address.",
    disposition: "ASSIGNED TO THE OFFICE OF PATIENT RECONCILIATION.",
  },
  "confirmation-collector": {
    title: "THE CONFIRMATION COLLECTOR",
    subtitle: "Every status has a screenshot, and every screenshot has a timestamp that you will defend in court.",
    roast: "You have collected more confirmation states than the bridge has publicly documented.",
    disposition: "REFERRED TO THE DIVISION OF FINALITY DEFINITIONS.",
  },
  "ticket-archivist": {
    title: "THE SUPPORT-TICKET ARCHIVIST",
    subtitle: "Your case history is extensive. The support queue has begun treating you as a permanent correspondent.",
    roast: "Ticket number 0097 is a continuation of ticket number 0096, which was a continuation of the original question.",
    disposition: "TRANSFERRED TO THE OFFICE OF REFERENCE NUMBER RECOVERY.",
  },
  "refund-fictionist": {
    title: "THE REFUND FICTIONIST",
    subtitle: "You have drafted the recovery narrative before the incident has finished reporting its facts.",
    roast: "The refund has been mentally received. The actual status has not been invited to the meeting.",
    disposition: "REFERRED TO THE OFFICE OF OUTCOME-NEUTRAL LANGUAGE.",
  },
  "wrong-network-tourist": {
    title: "THE WRONG-NETWORK TOURIST",
    subtitle: "You arrived on the destination chain with the confidence of someone who did not check the itinerary.",
    roast: "The asset is not missing from the network you selected. The network you selected is the plot twist.",
    disposition: "ISSUED A MAP AND A REMINDER TO READ THE DESTINATION FIELD.",
  },
  "refresh-addict": {
    title: "THE BRIDGE-STATUS REFRESHER",
    subtitle: "You have refreshed every status page, including the ones that were never connected to your route.",
    roast: "The status has not changed. The refresh counter has achieved finality.",
    disposition: "PLACED IN THE CARE OF THE OFFICE OF CONTROLLED REFRESH INTERVALS.",
  },
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function isValidBridgeAnswers(value: unknown): value is number[] {
  return Array.isArray(value) && value.length === BRIDGE_QUESTIONS &&
    value.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4);
}

export function encodeBridgeCode(answers: number[]): string {
  if (!isValidBridgeAnswers(answers)) throw new Error("A complete, valid bridge incident interview is required.");
  return "b" + BRIDGE_FILE_VERSION + "-" + answers.join("");
}

export function decodeBridgeCode(value: unknown): number[] | null {
  if (typeof value !== "string") return null;
  const match = value.match(new RegExp("^b" + BRIDGE_FILE_VERSION + "-([0-3]{" + BRIDGE_QUESTIONS + "})$"));
  if (!match) return null;
  const answers = [...match[1]].map(Number);
  return isValidBridgeAnswers(answers) ? answers : null;
}

export function inspectBridgeProgress(answers: number[]): BridgeProgress {
  if (!Array.isArray(answers) || answers.length > BRIDGE_QUESTIONS ||
    !answers.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)) {
    throw new Error("Bridge incident interview answers are invalid.");
  }
  const history = answers.map((answer, index) => {
    const option = bridgeQuestions[index].options[answer];
    return {
      question: bridgeQuestions[index].prompt,
      answer: option.label,
      receiptQuality: option.receiptQuality,
      routeLiteracy: option.routeLiteracy,
      patienceDiscipline: option.patienceDiscipline,
    };
  });
  const maxScore = Math.max(1, answers.length * 5);
  return {
    completedQuestions: answers.length,
    receiptQuality: answers.length ? round(history.reduce((sum, item) => sum + item.receiptQuality, 0) / maxScore * 100) : 0,
    routeLiteracy: answers.length ? round(history.reduce((sum, item) => sum + item.routeLiteracy, 0) / maxScore * 100) : 0,
    patienceDiscipline: answers.length ? round(history.reduce((sum, item) => sum + item.patienceDiscipline, 0) / maxScore * 100) : 0,
    history,
  };
}

export function buildBridgeResult(answers: number[]): BridgeResult {
  if (!isValidBridgeAnswers(answers)) throw new Error("A complete, valid bridge incident interview is required.");
  const progress = inspectBridgeProgress(answers);
  const tallies = new Map<BridgeArchetypeId, { count: number; firstIndex: number }>();
  answers.forEach((answer, index) => {
    const tag = bridgeQuestions[index].options[answer].tag;
    const existing = tallies.get(tag);
    if (existing) existing.count += 1;
    else tallies.set(tag, { count: 1, firstIndex: index });
  });
  const ranking = [...tallies.entries()].sort((a, b) => b[1].count - a[1].count || a[1].firstIndex - b[1].firstIndex);
  const primaryTag = ranking[0]?.[0] ?? "refresh-addict";
  const secondaryTag = ranking[1]?.[0] ?? primaryTag;
  const seed = answers.reduce((sum, answer, index) => ((sum * 31) + (answer + 1) * (index + 29)) % 900000, 307711);
  const caseNumber = String(seed + 100000).slice(-6);
  const strongest = progress.history.reduce((best, item, index, rows) => item.receiptQuality > rows[best].receiptQuality ? index : best, 0);
  const weakest = progress.history.reduce((best, item, index, rows) => item.patienceDiscipline < rows[best].patienceDiscipline ? index : best, 0);
  const strongestItem = progress.history[strongest];
  const weakestItem = progress.history[weakest];
  const finding = progress.receiptQuality >= 75 && progress.routeLiteracy >= 75 && progress.patienceDiscipline >= 75
    ? "SOURCE AND DESTINATION RECORDS MAINTAINED / FINALITY NOT ASSUMED."
    : progress.receiptQuality <= 25
      ? "INCIDENT REPORTED / SOURCE AND DESTINATION RECEIPTS INCOMPLETE."
      : progress.routeLiteracy <= 25
        ? "ROUTE EVIDENCE INSUFFICIENT / NETWORK CONTEXT REQUIRED."
        : progress.patienceDiscipline <= 25
          ? "PENDING STATUS INTERPRETED AS A FINAL OUTCOME."
          : "TRANSFER STATUS UNDER REVIEW / SETTLEMENT NOT CERTIFIED.";
  const crossRead: DepartmentCrossRead = {
    headline: progress.receiptQuality >= 70 && progress.routeLiteracy >= 70
      ? "BOTH SIDES DOCUMENTED / SETTLEMENT STILL A SEPARATE EVENT"
      : progress.routeLiteracy <= 30
        ? "THE ROUTE DETAILS DID NOT SURVIVE THE SCREENSHOT"
        : progress.patienceDiscipline <= 30
          ? "THE REFRESH COUNTER HAS SETTLED BEFORE THE TRANSFER"
          : "SOURCE CONFIRMATION AND DESTINATION DELIVERY ARE SEPARATE FILES",
    interpretation: "These fictional scores reflect only your seven selected answers: receipt quality " + progress.receiptQuality + "/100, route literacy " + progress.routeLiteracy + "/100 and patience discipline " + progress.patienceDiscipline + "/100. No wallet, bridge, network, transaction, route provider or live transfer was checked.",
    signals: [
      {
        label: "STRONGEST DOCUMENTATION HABIT",
        context: strongestItem.question,
        answer: strongestItem.answer,
        detail: "Receipt quality " + strongestItem.receiptQuality + "/5 · Route literacy " + strongestItem.routeLiteracy + "/5 · Patience " + strongestItem.patienceDiscipline + "/5.",
      },
      {
        label: "WEAKEST PATIENCE HABIT",
        context: weakestItem.question,
        answer: weakestItem.answer,
        detail: "Receipt quality " + weakestItem.receiptQuality + "/5 · Route literacy " + weakestItem.routeLiteracy + "/5 · Patience " + weakestItem.patienceDiscipline + "/5.",
      },
    ],
  };

  return {
    ...progress,
    answers: [...answers],
    caseNumber,
    primaryTag,
    secondaryTag,
    profile: bridgeClassifications[primaryTag],
    secondaryProfile: bridgeClassifications[secondaryTag],
    finding,
    crossRead,
  };
}
