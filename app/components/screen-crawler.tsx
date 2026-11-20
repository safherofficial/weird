"use client";

import { useEffect, useRef } from "react";

type CrawlerFacing = "right" | "left" | "up" | "down";
type CrawlerMotion = "moving" | "idle" | "startled";
type Point = { x: number; y: number };

const CRAWLER_WIDTH = 112;
const CRAWLER_HEIGHT = 82;
const EDGE_GUTTER = 24;
const CHASE_CHECK_MS = 360;
const SPEECH_DURATION_MS = 1750;
const STARTLE_BOOST_MS = 900;
const SCROLL_REVEAL_CHANCE = 0.72;

const BLOCKING_CONTENT = [
  "h1", "h2", "h3", "h4", "h5", "p", "a", "button", "input", "textarea", "select",
  "table", "figure", "img", "svg", "[role='button']", "[class*='card']", "[class*='panel']",
  "[class*='banner']", "[class*='notice']", "[class*='briefing']", "[class*='register']", "[class*='disclaimer']",
  ".hq-casefile", ".site-header", ".topline", ".site-footer", ".ticker", ".hq-ticker",
].join(",");

const CLICK_REPLIES = [
  "HEY. HANDS OFF THE ARMOR.",
  "NOT A BUG. A FEATURE.",
  "YOU SAW NOTHING.",
  "BACK TO MY SHIFT.",
  "NICE TRY, HUMAN.",
];

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
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
    let visible = false;
    let facing: CrawlerFacing = "right";
    let motion: CrawlerMotion = "idle";
    let nextFrame = 0;
    let lastFrameAt = now();
    let clickCount = 0;
    let speedBoostUntil = 0;
    let chasePauseUntil = 0;
    let nextChaseAt = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let lastPlannedPointer: Point = { x: pointerX, y: pointerY };
    let hasPointer = false;
    let nextScrollDecisionAt = 0;
    let presenceTimer = 0;
    let speechTimer = 0;
    let boostTimer = 0;
    let reactionTimer = 0;
    let chaseTimer = 0;
    let gaitTimer = 0;
    const sprite = crawler.querySelector<HTMLElement>(".screen-crawler__sprite");

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

    const faceTarget = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > 1) setFacing(dx > 0 ? "right" : "left");
      } else if (Math.abs(dy) > 1) {
        setFacing(dy > 0 ? "down" : "up");
      }
    };

    const positionCrawler = () => {
      crawler.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
    };

    const setVisible = (next: boolean) => {
      visible = next;
      crawler.dataset.presence = next ? "visible" : "hidden";
      crawler.setAttribute("aria-hidden", next ? "false" : "true");
      if (!next) {
        crawler.tabIndex = -1;
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        route = [];
        targetX = currentX;
        targetY = currentY;
        velocityX = 0;
        velocityY = 0;
        setMotion("idle");
      } else {
        crawler.tabIndex = 0;
      }
    };

    const hideCrawler = () => {
      if (presenceTimer) window.clearTimeout(presenceTimer);
      presenceTimer = 0;
      if (crawler.dataset.reaction === "caught") return;
      setVisible(false);
    };

    const findBackdropPoint = (preferred?: Point): Point => {
      let best: Point | null = null;
      let bestBlocked = Number.POSITIVE_INFINITY;
      const candidates = preferred ? [preferred] : [];
      for (let index = 0; index < 48; index += 1) {
        candidates.push(preferred ? {
          x: preferred.x + randomBetween(-210, 210),
          y: preferred.y + randomBetween(-150, 150),
        } : {
          x: randomBetween(EDGE_GUTTER, rightEdge()),
          y: randomBetween(EDGE_GUTTER, bottomEdge()),
        });
      }
      for (const candidate of candidates) {
        const point = {
          x: clamp(candidate.x, EDGE_GUTTER, rightEdge()),
          y: clamp(candidate.y, EDGE_GUTTER, bottomEdge()),
        };
        const samples = [
          [12, 12], [CRAWLER_WIDTH / 2, 12], [CRAWLER_WIDTH - 12, 12],
          [12, CRAWLER_HEIGHT / 2], [CRAWLER_WIDTH / 2, CRAWLER_HEIGHT / 2],
          [CRAWLER_WIDTH - 12, CRAWLER_HEIGHT / 2],
          [12, CRAWLER_HEIGHT - 12], [CRAWLER_WIDTH / 2, CRAWLER_HEIGHT - 12], [CRAWLER_WIDTH - 12, CRAWLER_HEIGHT - 12],
        ];
        let blocked = 0;
        let centerBlocked = false;
        for (const [offsetX, offsetY] of samples) {
          const element = document.elementFromPoint(point.x + offsetX, point.y + offsetY);
          if (element?.closest(BLOCKING_CONTENT)) {
            blocked += 1;
            if (offsetX === CRAWLER_WIDTH / 2 && offsetY === CRAWLER_HEIGHT / 2) centerBlocked = true;
          }
        }
        const score = blocked + (centerBlocked ? 12 : 0);
        if (score < bestBlocked) {
          bestBlocked = score;
          best = point;
        }
        if (!centerBlocked && blocked <= 1) return point;
      }
      return best ?? { x: randomBetween(EDGE_GUTTER, rightEdge()), y: randomBetween(EDGE_GUTTER, bottomEdge()) };
    };

    const chooseSpawnPoint = (): Point => findBackdropPoint();
    const chooseChaseDestination = (escape = false): Point => {
      const centerX = currentX + CRAWLER_WIDTH / 2;
      const centerY = currentY + CRAWLER_HEIGHT / 2;
      const dx = pointerX - centerX;
      const dy = pointerY - centerY;
      const distance = Math.hypot(dx, dy);
      let candidate: Point;

      if (escape) {
        const awayAngle = distance > 2 ? Math.atan2(-dy, -dx) : randomBetween(0, Math.PI * 2);
        const angle = awayAngle + randomBetween(-0.32, 0.32);
        const radius = randomBetween(170, 235);
        candidate = { x: pointerX + Math.cos(angle) * radius, y: pointerY + Math.sin(angle) * radius };
      } else if (distance > 150) {
        const standoff = randomBetween(72, 98);
        candidate = {
          x: pointerX - (dx / distance) * standoff,
          y: pointerY - (dy / distance) * standoff,
        };
      } else {
        const currentAngle = distance > 2 ? Math.atan2(-dy, -dx) : randomBetween(0, Math.PI * 2);
        const angle = currentAngle + randomBetween(-1.15, 1.15);
        const radius = randomBetween(78, 118);
        candidate = { x: pointerX + Math.cos(angle) * radius, y: pointerY + Math.sin(angle) * radius };
      }

      candidate.x = clamp(candidate.x - CRAWLER_WIDTH / 2, EDGE_GUTTER, rightEdge());
      candidate.y = clamp(candidate.y - CRAWLER_HEIGHT / 2, EDGE_GUTTER, bottomEdge());

      // Keep the creature on exposed parts of the static habitat. When its
      // pursuit line would cross content, search nearby backdrop gaps instead
      // of making it disappear under a panel for the whole journey.
      return findBackdropPoint(candidate);
    };

    const requestFrame = () => {
      if (!frame && active && visible) frame = window.requestAnimationFrame(animate);
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
      const points = [corner, destination];
      route = points.filter((point, index) => {
        const previous = index === 0 ? { x: currentX, y: currentY } : points[index - 1];
        return Math.hypot(point.x - previous.x, point.y - previous.y) > 14;
      });
      nextLeg();
    };

    const planChase = (force = false) => {
      const timestamp = now();
      if (!active || !visible || !hasPointer || timestamp < chasePauseUntil || (motion === "startled" && speedBoostUntil > timestamp)) return;
      if (!force && timestamp < nextChaseAt) return;

      const centerX = currentX + CRAWLER_WIDTH / 2;
      const centerY = currentY + CRAWLER_HEIGHT / 2;
      const cursorDistance = Math.hypot(pointerX - centerX, pointerY - centerY);
      const cursorShift = Math.hypot(pointerX - lastPlannedPointer.x, pointerY - lastPlannedPointer.y);
      const routeIsIdle = motion === "idle" && route.length === 0;
      if (!force && !routeIsIdle && cursorDistance <= 154 && cursorShift <= 66) return;

      const destination = chooseChaseDestination();
      const remaining = Math.hypot(destination.x - currentX, destination.y - currentY);
      lastPlannedPointer = { x: pointerX, y: pointerY };
      nextChaseAt = timestamp + (cursorDistance < 155 ? randomBetween(620, 1050) : randomBetween(330, 560));
      if (remaining > 18) setRoute(destination);
    };

    const showRandomly = () => {
      if (!active || visible) return;
      const spawn = chooseSpawnPoint();
      currentX = spawn.x;
      currentY = spawn.y;
      targetX = currentX;
      targetY = currentY;
      velocityX = 0;
      velocityY = 0;
      route = [];
      setFacing(Math.random() < 0.5 ? "left" : "right");
      positionCrawler();
      setVisible(true);
      nextChaseAt = now() + randomBetween(180, 420);
      if (hasPointer) planChase(true);
      if (presenceTimer) window.clearTimeout(presenceTimer);
      presenceTimer = window.setTimeout(hideCrawler, randomBetween(4300, 7600));
    };

    const handleScrollReveal = () => {
      // Scroll only offers a random chance to reveal the creature. No direction,
      // scroll offset, delta, or content position is ever used for its movement.
      const timestamp = now();
      if (timestamp < nextScrollDecisionAt) return;
      nextScrollDecisionAt = timestamp + randomBetween(850, 1450);
      if (!visible) {
        if (Math.random() < SCROLL_REVEAL_CHANCE) showRandomly();
      } else if (Math.random() < 0.035 && crawler.dataset.reaction !== "caught") {
        hideCrawler();
      }
    };

    const animate = () => {
      frame = 0;
      if (!visible) return;
      const dx = targetX - currentX;
      const dy = targetY - currentY;
      const startled = speedBoostUntil > now();
      const maxSpeed = startled ? 13.5 : 6.2;
      const acceleration = startled ? 0.04 : 0.018;
      const damping = startled ? 0.79 : 0.82;
      velocityX = clamp((velocityX + dx * acceleration) * damping, -maxSpeed, maxSpeed);
      velocityY = clamp((velocityY + dy * acceleration) * damping, -maxSpeed, maxSpeed);
      if (Math.abs(dx) < 1) velocityX *= 0.55;
      if (Math.abs(dy) < 1) velocityY *= 0.55;
      currentX = clamp(currentX + velocityX, EDGE_GUTTER, rightEdge());
      currentY = clamp(currentY + velocityY, EDGE_GUTTER, bottomEdge());

      if (Math.abs(dx) < 1.1 && Math.abs(dy) < 1.1 && Math.abs(velocityX) < 0.34 && Math.abs(velocityY) < 0.34) {
        currentX = targetX;
        currentY = targetY;
        velocityX = 0;
        velocityY = 0;
        positionCrawler();
        nextLeg();
        return;
      }
      positionCrawler();
      frame = window.requestAnimationFrame(animate);
    };

    const handleCatch = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!visible) return;
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
      if (Math.abs(destination.x - currentX) > Math.abs(destination.y - currentY)) destination.y = currentY;
      else destination.x = currentX;
      reactionTimer = window.setTimeout(() => {
        reactionTimer = 0;
        if (active && visible) setRoute(destination);
      }, 300);
      if (presenceTimer) window.clearTimeout(presenceTimer);
      presenceTimer = window.setTimeout(hideCrawler, randomBetween(4800, 6500));
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = clamp(event.clientX, 0, window.innerWidth);
      pointerY = clamp(event.clientY, 0, window.innerHeight);
      hasPointer = true;
      if (!visible) return;
      if (motion === "idle" || Math.hypot(pointerX - lastPlannedPointer.x, pointerY - lastPlannedPointer.y) > 66) {
        nextChaseAt = Math.min(nextChaseAt, now() + 110);
      }
    };

    const handlePointerLeave = () => {
      hasPointer = false;
    };

    const handleResize = () => {
      currentX = clamp(currentX, EDGE_GUTTER, rightEdge());
      currentY = clamp(currentY, EDGE_GUTTER, bottomEdge());
      targetX = clamp(targetX, EDGE_GUTTER, rightEdge());
      targetY = clamp(targetY, EDGE_GUTTER, bottomEdge());
      positionCrawler();
    };

    const advanceGait = () => {
      if (!visible) return;
      const timestamp = now();
      const interval = motion === "startled" ? 58 : motion === "moving" ? 94 : 240;
      if (!sprite || timestamp - lastFrameAt < interval) return;
      nextFrame = (nextFrame + 1) % 11;
      sprite.style.backgroundPosition = `${nextFrame * 10}% 50%`;
      lastFrameAt = timestamp;
    };

    crawler.dataset.presence = "hidden";
    crawler.dataset.facing = facing;
    crawler.dataset.motion = motion;
    crawler.setAttribute("aria-hidden", "true");
    crawler.tabIndex = -1;
    positionCrawler();
    crawler.addEventListener("click", handleCatch);
    window.addEventListener("scroll", handleScrollReveal, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    window.addEventListener("resize", handleResize, { passive: true });
    gaitTimer = window.setInterval(advanceGait, 32);
    chaseTimer = window.setInterval(() => planChase(), CHASE_CHECK_MS);

    return () => {
      active = false;
      crawler.removeEventListener("click", handleCatch);
      window.removeEventListener("scroll", handleScrollReveal);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(presenceTimer);
      window.clearTimeout(speechTimer);
      window.clearTimeout(boostTimer);
      window.clearTimeout(reactionTimer);
      window.clearInterval(gaitTimer);
      window.clearInterval(chaseTimer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      ref={crawlerRef}
      type="button"
      className="screen-crawler"
      aria-label="Catch the wandering crawler"
      aria-hidden="true"
      title="Catch me if you can"
      data-facing="right"
      data-motion="idle"
      data-presence="hidden"
      tabIndex={-1}
    >
      <span className="screen-crawler__orientation" aria-hidden="true">
        <span className="screen-crawler__sprite" />
      </span>
      <span ref={speechRef} className="screen-crawler__speech" aria-live="polite" />
    </button>
  );
}
