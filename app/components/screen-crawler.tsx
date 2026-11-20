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
const CHASE_CHECK_MS = 360;
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
    let speechTimer = 0;
    let boostTimer = 0;
    let reactionTimer = 0;
    let chaseTimer = 0;
    let depthTimer = 0;
    let hasPointer = false;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let lastPlannedPointer: Point = { x: pointerX, y: pointerY };
    let nextChaseAt = 0;
    let chasePauseUntil = 0;
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

    const chooseChaseDestination = (escape = false): Point => {
      const centerX = currentX + CRAWLER_WIDTH / 2;
      const centerY = currentY + CRAWLER_HEIGHT / 2;
      const dx = pointerX - centerX;
      const dy = pointerY - centerY;
      const distance = Math.hypot(dx, dy);
      let candidate: Point;

      if (escape) {
        // After a successful catch, scuttle decisively away from the user's
        // pointer before resuming the pursuit.
        const awayAngle = distance > 2 ? Math.atan2(-dy, -dx) : randomBetween(0, Math.PI * 2);
        const angle = awayAngle + randomBetween(-0.32, 0.32);
        const radius = randomBetween(170, 235);
        candidate = { x: pointerX + Math.cos(angle) * radius, y: pointerY + Math.sin(angle) * radius };
      } else if (distance > 150) {
        // Close the distance, but stop just short of the cursor so the creature
        // remains visible and catchable instead of sitting directly under it.
        const standoff = randomBetween(72, 98);
        candidate = {
          x: pointerX - (dx / distance) * standoff,
          y: pointerY - (dy / distance) * standoff,
        };
      } else {
        // Once close, circle around the user in small unpredictable steps.
        const currentAngle = distance > 2 ? Math.atan2(-dy, -dx) : randomBetween(0, Math.PI * 2);
        const angle = currentAngle + randomBetween(-1.15, 1.15);
        const radius = randomBetween(78, 118);
        candidate = { x: pointerX + Math.cos(angle) * radius, y: pointerY + Math.sin(angle) * radius };
      }

      candidate.x = clamp(candidate.x - CRAWLER_WIDTH / 2, EDGE_GUTTER, rightEdge());
      candidate.y = clamp(candidate.y - CRAWLER_HEIGHT / 2, EDGE_GUTTER, bottomEdge());

      // Prefer landing on an actual visible card, panel or banner when one is
      // near the pursuit path. The page texture fills the gaps between surfaces.
      const nearbySurfaces = Array.from(document.querySelectorAll<HTMLElement>(WALKABLE_SURFACES))
        .filter((element) => !element.closest(".screen-crawler"))
        .map((element) => ({ element, rect: element.getBoundingClientRect() }))
        .filter(({ element, rect }) => {
          const area = rect.width * rect.height;
          if (rect.width < 120 || rect.height < 64 || area > window.innerWidth * window.innerHeight * 0.48) return false;
          if (rect.bottom <= 0 || rect.top >= window.innerHeight || rect.right <= 0 || rect.left >= window.innerWidth) return false;
          const zIndex = Number.parseInt(window.getComputedStyle(element).zIndex, 10);
          return !Number.isFinite(zIndex) || zIndex < 80;
        });

      let surfaceTarget: Point | null = null;
      let nearestSurfaceDistance = 140;
      for (const { rect } of nearbySurfaces) {
        const minX = clamp(rect.left - 24, EDGE_GUTTER, rightEdge());
        const maxX = clamp(rect.right - CRAWLER_WIDTH + 24, EDGE_GUTTER, rightEdge());
        const minY = clamp(rect.top - 18, EDGE_GUTTER, bottomEdge());
        const maxY = clamp(rect.bottom - CRAWLER_HEIGHT + 18, EDGE_GUTTER, bottomEdge());
        if (maxX < minX || maxY < minY) continue;
        const projected = { x: clamp(candidate.x, minX, maxX), y: clamp(candidate.y, minY, maxY) };
        const surfaceDistance = Math.hypot(projected.x - candidate.x, projected.y - candidate.y);
        if (surfaceDistance < nearestSurfaceDistance) {
          nearestSurfaceDistance = surfaceDistance;
          surfaceTarget = projected;
        }
      }

      return surfaceTarget ?? candidate;
    };

    const planChase = (force = false) => {
      const timestamp = now();
      if (!active || !hasPointer || timestamp < chasePauseUntil || (motion === "startled" && speedBoostUntil > timestamp)) return;
      if (!force && timestamp < nextChaseAt) return;

      const centerX = currentX + CRAWLER_WIDTH / 2;
      const centerY = currentY + CRAWLER_HEIGHT / 2;
      const cursorDistance = Math.hypot(pointerX - centerX, pointerY - centerY);
      const cursorShift = Math.hypot(pointerX - lastPlannedPointer.x, pointerY - lastPlannedPointer.y);
      const routeIsIdle = motion === "idle" && route.length === 0;
      const needsPursuit = routeIsIdle || cursorDistance > 154 || cursorShift > 66;
      if (!force && !needsPursuit) return;

      const destination = chooseChaseDestination();
      const remaining = Math.hypot(destination.x - currentX, destination.y - currentY);
      lastPlannedPointer = { x: pointerX, y: pointerY };
      nextChaseAt = timestamp + (cursorDistance < 155 ? randomBetween(620, 1050) : randomBetween(330, 560));
      if (remaining > 18) setRoute(destination);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = clamp(event.clientX, 0, window.innerWidth);
      pointerY = clamp(event.clientY, 0, window.innerHeight);
      hasPointer = true;
      // Debounce the first reaction very briefly. This keeps the crawler
      // physically catchable when the cursor lands on it, while the pursuit
      // timer still reacts quickly to every user movement.
      if (motion === "idle" || Math.hypot(pointerX - lastPlannedPointer.x, pointerY - lastPlannedPointer.y) > 66) {
        nextChaseAt = Math.min(nextChaseAt, now() + 110);
      }
    };

    const handlePointerLeave = () => {
      // Finish the current step naturally; the next pointer entry resumes pursuit.
      hasPointer = false;
    };

    const nextLeg = () => {
      const point = route.shift();
      if (!point) {
        targetX = currentX;
        targetY = currentY;
        velocityX = 0;
        velocityY = 0;
        setMotion("idle");
        nextChaseAt = now() + randomBetween(420, 820);
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
      if (event instanceof MouseEvent && event.detail > 0) {
        pointerX = clamp(event.clientX, 0, window.innerWidth);
        pointerY = clamp(event.clientY, 0, window.innerHeight);
        hasPointer = true;
      }
      clickCount += 1;
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

      // Freeze for a beat, then flee away from the user. The pursuit resumes
      // only after the short startled escape has finished.
      route = [];
      targetX = currentX;
      targetY = currentY;
      velocityX = 0;
      velocityY = 0;
      chasePauseUntil = now() + STARTLE_BOOST_MS + 650;
      nextChaseAt = chasePauseUntil;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      const destination = chooseChaseDestination(true);
      const dx = destination.x - currentX;
      const dy = destination.y - currentY;
      if (Math.abs(dx) > Math.abs(dy)) destination.y = currentY;
      else destination.x = currentX;
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
      pointerX = clamp(pointerX, 0, window.innerWidth);
      pointerY = clamp(pointerY, 0, window.innerHeight);
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
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    depthTimer = window.setInterval(() => inspectDepth(now()), OCCLUSION_CHECK_MS);
    gaitTimer = window.setInterval(advanceGait, 32);
    chaseTimer = window.setInterval(() => planChase(), CHASE_CHECK_MS);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      active = false;
      crawler.removeEventListener("click", handleCatch);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(speechTimer);
      window.clearTimeout(boostTimer);
      window.clearTimeout(reactionTimer);
      window.clearInterval(depthTimer);
      window.clearInterval(gaitTimer);
      window.clearInterval(chaseTimer);
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
