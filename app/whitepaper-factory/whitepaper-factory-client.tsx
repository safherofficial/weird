"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  buildWhitepaperResult,
  decodeWhitepaperCode,
  encodeWhitepaperCode,
  formatWhitepaperHtml,
  formatWhitepaperMarkdown,
  inspectWhitepaperProgress,
  questions,
  slugifyProjectName,
  type WhitepaperResult,
} from "./whitepaper-engine";

function makeCaseUrl(answers: number[], projectName: string) {
  if (typeof window === "undefined") return "/whitepaper-factory";
  return window.location.origin + "/whitepaper-factory/case/" +
    encodeURIComponent(encodeWhitepaperCode(answers, projectName));
}

function makeChallengeUrl(answers: number[], projectName: string) {
  if (typeof window === "undefined") return "/whitepaper-factory";
  return window.location.origin + "/whitepaper-factory?challenge=" +
    encodeURIComponent(encodeWhitepaperCode(answers, projectName));
}

function safeXCopy(value: string, limit = 64) {
  if (value.length <= limit) return value;
  const clipped = value.slice(0, limit - 3);
  const boundary = clipped.lastIndexOf(" ");
  return clipped.slice(0, boundary > limit * 0.55 ? boundary : clipped.length) + "…";
}

function downloadTextFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function WhitepaperFactoryClient() {
  const [projectName, setProjectName] = useState("PROJECT ASTRAL");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<WhitepaperResult | null>(null);
  const [challengeMessage, setChallengeMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const challengeCode = new URLSearchParams(window.location.search).get("challenge");
      const nomination = decodeWhitepaperCode(challengeCode);
      if (nomination) {
        const nominated = buildWhitepaperResult(nomination.answers, nomination.projectSlug);
        setChallengeMessage(nominated.profile.title + " HAS NOMINATED " + nominated.projectLabel + ". SUBMIT YOUR OWN TECHNICAL DOCUMENT.");
      }
    } catch {
      setNotice("THE DEPARTMENT COULD NOT READ THE NOMINATION. A NEW WHITEPAPER BRIEF IS AVAILABLE.");
    }
  }, []);

  const progress = inspectWhitepaperProgress(answers.slice(0, current));
  const projectSlug = slugifyProjectName(projectName);
  const completedPercent = Math.round((current / questions.length) * 100);
  const question = questions[current];

  function startFactory() {
    if (!projectName.trim()) {
      setNotice("A PROJECT DESIGNATION IS REQUIRED. 'PROJECT SOON' IS ACCEPTABLE.");
      return;
    }
    setStarted(true);
    setNotice("");
  }

  function chooseAnswer(answerIndex: number) {
    const next = [...answers.slice(0, current), answerIndex];
    setAnswers(next);
    setNotice("");
    if (current === questions.length - 1) {
      setResult(buildWhitepaperResult(next, projectSlug));
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
      // Restart does not depend on browser history.
    }
  }

  async function copyWhitepaper() {
    if (!result) return;
    const markdown = formatWhitepaperMarkdown(result);
    const caseUrl = makeCaseUrl(result.answers, result.projectSlug);
    const content = markdown + "\n\nPUBLIC CASE FILE: " + caseUrl +
      "\nCHALLENGE ANOTHER DEGEN: " + makeChallengeUrl(result.answers, result.projectSlug);
    try {
      await navigator.clipboard.writeText(content);
      setNotice("WHITEPAPER TEXT AND SHARE LINKS COPIED.");
    } catch {
      setNotice("CLIPBOARD UNAVAILABLE. DOWNLOAD THE MARKDOWN OR HTML DOCUMENT.");
    }
  }

  function downloadMarkdown() {
    if (!result) return;
    downloadTextFile(
      "dyor-whitepaper-" + result.projectSlug.toLowerCase() + ".md",
      formatWhitepaperMarkdown(result),
      "text/markdown;charset=utf-8"
    );
    setNotice("MARKDOWN WHITEPAPER DOWNLOADED.");
  }

  function downloadHtml() {
    if (!result) return;
    downloadTextFile(
      "dyor-whitepaper-" + result.projectSlug.toLowerCase() + ".html",
      formatWhitepaperHtml(result),
      "text/html;charset=utf-8"
    );
    setNotice("HTML DOCUMENT DOWNLOADED. OPEN IT AND USE PRINT / SAVE AS PDF.");
  }

  async function shareWhitepaper() {
    if (!result) return;
    const caseUrl = makeCaseUrl(result.answers, result.projectSlug);
    const text = [
      "THE DYOR DEPARTMENT generated a whitepaper for " + result.projectLabel + ".",
      "Classification: " + result.profile.title + ".",
      "Technical density: " + result.technicalDensity + "/100. Buzzword density: " + result.buzzwordDensity + "/100. Product clarity: " + result.productClarity + "/100.",
      safeXCopy(result.profile.roast),
    ].join(" ");
    if (navigator.share) {
      try {
        await navigator.share({ title: result.projectLabel + " — Fictional Whitepaper", text, url: caseUrl });
      } catch {
        setNotice("SHARE CANCELLED. THE WHITEPAPER REMAINS FILED.");
      }
    } else {
      await copyWhitepaper();
    }
  }

  if (result) {
    const caseUrl = makeCaseUrl(result.answers, result.projectSlug);
    const xText = [
      "THE DYOR DEPARTMENT issued a whitepaper for " + result.projectLabel + ".",
      result.profile.title + ".",
      "Technical density: " + result.technicalDensity + "/100. Buzzword density: " + result.buzzwordDensity + "/100. Product clarity: " + result.productClarity + "/100.",
      safeXCopy(result.profile.roast),
      "Your turn. Submit your technical vision.",
    ].join(" ");
    const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(caseUrl);
    const challengeText = "THE DYOR DEPARTMENT generated a whitepaper for " + result.projectLabel + ". Can your technical vision survive the same review?";
    const challengeIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(challengeText) + "&url=" +
      encodeURIComponent(makeChallengeUrl(result.answers, result.projectSlug));

    return (
      <section className="whitepaper-panel whitepaper-result" aria-live="polite">
        <div className="whitepaper-panel__header">
          <span>WHITEPAPER GENERATED / 09 SECTIONS FILED</span>
          <span className="whitepaper-status whitepaper-status--closed">● DOCUMENT COMPLETE</span>
        </div>

        <div className="whitepaper-document" id="whitepaper-document">
          <div className="whitepaper-cover">
            <p className="eyebrow">THE DYOR DEPARTMENT / WHITEPAPER FACTORY</p>
            <p className="whitepaper-cover__case">CASE No. {result.caseNumber} / TECHNICAL DOCUMENTATION UNIT</p>
            <h2>{result.projectLabel}<br /><span>WHITEPAPER.</span></h2>
            <p className="whitepaper-cover__subtitle">{result.profile.subtitle}</p>
            <div className="whitepaper-cover__stamp">FICTIONAL ENTERTAINMENT DOCUMENT</div>
            <div className="whitepaper-cover__scores">
              <div><span>TECHNICAL DENSITY</span><strong>{result.technicalDensity}<small>/100</small></strong></div>
              <div><span>BUZZWORD DENSITY</span><strong className="whitepaper-buzz">{result.buzzwordDensity}<small>/100</small></strong></div>
              <div><span>PRODUCT CLARITY</span><strong className="whitepaper-clarity">{result.productClarity}<small>/100</small></strong></div>
            </div>
          </div>

          <div className="whitepaper-executive">
            <span>DEPARTMENTAL FINDING</span>
            <strong>{result.finding}</strong>
            <small>PRIMARY CLASSIFICATION / {result.profile.title}</small>
            <small>DEPARTMENTAL DISPOSITION / {result.profile.disposition}</small>
          </div>

          {result.sections.map((section) => (
            <article className="whitepaper-section" key={section.number}>
              <div className="whitepaper-section__number">{section.number}</div>
              <div className="whitepaper-section__content">
                <span>{section.eyebrow}</span>
                <h3>{section.title}</h3>
                {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                {section.number === "05" && (
                  <div className="whitepaper-allocation">
                    <div className="whitepaper-allocation__heading">
                      <strong>FICTIONAL TOKEN ALLOCATION</strong>
                      <small>NOTIONAL SUPPLY / 1,000,000,000 UNITS</small>
                    </div>
                    {result.allocations.map((item) => (
                      <div className="whitepaper-allocation__row" key={item.label}>
                        <div><span>{item.label}</span><b>{item.percentage}%</b></div>
                        <div className="whitepaper-allocation__bar"><i style={{ width: item.percentage + "%" }} /></div>
                        <small>{item.explanation}</small>
                      </div>
                    ))}
                  </div>
                )}
                {section.bullets && (
                  <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                )}
              </div>
            </article>
          ))}

          <div className="whitepaper-final-notice">
            <span>FINAL NOTICE / DOCUMENT CONTROL</span>
            <strong>WHITEPAPER COMPLETE FOR ENTERTAINMENT PURPOSES ONLY.</strong>
            <p>No real project, token, company, contract, team, market, security or legal position has been inspected or verified.</p>
          </div>
        </div>

        <div className="whitepaper-result__profile">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <strong>{result.profile.title}</strong>
          <p>“{result.profile.roast}”</p>
          <small>SECONDARY FILE / {result.secondaryProfile.title}</small>
        </div>

        <p className="whitepaper-disclaimer">
          This generator creates a fictional parody from selected answers. It is not a real technical specification,
          token offer, investment document, legal disclosure, security audit or project whitepaper.
        </p>

        <div className="whitepaper-actions">
          <button className="button button--primary" type="button" onClick={downloadHtml}>DOWNLOAD HTML / PDF SOURCE <span>↓</span></button>
          <button className="button button--outline" type="button" onClick={() => window.print()}>PRINT / SAVE AS PDF <span>↗</span></button>
          <button className="button button--quiet" type="button" onClick={downloadMarkdown}>DOWNLOAD MARKDOWN</button>
          <button className="button button--quiet" type="button" onClick={copyWhitepaper}>COPY WHITEPAPER + LINKS</button>
          <button className="button button--x" type="button" onClick={shareWhitepaper}>SHARE DOCUMENT <span>↗</span></button>
          <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">POST CASE TO X <span>↗</span></a>
          <a className="button button--challenge" href={challengeIntent} target="_blank" rel="noopener noreferrer">CHALLENGE A DEGEN <span>↗</span></a>
          <button className="button button--quiet" type="button" onClick={restart}>GENERATE ANOTHER ↺</button>
        </div>

        <p className="whitepaper-public-link"><Link href={caseUrl}>OPEN PUBLIC WHITEPAPER FILE ↗</Link></p>
        {notice && <p className="audit-notice" role="status">{notice}</p>}
      </section>
    );
  }

  if (!started) {
    return (
      <section className="whitepaper-panel whitepaper-briefing">
        <div className="whitepaper-panel__header">
          <span>FORM WPF-001 / DOCUMENT INTAKE</span>
          <span className="whitepaper-status"><i /> READY TO ABSTRACT</span>
        </div>

        {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

        <div className="whitepaper-briefing__body">
          <p className="eyebrow">OFFICE OF TECHNICAL-SOUNDING DOCUMENTATION</p>
          <h2>MAKE IT SOUND<br /><span>REVOLUTIONARY.</span></h2>
          <p className="whitepaper-briefing__lead">
            Seven questions. Nine sections. A complete whitepaper-shaped document for a project that may or may not exist.
          </p>

          <label className="whitepaper-project-field">
            <span>PROJECT DESIGNATION / PUBLIC LABEL</span>
            <input
              type="text"
              value={projectName}
              maxLength={32}
              autoComplete="off"
              spellCheck={false}
              onChange={(event) => setProjectName(event.target.value)}
              placeholder="PROJECT ASTRAL"
            />
            <small>PUBLIC SLUG PREVIEW: {projectSlug} / THIS LABEL APPEARS IN THE SHAREABLE URL. DO NOT ENTER PRIVATE DETAILS.</small>
          </label>

          <div className="whitepaper-briefing__facts">
            <div><span>INTAKE FORM</span><strong>7 MULTIPLE-CHOICE QUESTIONS</strong></div>
            <div><span>DOCUMENT OUTPUT</span><strong>9 SECTIONS / TOKEN ALLOCATION / RISK NOTES</strong></div>
            <div><span>EXPORT</span><strong>HTML / MARKDOWN / PRINT TO PDF</strong></div>
          </div>

          <div className="whitepaper-briefing__warning">
            <span>IMPORTANT / DOCUMENT DISCLAIMER</span>
            <p>This is a parody generator, not a technical writing service or project validator. All architectures, allocations, risk statements and milestones are invented. Never present the generated document as a real whitepaper or token disclosure.</p>
          </div>

          <div className="whitepaper-briefing__actions">
            <button className="button button--primary" type="button" onClick={startFactory}>OPEN WHITEPAPER FACTORY <span>↗</span></button>
            <span>NO AUDIT. NO OFFER. NO FINANCIAL ADVICE.</span>
          </div>
        </div>
      </section>
    );
  }

  const currentAnswer = answers[current];
  return (
    <section className="whitepaper-panel whitepaper-game" aria-label="Whitepaper Factory questionnaire">
      <div className="whitepaper-panel__header">
        <span>DOCUMENT INTAKE / {String(current + 1).padStart(2, "0")} OF 07</span>
        <span className="whitepaper-status"><i /> ABSTRACT UNDER REVIEW</span>
      </div>

      {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

      <div className="whitepaper-progress" role="progressbar" aria-label="Whitepaper intake completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completedPercent}>
        <div style={{ width: completedPercent + "%" }} />
      </div>
      <div className="whitepaper-progress__meta">
        <span>QUESTION {String(current + 1).padStart(2, "0")} / 07</span>
        <span>{completedPercent}% COMPLETE</span>
      </div>

      <div className="whitepaper-live-scores">
        <div><span>TECHNICAL DENSITY</span><strong>{progress.technicalDensity}</strong></div>
        <div><span>BUZZWORD DENSITY</span><strong>{progress.buzzwordDensity}</strong></div>
        <div><span>PRODUCT CLARITY</span><strong>{progress.productClarity}</strong></div>
      </div>

      <div className="whitepaper-question">
        <div className="whitepaper-question__number">DOCUMENT REVIEW // {String(current + 1).padStart(2, "0")}</div>
        <h2>{question.prompt}</h2>
        <p>{question.note}</p>
        <div className="whitepaper-answer-list">
          {question.options.map((option, index) => (
            <button
              className={"whitepaper-answer" + (currentAnswer === index ? " is-selected" : "")}
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

      <div className="whitepaper-game__footer">
        <span>ALL TECHNICAL CLAIMS ARE GENERATED FROM YOUR SELECTED ANSWERS.</span>
        <div>
          {current > 0 && <button type="button" onClick={() => setCurrent(current - 1)}>← PREVIOUS</button>}
          <button type="button" onClick={restart}>CLOSE FILE ↺</button>
        </div>
      </div>
      {notice && <p className="audit-notice" role="status">{notice}</p>}
    </section>
  );
}
