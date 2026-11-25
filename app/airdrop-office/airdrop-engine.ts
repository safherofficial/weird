import type { DepartmentCrossRead } from "../lib/department-cross-read";

export const AIRDROP_FILE_VERSION = 1;
export const AIRDROP_QUESTIONS = 7;

export type AirdropArchetypeId =
  | "snapshot-lawyer"
  | "points-maximalist"
  | "cross-chain-tourist"
  | "discord-shift-worker"
  | "sybil-whisperer"
  | "retroactive-romantic"
  | "allocation-realist"
  | "claim-window-casualty";

export type AirdropOption = {
  label: string;
  receipts: number;
  ruleAwareness: number;
  expectationControl: number;
  tag: AirdropArchetypeId;
};

export type AirdropQuestion = {
  prompt: string;
  note: string;
  options: AirdropOption[];
};

export type AirdropArchetype = {
  title: string;
  subtitle: string;
  roast: string;
  disposition: string;
};

export type AirdropHistory = {
  question: string;
  answer: string;
  receipts: number;
  ruleAwareness: number;
  expectationControl: number;
};

export type AirdropProgress = {
  completedQuestions: number;
  receipts: number;
  ruleAwareness: number;
  expectationControl: number;
  history: AirdropHistory[];
};

export type AirdropResult = AirdropProgress & {
  answers: number[];
  caseNumber: string;
  primaryTag: AirdropArchetypeId;
  secondaryTag: AirdropArchetypeId;
  profile: AirdropArchetype;
  secondaryProfile: AirdropArchetype;
  finding: string;
  crossRead: DepartmentCrossRead;
};

export const airdropQuestions: AirdropQuestion[] = [
  {
    prompt: "WHAT MAKES YOU BELIEVE YOUR ACTIVITY COUNTS TOWARDS ELIGIBILITY?",
    note: "A points counter, a community rumour and a published eligibility policy are three different documents.",
    options: [
      { label: "A published programme rule names the qualifying action, network and evidence required.", receipts: 5, ruleAwareness: 5, expectationControl: 4, tag: "snapshot-lawyer" },
      { label: "An official dashboard displays activity, but the eligibility conditions are still being clarified.", receipts: 4, ruleAwareness: 3, expectationControl: 3, tag: "points-maximalist" },
      { label: "Several community accounts agree that this activity should count.", receipts: 1, ruleAwareness: 1, expectationControl: 1, tag: "discord-shift-worker" },
      { label: "The project said it rewards early supporters. I have interpreted that as a binding policy.", receipts: 0, ruleAwareness: 0, expectationControl: 0, tag: "retroactive-romantic" },
    ],
  },
  {
    prompt: "HOW DO YOU KEEP A RECORD OF THE WORK YOU HAVE DONE?",
    note: "The questionnaire does not inspect addresses, dashboards or transaction history. Select the description that best fits you.",
    options: [
      { label: "I keep dated receipts and links to the official rules, with the network and action recorded.", receipts: 5, ruleAwareness: 5, expectationControl: 4, tag: "snapshot-lawyer" },
      { label: "I have a points spreadsheet, three dashboards and a folder called FINAL_FINAL_AIRDROP.", receipts: 3, ruleAwareness: 2, expectationControl: 2, tag: "points-maximalist" },
      { label: "I rely on a Discord role, a leaderboard screenshot and a mod who knows my username.", receipts: 1, ruleAwareness: 1, expectationControl: 1, tag: "discord-shift-worker" },
      { label: "I remember the important transactions. The screenshots are probably somewhere.", receipts: 0, ruleAwareness: 0, expectationControl: 0, tag: "claim-window-casualty" },
    ],
  },
  {
    prompt: "HOW DO YOU INTERPRET A SNAPSHOT DATE THAT HAS NOT BEEN ANNOUNCED?",
    note: "A missing date is not evidence that the snapshot has already happened, or that it will include every past action.",
    options: [
      { label: "I wait for official timing, qualifying windows, finality requirements and exclusions to be published.", receipts: 5, ruleAwareness: 5, expectationControl: 5, tag: "snapshot-lawyer" },
      { label: "I keep a record of activity but treat any future snapshot as uncertain until rules are released.", receipts: 4, ruleAwareness: 4, expectationControl: 5, tag: "allocation-realist" },
      { label: "I assume the snapshot is near because a few accounts have started posting countdown graphics.", receipts: 1, ruleAwareness: 1, expectationControl: 1, tag: "retroactive-romantic" },
      { label: "I refresh the points page and call each loading spinner a snapshot signal.", receipts: 0, ruleAwareness: 0, expectationControl: 0, tag: "points-maximalist" },
    ],
  },
  {
    prompt: "WHAT DO YOU ASSUME ABOUT ACTIVITY ACROSS DIFFERENT NETWORKS?",
    note: "Cross-chain activity only counts when a programme's actual rules say how it is recognised and attributed.",
    options: [
      { label: "I check the supported networks, eligible actions and how the programme reconciles activity.", receipts: 5, ruleAwareness: 5, expectationControl: 4, tag: "snapshot-lawyer" },
      { label: "I keep separate records for each network and do not assume they are combined.", receipts: 4, ruleAwareness: 4, expectationControl: 4, tag: "cross-chain-tourist" },
      { label: "I bridged once, so I expect the programme to recognise every chain I have visited.", receipts: 1, ruleAwareness: 0, expectationControl: 1, tag: "cross-chain-tourist" },
      { label: "My activity is everywhere. Surely the eligibility system will understand the journey.", receipts: 0, ruleAwareness: 0, expectationControl: 0, tag: "retroactive-romantic" },
    ],
  },
  {
    prompt: "HOW DO YOU HANDLE WALLET ATTRIBUTION AND ANTI-SYBIL RULES?",
    note: "Do not try to evade programme rules. This question measures whether you read them and understand their limits.",
    options: [
      { label: "I read the published identity, duplicate-activity, wallet-linking and appeal rules before drawing conclusions.", receipts: 5, ruleAwareness: 5, expectationControl: 5, tag: "snapshot-lawyer" },
      { label: "I use a consistent record of my own activity and avoid assuming that separate wallets equal separate eligibility.", receipts: 4, ruleAwareness: 4, expectationControl: 4, tag: "allocation-realist" },
      { label: "I believe the algorithm will recognise my intentions. We have an understanding.", receipts: 1, ruleAwareness: 1, expectationControl: 1, tag: "sybil-whisperer" },
      { label: "Every eligibility thread is a conspiracy theory until proven otherwise. I have twelve theories.", receipts: 0, ruleAwareness: 0, expectationControl: 0, tag: "sybil-whisperer" },
    ],
  },
  {
    prompt: "WHAT DO YOU EXPECT WHEN THE DISTRIBUTION IS FINALLY ANNOUNCED?",
    note: "Points, activity and eligibility do not establish allocation size, token value or a guaranteed reward.",
    options: [
      { label: "I wait for the actual allocation formula, claim conditions, exclusions and supply disclosures.", receipts: 5, ruleAwareness: 5, expectationControl: 5, tag: "allocation-realist" },
      { label: "I expect a modest outcome and treat any reward as uncertain until the terms are published.", receipts: 4, ruleAwareness: 4, expectationControl: 5, tag: "allocation-realist" },
      { label: "I have estimated the allocation using a spreadsheet that assumes the most optimistic scenario.", receipts: 2, ruleAwareness: 2, expectationControl: 1, tag: "points-maximalist" },
      { label: "I have already mentally spent the airdrop. The claim page is a formality.", receipts: 0, ruleAwareness: 0, expectationControl: 0, tag: "retroactive-romantic" },
    ],
  },
  {
    prompt: "THE CLAIM WINDOW OPENS. WHAT IS YOUR FIRST MOVE?",
    note: "A real claim should be checked through official sources and the published conditions. This fictional file never connects a wallet.",
    options: [
      { label: "I verify the official source, claim window, network, contract details and relevant security notices.", receipts: 5, ruleAwareness: 5, expectationControl: 5, tag: "snapshot-lawyer" },
      { label: "I compare the published allocation with my records and check any appeal or correction process.", receipts: 4, ruleAwareness: 4, expectationControl: 4, tag: "allocation-realist" },
      { label: "I search Discord for the link that everyone is clicking and hope the mods have pinned it.", receipts: 1, ruleAwareness: 1, expectationControl: 1, tag: "discord-shift-worker" },
      { label: "I discover the deadline after it closes and submit a strongly worded appeal to the calendar.", receipts: 0, ruleAwareness: 0, expectationControl: 0, tag: "claim-window-casualty" },
    ],
  },
];

export const airdropClassifications: Record<AirdropArchetypeId, AirdropArchetype> = {
  "snapshot-lawyer": {
    title: "THE SNAPSHOT LAWYER",
    subtitle: "You read the qualifying actions, the dates, the exclusions and the part everyone skipped.",
    roast: "You brought a dated receipt to a points rumour. The timeline has requested that you stop making this personal.",
    disposition: "REFERRED TO THE OFFICE OF PUBLISHED CRITERIA.",
  },
  "points-maximalist": {
    title: "THE POINTS MAXIMALIST",
    subtitle: "Your activity dashboard has more tabs than your browser can reasonably defend.",
    roast: "You have optimised the points. The points have not yet agreed to be a currency.",
    disposition: "ASSIGNED TO THE DEPARTMENT OF SPREADSHEET-BASED CONVICTION.",
  },
  "cross-chain-tourist": {
    title: "THE CROSS-CHAIN TOURIST",
    subtitle: "You visited every network and expect the snapshot to recognise the passport stamps.",
    roast: "Your bridge history is extensive. The eligibility policy has not promised to read it as a travel diary.",
    disposition: "REFERRED TO THE OFFICE OF NETWORK-BY-NETWORK CLARIFICATION.",
  },
  "discord-shift-worker": {
    title: "THE DISCORD SHIFT WORKER",
    subtitle: "You know every moderator's timezone and still do not have the official criteria link.",
    roast: "You have completed 400 community tasks. Your most reliable proof is a screenshot of a role badge.",
    disposition: "ROSTERED FOR ANOTHER VOLUNTARY COMMUNITY SHIFT.",
  },
  "sybil-whisperer": {
    title: "THE SYBIL WHISPERER",
    subtitle: "You have a theory about every wallet cluster and a second theory about the first theory.",
    roast: "The anti-Sybil rules are three paragraphs long. Your conspiracy board has acquired a second wall.",
    disposition: "REFERRED TO THE OFFICE OF EVIDENCE BEFORE THEORY.",
  },
  "retroactive-romantic": {
    title: "THE RETROACTIVE AIRDROP ROMANTIC",
    subtitle: "Every old transaction is now a potential origin story for the allocation you have already imagined.",
    roast: "You were active before the announcement. You have also decided the announcement was legally binding on your imagination.",
    disposition: "PLACED ON THE WAITLIST FOR THE HISTORICAL ELIGIBILITY REVIEW.",
  },
  "allocation-realist": {
    title: "THE ALLOCATION REALIST",
    subtitle: "You understand that qualifying activity, eligibility and allocation size are separate questions.",
    roast: "You asked for the formula before celebrating. The Department has marked you down as suspiciously well adjusted.",
    disposition: "GRANTED A PROVISIONAL CERTIFICATE OF EXPECTATION CONTROL.",
  },
  "claim-window-casualty": {
    title: "THE CLAIM-WINDOW CASUALTY",
    subtitle: "The points were counted. The claim window was not.",
    roast: "Your eligibility has survived every screenshot. The deadline has not survived your calendar settings.",
    disposition: "REFERRED TO THE OFFICE OF TIMELY DOCUMENT RETRIEVAL.",
  },
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function isValidAirdropAnswers(value: unknown): value is number[] {
  return Array.isArray(value) && value.length === AIRDROP_QUESTIONS &&
    value.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4);
}

export function encodeAirdropCode(answers: number[]): string {
  if (!isValidAirdropAnswers(answers)) throw new Error("A complete, valid airdrop interview is required.");
  return "a" + AIRDROP_FILE_VERSION + "-" + answers.join("");
}

export function decodeAirdropCode(value: unknown): number[] | null {
  if (typeof value !== "string") return null;
  const match = value.match(new RegExp("^a" + AIRDROP_FILE_VERSION + "-([0-3]{" + AIRDROP_QUESTIONS + "})$"));
  if (!match) return null;
  const answers = [...match[1]].map(Number);
  return isValidAirdropAnswers(answers) ? answers : null;
}

export function inspectAirdropProgress(answers: number[]): AirdropProgress {
  if (!Array.isArray(answers) || answers.length > AIRDROP_QUESTIONS ||
    !answers.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)) {
    throw new Error("Airdrop interview answers are invalid.");
  }
  const history = answers.map((answer, index) => {
    const option = airdropQuestions[index].options[answer];
    return {
      question: airdropQuestions[index].prompt,
      answer: option.label,
      receipts: option.receipts,
      ruleAwareness: option.ruleAwareness,
      expectationControl: option.expectationControl,
    };
  });
  const maxScore = Math.max(1, answers.length * 5);
  return {
    completedQuestions: answers.length,
    receipts: answers.length ? round(history.reduce((sum, item) => sum + item.receipts, 0) / maxScore * 100) : 0,
    ruleAwareness: answers.length ? round(history.reduce((sum, item) => sum + item.ruleAwareness, 0) / maxScore * 100) : 0,
    expectationControl: answers.length ? round(history.reduce((sum, item) => sum + item.expectationControl, 0) / maxScore * 100) : 0,
    history,
  };
}

export function buildAirdropResult(answers: number[]): AirdropResult {
  if (!isValidAirdropAnswers(answers)) throw new Error("A complete, valid airdrop interview is required.");
  const progress = inspectAirdropProgress(answers);
  const tallies = new Map<AirdropArchetypeId, { count: number; firstIndex: number }>();
  answers.forEach((answer, index) => {
    const tag = airdropQuestions[index].options[answer].tag;
    const existing = tallies.get(tag);
    if (existing) existing.count += 1;
    else tallies.set(tag, { count: 1, firstIndex: index });
  });
  const ranking = [...tallies.entries()].sort((a, b) => b[1].count - a[1].count || a[1].firstIndex - b[1].firstIndex);
  const primaryTag = ranking[0]?.[0] ?? "retroactive-romantic";
  const secondaryTag = ranking[1]?.[0] ?? primaryTag;
  const seed = answers.reduce((sum, answer, index) => ((sum * 31) + (answer + 1) * (index + 23)) % 900000, 303099);
  const caseNumber = String(seed + 100000).slice(-6);
  const strongest = progress.history.reduce((best, item, index, rows) => item.receipts > rows[best].receipts ? index : best, 0);
  const weakest = progress.history.reduce((best, item, index, rows) => item.expectationControl < rows[best].expectationControl ? index : best, 0);
  const strongestItem = progress.history[strongest];
  const weakestItem = progress.history[weakest];
  const finding = progress.receipts >= 75 && progress.ruleAwareness >= 75 && progress.expectationControl >= 75
    ? "DOCUMENTED ACTIVITY / EXPECTATIONS UNDER CONTROL."
    : progress.receipts <= 25
      ? "ELIGIBILITY CLAIM RECEIVED / SUPPORTING RECEIPTS NOT LOCATED."
      : progress.ruleAwareness <= 25
        ? "SNAPSHOT RULES REQUIRE IMMEDIATE READING."
        : progress.expectationControl <= 25
          ? "ALLOCATION EXPECTATION EXCEEDS AVAILABLE EVIDENCE."
          : "ACTIVITY RECORDED / ELIGIBILITY AND ALLOCATION REMAIN UNCONFIRMED.";
  const crossRead: DepartmentCrossRead = {
    headline: progress.receipts >= 70 && progress.expectationControl >= 70
      ? "RECEIPTS PRESENT / EXPECTATIONS RESTRAINED"
      : progress.ruleAwareness <= 30
        ? "THE POINTS ARE LOUDER THAN THE RULES"
        : progress.expectationControl <= 30
          ? "THE ALLOCATION HAS BEEN SPENT IN ADVANCE"
          : "ACTIVITY AND ELIGIBILITY ARE STILL DIFFERENT FILES",
    interpretation: "These fictional scores reflect only your seven selected answers: receipt quality " + progress.receipts + "/100, rule awareness " + progress.ruleAwareness + "/100 and expectation control " + progress.expectationControl + "/100. No wallet, network, airdrop programme, points dashboard or eligibility system was checked.",
    signals: [
      {
        label: "STRONGEST DOCUMENTED HABIT",
        context: strongestItem.question,
        answer: strongestItem.answer,
        detail: "Receipts " + strongestItem.receipts + "/5 · Rule awareness " + strongestItem.ruleAwareness + "/5 · Expectation control " + strongestItem.expectationControl + "/5.",
      },
      {
        label: "WEAKEST EXPECTATION CONTROL",
        context: weakestItem.question,
        answer: weakestItem.answer,
        detail: "Receipts " + weakestItem.receipts + "/5 · Rule awareness " + weakestItem.ruleAwareness + "/5 · Expectation control " + weakestItem.expectationControl + "/5.",
      },
    ],
  };

  return {
    ...progress,
    answers: [...answers],
    caseNumber,
    primaryTag,
    secondaryTag,
    profile: airdropClassifications[primaryTag],
    secondaryProfile: airdropClassifications[secondaryTag],
    finding,
    crossRead,
  };
}
