"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type MascotMode = "idle" | "walking" | "stumbling" | "reacting";
type TimedFrame = { frame: number; duration: number };

const MASCOT_SIZE = 174;
const EDGE_GUTTER = 18;
const WALK_SPEED = 48; // CSS pixels per second: a relaxed, readable walking pace.
const REVEAL_CHANCE = 0.72;
const SCROLL_CHECK_MIN_MS = 950;
const SCROLL_CHECK_MAX_MS = 1550;
const MASCOT_STAY_MIN_MS = 16000;
const MASCOT_STAY_MAX_MS = 20000;

const BLOCKING_CONTENT = [
  "h1", "h2", "h3", "h4", "h5", "p", "a", "button", "input", "textarea", "select",
  "table", "figure", "img", "svg", "[role='button']", "[class*='card']", "[class*='panel']",
  "[class*='banner']", "[class*='notice']", "[class*='briefing']", "[class*='register']",
  "[class*='disclaimer']", "[class*='actions']", "[class*='copy']", ".hq-casefile",
  ".hq-hero__grid", ".hq-hero__register", ".hq-status-card", ".hq-section-heading",
  ".site-header", ".site-nav", ".topline", ".site-footer", ".ticker", ".hq-ticker",
].join(",");

const CLICK_LINES = [
  "JUST CHECKING THE CHART.",
  "I DID MY OWN RESEARCH.",
  "ONE MORE REFRESH…",
  "IT'S PROBABLY FINE.",
];

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function randomBetween(minimum: number, maximum: number) {
  return minimum + Math.random() * (maximum - minimum);
}

export default function DepartmentMascot() {
  const mascotRef = useRef<HTMLButtonElement>(null);
  const spriteRef = useRef<HTMLSpanElement>(null);
  const speechRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mascot = mascotRef.current;
    const sprite = spriteRef.current;
    const speech = speechRef.current;
    if (!mascot || !sprite || !speech) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");
    if (reducedMotion.matches || coarsePointer.matches) return;

    const now = () => window.performance.now();
    const maxX = () => Math.max(EDGE_GUTTER, window.innerWidth - MASCOT_SIZE - EDGE_GUTTER);
    const maxY = () => Math.max(EDGE_GUTTER, window.innerHeight - MASCOT_SIZE - EDGE_GUTTER);

    let active = true;
    let visible = false;
    let mode: MascotMode = "idle";
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let direction: -1 | 1 = 1;
    let nextDirection: -1 | 1 = 1;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let hasPointer = false;
    let frame = 0;
    let animationFrame = 0;
    let actionTimer = 0;
    let presenceTimer = 0;
    let speechTimer = 0;
    let nextScrollDecisionAt = 0;
    let lastWalkFrameAt = 0;
    let walkFrameIndex = 0;
    let walksThisVisit = 0;
    let visitCount = 0;
    let clickCount = 0;
    let fallUsedThisVisit = false;

    const setMode = (next: MascotMode) => {
      mode = next;
      mascot.dataset.mode = next;
    };

    const setFrame = (index: number) => {
      frame = index;
      const column = index % 4;
      const row = Math.floor(index / 4);
      sprite.style.backgroundPosition = `${column * 100 / 3}% ${row * 100 / 3}%`;
      mascot.dataset.frame = String(index);
    };

    const setFacing = (next: -1 | 1) => {
      direction = next;
      mascot.dataset.facing = next > 0 ? "right" : "left";
    };

    const positionMascot = () => {
      mascot.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
    };

    const clearActionTimer = () => {
      if (actionTimer) window.clearTimeout(actionTimer);
      actionTimer = 0;
    };

    const scheduleAction = (callback: () => void, delay: number) => {
      clearActionTimer();
      actionTimer = window.setTimeout(() => {
        actionTimer = 0;
        if (active && visible) callback();
      }, delay);
    };

    const setVisible = (next: boolean) => {
      visible = next;
      mascot.dataset.presence = next ? "visible" : "hidden";
      mascot.setAttribute("aria-hidden", next ? "false" : "true");
      mascot.tabIndex = next ? 0 : -1;
      if (!next) {
        clearActionTimer();
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        mascot.dataset.mode = "idle";
      }
    };

    const hideMascot = () => {
      if (presenceTimer) window.clearTimeout(presenceTimer);
      presenceTimer = 0;
      if (mascot.dataset.reaction === "caught") return;
      setVisible(false);
    };

    const hasRoomAt = (x: number, y: number) => {
      // A few meaningful contact points keep the mascot out of text, controls
      // and cards while allowing it to stand naturally in open background gaps.
      const probes = [
        [MASCOT_SIZE * .5, MASCOT_SIZE * .18],
        [MASCOT_SIZE * .5, MASCOT_SIZE * .48],
        [MASCOT_SIZE * .22, MASCOT_SIZE * .83],
        [MASCOT_SIZE * .78, MASCOT_SIZE * .83],
      ];
      for (const [offsetX, offsetY] of probes) {
        const element = document.elementFromPoint(x + offsetX, y + offsetY);
        if (element?.closest(BLOCKING_CONTENT)) return false;
      }
      return true;
    };

    const chooseStandingPosition = (): Point | null => {
      const floorMin = clamp(window.innerHeight * .52, EDGE_GUTTER, maxY());
      const floorMax = clamp(window.innerHeight * .76, floorMin, maxY());
      for (let attempt = 0; attempt < 72; attempt += 1) {
        const candidate = {
          x: randomBetween(EDGE_GUTTER, maxX()),
          y: randomBetween(floorMin, floorMax),
        };
        if (hasRoomAt(candidate.x, candidate.y)) return candidate;
      }
      // On dense sections use the margin as a safe fallback rather than
      // placing the character over a call-to-action or paragraph.
      const marginCandidates: Point[] = [
        { x: EDGE_GUTTER, y: floorMin },
        { x: maxX(), y: floorMin },
        { x: EDGE_GUTTER, y: floorMax },
        { x: maxX(), y: floorMax },
      ];
      return marginCandidates.find((point) => hasRoomAt(point.x, point.y)) ?? null;
    };

    const runIdleSequence = () => {
      if (!visible) return;
      setMode("idle");
      const sequence: TimedFrame[] = [
        { frame: 0, duration: 1120 }, // checks the phone
        { frame: 1, duration: 260 },  // blink
        { frame: 0, duration: 920 },
        { frame: 2, duration: 340 },  // slower, sleepy blink
        { frame: 3, duration: 1050 }, // briefly looks up
      ];
      const play = (index: number) => {
        if (!visible) return;
        if (index >= sequence.length) {
          scheduleAction(chooseNextAction, randomBetween(500, 950));
          return;
        }
        setFrame(sequence[index].frame);
        scheduleAction(() => play(index + 1), sequence[index].duration);
      };
      play(0);
    };

    const runPhoneReaction = () => {
      if (!visible) return;
      setMode("reacting");
      const sequence: TimedFrame[] = [
        { frame: 12, duration: 560 }, // surprised
        { frame: 13, duration: 760 }, // nervous grin
        { frame: 14, duration: 950 }, // the red-candle stare
        { frame: 15, duration: 1180 }, // resigned shrug
      ];
      const play = (index: number) => {
        if (!visible) return;
        if (index >= sequence.length) {
          walksThisVisit = 0;
          runIdleSequence();
          return;
        }
        setFrame(sequence[index].frame);
        scheduleAction(() => play(index + 1), sequence[index].duration);
      };
      play(0);
    };

    const runStumble = () => {
      if (!visible || fallUsedThisVisit) return;
      fallUsedThisVisit = true;
      setMode("stumbling");
      const sequence: TimedFrame[] = [
        { frame: 8, duration: 460 },  // loses balance
        { frame: 9, duration: 520 },  // tips over
        { frame: 10, duration: 1320 }, // face down
        { frame: 11, duration: 1050 }, // peeks up, still holding the phone
        { frame: 15, duration: 920 },  // gets back to an embarrassed shrug
      ];
      const play = (index: number) => {
        if (!visible) return;
        if (index >= sequence.length) {
          setFrame(0);
          runIdleSequence();
          return;
        }
        setFrame(sequence[index].frame);
        scheduleAction(() => play(index + 1), sequence[index].duration);
      };
      play(0);
    };

    const walkToNextSpot = () => {
      if (!visible) return;
      const centerX = currentX + MASCOT_SIZE / 2;
      const pointerIsNearby = hasPointer && Math.abs(pointerY - (currentY + MASCOT_SIZE * .72)) < 230 && Math.abs(pointerX - centerX) > 120;
      let preferredDirection: -1 | 1 = pointerIsNearby
        ? (pointerX > centerX ? 1 : -1)
        : nextDirection;
      let available = preferredDirection > 0 ? maxX() - currentX : currentX - EDGE_GUTTER;
      if (available < 75) {
        preferredDirection = preferredDirection === 1 ? -1 : 1;
        available = preferredDirection > 0 ? maxX() - currentX : currentX - EDGE_GUTTER;
      }
      if (available < 28) {
        runIdleSequence();
        return;
      }

      direction = preferredDirection;
      nextDirection = preferredDirection === 1 ? -1 : 1;
      setFacing(direction);
      targetX = currentX + direction * Math.min(available, randomBetween(118, 228));
      setMode("walking");
      walkFrameIndex = 0;
      lastWalkFrameAt = 0;
      setFrame(4);
      walksThisVisit += 1;

      let previousTime = 0;
      const step = (timestamp: number) => {
        if (!active || !visible || mode !== "walking") return;
        if (!previousTime) previousTime = timestamp;
        const delta = Math.min((timestamp - previousTime) / 1000, .04);
        previousTime = timestamp;
        currentX += direction * WALK_SPEED * delta;
        const arrived = direction > 0 ? currentX >= targetX : currentX <= targetX;
        if (arrived) currentX = targetX;
        positionMascot();

        if (timestamp - lastWalkFrameAt >= 175) {
          walkFrameIndex = (walkFrameIndex + 1) % 4;
          setFrame(4 + walkFrameIndex);
          lastWalkFrameAt = timestamp;
        }

        if (arrived) {
          animationFrame = 0;
          if (walksThisVisit >= 2 && visitCount % 4 === 0 && !fallUsedThisVisit) {
            scheduleAction(runStumble, 650);
          } else if (walksThisVisit >= 2) {
            scheduleAction(runPhoneReaction, 850);
          } else {
            scheduleAction(runIdleSequence, randomBetween(800, 1250));
          }
          return;
        }
        animationFrame = window.requestAnimationFrame(step);
      };
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(step);
    };

    function chooseNextAction() {
      if (!visible) return;
      walkToNextSpot();
    }

    const showMascot = () => {
      if (!active || visible) return;
      const point = chooseStandingPosition();
      if (!point) return;
      currentX = point.x;
      currentY = point.y;
      targetX = currentX;
      walksThisVisit = 0;
      fallUsedThisVisit = false;
      visitCount += 1;
      setFacing(Math.random() < .5 ? -1 : 1);
      nextDirection = direction;
      setFrame(0);
      positionMascot();
      setVisible(true);
      runIdleSequence();
      if (presenceTimer) window.clearTimeout(presenceTimer);
      presenceTimer = window.setTimeout(hideMascot, randomBetween(MASCOT_STAY_MIN_MS, MASCOT_STAY_MAX_MS));
    };

    const handleScrollReveal = () => {
      // Scroll is only a visibility cue. We deliberately never read scrollY,
      // scroll direction or deltas: the mascot stays on the fixed backdrop.
      const timestamp = now();
      if (timestamp < nextScrollDecisionAt) return;
      nextScrollDecisionAt = timestamp + randomBetween(SCROLL_CHECK_MIN_MS, SCROLL_CHECK_MAX_MS);
      if (!visible && Math.random() < REVEAL_CHANCE) showMascot();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointerX = clamp(event.clientX, 0, window.innerWidth);
      pointerY = clamp(event.clientY, 0, window.innerHeight);
      hasPointer = true;
    };

    const handlePointerLeave = () => {
      hasPointer = false;
    };

    const handleCatch = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (!visible) return;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      clearActionTimer();
      clickCount += 1;
      const line = CLICK_LINES[(clickCount - 1) % CLICK_LINES.length];
      speech.textContent = line;
      mascot.dataset.reaction = "caught";
      mascot.setAttribute("aria-label", `Department mascot says: ${line}`);
      setMode("reacting");
      const sequence: TimedFrame[] = [
        { frame: 12, duration: 560 },
        { frame: 13, duration: 780 },
        { frame: 14, duration: 920 },
        { frame: 15, duration: 1050 },
      ];
      const play = (index: number) => {
        if (!visible) return;
        if (index >= sequence.length) {
          walksThisVisit = 0;
          mascot.dataset.reaction = "";
          mascot.setAttribute("aria-label", "Find the wandering department mascot");
          speech.textContent = "";
          setFacing(pointerX < currentX + MASCOT_SIZE / 2 ? 1 : -1);
          scheduleAction(walkToNextSpot, 500);
          return;
        }
        setFrame(sequence[index].frame);
        scheduleAction(() => play(index + 1), sequence[index].duration);
      };
      play(0);
      if (speechTimer) window.clearTimeout(speechTimer);
      speechTimer = window.setTimeout(() => {
        if (mascot.dataset.reaction === "caught") {
          mascot.dataset.reaction = "";
          speech.textContent = "";
        }
      }, 3450);
      if (presenceTimer) window.clearTimeout(presenceTimer);
      presenceTimer = window.setTimeout(hideMascot, randomBetween(6500, 8200));
    };

    const handleResize = () => {
      currentX = clamp(currentX, EDGE_GUTTER, maxX());
      currentY = clamp(currentY, EDGE_GUTTER, maxY());
      targetX = clamp(targetX, EDGE_GUTTER, maxX());
      positionMascot();
    };

    mascot.dataset.presence = "hidden";
    mascot.dataset.mode = "idle";
    mascot.dataset.facing = "right";
    mascot.dataset.reaction = "";
    mascot.setAttribute("aria-hidden", "true");
    mascot.tabIndex = -1;
    setFrame(0);
    mascot.addEventListener("click", handleCatch);
    window.addEventListener("scroll", handleScrollReveal, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("blur", handlePointerLeave);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      active = false;
      mascot.removeEventListener("click", handleCatch);
      window.removeEventListener("scroll", handleScrollReveal);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(actionTimer);
      window.clearTimeout(presenceTimer);
      window.clearTimeout(speechTimer);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <button
      ref={mascotRef}
      type="button"
      className="department-mascot"
      aria-label="Find the wandering department mascot"
      aria-hidden="true"
      title="Catch me if you can"
      data-mode="idle"
      data-facing="right"
      data-presence="hidden"
      tabIndex={-1}
    >
      <span ref={spriteRef} className="department-mascot__sprite" aria-hidden="true" />
      <span ref={speechRef} className="department-mascot__speech" aria-live="polite" />
    </button>
  );
}
