import { classifications, questions, type ArchetypeId } from "./audit-data";
import { buildDepartmentShareText } from "../lib/department-share-copy";

export type AuditCrossRead = {
  headline: string;
  interpretation: string;
  strongestEvidence: {
    prompt: string;
    answer: string;
    score: number;
  };
  strongestPressure: {
    prompt: string;
    answer: string;
    cope: number;
    crowd: number;
  };
};

export type AuditResult = {
  answers: number[];
  crossRead: AuditCrossRead;
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
    Array.from(value).every((answer) => Number.isInteger(answer) && answer >= 0 && answer < 4)
  );
}

export function encodeCaseCode(answers: number[]): string {
  if (!isValidAnswers(answers)) {
    throw new Error("A complete, valid set of audit answers is required.");
  }

  return "v" + AUDIT_VERSION + "-" + answers.join("");
}

export function decodeCaseCode(value: unknown): number[] | null {
  if (typeof value !== "string") return null;

  const match = value.match(new RegExp("^v" + AUDIT_VERSION + "-([0-3]{" + AUDIT_QUESTION_COUNT + "})$"));
  if (!match) return null;

  const answers = [...match[1]].map(Number);
  return isValidAnswers(answers) ? answers : null;
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
  if (research < 30) return "ASSIGN A TOKEN DOSSIER. DO NOT OPEN CT OR TELEGRAM.";
  if (research >= 76 && cope < 38) return "FILE UNDER: DID EVERYTHING RIGHT-ISH";
  if (crowd <= 20) return "RELEASE WITH A CAUTIONARY FOOTNOTE";
  return "KEEP FILE OPEN PENDING MARKET BEHAVIOUR";
}

function buildCrossRead(
  selected: Array<(typeof questions)[number]["options"][number]>,
  research: number,
  cope: number,
  crowd: number,
): AuditCrossRead {
  let evidenceIndex = 0;
  let pressureIndex = 0;

  for (let index = 1; index < selected.length; index += 1) {
    if (selected[index].research > selected[evidenceIndex].research) {
      evidenceIndex = index;
    }

    const pressure = selected[index].cope + selected[index].crowd;
    const bestPressure = selected[pressureIndex].cope + selected[pressureIndex].crowd;
    if (
      pressure > bestPressure ||
      (pressure === bestPressure && selected[index].crowd > selected[pressureIndex].crowd) ||
      (pressure === bestPressure &&
        selected[index].crowd === selected[pressureIndex].crowd &&
        selected[index].cope > selected[pressureIndex].cope)
    ) {
      pressureIndex = index;
    }
  }

  let headline = "MIXED SIGNALS / NO CLEAN VERDICT";
  let interpretation = "Your selected answers combine research, conviction and crowd cues without producing one dominant pattern. This file can describe the answers, not predict a real-world outcome.";

  if (research >= 60 && (cope >= 55 || crowd >= 55)) {
    headline = "THE RESEARCH / CONVICTION CROSS-CURRENT";
    interpretation = "Your answers include evidence-led checks and a strong pull to preserve the upside narrative. The interesting tension is where those two impulses meet; this fictional questionnaire cannot tell which would win with real capital.";
  } else if (crowd >= 60) {
    headline = "THE TIMELINE HAS A VOTE";
    interpretation = "Your selected answers give CT, KOL and Telegram signals a prominent role. In this case file, social confirmation carries more weight than independent verification.";
  } else if (cope >= 60) {
    headline = "THE NARRATIVE SAFETY NET";
    interpretation = "Several selected answers reach for explanations that keep the original thesis alive after the scenario changes. That is a pattern in this fictional exercise, not a diagnosis or a claim about real behaviour.";
  } else if (research >= 60 && crowd <= 35) {
    headline = "THE INDEPENDENT CHECKLIST";
    interpretation = "Your answers favour verifiable checks and give crowd cues relatively little weight. That describes this questionnaire response, not the quality or outcome of any real trade.";
  } else if (research < 35) {
    headline = "THE VIBES-FIRST FILE";
    interpretation = "The selected answers place limited weight on independently verifiable checks. Narrative and momentum cues carry more weight in this fictional case.";
  }

  return {
    headline,
    interpretation,
    strongestEvidence: {
      prompt: questions[evidenceIndex].prompt,
      answer: selected[evidenceIndex].label,
      score: selected[evidenceIndex].research,
    },
    strongestPressure: {
      prompt: questions[pressureIndex].prompt,
      answer: selected[pressureIndex].label,
      cope: selected[pressureIndex].cope,
      crowd: selected[pressureIndex].crowd,
    },
  };
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
  const crossRead = buildCrossRead(selected, research, cope, crowd);
  const seed = answers.reduce((sum, answer, index) => ((sum * 31) + (answer + 1) * (index + 11)) % 900000, 271828);
  const caseNumber = String(seed + 100000).slice(-6);

  return {
    answers: [...answers],
    crossRead,
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


/**
 * Keeps the Audit X post inside the Department's shared text budget while
 * prioritising the classification, scores and final satirical finding.
 */
export function buildAuditShareText(result: AuditResult): string {
  return buildDepartmentShareText({
    opening: "THE DYOR DEPARTMENT AUDITED ME.",
    finding: [
      result.profile.title + ".",
      "Research " + result.research + "/100",
      "Cope " + result.cope + "/100",
      "Crowd " + result.crowd + "/100",
      result.crossRead.headline + ".",
    ].join(" · "),
    evidence: result.profile.roast,
    punchline: "YOUR LOSSES REMAIN YOURS.",
    invitation: "RUN YOUR OWN AUDIT.",
  });
}
