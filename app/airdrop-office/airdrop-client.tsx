"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DepartmentCrossRead from "../components/department-cross-read";
import DepartmentPublicShare from "../components/department-public-share";
import PassportResultReceipt from "../components/passport-result-receipt";
import { buildDepartmentShareText } from "../lib/department-share-copy";
import { recordPassportActivity } from "../passport/passport-store";
import {
  AIRDROP_QUESTIONS,
  airdropQuestions,
  buildAirdropResult,
  decodeAirdropCode,
  encodeAirdropCode,
  inspectAirdropProgress,
  type AirdropResult,
} from "./airdrop-engine";

function casePath(answers: number[]) {
  return "/airdrop-office/case/" + encodeURIComponent(encodeAirdropCode(answers));
}

function challengePath(answers: number[]) {
  return "/airdrop-office?challenge=" + encodeURIComponent(encodeAirdropCode(answers));
}

function ResultPanel({ result, restart }: { result: AirdropResult; restart: () => void }) {
  const currentCasePath = casePath(result.answers);
  const challengeUrl = challengePath(result.answers);
  const xText = buildDepartmentShareText({
    opening: "THE AIRDROP ENTITLEMENT OFFICE filed my fictional snapshot case.",
    finding: "Classification: " + result.profile.title + ".",
    evidence: "Receipts: " + result.receipts + "/100. Rule awareness: " + result.ruleAwareness + "/100. Expectation control: " + result.expectationControl + "/100.",
    punchline: result.profile.roast,
    invitation: "File your own eligibility paperwork.",
  });

  return (
    <section className="utility-panel utility-result airdrop-result" aria-live="polite">
      <div className="utility-panel__header">
        <span>ENTITLEMENT INTERVIEW COMPLETE / 07 OF 07</span>
        <span className="utility-status utility-status--closed"><i /> FILED</span>
      </div>
      <p className="eyebrow">CASE No. {result.caseNumber} / FINAL DETERMINATION</p>
      <h2>{result.profile.title}</h2>
      <p className="utility-result__subtitle">{result.profile.subtitle}</p>

      <div className="utility-finding airdrop-finding">
        <span>DEPARTMENTAL FINDING / NOT AN ELIGIBILITY DECISION</span>
        <strong>{result.finding}</strong>
        <small>{result.profile.disposition}</small>
      </div>

      <div className="utility-metrics airdrop-metrics">
        <div><span>RECEIPT QUALITY</span><strong>{result.receipts}<small>/100</small></strong><i>YOUR DOCUMENTATION HABITS</i></div>
        <div><span>RULE AWARENESS</span><strong className="utility-fog">{result.ruleAwareness}<small>/100</small></strong><i>YOUR SELECTED ANSWERS</i></div>
        <div><span>EXPECTATION CONTROL</span><strong className="utility-token">{result.expectationControl}<small>/100</small></strong><i>YOUR REWARD ASSUMPTIONS</i></div>
      </div>

      <DepartmentCrossRead read={result.crossRead} />

      <div className="utility-secondary airdrop-secondary">
        <span>SECONDARY PATTERN DETECTED</span>
        <strong>{result.secondaryProfile.title}</strong>
        <small>{result.secondaryProfile.subtitle}</small>
      </div>

      <div className="utility-roast airdrop-roast">
        <span>THE DEPARTMENT HAS A COMMENT</span>
        <p>“{result.profile.roast}”</p>
      </div>

      <div className="utility-history airdrop-history">
        <div className="utility-history__heading"><span>INTERVIEW RECORD</span><span>7 ANSWERS RECORDED</span></div>
        {result.history.map((item, index) => (
          <div className="utility-history__row" key={index}>
            <span>0{index + 1}</span>
            <div><strong>{item.question}</strong><small>{item.answer}</small></div>
            <b>{item.receipts}/5</b>
          </div>
        ))}
      </div>

      <div className="utility-actions airdrop-actions">
        <DepartmentPublicShare title="Airdrop Entitlement Office case file" shareText={xText} casePath={currentCasePath} />
        <Link className="button button--x" href={challengeUrl}>CHALLENGE ANOTHER FARMER <span>↗</span></Link>
        <Link className="button button--quiet" href={currentCasePath}>OPEN PUBLIC CASE FILE ↗</Link>
        <button className="button button--quiet" type="button" onClick={restart}>FILE ANOTHER CASE ↺</button>
      </div>
      <PassportResultReceipt activity="airdrop" />
      <p className="utility-disclaimer">This fictional profile is calculated only from selected answers. It does not check wallet activity, programme rules, points, snapshots, eligibility, allocation or claim availability. No real airdrop is represented.</p>
    </section>
  );
}

export default function AirdropClient() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<AirdropResult | null>(null);
  const [challengeMessage, setChallengeMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const challenge = params.get("challenge");
    if (!challenge) return;
    const challengedAnswers = decodeAirdropCode(challenge);
    if (!challengedAnswers) {
      setChallengeMessage("A CHALLENGE FILE ARRIVED WITH AN UNRECOGNIZED REFERENCE. THE INTERVIEW STARTS FROM A CLEAN RECORD.");
      return;
    }
    const challengedResult = buildAirdropResult(challengedAnswers);
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
    if (current === AIRDROP_QUESTIONS - 1) {
      setResult(buildAirdropResult(nextAnswers));
      recordPassportActivity("airdrop");
    } else {
      setCurrent(current + 1);
    }
  }

  if (result) return <ResultPanel result={result} restart={restart} />;

  if (!started) {
    return (
      <section className="utility-panel utility-briefing airdrop-briefing">
        <div className="utility-panel__header">
          <span>FORM AEO-001 / SNAPSHOT &amp; ELIGIBILITY INTAKE</span>
          <span className="utility-status"><i /> READY TO FILE</span>
        </div>
        {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}
        <div className="utility-briefing__body">
          <p className="eyebrow">AIRDROP ENTITLEMENT OFFICE / SNAPSHOT TRIBUNAL</p>
          <h2>POINTS WERE<br /><span>COUNTED.</span><br />WERE THE RULES?</h2>
          <p className="utility-briefing__lead">Seven questions. Three departmental scores. One formal review of your receipts, snapshot assumptions and reward expectations.</p>
          <div className="utility-briefing__facts">
            <div><span>FORM TYPE</span><strong>SELF-REPORTED ACTIVITY</strong></div>
            <div><span>INTERVIEW METHOD</span><strong>SEVEN MULTIPLE-CHOICE QUESTIONS</strong></div>
            <div><span>OUTCOME</span><strong>FICTIONAL ENTITLEMENT DOSSIER</strong></div>
          </div>
          <div className="utility-briefing__warning airdrop-warning">
            <span>IMPORTANT / THE FINE PRINT</span>
            <p>This is a satirical questionnaire, not an airdrop checker or eligibility tool. It does not connect to wallets, inspect transactions, read points dashboards, verify snapshots or estimate real allocations. It only scores the answers you select.</p>
          </div>
          <div className="utility-briefing__actions">
            <button className="button button--primary" type="button" onClick={() => setStarted(true)}>OPEN ENTITLEMENT INTERVIEW <span>↗</span></button>
            <span>NO WALLET CONNECT. NO REAL SNAPSHOT CHECK. NO CLAIM LINK.</span>
          </div>
        </div>
      </section>
    );
  }

  const question = airdropQuestions[current];
  const selected = answers[current];
  const progress = inspectAirdropProgress(answers.slice(0, current));
  const progressPercent = Math.round((current / AIRDROP_QUESTIONS) * 100);

  return (
    <section className="utility-panel utility-game airdrop-game" aria-label="Airdrop Entitlement Office interview">
      <div className="utility-panel__header">
        <span>ENTITLEMENT INTERVIEW / {String(current + 1).padStart(2, "0")} OF 07</span>
        <span className="utility-status"><i /> SELF-REPORTED FILE</span>
      </div>
      {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}
      <div className="utility-progress" role="progressbar" aria-label="Interview completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent}>
        <div style={{ width: progressPercent + "%" }} />
      </div>
      <div className="utility-progress__meta"><span>QUESTION {String(current + 1).padStart(2, "0")} / 07</span><span>{progressPercent}% COMPLETE</span></div>
      <div className="utility-live-scores airdrop-live-scores">
        <div><span>RECEIPT QUALITY</span><strong>{progress.receipts}</strong></div>
        <div><span>RULE AWARENESS</span><strong>{progress.ruleAwareness}</strong></div>
        <div><span>EXPECTATION CONTROL</span><strong>{progress.expectationControl}</strong></div>
      </div>
      <div className="utility-question">
        <div className="utility-question__number">ENTITLEMENT REVIEW // {String(current + 1).padStart(2, "0")}</div>
        <h2 id="airdrop-current-question" aria-live="polite" aria-atomic="true">{question.prompt}</h2>
        <p>{question.note}</p>
        <div className="utility-answer-list" role="group" aria-labelledby="airdrop-current-question">
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
        <span>THE DEPARTMENT HAS NOT VERIFIED A SINGLE WALLET OR PROGRAMME RULE.</span>
        <div>
          {current > 0 && <button type="button" onClick={() => setCurrent(current - 1)}>← PREVIOUS</button>}
          <button type="button" onClick={restart}>CLOSE FILE ↺</button>
        </div>
      </div>
    </section>
  );
}
