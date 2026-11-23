"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CLUB_MEME_TEMPLATES,
  CLUB_PUBLIC_CHALLENGES,
  type ClubMemeTemplate,
  type ClubPublicChallenge,
} from "./club-war-room-data";
import { getClubCampaignDrop, type ClubCampaignDrop } from "./club-campaign-engine";
import {
  buildClubCampaignArtworkCaption,
  buildClubCampaignArtworkFilename,
} from "./club-campaign-artwork-engine";
import { CLUB_SOCIAL_HASHTAGS } from "./club-social";

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Use the compatibility fallback below.
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
  if (!copied) throw new Error("Clipboard access is unavailable.");
}

function wrapCanvasText(
  context: CanvasRenderingContext2D,
  value: string,
  maxWidth: number,
  maxLines: number,
) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? line + " " + word : word;
    if (context.measureText(candidate).width <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const clipped = lines.slice(0, maxLines);
    let last = clipped[maxLines - 1];
    while (last.length > 0 && context.measureText(last + "…").width > maxWidth) {
      last = last.slice(0, -1);
    }
    clipped[maxLines - 1] = last.trimEnd() + "…";
    return clipped;
  }
  return lines;
}

function drawMeme(
  canvas: HTMLCanvasElement,
  topText: string,
  bottomText: string,
  campaign: ClubCampaignDrop | null,
  formatName: string,
) {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas rendering is unavailable in this browser.");

  canvas.width = 1200;
  canvas.height = 1200;
  const background = context.createLinearGradient(0, 0, 1200, 1200);
  background.addColorStop(0, "#172018");
  background.addColorStop(0.55, "#090d0a");
  background.addColorStop(1, "#10170f");
  context.fillStyle = background;
  context.fillRect(0, 0, 1200, 1200);

  // A consistent editorial frame makes every exported format recognizable as
  // part of the current cross-chain Club campaign.
  context.strokeStyle = "#718c58";
  context.lineWidth = 3;
  context.strokeRect(26, 26, 1148, 1148);
  context.strokeStyle = "rgba(182,255,101,.2)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(70, 145);
  context.lineTo(1130, 145);
  context.moveTo(70, 1025);
  context.lineTo(1130, 1025);
  context.stroke();

  context.fillStyle = "#b6ff65";
  context.font = "700 23px monospace";
  context.textAlign = "left";
  context.fillText("THE 99% CLUB", 76, 95);
  context.fillStyle = "#9aa895";
  context.textAlign = "right";
  context.font = "700 13px monospace";
  context.fillText("CROSS-CHAIN CAMPAIGN SERIES", 1124, 82);
  context.fillStyle = "#71836a";
  context.font = "700 12px monospace";
  context.fillText("FORMAT / " + formatName.toUpperCase(), 1124, 111);

  // The campaign issue strip is generated from the same weekly rotation as
  // the editorial post and public challenge; no campaign date is hardcoded.
  context.textAlign = "left";
  context.fillStyle = "#b6ff65";
  context.font = "700 13px monospace";
  context.fillText(campaign ? "WEEKLY ISSUE / " + campaign.weekKey : "WEEKLY ISSUE / ALIGNING", 78, 183);
  context.fillStyle = "#edf1e7";
  context.font = "800 25px Arial, sans-serif";
  const campaignTitle = campaign?.theme.title ?? "THE WEEKLY CAMPAIGN";
  const campaignLines = wrapCanvasText(context, campaignTitle, 900, 2);
  campaignLines.forEach((line, index) => context.fillText(line, 78, 225 + index * 32, 900));
  context.strokeStyle = "#526744";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(70, 292);
  context.lineTo(1130, 292);
  context.stroke();

  const drawBlock = (value: string, centerY: number, accent: boolean) => {
    let fontSize = 70;
    let lines: string[] = [];
    do {
      context.font = "900 " + fontSize + "px Arial, sans-serif";
      lines = wrapCanvasText(context, value.toUpperCase(), 980, 4);
      if (lines.length <= 3 || fontSize <= 48) break;
      fontSize -= 4;
    } while (fontSize >= 48);

    const lineHeight = fontSize * 1.18;
    const firstY = centerY - ((lines.length - 1) * lineHeight) / 2;
    context.font = "900 " + fontSize + "px Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = accent ? "#b6ff65" : "#f1f3eb";
    lines.forEach((line, index) => context.fillText(line, 600, firstY + index * lineHeight, 1000));
  };

  drawBlock(topText, 445, false);
  context.fillStyle = "#526744";
  context.fillRect(520, 615, 160, 5);
  drawBlock(bottomText, 805, true);

  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillStyle = "#a4b09d";
  context.font = "700 17px monospace";
  context.fillText("IT'S NEVER OUR FAULT.", 76, 1082);
  context.textAlign = "right";
  context.fillStyle = "#b6ff65";
  context.fillText("THE NEXT ONE IS MINE.", 1124, 1082);
  context.textAlign = "center";
  context.fillStyle = "#74836d";
  context.font = "700 13px monospace";
  context.fillText("SATIRE / ALL CHAINS / " + CLUB_SOCIAL_HASHTAGS, 600, 1132, 1040);
}

function canvasBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("The meme image could not be exported."));
    }, "image/png");
  });
}

export default function ClubWarRoom() {
  const initialTemplate = CLUB_MEME_TEMPLATES[0];
  const [campaign, setCampaign] = useState<ClubCampaignDrop | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedId, setSelectedId] = useState(initialTemplate.id);
  const [topText, setTopText] = useState(initialTemplate.topText);
  const [bottomText, setBottomText] = useState(initialTemplate.bottomText);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const selectedTemplate = useMemo(
    () => CLUB_MEME_TEMPLATES.find((template) => template.id === selectedId) ?? initialTemplate,
    [selectedId, initialTemplate],
  );
  const caption = campaign
    ? buildClubCampaignArtworkCaption(selectedTemplate, campaign)
    : selectedTemplate.caption + " " + CLUB_SOCIAL_HASHTAGS;

  useEffect(() => {
    const current = getClubCampaignDrop(new Date());
    setCampaign(current);
    setSelectedId(current.memeTemplate.id);
    setTopText(current.memeTemplate.topText);
    setBottomText(current.memeTemplate.bottomText);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    try {
      drawMeme(canvasRef.current, topText, bottomText, campaign, selectedTemplate.name);
    } catch {
      setNotice("MEME PREVIEW UNAVAILABLE. YOUR BROWSER MAY NOT SUPPORT CANVAS.");
    }
  }, [topText, bottomText, campaign, selectedTemplate.name]);

  function selectTemplate(template: ClubMemeTemplate) {
    setSelectedId(template.id);
    setTopText(template.topText);
    setBottomText(template.bottomText);
    setNotice("");
  }

  async function getMemeFile() {
    if (!canvasRef.current) throw new Error("The meme preview is not ready yet.");
    const blob = await canvasBlob(canvasRef.current);
    return new File([blob], campaign ? buildClubCampaignArtworkFilename(campaign) : "the-99-percent-club-weekly-draft.png", { type: "image/png" });
  }

  async function downloadMeme() {
    setBusy(true);
    try {
      const file = await getMemeFile();
      const url = URL.createObjectURL(file);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = file.name;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice("PNG EXPORTED. ATTACH IT TO YOUR X POST. THE DEPARTMENT CANNOT UPLOAD IT FOR YOU.");
    } catch {
      setNotice("PNG EXPORT FAILED. TRY A DIFFERENT BROWSER OR DOWNLOAD THE PAGE PREVIEW.");
    } finally {
      setBusy(false);
    }
  }

  async function shareMeme() {
    setBusy(true);
    try {
      const file = await getMemeFile();
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "THE 99% CLUB MEME", text: caption });
        setNotice("MEME SHARED THROUGH YOUR DEVICE'S SHARE MENU.");
      } else {
        const url = URL.createObjectURL(file);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = file.name;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        setNotice("IMAGE DOWNLOADED. ATTACH THE PNG MANUALLY WHEN YOU POST TO X.");
      }
    } catch (error) {
      setNotice(error instanceof Error && error.name === "AbortError" ? "SHARE CANCELLED. YOUR MEME REMAINS IN THE WAR ROOM." : "IMAGE SHARING IS UNAVAILABLE. USE DOWNLOAD PNG INSTEAD.");
    } finally {
      setBusy(false);
    }
  }

  async function copyCaption() {
    try {
      await copyText(caption);
      setNotice("MEME CAPTION COPIED. ADD THE PNG TO YOUR POST WHEN READY.");
    } catch {
      setNotice("COPY UNAVAILABLE. SELECT THE CAPTION AND COPY IT MANUALLY.");
    }
  }

  function openMemeOnX() {
    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", caption);
    intent.searchParams.set("url", new URL("/club#club-meme-studio", window.location.origin).toString());
    window.open(intent.toString(), "_blank", "noopener,noreferrer");
    setNotice("X DRAFT OPENED. ATTACH YOUR DOWNLOADED PNG BEFORE PUBLISHING.");
  }

  async function copyChallenge(challenge: ClubPublicChallenge) {
    const publicUrl = new URL("/club#club-challenge-board", window.location.origin).toString();
    try {
      await copyText(challenge.postText + "\n\n" + publicUrl);
      setNotice("CHALLENGE AND PUBLIC CLUB LINK COPIED.");
    } catch {
      setNotice("COPY UNAVAILABLE. OPEN THE CHALLENGE ON X OR SELECT ITS TEXT MANUALLY.");
    }
  }

  function postChallenge(challenge: ClubPublicChallenge) {
    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", challenge.postText);
    intent.searchParams.set("url", new URL("/club#club-challenge-board", window.location.origin).toString());
    window.open(intent.toString(), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="club-war-room" id="club-war-room" aria-labelledby="club-war-room-title">
      <header className="club-war-room__header">
        <div>
          <span>THE 99% CLUB / COMMUNITY WAR ROOM</span>
          <h2 id="club-war-room-title">TAKE THE EXCUSE <em>PUBLIC.</em></h2>
          <p>Make the meme. Launch the challenge. Keep the conviction. The Department provides the ammunition; the timeline provides the jury.</p>
        </div>
        <div className="club-war-room__stamp"><strong>NO UTILITY</strong><span>MAXIMUM<br />CONVICTION</span></div>
      </header>

      <section className="club-meme-studio" id="club-meme-studio" aria-labelledby="club-meme-studio-title">
        <div className="club-meme-studio__intro">
          <span>01 / THE MEME OFFICE</span>
          <h3 id="club-meme-studio-title">YOUR EXCUSE. <em>YOUR MASTERPIECE.</em></h3>
          <p>The active weekly campaign is stamped into every export. Choose a format, rewrite the headline and export a branded 1200 × 1200 PNG in this browser.</p>
          {campaign && <div className="club-meme-studio__campaign-edition"><span>WEEKLY CAMPAIGN / {campaign.weekKey}</span><strong>{campaign.theme.title}</strong><small>{campaign.theme.brief}</small></div>}
        </div>
        <div className="club-meme-studio__templates" role="group" aria-label="Choose a meme template">
          {CLUB_MEME_TEMPLATES.map((template) => (
            <button type="button" key={template.id} className={selectedId === template.id ? "is-active" : ""} aria-pressed={selectedId === template.id} onClick={() => selectTemplate(template)}>
              <span>{template.category}</span><strong>{template.name}</strong>
            </button>
          ))}
        </div>
        <div className="club-meme-studio__editor">
          <div className="club-meme-studio__fields">
            <label>TOP LINE / <span>{topText.length}/100</span>
              <textarea value={topText} maxLength={100} rows={3} onChange={(event) => setTopText(event.target.value)} />
            </label>
            <label>BOTTOM LINE / <span>{bottomText.length}/100</span>
              <textarea value={bottomText} maxLength={100} rows={3} onChange={(event) => setBottomText(event.target.value)} />
            </label>
            <div className="club-meme-studio__actions">
              <button type="button" className="button button--primary" onClick={() => void downloadMeme()} disabled={busy || !campaign}>DOWNLOAD PNG ↓</button>
              <button type="button" className="button button--outline" onClick={() => void shareMeme()} disabled={busy || !campaign}>SHARE IMAGE ↗</button>
              <button type="button" className="button button--quiet" onClick={() => void copyCaption()}>COPY CAPTION</button>
              <button type="button" className="button button--x" onClick={openMemeOnX}disabled={!campaign}>OPEN X DRAFT ↗</button>
            </div>
          </div>
          <div className="club-meme-studio__preview">
            <span>LIVE PREVIEW / {campaign ? campaign.weekKey + " / CAMPAIGN EDITION" : "ALIGNING CAMPAIGN EDITION"}</span>
            <canvas ref={canvasRef} width={1200} height={1200} aria-label={"Meme preview: " + topText + " " + bottomText} />
          </div>
        </div>
        <p className="club-meme-studio__disclaimer">THE IMAGE IS GENERATED LOCALLY AND IS NOT UPLOADED OR SAVED TO A SERVER. X DRAFTS OPEN WITHOUT ATTACHING THE IMAGE; DOWNLOAD THE PNG AND ADD IT TO YOUR POST.</p>
      </section>

      <section className="club-challenge-board" id="club-challenge-board" aria-labelledby="club-challenge-board-title">
        <header>
          <div><span>02 / PUBLIC CHALLENGE BOARD</span><h3 id="club-challenge-board-title">THE TIMELINE <em>IS SUMMONED.</em></h3><p>{CLUB_PUBLIC_CHALLENGES.length} open invitations for the trenches. Replies happen publicly on X, not in a hidden website inbox.</p></div>
          <strong>{String(CLUB_PUBLIC_CHALLENGES.length).padStart(2, "0")} <small>OPEN FILES</small></strong>
        </header>
        <div className="club-challenge-board__grid">
          {CLUB_PUBLIC_CHALLENGES.map((challenge) => (
            <article className="club-public-challenge" key={challenge.id}>
              <div className="club-public-challenge__topline"><span>{challenge.code}</span><span>OPEN CHALLENGE</span></div>
              <h4>{challenge.title}</h4>
              <p>{challenge.brief}</p>
              <blockquote>{challenge.prompt}</blockquote>
              <div className="club-public-challenge__actions">
                <button type="button" className="button button--primary" onClick={() => postChallenge(challenge)}>POST CHALLENGE TO X ↗</button>
                <button type="button" className="button button--quiet" onClick={() => void copyChallenge(challenge)}>COPY CHALLENGE + LINK</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {notice && <p className="audit-notice" role="status" aria-live="polite">{notice}</p>}
      <p className="club-war-room__disclaimer">SATIRE ONLY. DO NOT SHARE PRIVATE WALLET DETAILS, PERSONAL FINANCIAL INFORMATION OR REAL PNL SCREENSHOTS. NO POSTS ARE AUTO-PUBLISHED; NO PUBLIC REPLIES ARE COLLECTED OR STORED HERE. NO PROMISE OF REACH, ENGAGEMENT OR FINANCIAL OUTCOME.</p>
    </section>
  );
}
