import type { DepartmentCrossRead } from "../lib/department-cross-read";

export const GOVERNANCE_FILE_VERSION = 1;
export const GOVERNANCE_QUESTIONS = 7;

export type GovernanceArchetypeId =
  | "charter-keeper"
  | "quorum-optimist"
  | "snapshot-sprinter"
  | "delegation-drifter"
  | "whale-mandate"
  | "crosschain-counter"
  | "forum-pilgrim"
  | "execution-wisher";

export type GovernanceOption = {
  label: string;
  proposalClarity: number;
  votingDiscipline: number;
  executionAwareness: number;
  tag: GovernanceArchetypeId;
};

export type GovernanceQuestion = {
  prompt: string;
  note: string;
  options: GovernanceOption[];
};

export type GovernanceArchetype = {
  title: string;
  subtitle: string;
  roast: string;
  disposition: string;
};

export type GovernanceHistory = {
  question: string;
  answer: string;
  proposalClarity: number;
  votingDiscipline: number;
  executionAwareness: number;
};

export type GovernanceProgress = {
  completedQuestions: number;
  proposalClarity: number;
  votingDiscipline: number;
  executionAwareness: number;
  history: GovernanceHistory[];
};

export type GovernanceResult = GovernanceProgress & {
  answers: number[];
  caseNumber: string;
  primaryTag: GovernanceArchetypeId;
  secondaryTag: GovernanceArchetypeId;
  profile: GovernanceArchetype;
  secondaryProfile: GovernanceArchetype;
  finding: string;
  crossRead: DepartmentCrossRead;
};

export const governanceQuestions: GovernanceQuestion[] = [
  {
    prompt: "WHAT DOES THE PROPOSAL ACTUALLY AUTHORISE?",
    note: "A title, a forum thread and a binding proposal are not interchangeable. The scope should be specific before anyone calls the vote decisive.",
    options: [
      { label: "The published proposal defines the exact action, scope, rationale, risks and accountable proposer.", proposalClarity: 5, votingDiscipline: 4, executionAwareness: 4, tag: "charter-keeper" },
      { label: "A forum post explains the idea, while the implementation details are still being drafted.", proposalClarity: 3, votingDiscipline: 2, executionAwareness: 2, tag: "forum-pilgrim" },
      { label: "A poll screenshot and a confident summary are circulating in the community chat.", proposalClarity: 1, votingDiscipline: 1, executionAwareness: 1, tag: "quorum-optimist" },
      { label: "A large account called it a governance upgrade, so I assume the mandate is clear.", proposalClarity: 0, votingDiscipline: 0, executionAwareness: 0, tag: "whale-mandate" },
    ],
  },
  {
    prompt: "WHO IS ENTITLED TO VOTE, AND WHAT COUNTS AS ONE VOTE?",
    note: "A meaningful voting process defines eligible units, identity or token-weight rules, exclusions and the snapshot used to determine participation.",
    options: [
      { label: "The rules specify eligible voting units, snapshot conditions, exclusions and how duplicate representation is handled.", proposalClarity: 5, votingDiscipline: 5, executionAwareness: 3, tag: "charter-keeper" },
      { label: "The governance page shows balances, but the eligibility and weighting method is not obvious.", proposalClarity: 3, votingDiscipline: 2, executionAwareness: 2, tag: "snapshot-sprinter" },
      { label: "The largest holders should speak for the community because they have the most at stake.", proposalClarity: 1, votingDiscipline: 0, executionAwareness: 1, tag: "whale-mandate" },
      { label: "Every address is a separate voter. I have not looked for duplicate or delegated voting rules.", proposalClarity: 0, votingDiscipline: 0, executionAwareness: 0, tag: "delegation-drifter" },
    ],
  },
  {
    prompt: "HOW DO YOU TREAT THE SNAPSHOT AND DELEGATION RULES?",
    note: "The block, timestamp, eligible networks, delegated power and revocation rules can change who is counted. This interview does not query any snapshot.",
    options: [
      { label: "I look for the published snapshot block or time, chain scope and delegation or revocation rules.", proposalClarity: 5, votingDiscipline: 5, executionAwareness: 4, tag: "charter-keeper" },
      { label: "I save the current dashboard and assume it will match the final snapshot.", proposalClarity: 2, votingDiscipline: 2, executionAwareness: 1, tag: "snapshot-sprinter" },
      { label: "A delegate's vote and each delegator's balance should all count independently.", proposalClarity: 1, votingDiscipline: 0, executionAwareness: 1, tag: "delegation-drifter" },
      { label: "The snapshot will be whatever the proposal team announces after the vote.", proposalClarity: 0, votingDiscipline: 0, executionAwareness: 0, tag: "snapshot-sprinter" },
    ],
  },
  {
    prompt: "WHAT WOULD MAKE VOTES FROM DIFFERENT CHAINS COMPARABLE?",
    note: "Displayed totals do not automatically share an identity model, voting unit, snapshot, finality rule or duplicate-handling method.",
    options: [
      { label: "A documented aggregation method defines network scope, voting units, bridge representations and duplicate handling.", proposalClarity: 5, votingDiscipline: 5, executionAwareness: 4, tag: "crosschain-counter" },
      { label: "I record each chain separately and wait for an explicit rule before combining totals.", proposalClarity: 4, votingDiscipline: 5, executionAwareness: 3, tag: "charter-keeper" },
      { label: "I add the visible dashboard totals together. The number looks sufficiently official.", proposalClarity: 1, votingDiscipline: 0, executionAwareness: 1, tag: "crosschain-counter" },
      { label: "The chain with the largest whale should settle the disagreement.", proposalClarity: 0, votingDiscipline: 0, executionAwareness: 0, tag: "whale-mandate" },
    ],
  },
  {
    prompt: "HOW SHOULD THE QUORUM BE ESTABLISHED?",
    note: "The denominator, threshold, abstentions, eligible voting window and any per-network minimums should be defined before the count is interpreted.",
    options: [
      { label: "The policy defines eligible voting weight, quorum denominator, threshold, abstentions and the counting window.", proposalClarity: 5, votingDiscipline: 5, executionAwareness: 5, tag: "charter-keeper" },
      { label: "A majority of votes cast should be enough, although I have not checked the published denominator.", proposalClarity: 3, votingDiscipline: 2, executionAwareness: 2, tag: "quorum-optimist" },
      { label: "The forum reaction and participation count look strong, so the community has spoken.", proposalClarity: 1, votingDiscipline: 0, executionAwareness: 1, tag: "forum-pilgrim" },
      { label: "The dashboard turned green. I assume that means quorum reached.", proposalClarity: 0, votingDiscipline: 0, executionAwareness: 0, tag: "quorum-optimist" },
    ],
  },
  {
    prompt: "WHAT DO YOU EXPECT FROM DELEGATES AND GOVERNANCE MODERATORS?",
    note: "Delegation, revocation, conflicts, vote caps and moderator powers need explicit treatment; a familiar profile is not a governance rule.",
    options: [
      { label: "The process explains delegation, revocation, conflicts, vote caps and the limits of moderator authority.", proposalClarity: 5, votingDiscipline: 5, executionAwareness: 5, tag: "charter-keeper" },
      { label: "Delegates act for represented voters, but I have not checked whether delegated balances are double-counted.", proposalClarity: 3, votingDiscipline: 1, executionAwareness: 2, tag: "delegation-drifter" },
      { label: "I trust the familiar moderators and largest accounts to reconcile any edge cases.", proposalClarity: 1, votingDiscipline: 1, executionAwareness: 1, tag: "whale-mandate" },
      { label: "The most active forum participants should be allowed to add their own votes if needed.", proposalClarity: 0, votingDiscipline: 0, executionAwareness: 0, tag: "forum-pilgrim" },
    ],
  },
  {
    prompt: "THE PROPOSAL PASSES. WHAT HAPPENS NEXT?",
    note: "A vote result, an authorised execution and a completed change are separate stages. The Department does not inspect contracts or execution status.",
    options: [
      { label: "I look for the recorded result, execution authority, timelock or follow-up transaction and failure procedure.", proposalClarity: 5, votingDiscipline: 4, executionAwareness: 5, tag: "charter-keeper" },
      { label: "The proposal says it passed, so I expect the approved action to follow under the stated process.", proposalClarity: 3, votingDiscipline: 3, executionAwareness: 3, tag: "execution-wisher" },
      { label: "The admins will interpret the result and publish an update when they have time.", proposalClarity: 1, votingDiscipline: 1, executionAwareness: 1, tag: "forum-pilgrim" },
      { label: "The announcement says PASSED. I am already celebrating the completed change.", proposalClarity: 0, votingDiscipline: 0, executionAwareness: 0, tag: "execution-wisher" },
    ],
  },
];

export const governanceClassifications: Record<GovernanceArchetypeId, GovernanceArchetype> = {
  "charter-keeper": {
    title: "THE CHARTER KEEPER",
    subtitle: "You insist that scope, eligibility, voting weight, quorum and execution rules exist before a result becomes a mandate.",
    roast: "You asked for the denominator before joining the victory thread. The committee has filed a request to make you less difficult.",
    disposition: "REFERRED TO THE OFFICE OF DOCUMENTED GOVERNANCE.",
  },
  "quorum-optimist": {
    title: "THE QUORUM OPTIMIST",
    subtitle: "A green dashboard and a confident announcement have become your preferred substitutes for the counting rules.",
    roast: "The progress bar says 100%. The quorum policy is still looking for its numerator.",
    disposition: "PLACED ON THE WAITLIST FOR A DENOMINATOR.",
  },
  "snapshot-sprinter": {
    title: "THE SNAPSHOT SPRINTER",
    subtitle: "You are already checking the block explorer before the eligibility window has been written down.",
    roast: "Your screenshot is timestamped. The actual snapshot rules are still in draft.",
    disposition: "REFERRED TO THE OFFICE OF TEMPORAL CONSISTENCY.",
  },
  "delegation-drifter": {
    title: "THE DELEGATION DRIFTER",
    subtitle: "You understand that votes can travel through delegates, but the accounting for those votes has taken a different route.",
    roast: "One balance, one delegate and three dashboard rows. The Department has requested a single counting method.",
    disposition: "ASSIGNED TO THE DIVISION OF REPRESENTATION RECONCILIATION.",
  },
  "whale-mandate": {
    title: "THE WHALE MANDATE",
    subtitle: "You believe the largest balance can turn a personal preference into community consensus.",
    roast: "The wallet is influential. The charter has declined to recognise it as a constitution.",
    disposition: "REFERRED TO THE OFFICE OF WEIGHTED EXPECTATIONS.",
  },
  "crosschain-counter": {
    title: "THE CROSS-CHAIN COUNTER",
    subtitle: "You have noticed that separate dashboards do not become one electorate just because someone adds the totals.",
    roast: "You brought a reconciliation table to a multichain quorum. The spreadsheet has requested voting rights.",
    disposition: "REFERRED TO THE OFFICE OF NETWORK-BY-NETWORK ACCOUNTING.",
  },
  "forum-pilgrim": {
    title: "THE FORUM PILGRIM",
    subtitle: "You have read every reaction, moderator reply and pinned message, although the binding proposal may still be missing.",
    roast: "Your browser history is a governance archive. The actual proposal is still in the comments.",
    disposition: "ROSTERED FOR ANOTHER COMMUNITY DISCUSSION.",
  },
  "execution-wisher": {
    title: "THE EXECUTION WISHER",
    subtitle: "You treat a successful vote as the final stage, even when execution has its own authority and conditions.",
    roast: "The proposal passed. Your celebration has already executed; the approved action has not.",
    disposition: "REFERRED TO THE OFFICE OF POST-VOTE ACCOUNTABILITY.",
  },
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export function isValidGovernanceAnswers(value: unknown): value is number[] {
  return Array.isArray(value) &&
    value.length === GOVERNANCE_QUESTIONS &&
    value.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4);
}

export function encodeGovernanceCode(answers: number[]): string {
  if (!isValidGovernanceAnswers(answers)) {
    throw new Error("A complete, valid governance interview is required.");
  }
  return "g" + GOVERNANCE_FILE_VERSION + "-" + answers.join("");
}

export function decodeGovernanceCode(value: unknown): number[] | null {
  if (typeof value !== "string") return null;
  const match = value.match(new RegExp("^g" + GOVERNANCE_FILE_VERSION + "-([0-3]{" + GOVERNANCE_QUESTIONS + "})$"));
  if (!match) return null;
  const answers = [...match[1]].map(Number);
  return isValidGovernanceAnswers(answers) ? answers : null;
}

export function inspectGovernanceProgress(answers: number[]): GovernanceProgress {
  if (!Array.isArray(answers) || answers.length > GOVERNANCE_QUESTIONS ||
    !answers.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)) {
    throw new Error("Governance interview answers are invalid.");
  }

  const history = answers.map((answer, index) => {
    const option = governanceQuestions[index].options[answer];
    return {
      question: governanceQuestions[index].prompt,
      answer: option.label,
      proposalClarity: option.proposalClarity,
      votingDiscipline: option.votingDiscipline,
      executionAwareness: option.executionAwareness,
    };
  });
  const maxScore = answers.length * 5;
  return {
    completedQuestions: answers.length,
    proposalClarity: answers.length ? round(history.reduce((sum, item) => sum + item.proposalClarity, 0) / maxScore * 100) : 0,
    votingDiscipline: answers.length ? round(history.reduce((sum, item) => sum + item.votingDiscipline, 0) / maxScore * 100) : 0,
    executionAwareness: answers.length ? round(history.reduce((sum, item) => sum + item.executionAwareness, 0) / maxScore * 100) : 0,
    history,
  };
}

export function buildGovernanceResult(answers: number[]): GovernanceResult {
  if (!isValidGovernanceAnswers(answers)) {
    throw new Error("A complete, valid governance interview is required.");
  }
  const progress = inspectGovernanceProgress(answers);
  const tallies = new Map<GovernanceArchetypeId, { count: number; firstIndex: number }>();
  answers.forEach((answer, index) => {
    const tag = governanceQuestions[index].options[answer].tag;
    const existing = tallies.get(tag);
    if (existing) existing.count += 1;
    else tallies.set(tag, { count: 1, firstIndex: index });
  });
  const ranking = [...tallies.entries()].sort((a, b) => b[1].count - a[1].count || a[1].firstIndex - b[1].firstIndex);
  const primaryTag = ranking[0]?.[0] ?? "quorum-optimist";
  const secondaryTag = ranking[1]?.[0] ?? primaryTag;
  const seed = answers.reduce((sum, answer, index) => ((sum * 31) + (answer + 1) * (index + 41)) % 900000, 306613);
  const caseNumber = String(seed + 100000).slice(-6);
  const strongest = progress.history.reduce((best, item, index, rows) =>
    item.proposalClarity > rows[best].proposalClarity ? index : best, 0);
  const weakest = progress.history.reduce((best, item, index, rows) =>
    item.executionAwareness < rows[best].executionAwareness ? index : best, 0);
  const strongestItem = progress.history[strongest];
  const weakestItem = progress.history[weakest];

  const finding = progress.proposalClarity >= 75 && progress.votingDiscipline >= 75 && progress.executionAwareness >= 75
    ? "PROPOSAL SCOPE AND COUNTING RULES DOCUMENTED / EXECUTION STILL REQUIRES ITS OWN RECORD."
    : progress.proposalClarity <= 25
      ? "PROPOSAL SCOPE INSUFFICIENT / MANDATE NOT ESTABLISHED."
      : progress.votingDiscipline <= 25
        ? "VOTER ELIGIBILITY OR QUORUM METHOD REQUIRES DOCUMENTATION."
        : progress.executionAwareness <= 25
          ? "VOTE RESULT TREATED AS EXECUTION / ACCOUNTABILITY GAP IDENTIFIED."
          : "GOVERNANCE PROCESS UNDER REVIEW / QUORUM AND EXECUTION NOT CERTIFIED.";

  const crossRead: DepartmentCrossRead = {
    headline: progress.proposalClarity >= 70 && progress.votingDiscipline >= 70
      ? "PROPOSAL AND VOTING RULES RECORDED / EXECUTION REMAINS SEPARATE"
      : progress.votingDiscipline <= 30
        ? "THE VOTE TOTAL ARRIVED BEFORE THE COUNTING RULES"
        : progress.executionAwareness <= 30
          ? "THE ANNOUNCEMENT HAS EXECUTED IN YOUR HEAD"
          : "A PASSED VOTE IS NOT AUTOMATICALLY AN EXECUTED DECISION",
    interpretation: "These fictional scores reflect only your seven selected answers: proposal clarity " + progress.proposalClarity + "/100, voting discipline " + progress.votingDiscipline + "/100 and execution awareness " + progress.executionAwareness + "/100. No DAO, proposal, wallet, vote, voting contract, voting power, snapshot, delegate identity, quorum or execution was inspected.",
    signals: [
      {
        label: "STRONGEST DOCUMENTATION HABIT",
        context: strongestItem.question,
        answer: strongestItem.answer,
        detail: "Proposal clarity " + strongestItem.proposalClarity + "/5 · Voting discipline " + strongestItem.votingDiscipline + "/5 · Execution awareness " + strongestItem.executionAwareness + "/5.",
      },
      {
        label: "WEAKEST EXECUTION AWARENESS",
        context: weakestItem.question,
        answer: weakestItem.answer,
        detail: "Proposal clarity " + weakestItem.proposalClarity + "/5 · Voting discipline " + weakestItem.votingDiscipline + "/5 · Execution awareness " + weakestItem.executionAwareness + "/5.",
      },
    ],
  };

  return {
    ...progress,
    answers: [...answers],
    caseNumber,
    primaryTag,
    secondaryTag,
    profile: governanceClassifications[primaryTag],
    secondaryProfile: governanceClassifications[secondaryTag],
    finding,
    crossRead,
  };
}
