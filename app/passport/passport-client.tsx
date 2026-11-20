"use client";

import { useEffect, useState } from "react";
import AchievementEmblem from "./achievement-emblem";
import { ACHIEVEMENT_BADGE_ASSETS } from "./badge-assets";
import {
  DEPARTMENT_STAMPS,
  PASSPORT_ACHIEVEMENTS,
  getPassportAchievementStatuses,
  readPassport,
  enablePassport,
  deletePassport,
  type PassportData,
  type PassportAchievementStatus,
} from "./passport-store";

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&apos;",
    };
    return entities[char];
  });
}

function rarityColor(rarity: PassportAchievementStatus["rarity"]) {
  if (rarity === "LEGENDARY") return "#e7c17c";
  if (rarity === "RARE") return "#8fc6e8";
  if (rarity === "UNCOMMON") return "#c4a46c";
  return "#b6ff65";
}

function makePassportSvg(data: PassportData, statuses: PassportAchievementStatus[], assetBaseUrl: string) {
  const visited = new Set(data.visitedDepartments);
  const unlockedCount = statuses.filter((item) => item.earned).length;
  const stampLines = DEPARTMENT_STAMPS.map((stamp, index) => {
    const column = index < 5 ? 0 : 1;
    const row = index % 5;
    const x = column === 0 ? 72 : 720;
    const y = 256 + row * 55;
    const earned = visited.has(stamp.id);
    const color = earned ? "#b6ff65" : "#657061";
    return (
      '<rect x="' + x + '" y="' + y + '" width="608" height="43" fill="' + (earned ? "#172216" : "#101510") + '" stroke="' + (earned ? "#526b43" : "#30382f") + '"/>' +
      '<text x="' + (x + 15) + '" y="' + (y + 18) + '" fill="' + color + '" font-family="monospace" font-size="10">' + stamp.number + " / " + escapeXml(stamp.title) + '</text>' +
      '<text x="' + (x + 15) + '" y="' + (y + 33) + '" fill="' + (earned ? "#a8c795" : "#66705f") + '" font-family="monospace" font-size="8">' + (earned ? "STAMPED / " + escapeXml(stamp.label) : "NOT YET VISITED") + '</text>' +
      '<text x="' + (x + 582) + '" y="' + (y + 29) + '" text-anchor="end" fill="' + color + '" font-family="monospace" font-size="15">' + (earned ? "✓" : "—") + '</text>'
    );
  }).join("");
  const badgeLines = statuses.map((item, index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const x = 72 + column * 432;
    const y = 635 + row * 105;
    const color = item.earned ? rarityColor(item.rarity) : "#66705f";
    const label = item.earned ? "UNLOCKED / " + item.rarity : "LOCKED / " + item.progress + " OF " + item.target;
    const imageHref = escapeXml(assetBaseUrl + ACHIEVEMENT_BADGE_ASSETS[item.id]);
    return (
      '<rect x="' + x + '" y="' + y + '" width="408" height="84" fill="' + (item.earned ? "#172016" : "#101510") + '" stroke="' + (item.earned ? color : "#30382f") + '"/>' +
      '<image href="' + imageHref + '" x="' + (x + 3) + '" y="' + (y + 4) + '" width="76" height="76" preserveAspectRatio="xMidYMid meet" opacity="' + (item.earned ? "1" : ".36") + '"/>' +
      '<text x="' + (x + 86) + '" y="' + (y + 35) + '" fill="' + (item.earned ? "#f0f0e9" : "#929b8d") + '" font-family="monospace" font-size="11">' + escapeXml(item.title) + '</text>' +
      '<text x="' + (x + 86) + '" y="' + (y + 56) + '" fill="' + color + '" font-family="monospace" font-size="8">' + label + '</text>'
    );
  }).join("");

  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1130" viewBox="0 0 1400 1130">' +
    '<rect width="1400" height="1130" fill="#090b09"/><rect x="28" y="28" width="1344" height="1074" fill="none" stroke="#384137" stroke-width="2"/>' +
    '<path d="M28 110H1372M28 215H1372M28 590H1372" stroke="#384137"/>' +
    '<text x="72" y="76" fill="#b6ff65" font-family="monospace" font-size="24" font-weight="bold">THE DYOR DEPARTMENT</text>' +
    '<text x="1328" y="76" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="13">PERSONAL DEPARTMENT PASSPORT</text>' +
    '<text x="72" y="166" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="43" font-weight="900">THE DEPARTMENT PASSPORT</text>' +
    '<text x="72" y="193" fill="#8d968a" font-family="monospace" font-size="12">' + visited.size + ' / 10 DEPARTMENTS VISITED  •  ' + unlockedCount + ' / ' + statuses.length + ' ACHIEVEMENT BADGES UNLOCKED</text>' +
    '<text x="72" y="246" fill="#b6ff65" font-family="monospace" font-size="11" font-weight="bold">01 / DEPARTMENT STAMPS — VISITS</text>' + stampLines +
    '<text x="72" y="620" fill="#b6ff65" font-family="monospace" font-size="11" font-weight="bold">02 / ACHIEVEMENT BADGES — COMPLETED EXPERIENCES &amp; CHALLENGES</text>' + badgeLines +
    '<text x="1328" y="1080" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="9">LOCAL RECORD / FICTIONAL ACHIEVEMENTS / NO FINANCIAL VALUE</text>' +
    '</svg>'
  );
}

function makeAchievementCollectionSvg(statuses: PassportAchievementStatus[], assetBaseUrl: string) {
  const unlocked = statuses.filter((item) => item.earned).length;
  const cards = statuses.map((item, index) => {
    const column = index % 3;
    const row = Math.floor(index / 3);
    const x = 70 + column * 430;
    const y = 220 + row * 175;
    const color = item.earned ? rarityColor(item.rarity) : "#66705f";
    const progressWidth = Math.round((item.progress / item.target) * 280);
    const imageHref = escapeXml(assetBaseUrl + ACHIEVEMENT_BADGE_ASSETS[item.id]);
    return (
      '<rect x="' + x + '" y="' + y + '" width="398" height="150" fill="' + (item.earned ? "#141d12" : "#101510") + '" stroke="' + (item.earned ? color : "#30382f") + '" stroke-width="' + (item.earned ? 2 : 1) + '"/>' +
      '<circle cx="' + (x + 72) + '" cy="' + (y + 75) + '" r="62" fill="#0a0d0a" stroke="' + color + '" stroke-opacity=".32" stroke-width="1"/>' +
      '<image href="' + imageHref + '" x="' + (x + 7) + '" y="' + (y + 10) + '" width="130" height="130" preserveAspectRatio="xMidYMid meet" opacity="' + (item.earned ? "1" : ".34") + '"/>' +
      '<text x="' + (x + 150) + '" y="' + (y + 38) + '" fill="' + (item.earned ? "#f0f0e9" : "#929b8d") + '" font-family="monospace" font-size="12">' + escapeXml(item.title) + '</text>' +
      '<text x="' + (x + 150) + '" y="' + (y + 61) + '" fill="' + color + '" font-family="monospace" font-size="9">' + (item.earned ? "UNLOCKED / " + item.rarity : "LOCKED / " + item.rarity) + '</text>' +
      '<text x="' + (x + 150) + '" y="' + (y + 82) + '" fill="#899486" font-family="monospace" font-size="8">' + item.progress + ' / ' + item.target + ' REQUIREMENT UNITS</text>' +
      '<rect x="' + (x + 150) + '" y="' + (y + 98) + '" width="218" height="5" fill="#30382f"/><rect x="' + (x + 150) + '" y="' + (y + 98) + '" width="' + Math.round(progressWidth * .78) + '" height="5" fill="' + color + '"/>' +
      '<text x="' + (x + 150) + '" y="' + (y + 124) + '" fill="#899486" font-family="monospace" font-size="8">' + (item.earned ? "DEPARTMENTAL RECORD VERIFIED" : "REQUIREMENT NOT YET MET") + '</text>'
    );
  }).join("");
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="990" viewBox="0 0 1400 990">' +
    '<rect width="1400" height="990" fill="#090b09"/><rect x="28" y="28" width="1344" height="934" fill="none" stroke="#384137" stroke-width="2"/>' +
    '<path d="M28 110H1372M28 180H1372" stroke="#384137"/>' +
    '<text x="70" y="76" fill="#b6ff65" font-family="monospace" font-size="23" font-weight="bold">THE DYOR DEPARTMENT</text>' +
    '<text x="1330" y="76" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="12">ACHIEVEMENT OFFICE / COLLECTION RECORD</text>' +
    '<text x="70" y="151" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="36" font-weight="900">THE BADGE COLLECTION</text>' +
    '<text x="1330" y="151" text-anchor="end" fill="#b6ff65" font-family="monospace" font-size="12">' + unlocked + ' / ' + statuses.length + ' UNLOCKED</text>' +
    cards +
    '<text x="1330" y="934" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="9">FICTIONAL ACHIEVEMENTS / NO FINANCIAL VALUE / LOCAL RECORD</text>' +
    '</svg>'
  );
}

function downloadSvgAsPng(svg: string, width: number, height: number, filename: string, onNotice: (message: string) => void) {
  let objectUrl = "";
  try {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    objectUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) {
        URL.revokeObjectURL(objectUrl);
        onNotice("IMAGE EXPORT COULD NOT BE COMPLETED.");
        return;
      }
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(objectUrl);
      canvas.toBlob((png) => {
        if (!png) {
          onNotice("IMAGE EXPORT COULD NOT BE COMPLETED.");
          return;
        }
        const downloadUrl = URL.createObjectURL(png);
        const anchor = document.createElement("a");
        anchor.href = downloadUrl;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
        onNotice(filename.toUpperCase() + " HAS BEEN ISSUED.");
      }, "image/png");
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      onNotice("IMAGE EXPORT COULD NOT BE COMPLETED.");
    };
    image.src = objectUrl;
  } catch {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    onNotice("IMAGE EXPORT COULD NOT BE COMPLETED.");
  }
}

export default function PassportClient() {
  const [passport, setPassport] = useState<PassportData | null>(null);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setPassport(readPassport());
    setReady(true);

    function handleStorage(event: StorageEvent) {
      if (event.key === null || event.key === "dyor-department:passport:v1") setPassport(readPassport());
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function handleEnable() {
    const created = enablePassport();
    if (created) {
      setPassport(created);
      setNotice("PASSPORT ENABLED. VISITS AND COMPLETED EXPERIENCES WILL NOW BE SAVED ON THIS DEVICE.");
    } else {
      setNotice("LOCAL STORAGE IS UNAVAILABLE. THE PASSPORT COULD NOT BE ENABLED.");
    }
  }

  function handleDelete() {
    const confirmed = window.confirm("Delete your local Department Passport, visit stamps and achievement progress from this browser?");
    if (!confirmed) return;
    if (deletePassport()) {
      setPassport(null);
      setNotice("PASSPORT DELETED FROM THIS DEVICE. NO SERVER COPY EXISTS.");
    } else {
      setNotice("THE DEPARTMENT COULD NOT REMOVE THE LOCAL PASSPORT.");
    }
  }

  if (!ready) {
    return (
      <section className="passport-panel" aria-live="polite">
        <p className="eyebrow">OPENING LOCAL PASSPORT REGISTER</p>
        <p>THE DEPARTMENT IS CHECKING THIS BROWSER FOR AN OPTIONAL LOCAL FILE.</p>
      </section>
    );
  }

  if (!passport) {
    return (
      <section className="passport-panel passport-opt-in">
        <div className="passport-panel__header">
          <span>FORM DPP-001 / OPTIONAL LOCAL REGISTER</span>
          <span>● DISABLED</span>
        </div>
        <div className="passport-opt-in__body">
          <p className="eyebrow">OFFICE OF DEPARTMENTAL VISITS & ACHIEVEMENTS</p>
          <h2>YOUR VISITS.<br /><span>YOUR RECORD.</span></h2>
          <p>
            Department Stamps record the places you visit. Achievement Badges are different: they are awarded when you finish an interactive experience or meet a specific challenge. No account, leaderboard or public profile is required.
          </p>
          <div className="passport-opt-in__facts">
            <div><span>WHAT IS SAVED</span><strong>VISIT STAMPS / COMPLETED EXPERIENCES / DAILY UTC DATES</strong></div>
            <div><span>WHERE IT IS SAVED</span><strong>THIS BROWSER / LOCAL STORAGE</strong></div>
            <div><span>WHEN IT STARTS</span><strong>ONLY AFTER YOU ENABLE IT</strong></div>
          </div>
          <div className="passport-opt-in__notice">
            <strong>OPTIONAL / NOT ENABLED BY DEFAULT</strong>
            <p>Until you enable the Passport, no visit or achievement progress is stored. Once enabled, the record stays on this device and can be deleted here at any time. Nothing is sent to the Department.</p>
          </div>
          <button className="button button--primary" type="button" onClick={handleEnable}>ENABLE MY LOCAL PASSPORT <span>↗</span></button>
        </div>
        {notice && <p className="audit-notice" role="status">{notice}</p>}
      </section>
    );
  }

  const visited = new Set(passport.visitedDepartments);
  const statuses = getPassportAchievementStatuses(passport);
  const achievements = statuses.filter((item) => item.earned);
  const progress = Math.round((visited.size / DEPARTMENT_STAMPS.length) * 100);
  const activityCount = passport.completedActivities.filter((id) =>
    ["audit", "simulator", "utility", "roadmap", "whitepaper", "club", "cope"].includes(id)
  ).length;
  const activityProgress = Math.round((activityCount / 7) * 100);
  const streak = passport.bestDailyStreak;

  const currentPassport: PassportData = passport;

  function downloadPassport() {
    downloadSvgAsPng(
      makePassportSvg(currentPassport, statuses, window.location.origin),
      1400,
      1130,
      "dyor-department-passport.png",
      setNotice
    );
  }

  function downloadBadgeCollection() {
    downloadSvgAsPng(
      makeAchievementCollectionSvg(statuses, window.location.origin),
      1400,
      990,
      "dyor-department-badge-collection.png",
      setNotice
    );
  }

  return (
    <section className="passport-panel">
      <div className="passport-panel__header">
        <span>LOCAL REGISTER / ACTIVE SINCE {new Date(passport.createdAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}</span>
        <span className="passport-panel__active">● ENABLED ON THIS DEVICE</span>
      </div>

      <div className="passport-progress">
        <div className="passport-progress__top"><span>DEPARTMENT VISITS / STAMPS</span><strong>{visited.size} / {DEPARTMENT_STAMPS.length}</strong></div>
        <div className="passport-progress__bar" role="progressbar" aria-label="Department visit stamps" aria-valuemin={0} aria-valuemax={10} aria-valuenow={visited.size}><span style={{ width: progress + "%" }} /></div>
        <div className="passport-progress__bottom"><span>{progress}% OF THE DIRECTORY VISITED</span><span>TRENCHES DESK DUTY / BEST {streak}-DAY STREAK</span></div>
      </div>

      <div className="passport-activity-progress">
        <div className="passport-progress__top"><span>COMPLETED EXPERIENCES / BADGE ELIGIBILITY</span><strong>{activityCount} / 7</strong></div>
        <div className="passport-progress__bar" role="progressbar" aria-label="Completed interactive experiences" aria-valuemin={0} aria-valuemax={7} aria-valuenow={activityCount}><span style={{ width: activityProgress + "%" }} /></div>
        <div className="passport-progress__bottom"><span>{activityProgress}% OF THE INTERACTIVE CIRCUIT COMPLETE</span><span>VISITS ALONE DO NOT UNLOCK EXPERIENCE BADGES</span></div>
      </div>

      <section className="passport-collection" aria-labelledby="passport-stamps-title">
        <div className="passport-collection__heading">
          <div><span>COLLECTION 01 / DEPARTMENT ACCESS</span><h2 id="passport-stamps-title">VISIT <span>STAMPS.</span></h2></div>
          <strong>{visited.size} / {DEPARTMENT_STAMPS.length} COLLECTED</strong>
        </div>
        <div className="passport-stamps">
          {DEPARTMENT_STAMPS.map((stamp) => {
            const earned = visited.has(stamp.id);
            return (
              <article className={`passport-stamp${earned ? " is-earned" : ""}`} key={stamp.id}>
                <div className="passport-stamp__top"><span>DEPT. {stamp.number}</span><b>{earned ? "✓ STAMPED" : "○ NOT VISITED"}</b></div>
                <h3>{stamp.title}</h3>
                <p>{earned ? stamp.label : "OPEN THIS DEPARTMENT TO COLLECT ITS VISIT STAMP."}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="passport-achievements" aria-labelledby="passport-achievements-title">
        <div className="passport-collection__heading">
          <div><span>COLLECTION 02 / COMPLETION & CHALLENGES</span><h2 id="passport-achievements-title">ACHIEVEMENT <span>BADGES.</span></h2></div>
          <strong>{achievements.length} / {PASSPORT_ACHIEVEMENTS.length} UNLOCKED</strong>
        </div>
        <p className="passport-achievements__instructions">Each card explains its exact unlock condition. Complete that task while your Passport is enabled; progress is tracked automatically and the badge unlocks as soon as its requirement is met.</p>
        <div className="passport-rarity-legend" aria-label="Badge rarity levels">
          <span className="rarity-common">COMMON</span><span className="rarity-uncommon">UNCOMMON</span><span className="rarity-rare">RARE</span><span className="rarity-legendary">LEGENDARY</span>
        </div>
        <div className="passport-achievements__grid">
          {statuses.map((achievement) => {
            const badgeProgress = Math.round((achievement.progress / achievement.target) * 100);
            return (
              <article className={`passport-achievement${achievement.earned ? " is-earned" : ""} passport-achievement--${achievement.rarity.toLowerCase()}`} key={achievement.id}>
                <div className="passport-achievement__top">
                  <AchievementEmblem id={achievement.id} rarity={achievement.rarity} earned={achievement.earned} />
                  <div className="passport-achievement__identity"><span>{achievement.rarity}</span><strong>{achievement.earned ? "✓ UNLOCKED" : achievement.progress ? "IN PROGRESS" : "LOCKED"}</strong></div>
                </div>
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <small className="passport-achievement__requirement"><strong>HOW TO UNLOCK</strong>{achievement.requirement}</small>
                <div className="passport-achievement__progress" role="progressbar" aria-label={`${achievement.title} progress`} aria-valuemin={0} aria-valuemax={achievement.target} aria-valuenow={achievement.progress}>
                  <span style={{ width: badgeProgress + "%" }} />
                </div>
                <div className="passport-achievement__foot"><span>{achievement.earned ? "DEPARTMENTAL RECORD VERIFIED" : "REQUIREMENT PROGRESS"}</span><b>{achievement.progress}/{achievement.target}</b></div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="passport-actions">
        <button className="button button--primary" type="button" onClick={downloadPassport}>DOWNLOAD FULL PASSPORT <span>↓</span></button>
        <button className="button button--outline" type="button" onClick={downloadBadgeCollection}>DOWNLOAD BADGE COLLECTION <span>↓</span></button>
        <button className="button button--quiet" type="button" onClick={handleDelete}>DISABLE & DELETE LOCAL PASSPORT</button>
      </div>

      {notice && <p className="audit-notice" role="status">{notice}</p>}

      <p className="passport-privacy-note">
        This register is stored only in this browser. It is not sent to the Department, does not create an account and is not synchronized across devices. Visit Stamps record page visits; Achievement Badges record completed interactive experiences and challenge milestones. Delete the Passport here or clear this site's browser storage to remove it.
      </p>
    </section>
  );
}
