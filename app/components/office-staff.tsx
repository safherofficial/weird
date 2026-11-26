"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const STAFF_ROLES = ["writer", "editor", "archivist"] as const;
type StaffRole = (typeof STAFF_ROLES)[number];

type StaffPlacement = {
  index: number;
  top: number;
  visibleHeight: number;
};

function getRouteSeed(pathname: string) {
  return Array.from(pathname).reduce((total, character) => total + character.charCodeAt(0), 0);
}

function OfficeEmployeeSprite() {
  return (
    <svg className="office-staff__sprite" viewBox="0 0 32 44" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true" shapeRendering="crispEdges">
      <ellipse cx="16" cy="41" rx="10" ry="1.8" fill="#000" opacity=".34" />
      <g className="office-staff__figure">
        <g className="office-staff__legs">
          <path className="office-staff__leg office-staff__leg--left" d="M10.5 29h5v8.5h-5z" fill="#87958a" />
          <path className="office-staff__leg office-staff__leg--right" d="M18 29h5v8.5h-5z" fill="#64746a" />
          <path d="M8.5 36.5h7.5v3H8.5zM17 36.5h7.5v3H17z" fill="#111713" />
          <path d="M8.5 36.5h7.5v1H8.5zM17 36.5h7.5v1H17z" fill="#c2c9b9" opacity=".55" />
        </g>
        <path d="M9 18h14l3 13H6z" fill="#26352b" stroke="#71836b" strokeWidth=".7" />
        <path d="M13 18h6l1.5 5-4.5 4-4.5-4z" fill="#d9ded0" />
        <path d="M15.2 22h2l1.1 7.5h-4.2z" fill="var(--accent-primary, #b6ff65)" />
        <path d="M15.8 29.5H17v3h-1.2z" fill="#d5dbc9" />
        <path d="M8.5 20.5 5 27l3.5 2 3-6.2zM23.5 20.5l3 5.2-2.8 2.2-3.1-5.7z" fill="#314437" stroke="#71836b" strokeWidth=".6" />
        <path d="M10 8.5c0-4.4 2.7-6.5 6.2-6.5 4.1 0 6.2 2.6 6.2 6.5v7.3c0 3.6-2.5 5.7-6.2 5.7-3.9 0-6.2-2.4-6.2-5.7z" fill="#c99273" />
        <path d="M9.7 11.2V8.1c0-4.4 2.8-7 6.8-7 3.8 0 6.1 2.5 6.1 6.4v3.1l-2.1-2.8-2.5.9-4.9-.4-1.5 2.9z" fill="#202923" />
        <path d="M11.1 13.2h1.3v1.1h-1.3zM19.3 13.2h1.3v1.1h-1.3z" fill="#172019" />
        <path d="M14.2 17.1h3.8" stroke="#805a49" strokeWidth=".8" strokeLinecap="round" />
        <path d="M7.6 22.5 5.6 28l2.2 1.1 2.8-4.8z" fill="#c99273" />
        <path d="M23.5 22.5 26 26.7" stroke="#c99273" strokeWidth="2.2" strokeLinecap="round" />
        <g className="office-staff__glasses">
          <rect x="10.2" y="11.8" width="4.8" height="3.4" rx=".7" fill="none" stroke="#c7d7c0" strokeWidth=".8" />
          <rect x="17" y="11.8" width="4.8" height="3.4" rx=".7" fill="none" stroke="#c7d7c0" strokeWidth=".8" />
          <path d="M15 13h2" stroke="#c7d7c0" strokeWidth=".8" />
        </g>
        <g className="office-staff__prop office-staff__prop--writer">
          <path d="M22.5 20.5h7v9h-7z" fill="#e4e6d8" stroke="#6e8061" strokeWidth=".7" />
          <path d="M24 23h4M24 25h4M24 27h3" stroke="#7f8d76" strokeWidth=".65" />
          <path d="m21.6 19.5 1.3-1.2 6.4 8.4-1.4 1z" fill="var(--accent-primary, #b6ff65)" stroke="#263629" strokeWidth=".5" />
        </g>
        <g className="office-staff__prop office-staff__prop--editor">
          <path d="M22 19h8v11h-8z" fill="#d8ddcd" stroke="#a88c56" strokeWidth=".8" />
          <path d="M24 22h4M24 24h4M24 26h3" stroke="#687764" strokeWidth=".65" />
          <path d="M24.5 18h3v2h-3z" fill="#c5a16a" />
          <path d="m20.8 20 1.3-1 6 8-1.3 1z" fill="#e2a36d" stroke="#6f5441" strokeWidth=".5" />
        </g>
        <g className="office-staff__prop office-staff__prop--archivist">
          <path d="M21 20h9v3h-9z" fill="#b58b52" stroke="#624f35" strokeWidth=".6" />
          <path d="M22 23h8v3h-8z" fill="#d1b06e" stroke="#705a38" strokeWidth=".6" />
          <path d="M20.5 26h9.5v4h-9.5z" fill="#7f966b" stroke="#43593e" strokeWidth=".6" />
          <path d="M23 21h5M24 24.5h4M22.5 28h5" stroke="#f0dfb5" strokeWidth=".6" />
        </g>
        <path d="M11 30h10" stroke="#aebda5" strokeWidth=".7" opacity=".55" />
      </g>
    </svg>
  );
}

export default function OfficeStaff() {
  const pathname = usePathname();
  const staffRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("#main-content, main");
    if (!main) return;
    const pageMain = main;

    const narrowViewport = window.matchMedia("(max-width: 900px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let blocks: HTMLElement[] = [];
    let frame = 0;

    function collectBlocks() {
      const semanticSections = Array.from(pageMain.querySelectorAll<HTMLElement>("section")).filter((section) => {
        const rect = section.getBoundingClientRect();
        const nestedInSection = Boolean(section.parentElement?.closest("section"));
        return !nestedInSection && !section.closest("footer") && rect.width >= 360 && rect.height >= 240;
      });

      if (semanticSections.length > 0) {
        blocks = semanticSections;
        return;
      }

      blocks = Array.from(pageMain.children).filter((element): element is HTMLElement => {
        if (!(element instanceof HTMLElement)) return false;
        if (["HEADER", "FOOTER", "NAV"].includes(element.tagName)) return false;
        if (element.matches(".topline, .site-header, .division-idbar")) return false;
        const rect = element.getBoundingClientRect();
        return rect.width >= 360 && rect.height >= 260;
      });
    }

    function hideWorkers() {
      staffRefs.current.forEach((worker) => {
        if (worker) worker.dataset.visible = "false";
      });
    }

    function updatePositions() {
      frame = 0;
      if (narrowViewport.matches) {
        hideWorkers();
        return;
      }
      if (blocks.length === 0) collectBlocks();

      const viewportHeight = window.innerHeight;
      const candidates: StaffPlacement[] = [];

      blocks.forEach((block, index) => {
        if (!block.isConnected) return;
        const rect = block.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 64);
        const visibleBottom = Math.min(rect.bottom, viewportHeight - 64);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        if (visibleHeight < 150) return;

        const anchoredTop = rect.top + Math.min(rect.height * 0.7, 360);
        const top = Math.max(82, Math.min(viewportHeight - 74, anchoredTop));
        candidates.push({ index, top, visibleHeight });
      });

      candidates.sort((left, right) => left.index - right.index);
      let selected: StaffPlacement[] = [];

      if (reducedMotion.matches) {
        const mostVisible = candidates.slice().sort((left, right) => right.visibleHeight - left.visibleHeight)[0];
        selected = mostVisible
          ? [{ index: mostVisible.index, top: Math.round(viewportHeight * 0.56), visibleHeight: mostVisible.visibleHeight }]
          : [];
      } else {
        for (const candidate of candidates) {
          if (selected.every((entry) => Math.abs(entry.top - candidate.top) >= 104)) selected.push(candidate);
          if (selected.length === 2) break;
        }
      }

      staffRefs.current.forEach((worker, slot) => {
        if (!worker) return;
        const placement = selected[slot];
        if (!placement) {
          worker.dataset.visible = "false";
          return;
        }

        const role: StaffRole = STAFF_ROLES[(getRouteSeed(pathname) + placement.index + slot) % STAFF_ROLES.length];
        worker.dataset.role = role;
        worker.dataset.visible = "true";
        worker.style.top = Math.round(placement.top) + "px";
      });
    }

    function scheduleUpdate() {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(updatePositions);
    }

    const mutationObserver = new MutationObserver(() => {
      collectBlocks();
      scheduleUpdate();
    });
    mutationObserver.observe(pageMain, { childList: true, subtree: true });

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(pageMain);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    narrowViewport.addEventListener("change", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);

    collectBlocks();
    scheduleUpdate();

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      narrowViewport.removeEventListener("change", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <div className="office-staff" aria-hidden="true">
      {[0, 1].map((slot) => (
        <div
          className="office-staff__worker"
          data-slot={slot}
          data-role="writer"
          data-visible="false"
          key={slot}
          ref={(element) => {
            staffRefs.current[slot] = element;
          }}
        >
          <OfficeEmployeeSprite />
        </div>
      ))}
    </div>
  );
}
