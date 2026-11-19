"use client";

import { useEffect, useRef } from "react";

const CRAWLER_WIDTH = 112;
const CRAWLER_HEIGHT = 82;
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
    let currentX = clamp(window.innerWidth - CRAWLER_WIDTH - EDGE_GUTTER, EDGE_GUTTER, window.innerWidth - CRAWLER_WIDTH - EDGE_GUTTER);
    let currentY = clamp(window.innerHeight - CRAWLER_HEIGHT - EDGE_GUTTER, EDGE_GUTTER, window.innerHeight - CRAWLER_HEIGHT - EDGE_GUTTER);
    let targetX = currentX;
    let targetY = currentY;
    let frame = 0;
    let active = true;

    const updateTarget = () => {
      // Mirror the pointer around the viewport centre: the crawler occupies
      // the diagonally opposite point and remains inside the visible screen.
      targetX = clamp(window.innerWidth - pointerX - CRAWLER_WIDTH / 2, EDGE_GUTTER, window.innerWidth - CRAWLER_WIDTH - EDGE_GUTTER);
      targetY = clamp(window.innerHeight - pointerY - CRAWLER_HEIGHT / 2, EDGE_GUTTER, window.innerHeight - CRAWLER_HEIGHT - EDGE_GUTTER);
      if (!frame && active) frame = window.requestAnimationFrame(animate);
    };

    const animate = () => {
      const easing = 0.15;
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

    const handleResize = () => updateTarget();

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
      <span className="screen-crawler__sprite" />
    </div>
  );
}
