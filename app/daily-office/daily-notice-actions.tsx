"use client";

import { useState } from "react";

type DailyNoticeActionsProps = {
  title: string;
  text: string;
  url: string;
  xIntent: string;
};

export default function DailyNoticeActions({ title, text, url, xIntent }: DailyNoticeActionsProps) {
  const [notice, setNotice] = useState("");

  async function copyNotice() {
    const content = [title, text, url, "This is a fictional satirical bulletin, not current news or market data."].join("\n\n");
    try {
      await navigator.clipboard.writeText(content);
      setNotice("DAILY NOTICE AND LINK COPIED.");
    } catch {
      setNotice("CLIPBOARD UNAVAILABLE. USE THE X SHARE LINK INSTEAD.");
    }
  }

  async function shareNotice() {
    if (!navigator.share) {
      await copyNotice();
      return;
    }
    try {
      await navigator.share({ title, text, url });
    } catch {
      setNotice("SHARE CANCELLED. THE BULLETIN REMAINS FILED.");
    }
  }

  return (
    <div className="daily-notice-actions">
      <a className="button button--x" href={xIntent} target="_blank" rel="noopener noreferrer">POST BULLETIN TO X <span>↗</span></a>
      <button className="button button--outline" type="button" onClick={shareNotice}>SHARE BULLETIN <span>↗</span></button>
      <button className="button button--quiet" type="button" onClick={copyNotice}>COPY NOTICE + LINK</button>
      {notice && <p className="audit-notice" role="status">{notice}</p>}
    </div>
  );
}
