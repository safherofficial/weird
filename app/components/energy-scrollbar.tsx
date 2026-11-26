"use client";

import { useEffect, useRef } from "react";

const THUMB_SIZE = 30;
const TRAIL_LIFETIME_MS = 560;
const PARTICLE_LIFETIME_MS = 360;
const MAX_TRAIL_POINTS = 72;
const MAX_PARTICLES = 36;

type TrailPoint = { y: number; at: number };
type EnergyParticle = {
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  size: number;
  bornAt: number;
  lifetime: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getScrollElement() {
  return document.scrollingElement ?? document.documentElement;
}

export default function EnergyScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!track || !thumb) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollElement = getScrollElement();
    const trail: TrailPoint[] = [];
    const particles: EnergyParticle[] = [];

    let maxScroll = 0;
    let availableTravel = 0;
    let lastPaintedScrollTop = scrollElement.scrollTop;
    let animationFrame = 0;
    let idleTimer = 0;
    let pixelRatio = 1;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let draggingPointer: number | null = null;
    let previousInlineScrollBehavior: string | null = null;
    let isReducedMotion = reducedMotion.matches;
    let ownsScrollRegionId = false;

    if (!document.documentElement.id) {
      document.documentElement.id = "page-scroll-region";
      ownsScrollRegionId = true;
    }
    track.setAttribute("aria-controls", document.documentElement.id);

    const getScrollMetrics = () => {
      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body?.scrollHeight ?? 0,
        scrollElement.scrollHeight,
      );
      maxScroll = Math.max(0, documentHeight - window.innerHeight);
      availableTravel = Math.max(0, track.clientHeight - THUMB_SIZE);
      return scrollElement.scrollTop;
    };

    const updateThumb = (scrollTop: number) => {
      const progress = maxScroll > 0 ? clamp(scrollTop / maxScroll, 0, 1) : 0;
      const y = availableTravel * progress;
      const transform = `translate3d(-50%, ${y.toFixed(2)}px, 0)`;
      if (thumb.style.transform !== transform) thumb.style.transform = transform;

      const active = String(maxScroll > 1);
      if (track.dataset.active !== active) track.dataset.active = active;
      const tabIndex = active === "true" ? 0 : -1;
      if (track.tabIndex !== tabIndex) track.tabIndex = tabIndex;
      const value = String(Math.round(progress * 100));
      if (track.getAttribute("aria-valuenow") !== value) track.setAttribute("aria-valuenow", value);
      const valueText = `${value} percent from top`;
      if (track.getAttribute("aria-valuetext") !== valueText) track.setAttribute("aria-valuetext", valueText);
    };

    const resizeCanvas = () => {
      if (!canvas || !context) return;
      canvasWidth = track.clientWidth;
      canvasHeight = track.clientHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(canvasWidth * pixelRatio));
      canvas.height = Math.max(1, Math.round(canvasHeight * pixelRatio));
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, canvasWidth, canvasHeight);
    };

    const drawEnergyTrail = (now: number) => {
      if (!context || !canvas) return;
      context.clearRect(0, 0, canvasWidth, canvasHeight);

      if (!isReducedMotion && trail.length > 1) {
        for (let index = 1; index < trail.length; index += 1) {
          const from = trail[index - 1];
          const to = trail[index];
          const age = now - to.at;
          const alpha = clamp(1 - age / TRAIL_LIFETIME_MS, 0, 1);
          if (alpha <= 0) continue;

          context.save();
          context.globalAlpha = alpha * 0.72;
          context.strokeStyle = "#b6ff65";
          context.lineWidth = 1.2 + alpha * 2.2;
          context.lineCap = "round";
          context.shadowColor = "#b6ff65";
          context.shadowBlur = 8 + alpha * 10;
          context.beginPath();
          context.moveTo(canvasWidth / 2, from.y);
          context.lineTo(canvasWidth / 2, to.y);
          context.stroke();
          context.restore();
        }
      }

      if (!isReducedMotion) {
        for (let index = particles.length - 1; index >= 0; index -= 1) {
          const particle = particles[index];
          const age = now - particle.bornAt;
          const progress = clamp(age / particle.lifetime, 0, 1);
          if (progress >= 1) {
            particles.splice(index, 1);
            continue;
          }

          const alpha = 1 - progress;
          const x = particle.x + particle.driftX * progress;
          const y = particle.y + particle.driftY * progress;
          context.save();
          context.globalAlpha = alpha * 0.9;
          context.fillStyle = progress < 0.35 ? "#efffdc" : "#b6ff65";
          context.shadowColor = "#b6ff65";
          context.shadowBlur = 7;
          context.beginPath();
          context.arc(x, y, particle.size * (1 - progress * 0.35), 0, Math.PI * 2);
          context.fill();
          context.restore();
        }
      }

      while (trail.length > 0 && now - trail[0].at > TRAIL_LIFETIME_MS) {
        trail.shift();
      }
    };

    const render = (now: number) => {
      animationFrame = 0;
      const currentScrollTop = getScrollMetrics();
      updateThumb(currentScrollTop);

      const delta = currentScrollTop - lastPaintedScrollTop;
      if (Math.abs(delta) > 0.45) {
        const progress = maxScroll > 0 ? clamp(currentScrollTop / maxScroll, 0, 1) : 0;
        const y = availableTravel * progress + THUMB_SIZE / 2;
        if (trail.length === 0) {
          const previousProgress = maxScroll > 0
            ? clamp(lastPaintedScrollTop / maxScroll, 0, 1)
            : 0;
          trail.push({ y: availableTravel * previousProgress + THUMB_SIZE / 2, at: now - 16 });
        }
        trail.push({ y, at: now });
        if (trail.length > MAX_TRAIL_POINTS) trail.splice(0, trail.length - MAX_TRAIL_POINTS);

        if (!isReducedMotion && Math.abs(delta) > 1.5) {
          const particleCount = Math.min(4, Math.max(1, Math.ceil(Math.abs(delta) / 24)));
          for (let index = 0; index < particleCount; index += 1) {
            particles.push({
              x: track.clientWidth / 2 + (Math.random() - 0.5) * 14,
              y: y + (Math.random() - 0.5) * 12,
              driftX: (Math.random() - 0.5) * 18,
              driftY: Math.sign(delta) * (8 + Math.random() * 17),
              size: 0.7 + Math.random() * 1.5,
              bornAt: now,
              lifetime: PARTICLE_LIFETIME_MS * (0.75 + Math.random() * 0.5),
            });
          }
          if (particles.length > MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES);
        }
        lastPaintedScrollTop = currentScrollTop;
      }

      drawEnergyTrail(now);

      const hasTrail = trail.length > 0 && now - trail[trail.length - 1].at < TRAIL_LIFETIME_MS;
      const hasParticles = particles.length > 0;
      if (!isReducedMotion && (hasTrail || hasParticles)) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const scheduleRender = () => {
      if (animationFrame) return;
      if (isReducedMotion) {
        const scrollTop = getScrollMetrics();
        updateThumb(scrollTop);
        lastPaintedScrollTop = scrollTop;
        drawEnergyTrail(performance.now());
        return;
      }
      animationFrame = window.requestAnimationFrame(render);
    };

    const handleScroll = () => {
      if (track.dataset.scrolling !== "true") track.dataset.scrolling = "true";
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        track.dataset.scrolling = "false";
        idleTimer = 0;
      }, 240);
      scheduleRender();
    };

    const scrollToTop = (top: number, smooth = false) => {
      const target = clamp(top, 0, maxScroll);
      if (smooth && !isReducedMotion) {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        scrollElement.scrollTop = target;
      }
    };

    const getProgressFromPointer = (clientY: number) => {
      const bounds = track.getBoundingClientRect();
      const travel = Math.max(1, bounds.height - THUMB_SIZE);
      return clamp((clientY - bounds.top - THUMB_SIZE / 2) / travel, 0, 1);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || maxScroll <= 1) return;
      event.preventDefault();

      const target = event.target instanceof Element ? event.target : null;
      const startedOnThumb = Boolean(target?.closest("[data-energy-thumb]"));
      if (startedOnThumb) {
        draggingPointer = event.pointerId;
        previousInlineScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        track.dataset.dragging = "true";
        track.setPointerCapture(event.pointerId);
      } else {
        scrollToTop(getProgressFromPointer(event.clientY) * maxScroll, true);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (draggingPointer !== event.pointerId) return;
      event.preventDefault();
      const progress = getProgressFromPointer(event.clientY);
      scrollToTop(progress * maxScroll);
    };

    const stopDragging = (event?: PointerEvent) => {
      if (draggingPointer === null) return;
      const pointerId = draggingPointer;
      draggingPointer = null;
      track.dataset.dragging = "false";
      if (previousInlineScrollBehavior !== null) {
        document.documentElement.style.scrollBehavior = previousInlineScrollBehavior;
        previousInlineScrollBehavior = null;
      }
      if (track.hasPointerCapture(pointerId)) track.releasePointerCapture(pointerId);
      track.dataset.hover = String(track.matches(":hover"));
      if (event) event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (maxScroll <= 1) return;
      let target: number | null = null;
      const current = scrollElement.scrollTop;

      switch (event.key) {
        case "ArrowDown":
          target = current + 48;
          break;
        case "ArrowUp":
          target = current - 48;
          break;
        case "PageDown":
          target = current + window.innerHeight * 0.85;
          break;
        case "PageUp":
          target = current - window.innerHeight * 0.85;
          break;
        case "Home":
          target = 0;
          break;
        case "End":
          target = maxScroll;
          break;
        default:
          return;
      }

      event.preventDefault();
      scrollToTop(target, true);
    };

    const handleMotionChange = () => {
      isReducedMotion = reducedMotion.matches;
      track.dataset.reducedMotion = String(isReducedMotion);
      if (isReducedMotion) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        trail.length = 0;
        particles.length = 0;
        drawEnergyTrail(performance.now());
      }
      scheduleRender();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        trail.length = 0;
        particles.length = 0;
        drawEnergyTrail(performance.now());
      } else {
        scheduleRender();
      }
    };

    const handlePointerEnter = () => {
      track.dataset.hover = "true";
    };
    const handlePointerLeave = () => {
      if (draggingPointer === null) track.dataset.hover = "false";
    };

    track.addEventListener("pointerdown", handlePointerDown);
    track.addEventListener("pointermove", handlePointerMove);
    track.addEventListener("pointerup", stopDragging);
    track.addEventListener("pointercancel", stopDragging);
    track.addEventListener("lostpointercapture", stopDragging);
    track.addEventListener("keydown", handleKeyDown);
    track.addEventListener("pointerenter", handlePointerEnter);
    track.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", scheduleRender, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    reducedMotion.addEventListener("change", handleMotionChange);

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => {
          resizeCanvas();
          scheduleRender();
        })
      : null;
    resizeObserver?.observe(document.documentElement);
    if (document.body) resizeObserver?.observe(document.body);

    resizeCanvas();
    const initialScrollTop = getScrollMetrics();
    lastPaintedScrollTop = initialScrollTop;
    updateThumb(initialScrollTop);
    track.dataset.scrolling = "false";
    track.dataset.reducedMotion = String(isReducedMotion);
    track.dataset.dragging = "false";
    track.dataset.hover = "false";
    drawEnergyTrail(performance.now());

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (idleTimer) window.clearTimeout(idleTimer);
      if (previousInlineScrollBehavior !== null) {
        document.documentElement.style.scrollBehavior = previousInlineScrollBehavior;
        previousInlineScrollBehavior = null;
      }
      resizeObserver?.disconnect();
      track.removeEventListener("pointerdown", handlePointerDown);
      track.removeEventListener("pointermove", handlePointerMove);
      track.removeEventListener("pointerup", stopDragging);
      track.removeEventListener("pointercancel", stopDragging);
      track.removeEventListener("lostpointercapture", stopDragging);
      track.removeEventListener("keydown", handleKeyDown);
      track.removeEventListener("pointerenter", handlePointerEnter);
      track.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", scheduleRender);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotion.removeEventListener("change", handleMotionChange);
      if (ownsScrollRegionId && document.documentElement.id === "page-scroll-region") {
        document.documentElement.removeAttribute("id");
      }
    };
  }, []);

  return (
    <div
      ref={trackRef}
      className="energy-scrollbar"
      role="scrollbar"
      aria-label="Page scroll position"
      aria-controls="page-scroll-region"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
      aria-valuetext="0 percent from top"
      tabIndex={-1}
      data-active="false"
      data-scrolling="false"
      data-dragging="false"
      data-hover="false"
    >
      <canvas ref={canvasRef} className="energy-scrollbar__trail" aria-hidden="true" />
      <span ref={thumbRef} className="energy-scrollbar__thumb" data-energy-thumb="true" aria-hidden="true">
        <span className="energy-scrollbar__core" />
        <span className="energy-scrollbar__spark energy-scrollbar__spark--one" />
        <span className="energy-scrollbar__spark energy-scrollbar__spark--two" />
      </span>
    </div>
  );
}
