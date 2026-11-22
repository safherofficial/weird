"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button',
  'input:not([type="hidden"])',
  'select',
  'textarea',
  'summary',
  'label',
  '[role="button"]',
  '[role="link"]',
  '[contenteditable="true"]',
].join(", ");

const TEXT_ENTRY_SELECTOR = [
  "textarea",
  '[contenteditable="true"]',
  '[role="textbox"]',
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="color"]):not([type="hidden"])',
].join(", ");

const FOLLOW_TIME_CONSTANT_MS = 48;
const MAX_FRAME_DELTA_MS = 34;
const POSITION_EPSILON = 0.3;
const NOMINAL_FRAME_MS = 1000 / 60;

export default function LaserCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasPosition = false;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let motionReduced = reducedMotion.matches;
    let lastTarget: Element | null = null;
    let isTextEntry = false;
    let isInteractive = false;

    const writePosition = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const stopAnimation = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastFrameTime = 0;
    };

    const setCursorState = (state: "idle" | "hover") => {
      if (cursor.dataset.state !== state) cursor.dataset.state = state;
    };

    const setCursorVisible = (visible: boolean) => {
      const value = String(visible);
      if (cursor.dataset.visible !== value) cursor.dataset.visible = value;
    };

    const updateHitTarget = (target: Element | null) => {
      if (target === lastTarget) return;
      lastTarget = target;
      isTextEntry = Boolean(target?.closest(TEXT_ENTRY_SELECTOR));
      isInteractive = Boolean(target?.closest(INTERACTIVE_SELECTOR));
    };

    // Pointer events carry the authoritative click coordinates. Snap to them
    // before the browser dispatches click so the easing loop cannot trail behind.
    const syncToPointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return false;

      const target = event.target instanceof Element ? event.target : null;
      updateHitTarget(target);

      if (isTextEntry) {
        hideCursor();
        return false;
      }

      targetX = event.clientX;
      targetY = event.clientY;
      currentX = targetX;
      currentY = targetY;
      hasPosition = true;
      stopAnimation();
      writePosition(currentX, currentY);
      setCursorVisible(true);
      setCursorState(isInteractive ? "hover" : "idle");
      return true;
    };

    const animatePosition = (timestamp: number) => {
      if (!hasPosition || cursor.dataset.visible !== "true") {
        animationFrame = 0;
        lastFrameTime = 0;
        return;
      }

      const elapsed = lastFrameTime
        ? Math.min(timestamp - lastFrameTime, MAX_FRAME_DELTA_MS)
        : NOMINAL_FRAME_MS;
      lastFrameTime = timestamp;

      // Exponential smoothing keeps the same follow response at 60, 120 and 144 Hz.
      const follow = 1 - Math.exp(-elapsed / FOLLOW_TIME_CONSTANT_MS);
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      currentX += dx * follow;
      currentY += dy * follow;

      if (Math.abs(dx) < POSITION_EPSILON && Math.abs(dy) < POSITION_EPSILON) {
        currentX = targetX;
        currentY = targetY;
        writePosition(currentX, currentY);
        animationFrame = 0;
        lastFrameTime = 0;
        return;
      }

      writePosition(currentX, currentY);
      animationFrame = window.requestAnimationFrame(animatePosition);
    };

    const schedulePosition = () => {
      if (motionReduced) {
        stopAnimation();
        currentX = targetX;
        currentY = targetY;
        writePosition(currentX, currentY);
        return;
      }

      if (!animationFrame) {
        lastFrameTime = 0;
        animationFrame = window.requestAnimationFrame(animatePosition);
      }
    };

    const hideCursor = () => {
      if (cursor.dataset.visible !== "true") return;

      setCursorVisible(false);
      setCursorState("idle");
      delete cursor.dataset.pressed;
      hasPosition = false;
      lastTarget = null;
      stopAnimation();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const target = event.target instanceof Element ? event.target : null;
      updateHitTarget(target);

      if (isTextEntry) {
        hideCursor();
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasPosition) {
        currentX = targetX;
        currentY = targetY;
        hasPosition = true;
        writePosition(currentX, currentY);
      }

      setCursorVisible(true);
      setCursorState(isInteractive ? "hover" : "idle");
      schedulePosition();
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hideCursor();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (syncToPointer(event) && cursor.dataset.pressed !== "true") {
        cursor.dataset.pressed = "true";
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      syncToPointer(event);
      if (cursor.dataset.pressed === "true") delete cursor.dataset.pressed;
    };

    const handleMotionChange = () => {
      motionReduced = reducedMotion.matches;
      cursor.dataset.reducedMotion = String(motionReduced);

      if (motionReduced) {
        stopAnimation();
        currentX = targetX;
        currentY = targetY;
        if (hasPosition) writePosition(currentX, currentY);
      }
    };

    const handleWindowLeave = () => hideCursor();
    const handleDocumentMouseOut = (event: MouseEvent) => {
      if (event.relatedTarget === null) hideCursor();
    };
    const handleVisibilityChange = () => {
      if (document.hidden) hideCursor();
    };

    root.classList.add("laser-cursor-enabled");
    cursor.dataset.visible = "false";
    cursor.dataset.state = "idle";
    cursor.dataset.reducedMotion = String(motionReduced);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    window.addEventListener("pointercancel", handlePointerUp, { passive: true });
    window.addEventListener("mouseleave", handleWindowLeave);
    window.addEventListener("blur", handleWindowLeave);
    document.addEventListener("mouseout", handleDocumentMouseOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      stopAnimation();
      root.classList.remove("laser-cursor-enabled");
      setCursorVisible(false);
      delete cursor.dataset.pressed;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("mouseleave", handleWindowLeave);
      window.removeEventListener("blur", handleWindowLeave);
      document.removeEventListener("mouseout", handleDocumentMouseOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <span
      ref={cursorRef}
      className="laser-cursor"
      aria-hidden="true"
      data-visible="false"
      data-state="idle"
    >
      <span className="laser-cursor__visual" />
    </span>
  );
}
