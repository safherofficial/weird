"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DepartmentNextSteps from "../components/department-next-steps";
import DepartmentCrossRead from "../components/department-cross-read";
import { recordPassportActivity } from "../passport/passport-store";
import {
  buildPersonalCopeResult,
  decodeCopeCode,
  encodeCopeCode,
  questions,
  type DailyCopeIndex,
  type PersonalCopeResult,
} from "./cope-engine";

type CopeIndexClientProps = {
  dailyIndex: DailyCopeIndex;
};

function makeCaseUrl(answers: number[]) {
  if (typeof window === "undefined") return "/cope-index";
  return window.location.origin + "/cope-index/case/" + encodeURIComponent(encodeCopeCode(answers));
}

function makeChallengeUrl(answers: number[]) {
  if (typeof window === "undefined") return "/cope-index";
  return window.location.origin + "/cope-index?challenge=" + encodeURIComponent(encodeCopeCode(answers));
}

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&apos;",
  })[char] ?? char);
}

function makePersonalCard(result: PersonalCopeResult) {
  const title = escapeXml(result.profile.title);
  const motto = escapeXml(result.profile.subtitle);
  const number = escapeXml(result.caseNumber);
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">' +
    '<rect width="1200" height="675" fill="#090b09"/>' +
    '<rect x="28" y="28" width="1144" height="619" fill="#101610" stroke="#52633f" stroke-width="2"/>' +
    '<path d="M28 112H1172M28 558H1172" stroke="#34412f"/>' +
    '<text x="64" y="76" fill="#b6ff65" font-family="monospace" font-size="25" font-weight="bold">THE DYOR DEPARTMENT</text>' +
    '<text x="1136" y="76" text-anchor="end" fill="#899486" font-family="monospace" font-size="14">COPIUM ADMINISTRATION / PERSONAL TRENCHES READING</text>' +
    '<text x="64" y="158" fill="#879481" font-family="monospace" font-size="15" letter-spacing="2">PERSONAL CASE No. ' + number + '</text>' +
    '<text x="64" y="242" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="49" font-weight="900">' + title + '</text>' +
    '<text x="64" y="290" fill="#b6ff65" font-family="monospace" font-size="18">' + motto + '</text>' +
    '<rect x="64" y="337" width="330" height="121" fill="#151e12" stroke="#46573a"/>' +
    '<rect x="430" y="337" width="330" height="121" fill="#151e12" stroke="#46573a"/>' +
    '<rect x="796" y="337" width="340" height="121" fill="#151e12" stroke="#46573a"/>' +
    '<text x="86" y="375" fill="#8d9a83" font-family="monospace" font-size="13">COPE INDEX</text>' +
    '<text x="86" y="430" fill="#ff7777" font-family="monospace" font-size="36" font-weight="bold">' + result.copeScore + '/100</text>' +
    '<text x="452" y="375" fill="#8d9a83" font-family="monospace" font-size="13">PATIENCE INDEX</text>' +
    '<text x="452" y="430" fill="#b6ff65" font-family="monospace" font-size="36" font-weight="bold">' + result.patienceScore + '/100</text>' +
    '<text x="818" y="375" fill="#8d9a83" font-family="monospace" font-size="13">CHAT DEPENDENCY</text>' +
    '<text x="818" y="430" fill="#c8b5ff" font-family="monospace" font-size="36" font-weight="bold">' + result.chatDependency + '/100</text>' +
    '<text x="64" y="514" fill="#e1e5dc" font-family="Arial,sans-serif" font-size="19">' + escapeXml(result.profile.roast) + '</text>' +
    '<text x="64" y="598" fill="#b6ff65" font-family="monospace" font-size="14" font-weight="bold">FICTIONAL SELF-REPORTED READING / NOT MARKET OR SENTIMENT DATA</text>' +
    '<text x="1136" y="598" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="12">ENTERTAINMENT ONLY</text>' +
    '</svg>'
  );
}

export default function CopeIndexClient({ dailyIndex }: CopeIndexClientProps) {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<PersonalCopeResult | null>(null);
  const [challengeMessage, setChallengeMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const code = new URLSearchParams(window.location.search).get("challenge");
      const nominatedAnswers = decodeCopeCode(code);
      if (nominatedAnswers) {
        const nominated = buildPersonalCopeResult(nominatedAnswers);
        setChallengeMessage(nominated.profile.title + " HAS NOMINATED YOU FOR A PERSONAL COPE READING.");
      }
    } catch {
      setNotice("THE DEPARTMENT COULD NOT READ THE NOMINATION. YOU MAY CALIBRATE A NEW FILE.");
    }
  }, []);

  const completedPercent = Math.round((current / questions.length) * 100);
  const question = questions[current];
  const currentAnswer = answers[current];

  function startCalibration() {
    setStarted(true);
    setNotice("");
  }

  function chooseAnswer(answerIndex: number) {
    const next = [...answers.slice(0, current), answerIndex];
    setAnswers(next);
    setNotice("");
    if (current === questions.length - 1) {
      setResult(buildPersonalCopeResult(next));
      recordPassportActivity("cope");
    } else {
      setCurrent(current + 1);
    }
  }

  function restart() {
    setStarted(false);
    setAnswers([]);
    setCurrent(0);
    setResult(null);
    setNotice("");
    setChallengeMessage("");
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("challenge");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    } catch {
      // A new calibration does not depend on browser history.
    }
  }

  async function copyReport() {
    if (!result) return;
    const caseUrl = makeCaseUrl(result.answers);
    const challengeUrl = makeChallengeUrl(result.answers);
    const text = [
      "THE DYOR DEPARTMENT — COPIUM ADMINISTRATION / PERSONAL TRENCHES READING",
      "CASE No. " + result.caseNumber,
      "CLASSIFICATION: " + result.profile.title,
      "COPE INDEX: " + result.copeScore + "/100",
      "PATIENCE INDEX: " + result.patienceScore + "/100",
      "CHAT DEPENDENCY: " + result.chatDependency + "/100",
      "BEHAVIOURAL CROSS-READ: " + result.crossRead.headline,
      result.crossRead.interpretation,
      ...result.crossRead.signals.map((signal) => signal.label + " / " + signal.answer + " / " + signal.detail),
      result.profile.roast,
      "This personal score is fictional and based only on selected answers. The daily Global Cope Index is a synthetic date-seeded joke, not a measure of real CT users, wallets, markets or sentiment.",
      "PUBLIC CASE FILE: " + caseUrl,
      "NOMINATE ANOTHER DEGEN: " + challengeUrl,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setNotice("PERSONAL READING AND CHALLENGE LINKS COPIED.");
    } catch {
      setNotice("CLIPBOARD UNAVAILABLE. DOWNLOAD YOUR PERSONAL COPE CARD.");
    }
  }

  function downloadCard() {
    if (!result) return;
    let objectUrl = "";
    try {
      const blob = new Blob([makePersonalCard(result)], { type: "image/svg+xml;charset=utf-8" });
      objectUrl = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 675;
        const context = canvas.getContext("2d");
        if (!context) {
          URL.revokeObjectURL(objectUrl);
          setNotice("COPE CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
          return;
        }
        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(objectUrl);
        canvas.toBlob((png) => {
          if (!png) {
            setNotice("COPE CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
            return;
          }
          const downloadUrl = URL.createObjectURL(png);
          const anchor = document.createElement("a");
          anchor.href = downloadUrl;
          anchor.download = "dyor-cope-reading-" + result.caseNumber + ".png";
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
          setNotice("YOUR FICTIONAL COPE CARD HAS BEEN ISSUED.");
        }, "image/png");
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setNotice("COPE CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
      };
      image.src = objectUrl;
    } catch {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setNotice("COPE CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
    }
  }

  async function shareReading() {
    if (!result) return;
    const caseUrl = makeCaseUrl(result.answers);
    const text = [
      "THE DYOR DEPARTMENT completed my fictional Solana Trenches cope reading.",
      result.profile.title + ".",
      "Cope: " + result.copeScore + "/100. Patience: " + result.patienceScore + "/100. Chat dependency: " + result.chatDependency + "/100.",
      "Cross-read: " + result.crossRead.headline + ".",
      "Cross-read: " + result.crossRead.headline + ".",
      result.profile.roast,
    ].join(" ");
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Solana Trenches cope reading", text, url: caseUrl });
      } catch {
        setNotice("SHARE CANCELLED. YOUR PERSONAL FILE REMAINS OPEN.");
      }
    } else {
      await copyReport();
    }
  }

  return (
    <div className="cope-index-content">
      <section className="cope-daily-board" aria-label="Synthetic daily Solana Trenches Cope Index">
        <div className="cope-daily-board__header">
          <span>DAILY TRENCHES READING / UTC {dailyIndex.issueDate}</span>
          <span>SIMULATED / NOT REAL-WORLD DATA</span>
        </div>
        <div className="cope-daily-board__hero">
          <div>
            <p className="eyebrow">COPIUM ADMINISTRATION / SYNTHETIC TRENCHES INDEX</p>
            <strong>{dailyIndex.overall}<small>/100</small></strong>
            <span>{dailyIndex.status}</span>
          </div>
          <div className="cope-daily-board__seal">NO LIVE FEED<br />NO REAL USERS<br />NO MARKET DATA</div>
        </div>
        <div className="cope-daily-board__bulletin">
          <span>OFFICIAL DAILY BULLETIN</span>
          <strong>{dailyIndex.bulletin}</strong>
        </div>
        <div className="cope-dimensions">
          {dailyIndex.dimensions.map((dimension) => (
            <div className="cope-dimension" key={dimension.id}>
              <div className="cope-dimension__top">
                <span>{dimension.label}</span>
                <strong>{dimension.value}<small>/100</small></strong>
              </div>
              <div className="cope-dimension__bar">
                <i style={{ width: dimension.value + "%" }} />
              </div>
              <p>{dimension.description}</p>
            </div>
          ))}
        </div>
        <div className="cope-daily-board__method">
          <strong>METHODOLOGY / PLEASE READ</strong>
          <p>{dailyIndex.methodology}</p>
        </div>
      </section>

      <section className="cope-calibration">
        <div className="cope-calibration__intro">
          <p className="eyebrow">PERSONAL CALIBRATION / VOLUNTARY</p>
          <h2>HOW MUCH COPE<br /><span>IS IN YOUR SYSTEM?</span></h2>
          <p>Answer five fictional questions to generate a personal reading. Your choices stay in this browser session unless you decide to share the resulting URL.</p>
        </div>

        {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

        {!started && !result && (
          <div className="cope-calibration__start">
            <div><span>INTAKE FORM</span><strong>5 QUESTIONS / 4 OPTIONS EACH</strong></div>
            <div><span>OUTPUT</span><strong>PERSONAL COPE DOSSIER</strong></div>
            <div><span>DATA COLLECTION</span><strong>NONE / ANSWERS STAY IN SESSION</strong></div>
            <button className="button button--primary" type="button" onClick={startCalibration}>START PERSONAL CALIBRATION <span>↗</span></button>
          </div>
        )}

        {started && !result && (
          <div className="cope-question-panel">
            <div className="cope-question-panel__header">
              <span>PERSONAL CALIBRATION / {String(current + 1).padStart(2, "0")} OF 05</span>
              <span>{completedPercent}% COMPLETE</span>
            </div>
            <div className="cope-progress" role="progressbar" aria-label="Personal calibration progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completedPercent}>
              <div style={{ width: completedPercent + "%" }} />
            </div>
            <div className="cope-question">
              <div className="cope-question__number">INTERROGATION // {String(current + 1).padStart(2, "0")}</div>
              <h3 id="cope-current-question" aria-live="polite" aria-atomic="true">{question.prompt}</h3>
              <p>{question.note}</p>
              <div className="cope-answer-list" role="group" aria-labelledby="cope-current-question">
                {question.options.map((option, index) => (
                  <button
                    key={option.label}
                    type="button"
                    className={"cope-answer" + (currentAnswer === index ? " is-selected" : "")}
                    aria-pressed={currentAnswer === index}
                    onClick={() => chooseAnswer(index)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    <strong>{option.label}</strong>
                    <b aria-hidden="true">↗</b>
                  </button>
                ))}
              </div>
            </div>
            <div className="cope-question-panel__footer">
              <span>THE DEPARTMENT DOES NOT RECEIVE YOUR ANSWERS.</span>
              <div>
                {current > 0 && <button type="button" onClick={() => setCurrent(current - 1)}>← PREVIOUS</button>}
                <button type="button" onClick={restart}>CLOSE FILE ↺</button>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="cope-personal-result">
            <div className="cope-personal-result__header">
              <span>PERSONAL READING COMPLETE / CASE No. {result.caseNumber}</span>
              <span>FICTIONAL SELF-REPORT</span>
            </div>
            <h3>{result.profile.title}</h3>
            <p className="cope-personal-result__subtitle">{result.profile.subtitle}</p>
            <div className="cope-personal-result__finding">
              <span>DEPARTMENTAL FINDING</span>
              <strong>{result.finding}</strong>
            </div>
            <div className="cope-personal-result__metrics">
              <div><span>COPE INDEX</span><strong>{result.copeScore}<small>/100</small></strong></div>
              <div><span>PATIENCE INDEX</span><strong>{result.patienceScore}<small>/100</small></strong></div>
              <div><span>CHAT DEPENDENCY</span><strong>{result.chatDependency}<small>/100</small></strong></div>
            </div>
            <DepartmentCrossRead read={result.crossRead} />

            <div className="cope-personal-result__roast">
              <span>THE DEPARTMENT HAS A COMMENT</span>
              <p>“{result.profile.roast}”</p>
              <small>SECONDARY PATTERN / {result.secondaryProfile.title}</small>
            </div>
            <p className="cope-personal-result__disclaimer">
              This personal reading is fictional and based only on five selected answers. It is not a measure of
              mental health, financial behaviour, investment skill, real market sentiment or trader performance.
            </p>
            <div className="cope-personal-result__actions">
              <button className="button button--primary" type="button" onClick={downloadCard}>DOWNLOAD COPE CARD <span>↓</span></button>
              <button className="button button--outline" type="button" onClick={shareReading}>SHARE READING <span>↗</span></button>
              <a className="button button--x" href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("THE DYOR DEPARTMENT classified me as " + result.profile.title + ". Cope: " + result.copeScore + "/100. Patience: " + result.patienceScore + "/100. Your turn.") + "&url=" + encodeURIComponent(makeCaseUrl(result.answers))} target="_blank" rel="noopener noreferrer">POST TO X <span>↗</span></a>
              <a className="button button--challenge" href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent("THE DYOR DEPARTMENT has issued my personal cope file. Your turn.") + "&url=" + encodeURIComponent(makeChallengeUrl(result.answers))} target="_blank" rel="noopener noreferrer">CHALLENGE A DEGEN <span>↗</span></a>
              <button className="button button--quiet" type="button" onClick={copyReport}>COPY REPORT + LINKS</button>
              <button className="button button--quiet" type="button" onClick={restart}>CALIBRATE AGAIN ↺</button>
            </div>
            <p className="cope-personal-result__public-link"><Link href={makeCaseUrl(result.answers)}>OPEN PUBLIC PERSONAL FILE ↗</Link></p>
            <DepartmentNextSteps currentDepartment="cope" />
          </div>
        )}

        {notice && <p className="audit-notice" role="status">{notice}</p>}
      </section>
    </div>
  );
}
