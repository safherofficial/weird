"use client";

import { useMemo, useState } from "react";

type Option = {
  label: string;
  research: number;
  cope: number;
  tag: string;
};

type Question = {
  prompt: string;
  note: string;
  options: Option[];
};

const questions: Question[] = [
  {
    prompt: "DID YOU READ THE WHITEPAPER?",
    note: "The document that changed everything. Allegedly.",
    options: [
      { label: "Cover to cover. Twice.", research: 5, cope: 1, tag: "overprepared" },
      { label: "Abstract, tokenomics, conclusion.", research: 4, cope: 2, tag: "overprepared" },
      { label: "I skimmed the diagrams.", research: 2, cope: 3, tag: "visual-learner" },
      { label: "I saw someone say the tech was groundbreaking.", research: 0, cope: 5, tag: "social-proof" },
    ],
  },
  {
    prompt: "HOW DID YOU VERIFY THE TEAM?",
    note: "A LinkedIn profile is not a background check. Apparently.",
    options: [
      { label: "Doxxed, verifiable track record.", research: 5, cope: 1, tag: "overprepared" },
      { label: "Anonymous, but apparently experienced.", research: 2, cope: 3, tag: "dev-trust" },
      { label: "The founder has a based profile picture.", research: 1, cope: 4, tag: "dev-trust" },
      { label: "The Telegram mods said the dev is cooking.", research: 0, cope: 5, tag: "social-proof" },
    ],
  },
  {
    prompt: "WHAT DID YOU CHECK BEFORE BUYING?",
    note: "Please select the answer you gave yourself at the time.",
    options: [
      { label: "Liquidity, holders, contract and wallet distribution.", research: 5, cope: 1, tag: "overprepared" },
      { label: "A few on-chain metrics and the chart.", research: 4, cope: 2, tag: "chart-watcher" },
      { label: "Volume was going up. That felt sufficient.", research: 1, cope: 4, tag: "chart-watcher" },
      { label: "The ticker was funny and the community was loud.", research: 0, cope: 5, tag: "social-proof" },
    ],
  },
  {
    prompt: "WHAT FINALLY MADE YOU CLICK BUY?",
    note: "The moment of truth. Or the moment before it.",
    options: [
      { label: "A thesis I had researched independently.", research: 5, cope: 1, tag: "overprepared" },
      { label: "A catalyst supported by actual evidence.", research: 4, cope: 2, tag: "catalyst-chaser" },
      { label: "It was already up 300%. Still early, right?", research: 1, cope: 5, tag: "fomo" },
      { label: "Someone posted: 'Last chance before moon'.", research: 0, cope: 5, tag: "fomo" },
    ],
  },
  {
    prompt: "THE TOKEN IS DOWN 82%. WHAT NOW?",
    note: "A purely hypothetical and emotionally neutral scenario.",
    options: [
      { label: "Reassess the original thesis and the new information.", research: 5, cope: 1, tag: "overprepared" },
      { label: "Review the position against a plan I made earlier.", research: 4, cope: 2, tag: "planned" },
      { label: "Average down. The discount is getting ridiculous.", research: 1, cope: 5, tag: "dca" },
      { label: "Mute the chart. Check Telegram. Repeat.", research: 0, cope: 5, tag: "telegram" },
    ],
  },
  {
    prompt: "BE HONEST: WHAT IS YOUR EXIT STRATEGY?",
    note: "There are no wrong answers. There are, however, concerning ones.",
    options: [
      { label: "Predefined levels and invalidation conditions.", research: 5, cope: 1, tag: "planned" },
      { label: "Scale out if the thesis plays out.", research: 4, cope: 2, tag: "planned" },
      { label: "At 100x. I will figure it out when we get there.", research: 1, cope: 5, tag: "moon" },
      { label: "Exit? I am building a long-term relationship.", research: 0, cope: 5, tag: "diamond" },
    ],
  },
];

const classifications: Record<string, { title: string; subtitle: string; roast: string }> = {
  overprepared: {
    title: "THE OVERQUALIFIED BAGHOLDER",
    subtitle: "A thesis was written. The market declined to read it.",
    roast: "You brought a 46-page research report to a knife fight. Respectfully, the knife won.",
  },
  "visual-learner": {
    title: "THE CHART APPRECIATOR",
    subtitle: "The lines were moving. You felt something.",
    roast: "Technical analysis was performed. The technicals have requested privacy.",
  },
  "social-proof": {
    title: "THE TELEGRAM-APPROVED INVESTOR",
    subtitle: "Community conviction: maximum. Independent verification: pending.",
    roast: "You trusted the group chat. The group chat has changed its name.",
  },
  "dev-trust": {
    title: "THE DEV WHISPERER",
    subtitle: "Anonymous team. Unconditional faith. Interesting combination.",
    roast: "The developer said 'big things coming'. Archaeologists are still waiting.",
  },
  "chart-watcher": {
    title: "THE CANDLESTICK ROMANTIC",
    subtitle: "You saw volume. You heard wedding bells.",
    roast: "You and the chart had something special. Then the chart started seeing other people.",
  },
  "catalyst-chaser": {
    title: "THE CATALYST COLLECTOR",
    subtitle: "Every announcement was a sign. Even the typo.",
    roast: "You followed the catalysts all the way to an undisclosed location.",
  },
  fomo: {
    title: "CERTIFIED EXIT LIQUIDITY",
    subtitle: "You did not chase the pump. You provided it with an exit.",
    roast: "The early holders appreciate your contribution to the ecosystem.",
  },
  planned: {
    title: "THE PLAN-ADJACENT PROFESSIONAL",
    subtitle: "There was a plan. Events developed independently.",
    roast: "Your spreadsheet remains immaculate. The portfolio has declined to comment.",
  },
  dca: {
    title: "THE INFINITE ACCUMULATOR",
    subtitle: "Every lower low is an invitation to deepen the lore.",
    roast: "At this point, you are not buying the dip. You are dating the dip.",
  },
  telegram: {
    title: "THE TELEGRAM SENTINEL",
    subtitle: "You have not slept, but you are fully informed about the community mood.",
    roast: "You know every admin by first name. None of them know where the liquidity went.",
  },
  moon: {
    title: "THE 100X PROPHET",
    subtitle: "Unrealized profits have been allocated to several imaginary properties.",
    roast: "You already spent the gains. The blockchain has no record of this transaction.",
  },
  diamond: {
    title: "THE DIAMOND-HANDED PHILOSOPHER",
    subtitle: "A temporary drawdown is just a long-term character arc.",
    roast: "You are not holding a bag. You are preserving a historical artifact.",
  },
};

function buildResult(answers: number[]) {
  const selected = answers.map((answer, index) => questions[index].options[answer]);
  const research = Math.round((selected.reduce((sum, item) => sum + item.research, 0) / 30) * 100);
  const cope = Math.round((selected.reduce((sum, item) => sum + item.cope, 0) / 30) * 100);
  const counts = new Map<string, number>();
  selected.forEach((item) => counts.set(item.tag, (counts.get(item.tag) ?? 0) + 1));
  const tag = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "social-proof";
  const profile = classifications[tag] ?? classifications["social-proof"];
  const caseNumber = String(100000 + (answers.reduce((sum, value, index) => sum + (value + 1) * (index + 7), 0) * 37)).slice(-6);
  return { research, cope, profile, caseNumber };
}

function makeCardSvg(result: ReturnType<typeof buildResult>) {
  const safe = (value: string) => value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&apos;" };
    return entities[char];
  });
  return '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">' +
    '<rect width="1200" height="675" fill="#090b09"/><rect x="28" y="28" width="1144" height="619" fill="none" stroke="#384137" stroke-width="2"/>' +
    '<path d="M28 112H1172" stroke="#384137"/><path d="M28 560H1172" stroke="#384137"/>' +
    '<text x="64" y="78" fill="#b6ff65" font-family="monospace" font-size="25" font-weight="bold">THE DYOR DEPARTMENT®</text>' +
    '<text x="1136" y="78" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="16">OFFICIAL CASE FILE</text>' +
    '<text x="64" y="158" fill="#8d968a" font-family="monospace" font-size="17">CASE No. ' + result.caseNumber + ' / PERSONAL AUDIT REPORT</text>' +
    '<text x="64" y="238" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="54" font-weight="900">' + safe(result.profile.title) + '</text>' +
    '<text x="64" y="286" fill="#b6ff65" font-family="monospace" font-size="22">' + safe(result.profile.subtitle) + '</text>' +
    '<rect x="64" y="342" width="500" height="112" fill="#121713" stroke="#384137"/>' +
    '<text x="88" y="382" fill="#8d968a" font-family="monospace" font-size="16">RESEARCH EFFORT</text>' +
    '<text x="88" y="431" fill="#f0f0e9" font-family="monospace" font-size="38" font-weight="bold">' + result.research + '/100</text>' +
    '<rect x="584" y="342" width="552" height="112" fill="#121713" stroke="#384137"/>' +
    '<text x="608" y="382" fill="#8d968a" font-family="monospace" font-size="16">COPE INDEX</text>' +
    '<text x="608" y="431" fill="#ff6868" font-family="monospace" font-size="38" font-weight="bold">' + result.cope + '/100</text>' +
    '<text x="64" y="510" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="21">' + safe(result.profile.roast) + '</text>' +
    '<text x="64" y="604" fill="#b6ff65" font-family="monospace" font-size="18" font-weight="bold">YOUR RESEARCH HAS BEEN ACKNOWLEDGED. YOUR LOSSES REMAIN YOURS.</text>' +
    '<text x="1136" y="604" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="14">DYOR.DEPARTMENT / ENTERTAINMENT ONLY</text></svg>';
}

export default function AuditClient() {
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof buildResult> | null>(null);
  const [notice, setNotice] = useState("");

  const progress = useMemo(() => (answers.length / questions.length) * 100, [answers.length]);

  function choose(answerIndex: number) {
    const next = [...answers.slice(0, current), answerIndex];
    setAnswers(next);
    setNotice("");
    if (current === questions.length - 1) {
      setResult(buildResult(next));
    } else {
      setCurrent(current + 1);
    }
  }

  function restart() {
    setAnswers([]);
    setCurrent(0);
    setResult(null);
    setNotice("");
  }

  async function copyReport() {
    if (!result) return;
    const text = [
      "THE DYOR DEPARTMENT® — OFFICIAL CASE FILE",
      "CASE No. " + result.caseNumber,
      result.profile.title,
      result.profile.subtitle,
      "Research effort: " + result.research + "/100",
      "Cope index: " + result.cope + "/100",
      result.profile.roast,
      "Your research has been acknowledged. Your losses remain yours.",
      "This is a fictional entertainment result. No financial assessment.",
      typeof window !== "undefined" ? window.location.origin + "/audit" : "",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setNotice("CASE FILE COPIED. DISTRIBUTE RESPONSIBLY.");
    } catch {
      setNotice("CLIPBOARD UNAVAILABLE. TRY THE DOWNLOAD.");
    }
  }

  async function downloadCard() {
    if (!result) return;
    try {
      const svg = makeCardSvg(result);
      const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 675;
        const context = canvas.getContext("2d");
        if (!context) {
          URL.revokeObjectURL(url);
          setNotice("CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
          return;
        }
        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(url);
        canvas.toBlob((png) => {
          if (!png) {
            setNotice("CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
            return;
          }
          const downloadUrl = URL.createObjectURL(png);
          const anchor = document.createElement("a");
          anchor.href = downloadUrl;
          anchor.download = "dyor-department-case-" + result.caseNumber + ".png";
          anchor.click();
          URL.revokeObjectURL(downloadUrl);
          setNotice("YOUR OFFICIAL CERTIFICATE HAS BEEN ISSUED.");
        }, "image/png");
      };
      image.onerror = () => {
        URL.revokeObjectURL(url);
        setNotice("CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
      };
      image.src = url;
    } catch {
      setNotice("CARD GENERATION FAILED. THE DEPARTMENT APOLOGIZES.");
    }
  }

  async function shareReport() {
    if (!result) return;
    const text = "I have been audited by THE DYOR DEPARTMENT. Classification: " + result.profile.title + ". Research: " + result.research + "/100. Cope: " + result.cope + "/100. " + result.profile.roast;
    if (navigator.share) {
      try {
        await navigator.share({ title: "My DYOR Department report", text, url: window.location.origin + "/audit" });
      } catch {
        setNotice("SHARE CANCELLED. YOUR CASE REMAINS OPEN.");
      }
    } else {
      await copyReport();
    }
  }

  if (result) {
    return (
      <section className="audit-workspace audit-result" aria-live="polite">
        <div className="audit-workspace__header"><span>INVESTIGATION COMPLETE</span><span className="status-pill status-pill--red">● CLASSIFIED</span></div>
        <div className="result-stamp">OFFICIAL<br />FINDING</div>
        <p className="eyebrow">CASE No. {result.caseNumber} / FINAL DETERMINATION</p>
        <h2>{result.profile.title}</h2>
        <p className="result-subtitle">{result.profile.subtitle}</p>
        <div className="result-metrics">
          <div><span>RESEARCH EFFORT</span><strong>{result.research}<small>/100</small></strong><i>HOW MUCH HOMEWORK YOU CLAIMED</i></div>
          <div><span>COPE INDEX</span><strong className="red-text">{result.cope}<small>/100</small></strong><i>HOW HARD YOU ARE HOLDING ON</i></div>
        </div>
        <div className="result-roast"><span>THE DEPARTMENT HAS A COMMENT</span><p>“{result.profile.roast}”</p></div>
        <div className="result-verdict"><span>FINAL NOTICE</span><strong>YOUR RESEARCH HAS BEEN ACKNOWLEDGED.<br />YOUR LOSSES REMAIN YOURS.</strong></div>
        <p className="result-disclaimer">This score is a fictional, deterministic result based only on your quiz answers. It is not a measure of investment skill, actual risk or financial performance.</p>
        <div className="result-actions">
          <button className="button button--primary" onClick={downloadCard} type="button">DOWNLOAD CERTIFICATE <span>↓</span></button>
          <button className="button button--outline" onClick={shareReport} type="button">SHARE YOUR CASE <span>↗</span></button>
          <button className="button button--quiet" onClick={copyReport} type="button">COPY REPORT</button>
          <button className="button button--quiet" onClick={restart} type="button">REOPEN INVESTIGATION ↺</button>
        </div>
        {notice && <p className="audit-notice" role="status">{notice}</p>}
      </section>
    );
  }

  const question = questions[current];

  return (
    <section className="audit-workspace" aria-label="DYOR audit questionnaire">
      <div className="audit-workspace__header"><span>INVESTIGATION IN PROGRESS</span><span className="status-pill"><i /> YOUR CASE IS OPEN</span></div>
      <div className="audit-progress"><div style={{ width: progress + "%" }} /></div>
      <div className="audit-progress__meta"><span>QUESTION {String(current + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}</span><span>{Math.round(progress)}% COMPLETE</span></div>
      <div className="question-block">
        <div className="question-block__number">INTERROGATION // 0{current + 1}</div>
        <h2>{question.prompt}</h2>
        <p>{question.note}</p>
        <div className="answer-list">
          {question.options.map((option, index) => (
            <button className="answer-option" key={option.label} onClick={() => choose(index)} type="button">
              <span className="answer-option__key">{String.fromCharCode(65 + index)}</span>
              <span>{option.label}</span>
              <b>↗</b>
            </button>
          ))}
        </div>
      </div>
      <div className="audit-workspace__footer">
        <span>ALL ANSWERS ARE STORED IN THIS SESSION ONLY.</span>
        {current > 0 && <button type="button" onClick={() => { setCurrent(current - 1); setAnswers(answers.slice(0, -1)); }}>← PREVIOUS QUESTION</button>}
      </div>
    </section>
  );
}