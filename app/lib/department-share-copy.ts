/**
 * Character budget for public case copy posted with a separate short-link URL.
 * The buffer leaves room for X's t.co URL accounting and avoids last-second edits.
 */
export const DEPARTMENT_SHARE_TEXT_LIMIT = 235;

export type DepartmentShareCopyInput = {
  opening: string;
  finding: string;
  punchline: string;
  evidence?: string;
  invitation?: string;
};

function clean(value: string | undefined): string {
  return (value ?? "").replace(/\s+/g, " ").trim();
}

function joinCopy(parts: Array<string | undefined>): string {
  return parts.map((part) => clean(part)).filter(Boolean).join(" ");
}

function truncateAtWord(value: string, maxLength: number): string {
  if (!value || maxLength <= 0) return "";
  if (value.length <= maxLength) return value;
  if (maxLength === 1) return "…";

  const candidate = value.slice(0, maxLength - 1);
  const boundary = candidate.lastIndexOf(" ");
  const readable = boundary >= Math.floor(maxLength * 0.6)
    ? candidate.slice(0, boundary)
    : candidate;

  return readable.trimEnd() + "…";
}

/**
 * Builds a concise, case-specific post. The opening, finding and punchline
 * take priority; optional metrics and the call to action are included only
 * when the complete copy still fits the reserved platform budget.
 */
export function buildDepartmentShareText(input: DepartmentShareCopyInput): string {
  const opening = clean(input.opening);
  let finding = clean(input.finding);
  const punchline = clean(input.punchline);
  const evidence = clean(input.evidence);
  const invitation = clean(input.invitation);

  const punchlineReserve = Math.min(punchline.length, 76);
  const prefixBudget = Math.max(
    0,
    DEPARTMENT_SHARE_TEXT_LIMIT - punchlineReserve - (punchline ? 1 : 0),
  );
  const prefix = joinCopy([opening, finding]);

  if (prefix.length > prefixBudget) {
    if (opening.length >= prefixBudget) {
      const openingBudget = Math.max(1, Math.floor(prefixBudget * 0.58));
      const compactOpening = truncateAtWord(opening, openingBudget);
      const findingBudget = Math.max(0, prefixBudget - compactOpening.length - (finding ? 1 : 0));
      finding = truncateAtWord(finding, findingBudget);
      return finishShareText(compactOpening, finding, punchline, evidence, invitation);
    }

    finding = truncateAtWord(
      finding,
      Math.max(0, prefixBudget - opening.length - (finding ? 1 : 0)),
    );
  }

  return finishShareText(opening, finding, punchline, evidence, invitation);
}

function finishShareText(
  opening: string,
  finding: string,
  punchline: string,
  evidence: string,
  invitation: string,
): string {
  const compactPrefix = joinCopy([opening, finding]);
  const punchlineBudget = Math.max(
    0,
    DEPARTMENT_SHARE_TEXT_LIMIT - compactPrefix.length - (compactPrefix && punchline ? 1 : 0),
  );
  const compactPunchline = truncateAtWord(punchline, punchlineBudget);
  const core = joinCopy([opening, finding, compactPunchline]);

  if (core.length >= DEPARTMENT_SHARE_TEXT_LIMIT) return core;

  let compactEvidence = evidence;
  if (compactEvidence) {
    const evidenceCandidate = joinCopy([opening, finding, compactEvidence, compactPunchline]);
    if (evidenceCandidate.length > DEPARTMENT_SHARE_TEXT_LIMIT) {
      const evidenceBudget = DEPARTMENT_SHARE_TEXT_LIMIT - core.length - 2;
      compactEvidence = evidenceBudget >= 28
        ? truncateAtWord(compactEvidence, evidenceBudget)
        : "";
    }
  }

  const withEvidence = joinCopy([opening, finding, compactEvidence, compactPunchline]);
  if (withEvidence.length >= DEPARTMENT_SHARE_TEXT_LIMIT || !invitation) return withEvidence;

  const withInvitation = joinCopy([opening, finding, compactEvidence, compactPunchline, invitation]);
  return withInvitation.length <= DEPARTMENT_SHARE_TEXT_LIMIT ? withInvitation : withEvidence;
}
