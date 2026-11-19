"use client";

import { useEffect, useRef } from "react";

type CrawlerFacing = "right" | "left" | "front" | "back";
type CrawlerMotion = "moving" | "idle";

const CRAWLER_WIDTH = 112;
const CRAWLER_HEIGHT = 82;
const EDGE_GUTTER = 24;
const IDLE_FACING_SEQUENCE: CrawlerFacing[] = ["right", "front", "left", "back"];

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

    const now = () => window.performance.now();
    const limitX = () => Math.max(EDGE_GUTTER, window.innerWidth - CRAWLER_WIDTH - EDGE_GUTTER);
    const limitY = () => Math.max(EDGE_GUTTER, window.innerHeight - CRAWLER_HEIGHT - EDGE_GUTTER);

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let currentX = clamp(window.innerWidth / 2 - CRAWLER_WIDTH / 2, EDGE_GUTTER, limitX());
    let currentY = clamp(window.innerHeight / 2 - CRAWLER_HEIGHT / 2, EDGE_GUTTER, limitY());
    let targetX = currentX;
    let targetY = currentY;
    let velocityX = 0;
    let velocityY = 0;
    let frame = 0;
    let active = true;
    let lastPointerActivity = now();
    let nextIdleTurn = lastPointerActivity + 1700;
    let idleFacingIndex = 0;
    let facing: CrawlerFacing = "right";
    let motion: CrawlerMotion = "idle";

    const setFacing = (next: CrawlerFacing) => {
      if (facing === next) return;
      facing = next;
      crawler.dataset.facing = next;
    };

    const setMotion = (next: CrawlerMotion) => {
      if (motion === next) return;
      motion = next;
      crawler.dataset.motion = next;
    };

    const updateTarget = () => {
      // Exact mirrored anchor: the crawler stays diagonally opposite to the
      // pointer. Its gait, turns and body movement are animated independently.
      targetX = clamp(window.innerWidth - pointerX - CRAWLER_WIDTH / 2, EDGE_GUTTER, limitX());
      targetY = clamp(window.innerHeight - pointerY - CRAWLER_HEIGHT / 2, EDGE_GUTTER, limitY());
      if (!frame && active) frame = window.requestAnimationFrame(animate);
    };

    const faceMovement = (vx: number, vy: number) => {
      const horizontal = Math.abs(vx);
      const vertical = Math.abs(vy);
      if (horizontal < 0.42 && vertical < 0.42) return;
      if (horizontal > vertical * 1.12) {
        setFacing(vx >= 0 ? "right" : "left");
      } else {
        // The sprite's head points right in its source pose. Rotating it
        // vertically makes it crawl toward the top (front) or bottom (back).
        setFacing(vy < 0 ? "front" : "back");
      }
    };

    const animate = () => {
      // A damped spring gives it weight and a little momentum instead of
      // snapping directly to the mirrored pointer position.
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      velocityX = (velocityX + dx * 0.026) * 0.78;
      velocityY = (velocityY + dy * 0.026) * 0.78;
      velocityX = clamp(velocityX, -13, 13);
      velocityY = clamp(velocityY, -13, 13);
      currentX += velocityX;
      currentY += velocityY;

      if (Math.abs(dx) < 0.28 && Math.abs(dy) < 0.28 && Math.abs(velocityX) < 0.22 && Math.abs(velocityY) < 0.22) {
        currentX = targetX;
        currentY = targetY;
        velocityX = 0;
        velocityY = 0;
      }

      crawler.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      const moving = Math.hypot(velocityX, velocityY) > 0.5;
      setMotion(moving ? "moving" : "idle");
      if (moving) faceMovement(velocityX, velocityY);

      if (Math.abs(targetX - currentX) > 0.3 || Math.abs(targetY - currentY) > 0.3 || Math.abs(velocityX) > 0.22 || Math.abs(velocityY) > 0.22) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const moved = Math.hypot(event.clientX - pointerX, event.clientY - pointerY);
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (moved > 0.7) {
        lastPointerActivity = now();
        setMotion("moving");
      }
      updateTarget();
    };

    const handleResize = () => updateTarget();

    // On a quiet screen it does not freeze: it changes its facing, shifts its
    // weight and keeps its legs moving while holding the mirrored position.
    const idleTimer = window.setInterval(() => {
      const timestamp = now();
      if (timestamp - lastPointerActivity < 950 || timestamp < nextIdleTurn || motion !== "idle") return;
      idleFacingIndex = (idleFacingIndex + 1) % IDLE_FACING_SEQUENCE.length;
      setFacing(IDLE_FACING_SEQUENCE[idleFacingIndex]);
      nextIdleTurn = timestamp + 1750 + Math.random() * 850;
    }, 180);

    crawler.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    crawler.dataset.facing = facing;
    crawler.dataset.motion = motion;
    crawler.classList.add("screen-crawler--ready");
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      active = false;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      window.clearInterval(idleTimer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={crawlerRef} className="screen-crawler" aria-hidden="true">
      <span className="screen-crawler__orientation">
        <span className="screen-crawler__sprite" />
      </span>
    </div>
  );
}
