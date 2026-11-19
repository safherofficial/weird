"use client";

import { useEffect, useRef } from "react";

const CRAWLER_SIZE = 58;
const EDGE_GUTTER = 18;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), Math.max(minimum, maximum));
}

export default function ScreenCrawler() {
  const crawlerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const crawler = crawlerRef.current;
    if (!crawler) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");

    if (reducedMotion.matches || coarsePointer.matches) return;

    let pointerX = window.innerWidth;
    let pointerY = window.innerHeight;
    let currentX = clamp(window.innerWidth - CRAWLER_SIZE - EDGE_GUTTER, EDGE_GUTTER, window.innerWidth - CRAWLER_SIZE - EDGE_GUTTER);
    let currentY = clamp(window.innerHeight - CRAWLER_SIZE - EDGE_GUTTER, EDGE_GUTTER, window.innerHeight - CRAWLER_SIZE - EDGE_GUTTER);
    let targetX = currentX;
    let targetY = currentY;
    let frame = 0;
    let active = true;

    const updateTarget = () => {
      // Mirror the pointer around the viewport centre: every movement has
      // an equal and opposite counterpart on the other side of the screen.
      targetX = clamp(window.innerWidth - pointerX - CRAWLER_SIZE / 2, EDGE_GUTTER, window.innerWidth - CRAWLER_SIZE - EDGE_GUTTER);
      targetY = clamp(window.innerHeight - pointerY - CRAWLER_SIZE / 2, EDGE_GUTTER, window.innerHeight - CRAWLER_SIZE - EDGE_GUTTER);
      if (!frame && active) frame = window.requestAnimationFrame(animate);
    };

    const animate = () => {
      const easing = 0.16;
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      if (Math.abs(targetX - currentX) < 0.35 && Math.abs(targetY - currentY) < 0.35) {
        currentX = targetX;
        currentY = targetY;
      }

      crawler.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.35 || Math.abs(targetY - currentY) > 0.35) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      updateTarget();
    };

    const handleResize = () => {
      updateTarget();
    };

    crawler.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    crawler.classList.add("screen-crawler--ready");
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      active = false;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={crawlerRef} className="screen-crawler" aria-hidden="true">
      <svg viewBox="0 0 80 80" focusable="false">
        <defs>
          <filter id="screen-crawler-glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="2.4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="screen-crawler-shell" cx="38%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#263321" />
            <stop offset="58%" stopColor="#111711" />
            <stop offset="100%" stopColor="#070907" />
          </radialGradient>
        </defs>

        <ellipse className="screen-crawler__aura" cx="40" cy="41" rx="29" ry="28" />

        <g className="screen-crawler__legs screen-crawler__legs--left">
          <path d="M28 31 18 23 9 25M24 41 13 39 6 45M27 52 17 59 10 58" />
          <path className="screen-crawler__leg-detail" d="M18 23 14 17M13 39 7 35M17 59 14 65" />
          <circle cx="18" cy="23" r="2" /><circle cx="13" cy="39" r="2" /><circle cx="17" cy="59" r="2" />
        </g>
        <g className="screen-crawler__legs screen-crawler__legs--right">
          <path d="M52 31 62 23 71 25M56 41 67 39 74 45M53 52 63 59 70 58" />
          <path className="screen-crawler__leg-detail" d="M62 23 66 17M67 39 73 35M63 59 66 65" />
          <circle cx="62" cy="23" r="2" /><circle cx="67" cy="39" r="2" /><circle cx="63" cy="59" r="2" />
        </g>

        <g className="screen-crawler__core">
          <path className="screen-crawler__antenna" d="M34 18 29 10 23 8M46 18 51 10 57 8" />
          <circle className="screen-crawler__antenna-tip" cx="22" cy="8" r="2" />
          <circle className="screen-crawler__antenna-tip" cx="58" cy="8" r="2" />
          <ellipse className="screen-crawler__head" cx="40" cy="22" rx="13" ry="9" />
          <circle className="screen-crawler__eye" cx="34" cy="22" r="2.5" />
          <circle className="screen-crawler__eye" cx="46" cy="22" r="2.5" />
          <path className="screen-crawler__body" d="M40 29C53 29 59 41 55 54 52 64 46 69 40 71 34 69 28 64 25 54 21 41 27 29 40 29Z" />
          <path className="screen-crawler__shell-seam" d="M40 31V68M29 42 40 47 51 42M28 54 40 59 52 54" />
          <path className="screen-crawler__shell-ridge" d="M33 35 40 39 47 35M32 61 40 65 48 61" />
          <circle className="screen-crawler__warning" cx="40" cy="50" r="2.2" />
        </g>
      </svg>
    </div>
  );
}
