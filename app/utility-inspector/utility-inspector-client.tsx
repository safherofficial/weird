"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DepartmentNextSteps from "../components/department-next-steps";
import { recordPassportActivity } from "../passport/passport-store";
import {
  buildUtilityResult,
  decodeUtilityCode,
  encodeUtilityCode,
  inspectProgress,
  questions,
  type UtilityResult,
} from "./utility-engine";

function makeCaseUrl(answers: number[]) {
  if (typeof window === "undefined") return "/utility-inspector";
  return window.location.origin + "/utility-inspector/case/" + encodeURIComponent(encodeUtilityCode(answers));
}

function makeChallengeUrl(answers: number[]) {
  if (typeof window === "undefined") return "/utility-inspector";
  return window.location.origin + "/utility-inspector?challenge=" + encodeURIComponent(encodeUtilityCode(answers));
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&apos;",
    };
    return entities[char];
  });
}

function safeXCopy(value: string, limit = 60) {
  if (value.length <= limit) return value;
  const clipped = value.slice(0, limit - 3);
  const boundary = clipped.lastIndexOf(" ");
  return clipped.slice(0, boundary > limit * 0.55 ? boundary : clipped.length) + "…";
}

function makeCaseCard(result: UtilityResult) {
  const title = escapeXml(result.profile.title);
  const subtitle = escapeXml(result.profile.subtitle);
  const roast = escapeXml(result.profile.roast);
  const finding = escapeXml(result.finding);
  const scores = [
    { label: "UTILITY EVIDENCE", value: result.evidence, color: "#b6ff65" },
    { label: "NARRATIVE FOG", value: result.fog, color: "#ff7777" },
    { label: "TOKEN JUSTIFICATION", value: result.tokenFit, color: "#c8b5ff" },
  ];
  const scoreCards = scores.map((score, index) => {
    const x = 64 + index * 365;
    return (
      '<rect x="' + x + '" y="337" width="337" height="112" fill="#121713" stroke="#384137"/>' +
      '<text x="' + (x + 22) + '" y="374" fill="#8d968a" font-family="monospace" font-size="13">' + score.label + '</text>' +
      '<text x="' + (x + 22) + '" y="424" fill="' + score.color + '" font-family="monospace" font-size="37" font-weight="bold">' + score.value + '/100</text>'
    );
  }).join("");

  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">' +
    '<rect width="1200" height="675" fill="#090b09"/>' +
    '<rect x="28" y="28" width="1144" height="619" fill="none" stroke="#384137" stroke-width="2"/>' +
    '<path d="M28 110H1172M28 572H1172" stroke="#384137"/>' +
    '<text x="64" y="77" fill="#b6ff65" font-family="monospace" font-size="25" font-weight="bold">THE DYOR DEPARTMENT</text>' +
    '<text x="1136" y="77" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="15">100X RESEARCH BUREAU / CASE FILE</text>' +
    '<text x="64" y="151" fill="#8d968a" font-family="monospace" font-size="16">CASE No. ' + result.caseNumber + ' / FORM UTI-001</text>' +
    '<text x="64" y="226" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="43" font-weight="900">' + title + '</text>' +
    '<text x="64" y="270" fill="#b6ff65" font-family="monospace" font-size="18">' + subtitle + '</text>' +
    '<text x="64" y="310" fill="#ff8580" font-family="monospace" font-size="13" font-weight="bold">DEPARTMENTAL FINDING / ' + finding + '</text>' +
    scoreCards +
    '<text x="64" y="502" fill="#e1e5dc" font-family="Arial,sans-serif" font-size="19">' + roast + '</text>' +
    '<text x="64" y="612" fill="#b6ff65" font-family="monospace" font-size="15" font-weight="bold">UTILITY CLAIMS HAVE BEEN RECEIVED. PROOF IS A SEPARATE DEPARTMENT.</text>' +
    '<text x="1136" y="612" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="12">ENTERTAINMENT ONLY</text>' +
    '</svg>'
  );
}

export default function UtilityInspectorClient() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<UtilityResult | null>(null);
  const [current, setCurrent] = useState(0);
  const [challengeMessage, setChallengeMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const code = new URLSearchParams(window.location.search).get("challenge");
      const nominatedAnswers = decodeUtilityCode(code);
      if (nominatedAnswers) {
        const nominated = buildUtilityResult(nominatedAnswers);
        setChallengeMessage(nominated.profile.title + " HAS NOMINATED YOU. EXPLAIN YOUR UTILITY CLAIMS.");
      }
    } catch {
      setNotice("THE DEPARTMENT COULD NOT READ THE NOMINATION. A FRESH INSPECTION IS AVAILABLE.");
    }
  }, []);

  const progress = inspectProgress(answers.slice(0, current));
  const question = questions[current];

  function startInspection() {
    setStarted(true);
    setNotice("");
  }

  function chooseAnswer(answerIndex: number) {
    const next = [...answers.slice(0, current), answerIndex];
    setAnswers(next);
    setNotice("");

    if (current === questions.length - 1) {
      setResult(buildUtilityResult(next));
      recordPassportActivity("utility");
    } else {
      setCurrent(current + 1);
    }
  }

  function restart() {
    setStarted(false);
    setAnswers([]);
    setResult(null);
    setCurrent(0);
    setNotice("");
    setChallengeMessage("");

    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("challenge");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    } catch {
      // The inspection can restart even when browser history is unavailable.
    }
  }

  async function copyReport() {
    if (!result) return;
    const caseUrl = makeCaseUrl(result.answers);
    const challengeUrl = makeChallengeUrl(result.answers);
    const text = [
      "THE DYOR DEPARTMENT — 100X RESEARCH BUREAU",
      "CASE No. " + result.caseNumber,
      "CLASSIFICATION: " + result.profile.title,
      "DEPARTMENTAL FINDING: " + result.finding,
      "UTILITY EVIDENCE: " + result.evidence + "/100",
      "NARRATIVE FOG: " + result.fog + "/100",
      "TOKEN JUSTIFICATION: " + result.tokenFit + "/100",
      result.profile.roast,
      "This is a fictional entertainment inspection based only on selected answers. It does not assess a real project, token or investment.",
      "PUBLIC CASE FILE: " + caseUrl,
      "NOMINATE ANOTHER DEGEN: " + challengeUrl,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setNotice("INSPECTION REPORT AND CHALLENGE LINKS COPIED.");
    } catch {
      setNotice("CLIPBOARD UNAVAILABLE. TRY POSTING YOUR CASE TO X.");
    }
  }

  async function shareReport() {
    if (!result) return;
    const caseUrl = makeCaseUrl(result.answers);
    const text = [
      "THE DYOR DEPARTMENT inspected my utility claims.",
      "Verdict: " + result.profile.title + ".",
      "Evidence: " + result.evidence + "/100 | Narrative fog: " + result.fog + "/100 | Token justification: " + result.tokenFit + "/100.",
      safeXCopy(result.profile.roast),
    ].join(" ");

    if (navigator.share) {
      try {
        await navigator.share({ title: "My 100X Research Bureau case file", text, url: caseUrl });
      } catch {
        setNotice("SHARE CANCELLED. YOUR INSPECTION REMAINS ON FILE.");
      }
    } else {
      await copyReport();
    }
  }

  async function downloadCard() {
    if (!result) return;
    let objectUrl = "";

    try {
      const svg = makeCaseCard(result);
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      objectUrl = URL.createObjectURL(blob);
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 675;
        const context = canvas.getContext("2d");

        if (!context) {
          URL.revokeObjectURL(objectUrl);
          setNotice("CASE CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
          return;
        }

        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(objectUrl);
        canvas.toBlob((png) => {
          if (!png) {
            setNotice("CASE CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
            return;
          }

          const downloadUrl = URL.createObjectURL(png);
          const anchor = document.createElement("a");
          anchor.href = downloadUrl;
          anchor.download = "dyor-utility-inspector-" + result.caseNumber + ".png";
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
          setNotice("YOUR UTILITY INSPECTION CARD HAS BEEN ISSUED.");
        }, "image/png");
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setNotice("CASE CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
      };
      image.src = objectUrl;
    } catch {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setNotice("CASE CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
    }
  }

  if (result) {
    const caseUrl = makeCaseUrl(result.answers);
    const xText = [
      "THE DYOR DEPARTMENT inspected my utility claims.",
      "Verdict: " + result.profile.title + ".",
      "Utility: " + result.evidence + "/100. Fog: " + result.fog + "/100. Token fit: " + result.tokenFit + "/100.",
      safeXCopy(result.profile.roast),
      "Inspect yours.",
    ].join(" ");
    const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(caseUrl);
    const challengeText = "THE DYOR DEPARTMENT classified my project utility claims as " + result.profile.title + ". Can your project survive inspection?";
    const challengeIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(challengeText) + "&url=" + encodeURIComponent(makeChallengeUrl(result.answers));

    return (
      <section className="utility-panel utility-result" aria-live="polite">
        <div className="utility-panel__header">
          <span>INSPECTION COMPLETE / 07 OF 07</span>
          <span className="utility-status utility-status--closed">● FILED</span>
        </div>
        <p className="eyebrow">CASE No. {result.caseNumber} / FINAL DETERMINATION</p>
        <h2>{result.profile.title}</h2>
        <p className="utility-result__subtitle">{result.profile.subtitle}</p>

        <div className="utility-finding">
          <span>DEPARTMENTAL FINDING</span>
          <strong>{result.finding}</strong>
          <small>{result.profile.disposition}</small>
        </div>

        <div className="utility-metrics">
          <div>
            <span>UTILITY EVIDENCE</span>
            <strong>{result.evidence}<small>/100</small></strong>
            <i>WHAT CAN BE VERIFIED IN YOUR ANSWERS</i>
          </div>
          <div>
            <span>NARRATIVE FOG</span>
            <strong className="utility-fog">{result.fog}<small>/100</small></strong>
            <i>HOW MUCH PITCH DECK IS IN THE ROOM</i>
          </div>
          <div>
            <span>TOKEN JUSTIFICATION</span>
            <strong className="utility-token">{result.tokenFit}<small>/100</small></strong>
            <i>HOW WELL THE TOKEN ROLE IS EXPLAINED</i>
          </div>
        </div>

        <div className="utility-secondary">
          <span>SECONDARY PATTERN DETECTED</span>
          <strong>{result.secondaryProfile.title}</strong>
          <small>{result.secondaryProfile.subtitle}</small>
        </div>

        <div className="utility-roast">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <p>“{result.profile.roast}”</p>
        </div>

        <div className="utility-history">
          <div className="utility-history__heading">
            <span>INSPECTION CHECKLIST</span>
            <span>7 CLAIMS REVIEWED</span>
          </div>
          {result.history.map((item, index) => (
            <div className="utility-history__row" key={index}>
              <span>0{index + 1}</span>
              <div>
                <strong>{item.question}</strong>
                <small>{item.answer}</small>
              </div>
              <b>{item.evidence}/5</b>
            </div>
          ))}
        </div>

        <p className="utility-disclaimer">
          This is a fictional entertainment inspection generated only from your selected answers. It does not
          inspect a real company, token, product, contract or market. Scores do not measure investment quality,
          safety, legitimacy or financial performance.
        </p>

        <div className="utility-actions">
          <button className="button button--primary" type="button" onClick={downloadCard}>DOWNLOAD CASE CARD <span>↓</span></button>
          <button className="button button--outline" type="button" onClick={shareReport}>SHARE CASE <span>↗</span></button>
          <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">POST CASE TO X <span>↗</span></a>
          <a className="button button--challenge" href={challengeIntent} target="_blank" rel="noopener noreferrer">CHALLENGE A DEGEN <span>↗</span></a>
          <button className="button button--quiet" type="button" onClick={copyReport}>COPY REPORT + LINKS</button>
          <button className="button button--quiet" type="button" onClick={restart}>INSPECT AGAIN ↺</button>
        </div>
        {notice && <p className="audit-notice" role="status">{notice}</p>}
        <p className="utility-public-link"><Link href={caseUrl}>OPEN PUBLIC CASE FILE ↗</Link></p>
        <DepartmentNextSteps currentDepartment="utility" />
      </section>
    );
  }

  if (!started) {
    return (
      <section className="utility-panel utility-briefing">
        <div className="utility-panel__header">
          <span>FORM UTI-001 / CLAIMS INTAKE</span>
          <span className="utility-status"><i /> READY TO INSPECT</span>
        </div>

        {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

        <div className="utility-briefing__body">
          <p className="eyebrow">100X RESEARCH BUREAU / NARRATIVE & TOKEN PURPOSE DESK</p>
          <h2>SHOW US<br /><span>THE UTILITY.</span></h2>
          <p className="utility-briefing__lead">
            Seven questions. Three departmental scores. One uncomfortable attempt to explain what the product does.
          </p>

          <div className="utility-briefing__facts">
            <div><span>FORM TYPE</span><strong>SELF-REPORTED CLAIMS</strong></div>
            <div><span>INSPECTION METHOD</span><strong>SEVEN MULTIPLE-CHOICE QUESTIONS</strong></div>
            <div><span>OUTCOME</span><strong>FICTIONAL DEPARTMENTAL DOSSIER</strong></div>
          </div>

          <div className="utility-briefing__warning">
            <span>IMPORTANT / THE FINE PRINT</span>
            <p>This is a satirical questionnaire, not a real due-diligence tool. It does not connect to or inspect an actual project, token, smart contract or data source. It only scores the answers selected by the visitor.</p>
          </div>

          <div className="utility-briefing__actions">
            <button className="button button--primary" type="button" onClick={startInspection}>OPEN INSPECTION <span>↗</span></button>
            <span>NO CONTRACT SCANNER. NO ORACLE. NO FINANCIAL ADVICE.</span>
          </div>
        </div>
      </section>
    );
  }

  const completed = current;
  const currentOption = answers[current];

  return (
    <section className="utility-panel utility-game" aria-label="100X Research Bureau token-purpose inspection">
      <div className="utility-panel__header">
        <span>INSPECTION IN PROGRESS / {String(current + 1).padStart(2, "0")} OF 07</span>
        <span className="utility-status"><i /> CLAIMS UNDER REVIEW</span>
      </div>

      {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

      <div className="utility-progress" role="progressbar" aria-label="Inspection completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round((completed / questions.length) * 100)}>
        <div style={{ width: ((completed / questions.length) * 100) + "%" }} />
      </div>
      <div className="utility-progress__meta">
        <span>QUESTION {String(current + 1).padStart(2, "0")} / 07</span>
        <span>{Math.round((completed / questions.length) * 100)}% COMPLETE</span>
      </div>

      <div className="utility-live-scores">
        <div><span>UTILITY EVIDENCE</span><strong>{progress.evidence}</strong></div>
        <div><span>NARRATIVE FOG</span><strong>{progress.fog}</strong></div>
        <div><span>TOKEN JUSTIFICATION</span><strong>{progress.tokenFit}</strong></div>
      </div>

      <div className="utility-question">
        <div className="utility-question__number">INSPECTION // {String(current + 1).padStart(2, "0")}</div>
        <h2 id="utility-current-question" aria-live="polite" aria-atomic="true">{question.prompt}</h2>
        <p>{question.note}</p>
        <div className="utility-answer-list" role="group" aria-labelledby="utility-current-question">
          {question.options.map((option, index) => (
            <button
              className={"utility-answer" + (currentOption === index ? " is-selected" : "")}
              aria-pressed={currentOption === index}
              key={option.label}
              type="button"
              onClick={() => chooseAnswer(index)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <strong>{option.label}</strong>
              <b aria-hidden="true">↗</b>
            </button>
          ))}
        </div>
      </div>

      <div className="utility-game__footer">
        <span>CLAIMS ARE SELF-REPORTED. THE DEPARTMENT HAS NOT VERIFIED THEM.</span>
        <div>
          {current > 0 && (
            <button type="button" onClick={() => setCurrent(current - 1)}>← PREVIOUS</button>
          )}
          <button type="button" onClick={restart}>CLOSE FILE ↺</button>
        </div>
      </div>
      {notice && <p className="audit-notice" role="status">{notice}</p>}
    </section>
  );
}
