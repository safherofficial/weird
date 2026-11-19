"use client";

import { useState } from "react";
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

function makeDispatchSvg(dispatch: DailyOfficeDispatch) {
  const headline = escapeXml(dispatch.headline);
  const bulletin = escapeXml(dispatch.bulletin);
  const quote = escapeXml(dispatch.quote);
  const incident = escapeXml(dispatch.sections[0].heading);
  const memo = escapeXml(dispatch.sections[1].heading);
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">' +
    '<rect width="1200" height="675" fill="#090b09"/>' +
    '<rect x="28" y="28" width="1144" height="619" fill="none" stroke="#384137" stroke-width="2"/>' +
    '<path d="M28 110H1172M28 570H1172" stroke="#384137"/>' +
    '<text x="64" y="76" fill="#b6ff65" font-family="monospace" font-size="25" font-weight="bold">THE DYOR DEPARTMENT</text>' +
    '<text x="1136" y="76" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="14">DAILY OFFICE / ' + dispatch.issueDate + '</text>' +
    '<text x="64" y="151" fill="#8d968a" font-family="monospace" font-size="15">' + dispatch.reference + ' / OFFICIAL DAILY DISPATCH</text>' +
    '<text x="64" y="222" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="42" font-weight="900">' + headline + '</text>' +
    '<rect x="64" y="263" width="1072" height="104" fill="#121713" stroke="#384137"/>' +
    '<text x="88" y="301" fill="#b6ff65" font-family="monospace" font-size="14">OFFICIAL BULLETIN</text>' +
    '<text x="88" y="337" fill="#d8dfd3" font-family="Arial,sans-serif" font-size="18">' + bulletin + '</text>' +
    '<text x="64" y="414" fill="#8d968a" font-family="monospace" font-size="13">INCIDENT / ' + incident + '</text>' +
    '<text x="64" y="443" fill="#8d968a" font-family="monospace" font-size="13">MEMO / ' + memo + '</text>' +
    '<text x="64" y="512" fill="#d8b477" font-family="Arial,sans-serif" font-size="20">“' + quote + '”</text>' +
    '<text x="64" y="610" fill="#b6ff65" font-family="monospace" font-size="14" font-weight="bold">FICTIONAL DAILY SATIRE / NOT REAL NEWS OR MARKET DATA</text>' +
    '<text x="1136" y="610" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="12">ENTERTAINMENT ONLY</text>' +
    '</svg>'
  );
}

export default function DailyOfficeClient({ dispatch }: DailyOfficeClientProps) {
  const [notice, setNotice] = useState("");

  const pageUrl = typeof window === "undefined" ? "/daily-office" : window.location.origin + "/daily-office";
  const xText = [
    "THE DYOR DEPARTMENT / DAILY OFFICE",
    dispatch.headline,
    dispatch.bulletin,
    dispatch.quote,
    "A fictional daily dispatch. Not real news or market data.",
  ].join(" ");

  async function copyDispatch() {
    const text = [
      "THE DYOR DEPARTMENT — DAILY DEPARTMENTAL ABSURDITY",
      dispatch.reference,
      dispatch.issueDate + " / UTC",
      dispatch.headline,
      dispatch.bulletin,
      ...dispatch.sections.flatMap(section => [section.heading, section.body, section.stamp]),
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

  async function shareDispatch() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "THE DYOR DEPARTMENT / Daily Office",
          text: xText,
          url: pageUrl,
        });
      } catch {
        setNotice("SHARE CANCELLED. TODAY'S FILE REMAINS OPEN.");
      }
    } else {
      await copyDispatch();
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

  const xIntent = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(xText) + "&url=" + encodeURIComponent(pageUrl);

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

      <div className="daily-office-sections">
        {dispatch.sections.map((section, index) => (
          <article className="daily-office-section" key={section.label}>
            <div className="daily-office-section__top">
              <span>{section.label}</span>
              <small>{String(index + 1).padStart(2, "0")} / 02</small>
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
        <button className="button button--outline" type="button" onClick={shareDispatch}>SHARE DISPATCH <span>↗</span></button>
        <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">POST TO X <span>↗</span></a>
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
