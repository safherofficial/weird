import { classifications, questions, type ArchetypeId } from "./audit-data";

export type AuditResult = {
  answers: number[];
  research: number;
  cope: number;
  crowd: number;
  profile: (typeof classifications)[ArchetypeId];
  secondaryProfile: (typeof classifications)[ArchetypeId];
  primaryTag: ArchetypeId;
  secondaryTag: ArchetypeId;
  finding: string;
  disposition: string;
  caseNumber: string;
};

export const AUDIT_VERSION = 2;
export const AUDIT_QUESTION_COUNT = questions.length;

export function isValidAnswers(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length === questions.length &&
    value.every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)
  );
}

function getFinding(research: number, cope: number, crowd: number) {
  if (cope >= 82) return "SEVERE CONVICTION DISTORTION";
  if (crowd >= 70) return "COMMUNITY-SOURCED CONVICTION";
  if (research >= 76 && cope >= 56) return "RESEARCH-TO-REALITY DISCONNECT";
  if (research < 30) return "DUE DILIGENCE: MOSTLY VIBES";
  if (research >= 76 && cope < 38) return "DOCUMENTATION RECEIVED. OUTCOME STILL UNKNOWN.";
  if (crowd <= 20 && research >= 60) return "INDEPENDENT THINKING DETECTED. PLEASE REMAIN CALM.";
  return "INCONCLUSIVE, BUT VERY ON-BRAND.";
}

function getDisposition(research: number, cope: number, crowd: number) {
  if (cope >= 82) return "REFER TO THE OFFICE OF UNFINISHED EXIT PLANS";
  if (crowd >= 70) return "PLACE UNDER COMMUNITY OBSERVATION";
  if (research >= 76 && cope >= 56) return "FORWARD TO THE DEPARTMENT OF POST-TRADE RATIONALISATION";
  if (research < 30) return "ASSIGN A WHITEPAPER. DO NOT OPEN TELEGRAM.";
  if (research >= 76 && cope < 38) return "FILE UNDER: DID EVERYTHING RIGHT-ISH";
  if (crowd <= 20) return "RELEASE WITH A CAUTIONARY FOOTNOTE";
  return "KEEP FILE OPEN PENDING MARKET BEHAVIOUR";
}

export function buildResult(answers: number[]): AuditResult {
  if (!isValidAnswers(answers)) {
    throw new Error("A complete, valid set of audit answers is required.");
  }

  const selected = answers.map((answer, index) => questions[index].options[answer]);
  const maxScore = questions.length * 5;
  const research = Math.round((selected.reduce((sum, item) => sum + item.research, 0) / maxScore) * 100);
  const cope = Math.round((selected.reduce((sum, item) => sum + item.cope, 0) / maxScore) * 100);
  const crowd = Math.round((selected.reduce((sum, item) => sum + item.crowd, 0) / maxScore) * 100);

  const tallies = new Map<ArchetypeId, { count: number; cope: number; firstIndex: number }>();
  selected.forEach((item, index) => {
    const current = tallies.get(item.tag);
    if (current) {
      current.count += 1;
      current.cope += item.cope;
    } else {
      tallies.set(item.tag, { count: 1, cope: item.cope, firstIndex: index });
    }
  });

  const ranking = [...tallies.entries()].sort((a, b) =>
    b[1].count - a[1].count ||
    b[1].cope - a[1].cope ||
    a[1].firstIndex - b[1].firstIndex
  );
  const primaryTag = ranking[0]?.[0] ?? "social-proof";
  const secondaryTag = ranking[1]?.[0] ?? primaryTag;
  const seed = answers.reduce((sum, answer, index) => ((sum * 31) + (answer + 1) * (index + 11)) % 900000, 271828);
  const caseNumber = String(seed + 100000).slice(-6);

  return {
    answers: [...answers],
    research,
    cope,
    crowd,
    profile: classifications[primaryTag],
    secondaryProfile: classifications[secondaryTag],
    primaryTag,
    secondaryTag,
    finding: getFinding(research, cope, crowd),
    disposition: getDisposition(research, cope, crowd),
    caseNumber,
  };
}
