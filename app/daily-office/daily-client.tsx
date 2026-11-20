"use client";

import { useState } from "react";
import DepartmentPublicShare from "../components/department-public-share";
import type { DailyOfficeDispatch } from "./daily-engine";

type DailyOfficeClientProps = {
  dispatch: DailyOfficeDispatch;
};

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

function wrapSvgText(value: string, maxLength: number) {
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

function makeDispatchSvg(dispatch: DailyOfficeDispatch) {
  const headlineLines = wrapSvgText(dispatch.headline, 48).slice(0, 2);
  const bulletinLines = wrapSvgText(dispatch.bulletin, 96).slice(0, 2);
  const quoteLines = wrapSvgText(dispatch.quote, 78).slice(0, 2);
  const titleSvg = headlineLines.map((line, index) =>
    '<text x="64" y="' + (206 + index * 39) + '" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="36" font-weight="900">' + escapeXml(line) + "</text>"
  ).join("");
  const bulletinSvg = bulletinLines.map((line, index) =>
    '<text x="88" y="' + (322 + index * 24) + '" fill="#d8dfd3" font-family="Arial,sans-serif" font-size="16">' + escapeXml(line) + "</text>"
  ).join("");
  const quoteSvg = quoteLines.map((line, index) =>
    '<text x="64" y="' + (542 + index * 22) + '" fill="#d8b477" font-family="Arial,sans-serif" font-size="17">“' + escapeXml(line) + "”</text>"
  ).join("");
  const reportLines = dispatch.sections.slice(0, 3).map((section) =>
    wrapSvgText(section.label + " / " + section.heading, 112).slice(0, 1)[0] || section.label
  );
  const reportSvg = reportLines.map((line, index) =>
    '<text x="64" y="' + (445 + index * 23) + '" fill="#8d968a" font-family="monospace" font-size="12">' + escapeXml(line) + "</text>"
  ).join("");
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">' +
    '<rect width="1200" height="675" fill="#090b09"/>' +
    '<rect x="28" y="28" width="1144" height="619" fill="none" stroke="#384137" stroke-width="2"/>' +
    '<path d="M28 110H1172M28 615H1172" stroke="#384137"/>' +
    '<text x="64" y="76" fill="#b6ff65" font-family="monospace" font-size="25" font-weight="bold">THE DYOR DEPARTMENT</text>' +
    '<text x="1136" y="76" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="14">DAILY OFFICE / ' + dispatch.issueDate + "</text>" +
    '<text x="64" y="151" fill="#8d968a" font-family="monospace" font-size="15">' + dispatch.reference + " / OFFICIAL DAILY DISPATCH</text>" +
    titleSvg +
    '<rect x="64" y="267" width="1072" height="107" fill="#121713" stroke="#384137"/>' +
    '<text x="88" y="301" fill="#b6ff65" font-family="monospace" font-size="14">OFFICIAL BULLETIN</text>' +
    bulletinSvg +
    '<text x="64" y="408" fill="#d8b477" font-family="monospace" font-size="16" font-weight="bold">CONVICTION INDEX / ' +
    dispatch.convictionIndex.score + "/100 — " + escapeXml(dispatch.convictionIndex.classification) + "</text>" +
    reportSvg +
    '<text x="64" y="525" fill="#bda16d" font-family="monospace" font-size="12">QUOTE OF THE DAY / UNATTRIBUTED</text>' +
    quoteSvg +
    '<text x="64" y="638" fill="#b6ff65" font-family="monospace" font-size="13" font-weight="bold">FICTIONAL DAILY SATIRE / NOT REAL NEWS OR MARKET DATA</text>' +
    '<text x="1136" y="638" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="12">ENTERTAINMENT ONLY</text>' +
    "</svg>"
  );
}

export default function DailyOfficeClient({ dispatch }: DailyOfficeClientProps) {
  const [notice, setNotice] = useState("");

  const pagePath = "/daily-office";
  const xText = [
    "THE DYOR DEPARTMENT / DAILY OFFICE",
    dispatch.headline,
    dispatch.bulletin,
    "CONVICTION INDEX: " + dispatch.convictionIndex.score + "/100 — " + dispatch.convictionIndex.classification,
    dispatch.quote,
    "A fictional daily dispatch. Not real news or market data.",
  ].join(" ");

  async function copyDispatch() {
    const pageUrl = new URL(pagePath, window.location.origin).toString();
    const text = [
      "THE DYOR DEPARTMENT — DAILY DEPARTMENTAL ABSURDITY",
      dispatch.reference,
      dispatch.issueDate + " / UTC",
      dispatch.headline,
      dispatch.bulletin,
      "CONVICTION INDEX: " + dispatch.convictionIndex.score + "/100 — " + dispatch.convictionIndex.classification,
      ...dispatch.convictionIndex.readings.map((reading) =>
        reading.label + ": " + reading.score + "/100 — " + reading.assessment
      ),
      dispatch.convictionIndex.note,
      ...dispatch.sections.flatMap((section) => [
        section.label,
        section.heading,
        section.body,
        section.stamp,
      ]),
      dispatch.quote,
      "ASSIGNED DEPARTMENT: " + dispatch.assignedDepartment,
      "DISPOSITION: " + dispatch.disposition,
      dispatch.methodology,
      pageUrl,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setNotice("TODAY'S DISPATCH AND SOURCE LINK COPIED.");
    } catch {
      setNotice("CLIPBOARD UNAVAILABLE. THE DISPATCH CAN STILL BE SHARED ON X.");
    }
  }

  function downloadCard() {
    let objectUrl = "";
    try {
      const blob = new Blob([makeDispatchSvg(dispatch)], { type: "image/svg+xml;charset=utf-8" });
      objectUrl = URL.createObjectURL(blob);
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 675;
        const context = canvas.getContext("2d");

        if (!context) {
          URL.revokeObjectURL(objectUrl);
          setNotice("DAILY DISPATCH CARD COULD NOT BE GENERATED.");
          return;
        }

        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(objectUrl);
        canvas.toBlob((png) => {
          if (!png) {
            setNotice("DAILY DISPATCH CARD COULD NOT BE GENERATED.");
            return;
          }

          const downloadUrl = URL.createObjectURL(png);
          const anchor = document.createElement("a");
          anchor.href = downloadUrl;
          anchor.download = "dyor-daily-dispatch-" + dispatch.issueDate + ".png";
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
          setNotice("TODAY'S OFFICIAL DAILY CARD HAS BEEN ISSUED.");
        }, "image/png");
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setNotice("DAILY DISPATCH CARD COULD NOT BE GENERATED.");
      };
      image.src = objectUrl;
    } catch {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setNotice("DAILY DISPATCH CARD COULD NOT BE GENERATED.");
    }
  }

  return (
    <section className="daily-office-panel" aria-label="Daily Departmental Absurdity dispatch">
      <div className="daily-office-panel__header">
        <span>{dispatch.reference} / DAILY OFFICE RECORD</span>
        <span>UTC ISSUE / {dispatch.issueDate}</span>
      </div>

      <div className="daily-office-headline">
        <p className="eyebrow">THE DAILY DEPARTMENTAL ABSURDITY</p>
        <h2>{dispatch.headline}</h2>
        <p>{dispatch.subheading}</p>
      </div>

      <div className="daily-office-bulletin">
        <div><span>OFFICIAL BULLETIN / 01</span><b>PUBLIC NOTICE</b></div>
        <p>{dispatch.bulletin}</p>
      </div>

      <section className="daily-office-index" aria-labelledby="daily-office-index-title">
        <div className="daily-office-index__header">
          <div>
            <span>FICTIONAL SYNTHETIC READING / NOT A RISK MODEL</span>
            <h3 id="daily-office-index-title">THE CONVICTION INDEX</h3>
            <p>{dispatch.convictionIndex.classification}</p>
          </div>
          <div className="daily-office-index__score" aria-label={"Final conviction score: " + dispatch.convictionIndex.score + " out of 100"}>
            <strong>{dispatch.convictionIndex.score}</strong><span>/100</span>
          </div>
        </div>
        <div className="daily-office-index__readings">
          {dispatch.convictionIndex.readings.map((reading) => (
            <div className="daily-office-index__reading" data-tone={reading.tone} key={reading.label}>
              <div className="daily-office-index__reading-label">
                <span>{reading.label}</span>
                <strong>{reading.score}/100 <i>— {reading.assessment}</i></strong>
              </div>
              <div
                className="daily-office-index__bar"
                role="meter"
                aria-label={reading.label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={reading.score}
                aria-valuetext={reading.assessment}
              >
                <span style={{ width: reading.score + "%" }} />
              </div>
            </div>
          ))}
        </div>
        <p className="daily-office-index__note">{dispatch.convictionIndex.note}</p>
      </section>

      <div className="daily-office-sections">
        {dispatch.sections.map((section, index) => (
          <article className="daily-office-section" key={section.label}>
            <div className="daily-office-section__top">
              <span>{section.label}</span>
              <small>{String(index + 1).padStart(2, "0")} / {String(dispatch.sections.length).padStart(2, "0")}</small>
            </div>
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
            <div className="daily-office-section__stamp">{section.stamp}</div>
          </article>
        ))}
      </div>

      <blockquote className="daily-office-quote">
        <span>QUOTE OF THE DAY / UNATTRIBUTED</span>
        <p>“{dispatch.quote}”</p>
      </blockquote>

      <div className="daily-office-disposition">
        <div><span>ASSIGNED DEPARTMENT</span><strong>{dispatch.assignedDepartment}</strong></div>
        <div><span>FINAL DISPOSITION</span><strong>{dispatch.disposition}</strong></div>
      </div>

      <div className="daily-office-actions">
        <button className="button button--primary" type="button" onClick={downloadCard}>DOWNLOAD DAILY CARD <span>↓</span></button>
        <div
          className="daily-office-share"
          style={{ display: "flex", flexWrap: "wrap", gridColumn: "1 / -1", gap: 8, minWidth: 0 }}
        >
          <DepartmentPublicShare
            title="THE DYOR DEPARTMENT / Daily Office"
            shareText={xText}
            casePath={pagePath}
            resourceLabel="DAILY DISPATCH"
          />
        </div>
        <button className="button button--quiet" type="button" onClick={copyDispatch}>COPY FULL DISPATCH</button>
      </div>

      {notice && <p className="audit-notice" role="status">{notice}</p>}

      <div className="daily-office-method">
        <span>EDITORIAL METHOD / DAILY REGENERATION</span>
        <p>{dispatch.methodology}</p>
      </div>
      <p className="daily-office-footer">{dispatch.footer}</p>
    </section>
  );
}
