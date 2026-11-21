"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DepartmentNextSteps from "../components/department-next-steps";
import DepartmentCrossRead from "../components/department-cross-read";
import { recordPassportActivity } from "../passport/passport-store";
import {
  buildClubResult,
  decodeClubCode,
  encodeClubCode,
  inspectClubProgress,
  questions,
  type ClubResult,
} from "./club-engine";

function makeCaseUrl(answers: number[]) {
  if (typeof window === "undefined") return "/club";
  return window.location.origin + "/club/member/" + encodeURIComponent(encodeClubCode(answers));
}

function makeChallengeUrl(answers: number[]) {
  if (typeof window === "undefined") return "/club";
  return window.location.origin + "/club?challenge=" + encodeURIComponent(encodeClubCode(answers));
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

function makeMembershipSvg(result: ClubResult) {
  const title = escapeXml(result.profile.title);
  const motto = escapeXml(result.profile.motto);
  const member = escapeXml(result.memberNumber);
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">' +
    '<rect width="1200" height="675" fill="#090b09"/>' +
    '<rect x="30" y="30" width="1140" height="615" fill="#101610" stroke="#52633f" stroke-width="2"/>' +
    '<path d="M30 126H1170M30 550H1170" stroke="#34412f"/>' +
    '<path d="M935 30L1170 265M1015 30L1170 185M1095 30L1170 105" stroke="#b6ff65" stroke-opacity=".12" stroke-width="2"/>' +
    '<text x="68" y="86" fill="#b6ff65" font-family="monospace" font-size="25" font-weight="bold">THE DYOR DEPARTMENT</text>' +
    '<text x="1132" y="86" text-anchor="end" fill="#85917c" font-family="monospace" font-size="14">SOLANA TRENCHES / 99% SURVIVOR REGISTRY</text>' +
    '<text x="68" y="178" fill="#879481" font-family="monospace" font-size="16" letter-spacing="3">MEMBERSHIP CERTIFICATE / FICTIONAL ISSUE</text>' +
    '<text x="68" y="269" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="57" font-weight="900">' + title + '</text>' +
    '<text x="68" y="321" fill="#b6ff65" font-family="monospace" font-size="23">' + motto + '</text>' +
    '<rect x="68" y="371" width="470" height="112" fill="#151e12" stroke="#46573a"/>' +
    '<text x="92" y="409" fill="#8d9a83" font-family="monospace" font-size="14">MEMBER NUMBER</text>' +
    '<text x="92" y="457" fill="#b6ff65" font-family="monospace" font-size="37" font-weight="bold">' + member + '</text>' +
    '<text x="580" y="407" fill="#8d9a83" font-family="monospace" font-size="14">MEMBERSHIP CLASS</text>' +
    '<text x="580" y="445" fill="#e4ebdf" font-family="monospace" font-size="18">' + escapeXml(result.membershipClass) + '</text>' +
    '<text x="580" y="477" fill="#ff8580" font-family="monospace" font-size="14">BENEFITS: NONE / EXPECTATIONS: MANAGED</text>' +
    '<text x="68" y="600" fill="#b6ff65" font-family="monospace" font-size="15" font-weight="bold">NOT A REAL MEMBERSHIP / NO FINANCIAL BENEFITS / NO TOKEN / NO REAL 99% STATISTIC</text>' +
    '<text x="1132" y="600" text-anchor="end" fill="#82907b" font-family="monospace" font-size="12">ENTERTAINMENT ONLY</text>' +
    '</svg>'
  );
}

export default function ClubClient() {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<ClubResult | null>(null);
  const [challengeMessage, setChallengeMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const code = new URLSearchParams(window.location.search).get("challenge");
      const nominatedAnswers = decodeClubCode(code);
      if (nominatedAnswers) {
        const nominated = buildClubResult(nominatedAnswers);
        setChallengeMessage(nominated.profile.title + " HAS NOMINATED YOU FOR MEMBERSHIP. YOUR APPLICATION IS NOW UNDER REVIEW.");
      }
    } catch {
      setNotice("THE CLUB COULD NOT READ THE NOMINATION. YOU MAY FILE A NEW APPLICATION.");
    }
  }, []);

  const progress = inspectClubProgress(answers.slice(0, current));
  const completedPercent = Math.round((current / questions.length) * 100);
  const currentQuestion = questions[current];
  const currentAnswer = answers[current];

  function startApplication() {
    setStarted(true);
    setNotice("");
  }

  function chooseAnswer(answerIndex: number) {
    const next = [...answers.slice(0, current), answerIndex];
    setAnswers(next);
    setNotice("");
    if (current === questions.length - 1) {
      setResult(buildClubResult(next));
      recordPassportActivity("club");
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
      // A fresh application does not depend on browser history.
    }
  }

  async function copyMembership() {
    if (!result) return;
    const caseUrl = makeCaseUrl(result.answers);
    const challengeUrl = makeChallengeUrl(result.answers);
    const text = [
      "THE DYOR DEPARTMENT — SOLANA TRENCHES SURVIVOR REGISTRY",
      "MEMBER No. " + result.memberNumber,
      "CLASSIFICATION: " + result.profile.title,
      "MEMBERSHIP CLASS: " + result.membershipClass,
      "CONVICTION: " + result.conviction + "/100",
      "COPE INDEX: " + result.cope + "/100",
      "CHAT DEPENDENCY: " + result.chatDependency + "/100",
      "BEHAVIOURAL CROSS-READ: " + result.crossRead.headline,
      result.crossRead.interpretation,
      ...result.crossRead.signals.map((signal) => signal.label + " / " + signal.answer + " / " + signal.detail),
      result.profile.motto,
      "This is a fictional entertainment membership. '99%' is a satirical club name, not a statistic about real investors or markets. No benefits, token or financial product are provided.",
      "PUBLIC MEMBER FILE: " + caseUrl,
      "NOMINATE ANOTHER DEGEN: " + challengeUrl,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setNotice("MEMBERSHIP DETAILS AND CHALLENGE LINKS COPIED.");
    } catch {
      setNotice("CLIPBOARD UNAVAILABLE. DOWNLOAD YOUR MEMBERSHIP CARD INSTEAD.");
    }
  }

  function downloadCard() {
    if (!result) return;
    let objectUrl = "";
    try {
      const blob = new Blob([makeMembershipSvg(result)], { type: "image/svg+xml;charset=utf-8" });
      objectUrl = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 675;
        const context = canvas.getContext("2d");
        if (!context) {
          URL.revokeObjectURL(objectUrl);
          setNotice("MEMBERSHIP CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
          return;
        }
        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(objectUrl);
        canvas.toBlob((png) => {
          if (!png) {
            setNotice("MEMBERSHIP CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
            return;
          }
          const downloadUrl = URL.createObjectURL(png);
          const anchor = document.createElement("a");
          anchor.href = downloadUrl;
          anchor.download = "dyor-99-club-" + result.memberNumber.toLowerCase() + ".png";
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
          setNotice("YOUR FICTIONAL MEMBERSHIP CARD HAS BEEN ISSUED.");
        }, "image/png");
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setNotice("MEMBERSHIP CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
      };
      image.src = objectUrl;
    } catch {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setNotice("MEMBERSHIP CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
    }
  }

  async function shareMembership() {
    if (!result) return;
    const caseUrl = makeCaseUrl(result.answers);
    const text = [
      "THE DYOR DEPARTMENT has filed me in the Solana Trenches survivor registry.",
      "Classification: " + result.profile.title + ".",
      "Conviction: " + result.conviction + "/100. Cope: " + result.cope + "/100. Chat dependency: " + result.chatDependency + "/100.",
      "Cross-read: " + result.crossRead.headline + ".",
      result.profile.motto,
    ].join(" ");
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Solana Trenches survivor file", text, url: caseUrl });
      } catch {
        setNotice("SHARE CANCELLED. YOUR MEMBERSHIP FILE REMAINS OPEN.");
      }
    } else {
      await copyMembership();
    }
  }

  if (result) {
    const caseUrl = makeCaseUrl(result.answers);
    const xText = [
      "THE DYOR DEPARTMENT has filed me in the Solana Trenches survivor registry.",
      "Member No. " + result.memberNumber + ".",
      result.profile.title + ".",
      "Conviction: " + result.conviction + "/100. Cope: " + result.cope + "/100. Chat dependency: " + result.chatDependency + "/100.",
      "Cross-read: " + result.crossRead.headline + ".",
      result.profile.motto,
      "Your application is pending.",
    ].join(" ");
    const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(caseUrl);
    const challengeText = "THE DYOR DEPARTMENT has filed my 99% Club membership. " + result.profile.title + ". Your application is pending.";
    const challengeIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(challengeText) + "&url=" + encodeURIComponent(makeChallengeUrl(result.answers));

    return (
      <section className="club-panel club-result" aria-live="polite">
        <div className="club-panel__header">
          <span>APPLICATION REVIEW COMPLETE / MEMBER FILED</span>
          <span className="club-status club-status--closed">● MEMBERSHIP GRANTED</span>
        </div>

        <div className="club-membership-card">
          <div className="club-membership-card__top">
            <span>THE DYOR DEPARTMENT / MEMBERSHIP OFFICE</span>
            <span>THE 99% CLUB</span>
          </div>
          <p className="eyebrow">MEMBER No. {result.memberNumber}</p>
          <h2>{result.profile.title}</h2>
          <p className="club-membership-card__subtitle">{result.profile.subtitle}</p>
          <div className="club-membership-card__motto">“{result.profile.motto}”</div>
          <div className="club-membership-card__bottom">
            <div><span>MEMBERSHIP CLASS</span><strong>{result.membershipClass}</strong></div>
            <div><span>BENEFITS</span><strong>NONE / EXPECTATIONS: MANAGED</strong></div>
          </div>
          <div className="club-membership-card__stamp">FICTIONAL<br />MEMBERSHIP</div>
        </div>

        <div className="club-finding">
          <span>DEPARTMENTAL FINDING</span>
          <strong>{result.finding}</strong>
          <small>{result.profile.membership}</small>
        </div>

        <div className="club-metrics">
          <div><span>CONVICTION INDEX</span><strong>{result.conviction}<small>/100</small></strong><i>HOW CLOSELY YOU GUARD THE THESIS</i></div>
          <div><span>COPE INDEX</span><strong className="club-cope">{result.cope}<small>/100</small></strong><i>HOW MUCH NARRATIVE SUPPORT IS REQUIRED</i></div>
          <div><span>CHAT DEPENDENCY</span><strong className="club-chat">{result.chatDependency}<small>/100</small></strong><i>HOW OFTEN THE GROUP CHAT DECIDES</i></div>
        </div>

        <DepartmentCrossRead read={result.crossRead} />

        <div className="club-profile">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <p>“{result.profile.roast}”</p>
          <small>SECONDARY PATTERN / {result.secondaryProfile.title}</small>
        </div>

        <div className="club-result__disclaimer">
          <strong>IMPORTANT / PLEASE DO NOT CITE THIS AT A CONFERENCE</strong>
          <p>THE 99% CLUB is a fictional satire membership. The name is not a statistic about real investors, traders, losses or market participants. Membership has no benefits, token, financial value or real-world status.</p>
        </div>

        <div className="club-actions">
          <button className="button button--primary" type="button" onClick={downloadCard}>DOWNLOAD MEMBERSHIP CARD <span>↓</span></button>
          <button className="button button--outline" type="button" onClick={shareMembership}>SHARE MEMBERSHIP <span>↗</span></button>
          <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">POST TO X <span>↗</span></a>
          <a className="button button--challenge" href={challengeIntent} target="_blank" rel="noopener noreferrer">NOMINATE A DEGEN <span>↗</span></a>
          <button className="button button--quiet" type="button" onClick={copyMembership}>COPY MEMBERSHIP + LINKS</button>
          <button className="button button--quiet" type="button" onClick={restart}>REAPPLY ↺</button>
        </div>

        <p className="club-public-link"><Link href={caseUrl}>OPEN PUBLIC MEMBER FILE ↗</Link></p>
        <DepartmentNextSteps currentDepartment="club" />
        {notice && <p className="audit-notice" role="status">{notice}</p>}
      </section>
    );
  }

  if (!started) {
    return (
      <section className="club-panel club-briefing">
        <div className="club-panel__header">
          <span>FORM 99C-001 / MEMBERSHIP APPLICATION</span>
          <span className="club-status"><i /> APPLICATIONS OPEN</span>
        </div>

        {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

        <div className="club-briefing__body">
          <p className="eyebrow">SOLANA TRENCHES / 99% SURVIVOR REGISTRY</p>
          <h2>YOU ARE NOT<br /><span>ALONE IN THIS.</span></h2>
          <p className="club-briefing__lead">
            Five trenches questions. Three fictional indices. One survivor card with absolutely no practical value.
          </p>

          <div className="club-briefing__facts">
            <div><span>APPLICATION</span><strong>5 MULTIPLE-CHOICE QUESTIONS</strong></div>
            <div><span>MEMBERSHIP</span><strong>FICTIONAL / NON-TRANSFERABLE</strong></div>
            <div><span>MEMBER BENEFITS</span><strong>NONE / EXPECTATIONS: MANAGED</strong></div>
          </div>

          <div className="club-briefing__warning">
            <span>IMPORTANT / THE NUMBER IS A JOKE</span>
            <p>“99%” is the name of this satirical club, not a measured statistic about investors, traders, market losses or the crypto community. Your result is fictional and is not stored as a real membership or account.</p>
          </div>

          <div className="club-briefing__actions">
            <button className="button button--primary" type="button" onClick={startApplication}>APPLY FOR MEMBERSHIP <span>↗</span></button>
            <span>NO ACCOUNT. NO TOKEN. NO BENEFITS. NO FINANCIAL ADVICE.</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="club-panel club-game" aria-label="99% Club membership application">
      <div className="club-panel__header">
        <span>MEMBERSHIP REVIEW / {String(current + 1).padStart(2, "0")} OF 05</span>
        <span className="club-status"><i /> FILE UNDER REVIEW</span>
      </div>

      {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

      <div className="club-progress" role="progressbar" aria-label="Membership application completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completedPercent}>
        <div style={{ width: completedPercent + "%" }} />
      </div>
      <div className="club-progress__meta">
        <span>QUESTION {String(current + 1).padStart(2, "0")} / 05</span>
        <span>{completedPercent}% COMPLETE</span>
      </div>

      <div className="club-live-scores">
        <div><span>CONVICTION</span><strong>{progress.conviction}</strong></div>
        <div><span>COPE</span><strong>{progress.cope}</strong></div>
        <div><span>CHAT</span><strong>{progress.chatDependency}</strong></div>
      </div>

      <div className="club-question">
        <div className="club-question__number">MEMBERSHIP INTERVIEW // {String(current + 1).padStart(2, "0")}</div>
        <h2 id="club-current-question" aria-live="polite" aria-atomic="true">{currentQuestion.prompt}</h2>
        <p>{currentQuestion.note}</p>
        <div className="club-answer-list" role="group" aria-labelledby="club-current-question">
          {currentQuestion.options.map((option, index) => (
            <button
              className={"club-answer" + (currentAnswer === index ? " is-selected" : "")}
              aria-pressed={currentAnswer === index}
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

      <div className="club-game__footer">
        <span>ALL MEMBERSHIP INDICES ARE FICTIONAL. THE CLUB HAS NO REAL ROSTER.</span>
        <div>
          {current > 0 && <button type="button" onClick={() => setCurrent(current - 1)}>← PREVIOUS</button>}
          <button type="button" onClick={restart}>WITHDRAW APPLICATION ↺</button>
        </div>
      </div>
      {notice && <p className="audit-notice" role="status">{notice}</p>}
    </section>
  );
}
