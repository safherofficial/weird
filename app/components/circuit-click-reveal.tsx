"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

type CircuitTrace = {
  points: Point[];
  delay: number;
  duration: number;
  fadeDuration: number;
  opacity: number;
  width: number;
  color: string;
};

type CircuitBurst = {
  x: number;
  y: number;
  startedAt: number;
  traces: CircuitTrace[];
  duration: number;
};

const TRACE_COLORS = ["#b6ff65", "#d9ffad", "#91ed79"] as const;
const MAX_ACTIVE_BURSTS = 5;

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function makeTrace(
  start: Point,
  angle: number,
  segmentCount: number,
  delay: number,
  opacity = 1,
): CircuitTrace {
  const directionX = Math.cos(angle) >= 0 ? 1 : -1;
  const directionY = Math.sin(angle) >= 0 ? 1 : -1;
  const horizontalFirst = Math.abs(Math.cos(angle)) >= Math.abs(Math.sin(angle));
  const points: Point[] = [{ x: start.x, y: start.y }];
  let x = start.x;
  let y = start.y;

  for (let index = 0; index < segmentCount; index += 1) {
    const horizontal = index % 2 === 0 ? horizontalFirst : !horizontalFirst;
    const distance = randomBetween(17, 38);

    if (horizontal) {
      x += directionX * distance;
    } else {
      y += directionY * distance;
    }

    points.push({ x, y });
  }

  return {
    points,
    delay,
    duration: randomBetween(250, 410),
    fadeDuration: randomBetween(260, 390),
    opacity,
    width: randomBetween(1, 1.65),
    color: TRACE_COLORS[Math.floor(Math.random() * TRACE_COLORS.length)],
  };
}

function createBurst(x: number, y: number, startedAt: number): CircuitBurst {
  const traces: CircuitTrace[] = [];
  const traceCount = 10;

  for (let index = 0; index < traceCount; index += 1) {
    const angle = (index / traceCount) * Math.PI * 2 + randomBetween(-0.16, 0.16);
    const start = {
      x: x + randomBetween(-4, 4),
      y: y + randomBetween(-4, 4),
    };
    const trace = makeTrace(start, angle, Math.floor(randomBetween(3, 6)), randomBetween(0, 165));
    traces.push(trace);

    // A few short secondary branches make the pattern read like a circuit board.
    if (index % 3 === 0 && trace.points.length > 3) {
      const branchOrigin = trace.points[2];
      const branchAngle = angle + (index % 2 === 0 ? Math.PI / 2 : -Math.PI / 2);
      traces.push(
        makeTrace(
          branchOrigin,
          branchAngle,
          Math.floor(randomBetween(2, 4)),
          trace.delay + randomBetween(65, 135),
          0.78,
        ),
      );
    }
  }

  return {
    x,
    y,
    startedAt,
    traces,
    duration: 1120,
  };
}

function traceLength(points: Point[]) {
  let length = 0;
  for (let index = 1; index < points.length; index += 1) {
    length += Math.hypot(
      points[index].x - points[index - 1].x,
      points[index].y - points[index - 1].y,
    );
  }
  return length;
}

function drawPartialTrace(
  context: CanvasRenderingContext2D,
  points: Point[],
  progress: number,
): Point {
  const totalLength = traceLength(points);
  let remaining = totalLength * progress;
  let head = points[0];

  context.beginPath();
  context.moveTo(points[0].x, points[0].y);

  for (let index = 1; index < points.length; index += 1) {
    const from = points[index - 1];
    const to = points[index];
    const segmentLength = Math.hypot(to.x - from.x, to.y - from.y);

    if (remaining >= segmentLength) {
      context.lineTo(to.x, to.y);
      head = to;
      remaining -= segmentLength;
      continue;
    }

    const fraction = segmentLength === 0 ? 0 : remaining / segmentLength;
    head = {
      x: from.x + (to.x - from.x) * fraction,
      y: from.y + (to.y - from.y) * fraction,
    };
    context.lineTo(head.x, head.y);
    break;
  }

  return head;
}

function drawBurst(
  context: CanvasRenderingContext2D,
  burst: CircuitBurst,
  now: number,
) {
  const age = now - burst.startedAt;
  const ringProgress = clamp(age / 470, 0, 1);
  const ringAlpha = (1 - ringProgress) * 0.34;

  if (ringAlpha > 0) {
    context.save();
    context.globalAlpha = ringAlpha;
    context.strokeStyle = "#cfff9b";
    context.lineWidth = 1;
    context.beginPath();
    context.arc(burst.x, burst.y, 3 + ringProgress * 31, 0, Math.PI * 2);
    context.stroke();
    context.restore();
  }

  // A brief central discharge, without a large flash that obscures the page.
  const sparkAlpha = clamp(1 - age / 260, 0, 1);
  if (sparkAlpha > 0) {
    context.save();
    context.globalAlpha = sparkAlpha * 0.8;
    context.strokeStyle = "#e6ffcf";
    context.lineWidth = 1.25;
    context.shadowColor = "#b6ff65";
    context.shadowBlur = 10;
    context.beginPath();
    context.moveTo(burst.x - 5, burst.y);
    context.lineTo(burst.x + 5, burst.y);
    context.moveTo(burst.x, burst.y - 5);
    context.lineTo(burst.x, burst.y + 5);
    context.stroke();
    context.restore();
  }

  for (const trace of burst.traces) {
    const traceAge = age - trace.delay;
    if (traceAge <= 0) continue;

    const progress = clamp(traceAge / trace.duration, 0, 1);
    const fade = progress < 1
      ? clamp(traceAge / 72, 0, 1)
      : 1 - clamp((traceAge - trace.duration) / trace.fadeDuration, 0, 1);
    const alpha = fade * trace.opacity;
    if (alpha <= 0) continue;

    context.save();
    context.globalAlpha = alpha;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = trace.color;
    context.lineWidth = trace.width;
    context.shadowColor = "#b6ff65";
    context.shadowBlur = 7;
    const head = drawPartialTrace(context, trace.points, progress);
    context.stroke();

    // Tiny pads at each revealed bend, like exposed PCB contacts.
    const total = traceLength(trace.points);
    let travelled = 0;
    for (let index = 1; index < trace.points.length; index += 1) {
      const previous = trace.points[index - 1];
      const point = trace.points[index];
      travelled += Math.hypot(point.x - previous.x, point.y - previous.y);
      if (travelled > total * progress) break;
      if (index % 2 === 0) {
        context.beginPath();
        context.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        context.fillStyle = "#e5ffc8";
        context.fill();
      }
    }

    // The leading contact flickers briefly while the trace propagates.
    if (progress < 1) {
      context.beginPath();
      context.arc(head.x, head.y, 2.1, 0, Math.PI * 2);
      context.fillStyle = "#f0ffdc";
      context.shadowBlur = 11;
      context.fill();
    } else {
      const end = trace.points[trace.points.length - 1];
      context.beginPath();
      context.arc(end.x, end.y, 1.8, 0, Math.PI * 2);
      context.fillStyle = "#e5ffc8";
      context.fill();
    }

    context.restore();
  }
}

export default function CircuitClickReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const bursts: CircuitBurst[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;
    let pixelRatio = 1;
    let animationFrame = 0;
    let running = false;
    let motionEnabled = !reducedMotion.matches;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);
    };

    const stop = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      running = false;
      bursts.length = 0;
      context.clearRect(0, 0, width, height);
    };

    const render = (now: number) => {
      context.clearRect(0, 0, width, height);

      for (let index = bursts.length - 1; index >= 0; index -= 1) {
        const burst = bursts[index];
        if (now - burst.startedAt > burst.duration) {
          bursts.splice(index, 1);
          continue;
        }
        drawBurst(context, burst, now);
      }

      if (bursts.length > 0 && motionEnabled) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = 0;
        running = false;
      }
    };

    const start = () => {
      if (running || !motionEnabled || bursts.length === 0) return;
      running = true;
      animationFrame = window.requestAnimationFrame(render);
    };

    const handleClick = (event: MouseEvent) => {
      if (!motionEnabled) return;

      let x = event.clientX;
      let y = event.clientY;

      // Keyboard-activated controls have no pointer coordinates; use their centre.
      if (event.detail === 0 && event.target instanceof Element) {
        const bounds = event.target.getBoundingClientRect();
        x = bounds.left + bounds.width / 2;
        y = bounds.top + bounds.height / 2;
      }

      bursts.push(createBurst(x, y, window.performance.now()));
      if (bursts.length > MAX_ACTIVE_BURSTS) bursts.shift();
      start();
    };

    const handleMotionChange = () => {
      motionEnabled = !reducedMotion.matches;
      if (!motionEnabled) {
        stop();
      }
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", handleClick);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 40,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}
