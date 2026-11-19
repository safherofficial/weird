"use client";

import { useEffect, useState } from "react";
import {
  DEPARTMENT_STAMPS,
  getDailyOfficeVisitStreak,
  getPassportAchievements,
  readPassport,
  enablePassport,
  deletePassport,
  type PassportData,
} from "./passport-store";

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

function makePassportSvg(data: PassportData) {
  const visited = new Set(data.visitedDepartments);
  const achievements = getPassportAchievements(data);
  const stampLines = DEPARTMENT_STAMPS.map((stamp, index) => {
    const column = index < 5 ? 0 : 1;
    const row = index % 5;
    const x = column === 0 ? 72 : 620;
    const y = 220 + row * 67;
    const earned = visited.has(stamp.id);
    const color = earned ? "#b6ff65" : "#596255";
    return (
      '<rect x="' + x + '" y="' + y + '" width="500" height="52" fill="' + (earned ? "#172216" : "#101510") + '" stroke="' + (earned ? "#526b43" : "#30382f") + '"/>' +
      '<text x="' + (x + 16) + '" y="' + (y + 21) + '" fill="' + color + '" font-family="monospace" font-size="11">' + stamp.number + " / " + escapeXml(stamp.title) + '</text>' +
      '<text x="' + (x + 16) + '" y="' + (y + 39) + '" fill="' + (earned ? "#a8c795" : "#66705f") + '" font-family="monospace" font-size="9">' + (earned ? "STAMPED / " + escapeXml(stamp.label) : "NOT YET VISITED") + '</text>' +
      '<text x="' + (x + 474) + '" y="' + (y + 34) + '" text-anchor="end" fill="' + color + '" font-family="monospace" font-size="18">' + (earned ? "✓" : "—") + '</text>'
    );
  }).join("");
  const unlocked = achievements.slice(0, 3).map((item, index) =>
    '<text x="72" y="' + (590 + index * 20) + '" fill="#d5e6cb" font-family="monospace" font-size="10">✓ ' + escapeXml(item.title) + '</text>'
  ).join("");

  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760">' +
    '<rect width="1200" height="760" fill="#090b09"/>' +
    '<rect x="28" y="28" width="1144" height="704" fill="none" stroke="#384137" stroke-width="2"/>' +
    '<path d="M28 110H1172M28 548H1172" stroke="#384137"/>' +
    '<text x="72" y="76" fill="#b6ff65" font-family="monospace" font-size="25" font-weight="bold">THE DYOR DEPARTMENT</text>' +
    '<text x="1128" y="76" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="14">PERSONAL DEPARTMENT PASSPORT</text>' +
    '<text x="72" y="159" fill="#f0f0e9" font-family="Arial,sans-serif" font-size="42" font-weight="900">THE DEPARTMENT PASSPORT</text>' +
    '<text x="72" y="190" fill="#8d968a" font-family="monospace" font-size="12">' + visited.size + " / 10 DEPARTMENTS VISITED  •  " + achievements.length + " ACHIEVEMENTS UNLOCKED</text>" +
    stampLines +
    '<text x="72" y="578" fill="#b6ff65" font-family="monospace" font-size="11" font-weight="bold">UNLOCKED ACHIEVEMENTS</text>' +
    unlocked +
    '<text x="1128" y="706" text-anchor="end" fill="#8d968a" font-family="monospace" font-size="10">LOCAL VISIT RECORD / NOT A COMPLETION CERTIFICATE</text>' +
    '</svg>'
  );
}

export default function PassportClient() {
  const [passport, setPassport] = useState<PassportData | null>(null);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setPassport(readPassport());
    setReady(true);

    function handleStorage(event: StorageEvent) {
      if (event.key === null || event.key === "dyor-department:passport:v1") {
        setPassport(readPassport());
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function handleEnable() {
    const created = enablePassport();
    if (created) {
      setPassport(created);
      setNotice("PASSPORT ENABLED. VISIT STAMPS WILL NOW BE SAVED ON THIS DEVICE.");
    } else {
      setNotice("LOCAL STORAGE IS UNAVAILABLE. THE PASSPORT COULD NOT BE ENABLED.");
    }
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete your local Department Passport and all visit stamps from this browser?"
    );
    if (!confirmed) return;

    if (deletePassport()) {
      setPassport(null);
      setNotice("PASSPORT DELETED FROM THIS DEVICE. NO SERVER COPY EXISTS.");
    } else {
      setNotice("THE DEPARTMENT COULD NOT REMOVE THE LOCAL PASSPORT.");
    }
  }

  function downloadPassport() {
    if (!passport) return;
    let objectUrl = "";
    try {
      const blob = new Blob([makePassportSvg(passport)], { type: "image/svg+xml;charset=utf-8" });
      objectUrl = URL.createObjectURL(blob);
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 1200;
        canvas.height = 760;
        const context = canvas.getContext("2d");
        if (!context) {
          URL.revokeObjectURL(objectUrl);
          setNotice("PASSPORT CARD COULD NOT BE GENERATED.");
          return;
        }

        context.drawImage(image, 0, 0);
        URL.revokeObjectURL(objectUrl);
        canvas.toBlob((png) => {
          if (!png) {
            setNotice("PASSPORT CARD COULD NOT BE GENERATED.");
            return;
          }
          const downloadUrl = URL.createObjectURL(png);
          const anchor = document.createElement("a");
          anchor.href = downloadUrl;
          anchor.download = "dyor-department-passport.png";
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
          setNotice("YOUR DEPARTMENT PASSPORT CARD HAS BEEN ISSUED.");
        }, "image/png");
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setNotice("PASSPORT CARD COULD NOT BE GENERATED.");
      };
      image.src = objectUrl;
    } catch {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      setNotice("PASSPORT CARD COULD NOT BE GENERATED.");
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
          <p className="eyebrow">OFFICE OF DEPARTMENTAL VISITS</p>
          <h2>YOUR VISITS.<br /><span>YOUR FILE.</span></h2>
          <p>
            Enable a local Passport to collect a stamp when you open one of the ten Departments.
            Unlock a few achievements along the way. No account, no leaderboard, no public profile.
          </p>
          <div className="passport-opt-in__facts">
            <div><span>WHAT IS SAVED</span><strong>DEPARTMENT VISIT STAMPS</strong></div>
            <div><span>WHERE IT IS SAVED</span><strong>THIS BROWSER / LOCAL STORAGE</strong></div>
            <div><span>WHEN IT STARTS</span><strong>ONLY AFTER YOU ENABLE IT</strong></div>
          </div>
          <div className="passport-opt-in__notice">
            <strong>OPTIONAL / NOT ENABLED BY DEFAULT</strong>
            <p>Until you press Enable Passport, the Department does not store visit stamps. After enabling, it records only which Department pages you open and the UTC dates on which you open the Daily Department. The record stays on this device and can be deleted here at any time.</p>
          </div>
          <button className="button button--primary" type="button" onClick={handleEnable}>
            ENABLE MY LOCAL PASSPORT <span>↗</span>
          </button>
        </div>
        {notice && <p className="audit-notice" role="status">{notice}</p>}
      </section>
    );
  }

  const visited = new Set(passport.visitedDepartments);
  const achievements = getPassportAchievements(passport);
  const progress = Math.round((visited.size / DEPARTMENT_STAMPS.length) * 100);
  const streak = getDailyOfficeVisitStreak(passport);

  return (
    <section className="passport-panel">
      <div className="passport-panel__header">
        <span>LOCAL REGISTER / ACTIVE SINCE {new Date(passport.createdAt).toLocaleDateString("en-GB", { dateStyle: "medium" })}</span>
        <span className="passport-panel__active">● ENABLED ON THIS DEVICE</span>
      </div>

      <div className="passport-progress">
        <div className="passport-progress__top">
          <span>DEPARTMENT VISITS RECORDED</span>
          <strong>{visited.size} / {DEPARTMENT_STAMPS.length}</strong>
        </div>
        <div className="passport-progress__bar" role="progressbar" aria-label="Department visit stamps" aria-valuemin={0} aria-valuemax={10} aria-valuenow={visited.size}>
          <span style={{ width: progress + "%" }} />
        </div>
        <div className="passport-progress__bottom">
          <span>{progress}% OF THE DIRECTORY VISITED</span>
          <span>DAILY OFFICE BEST STREAK / {streak} DAYS</span>
        </div>
      </div>

      <div className="passport-stamps">
        {DEPARTMENT_STAMPS.map((stamp) => {
          const earned = visited.has(stamp.id);
          return (
            <article className={"passport-stamp" + (earned ? " is-earned" : "")} key={stamp.id}>
              <div className="passport-stamp__top">
                <span>DEPT. {stamp.number}</span>
                <b>{earned ? "✓ STAMPED" : "○ NOT VISITED"}</b>
              </div>
              <h3>{stamp.title}</h3>
              <p>{earned ? stamp.label : "OPEN THIS DEPARTMENT TO COLLECT ITS VISIT STAMP."}</p>
            </article>
          );
        })}
      </div>

      <div className="passport-achievements">
        <div className="passport-achievements__heading">
          <span>DEPARTMENTAL ACHIEVEMENTS</span>
          <strong>{achievements.length} / 6 UNLOCKED</strong>
        </div>
        <div className="passport-achievements__grid">
          {[
            { id: "first-stamp", title: "FIRST CONTACT", description: "Visit your first Department." },
            { id: "four-stamps", title: "CROSS-DEPARTMENTAL", description: "Visit four different Departments." },
            { id: "all-stamps", title: "THE COMPLETE FILE", description: "Visit all ten Departments." },
            { id: "culture-curator", title: "CULTURE CURATOR", description: "Visit the Museum and Archives." },
            { id: "daily-reader", title: "DAILY READER", description: "Visit the Daily Department." },
            { id: "seven-day-desk", title: "SEVEN-DAY DESK DUTY", description: "Visit Daily Office on seven consecutive UTC dates." },
          ].map((achievement) => {
            const earned = achievements.some((item) => item.id === achievement.id);
            return (
              <article className={"passport-achievement" + (earned ? " is-earned" : "")} key={achievement.id}>
                <span>{earned ? "✓ UNLOCKED" : "— LOCKED"}</span>
                <strong>{achievement.title}</strong>
                <small>{achievement.description}</small>
              </article>
            );
          })}
        </div>
      </div>

      <div className="passport-actions">
        <button className="button button--primary" type="button" onClick={downloadPassport}>DOWNLOAD PASSPORT CARD <span>↓</span></button>
        <button className="button button--quiet" type="button" onClick={handleDelete}>DISABLE & DELETE LOCAL PASSPORT</button>
      </div>

      {notice && <p className="audit-notice" role="status">{notice}</p>}

      <p className="passport-privacy-note">
        This register is stored only in this browser. It is not sent to the Department, does not create an account
        and is not synchronized across devices. Stamps record page visits only; they do not certify that an activity
        was completed. Delete the Passport here or clear this site's browser storage to remove it.
      </p>
    </section>
  );
}
