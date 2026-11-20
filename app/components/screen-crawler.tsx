"use client";

import { useEffect, useRef } from "react";

type CrawlerFacing = "right" | "left" | "up" | "down";
type CrawlerDepth = "background" | "behind" | "over";
type CrawlerMotion = "moving" | "idle" | "startled";
type Point = { x: number; y: number };
type OcclusionMode = Exclude<CrawlerDepth, "background">;

const CRAWLER_WIDTH = 112;
const CRAWLER_HEIGHT = 82;
const EDGE_GUTTER = 24;
const OCCLUSION_CHECK_MS = 180;
const SPEECH_DURATION_MS = 1750;
const STARTLE_BOOST_MS = 900;

const WALKABLE_SURFACES = [
  ".topline", ".site-header", ".site-footer", ".ticker", ".hq-ticker",
  ".hq-status-card", ".hq-casefile", ".hq-casefile__header", ".hq-section-heading",
  ".hq-hero__grid", ".hq-hero__copy", ".case-panel", ".department-card",
  ".department-next-steps__card", "[class*='panel']", "[class*='card']",
  "[class*='banner']", "[class*='notice']", "[class*='briefing']",
  "[class*='stamp']", "[class*='widget']", ".passport-guide",
  ".passport-achievement", ".passport-stamp", ".daily-office-panel",
  ".audit-workspace", "article", "blockquote", "figure", "table",
].join(",");

const CLICK_REPLIES = [
  "HEY. HANDS OFF THE ARMOR.",
  "NOT A BUG. A FEATURE.",
  "YOU SAW NOTHING.",
  "BACK TO MY SHIFT.",
  "NICE TRY, HUMAN.",
];

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), Math.max(minimum, maximum));
}

function randomBetween(minimum: number, maximum: number) {
  return minimum + Math.random() * (maximum - minimum);
}

export default function ScreenCrawler() {
  const crawlerRef = useRef<HTMLButtonElement>(null);
  const speechRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const crawler = crawlerRef.current;
    const speech = speechRef.current;
    if (!crawler || !speech) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");
    if (reducedMotion.matches || coarsePointer.matches) return;

    const now = () => window.performance.now();
    const rightEdge = () => Math.max(EDGE_GUTTER, window.innerWidth - CRAWLER_WIDTH - EDGE_GUTTER);
    const bottomEdge = () => Math.max(EDGE_GUTTER, window.innerHeight - CRAWLER_HEIGHT - EDGE_GUTTER);
    const randomPoint = (): Point => ({
      x: randomBetween(EDGE_GUTTER, rightEdge()),
      y: randomBetween(EDGE_GUTTER, bottomEdge()),
    });

    // The insect chooses its own destinations. It favours actual page surfaces,
    // but occasionally crosses open space as if exploring its whole habitat.
    const chooseDestination = (): Point => {
      const surfaces = Array.from(document.querySelectorAll<HTMLElement>(WALKABLE_SURFACES))
        .filter((element) => {
          if (element.closest(".screen-crawler")) return false;
          const rect = element.getBoundingClientRect();
          const area = rect.width * rect.height;
          if (rect.width < 150 || rect.height < 90 || area < CRAWLER_WIDTH * CRAWLER_HEIGHT || area > window.innerWidth * window.innerHeight * 0.48) return false;
          if (rect.bottom < 0 || rect.top > window.innerHeight || rect.right < 0 || rect.left > window.innerWidth) return false;
          const zIndex = Number.parseInt(window.getComputedStyle(element).zIndex, 10);
          return !Number.isFinite(zIndex) || zIndex < 80;
        });

      if (surfaces.length && Math.random() < 0.68) {
        const surface = surfaces[Math.floor(Math.random() * surfaces.length)];
        const rect = surface.getBoundingClientRect();
        const left = Math.max(EDGE_GUTTER, rect.left - CRAWLER_WIDTH * 0.35);
        const right = Math.min(rightEdge(), rect.right - CRAWLER_WIDTH * 0.65);
        const top = Math.max(EDGE_GUTTER, rect.top - CRAWLER_HEIGHT * 0.35);
        const bottom = Math.min(bottomEdge(), rect.bottom - CRAWLER_HEIGHT * 0.65);
        if (right >= left && bottom >= top) {
          return { x: randomBetween(left, right), y: randomBetween(top, bottom) };
        }
      }

      // Add a mild bias to the edges: insects tend to travel along seams and borders.
      const point = randomPoint();
      if (Math.random() < 0.46) {
        if (Math.random() < 0.5) point.x = Math.random() < 0.5 ? EDGE_GUTTER : rightEdge();
        else point.y = Math.random() < 0.5 ? EDGE_GUTTER : bottomEdge();
      }
      return point;
    };

    let currentX = randomBetween(EDGE_GUTTER, rightEdge());
    let currentY = randomBetween(EDGE_GUTTER, bottomEdge());
    let targetX = currentX;
    let targetY = currentY;
    let velocityX = 0;
    let velocityY = 0;
    let route: Point[] = [];
    let frame = 0;
    let active = true;
    let facing: CrawlerFacing = "right";
    let motion: CrawlerMotion = "idle";
    let depth: CrawlerDepth = "background";
    let nextFrame = 0;
    let lastFrameAt = now();
    let lastDepthCheck = 0;
    let clickCount = 0;
    let speedBoostUntil = 0;
    let roamTimer = 0;
    let speechTimer = 0;
    let boostTimer = 0;
    let reactionTimer = 0;
    let depthTimer = 0;
    let gaitTimer = 0;
    let obstacleMode = new WeakMap<Element, OcclusionMode>();
    let elevatedSurfaces = new WeakMap<HTMLElement, { position: string; zIndex: string }>();
    let activeSurface: HTMLElement | null = null;
    const sprite = crawler.querySelector<HTMLElement>(".screen-crawler__sprite");

    const setFacing = (next: CrawlerFacing) => {
      if (facing === next) return;
      facing = next;
      crawler.dataset.facing = next;
    };

    const setDepth = (next: CrawlerDepth) => {
      if (depth === next) return;
      depth = next;
      crawler.dataset.depth = next;
    };

    const setMotion = (next: CrawlerMotion) => {
      if (motion === next) return;
      motion = next;
      crawler.dataset.motion = next;
    };

    const faceTarget = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > 1) setFacing(dx > 0 ? "right" : "left");
      } else if (Math.abs(dy) > 1) {
        setFacing(dy > 0 ? "down" : "up");
      }
    };

    const restoreSurface = (element: HTMLElement) => {
      const original = elevatedSurfaces.get(element);
      if (!original) return;
      element.style.position = original.position;
      element.style.zIndex = original.zIndex;
      elevatedSurfaces.delete(element);
    };

    const bringSurfaceForward = (element: HTMLElement) => {
      if (elevatedSurfaces.has(element)) return;
      const computed = window.getComputedStyle(element);
      const currentZIndex = Number.parseInt(computed.zIndex, 10);
      // Never alter existing menus, modal layers or deliberately elevated components.
      if (Number.isFinite(currentZIndex) && currentZIndex > 1) return;
      const parentDisplay = element.parentElement ? window.getComputedStyle(element.parentElement).display : "block";
      elevatedSurfaces.set(element, { position: element.style.position, zIndex: element.style.zIndex });
      if (computed.position === "static" && !["grid", "inline-grid", "flex", "inline-flex"].includes(parentDisplay)) {
        element.style.position = "relative";
      }
      element.style.zIndex = "2";
    };

    const inspectDepth = (timestamp: number) => {
      if (timestamp - lastDepthCheck < OCCLUSION_CHECK_MS) return;
      lastDepthCheck = timestamp;

      const left = currentX + 9;
      const top = currentY + 9;
      const right = currentX + CRAWLER_WIDTH - 9;
      const bottom = currentY + CRAWLER_HEIGHT - 9;
      const crawlerArea = (right - left) * (bottom - top);
      const elements = document.querySelectorAll<HTMLElement>(WALKABLE_SURFACES);
      let bestElement: HTMLElement | null = null;
      let bestElementArea = Number.POSITIVE_INFINITY;
      let bestMode: OcclusionMode | null = null;

      for (const element of elements) {
        if (element === crawler || element.closest(".screen-crawler")) continue;
        const rect = element.getBoundingClientRect();
        const area = rect.width * rect.height;
        if (rect.width < 44 || rect.height < 26 || area < crawlerArea * 0.72 || area > window.innerWidth * window.innerHeight * 0.48) continue;
        if (rect.bottom <= 0 || rect.top >= window.innerHeight || rect.right <= 0 || rect.left >= window.innerWidth) continue;

        const overlapWidth = Math.max(0, Math.min(right, rect.right) - Math.max(left, rect.left));
        const overlapHeight = Math.max(0, Math.min(bottom, rect.bottom) - Math.max(top, rect.top));
        if ((overlapWidth * overlapHeight) / crawlerArea < 0.2 || area >= bestElementArea) continue;

        let mode = obstacleMode.get(element);
        if (!mode) {
          const zIndex = Number.parseInt(window.getComputedStyle(element).zIndex, 10);
          let protectedAncestor = false;
          let ancestor = element.parentElement;
          while (ancestor && ancestor !== document.body && !ancestor.classList.contains("department-scene")) {
            const ancestorZIndex = Number.parseInt(window.getComputedStyle(ancestor).zIndex, 10);
            // Only genuinely high-priority layers (navigation, dialogs, modal
            // overlays) are guaranteed to remain in front of the creature.
            if (Number.isFinite(ancestorZIndex) && ancestorZIndex >= 18) {
              protectedAncestor = true;
              break;
            }
            ancestor = ancestor.parentElement;
          }
          mode = protectedAncestor || (Number.isFinite(zIndex) && zIndex >= 18)
            ? "behind"
            : Math.random() < 0.42 ? "behind" : "over";
          obstacleMode.set(element, mode);
        }
        bestElementArea = area;
        bestElement = element;
        bestMode = mode;
      }

      if (bestElement && bestMode) {
        setDepth(bestMode);
        if (activeSurface && activeSurface !== bestElement) restoreSurface(activeSurface);
        if (bestMode === "behind") bringSurfaceForward(bestElement);
        else if (activeSurface === bestElement) restoreSurface(bestElement);
        activeSurface = bestElement;
      } else {
        if (activeSurface) restoreSurface(activeSurface);
        activeSurface = null;
        setDepth("background");
      }
    };

    const nextLeg = () => {
      const point = route.shift();
      if (!point) {
        targetX = currentX;
        targetY = currentY;
        velocityX = 0;
        velocityY = 0;
        setMotion("idle");
        if (!roamTimer) roamTimer = window.setTimeout(beginRoam, randomBetween(650, 1650));
        return;
      }
      targetX = point.x;
      targetY = point.y;
      faceTarget();
      setMotion(speedBoostUntil > now() ? "startled" : "moving");
      requestFrame();
    };

    const setRoute = (destination: Point) => {
      const horizontalFirst = Math.random() < 0.5;
      const corner = horizontalFirst ? { x: destination.x, y: currentY } : { x: currentX, y: destination.y };
      const points = horizontalFirst ? [corner, destination] : [corner, destination];
      route = points.filter((point, index) => {
        const previous = index === 0 ? { x: currentX, y: currentY } : points[index - 1];
        return Math.hypot(point.x - previous.x, point.y - previous.y) > 14;
      });
      if (!route.length) {
        route = [{ x: destination.x, y: currentY }, destination].filter((point, index) => {
          const previous = index === 0 ? { x: currentX, y: currentY } : { x: destination.x, y: currentY };
          return Math.hypot(point.x - previous.x, point.y - previous.y) > 14;
        });
      }
      nextLeg();
    };

    const beginRoam = () => {
      roamTimer = 0;
      if (!active || motion === "startled") return;
      setRoute(chooseDestination());
    };

    const requestFrame = () => {
      if (!frame && active) frame = window.requestAnimationFrame(animate);
    };

    const animate = () => {
      // The current RAF callback has now been consumed; nextLeg can safely
      // request the next segment without leaving the route stalled.
      frame = 0;
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const startled = speedBoostUntil > now();
      const maxSpeed = startled ? 13.5 : 6.2;
      const acceleration = startled ? 0.04 : 0.018;
      const damping = startled ? 0.79 : 0.82;
      velocityX = clamp((velocityX + dx * acceleration) * damping, -maxSpeed, maxSpeed);
      velocityY = clamp((velocityY + dy * acceleration) * damping, -maxSpeed, maxSpeed);

      // The route is split into two cardinal legs. Suppress residual drift on
      // the inactive axis so the creature really walks up/down/left/right.
      if (Math.abs(dx) < 1) velocityX *= 0.55;
      if (Math.abs(dy) < 1) velocityY *= 0.55;
      currentX = clamp(currentX + velocityX, EDGE_GUTTER, rightEdge());
      currentY = clamp(currentY + velocityY, EDGE_GUTTER, bottomEdge());

      if (Math.abs(dx) < 1.1 && Math.abs(dy) < 1.1 && Math.abs(velocityX) < 0.34 && Math.abs(velocityY) < 0.34) {
        currentX = targetX;
        currentY = targetY;
        velocityX = 0;
        velocityY = 0;
        crawler.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
        inspectDepth(now());
        nextLeg();
        return;
      }

      crawler.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      inspectDepth(now());
      frame = window.requestAnimationFrame(animate);
    };

    const handleCatch = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      clickCount += 1;
      if (roamTimer) window.clearTimeout(roamTimer);
      roamTimer = 0;
      if (speechTimer) window.clearTimeout(speechTimer);
      if (boostTimer) window.clearTimeout(boostTimer);
      if (reactionTimer) window.clearTimeout(reactionTimer);

      const reply = CLICK_REPLIES[(clickCount - 1) % CLICK_REPLIES.length];
      speech.textContent = reply;
      crawler.dataset.reaction = "caught";
      crawler.setAttribute("aria-label", `Crawler caught. It says: ${reply}`);
      setMotion("startled");
      speedBoostUntil = now() + STARTLE_BOOST_MS;
      speechTimer = window.setTimeout(() => {
        crawler.dataset.reaction = "";
        crawler.setAttribute("aria-label", "Catch the wandering crawler");
        speech.textContent = "";
      }, SPEECH_DURATION_MS);
      boostTimer = window.setTimeout(() => {
        if (motion === "startled") setMotion("moving");
      }, STARTLE_BOOST_MS);

      // It freezes for a beat, then scuttles away along a fresh cardinal route.
      route = [];
      targetX = currentX;
      targetY = currentY;
      velocityX = 0;
      velocityY = 0;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      const destination = chooseDestination();
      const dx = destination.x - currentX;
      const dy = destination.y - currentY;
      if (Math.abs(dx) > Math.abs(dy)) {
        destination.y = currentY;
      } else {
        destination.x = currentX;
      }
      reactionTimer = window.setTimeout(() => {
        reactionTimer = 0;
        if (!active) return;
        setRoute(destination);
      }, 300);
    };

    const handleResize = () => {
      currentX = clamp(currentX, EDGE_GUTTER, rightEdge());
      currentY = clamp(currentY, EDGE_GUTTER, bottomEdge());
      targetX = clamp(targetX, EDGE_GUTTER, rightEdge());
      targetY = clamp(targetY, EDGE_GUTTER, bottomEdge());
      crawler.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    };

    const advanceGait = () => {
      const timestamp = now();
      const interval = motion === "startled" ? 58 : motion === "moving" ? 94 : 240;
      if (!sprite || timestamp - lastFrameAt < interval) return;
      nextFrame = (nextFrame + 1) % 11;
      sprite.style.backgroundPosition = `${nextFrame * 10}% 50%`;
      lastFrameAt = timestamp;
    };

    crawler.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    crawler.dataset.facing = facing;
    crawler.dataset.motion = motion;
    crawler.dataset.depth = depth;
    crawler.classList.add("screen-crawler--ready");
    crawler.addEventListener("click", handleCatch);
    depthTimer = window.setInterval(() => inspectDepth(now()), OCCLUSION_CHECK_MS);
    gaitTimer = window.setInterval(advanceGait, 32);
    roamTimer = window.setTimeout(beginRoam, randomBetween(500, 1100));
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      active = false;
      crawler.removeEventListener("click", handleCatch);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(roamTimer);
      window.clearTimeout(speechTimer);
      window.clearTimeout(boostTimer);
      window.clearTimeout(reactionTimer);
      window.clearInterval(depthTimer);
      window.clearInterval(gaitTimer);
      if (activeSurface) restoreSurface(activeSurface);
      activeSurface = null;
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      ref={crawlerRef}
      type="button"
      className="screen-crawler"
      aria-label="Catch the wandering crawler"
      title="Catch me if you can"
      data-facing="right"
      data-motion="idle"
      data-depth="background"
    >
      <span className="screen-crawler__orientation" aria-hidden="true">
        <span className="screen-crawler__sprite" />
      </span>
      <span ref={speechRef} className="screen-crawler__speech" aria-live="polite" />
    </button>
  );
}
