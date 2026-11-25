"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DepartmentCrossRead from "../components/department-cross-read";
import DepartmentPublicShare from "../components/department-public-share";
import PassportResultReceipt from "../components/passport-result-receipt";
import { buildDepartmentShareText } from "../lib/department-share-copy";
import { recordPassportActivity } from "../passport/passport-store";
import {
  BRIDGE_QUESTIONS,
  bridgeQuestions,
  buildBridgeResult,
  decodeBridgeCode,
  encodeBridgeCode,
  inspectBridgeProgress,
  type BridgeResult,
} from "./bridge-engine";

function casePath(answers: number[]) {
  return "/bridge-incident-office/case/" + encodeURIComponent(encodeBridgeCode(answers));
}

function challengePath(answers: number[]) {
  return "/bridge-incident-office?challenge=" + encodeURIComponent(encodeBridgeCode(answers));
}

function ResultPanel({ result, restart }: { result: BridgeResult; restart: () => void }) {
  const currentCasePath = casePath(result.answers);
  const challengeUrl = challengePath(result.answers);
  const xText = buildDepartmentShareText({
    opening: "THE BRIDGE INCIDENT OFFICE filed my fictional transfer case.",
    finding: "Classification: " + result.profile.title + ".",
    evidence: "Receipts: " + result.receiptQuality + "/100. Route literacy: " + result.routeLiteracy + "/100. Patience: " + result.patienceDiscipline + "/100.",
    punchline: result.profile.roast,
    invitation: "File your own interchain incident report.",
  });

  return (
    <section className="utility-panel utility-result bridge-result" aria-live="polite">
      <div className="utility-panel__header">
        <span>INCIDENT INTERVIEW COMPLETE / 07 OF 07</span>
        <span className="utility-status utility-status--closed"><i /> FILED</span>
      </div>
      <p className="eyebrow">CASE No. {result.caseNumber} / FINAL DETERMINATION</p>
      <h2>{result.profile.title}</h2>
      <p className="utility-result__subtitle">{result.profile.subtitle}</p>

      <div className="utility-finding bridge-finding">
        <span>DEPARTMENTAL FINDING / NOT A TRANSFER STATUS REPORT</span>
        <strong>{result.finding}</strong>
        <small>{result.profile.disposition}</small>
      </div>

      <div className="utility-metrics bridge-metrics">
        <div><span>RECEIPT QUALITY</span><strong>{result.receiptQuality}<small>/100</small></strong><i>YOUR DOCUMENTATION HABITS</i></div>
        <div><span>ROUTE LITERACY</span><strong className="utility-fog">{result.routeLiteracy}<small>/100</small></strong><i>YOUR SELECTED ANSWERS</i></div>
        <div><span>PATIENCE DISCIPLINE</span><strong className="utility-token">{result.patienceDiscipline}<small>/100</small></strong><i>YOUR STATUS ASSUMPTIONS</i></div>
      </div>

      <DepartmentCrossRead read={result.crossRead} />

      <div className="utility-secondary bridge-secondary">
        <span>SECONDARY PATTERN DETECTED</span>
        <strong>{result.secondaryProfile.title}</strong>
        <small>{result.secondaryProfile.subtitle}</small>
      </div>

      <div className="utility-roast bridge-roast">
        <span>THE DEPARTMENT HAS A COMMENT</span>
        <p>“{result.profile.roast}”</p>
      </div>

      <div className="utility-history bridge-history">
        <div className="utility-history__heading"><span>INCIDENT INTERVIEW RECORD</span><span>7 ANSWERS RECORDED</span></div>
        {result.history.map((item, index) => (
          <div className="utility-history__row" key={index}>
            <span>0{index + 1}</span>
            <div><strong>{item.question}</strong><small>{item.answer}</small></div>
            <b>{item.receiptQuality}/5</b>
          </div>
        ))}
      </div>

      <div className="utility-actions bridge-actions">
        <DepartmentPublicShare title="Bridge Incident Office case file" shareText={xText} casePath={currentCasePath} />
        <Link className="button button--x" href={challengeUrl}>CHALLENGE ANOTHER TRAVELLER <span>↗</span></Link>
        <Link className="button button--quiet" href={currentCasePath}>OPEN PUBLIC CASE FILE ↗</Link>
        <button className="button button--quiet" type="button" onClick={restart}>FILE ANOTHER INCIDENT ↺</button>
      </div>
      <PassportResultReceipt activity="bridge" />
      <p className="utility-disclaimer">This fictional profile is calculated only from selected answers. It does not check wallets, transactions, networks, bridges, messages, route providers, transfer states, refunds or support tickets. No real transfer is represented.</p>
    </section>
  );
}

export default function BridgeIncidentClient() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<BridgeResult | null>(null);
  const [challengeMessage, setChallengeMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const challenge = params.get("challenge");
    if (!challenge) return;
    const challengedAnswers = decodeBridgeCode(challenge);
    if (!challengedAnswers) {
      setChallengeMessage("A CHALLENGE FILE ARRIVED WITH AN UNRECOGNIZED REFERENCE. THE INTERVIEW STARTS FROM A CLEAN RECORD.");
      return;
    }
    const challengedResult = buildBridgeResult(challengedAnswers);
    setChallengeMessage("CHALLENGE RECEIVED / THE OTHER APPLICANT WAS CLASSIFIED AS " + challengedResult.profile.title + ". YOUR OWN FILE WILL BE BASED ONLY ON YOUR ANSWERS.");
  }, []);

  function restart() {
    setStarted(false);
    setCurrent(0);
    setAnswers([]);
    setResult(null);
  }

  function chooseAnswer(index: number) {
    const nextAnswers = [...answers];
    nextAnswers[current] = index;
    setAnswers(nextAnswers);
    if (current === BRIDGE_QUESTIONS - 1) {
      setResult(buildBridgeResult(nextAnswers));
      recordPassportActivity("bridge");
    } else {
      setCurrent(current + 1);
    }
  }

  if (result) return <ResultPanel result={result} restart={restart} />;

  if (!started) {
    return (
      <section className="utility-panel utility-briefing bridge-briefing">
        <div className="utility-panel__header">
          <span>FORM BIO-001 / INTERCHAIN INCIDENT INTAKE</span>
          <span className="utility-status"><i /> READY TO FILE</span>
        </div>
        {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}
        <div className="utility-briefing__body">
          <p className="eyebrow">BRIDGE INCIDENT OFFICE / INTERCHAIN TRANSFER REVIEW</p>
          <h2>SOURCE CONFIRMED.<br /><span>DESTINATION PENDING.</span><br />WHO HAS THE RECEIPT?</h2>
          <p className="utility-briefing__lead">Seven questions. Three departmental scores. One formal review of your route records, confirmation habits and increasingly creative support tickets.</p>
          <div className="utility-briefing__facts">
            <div><span>FORM TYPE</span><strong>SELF-REPORTED INCIDENT</strong></div>
            <div><span>INTERVIEW METHOD</span><strong>SEVEN MULTIPLE-CHOICE QUESTIONS</strong></div>
            <div><span>OUTCOME</span><strong>FICTIONAL TRANSFER DOSSIER</strong></div>
          </div>
          <div className="utility-briefing__warning bridge-warning">
            <span>IMPORTANT / THE FINE PRINT</span>
            <p>This is a satirical questionnaire, not a bridge tracker, transaction monitor or recovery service. It does not connect to wallets, inspect a transfer, query networks, estimate a refund or verify a destination balance. It only scores the answers you select. Never share private keys or seed phrases with anyone claiming to recover a transfer.</p>
          </div>
          <div className="utility-briefing__actions">
            <button className="button button--primary" type="button" onClick={() => setStarted(true)}>OPEN INCIDENT INTERVIEW <span>↗</span></button>
            <span>NO WALLET CONNECT. NO LIVE ROUTE CHECK. NO RECOVERY SERVICE.</span>
          </div>
        </div>
      </section>
    );
  }

  const question = bridgeQuestions[current];
  const selected = answers[current];
  const progress = inspectBridgeProgress(answers.slice(0, current));
  const progressPercent = Math.round((current / BRIDGE_QUESTIONS) * 100);

  return (
    <section className="utility-panel utility-game bridge-game" aria-label="Bridge Incident Office interview">
      <div className="utility-panel__header">
        <span>INCIDENT INTERVIEW / {String(current + 1).padStart(2, "0")} OF 07</span>
        <span className="utility-status"><i /> SELF-REPORTED FILE</span>
      </div>
      {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}
      <div className="utility-progress" role="progressbar" aria-label="Interview completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent}>
        <div style={{ width: progressPercent + "%" }} />
      </div>
      <div className="utility-progress__meta"><span>QUESTION {String(current + 1).padStart(2, "0")} / 07</span><span>{progressPercent}% COMPLETE</span></div>
      <div className="utility-live-scores bridge-live-scores">
        <div><span>RECEIPT QUALITY</span><strong>{progress.receiptQuality}</strong></div>
        <div><span>ROUTE LITERACY</span><strong>{progress.routeLiteracy}</strong></div>
        <div><span>PATIENCE</span><strong>{progress.patienceDiscipline}</strong></div>
      </div>
      <div className="utility-question">
        <div className="utility-question__number">INTERCHAIN REVIEW // {String(current + 1).padStart(2, "0")}</div>
        <h2 id="bridge-current-question" aria-live="polite" aria-atomic="true">{question.prompt}</h2>
        <p>{question.note}</p>
        <div className="utility-answer-list" role="group" aria-labelledby="bridge-current-question">
          {question.options.map((option, index) => (
            <button
              className={"utility-answer" + (selected === index ? " is-selected" : "")}
              aria-pressed={selected === index}
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
        <span>THE DEPARTMENT HAS NOT QUERIED A SINGLE WALLET OR BRIDGE.</span>
        <div>
          {current > 0 && <button type="button" onClick={() => setCurrent(current - 1)}>← PREVIOUS</button>}
          <button type="button" onClick={restart}>CLOSE FILE ↺</button>
        </div>
      </div>
    </section>
  );
}
