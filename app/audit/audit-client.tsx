"use client";

import { useEffect, useState } from "react";
import DepartmentNextSteps from "../components/department-next-steps";
import { questions } from "./audit-data";
import { recordPassportActivity } from "../passport/passport-store";
import {
  AUDIT_QUESTION_COUNT,
  AUDIT_VERSION,
  buildResult,
  decodeCaseCode,
  encodeCaseCode,
  isValidAnswers,
  type AuditResult,
} from "./audit-engine";

const STORAGE_KEY = "dyor-department:audit-archive:v2";

type SavedCase = {
  version: number;
  answers: number[];
  savedAt: string;
};

function isSavedCase(value: unknown): value is SavedCase {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SavedCase>;
  return (
    candidate.version === AUDIT_VERSION &&
    isValidAnswers(candidate.answers) &&
    typeof candidate.savedAt === "string" &&
    Number.isFinite(Date.parse(candidate.savedAt))
  );
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

function wrapWords(value: string, maxLength: number) {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const next = line ? line + " " + word : word;
    if (next.length > maxLength && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function makeCardSvg(result: AuditResult, reportUrl: string) {
  const titleLines = wrapWords(result.profile.title, 27).slice(0, 2);
  const subtitleLines = wrapWords(result.profile.subtitle, 68).slice(0, 2);
  const roastLines = wrapWords(result.profile.roast, 88).slice(0, 2);
  const titleSvg = titleLines.map((line, index) =>
    '<text x="64" y="' + (210 + index * 43) + '" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="39" font-weight="900">' + escapeXml(line) + "</text>"
  ).join("");
  const subtitleSvg = subtitleLines.map((line, index) =>
    '<text x="64" y="' + (286 + index * 23) + '" fill="#b6ff65" font-family="monospace" font-size="17">' + escapeXml(line) + "</text>"
  ).join("");
  const roastSvg = roastLines.map((line, index) =>
    '<text x="64" y="' + (522 + index * 25) + '" fill="#e1e5dc" font-family="Arial,sans-serif" font-size="19">' + escapeXml(line) + "</text>"
  ).join("");

  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">' +
    '<rect width="1200" height="675" fill="#090b09"/>' +
    '<rect x="28" y="28" width="1144" height="619" fill="none" stroke="#384137" stroke-width="2"/>' +
    '<path d="M28 110H1172" stroke="#384137"/><path d="M28 585H1172" stroke="#384137"/>' +
    '<path d="M28 28H1172V647H28Z" fill="none" stroke="#b6ff65" stroke-opacity=".08"/>' +
    '<text x="64" y="77" fill="#b6ff65" font-family="monospace" font-size="25" font-weight="bold">THE DYOR DEPARTMENT</text>' +
    '<text x="1136" y="77" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="15">OFFICIAL ENTERTAINMENT FILE</text>' +
    '<text x="64" y="151" fill="#8d968a" font-family="monospace" font-size="16">CASE No. ' + result.caseNumber + " / PERSONAL AUDIT REPORT</text>" +
    titleSvg + subtitleSvg +
    '<text x="64" y="337" fill="#ff7777" font-family="monospace" font-size="14" font-weight="bold">DEPARTMENTAL FINDING / ' + escapeXml(result.finding) + "</text>" +
    '<text x="64" y="359" fill="#75816f" font-family="monospace" font-size="12">SECONDARY PATTERN / ' + escapeXml(result.secondaryProfile.title) + "</text>" +
    '<rect x="64" y="382" width="337" height="112" fill="#121713" stroke="#384137"/>' +
    '<rect x="431" y="382" width="337" height="112" fill="#121713" stroke="#384137"/>' +
    '<rect x="798" y="382" width="338" height="112" fill="#121713" stroke="#384137"/>' +
    '<text x="86" y="418" fill="#8d968a" font-family="monospace" font-size="14">RESEARCH EFFORT</text>' +
    '<text x="86" y="468" fill="#b6ff65" font-family="monospace" font-size="38" font-weight="bold">' + result.research + "/100</text>" +
    '<text x="453" y="418" fill="#8d968a" font-family="monospace" font-size="14">COPE INDEX</text>' +
    '<text x="453" y="468" fill="#ff7777" font-family="monospace" font-size="38" font-weight="bold">' + result.cope + "/100</text>" +
    '<text x="820" y="418" fill="#8d968a" font-family="monospace" font-size="14">CROWD DEPENDENCY</text>' +
    '<text x="820" y="468" fill="#f0f0e9" font-family="monospace" font-size="38" font-weight="bold">' + result.crowd + "/100</text>" +
    '<text x="64" y="507" fill="#8d968a" font-family="monospace" font-size="11">THE DEPARTMENT HAS A COMMENT</text>' +
    roastSvg +
    '<text x="64" y="620" fill="#b6ff65" font-family="monospace" font-size="14" font-weight="bold">YOUR RESEARCH HAS BEEN ACKNOWLEDGED. YOUR LOSSES REMAIN YOURS.</text>' +
    '<text x="1136" y="620" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="11">' + escapeXml(reportUrl) + "</text>" +
    "</svg>"
  );
}

function makeShareUrl(answers: number[]) {
  if (typeof window === "undefined") return "/audit";
  return window.location.origin + "/audit/case/" + encodeURIComponent(encodeCaseCode(answers));
}

function makeChallengeUrl(answers: number[]) {
  if (typeof window === "undefined") return "/audit";
  return window.location.origin + "/audit?challenge=" + encodeURIComponent(encodeCaseCode(answers));
}

function makeXSafeRoast(value: string) {
  if (value.length <= 82) return value;
  const clipped = value.slice(0, 79);
  const boundary = clipped.lastIndexOf(" ");
  return clipped.slice(0, boundary > 48 ? boundary : clipped.length) + "…";
}

export default function AuditClient() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [notice, setNotice] = useState("");
  const [challengeMessage, setChallengeMessage] = useState("");
  const [savedCases, setSavedCases] = useState<SavedCase[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  const progress = (answers.length / AUDIT_QUESTION_COUNT) * 100;

  useEffect(() => {
    try {
      const rawSavedCases = window.localStorage.getItem(STORAGE_KEY);
      if (rawSavedCases) {
        const parsed: unknown = JSON.parse(rawSavedCases);
        if (Array.isArray(parsed)) {
          const validCases = parsed.filter(isSavedCase).slice(0, 5);
          setSavedCases(validCases);
          if (validCases.length !== parsed.length) {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(validCases));
          }
        } else {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      setNotice("LOCAL ARCHIVES UNAVAILABLE. THIS INVESTIGATION CAN STILL PROCEED.");
    }

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const sharedAnswers = decodeCaseCode(searchParams.get("case"));
      if (sharedAnswers) {
        setAnswers(sharedAnswers);
        setResult(buildResult(sharedAnswers));
        setNotice("SHARED CASE FILE LOADED. THE DEPARTMENT HAS A COPY.");
      }

      const challengeAnswers = decodeCaseCode(searchParams.get("challenge"));
      if (challengeAnswers) {
        const challenger = buildResult(challengeAnswers);
        setChallengeMessage(challenger.profile.title + " HAS NOMINATED YOU. SUBMIT YOUR OWN CASE TO THE DEPARTMENT.");
      }
    } catch {
      setNotice("THE SHARED CASE FILE COULD NOT BE READ. START A NEW INVESTIGATION.");
    }

    setStorageReady(true);
  }, []);

  function choose(answerIndex: number) {
    const next = [...answers.slice(0, current), answerIndex];
    setAnswers(next);
    setNotice("");

    if (current === AUDIT_QUESTION_COUNT - 1) {
      setResult(buildResult(next));
      recordPassportActivity("audit");
    } else {
      setCurrent(current + 1);
    }
  }

  function restart() {
    setAnswers([]);
    setCurrent(0);
    setResult(null);
    setNotice("");

    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("case");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    } catch {
      // The questionnaire can restart even when browser history is unavailable.
    }
  }

  function loadSavedCase(record: SavedCase) {
    if (!isValidAnswers(record.answers)) return;
    setAnswers(record.answers);
    setResult(buildResult(record.answers));
    setCurrent(AUDIT_QUESTION_COUNT);
    setNotice("SAVED CASE RESTORED FROM THIS DEVICE.");
  }

  function saveCase() {
    if (!result) return;
    const record: SavedCase = {
      version: AUDIT_VERSION,
      answers: result.answers,
      savedAt: new Date().toISOString(),
    };

    try {
      const nextArchive = [
        record,
        ...savedCases.filter((entry) => entry.answers.join("") !== record.answers.join("")),
      ].slice(0, 5);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextArchive));
      setSavedCases(nextArchive);
      setNotice("CASE FILE SAVED LOCALLY. THE ARCHIVE HOLDS UP TO FIVE CASES.");
    } catch {
      setNotice("LOCAL STORAGE IS UNAVAILABLE. YOUR REPORT IS STILL OPEN.");
    }
  }

  function clearSavedCase(record: SavedCase) {
    try {
      const nextArchive = savedCases.filter((entry) => entry.answers.join("") !== record.answers.join(""));
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextArchive));
      setSavedCases(nextArchive);
      setNotice("CASE FILE DELETED FROM THIS DEVICE.");
    } catch {
      setNotice("THE DEPARTMENT COULD NOT ACCESS LOCAL STORAGE.");
    }
  }

  async function copyReport() {
    if (!result) return;
    const reportUrl = makeShareUrl(result.answers);
    const text = [
      "THE DYOR DEPARTMENT — OFFICIAL CASE FILE",
      "CASE No. " + result.caseNumber,
      "PRIMARY PATTERN: " + result.profile.title,
      "SECONDARY PATTERN: " + result.secondaryProfile.title,
      result.profile.subtitle,
      "RESEARCH EFFORT: " + result.research + "/100",
      "COPE INDEX: " + result.cope + "/100",
      "CROWD DEPENDENCY: " + result.crowd + "/100",
      "DEPARTMENTAL FINDING: " + result.finding,
      result.profile.roast,
      "This is a fictional entertainment result. It is not an assessment of investment skill or financial performance.",
      "PUBLIC CASE FILE: " + reportUrl,
      "CHALLENGE A FRIEND: " + makeChallengeUrl(result.answers),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setNotice("CASE FILE AND SHARE LINK COPIED.");
    } catch {
      setNotice("CLIPBOARD UNAVAILABLE. TRY THE DOWNLOAD OR POST TO X.");
    }
  }

  async function downloadCard() {
    if (!result) return;

    let objectUrl = "";
    try {
      const svg = makeCardSvg(result, makeShareUrl(result.answers));
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
          setNotice("CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
          return;
        }

        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(objectUrl);
        canvas.toBlob((png) => {
          if (!png) {
            setNotice("CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
            return;
          }

          const downloadUrl = URL.createObjectURL(png);
          const anchor = document.createElement("a");
          anchor.href = downloadUrl;
          anchor.download = "dyor-department-case-" + result.caseNumber + ".png";
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
          setNotice("YOUR OFFICIAL CASE CARD HAS BEEN ISSUED.");
        }, "image/png");
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setNotice("CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
      };
      image.src = objectUrl;
    } catch {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setNotice("CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
    }
  }

  async function shareReport() {
    if (!result) return;
    const reportUrl = makeShareUrl(result.answers);
    const text = [
      "I have been audited by THE DYOR DEPARTMENT.",
      "Classification: " + result.profile.title,
      "Research: " + result.research + "/100 | Cope: " + result.cope + "/100 | Crowd dependency: " + result.crowd + "/100.",
      result.profile.roast,
    ].join(" ");

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My DYOR Department case file",
          text,
          url: reportUrl,
        });
      } catch {
        setNotice("SHARE CANCELLED. YOUR CASE REMAINS OPEN.");
      }
    } else {
      await copyReport();
    }
  }

  if (result) {
    const reportUrl = makeShareUrl(result.answers);
    const xText = [
      "I have been audited by THE DYOR DEPARTMENT.",
      "Classification: " + result.profile.title + ".",
      "Research: " + result.research + "/100. Cope: " + result.cope + "/100. Crowd dependency: " + result.crowd + "/100.",
      makeXSafeRoast(result.profile.roast),
    ].join(" ");
    const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(reportUrl);
    const challengeText = [
      "THE DYOR DEPARTMENT has issued my case file.",
      "I got classified as " + result.profile.title + ".",
      "Your turn. Find out which degen archetype you are.",
    ].join(" ");
    const challengeIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(challengeText) + "&url=" + encodeURIComponent(makeChallengeUrl(result.answers));

    return (
      <section className="audit-workspace audit-result" aria-live="polite">
        <div className="audit-workspace__header">
          <span>INVESTIGATION COMPLETE</span>
          <span className="status-pill status-pill--red">● ENTERTAINMENT FILE</span>
        </div>
        {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}
        <div className="result-stamp">OFFICIAL<br />FINDING</div>
        <p className="eyebrow">CASE No. {result.caseNumber} / FINAL DETERMINATION</p>
        <h2>{result.profile.title}</h2>
        <p className="result-subtitle">{result.profile.subtitle}</p>

        <div className="result-finding">
          <span>DEPARTMENTAL FINDING</span>
          <strong>{result.finding}</strong>
          <small>{result.disposition}</small>
        </div>

        <div className="result-metrics result-metrics--three">
          <div>
            <span>RESEARCH EFFORT</span>
            <strong>{result.research}<small>/100</small></strong>
            <i>HOW MUCH HOMEWORK YOU CLAIMED</i>
          </div>
          <div>
            <span>COPE INDEX</span>
            <strong className="red-text">{result.cope}<small>/100</small></strong>
            <i>HOW HARD YOU ARE HOLDING ON</i>
          </div>
          <div>
            <span>CROWD DEPENDENCY</span>
            <strong className="crowd-score">{result.crowd}<small>/100</small></strong>
            <i>HOW MUCH THE CHAT DECIDES</i>
          </div>
        </div>

        <div className="result-secondary">
          <span>SECONDARY PATTERN DETECTED</span>
          <strong>{result.secondaryProfile.title}</strong>
          <small>{result.secondaryProfile.subtitle}</small>
        </div>

        <div className="result-roast">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <p>“{result.profile.roast}”</p>
        </div>

        <div className="result-verdict">
          <span>FINAL NOTICE</span>
          <strong>YOUR RESEARCH HAS BEEN ACKNOWLEDGED.<br />YOUR LOSSES REMAIN YOURS.</strong>
        </div>

        <p className="result-disclaimer">
          These scores and classifications are fictional, deterministic entertainment based only on your answers. They do not measure investment skill, actual risk or financial performance.
        </p>

        <div className="result-actions result-actions--expanded">
          <button className="button button--primary" onClick={downloadCard} type="button">DOWNLOAD CASE CARD <span>↓</span></button>
          <button className="button button--outline" onClick={shareReport} type="button">SHARE CASE <span>↗</span></button>
          <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">POST CASE TO X <span>↗</span></a>
          <a className="button button--challenge" href={challengeIntent} target="_blank" rel="noopener noreferrer">CHALLENGE A DEGEN <span>↗</span></a>
          <button className="button button--quiet" onClick={copyReport} type="button">COPY REPORT + LINK</button>
          <button className="button button--quiet" onClick={saveCase} type="button">SAVE TO THIS DEVICE ↓</button>
          <button className="button button--quiet" onClick={restart} type="button">REOPEN INVESTIGATION ↺</button>
        </div>
        {notice && <p className="audit-notice" role="status">{notice}</p>}
        <DepartmentNextSteps currentDepartment="audit" />
      </section>
    );
  }

  const question = questions[current];

  return (
    <section className="audit-workspace" aria-label="DYOR audit questionnaire">
      <div className="audit-workspace__header">
        <span>INVESTIGATION IN PROGRESS</span>
        <span className="status-pill"><i /> YOUR CASE IS OPEN</span>
      </div>
      {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

      {storageReady && savedCases.length > 0 && (
        <div className="audit-saved-case">
          <div className="audit-saved-case__heading">
            <span>LOCAL ARCHIVES / {savedCases.length} {savedCases.length === 1 ? "FILE" : "FILES"} FOUND</span>
            <small>STORED ONLY ON THIS DEVICE</small>
          </div>
          <div className="audit-archive-list">
            {savedCases.map((record) => {
              const archivedResult = buildResult(record.answers);
              return (
                <div className="audit-archive-row" key={record.answers.join("")}>
                  <div>
                    <strong>CASE No. {archivedResult.caseNumber}</strong>
                    <small>{new Date(record.savedAt).toLocaleString()}</small>
                  </div>
                  <div className="audit-saved-case__actions">
                    <button type="button" onClick={() => loadSavedCase(record)}>OPEN ↗</button>
                    <button type="button" onClick={() => clearSavedCase(record)} aria-label={"Delete case " + archivedResult.caseNumber}>DELETE</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div
        className="audit-progress"
        role="progressbar"
        aria-label="Audit completion"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div style={{ width: progress + "%" }} />
      </div>
      <div className="audit-progress__meta">
        <span>QUESTION {String(current + 1).padStart(2, "0")} / {String(AUDIT_QUESTION_COUNT).padStart(2, "0")}</span>
        <span>{Math.round(progress)}% COMPLETE</span>
      </div>

      <div className="question-block" aria-labelledby="current-question-title">
        <div className="question-block__number">INTERROGATION // {String(current + 1).padStart(2, "0")}</div>
        <h2 id="current-question-title" aria-live="polite" aria-atomic="true">{question.prompt}</h2>
        <p>{question.note}</p>
        <div className="answer-list" role="group" aria-labelledby="current-question-title">
          {question.options.map((option, index) => (
            <button className="answer-option" key={option.label} onClick={() => choose(index)} type="button">
              <span className="answer-option__key">{String.fromCharCode(65 + index)}</span>
              <span>{option.label}</span>
              <b aria-hidden="true">↗</b>
            </button>
          ))}
        </div>
      </div>

      <div className="audit-workspace__footer">
        <span>YOUR ANSWERS STAY IN THIS SESSION UNLESS YOU SAVE THE CASE LOCALLY.</span>
        {current > 0 && (
          <button type="button" onClick={() => { setCurrent(current - 1); setAnswers(answers.slice(0, -1)); }}>
            ← PREVIOUS QUESTION
          </button>
        )}
      </div>
    </section>
  );
}
