"use client";

import { useState } from "react";
import {
  formatWhitepaperHtml,
  formatWhitepaperMarkdown,
  type WhitepaperResult,
} from "./whitepaper-engine";

type WhitepaperPublicActionsProps = {
  result: WhitepaperResult;
  casePath: string;
  challengePath: string;
};

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

export default function WhitepaperPublicActions({
  result,
  casePath,
  challengePath,
}: WhitepaperPublicActionsProps) {
  const [notice, setNotice] = useState("");

  function getPublicUrl(path: string) {
    return new URL(path, window.location.origin).toString();
  }

  function downloadMarkdown() {
    const content = [
      formatWhitepaperMarkdown(result),
      "",
      "PUBLIC CASE FILE: " + getPublicUrl(casePath),
      "CHALLENGE ANOTHER DEGEN: " + getPublicUrl(challengePath),
    ].join("\n");

    downloadTextFile(
      "dyor-whitepaper-" + result.projectSlug.toLowerCase() + ".md",
      content,
      "text/markdown;charset=utf-8"
    );
    setNotice("MARKDOWN WHITEPAPER DOWNLOADED.");
  }

  function downloadHtml() {
    downloadTextFile(
      "dyor-whitepaper-" + result.projectSlug.toLowerCase() + ".html",
      formatWhitepaperHtml(result),
      "text/html;charset=utf-8"
    );
    setNotice("HTML DOCUMENT DOWNLOADED. OPEN IT AND USE PRINT / SAVE AS PDF.");
  }

  async function copyDocument() {
    const content = [
      formatWhitepaperMarkdown(result),
      "",
      "PUBLIC CASE FILE: " + getPublicUrl(casePath),
      "CHALLENGE ANOTHER DEGEN: " + getPublicUrl(challengePath),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(content);
      setNotice("WHITEPAPER TEXT AND PUBLIC LINKS COPIED.");
    } catch {
      setNotice("CLIPBOARD UNAVAILABLE. DOWNLOAD THE MARKDOWN OR HTML DOCUMENT.");
    }
  }

  return (
    <div className="whitepaper-public-export">
      <div className="whitepaper-public-export__actions">
        <button className="button button--primary" type="button" onClick={downloadHtml}>DOWNLOAD HTML <span>↓</span></button>
        <button className="button button--outline" type="button" onClick={() => window.print()}>PRINT / SAVE AS PDF <span>↗</span></button>
        <button className="button button--quiet" type="button" onClick={downloadMarkdown}>DOWNLOAD MARKDOWN</button>
        <button className="button button--quiet" type="button" onClick={copyDocument}>COPY DOCUMENT + LINKS</button>
      </div>
      {notice && <p className="audit-notice" role="status">{notice}</p>}
    </div>
  );
}
