"use client";

import { useEffect, useRef } from "react";

type CrawlerFacing = "right" | "left" | "up" | "down";
type CrawlerDepth = "background" | "behind" | "over";
type OcclusionMode = Exclude<CrawlerDepth, "background">;

const CRAWLER_WIDTH = 112;
const CRAWLER_HEIGHT = 82;
const EDGE_GUTTER = 24;
const PATROL_MIN_DELAY = 1450;
const PATROL_MAX_DELAY = 2600;
const OCCLUSION_CHECK_MS = 180;

const WALKABLE_SURFACES = [
  ".topline",
  ".site-header",
  ".site-footer",
  ".ticker",
  ".hq-ticker",
  ".hq-status-card",
  ".hq-casefile",
  ".hq-casefile__header",
  ".hq-section-heading",
  ".hq-hero__grid",
  ".hq-hero__copy",
  ".case-panel",
  ".department-card",
  ".department-next-steps__card",
  "[class*='panel']",
  "[class*='card']",
  "[class*='banner']",
  "[class*='notice']",
  "[class*='briefing']",
  "[class*='stamp']",
  "[class*='widget']",
  ".passport-guide",
  ".passport-achievement",
  ".passport-stamp",
  ".daily-office-panel",
  ".audit-workspace",
  "article",
  "blockquote",
  "figure",
  "table",
  "[role='dialog']",
].join(",");

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), Math.max(minimum, maximum));
}

function randomBetween(minimum: number, maximum: number) {
  return minimum + Math.random() * (maximum - minimum);
}

function getOppositeBounds(pointerX: number, pointerY: number) {
  const middleX = window.innerWidth / 2;
  const middleY = window.innerHeight / 2;
  const minX = pointerX < middleX ? middleX - CRAWLER_WIDTH / 2 : EDGE_GUTTER;
  const maxX = pointerX > middleX ? middleX - CRAWLER_WIDTH / 2 : window.innerWidth - CRAWLER_WIDTH - EDGE_GUTTER;
  const minY = pointerY < middleY ? middleY - CRAWLER_HEIGHT / 2 : EDGE_GUTTER;
  const maxY = pointerY > middleY ? middleY - CRAWLER_HEIGHT / 2 : window.innerHeight - CRAWLER_HEIGHT - EDGE_GUTTER;

  return {
    minX: clamp(minX, EDGE_GUTTER, window.innerWidth - CRAWLER_WIDTH - EDGE_GUTTER),
    maxX: clamp(maxX, EDGE_GUTTER, window.innerWidth - CRAWLER_WIDTH - EDGE_GUTTER),
    minY: clamp(minY, EDGE_GUTTER, window.innerHeight - CRAWLER_HEIGHT - EDGE_GUTTER),
    maxY: clamp(maxY, EDGE_GUTTER, window.innerHeight - CRAWLER_HEIGHT - EDGE_GUTTER),
  };
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
    const rightEdge = () => Math.max(EDGE_GUTTER, window.innerWidth - CRAWLER_WIDTH - EDGE_GUTTER);
    const bottomEdge = () => Math.max(EDGE_GUTTER, window.innerHeight - CRAWLER_HEIGHT - EDGE_GUTTER);

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let currentX = clamp(window.innerWidth / 2 - CRAWLER_WIDTH / 2, EDGE_GUTTER, rightEdge());
    let currentY = clamp(window.innerHeight / 2 - CRAWLER_HEIGHT / 2, EDGE_GUTTER, bottomEdge());
    let targetX = currentX;
    let targetY = currentY;
    let anchorX = currentX;
    let anchorY = currentY;
    let velocityX = 0;
    let velocityY = 0;
    let frame = 0;
    let active = true;
    let lastPointerActivity = now();
    let nextPatrolAt = lastPointerActivity + 1300;
    let lastPatrolAxis: "x" | "y" = "x";
    let facing: CrawlerFacing = "right";
    let motion: "moving" | "idle" = "idle";
    let depth: CrawlerDepth = "background";
    let obstacleMode = new WeakMap<Element, OcclusionMode>();
    let elevatedSurfaces = new WeakMap<HTMLElement, { position: string; zIndex: string }>();
    let activeElement: HTMLElement | null = null;
    let lastDepthCheck = 0;
    let depthTimer = 0;
    let gaitTimer = 0;
    let spriteFrame = 0;
    let lastSpriteFrameAt = now();
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

    const setMotion = (next: "moving" | "idle") => {
      if (motion === next) return;
      motion = next;
      crawler.dataset.motion = next;
    };

    const bringSurfaceForward = (element: HTMLElement) => {
      if (elevatedSurfaces.has(element)) return;
      const computed = window.getComputedStyle(element);
      const currentZIndex = Number.parseInt(computed.zIndex, 10);
      // Never downgrade existing overlays, headers or fixed navigation layers.
      if (Number.isFinite(currentZIndex) && currentZIndex > 1) return;
      const parentDisplay = element.parentElement ? window.getComputedStyle(element.parentElement).display : "block";
      elevatedSurfaces.set(element, {
        position: element.style.position,
        zIndex: element.style.zIndex,
      });
      if (computed.position === "static" && parentDisplay !== "grid" && parentDisplay !== "inline-grid" && parentDisplay !== "flex" && parentDisplay !== "inline-flex") {
        element.style.position = "relative";
      }
      element.style.zIndex = "2";
    };

    const restoreSurface = (element: HTMLElement) => {
      const original = elevatedSurfaces.get(element);
      if (!original) return;
      element.style.position = original.position;
      element.style.zIndex = original.zIndex;
      elevatedSurfaces.delete(element);
    };

    const mirrorPointer = () => {
      const bounds = getOppositeBounds(pointerX, pointerY);
      anchorX = clamp(window.innerWidth - pointerX - CRAWLER_WIDTH / 2, bounds.minX, bounds.maxX);
      anchorY = clamp(window.innerHeight - pointerY - CRAWLER_HEIGHT / 2, bounds.minY, bounds.maxY);
      targetX = anchorX;
      targetY = anchorY;
    };

    const chooseFacingFromMovement = (vx: number, vy: number, intendedX: number, intendedY: number) => {
      // Prefer the dominant destination axis when the pointer changes quickly;
      // spring inertia can briefly point the body the old way during a turn.
      const horizontalIntent = Math.abs(intendedX);
      const verticalIntent = Math.abs(intendedY);
      const intentIsClear = Math.max(horizontalIntent, verticalIntent) > 8;
      const horizontal = intentIsClear ? horizontalIntent : Math.abs(vx);
      const vertical = intentIsClear ? verticalIntent : Math.abs(vy);
      const directionX = intentIsClear ? intendedX : vx;
      const directionY = intentIsClear ? intendedY : vy;
      if (horizontal < 0.42 && vertical < 0.42) return;
      const currentlyHorizontal = facing === "left" || facing === "right";
      if (horizontal > vertical * 1.12 || (currentlyHorizontal && horizontal >= vertical * 0.86)) {
        setFacing(directionX >= 0 ? "right" : "left");
      } else if (vertical > horizontal * 1.12 || (!currentlyHorizontal && vertical >= horizontal * 0.86)) {
        setFacing(directionY < 0 ? "up" : "down");
      }
    };

    const advanceGait = () => {
      const timestamp = now();
      const frameInterval = motion === "moving" ? 92 : 235;
      if (!sprite || timestamp - lastSpriteFrameAt < frameInterval) return;
      spriteFrame = (spriteFrame + 1) % 11;
      // Eleven source poses in a horizontal strip. The twelfth/front cell is
      // deliberately excluded from the production walking sequence.
      sprite.style.backgroundPosition = `${spriteFrame * 10}% 50%`;
      lastSpriteFrameAt = timestamp;
    };

    const inspectDepth = (timestamp: number) => {
      if (timestamp - lastDepthCheck < OCCLUSION_CHECK_MS) return;
      lastDepthCheck = timestamp;

      const crawlerLeft = currentX + 9;
      const crawlerTop = currentY + 9;
      const crawlerRight = currentX + CRAWLER_WIDTH - 9;
      const crawlerBottom = currentY + CRAWLER_HEIGHT - 9;
      const crawlerArea = (crawlerRight - crawlerLeft) * (crawlerBottom - crawlerTop);
      const elements = document.querySelectorAll<HTMLElement>(WALKABLE_SURFACES);
      let bestElement: HTMLElement | null = null;
      let bestElementArea = Number.POSITIVE_INFINITY;
      let bestMode: OcclusionMode | null = null;

      for (const element of elements) {
        if (element === crawler || element.closest(".screen-crawler")) continue;
        const rect = element.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 26 || rect.width * rect.height > window.innerWidth * window.innerHeight * 0.48) continue;
        if (rect.bottom <= 0 || rect.top >= window.innerHeight || rect.right <= 0 || rect.left >= window.innerWidth) continue;

        const overlapWidth = Math.max(0, Math.min(crawlerRight, rect.right) - Math.max(crawlerLeft, rect.left));
        const overlapHeight = Math.max(0, Math.min(crawlerBottom, rect.bottom) - Math.max(crawlerTop, rect.top));
        const overlapArea = overlapWidth * overlapHeight;
        const elementArea = rect.width * rect.height;
        // Ignore tiny text fragments: the insect should interact with the
        // card, panel or banner itself, not raise a single label above it.
        if (elementArea < crawlerArea * 0.72 || overlapArea / crawlerArea < 0.2 || elementArea >= bestElementArea) continue;

        let mode = obstacleMode.get(element);
        if (!mode) {
          const zIndex = Number.parseInt(window.getComputedStyle(element).zIndex, 10);
          let elevatedAncestor = false;
          let ancestor = element.parentElement;
          while (ancestor && ancestor !== document.body && !ancestor.classList.contains("department-scene")) {
            const ancestorZIndex = Number.parseInt(window.getComputedStyle(ancestor).zIndex, 10);
            if (Number.isFinite(ancestorZIndex) && ancestorZIndex >= 1) {
              elevatedAncestor = true;
              break;
            }
            ancestor = ancestor.parentElement;
          }
          // Existing overlays and their stacking contexts remain in front.
          // Ordinary content is chosen randomly so the insect alternates
          // between slipping underneath it and crawling across its surface.
          mode = elevatedAncestor || (Number.isFinite(zIndex) && zIndex >= 1) ? "behind" : Math.random() < 0.56 ? "behind" : "over";
          obstacleMode.set(element, mode);
        }
        bestElementArea = elementArea;
        bestElement = element;
        bestMode = mode;
      }

      if (bestElement && bestMode) {
        setDepth(bestMode);
        // Raise only the panel currently covering the crawler. This gives
        // genuine per-object foreground/background crossings without lifting
        // the whole page above the creature.
        if (activeElement && activeElement !== bestElement) restoreSurface(activeElement);
        if (bestMode === "behind") bringSurfaceForward(bestElement);
        else if (activeElement === bestElement) restoreSurface(bestElement);
        activeElement = bestElement;
      } else {
        if (activeElement) restoreSurface(activeElement);
        activeElement = null;
        setDepth("background");
      }
    };

    const animate = (timestamp: number) => {
      // A damped spring gives the creature weight and a small trailing body.
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      velocityX = clamp((velocityX + dx * 0.026) * 0.78, -13, 13);
      velocityY = clamp((velocityY + dy * 0.026) * 0.78, -13, 13);
      currentX += velocityX;
      currentY += velocityY;

      if (Math.abs(dx) < 0.28 && Math.abs(dy) < 0.28 && Math.abs(velocityX) < 0.22 && Math.abs(velocityY) < 0.22) {
        currentX = targetX;
        currentY = targetY;
        velocityX = 0;
        velocityY = 0;
      }

      crawler.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      setMotion(Math.hypot(velocityX, velocityY) > 0.5 ? "moving" : "idle");
      chooseFacingFromMovement(velocityX, velocityY, dx, dy);
      inspectDepth(timestamp);

      if (Math.abs(targetX - currentX) > 0.3 || Math.abs(targetY - currentY) > 0.3 || Math.abs(velocityX) > 0.22 || Math.abs(velocityY) > 0.22) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const requestMovement = () => {
      if (!frame && active) frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const moved = Math.hypot(event.clientX - pointerX, event.clientY - pointerY);
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (moved > 0.7) {
        lastPointerActivity = now();
        mirrorPointer();
        requestMovement();
      }
    };

    const handleResize = () => {
      mirrorPointer();
      currentX = clamp(currentX, EDGE_GUTTER, rightEdge());
      currentY = clamp(currentY, EDGE_GUTTER, bottomEdge());
      requestMovement();
    };

    // With a still pointer, the insect makes short, purposeful patrols around
    // its mirrored anchor. Each waypoint is cardinal, never a frontal pose.
    const patrolTimer = window.setInterval(() => {
      const timestamp = now();
      if (timestamp - lastPointerActivity < 950 || timestamp < nextPatrolAt) return;
      const bounds = getOppositeBounds(pointerX, pointerY);
      const patrolMinX = Math.max(bounds.minX, anchorX - 58);
      const patrolMaxX = Math.min(bounds.maxX, anchorX + 58);
      const patrolMinY = Math.max(bounds.minY, anchorY - 58);
      const patrolMaxY = Math.min(bounds.maxY, anchorY + 58);
      const axis: "x" | "y" = lastPatrolAxis === "x" ? "y" : "x";
      lastPatrolAxis = axis;
      const distance = randomBetween(22, 50) * (Math.random() < 0.5 ? -1 : 1);
      if (axis === "x") {
        targetX = clamp(currentX + distance, patrolMinX, patrolMaxX);
        targetY = clamp(currentY, patrolMinY, patrolMaxY);
      } else {
        targetX = clamp(currentX, patrolMinX, patrolMaxX);
        targetY = clamp(currentY + distance, patrolMinY, patrolMaxY);
      }
      // Intersect the local patrol radius with the mirrored half-screen bounds:
      // even self-directed movements stay on the side opposite the pointer.
      nextPatrolAt = timestamp + randomBetween(PATROL_MIN_DELAY, PATROL_MAX_DELAY);
      requestMovement();
    }, 160);

    mirrorPointer();
    targetX = currentX;
    targetY = currentY;
    crawler.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    crawler.dataset.facing = facing;
    crawler.dataset.motion = motion;
    crawler.dataset.depth = depth;
    crawler.classList.add("screen-crawler--ready");
    depthTimer = window.setInterval(() => inspectDepth(now()), OCCLUSION_CHECK_MS);
    gaitTimer = window.setInterval(advanceGait, 32);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      active = false;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      window.clearInterval(patrolTimer);
      window.clearInterval(depthTimer);
      window.clearInterval(gaitTimer);
      if (activeElement) restoreSurface(activeElement);
      activeElement = null;
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
