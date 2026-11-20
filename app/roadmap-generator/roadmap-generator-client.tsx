"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DepartmentNextSteps from "../components/department-next-steps";
import { recordPassportActivity } from "../passport/passport-store";
import {
  buildRoadmapResult,
  decodeRoadmapCode,
  encodeRoadmapCode,
  inspectRoadmapProgress,
  questions,
  slugifyProjectName,
  type RoadmapResult,
} from "./roadmap-engine";

function makeCaseUrl(answers: number[], projectName: string) {
  if (typeof window === "undefined") return "/roadmap-generator";
  const code = encodeRoadmapCode(answers, projectName);
  return window.location.origin + "/roadmap-generator/case/" + encodeURIComponent(code);
}

function makeChallengeUrl(answers: number[], projectName: string) {
  if (typeof window === "undefined") return "/roadmap-generator";
  const code = encodeRoadmapCode(answers, projectName);
  return window.location.origin + "/roadmap-generator?challenge=" + encodeURIComponent(code);
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

function safeXCopy(value: string, limit = 68) {
  if (value.length <= limit) return value;
  const clipped = value.slice(0, limit - 3);
  const boundary = clipped.lastIndexOf(" ");
  return clipped.slice(0, boundary > limit * 0.55 ? boundary : clipped.length) + "…";
}

function makeCaseCard(result: RoadmapResult) {
  const title = escapeXml(result.profile.title);
  const project = escapeXml(result.projectLabel);
  const finding = escapeXml(result.finding);
  const roast = escapeXml(result.profile.roast);
  const cards = [
    { label: "DELIVERY CLARITY", value: result.delivery, color: "#b6ff65" },
    { label: "TIMELINE REALISM", value: result.realism, color: "#c8b5ff" },
    { label: "PROMISE INFLATION", value: result.inflation, color: "#ff7777" },
  ].map((item, index) => {
    const x = 64 + index * 365;
    return (
      '<rect x="' + x + '" y="320" width="337" height="105" fill="#121713" stroke="#384137"/>' +
      '<text x="' + (x + 20) + '" y="357" fill="#8d968a" font-family="monospace" font-size="13">' + item.label + '</text>' +
      '<text x="' + (x + 20) + '" y="405" fill="' + item.color + '" font-family="monospace" font-size="36" font-weight="bold">' + item.value + '/100</text>'
    );
  }).join("");

  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">' +
    '<rect width="1200" height="675" fill="#090b09"/>' +
    '<rect x="28" y="28" width="1144" height="619" fill="none" stroke="#384137" stroke-width="2"/>' +
    '<path d="M28 110H1172M28 555H1172" stroke="#384137"/>' +
    '<text x="64" y="77" fill="#b6ff65" font-family="monospace" font-size="25" font-weight="bold">THE DYOR DEPARTMENT</text>' +
    '<text x="1136" y="77" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="15">CTO TAKEOVER ROADMAP / CASE FILE</text>' +
    '<text x="64" y="151" fill="#8d968a" font-family="monospace" font-size="15">CASE No. ' + result.caseNumber + ' / PROJECT: ' + project + '</text>' +
    '<text x="64" y="223" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="43" font-weight="900">' + title + '</text>' +
    '<text x="64" y="267" fill="#b6ff65" font-family="monospace" font-size="17">A SEVEN-PHASE CTO RECOVERY PLAN / ETA: SOON™</text>' +
    '<text x="64" y="297" fill="#ff8580" font-family="monospace" font-size="12" font-weight="bold">DEPARTMENTAL FINDING / ' + finding + '</text>' +
    cards +
    '<text x="64" y="478" fill="#e1e5dc" font-family="Arial,sans-serif" font-size="19">' + roast + '</text>' +
    '<text x="64" y="596" fill="#b6ff65" font-family="monospace" font-size="15" font-weight="bold">EVERY MILESTONE IS ACHIEVABLE. EVENTUALLY. PROBABLY. SOON.</text>' +
    '<text x="1136" y="596" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="12">FICTIONAL ENTERTAINMENT ONLY</text>' +
    '</svg>'
  );
}

export default function RoadmapGeneratorClient() {
  const [projectName, setProjectName] = useState("PROJECT SOON");
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<RoadmapResult | null>(null);
  const [challengeMessage, setChallengeMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const code = new URLSearchParams(window.location.search).get("challenge");
      const nomination = decodeRoadmapCode(code);
      if (nomination) {
        const nominated = buildRoadmapResult(nomination.answers, nomination.projectSlug);
        setChallengeMessage(nominated.profile.title + " HAS NOMINATED " + nominated.projectLabel + ". YOUR ROADMAP IS DUE FOR REVIEW.");
      }
    } catch {
      setNotice("THE DEPARTMENT COULD NOT READ THE NOMINATION. YOU MAY START A NEW ROADMAP.");
    }
  }, []);

  const progress = inspectRoadmapProgress(answers.slice(0, current));
  const question = questions[current];
  const completed = current;
  const projectSlug = slugifyProjectName(projectName);

  function startGenerator() {
    setStarted(true);
    setNotice("");
  }

  function chooseAnswer(answerIndex: number) {
    const next = [...answers.slice(0, current), answerIndex];
    setAnswers(next);
    setNotice("");

    if (current === questions.length - 1) {
      setResult(buildRoadmapResult(next, projectSlug));
      recordPassportActivity("roadmap");
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
      // Restarting does not depend on browser history.
    }
  }

  async function copyReport() {
    if (!result) return;
    const caseUrl = makeCaseUrl(result.answers, result.projectSlug);
    const challengeUrl = makeChallengeUrl(result.answers, result.projectSlug);
    const text = [
      "THE DYOR DEPARTMENT — CTO EMERGENCY OFFICE",
      "PROJECT: " + result.projectLabel,
      "CASE No. " + result.caseNumber,
      "CLASSIFICATION: " + result.profile.title,
      "DEPARTMENTAL FINDING: " + result.finding,
      "DELIVERY CLARITY: " + result.delivery + "/100",
      "TIMELINE REALISM: " + result.realism + "/100",
      "PROMISE INFLATION: " + result.inflation + "/100",
      result.profile.roast,
      ...result.milestones.map((milestone) => milestone.phase + " / " + milestone.title + " / " + milestone.eta),
      "This roadmap is fictional entertainment generated from selected answers. It is not a real project plan or forecast.",
      "PUBLIC CASE FILE: " + caseUrl,
      "NOMINATE ANOTHER DEGEN: " + challengeUrl,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setNotice("ROADMAP REPORT AND CHALLENGE LINKS COPIED.");
    } catch {
      setNotice("CLIPBOARD UNAVAILABLE. TRY POSTING YOUR CASE TO X.");
    }
  }

  async function shareReport() {
    if (!result) return;
    const caseUrl = makeCaseUrl(result.answers, result.projectSlug);
    const text = [
      "THE DYOR DEPARTMENT generated a roadmap for " + result.projectLabel + ".",
      "Classification: " + result.profile.title + ".",
      "Delivery: " + result.delivery + "/100. Timeline realism: " + result.realism + "/100. Promise inflation: " + result.inflation + "/100.",
      safeXCopy(result.profile.roast),
    ].join(" ");

    if (navigator.share) {
      try {
        await navigator.share({ title: "My CTO Takeover Roadmap", text, url: caseUrl });
      } catch {
        setNotice("SHARE CANCELLED. YOUR ROADMAP REMAINS ON FILE.");
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
          anchor.download = "dyor-cto-takeover-" + result.caseNumber + ".png";
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
          setNotice("YOUR CTO TAKEOVER ROADMAP CARD HAS BEEN ISSUED.");
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
    const caseUrl = makeCaseUrl(result.answers, result.projectSlug);
    const xText = [
      "THE DYOR DEPARTMENT has generated a roadmap for " + result.projectLabel + ".",
      "Classification: " + result.profile.title + ".",
      "Delivery: " + result.delivery + "/100. Timeline: " + result.realism + "/100. Promise inflation: " + result.inflation + "/100.",
      safeXCopy(result.profile.roast),
      "Your turn. Put your milestones on paper.",
    ].join(" ");
    const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(caseUrl);
    const challengeText = "THE DYOR DEPARTMENT reviewed " + result.projectLabel + " and issued " + result.profile.title + ". Can your roadmap survive the same process?";
    const challengeIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(challengeText) + "&url=" + encodeURIComponent(makeChallengeUrl(result.answers, result.projectSlug));

    return (
      <section className="roadmap-panel roadmap-result" aria-live="polite">
        <div className="roadmap-panel__header">
          <span>CTO RECOVERY PLAN / 07 PHASES FILED</span>
          <span className="roadmap-status roadmap-status--closed">● APPROVED FOR ENTERTAINMENT</span>
        </div>

        <p className="eyebrow">PROJECT: {result.projectLabel} / CASE No. {result.caseNumber}</p>
        <h2>{result.profile.title}</h2>
        <p className="roadmap-result__subtitle">{result.profile.subtitle}</p>

        <div className="roadmap-finding">
          <span>DEPARTMENTAL FINDING</span>
          <strong>{result.finding}</strong>
          <small>{result.disposition}</small>
        </div>

        <div className="roadmap-metrics">
          <div><span>DELIVERY CLARITY</span><strong>{result.delivery}<small>/100</small></strong><i>HOW MUCH EXISTS BEYOND THE SLIDE DECK</i></div>
          <div><span>TIMELINE REALISM</span><strong className="roadmap-realism">{result.realism}<small>/100</small></strong><i>HOW CLOSE THE CALENDAR IS TO REALITY</i></div>
          <div><span>PROMISE INFLATION</span><strong className="roadmap-inflation">{result.inflation}<small>/100</small></strong><i>HOW MUCH SOON IS IN THE SYSTEM</i></div>
        </div>

        <div className="roadmap-secondary">
          <span>SECONDARY PATTERN DETECTED</span>
          <strong>{result.secondaryProfile.title}</strong>
          <small>{result.secondaryProfile.subtitle}</small>
        </div>

        <div className="roadmap-list">
          <div className="roadmap-list__heading">
            <span>THE OFFICIAL TAKEOVER PLAN / {result.projectLabel}</span>
            <span>7 PHASES / ETA: SOON™</span>
          </div>
          {result.milestones.map((milestone, index) => (
            <article className="roadmap-milestone" key={milestone.phase}>
              <div className="roadmap-milestone__index">{String(index + 1).padStart(2, "0")}</div>
              <div className="roadmap-milestone__body">
                <div className="roadmap-milestone__top">
                  <span>{milestone.phase}</span>
                  <b>{milestone.status}</b>
                </div>
                <h3>{milestone.title}</h3>
                <p>{milestone.description}</p>
              </div>
              <div className="roadmap-milestone__eta">
                <span>ESTIMATED ARRIVAL</span>
                <strong>{milestone.eta}</strong>
              </div>
            </article>
          ))}
        </div>

        <div className="roadmap-roast">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <p>“{result.profile.roast}”</p>
        </div>

        <p className="roadmap-disclaimer">
          This is a fictional parody roadmap generated from your selected answers. Milestones, statuses and
          estimated arrivals are invented for entertainment. They are not commitments, predictions or a real
          project plan. The project name appears in the public case URL when shared; do not use private details.
        </p>

        <div className="roadmap-actions">
          <button className="button button--primary" type="button" onClick={downloadCard}>DOWNLOAD CASE CARD <span>↓</span></button>
          <button className="button button--outline" type="button" onClick={shareReport}>SHARE TAKEOVER PLAN <span>↗</span></button>
          <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">POST CASE TO X <span>↗</span></a>
          <a className="button button--challenge" href={challengeIntent} target="_blank" rel="noopener noreferrer">CHALLENGE A DEGEN <span>↗</span></a>
          <button className="button button--quiet" type="button" onClick={copyReport}>COPY TAKEOVER PLAN + LINKS</button>
          <button className="button button--quiet" type="button" onClick={restart}>GENERATE ANOTHER ↺</button>
        </div>
        {notice && <p className="audit-notice" role="status">{notice}</p>}
        <p className="roadmap-public-link"><Link href={caseUrl}>OPEN PUBLIC CTO FILE ↗</Link></p>
        <DepartmentNextSteps currentDepartment="roadmap" />
      </section>
    );
  }

  if (!started) {
    return (
      <section className="roadmap-panel roadmap-briefing">
        <div className="roadmap-panel__header">
          <span>FORM RPG-001 / MILESTONE REQUEST</span>
          <span className="roadmap-status"><i /> READY TO OVERPROMISE</span>
        </div>

        {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

        <div className="roadmap-briefing__body">
          <p className="eyebrow">CTO EMERGENCY OFFICE / COMMUNITY TAKEOVER DESK</p>
          <h2>BUILD YOUR<br /><span>CTO TAKEOVER PLAN.</span></h2>
          <p className="roadmap-briefing__lead">
            Six questions. Seven fictional recovery phases. Map the deployer silence, community handover, launch milestones and the next promised CTO update.
          </p>

          <label className="roadmap-project-field">
            <span>PROJECT DESIGNATION / PUBLIC LABEL</span>
            <input
              type="text"
              value={projectName}
              maxLength={32}
              autoComplete="off"
              spellCheck={false}
              onChange={(event) => setProjectName(event.target.value)}
              placeholder="PROJECT SOON"
            />
            <small>PUBLIC SLUG PREVIEW: {projectSlug} / THIS LABEL APPEARS IN THE SHAREABLE URL. DO NOT ENTER PRIVATE DETAILS.</small>
          </label>

          <div className="roadmap-briefing__facts">
            <div><span>INTAKE FORM</span><strong>6 MULTIPLE-CHOICE QUESTIONS</strong></div>
            <div><span>OUTPUT</span><strong>7 PHASES / 3 FICTIONAL SCORES</strong></div>
            <div><span>DELIVERY WINDOW</span><strong>SOON™ / SUBJECT TO SOON™</strong></div>
          </div>

          <div className="roadmap-briefing__warning">
            <span>IMPORTANT / PLEASE READ BEFORE PROMISING</span>
            <p>This is a satire generator, not a planning tool. It does not assess a real company, project or token. The generated roadmap is fictional and should not be presented as an actual project commitment.</p>
          </div>

          <div className="roadmap-briefing__actions">
            <button className="button button--primary" type="button" onClick={startGenerator}>GENERATE A CTO TAKEOVER PLAN <span>↗</span></button>
            <span>NO GANTT CHART. NO DELIVERY GUARANTEE. NO FINANCIAL ADVICE.</span>
          </div>
        </div>
      </section>
    );
  }

  const completedPercent = Math.round((completed / questions.length) * 100);
  const currentAnswer = answers[current];

  return (
    <section className="roadmap-panel roadmap-game" aria-label="Roadmap Generator questionnaire">
      <div className="roadmap-panel__header">
        <span>CTO RECOVERY INTAKE / {String(current + 1).padStart(2, "0")} OF 06</span>
        <span className="roadmap-status"><i /> MILESTONES PENDING</span>
      </div>

      {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

      <div className="roadmap-progress" role="progressbar" aria-label="Roadmap intake completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completedPercent}>
        <div style={{ width: completedPercent + "%" }} />
      </div>
      <div className="roadmap-progress__meta">
        <span>QUESTION {String(current + 1).padStart(2, "0")} / 06</span>
        <span>{completedPercent}% COMPLETE</span>
      </div>

      <div className="roadmap-live-scores">
        <div><span>DELIVERY</span><strong>{progress.delivery}</strong></div>
        <div><span>TIMELINE</span><strong>{progress.realism}</strong></div>
        <div><span>INFLATION</span><strong>{progress.inflation}</strong></div>
      </div>

      <div className="roadmap-question">
        <div className="roadmap-question__number">HANDOVER REVIEW // {String(current + 1).padStart(2, "0")}</div>
        <h2 id="roadmap-current-question" aria-live="polite" aria-atomic="true">{question.prompt}</h2>
        <p>{question.note}</p>
        <div className="roadmap-answer-list" role="group" aria-labelledby="roadmap-current-question">
          {question.options.map((option, index) => (
            <button
              className={"roadmap-answer" + (currentAnswer === index ? " is-selected" : "")}
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

      <div className="roadmap-game__footer">
        <span>ALL DATES ARE FICTIONAL. ALL DEADLINES ARE SUBJECT TO THE NEXT ANNOUNCEMENT.</span>
        <div>
          {current > 0 && <button type="button" onClick={() => setCurrent(current - 1)}>← PREVIOUS</button>}
          <button type="button" onClick={restart}>CLOSE FILE ↺</button>
        </div>
      </div>
      {notice && <p className="audit-notice" role="status">{notice}</p>}
    </section>
  );
}
