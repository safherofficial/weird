"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DepartmentCrossRead from "../components/department-cross-read";
import PassportResultReceipt from "../components/passport-result-receipt";
import { recordPassportActivity } from "../passport/passport-store";
import {
  actions,
  ASSET_LABEL,
  ASSET_NAME,
  buildSimulatorResult,
  decodeSimulatorCode,
  encodeSimulatorCode,
  marketEvents,
  SIMULATOR_ROUNDS,
  simulateProgress,
  STARTING_CREDITS,
  type SimulatorActionId,
  type SimulatorResult,
} from "./simulator-engine";

function makeCaseUrl(decisions: number[]) {
  if (typeof window === "undefined") return "/simulator";
  return window.location.origin + "/simulator/case/" + encodeURIComponent(encodeSimulatorCode(decisions));
}

function makeChallengeUrl(decisions: number[]) {
  if (typeof window === "undefined") return "/simulator";
  return window.location.origin + "/simulator?challenge=" + encodeURIComponent(encodeSimulatorCode(decisions));
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

function makeCaseCard(result: SimulatorResult) {
  const title = escapeXml(result.profile.title);
  const subtitle = escapeXml(result.profile.subtitle);
  const roast = escapeXml(result.profile.roast);
  const crossRead = escapeXml(result.crossRead.headline);
  const pnl = (result.paperPnl >= 0 ? "+" : "") + result.paperPnl.toFixed(2) + " DPC";
  const pnlColor = result.paperPnl >= 0 ? "#b6ff65" : "#ff7777";

  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">' +
    '<rect width="1200" height="675" fill="#090b09"/>' +
    '<rect x="28" y="28" width="1144" height="619" fill="none" stroke="#384137" stroke-width="2"/>' +
    '<path d="M28 110H1172M28 570H1172" stroke="#384137"/>' +
    '<text x="64" y="77" fill="#b6ff65" font-family="monospace" font-size="25" font-weight="bold">THE DYOR DEPARTMENT</text>' +
    '<text x="1136" y="77" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="15">PUMP.FUN PAPER MARKET / CASE FILE</text>' +
    '<text x="64" y="151" fill="#8d968a" font-family="monospace" font-size="16">CASE No. ' + result.caseNumber + ' / HYPE-404 INCIDENT REPORT</text>' +
    '<text x="64" y="231" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="49" font-weight="900">' + title + '</text>' +
    '<text x="64" y="280" fill="#b6ff65" font-family="monospace" font-size="20">' + subtitle + '</text>' +
    '<rect x="64" y="329" width="330" height="122" fill="#121713" stroke="#384137"/>' +
    '<rect x="414" y="329" width="330" height="122" fill="#121713" stroke="#384137"/>' +
    '<rect x="764" y="329" width="372" height="122" fill="#121713" stroke="#384137"/>' +
    '<text x="88" y="369" fill="#8d968a" font-family="monospace" font-size="14">FINAL PAPER NET WORTH</text>' +
    '<text x="88" y="423" fill="#f0f0e9" font-family="monospace" font-size="34" font-weight="bold">' + result.netWorth.toFixed(2) + '</text>' +
    '<text x="438" y="369" fill="#8d968a" font-family="monospace" font-size="14">PAPER PROFIT / LOSS</text>' +
    '<text x="438" y="423" fill="' + pnlColor + '" font-family="monospace" font-size="34" font-weight="bold">' + escapeXml(pnl) + '</text>' +
    '<text x="788" y="369" fill="#8d968a" font-family="monospace" font-size="14">FICTIONAL RETURN</text>' +
    '<text x="788" y="423" fill="' + pnlColor + '" font-family="monospace" font-size="34" font-weight="bold">' + (result.paperReturn > 0 ? "+" : "") + result.paperReturn.toFixed(1) + '%</text>' +
    '<text x="64" y="478" fill="#b6ff65" font-family="monospace" font-size="13" font-weight="bold">BEHAVIOURAL CROSS-READ / ' + crossRead + '</text>' +
    '<text x="64" y="511" fill="#e1e5dc" font-family="Arial,sans-serif" font-size="21">' + roast + '</text>' +
    '<text x="64" y="612" fill="#b6ff65" font-family="monospace" font-size="16" font-weight="bold">NO TOKEN. NO REAL MONEY. JUST A VERY REALISTIC AMOUNT OF COPE.</text>' +
    '<text x="1136" y="612" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="13">ENTERTAINMENT ONLY</text>' +
    '</svg>'
  );
}

export default function SimulatorClient() {
  const [started, setStarted] = useState(false);
  const [decisions, setDecisions] = useState<number[]>([]);
  const [result, setResult] = useState<SimulatorResult | null>(null);
  const [challengeMessage, setChallengeMessage] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      const challengeCode = new URLSearchParams(window.location.search).get("challenge");
      const nominatedDecisions = decodeSimulatorCode(challengeCode);
      if (nominatedDecisions) {
        const nominatedResult = buildSimulatorResult(nominatedDecisions);
        setChallengeMessage(nominatedResult.profile.title + " HAS NOMINATED YOU. THE MARKET IS WAITING.");
      }
    } catch {
      setNotice("THE DEPARTMENT COULD NOT READ THE CHALLENGE. YOU MAY START A NEW CASE.");
    }
  }, []);

  const progress = simulateProgress(decisions);
  const currentRound = decisions.length;
  const currentEvent = marketEvents[currentRound];
  const previousEntry = progress.history[progress.history.length - 1];

  function beginSimulation() {
    setStarted(true);
    setNotice("");
  }

  function chooseAction(actionId: SimulatorActionId) {
    const index = actions.findIndex((action) => action.id === actionId);
    if (index < 0 || currentRound >= SIMULATOR_ROUNDS) return;
    if (actionId === "average" && progress.cash < 25) {
      setNotice("INSUFFICIENT PAPER CREDITS. THE DEPARTMENT CANNOT EXTEND YOU A LOAN.");
      return;
    }
    if (actionId === "verify" && progress.intelFilesRemaining < 1) {
      setNotice("NO INTELLIGENCE FILES REMAIN. THE DEPARTMENT HAS CLOSED THE ARCHIVE DRAWER.");
      return;
    }
    if (actionId === "guard" && progress.guardOrdersRemaining < 1) {
      setNotice("NO DRAWDOWN GUARD ORDERS REMAIN. THE RISK OFFICE IS OUT OF FORMS.");
      return;
    }

    const nextDecisions = [...decisions, index];
    setDecisions(nextDecisions);
    setNotice("");

    if (nextDecisions.length === SIMULATOR_ROUNDS) {
      setResult(buildSimulatorResult(nextDecisions));
      recordPassportActivity("simulator");
    }
  }

  function restart() {
    setStarted(false);
    setDecisions([]);
    setResult(null);
    setNotice("");
    setChallengeMessage("");

    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("challenge");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    } catch {
      // Restarting the simulation does not depend on browser history.
    }
  }

  async function copyReport() {
    if (!result) return;
    const caseUrl = makeCaseUrl(result.decisions);
    const challengeUrl = makeChallengeUrl(result.decisions);
    const text = [
      "THE DYOR DEPARTMENT — PUMP.FUN INTELLIGENCE / PAPER MARKET SIMULATOR",
      "CASE No. " + result.caseNumber,
      result.profile.title,
      result.profile.subtitle,
      "FINAL PAPER NET WORTH: " + result.netWorth.toFixed(2) + " DPC",
      "PAPER P/L: " + (result.paperPnl >= 0 ? "+" : "") + result.paperPnl.toFixed(2) + " DPC",
      "FICTIONAL RETURN: " + (result.paperReturn > 0 ? "+" : "") + result.paperReturn.toFixed(1) + "%",
      "BEHAVIOURAL CROSS-READ: " + result.crossRead.headline,
      result.crossRead.interpretation,
      ...result.crossRead.signals.map((signal) => signal.label + " / " + signal.answer + " / " + signal.detail),
      result.profile.roast,
      "All prices, events, credits and outcomes are fictional. No real asset or money is involved.",
      "PUBLIC CASE FILE: " + caseUrl,
      "CHALLENGE A DEGEN: " + challengeUrl,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setNotice("SIMULATION REPORT AND CHALLENGE LINKS COPIED.");
    } catch {
      setNotice("CLIPBOARD UNAVAILABLE. TRY POSTING YOUR CASE TO X.");
    }
  }

  async function shareReport() {
    if (!result) return;
    const caseUrl = makeCaseUrl(result.decisions);
    const text = [
      "I survived THE DYOR DEPARTMENT Pump.fun Intelligence paper-market simulator.",
      "Classification: " + result.profile.title + ".",
      "Paper P/L: " + (result.paperPnl >= 0 ? "+" : "") + result.paperPnl.toFixed(2) + " DPC.",
      "Cross-read: " + result.crossRead.headline + ".",
      result.profile.roast,
    ].join(" ");

    if (navigator.share) {
      try {
        await navigator.share({ title: "My Pump.fun Paper Market case file", text, url: caseUrl });
      } catch {
        setNotice("SHARE CANCELLED. YOUR CASE REMAINS FILED.");
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
          anchor.download = "dyor-pumpfun-intelligence-case-" + result.caseNumber + ".png";
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
          setNotice("YOUR PUMP.FUN PAPER CASE CARD HAS BEEN ISSUED.");
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
    const caseUrl = makeCaseUrl(result.decisions);
    const xText = [
      "I survived THE DYOR DEPARTMENT Pump.fun Intelligence paper-market simulator.",
      "Classification: " + result.profile.title + ".",
      "Paper P/L: " + (result.paperPnl >= 0 ? "+" : "") + result.paperPnl.toFixed(2) + " DPC.",
      "Cross-read: " + result.crossRead.headline + ".",
      result.profile.roast.length > 82 ? result.profile.roast.slice(0, 78) + "…" : result.profile.roast,
      "Your turn. Hold the imaginary bag.",
    ].join(" ");
    const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(caseUrl);
    const challengeText = "THE DYOR DEPARTMENT has classified me as " + result.profile.title + ". Your turn to survive HYPE-404.";
    const challengeIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(challengeText) + "&url=" + encodeURIComponent(makeChallengeUrl(result.decisions));

    return (
      <section className="simulator-panel simulator-result" aria-live="polite">
        <div className="simulator-panel__header">
          <span>SIMULATION COMPLETE / 07 OF 07</span>
          <span className="simulator-status simulator-status--closed">● CASE CLOSED</span>
        </div>
        <p className="eyebrow">CASE No. {result.caseNumber} / FINAL DISPOSITION</p>
        <h2>{result.profile.title}</h2>
        <p className="simulator-result__subtitle">{result.profile.subtitle}</p>

        <div className="simulator-ending">
          <span>DEPARTMENTAL DISPOSITION</span>
          <strong>{result.profile.ending}</strong>
        </div>

        <DepartmentCrossRead read={result.crossRead} />

        <div className="simulator-result__metrics">
          <div>
            <span>FINAL PAPER NET WORTH</span>
            <strong>{result.netWorth.toFixed(2)} <small>DPC</small></strong>
          </div>
          <div>
            <span>PAPER PROFIT / LOSS</span>
            <strong className={result.paperPnl >= 0 ? "simulator-positive" : "red-text"}>
              {result.paperPnl >= 0 ? "+" : ""}{result.paperPnl.toFixed(2)} <small>DPC</small>
            </strong>
          </div>
          <div>
            <span>FICTIONAL RETURN</span>
            <strong className={result.paperReturn >= 0 ? "simulator-positive" : "red-text"}>
              {result.paperReturn > 0 ? "+" : ""}{result.paperReturn.toFixed(1)}<small>%</small>
            </strong>
          </div>
        </div>

        <div className="simulator-roast">
          <span>THE DEPARTMENT HAS A COMMENT</span>
          <p>“{result.profile.roast}”</p>
        </div>

        <div className="simulator-decision-summary">
          <span>YOUR DECISION HISTORY</span>
          <strong>{result.decisionSummary}</strong>
        </div>

        <div className="simulator-history">
          {result.history.map((entry) => (
            <div className="simulator-history__row" key={entry.day}>
              <span>DAY {String(entry.day).padStart(2, "0")}</span>
              <div>
                <strong>{entry.headline}</strong>
                <small>{entry.actionLabel} / PAPER PRICE {entry.movement}</small>
              </div>
              <b>{entry.netWorthAfter.toFixed(0)} DPC</b>
            </div>
          ))}
        </div>

        <p className="simulator-disclaimer">
          All assets, prices, events, balances and outcomes in this simulation are invented. DPC is fictional
          Department Credits. No real token, money, market feed or investment assessment is involved.
        </p>

        <div className="simulator-actions">
          <button className="button button--primary" type="button" onClick={downloadCard}>DOWNLOAD CASE CARD <span>↓</span></button>
          <button className="button button--outline" type="button" onClick={shareReport}>SHARE CASE <span>↗</span></button>
          <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">POST CASE TO X <span>↗</span></a>
          <a className="button button--challenge" href={challengeIntent} target="_blank" rel="noopener noreferrer">CHALLENGE A DEGEN <span>↗</span></a>
          <button className="button button--quiet" type="button" onClick={copyReport}>COPY REPORT + LINKS</button>
          <button className="button button--quiet" type="button" onClick={restart}>RUN IT BACK ↺</button>
        </div>
        {notice && <p className="audit-notice" role="status">{notice}</p>}
        <PassportResultReceipt activity="simulator" />
        <p className="simulator-result__public-link"><Link href={caseUrl}>OPEN PUBLIC CASE FILE ↗</Link></p>
      </section>
    );
  }

  if (!started) {
    return (
      <section className="simulator-panel simulator-briefing">
        <div className="simulator-panel__header">
          <span>FORM BHS-001 / TRAINING SIMULATION</span>
          <span className="simulator-status"><i /> READY FOR BAD DECISIONS</span>
        </div>

        {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

        <div className="simulator-briefing__body">
          <p className="eyebrow">PUMP.FUN INTELLIGENCE / PAPER MARKET DESK</p>
          <h2>YOUR BAG.<br /><span>YOUR PROBLEM.</span></h2>
          <p className="simulator-briefing__lead">
            Seven rounds. One fictional Solana launch. From CA drop to graduation, CTO noise and a post-graduation pool.
            Let's see what happens when conviction meets a very rude chart.
          </p>

          <div className="simulator-briefing__asset">
            <div>
              <span>SIMULATED ASSET / NOT A TOKEN</span>
              <strong>{ASSET_NAME}</strong>
              <small>{ASSET_LABEL}</small>
            </div>
            <div>
              <span>STARTING PAPER CAPITAL</span>
              <strong>{STARTING_CREDITS.toLocaleString("en-US")} DPC</strong>
              <small>DEPARTMENT PAPER CREDITS</small>
            </div>
          </div>

          <div className="simulator-rules">
            <span>THE TERMS OF YOUR MISFORTUNE</span>
            <p>75% of your imaginary capital is already in the position. The rest is in paper cash.</p>
            <p>Each round, choose to hold, trim 20%, add to your position or ask CT / Telegram. The scripted Pump.fun launch event lands immediately after your decision.</p>
            <p>Every player receives the same fictional market sequence. Your decisions change your paper portfolio, not the market.</p>
          </div>

          <div className="simulator-briefing__actions">
            <button className="button button--primary" type="button" onClick={beginSimulation}>OPEN SIMULATION <span>↗</span></button>
            <span>NO WALLET. NO REAL MONEY. NO ESCAPE.</span>
          </div>
        </div>
      </section>
    );
  }

  const isAverageUnavailable = progress.cash < 25;
  const isVerifyUnavailable = progress.intelFilesRemaining < 1;
  const isGuardUnavailable = progress.guardOrdersRemaining < 1;
  const displayedNetWorth = progress.netWorth;
  const chartValues = [STARTING_CREDITS, ...progress.history.map((entry) => entry.netWorthAfter)];
  const chartMax = Math.max(STARTING_CREDITS * 1.15, ...chartValues);
  const chartMin = Math.min(0, ...chartValues);
  const chartPoints = chartValues.map((value, index) => {
    const x = 12 + (index * 376) / Math.max(SIMULATOR_ROUNDS, 1);
    const y = 92 - ((value - chartMin) / Math.max(chartMax - chartMin, 1)) * 76;
    return x.toFixed(1) + "," + y.toFixed(1);
  }).join(" ");

  return (
    <section className="simulator-panel simulator-game" aria-label="Pump.fun Intelligence paper-market simulator">
      <div className="simulator-panel__header">
        <span>LIVE SIMULATION / ROUND {String(currentRound + 1).padStart(2, "0")} OF {SIMULATOR_ROUNDS}</span>
        <span className="simulator-status"><i /> POSITION OPEN</span>
      </div>

      {challengeMessage && <div className="audit-challenge-banner">{challengeMessage}</div>}

      <div className="simulator-game-layout">
        <aside className="simulator-game-sidebar" aria-label="Live paper portfolio and department systems">
      <div className="simulator-dashboard">
        <div className="simulator-dashboard__asset">
          <div>
            <span>FICTIONAL ASSET / {ASSET_LABEL}</span>
            <strong>{ASSET_NAME} <small>NOT-A-TOKEN</small></strong>
          </div>
          <div className="simulator-dashboard__price">
            <span>PAPER PRICE</span>
            <strong>{progress.price.toFixed(2)} <small>DPC</small></strong>
          </div>
        </div>

        <div className="simulator-chart">
          <div className="simulator-chart__grid" />
          <svg viewBox="0 0 400 112" role="img" aria-label="Fictional paper portfolio value trend">
            <polyline points={chartPoints} fill="none" stroke="#b6ff65" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            {chartValues.map((value, index) => {
              const x = 12 + (index * 376) / Math.max(SIMULATOR_ROUNDS, 1);
              const y = 92 - ((value - chartMin) / Math.max(chartMax - chartMin, 1)) * 76;
              return <circle key={index} cx={x} cy={y} r="3" fill="#b6ff65" />;
            })}
          </svg>
          <span>FICTIONAL PAPER EQUITY / NOT MARKET DATA</span>
        </div>

        <div className="simulator-dashboard__metrics">
          <div><span>PAPER CASH</span><strong>{progress.cash.toFixed(2)} <small>DPC</small></strong></div>
          <div><span>POSITION</span><strong>{progress.units.toFixed(2)} <small>UNITS</small></strong></div>
          <div><span>POSITION VALUE</span><strong>{progress.positionValue.toFixed(2)} <small>DPC</small></strong></div>
          <div><span>TOTAL PAPER EQUITY</span><strong>{displayedNetWorth.toFixed(2)} <small>DPC</small></strong></div>
        </div>
      </div>

      <div className="simulator-systems" aria-label="Department game systems">
        <div className="simulator-systems__heading"><span>DEPARTMENT SYSTEMS</span><small>LIVE / FICTIONAL</small></div>
        <div className="simulator-system-meter">
          <div><span>RESEARCH INTEGRITY</span><strong>{progress.researchScore}<small>/100</small></strong></div>
          <div className="simulator-system-meter__track"><i style={{ width: progress.researchScore + "%" }} /></div>
        </div>
        <div className="simulator-system-meter simulator-system-meter--heat">
          <div><span>CHAT DEPENDENCY</span><strong>{progress.chatHeat}<small>/100</small></strong></div>
          <div className="simulator-system-meter__track"><i style={{ width: progress.chatHeat + "%" }} /></div>
        </div>
        <div className="simulator-system-meter simulator-system-meter--discipline">
          <div><span>EXIT DISCIPLINE</span><strong>{progress.exitDiscipline}<small>/100</small></strong></div>
          <div className="simulator-system-meter__track"><i style={{ width: progress.exitDiscipline + "%" }} /></div>
        </div>
        <div className="simulator-systems__resources">
          <span>INTEL FILES <b>{progress.intelFilesRemaining}/3</b></span>
          <span>GUARD ORDERS <b>{progress.guardOrdersRemaining}/2</b></span>
          <span>GUARDS TRIGGERED <b>{progress.guardsTriggered}</b></span>
        </div>
      </div>
        </aside>
        <div className="simulator-game-main">
      {previousEntry && (
        <div className="simulator-last-move">
          <span>LAST MARKET EVENT / DAY {String(previousEntry.day).padStart(2, "0")}</span>
          <strong>{previousEntry.headline}</strong>
          <small>{previousEntry.movement} / YOUR PAPER EQUITY: {previousEntry.netWorthAfter.toFixed(2)} DPC</small>
          {previousEntry.intelNote && <small className="simulator-last-move__intel">RECEIPT CHECK / {previousEntry.intelNote}</small>}
          {previousEntry.guardTriggered && <small className="simulator-last-move__guard">20% DRAWDOWN GUARD TRIGGERED / 25% OF THE REMAINING POSITION SOLD AT THE FICTIONAL TRIGGER LEVEL.</small>}
        </div>
      )}

      <div className="simulator-round">
        <div className="simulator-round__meta">
          <span>MARKET BULLETIN / DAY {String(currentEvent.day).padStart(2, "0")}</span>
          <span>{Math.round((currentRound / SIMULATOR_ROUNDS) * 100)}% OF YOUR DOOM</span>
        </div>
        <div className="simulator-round-track" aria-label={"Round " + (currentRound + 1) + " of " + SIMULATOR_ROUNDS}>
          {marketEvents.map((event, index) => (
            <span key={event.day} className={index < currentRound ? "is-complete" : index === currentRound ? "is-current" : ""} />
          ))}
        </div>
        <h2>{currentEvent.headline}</h2>
        <p>{currentEvent.memo}</p>
        <div className="simulator-telegram">
          <span>CT / TELEGRAM / FICTIONAL CHAT LOG</span>
          <strong>{currentEvent.telegram}</strong>
        </div>
      </div>

      <div className="simulator-choice">
        <div className="simulator-choice__heading">
          <span>DECISION REQUIRED</span>
          <strong>WHAT WILL YOU DO?</strong>
        </div>
        <div className="simulator-choice__grid">
          {actions.map((action, index) => {
            const unavailable =
              (action.id === "average" && isAverageUnavailable) ||
              (action.id === "verify" && isVerifyUnavailable) ||
              (action.id === "guard" && isGuardUnavailable);
            const unavailableMessage = action.id === "average"
              ? "NO PAPER CREDITS LEFT TO DEPLOY."
              : action.id === "verify"
                ? "NO INTEL FILES REMAIN."
                : "NO GUARD ORDERS REMAIN.";
            return (
              <button
                className="simulator-choice__button"
                key={action.id}
                type="button"
                disabled={unavailable}
                onClick={() => chooseAction(action.id)}
              >
                <span className="simulator-choice__key">{String.fromCharCode(65 + index)}</span>
                <strong>{action.label}</strong>
                <small>{unavailable ? unavailableMessage : action.description}</small>
                <b>{unavailable ? "RESOURCE DEPLETED" : "SELECT DECISION ↗"}</b>
              </button>
            );
          })}
        </div>
      </div>

      <div className="simulator-game__footer">
        <span>THE MARKET MOVES AFTER YOU DECIDE. EVERY EVENT IS SCRIPTED.</span>
        <button type="button" onClick={restart}>ABANDON SIMULATION ↺</button>
      </div>
      {notice && <p className="audit-notice" role="status">{notice}</p>}
        </div>
      </div>
    </section>
  );
}
