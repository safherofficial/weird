import type { DepartmentCrossRead } from "../lib/department-cross-read";

export const ROADMAP_VERSION = 1;
export const ROADMAP_QUESTIONS = 6;

export type RoadmapArchetypeId =
  | "actually-shipping"
  | "forever-beta"
  | "soon-architect"
  | "ticker-decoration"
  | "partnership-vaporist"
  | "community-amplifier"
  | "global-adoption-intern"
  | "multiverse-expansionist"
  | "documentation-empire"
  | "milestone-matryoshka";

export type RoadmapOption = {
  label: string;
  delivery: number;
  realism: number;
  inflation: number;
  tag: RoadmapArchetypeId;
};

export type RoadmapQuestion = {
  prompt: string;
  note: string;
  options: RoadmapOption[];
};

export type RoadmapArchetype = {
  title: string;
  subtitle: string;
  roast: string;
  disposition: string;
};

export type RoadmapMilestone = {
  phase: string;
  title: string;
  description: string;
  eta: string;
  status: string;
};

export type RoadmapProgress = {
  completedQuestions: number;
  delivery: number;
  realism: number;
  inflation: number;
};

export type RoadmapResult = RoadmapProgress & {
  crossRead: DepartmentCrossRead;
  answers: number[];
  projectSlug: string;
  projectLabel: string;
  primaryTag: RoadmapArchetypeId;
  secondaryTag: RoadmapArchetypeId;
  profile: RoadmapArchetype;
  secondaryProfile: RoadmapArchetype;
  finding: string;
  disposition: string;
  caseNumber: string;
  summary: string;
  milestones: RoadmapMilestone[];
};

export const questions: RoadmapQuestion[] = [
  {
    prompt: "WHAT ACCESS IS ACTUALLY CONTROLLED BY THE INCOMING TEAM?",
    note: "A community announcement is not a credential transfer. The Department is asking about operational control.",
    options: [
      { label: "Named operators can demonstrate scoped access to the repository, deployment, domain and required admin controls.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "Some permissions have transferred, but the written register still shows pending owners or unverified credentials.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "The new team has a social account and expects operational access after the next announcement.", delivery: 2, realism: 2, inflation: 3, tag: "soon-architect" },
      { label: "The takeover is documented in a pinned thread, but nobody can identify who holds the keys.", delivery: 0, realism: 0, inflation: 5, tag: "documentation-empire" },
    ],
  },
  {
    prompt: "WHICH PROJECT ASSETS AND DEPENDENCIES ARE INVENTORIED?",
    note: "A logo folder is not an asset register. Record what exists, where it lives and who can access it.",
    options: [
      { label: "Repositories, domains, deployments, contracts, documentation, backups and custodians are listed in one verifiable register.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A partial inventory exists, with missing custodians or dependencies assigned to named follow-up owners.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "Assets are referenced in old threads, but their locations, status and owners still need to be found.", delivery: 1, realism: 1, inflation: 4, tag: "soon-architect" },
      { label: "Every phase creates another asset list, which will eventually explain the previous asset list.", delivery: 0, realism: 0, inflation: 5, tag: "milestone-matryoshka" },
    ],
  },
  {
    prompt: "WHO OWNS EACH OPERATIONAL RESPONSIBILITY AFTER TRANSFER?",
    note: "The word 'community' cannot be the named owner of every repository, release and incident.",
    options: [
      { label: "A responsibility map names each accountable owner, permission boundary, backup and escalation path.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "Interim owners are named and the remaining responsibilities have explicit acceptance dates.", delivery: 3, realism: 3, inflation: 2, tag: "forever-beta" },
      { label: "A group chat says everyone owns everything. No individual is responsible for the operational work.", delivery: 1, realism: 1, inflation: 4, tag: "community-amplifier" },
      { label: "An informal council will advise the takeover, but its members and responsibilities are not documented.", delivery: 0, realism: 0, inflation: 5, tag: "partnership-vaporist" },
    ],
  },
  {
    prompt: "HOW ARE TAKEOVER MILESTONES ACCEPTED AS COMPLETE?",
    note: "A milestone needs a deliverable, an owner and a test for completion—not a celebratory post.",
    options: [
      { label: "Each milestone has an accountable owner, due date, acceptance criteria, evidence artifact and sign-off.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "Dated checkpoints and measurable outcomes exist, although some scope and acceptance details remain open.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "A phase is considered complete when the next announcement is published.", delivery: 1, realism: 1, inflation: 4, tag: "partnership-vaporist" },
      { label: "Every milestone unlocks another milestone that explains why the previous one is not complete yet.", delivery: 0, realism: 0, inflation: 5, tag: "milestone-matryoshka" },
    ],
  },
  {
    prompt: "WHAT MUST BE VERIFIED BEFORE ADMIN ACCESS IS DECLARED SAFE?",
    note: "A new handle is not an access-control policy. The Department expects least privilege and a recorded transfer.",
    options: [
      { label: "Credentials are rotated, old access is revoked, signer roles are verified and least-privilege permissions are recorded.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A staged access transition has named owners, documented open risks and dates for final verification.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "The new admin takes over after the public announcement. Credential rotation can happen later.", delivery: 1, realism: 1, inflation: 4, tag: "soon-architect" },
      { label: "The community pins a security checklist, but no one can show that the permissions changed.", delivery: 0, realism: 0, inflation: 5, tag: "community-amplifier" },
    ],
  },
  {
    prompt: "WHAT DOES THE FIRST POST-TAKEOVER RELEASE REQUIRE?",
    note: "The first release should prove the handover works before the department announces an entire multiverse.",
    options: [
      { label: "A scoped deliverable, named maintainer, test evidence, rollback path and explicit release sign-off.", delivery: 5, realism: 5, inflation: 0, tag: "actually-shipping" },
      { label: "A phased release plan with measurable checkpoints and disclosed dependencies.", delivery: 4, realism: 4, inflation: 1, tag: "forever-beta" },
      { label: "A new roadmap thread is published and described as release one.", delivery: 1, realism: 1, inflation: 4, tag: "documentation-empire" },
      { label: "A simultaneous chain expansion, new token, application and campaign are announced before owners or assets are settled.", delivery: 0, realism: 0, inflation: 5, tag: "multiverse-expansionist" },
    ],
  },
];

export const classifications: Record<RoadmapArchetypeId, RoadmapArchetype> = {
  "actually-shipping": {
    title: "THE RARELY SHIPPING CTO",
    subtitle: "The handover has named owners and deliverables, verified access, an asset register and acceptance criteria. The Department is suspicious.",
    roast: "The takeover contains a real responsibility map and a tested release gate. CT has asked whether the deployer is feeling alright.",
    disposition: "RELEASED UNDER OBSERVATION FOR EXCESSIVE EXECUTION.",
  },
  "forever-beta": {
    title: "THE FOREVER COMMUNITY TAKEOVER",
    subtitle: "The transition is moving, but some permissions, custodians or acceptance checks remain in an interim state.",
    roast: "Your handover is technically progressing. It is just progressing through a new access checklist every week.",
    disposition: "PLACED IN PERMANENT HANDOVER REVIEW.",
  },
  "soon-architect": {
    title: "THE SOON™ CTO",
    subtitle: "Access, credentials and operational ownership are expected after the next announcement. The keys remain elsewhere.",
    roast: "You have turned a missing permission into a seven-stage transfer methodology.",
    disposition: "REFERRED TO THE OFFICE OF DEPLOYER SILENCE.",
  },
  "ticker-decoration": {
    title: "THE TICKER WITH A FUTURE JOB",
    subtitle: "The takeover has a new identity and banner. Operational control still needs an owner, a scope and evidence.",
    roast: "The new account has admin energy. The actual admin permissions have declined to confirm.",
    disposition: "REQUESTED TO PROVIDE A TOKEN PURPOSE BEFORE THE NEXT CTO SPACE.",
  },
  "partnership-vaporist": {
    title: "THE STRATEGIC KOL ALLIANCE",
    subtitle: "A council or informal group is expected to own the transition, but its members, authority and deliverables are not documented.",
    roast: "You have announced the pre-announcement of an accountability matrix with the possibility of a future signature.",
    disposition: "REFERRED TO THE OFFICE OF INDEPENDENT SOURCE VALIDATION.",
  },
  "community-amplifier": {
    title: "THE TELEGRAM REPLY FARM",
    subtitle: "The group chat is active and the new checklist is pinned. No individual has confirmed the permission changes.",
    roast: "Your handover has a very active announcement layer and an access-control layer currently set to private.",
    disposition: "ASSIGNED TO THE DEPARTMENT OF COMMUNITY-BASED RECOVERY.",
  },
  "global-adoption-intern": {
    title: "THE 100X REBRAND INTERN",
    subtitle: "You have been asked to scale the new operating structure everywhere before the first transfer record is signed.",
    roast: "Your final milestone serves every chain on the planet. The first admin permission is still awaiting an owner.",
    disposition: "PROMOTED TO VICE PRESIDENT OF THE ENTIRE TIMELINE.",
  },
  "multiverse-expansionist": {
    title: "THE NARRATIVE MULTIVERSE EXPANSIONIST",
    subtitle: "One takeover. Twelve workstreams. Three new operating groups. No agreed boundary for the first release.",
    roast: "You are transferring every system on every chain, including several that only exist in the pinned thread.",
    disposition: "REFERRED TO THE OFFICE OF INTERGALACTIC CTO COORDINATION.",
  },
  "documentation-empire": {
    title: "THE PINNED-THREAD EMPIRE",
    subtitle: "The handover has a table of contents, a checklist and three appendices. The actual permissions remain unverified.",
    roast: "Your CTO has shipped three pinned posts. The first credential rotation is still waiting for a calendar invite.",
    disposition: "ARCHIVED UNDER: HANDOVER DOCUMENTED / CONTROL NOT VERIFIED.",
  },
  "milestone-matryoshka": {
    title: "THE PHASE TWO MATRYOSHKA",
    subtitle: "Every acceptance phase unlocks another acceptance phase that explains why the previous phase remains open.",
    roast: "Your Phase 2 is a roadmap for Phase 2. Phase 2.1 will explain who signs off Phase 2.",
    disposition: "PLACED INSIDE THE TAKEOVER ROADMAP FOR FURTHER REVIEW.",
  },
};

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
  return slug.length >= 2 ? slug : "PROJECT-SOON";
}

export function isValidRoadmapAnswers(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length === ROADMAP_QUESTIONS &&
    Array.from(value).every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)
  );
}

export function encodeRoadmapCode(answers: number[], projectName: string): string {
  if (!isValidRoadmapAnswers(answers)) {
    throw new Error("A complete, valid roadmap questionnaire is required.");
  }
  return "r" + ROADMAP_VERSION + "-" + answers.join("") + "-" + slugifyProjectName(projectName);
}

export function decodeRoadmapCode(value: unknown): { answers: number[]; projectSlug: string } | null {
  if (typeof value !== "string") return null;
  const match = value.match(new RegExp("^r" + ROADMAP_VERSION + "-([0-3]{" + ROADMAP_QUESTIONS + "})-([A-Z0-9]+(?:-[A-Z0-9]+)*)$"));
  if (!match) return null;
  const answers = [...match[1]].map(Number);
  const projectSlug = match[2];
  if (!isValidRoadmapAnswers(answers) || projectSlug.length > 24) return null;
  return { answers, projectSlug };
}

export function inspectRoadmapProgress(answers: number[]): RoadmapProgress {
  if (
    !Array.isArray(answers) ||
    answers.length > ROADMAP_QUESTIONS ||
    !Array.from(answers).every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)
  ) {
    throw new Error("Roadmap answers are invalid.");
  }
  const selected = answers.map((answer, index) => questions[index].options[answer]);
  const maxScore = Math.max(1, answers.length * 5);
  return {
    completedQuestions: answers.length,
    delivery: answers.length ? round((selected.reduce((sum, option) => sum + option.delivery, 0) / maxScore) * 100) : 0,
    realism: answers.length ? round((selected.reduce((sum, option) => sum + option.realism, 0) / maxScore) * 100) : 0,
    inflation: answers.length ? round((selected.reduce((sum, option) => sum + option.inflation, 0) / maxScore) * 100) : 0,
  };
}

function chooseProfiles(answers: number[]) {
  const tallies = new Map<RoadmapArchetypeId, { count: number; inflation: number; firstIndex: number }>();
  answers.forEach((answer, index) => {
    const option = questions[index].options[answer];
    const current = tallies.get(option.tag);
    if (current) {
      current.count += 1;
      current.inflation += option.inflation;
    } else {
      tallies.set(option.tag, { count: 1, inflation: option.inflation, firstIndex: index });
    }
  });
  const ranking = [...tallies.entries()].sort((a, b) =>
    b[1].count - a[1].count || b[1].inflation - a[1].inflation || a[1].firstIndex - b[1].firstIndex
  );
  return {
    primaryTag: ranking[0]?.[0] ?? "soon-architect",
    secondaryTag: ranking[1]?.[0] ?? ranking[0]?.[0] ?? "soon-architect",
  };
}

function getFinding(progress: RoadmapProgress) {
  if (progress.delivery >= 75 && progress.realism >= 75) return "HANDOVER OWNERS AND DELIVERABLES DETECTED. PLEASE REMAIN CALM.";
  if (progress.inflation >= 80) return "CTO PROMISE INFLATION EXCEEDS DEPARTMENTAL LIMITS.";
  if (progress.realism <= 20) return "COMMUNITY TAKEOVER CLASSIFIED AS A THEORETICAL CONSTRUCT.";
  if (progress.delivery <= 25) return "RECOVERY PHASES RECEIVED. EVIDENCE OF ACCESS OR HANDOVER NOT LOCATED.";
  if (progress.inflation >= 60) return "TAKEOVER PLAN CONTAINS A SIGNIFICANT AMOUNT OF SOON™.";
  return "COMMUNITY TAKEOVER PLAN ACCEPTED PENDING A NAMED OWNER AND A DATE THAT MEANS SOMETHING.";
}

function getDisposition(progress: RoadmapProgress) {
  if (progress.delivery >= 75 && progress.realism >= 75) return "APPROVED FOR A LIMITED PERIOD OF VERIFIED COMMUNITY DELIVERY.";
  if (progress.inflation >= 80) return "ESCALATE TO THE OFFICE OF UNBOUNDED CTO AMBITION.";
  if (progress.realism <= 20) return "SUSPEND ALL HANDOVER TIMELINES UNTIL ACCESS IS EXPLAINED.";
  if (progress.delivery <= 25) return "REQUEST THE DEPLOYER HANDOVER. THEN REQUEST THE KEYS.";
  return "RETURN FOR REVIEW AFTER THE NEXT CT / TELEGRAM HANDOVER UPDATE.";
}

function buildMilestones(answers: number[], projectLabel: string): RoadmapMilestone[] {
  const access = answers[0];
  const assets = answers[1];
  const ownership = answers[2];
  const acceptance = answers[3];
  const security = answers[4];
  const release = answers[5];

  const schedule = [
    "AFTER THE NAMED OWNER SIGNS THE ACCEPTANCE RECORD",
    "ON THE PUBLISHED CHECKPOINT DATE",
    "AFTER THE NEXT ANNOUNCEMENT / OWNER STILL PENDING",
    "WHEN PHASE 2.7.4 IS APPROVED BY THE PHASE 2.7.3 WORKING GROUP",
  ][acceptance];

  const accessRows = [
    { title: "SCOPED OPERATIONAL ACCESS CONFIRMED", description: "The intake reports demonstrable access for named operators. Record the repository, deployment, domain and admin permissions, then verify the scope and revoke any access that is no longer required.", status: "NAMED ACCESS / INDEPENDENT CHECK REPORTED" },
    { title: "PARTIAL ACCESS / OPEN TRANSFER ITEMS", description: "Some permissions have reportedly transferred. List the remaining credentials, assign an accountable recipient to each one and do not describe the handover as complete while any critical access remains unverified.", status: "PARTIAL TRANSFER / OPEN OWNERS RECORDED" },
    { title: "SOCIAL ACCOUNT TRANSFER / OPERATIONAL ACCESS PENDING", description: "The public-facing account has changed, but the answers do not establish control of the systems that operate the project. Identify the missing permissions and the person responsible for transferring them.", status: "PUBLIC IDENTITY UPDATED / SYSTEM ACCESS UNVERIFIED" },
    { title: "PINNED HANDOVER / KEY CUSTODY NOT IDENTIFIED", description: "The handover is described in public documentation, but no key holder or operational administrator has been identified. The first deliverable is a verified custody and access register.", status: "DOCUMENTATION LOCATED / CONTROL NOT VERIFIED" },
  ][access];

  const assetRows = [
    { title: "COMPLETE ASSET AND DEPENDENCY REGISTER", description: "The intake reports a register covering repositories, domains, deployments, contracts, documentation, backups and custodians. Attach current locations, recovery paths and evidence of access to each entry.", status: "REGISTER REPORTED / CUSTODIANS IDENTIFIED" },
    { title: "PARTIAL INVENTORY / FOLLOW-UP OWNERS ASSIGNED", description: "The known assets are listed, but some custodians or dependencies remain open. Assign an owner and a verification date to each missing item before the next release gate.", status: "PARTIAL REGISTER / OPEN ITEMS TRACKED" },
    { title: "ASSET DISCOVERY STILL IN PROGRESS", description: "The asset trail is scattered across older threads and private channels. Consolidate locations, owners, recovery methods and dependencies into one versioned register.", status: "ASSET LOCATIONS / OWNERS NOT COMPLETE" },
    { title: "THE INVENTORY HAS BECOME ITS OWN INVENTORY", description: "The register keeps expanding into nested lists. Freeze the scope, assign one custodian to the canonical record and close duplicate inventories before adding another phase.", status: "SCOPE CREEP / CANONICAL REGISTER NOT SETTLED" },
  ][assets];

  const ownershipRows = [
    { title: "ACCOUNTABLE RESPONSIBILITY MAP", description: "Publish the named owner, backup, permission boundary and escalation route for each operational function. Each role must explicitly accept its responsibilities.", status: "OWNERS / BACKUPS / ESCALATION ROUTES REPORTED" },
    { title: "INTERIM OWNERSHIP / ACCEPTANCE DATES PENDING", description: "The transition has interim owners. Record the responsibilities they have accepted, the items they cannot yet control and the dates for final handover.", status: "INTERIM RESPONSIBILITIES / FINAL SIGN-OFF OPEN" },
    { title: "COLLECTIVE RESPONSIBILITY / NO INDIVIDUAL OWNER", description: "The group is described as collectively responsible, but no person owns the operational work. Convert every shared responsibility into a named role with a backup and escalation path.", status: "COMMUNITY CLAIM / ACCOUNTABILITY NOT ASSIGNED" },
    { title: "ADVISORY COUNCIL / AUTHORITY NOT DOCUMENTED", description: "An informal council is mentioned without a public role map or confirmed decision rights. Name its members, define its scope and separate advice from authority to change systems.", status: "ADVISORY GROUP REPORTED / AUTHORITY UNVERIFIED" },
  ][ownership];

  const acceptanceRows = [
    { title: "EVIDENCE-BASED MILESTONE ACCEPTANCE", description: "Every milestone has an owner, due date, acceptance criteria, evidence artifact and sign-off. Keep the acceptance record versioned so a completed deliverable cannot quietly become an unfinished phase.", status: "OWNER / DATE / CRITERIA / EVIDENCE REPORTED" },
    { title: "DATED CHECKPOINTS / CRITERIA STILL EVOLVING", description: "The plan has dated checkpoints and measurable outcomes, but some acceptance criteria remain open. Publish the unresolved scope and do not mark the work complete until the evidence is available.", status: "CHECKPOINTS REPORTED / ACCEPTANCE PARTIAL" },
    { title: "ANNOUNCEMENT-BASED COMPLETION", description: "A public update is being treated as proof that a phase is complete. Require a deliverable, owner and verifiable evidence before closing the milestone.", status: "ANNOUNCEMENT PUBLISHED / DELIVERABLE NOT VERIFIED" },
    { title: "NESTED MILESTONE REVIEW", description: "The phase structure keeps creating additional phases. Freeze the current scope, define one acceptance test and close the existing deliverable before creating another milestone.", status: "PHASE EXPANSION / ACCEPTANCE NOT CLOSED" },
  ][acceptance];

  const securityRows = [
    { title: "CREDENTIAL ROTATION AND LEAST-PRIVILEGE CHECK", description: "Rotate credentials, revoke former access where appropriate, verify signer roles, document least-privilege permissions and retain a timestamped record of the change.", status: "ROTATION / SIGNER REVIEW / REVOCATION REPORTED" },
    { title: "STAGED ACCESS REVIEW / RESIDUAL RISKS TRACKED", description: "The transition is staged. Keep a register of outstanding credentials, assign a named owner to each risk and record the date and evidence required to close it.", status: "STAGED REVIEW / OPEN RISKS ASSIGNED" },
    { title: "PUBLIC ANNOUNCEMENT / CREDENTIAL ROTATION DEFERRED", description: "The new administrator is announced before the permission changes are verified. Pause any claim of complete transfer until rotation, revocation and access testing are recorded.", status: "NEW ADMIN ANNOUNCED / PERMISSION STATE UNKNOWN" },
    { title: "PINNED SECURITY CHECKLIST / NO PERMISSION EVIDENCE", description: "A checklist is visible, but the underlying permissions have not been demonstrated. Request evidence for each critical system and mark unverified access as an open risk.", status: "CHECKLIST PUBLISHED / CONTROL CHANGE NOT PROVEN" },
  ][security];

  const releaseRows = [
    { title: "SCOPED FIRST RELEASE / TESTED ROLLBACK", description: "Deliver one bounded change with a named maintainer, test evidence, rollback path and explicit sign-off. Use the first release to prove that the new operating structure can maintain the system.", status: "SCOPE / TEST / MAINTAINER / SIGN-OFF REPORTED" },
    { title: "PHASED RELEASE / CHECKPOINTS DEFINED", description: "The release is staged with measurable checkpoints and disclosed dependencies. Keep each phase independently testable and avoid bundling unrelated work into the handover.", status: "STAGED RELEASE / DEPENDENCIES DISCLOSED" },
    { title: "ROADMAP THREAD MISLABELLED AS RELEASE ONE", description: "A new roadmap has been published, but the answers do not identify a shipped change. Record the first actual deliverable and its verification evidence.", status: "NEW DOCUMENT / NO RELEASE EVIDENCE" },
    { title: "MULTIVERSE RELAUNCH / SCOPE NOT CONTROLLED", description: "Several unrelated workstreams are being announced at once. Reduce the scope to one maintainable release with an owner, asset register and acceptance test.", status: "SCOPE CREEP / RELEASE BOUNDARIES NOT SET" },
  ][release];

  return [
    { phase: "PHASE 01 / AUTHORITY TRANSFER", title: accessRows.title, description: projectLabel + " enters operational handover. " + accessRows.description, eta: "ALREADY IN PROGRESS", status: accessRows.status },
    { phase: "PHASE 02 / ASSET DISCOVERY", title: assetRows.title, description: assetRows.description, eta: schedule, status: assetRows.status },
    { phase: "PHASE 03 / RESPONSIBILITY MAP", title: ownershipRows.title, description: ownershipRows.description, eta: schedule, status: ownershipRows.status },
    { phase: "PHASE 04 / DELIVERY ACCEPTANCE", title: acceptanceRows.title, description: acceptanceRows.description, eta: schedule, status: acceptanceRows.status },
    { phase: "PHASE 05 / ACCESS SECURITY", title: securityRows.title, description: securityRows.description, eta: schedule, status: securityRows.status },
    { phase: "PHASE 06 / FIRST MAINTAINABLE RELEASE", title: releaseRows.title, description: releaseRows.description, eta: schedule, status: releaseRows.status },
    {
      phase: "PHASE 07 / HANDOVER CLOSEOUT",
      title: "NO OPEN CRITICAL ACCESS OR OWNERLESS DELIVERABLES",
      description: "Close the takeover only when critical permissions have been verified, project assets have named custodians, operational responsibilities have accepted owners and the first release has passed its stated checks. Publish unresolved limitations instead of declaring a fictional clean bill of health.",
      eta: "AFTER ALL SIX CHECKS HAVE NAMED EVIDENCE AND OWNERS",
      status: "CLOSEOUT / OPEN ITEMS MUST REMAIN VISIBLE",
    },
  ];
}

export function buildRoadmapResult(answers: number[], projectName: string): RoadmapResult {
  if (!isValidRoadmapAnswers(answers)) {
    throw new Error("A complete, valid roadmap questionnaire is required.");
  }
  const projectSlug = slugifyProjectName(projectName);
  const projectLabel = projectSlug.replace(/-/g, " ");
  const progress = inspectRoadmapProgress(answers);
  const { primaryTag, secondaryTag } = chooseProfiles(answers);
  const seed = answers.reduce((sum, answer, index) => ((sum * 37) + (answer + 1) * (index + 19)) % 900000, 707070);
  const caseNumber = String(seed + 100000).slice(-6);
  const summary = [
    progress.delivery + "/100 DELIVERY CLARITY",
    progress.realism + "/100 TIMELINE REALISM",
    progress.inflation + "/100 PROMISE INFLATION",
  ].join(" / ");
  const selected = answers.map((answer, index) => questions[index].options[answer]);
  const strongestDelivery = selected.reduce((best, item, index) =>
    item.delivery > selected[best].delivery ? index : best, 0);
  const highestInflation = selected.reduce((best, item, index) =>
    item.inflation > selected[best].inflation ? index : best, 0);
  const deliveryItem = selected[strongestDelivery];
  const inflationItem = selected[highestInflation];
  const crossRead: DepartmentCrossRead = {
    headline: progress.delivery <= 35 && progress.inflation >= 65
      ? "THE ROADMAP HAS OUTRUN DELIVERY"
      : progress.delivery >= 65 && progress.inflation >= 55
        ? "REAL DELIVERABLES / EXPANDING PROMISES"
        : progress.delivery >= 65 && progress.realism >= 65
          ? "A CALENDAR WITH CHECKPOINTS"
          : progress.inflation >= 65
            ? "SOON™ IS DOING THE HEAVY LIFTING"
            : "RECOVERY PLAN / MIXED DELIVERY SIGNALS",
    interpretation:
      "The selected roadmap answers produce " + progress.delivery + "/100 delivery clarity, " + progress.realism +
      "/100 timeline realism and " + progress.inflation + "/100 promise inflation. The comparison below puts the clearest delivery claim beside the answer that carried the most promise inflation. It describes this fictional questionnaire, not a real project's execution.",
    signals: [
      {
        label: "CLEAREST DELIVERY SIGNAL",
        context: questions[strongestDelivery].prompt,
        answer: deliveryItem.label,
        detail: "Delivery " + deliveryItem.delivery + "/5 · Realism " + deliveryItem.realism + "/5 · Inflation " + deliveryItem.inflation + "/5.",
      },
      {
        label: "HIGHEST PROMISE-INFLATION SIGNAL",
        context: questions[highestInflation].prompt,
        answer: inflationItem.label,
        detail: "Delivery " + inflationItem.delivery + "/5 · Realism " + inflationItem.realism + "/5 · Inflation " + inflationItem.inflation + "/5.",
      },
    ],
  };

  return {
    ...progress,
    crossRead,
    answers: [...answers],
    projectSlug,
    projectLabel,
    primaryTag,
    secondaryTag,
    profile: classifications[primaryTag],
    secondaryProfile: classifications[secondaryTag],
    finding: getFinding(progress),
    disposition: getDisposition(progress),
    caseNumber,
    summary,
    milestones: buildMilestones(answers, projectLabel),
  };
}
