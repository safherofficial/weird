"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DepartmentCrossRead from "../components/department-cross-read";
import DepartmentPublicShare from "../components/department-public-share";
import PassportResultReceipt from "../components/passport-result-receipt";
import { buildDepartmentShareText } from "../lib/department-share-copy";
import { recordPassportActivity } from "../passport/passport-store";
import {
  GOVERNANCE_QUESTIONS,
  governanceQuestions,
  buildGovernanceResult,
  decodeGovernanceCode,
  encodeGovernanceCode,
  inspectGovernanceProgress,
  type GovernanceResult,
} from "./governance-engine";

function casePath(answers: number[]) {
  return "/governance-office/case/" + encodeURIComponent(encodeGovernanceCode(answers));
}

function challengePath(answers: number[]) {
  return "/governance-office?challenge=" + encodeURIComponent(encodeGovernanceCode(answers));
}

function ResultPanel({ result, restart }: { result: GovernanceResult; restart: () => void }) {
  const currentCasePath = casePath(result.answers);
  const challengeUrl = challengePath(result.answers);
  const xText = buildDepartmentShareText({
    opening: "THE GOVERNANCE ACCOUNTABILITY OFFICE filed my fictional quorum case.",
    finding: "Classification: " + result.profile.title + ".",
    evidence: "Proposal clarity: " + result.proposalClarity + "/100. Voting discipline: " + result.votingDiscipline + "/100. Execution awareness: " + result.executionAwareness + "/100.",
    punchline: result.profile.roast,
    invitation: "File your own quorum review.",
  });

  return (
    <section className="utility-panel utility-result governance-result" aria-live="polite">
      <div className="utility-panel__header">
        <span>GOVERNANCE INTERVIEW COMPLETE / 07 OF 07</span>
        <span className="utility-status utility-status--closed"><i /> FILED</span>
      </div>
      <p className="eyebrow">CASE No. {result.caseNumber} / FINAL DETERMINATION</p>
      <h2>{result.profile.title}</h2>
      <p className="utility-result__subtitle">{result.profile.subtitle}</p>
      <div className="utility-finding governance-finding">
        <span>DEPARTMENTAL FINDING / NOT A GOVERNANCE OR VOTE STATUS REPORT</span>
        <strong>{result.finding}</strong>
        <small>{result.profile.disposition}</small>
      </div>
      <div className="utility-metrics governance-metrics">
        <div><span>PROPOSAL CLARITY</span><strong>{result.proposalClarity}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
        <div><span>VOTING DISCIPLINE</span><strong className="utility-fog">{result.votingDiscipline}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
        <div><span>EXECUTION AWARENESS</span><strong className="utility-token">{result.executionAwareness}<small>/100</small></strong><i>SELECTED ANSWERS ONLY</i></div>
      </div>
      <DepartmentCrossRead read={result.crossRead} />
      <div className="utility-secondary governance-secondary">
        <span>SECONDARY PATTERN DETECTED</span>
        <strong>{result.secondaryProfile?.title ?? "NO SECONDARY PATTERN DETECTED"}</strong>
        <small>{result.secondaryProfile?.subtitle ?? "Your selected answers converged on one dominant review pattern."}</small>
      </div>
      <div className="utility-roast governance-roast">
        <span>THE DEPARTMENT HAS A COMMENT</span>
        <p>“{result.profile.roast}”</p>
      </div>
      <div className="utility-history governance-history">
        <div className="utility-history__heading"><span>GOVERNANCE INTERVIEW RECORD</span><span>7 ANSWERS RECORDED</span></div>
        {result.history.map((item, index) => (
          <div className="utility-history__row" key={index}>
            <span>0{index + 1}</span>
            <div><strong>{item.question}</strong><small>{item.answer}</small></div>
            <b>{item.proposalClarity}/5</b>
          </div>
        ))}
      </div>
      <div className="utility-actions governance-actions">
        <DepartmentPublicShare title="Governance Accountability Office case file" shareText={xText} casePath={currentCasePath} />
        <Link className="button button--x" href={challengeUrl}>CHALLENGE ANOTHER DELEGATE <span>↗</span></Link>
        <Link className="button button--quiet" href={currentCasePath}>OPEN PUBLIC CASE FILE ↗</Link>
        <button className="button button--quiet" type="button" onClick={restart}>FILE ANOTHER REVIEW ↺</button>
      </div>
      <PassportResultReceipt activity="governance" />
      <p className="utility-disclaimer">This fictional profile is calculated only from selected answers. It does not inspect a DAO, proposal, forum, wallet, vote, voting contract, voting power, snapshot, delegate identity, quorum, timelock or execution. Scores are fictional entertainment only.</p>
    </section>
  );
}

export default function GovernanceClient() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<GovernanceResult | null>(null);
  const [challengeMessage, setChallengeMessage] = useState("");

  useEffect(() => {
    const challenge = new URLSearchParams(window.location.search).get("challenge");
    if (!challenge) return;
    const challengedAnswers = decodeGovernanceCode(challenge);
    if (!challengedAnswers) {
      setChallengeMessage("A CHALLENGE FILE ARRIVED WITH AN UNRECOGNIZED REFERENCE. THE INTERVIEW STARTS FROM A CLEAN RECORD.");
      return;
    }
    const challengedResult = buildGovernanceResult(challengedAnswers);
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
    if (current === GOVERNANCE_QUESTIONS - 1) {
      setResult(buildGovernanceResult(nextAnswers));
      recordPassportActivity("governance");
    } else {
      setCurrent(current + 1);
    }
  }

  if (result) return <ResultPanel result={result} restart={restart} />;

  if (!started) {
    return (
      <section className="utility-panel utility-briefing governance-briefing">
        <div className="utility-panel__header">
          <span>FORM GAO-001 / GOVERNANCE REVIEW INTAKE</span>
          <span className="utility-status"><i /> READY TO FILE</span>
        </div>
        {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}
        <div className="utility-briefing__body">
          <p className="eyebrow">GOVERNANCE ACCOUNTABILITY OFFICE / THE QUORUM TRIBUNAL</p>
          <h2>A VOTE IS NOT<br /><span>AN EXECUTED DECISION.</span><br />SHOW US THE RULES.</h2>
          <p className="utility-briefing__lead">Seven questions. Three departmental scores. One formal review of proposal scope, voting eligibility, quorum calculations and the authority responsible for execution.</p>
          <div className="utility-briefing__facts">
            <div><span>FORM TYPE</span><strong>SELF-REPORTED GOVERNANCE REVIEW</strong></div>
            <div><span>INTERVIEW METHOD</span><strong>SEVEN MULTIPLE-CHOICE QUESTIONS</strong></div>
            <div><span>OUTCOME</span><strong>FICTIONAL QUORUM DOSSIER</strong></div>
          </div>
          <div className="utility-briefing__warning governance-warning">
            <span>IMPORTANT / THE FINE PRINT</span>
            <p>This is a satirical questionnaire, not a DAO auditor, voting monitor or governance service. It does not connect to wallets, inspect a proposal, query a vote, check voting power, verify a snapshot, calculate a live quorum or confirm execution. It only scores the answers you select.</p>
          </div>
          <div className="utility-briefing__actions">
            <button className="button button--primary" type="button" onClick={() => setStarted(true)}>OPEN GOVERNANCE INTERVIEW <span>↗</span></button>
            <span>NO WALLET CONNECT. NO LIVE VOTE CHECK. NO EXECUTION MONITOR.</span>
          </div>
        </div>
      </section>
    );
  }

  const question = governanceQuestions[current];
  const selected = answers[current];
  const progress = inspectGovernanceProgress(answers.slice(0, current));
  const progressPercent = Math.round((current / GOVERNANCE_QUESTIONS) * 100);

  return (
    <section className="utility-panel utility-game governance-game" aria-label="Governance Accountability Office interview">
      <div className="utility-panel__header">
        <span>GOVERNANCE INTERVIEW / {String(current + 1).padStart(2, "0")} OF 07</span>
        <span className="utility-status"><i /> SELF-REPORTED FILE</span>
      </div>
      {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}
      <div className="utility-progress" role="progressbar" aria-label="Interview completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progressPercent}>
        <div style={{ width: progressPercent + "%" }} />
      </div>
      <div className="utility-progress__meta"><span>QUESTION {String(current + 1).padStart(2, "0")} / 07</span><span>{progressPercent}% COMPLETE</span></div>
      <div className="utility-live-scores governance-live-scores">
        <div><span>PROPOSAL CLARITY</span><strong>{progress.proposalClarity}</strong></div>
        <div><span>VOTING DISCIPLINE</span><strong>{progress.votingDiscipline}</strong></div>
        <div><span>EXECUTION AWARENESS</span><strong>{progress.executionAwareness}</strong></div>
      </div>
      <div className="utility-question">
        <div className="utility-question__number">QUORUM REVIEW // {String(current + 1).padStart(2, "0")}</div>
        <h2 id="governance-current-question" aria-live="polite" aria-atomic="true">{question.prompt}</h2>
        <p>{question.note}</p>
        <div className="utility-answer-list" role="group" aria-labelledby="governance-current-question">
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
        <span>THE DEPARTMENT HAS NOT QUERIED A DAO, WALLET OR VOTE.</span>
        <div>
          {current > 0 && <button type="button" onClick={() => setCurrent(current - 1)}>← PREVIOUS</button>}
          <button type="button" onClick={restart}>CLOSE FILE ↺</button>
        </div>
      </div>
    </section>
  );
}
