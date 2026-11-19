"use client";

import { useState } from "react";

type DepartmentPublicShareProps = {
  title: string;
  shareText: string;
  casePath: string;
};

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Continue with the compatibility fallback below.
    }
  }

  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.setAttribute("aria-hidden", "true");
  field.style.position = "fixed";
  field.style.opacity = "0";
  field.style.pointerEvents = "none";
  document.body.appendChild(field);
  field.focus();
  field.select();

  const copied = document.execCommand("copy");
  field.remove();

  if (!copied) {
    throw new Error("Clipboard access is unavailable.");
  }
}

export default function DepartmentPublicShare({
  title,
  shareText,
  casePath,
}: DepartmentPublicShareProps) {
  const [notice, setNotice] = useState("");

  function getPublicUrl() {
    return new URL(casePath, window.location.origin).toString();
  }

  async function copyShareText() {
    try {
      const url = getPublicUrl();
      await copyText(shareText + "\n\nPUBLIC CASE FILE: " + url);
      setNotice("CASE SUMMARY AND PUBLIC LINK COPIED.");
    } catch {
      setNotice("COPY UNAVAILABLE IN THIS BROWSER. YOU CAN STILL SHARE THE CASE ON X.");
    }
  }

  async function shareCase() {
    const url = getPublicUrl();

    if (!navigator.share) {
      await copyShareText();
      return;
    }

    try {
      await navigator.share({ title, text: shareText, url });
      setNotice("SHARE ACTION COMPLETED.");
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setNotice("SHARE CANCELLED. YOUR PUBLIC CASE REMAINS AVAILABLE.");
        return;
      }

      await copyShareText();
    }
  }

  function postToX() {
    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", shareText);
    intent.searchParams.set("url", getPublicUrl());
    window.open(intent.toString(), "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <button className="button button--outline" type="button" onClick={shareCase}>
        SHARE CASE <span aria-hidden="true">↗</span>
      </button>
      <button className="button button--quiet" type="button" onClick={copyShareText}>
        COPY CASE + LINK
      </button>
      <button className="button button--x" type="button" onClick={postToX}>
        POST TO X <span aria-hidden="true">↗</span>
      </button>
      {notice && (
        <p className="department-public-share__notice" role="status" aria-live="polite">
          {notice}
        </p>
      )}
    </>
  );
}
