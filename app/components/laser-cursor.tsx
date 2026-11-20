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
  'textarea',
  '[contenteditable="true"]',
  '[role="textbox"]',
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="color"]):not([type="hidden"])',
].join(", ");

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
    let motionReduced = reducedMotion.matches;

    const writePosition = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const stopAnimation = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };

    const animatePosition = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      currentX += dx * 0.28;
      currentY += dy * 0.28;

      if (Math.abs(dx) < 0.35 && Math.abs(dy) < 0.35) {
        currentX = targetX;
        currentY = targetY;
        writePosition(currentX, currentY);
        animationFrame = 0;
        return;
      }

      writePosition(currentX, currentY);
      animationFrame = window.requestAnimationFrame(animatePosition);
    };

    const schedulePosition = () => {
      if (motionReduced) {
        currentX = targetX;
        currentY = targetY;
        writePosition(currentX, currentY);
        return;
      }

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animatePosition);
      }
    };

    const hideCursor = () => {
      cursor.dataset.visible = "false";
      cursor.dataset.state = "idle";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const target = event.target;
      const element = target instanceof Element ? target : null;
      const textEntry = Boolean(element?.closest(TEXT_ENTRY_SELECTOR));

      if (textEntry) {
        hideCursor();
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasPosition) {
        currentX = targetX;
        currentY = targetY;
        hasPosition = true;
      }

      cursor.dataset.visible = "true";
      cursor.dataset.state = element?.closest(INTERACTIVE_SELECTOR) ? "hover" : "idle";
      schedulePosition();
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") hideCursor();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && cursor.dataset.visible === "true") {
        cursor.dataset.pressed = "true";
      }
    };

    const handlePointerUp = () => {
      delete cursor.dataset.pressed;
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
    window.addEventListener("blur", handleWindowLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      stopAnimation();
      root.classList.remove("laser-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("blur", handleWindowLeave);
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
    />
  );
}
