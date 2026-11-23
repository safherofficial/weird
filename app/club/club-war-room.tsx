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
  buildClubCampaignArtworkPackFilename,
  buildClubCampaignArtworkZip,
  CLUB_CAMPAIGN_ARTWORK_FORMATS,
  CLUB_CAMPAIGN_ARTWORK_LAYOUTS,
  CLUB_CAMPAIGN_ARTWORK_SAFE_AREA,
  getClubCampaignArtworkFormat,
  getClubCampaignArtworkLayout,
  type ClubCampaignArtworkFormatId,
  type ClubCampaignArtworkLayoutId,
  type ClubCampaignArtworkPreflight,
  buildClubCampaignArtworkPreflight,
  buildClubCampaignArtworkComposition,
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
  format: ReturnType<typeof getClubCampaignArtworkFormat>,
  layout: ReturnType<typeof getClubCampaignArtworkLayout>,
): ClubCampaignArtworkPreflight {
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas rendering is unavailable in this browser.");

  const width = format.width;
  const height = format.height;
  const scale = width / 1200;
  const insetX = width * 0.06;
  const rightX = width - insetX;
  const contentWidth = width - insetX * 2;
  const y = (fraction: number) => height * fraction;

  canvas.width = width;
  canvas.height = height;

  const background = context.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#172018");
  background.addColorStop(0.55, "#090d0a");
  background.addColorStop(1, "#10170f");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  // One responsive editorial grid keeps the campaign identity consistent
  // while the headline and footer reflow for square, portrait and story canvases.
  const frameInset = width * 0.022;
  context.strokeStyle = "#718c58";
  context.lineWidth = 3 * scale;
  context.strokeRect(frameInset, frameInset, width - frameInset * 2, height - frameInset * 2);
  context.strokeStyle = "rgba(182,255,101,.2)";
  context.lineWidth = 2 * scale;
  context.beginPath();
  context.moveTo(insetX, y(0.125));
  context.lineTo(rightX, y(0.125));
  context.moveTo(insetX, y(0.865));
  context.lineTo(rightX, y(0.865));
  context.stroke();

  context.fillStyle = "#b6ff65";
  context.font = "700 " + 23 * scale + "px monospace";
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillText("THE 99% CLUB", insetX + 6 * scale, y(0.079));
  context.fillStyle = "#9aa895";
  context.textAlign = "right";
  context.font = "700 " + 13 * scale + "px monospace";
  context.fillText("CROSS-CHAIN CAMPAIGN SERIES", rightX - 6 * scale, y(0.068), contentWidth * 0.58);
  context.fillStyle = "#71836a";
  context.font = "700 " + 12 * scale + "px monospace";
  context.fillText("FORMAT / " + formatName.toUpperCase(), rightX - 6 * scale, y(0.096), contentWidth * 0.58);
  context.fillStyle = "#71836a";
  context.font = "700 " + 10 * scale + "px monospace";
  context.fillText("LAYOUT / " + layout.label, rightX - 6 * scale, y(0.114), contentWidth * 0.58);

  context.textAlign = "left";
  context.fillStyle = "#b6ff65";
  context.font = "700 " + 13 * scale + "px monospace";
  context.fillText(campaign ? "WEEKLY ISSUE / " + campaign.weekKey : "WEEKLY ISSUE / ALIGNING", insetX + 7 * scale, y(0.157), contentWidth * 0.86);
  context.fillStyle = "#edf1e7";
  context.font = "800 " + 25 * scale + "px Arial, sans-serif";
  const campaignTitle = campaign?.theme.title ?? "THE WEEKLY CAMPAIGN";
  const campaignTitleMaxWidth = contentWidth * 0.86;
  const campaignLines = wrapCanvasText(context, campaignTitle, campaignTitleMaxWidth, 2);
  let horizontalOverflow = campaignLines.some((line) => context.measureText(line).width > campaignTitleMaxWidth + 1);
  const campaignTitleClipped = campaignLines.some((line) => line.endsWith("…"));
  campaignLines.forEach((line, index) => context.fillText(line, insetX + 7 * scale, y(0.198) + index * 32 * scale, campaignTitleMaxWidth));
  context.strokeStyle = "#526744";
  context.lineWidth = 2 * scale;
  context.beginPath();
  context.moveTo(insetX, y(0.265));
  context.lineTo(rightX, y(0.265));
  context.stroke();

  const measureHeadline = (value: string) => {
    const maxLineWidth = contentWidth * 0.92;
    const maxBlockHeight = height * 0.235;
    const minimumFontSize = 44 * scale;
    let fontSize = 90 * scale;
    let lines: string[] = [];
    let lineHeight = fontSize * 1.16;
    let blockHeight = 0;
    let lineOverflow = false;

    while (true) {
      context.font = "900 " + fontSize + "px Arial, sans-serif";
      lines = wrapCanvasText(context, value.toUpperCase(), maxLineWidth, 4);
      lineHeight = fontSize * 1.16;
      const visualLineCount = Math.max(1, lines.length);
      blockHeight = (visualLineCount - 1) * lineHeight + fontSize * 1.2;
      lineOverflow = lines.some((line) => context.measureText(line).width > maxLineWidth + 1);
      const clipped = lines.some((line) => line.endsWith("…"));
      if ((!clipped && !lineOverflow && blockHeight <= maxBlockHeight) || fontSize <= minimumFontSize) break;
      fontSize = Math.max(minimumFontSize, fontSize - 4 * scale);
    }

    context.font = "900 " + fontSize + "px Arial, sans-serif";
    const visualLineCount = Math.max(1, lines.length);
    lineHeight = fontSize * 1.16;
    blockHeight = (visualLineCount - 1) * lineHeight + fontSize * 1.2;
    lineOverflow = lines.some((line) => context.measureText(line).width > maxLineWidth + 1);
    return {
      lines,
      lineCount: visualLineCount,
      fontSize,
      lineHeight,
      blockHeight,
      clipped: lines.some((line) => line.endsWith("…")),
      horizontalOverflow: lineOverflow,
    };
  };

  const topMeasured = measureHeadline(topText);
  const bottomMeasured = measureHeadline(bottomText);
  const composition = buildClubCampaignArtworkComposition(
    format.id,
    topMeasured.lineCount,
    bottomMeasured.lineCount,
    topMeasured.fontSize,
    bottomMeasured.fontSize,
    layout.id,
  );

  const drawBlock = (
    measured: ReturnType<typeof measureHeadline>,
    centerY: number,
    accent: boolean,
    anchorX: number,
    textAlign: "left" | "center" | "right",
  ) => {
    const firstY = centerY - ((measured.lines.length - 1) * measured.lineHeight) / 2;
    context.font = "900 " + measured.fontSize + "px Arial, sans-serif";
    context.textAlign = textAlign;
    context.textBaseline = "middle";
    if (layout.id === "left-editorial") {
      context.fillStyle = accent ? "#b6ff65" : "#526744";
      context.fillRect(insetX + 2 * scale, centerY - measured.blockHeight / 2, 4 * scale, measured.blockHeight);
    }
    context.fillStyle = accent ? "#b6ff65" : "#f1f3eb";
    measured.lines.forEach((line, index) => {
      context.fillText(line, anchorX, firstY + index * measured.lineHeight, contentWidth * 0.92);
    });
    const top = centerY - measured.blockHeight / 2;
    const bottom = centerY + measured.blockHeight / 2;
    return {
      clipped: measured.clipped,
      horizontalOverflow: measured.horizontalOverflow,
      outsideSafeArea: top < composition.safeBounds.top || bottom > composition.safeBounds.bottom,
      fontSize: measured.fontSize,
      lineCount: measured.lineCount,
    };
  };

  const topAudit = drawBlock(
    topMeasured,
    composition.topCenterY,
    false,
    composition.topAnchorX,
    composition.topTextAlign,
  );
  context.fillStyle = "#526744";
  context.fillRect(
    composition.separatorX,
    composition.separatorY - 2.5 * scale,
    composition.separatorWidth,
    5 * scale,
  );
  const bottomAudit = drawBlock(
    bottomMeasured,
    composition.bottomCenterY,
    true,
    composition.bottomAnchorX,
    composition.bottomTextAlign,
  );

  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillStyle = "#a4b09d";
  context.font = "700 " + 17 * scale + "px monospace";
  context.fillText("IT'S NEVER OUR FAULT.", insetX + 6 * scale, y(0.895), contentWidth * 0.46);
  context.textAlign = "right";
  context.fillStyle = "#b6ff65";
  context.fillText("THE NEXT ONE IS MINE.", rightX - 6 * scale, y(0.895), contentWidth * 0.46);
  context.textAlign = "center";
  context.fillStyle = "#74836d";
  context.font = "700 " + 13 * scale + "px monospace";
  const footerText = "SATIRE / ALL CHAINS / " + CLUB_SOCIAL_HASHTAGS;
  const footerMaxWidth = contentWidth * 0.9;
  if (context.measureText(footerText).width > footerMaxWidth + 1) horizontalOverflow = true;
  context.fillText(footerText, width / 2, y(0.94), footerMaxWidth);

  return buildClubCampaignArtworkPreflight(format.id, {
    campaignTitleClipped,
    topTextClipped: topAudit.clipped,
    bottomTextClipped: bottomAudit.clipped,
    horizontalOverflow: horizontalOverflow || topAudit.horizontalOverflow || bottomAudit.horizontalOverflow,
    outsideSafeArea: !composition.withinSafeArea || topAudit.outsideSafeArea || bottomAudit.outsideSafeArea,
    topTextEmpty: topText.trim().length === 0,
    bottomTextEmpty: bottomText.trim().length === 0,
    smallestHeadlineFontPx: Math.min(topAudit.fontSize, bottomAudit.fontSize),
  });
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
  const preflightCanvasRefs = useRef<Partial<Record<ClubCampaignArtworkFormatId, HTMLCanvasElement>>>({});
  const [packagePreflight, setPackagePreflight] = useState<ClubCampaignArtworkPreflight[] | null>(null);
  const [selectedId, setSelectedId] = useState(initialTemplate.id);
  const [artworkFormatId, setArtworkFormatId] = useState<ClubCampaignArtworkFormatId>("square");
  const [artworkLayoutId, setArtworkLayoutId] = useState<ClubCampaignArtworkLayoutId>("centered");
  const [showSafeArea, setShowSafeArea] = useState(false);
  const artworkFormat = getClubCampaignArtworkFormat(artworkFormatId);
  const artworkLayout = getClubCampaignArtworkLayout(artworkLayoutId);
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
  const selectedPreflight = packagePreflight?.find((item) => item.formatId === artworkFormatId);
  const packageReady = Boolean(
    campaign
    && packagePreflight?.length === CLUB_CAMPAIGN_ARTWORK_FORMATS.length
    && packagePreflight.every((item) => item.ready),
  );

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
      drawMeme(canvasRef.current, topText, bottomText, campaign, selectedTemplate.name, artworkFormat, artworkLayout);
      const reports = CLUB_CAMPAIGN_ARTWORK_FORMATS.map((format) => {
        const previewCanvas = document.createElement("canvas");
        const report = drawMeme(previewCanvas, topText, bottomText, campaign, selectedTemplate.name, format, artworkLayout);
        const thumbnail = preflightCanvasRefs.current[format.id];
        if (thumbnail) {
          thumbnail.width = format.width;
          thumbnail.height = format.height;
          const thumbnailContext = thumbnail.getContext("2d");
          thumbnailContext?.drawImage(previewCanvas, 0, 0);
        }
        return report;
      });
      setPackagePreflight(reports);
    } catch {
      setPackagePreflight(null);
      setNotice("MEME PREVIEW OR PREFLIGHT UNAVAILABLE. YOUR BROWSER MAY NOT SUPPORT CANVAS.");
    }
  }, [topText, bottomText, campaign, selectedTemplate.name, artworkFormat, artworkLayout]);

  function selectTemplate(template: ClubMemeTemplate) {
    setSelectedId(template.id);
    setTopText(template.topText);
    setBottomText(template.bottomText);
    setNotice("");
  }

  async function getMemeFile() {
    if (!canvasRef.current) throw new Error("The meme preview is not ready yet.");
    if (!selectedPreflight?.ready) throw new Error("The selected format did not pass the export preflight.");
    const blob = await canvasBlob(canvasRef.current);
    return new File([blob], campaign
      ? buildClubCampaignArtworkFilename(campaign, artworkFormat.id, artworkLayout.id)
      : "the-99-percent-club-weekly-draft-" + artworkFormat.id + "-" + artworkLayout.id + ".png", { type: "image/png" });
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


  async function downloadArtworkPack() {
    if (!campaign) return;
    if (!packageReady) {
      setNotice("PACK BLOCKED. REVIEW THE THREE-FORMAT PREFLIGHT AND FIX THE FLAGGED TEXT.");
      return;
    }
    setBusy(true);
    try {
      const rendered = await Promise.all(CLUB_CAMPAIGN_ARTWORK_FORMATS.map(async (format) => {
        const exportCanvas = document.createElement("canvas");
        const audit = drawMeme(exportCanvas, topText, bottomText, campaign, selectedTemplate.name, format, artworkLayout);
        const png = await canvasBlob(exportCanvas);
        return {
          audit,
          entry: {
            name: buildClubCampaignArtworkFilename(campaign, format.id, artworkLayout.id),
            bytes: new Uint8Array(await png.arrayBuffer()),
          },
        };
      }));
      const failedAudits = rendered.filter((item) => !item.audit.ready);
      if (failedAudits.length > 0) {
        setPackagePreflight(rendered.map((item) => item.audit));
        setNotice("PACK BLOCKED. ONE OR MORE FORMATS FAILED THE FINAL RENDER CHECK.");
        return;
      }
      const entries = rendered.map((item) => item.entry);
      const archive = buildClubCampaignArtworkZip(entries);
      const archiveBuffer = new ArrayBuffer(archive.byteLength);
      new Uint8Array(archiveBuffer).set(archive);
      const file = new Blob([archiveBuffer], { type: "application/zip" });
      const url = URL.createObjectURL(file);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = buildClubCampaignArtworkPackFilename(campaign, artworkLayout.id);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      setNotice("CAMPAIGN PACK EXPORTED. ONE ZIP, THREE PNG FORMATS. ALL GENERATED LOCALLY.");
    } catch {
      setNotice("CAMPAIGN PACK EXPORT FAILED. THE INDIVIDUAL PNG DOWNLOADS REMAIN AVAILABLE.");
    } finally {
      setBusy(false);
    }
  }

  async function shareMeme() {
    setBusy(true);
    try {
      const file = await getMemeFile();
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "THE 99% CLUB / " + artworkFormat.label, text: caption });
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
          <p>The active weekly campaign is stamped into every export. Choose a layout, rewrite the headline and export a campaign-ready PNG in square feed, portrait feed or full-screen story dimensions.</p>
          {campaign && <div className="club-meme-studio__campaign-edition"><span>WEEKLY CAMPAIGN / {campaign.weekKey}</span><strong>{campaign.theme.title}</strong><small>{campaign.theme.brief}</small></div>}
        </div>
        <div className="club-meme-studio__templates" role="group" aria-label="Choose a meme template">
          {CLUB_MEME_TEMPLATES.map((template) => (
            <button type="button" key={template.id} className={selectedId === template.id ? "is-active" : ""} aria-pressed={selectedId === template.id} onClick={() => selectTemplate(template)}>
              <span>{template.category}</span><strong>{template.name}</strong>
            </button>
          ))}
        </div>
        <div className="club-meme-studio__formats" role="group" aria-label="Choose an artwork export format">
          {CLUB_CAMPAIGN_ARTWORK_FORMATS.map((format) => (
            <button
              type="button"
              key={format.id}
              className={artworkFormatId === format.id ? "is-active" : ""}
              aria-pressed={artworkFormatId === format.id}
              onClick={() => setArtworkFormatId(format.id)}
            >
              <span>{format.ratio} / {format.description}</span>
              <strong>{format.label}</strong>
              <small>{format.dimensions} PX</small>
            </button>
          ))}
        </div>
        <div className="club-meme-studio__layouts" role="group" aria-label="Choose an artwork composition">
          {CLUB_CAMPAIGN_ARTWORK_LAYOUTS.map((layout) => (
            <button
              type="button"
              key={layout.id}
              className={artworkLayoutId === layout.id ? "is-active" : ""}
              aria-pressed={artworkLayoutId === layout.id}
              onClick={() => {
                setPackagePreflight(null);
                setArtworkLayoutId(layout.id);
              }}
            >
              <span>{layout.description}</span>
              <strong>{layout.label}</strong>
            </button>
          ))}
        </div>
        <section className="club-meme-studio__preflight" aria-labelledby="club-meme-studio-preflight-title" aria-live="polite">
          <div className="club-meme-studio__preflight-heading">
            <span>U38 / PACKAGE QUALITY CONTROL</span>
            <strong id="club-meme-studio-preflight-title">
              {packagePreflight
                ? packageReady ? "ALL THREE FORMATS PASSED" : "REVIEW REQUIRED BEFORE EXPORT"
                : "RENDERING THREE FORMAT CHECKS"}
            </strong>
          </div>
          <div className="club-meme-studio__preflight-grid">
            {CLUB_CAMPAIGN_ARTWORK_FORMATS.map((format) => {
              const report = packagePreflight?.find((item) => item.formatId === format.id);
              return (
                <article key={format.id} className={report?.ready ? "is-ready" : report ? "has-issues" : "is-checking"}>
                  <header>
                    <strong>{format.label}</strong>
                    <span>{report ? report.ready ? "PASS" : "FIX" : "CHECKING"}</span>
                  </header>
                  <canvas
                    ref={(node) => {
                      if (node) preflightCanvasRefs.current[format.id] = node;
                      else delete preflightCanvasRefs.current[format.id];
                    }}
                    width={format.width}
                    height={format.height}
                    style={{ aspectRatio: format.width + " / " + format.height }}
                    aria-label={format.label + " campaign artwork quality preview"}
                  />
                  <small>{report ? report.issues.length ? report.issues.join(" ") : "Text bounds, truncation and headline readability passed." : "Rendering and measuring this campaign artwork."}</small>
                </article>
              );
            })}
          </div>
          <p className="club-meme-studio__preflight-note">ALL THREE PNGS ARE RENDERED AND CHECKED LOCALLY. EXPORT BUTTONS STAY LOCKED UNTIL THEIR FORMAT CHECKS PASS.</p>
        </section>
        <div className="club-meme-studio__editor">
          <div className="club-meme-studio__fields">
            <label>TOP LINE / <span>{topText.length}/100</span>
              <textarea value={topText} maxLength={100} rows={3} onChange={(event) => setTopText(event.target.value)} />
            </label>
            <label>BOTTOM LINE / <span>{bottomText.length}/100</span>
              <textarea value={bottomText} maxLength={100} rows={3} onChange={(event) => setBottomText(event.target.value)} />
            </label>
            <div className="club-meme-studio__actions">
              <button type="button" className="button button--primary" onClick={() => void downloadMeme()} disabled={busy || !campaign || !selectedPreflight?.ready}>DOWNLOAD PNG ↓</button>
              <button type="button" className="button button--outline" onClick={() => void downloadArtworkPack()} disabled={busy || !packageReady}>DOWNLOAD ALL 3 / ZIP ↓</button>
              <button type="button" className="button button--outline" onClick={() => void shareMeme()} disabled={busy || !campaign || !selectedPreflight?.ready}>SHARE IMAGE ↗</button>
              <button type="button" className="button button--quiet" onClick={() => void copyCaption()}>COPY CAPTION</button>
              <button type="button" className="button button--x" onClick={openMemeOnX} disabled={!campaign}>OPEN X DRAFT ↗</button>
            </div>
          </div>
          <div className="club-meme-studio__preview">
            <div className="club-meme-studio__preview-heading">
              <span>LIVE PREVIEW / {artworkFormat.label} / {artworkFormat.dimensions} PX / {campaign ? campaign.weekKey : "ALIGNING CAMPAIGN"}</span>
              <button
                type="button"
                className={showSafeArea ? "is-active" : ""}
                aria-pressed={showSafeArea}
                onClick={() => setShowSafeArea((visible) => !visible)}
              >
                SAFE AREA / {showSafeArea ? "ON" : "OFF"}
              </button>
            </div>
            <div className="club-meme-studio__preview-frame">
              <canvas
                ref={canvasRef}
                width={artworkFormat.width}
                height={artworkFormat.height}
                style={{ aspectRatio: artworkFormat.width + " / " + artworkFormat.height }}
                aria-label={"Meme preview (" + artworkFormat.label + "): " + topText + " " + bottomText}
              />
              {showSafeArea && (
                <div
                  className="club-meme-studio__safe-area-guide"
                  aria-hidden="true"
                  style={{
                    left: (CLUB_CAMPAIGN_ARTWORK_SAFE_AREA.horizontalInset * 100) + "%",
                    right: (CLUB_CAMPAIGN_ARTWORK_SAFE_AREA.horizontalInset * 100) + "%",
                    top: (CLUB_CAMPAIGN_ARTWORK_SAFE_AREA.top * 100) + "%",
                    height: ((CLUB_CAMPAIGN_ARTWORK_SAFE_AREA.bottom - CLUB_CAMPAIGN_ARTWORK_SAFE_AREA.top) * 100) + "%",
                  }}
                >
                  <span>HEADLINE SAFE AREA / NOT EXPORTED</span>
                </div>
              )}
            </div>
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
