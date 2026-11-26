"use client";

import { useEffect, useState } from "react";

type SacredGeometryProps = {
  variant?: "hero" | "divider";
  className?: string;
};

const SPIRAL_PATH = "M 300 185 C 300 145 365 145 365 185 C 365 260 260 260 260 185 C 260 105 455 105 455 185 C 455 300 195 300 195 185 C 195 40 525 40 525 185";
const NODE_PATH = SPIRAL_PATH + " C 525 260 300 260 300 185";

function coordinates(now: number) {
  const phase = ((now / 18000) % 1) * Math.PI * 2;
  const radius = 18 + phase * 21;
  const x = Math.round(300 + Math.cos(phase * 1.48) * radius);
  const y = Math.round(185 + Math.sin(phase * 1.48) * radius * 0.62);
  return `x: ${x.toString().padStart(3, "0")}  y: ${y.toString().padStart(3, "0")}`;
}

export default function SacredGeometry({ variant = "hero", className = "" }: SacredGeometryProps) {
  const [coordinate, setCoordinate] = useState("x: 300  y: 185");
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;

    const updateMotionPreference = () => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
      const allowed = !reducedMotion.matches;
      setMotionAllowed(allowed);
      if (!allowed) {
        setCoordinate("x: 300  y: 185");
        return;
      }
      const update = () => setCoordinate(coordinates(performance.now()));
      update();
      timer = window.setInterval(update, 250);
    };

    updateMotionPreference();
    reducedMotion.addEventListener("change", updateMotionPreference);
    return () => {
      if (timer !== undefined) window.clearInterval(timer);
      reducedMotion.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return (
    <figure className={`sacred-geometry sacred-geometry--${variant} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 600 371" preserveAspectRatio="xMidYMid meet">
        <g className="sacred-geometry__rectangles" fill="none" stroke="var(--line)" strokeWidth="1">
          <rect x="1" y="1" width="598" height="369" />
          <rect x="229" y="1" width="370" height="228" />
          <rect x="229" y="142" width="228" height="228" />
          <rect x="371" y="142" width="86" height="87" />
          <rect x="371" y="196" width="54" height="33" />
          <path d="M229 1V370M371 142V370M457 142V370M1 229H599M229 142H457M371 196H457" />
        </g>
        <path className="sacred-geometry__spiral" d={SPIRAL_PATH} fill="none" stroke="var(--line)" strokeWidth="1.25" />
        <path d="M300 0V371M0 185.5H600M0 0L600 371M600 0L0 371" stroke="var(--line)" strokeOpacity=".32" strokeWidth=".7" fill="none" />
        <circle className="sacred-geometry__node" cx="300" cy="185" r="4.25" fill="var(--accent)">
          {motionAllowed && <animateMotion dur="18s" repeatCount="indefinite" path={NODE_PATH} />}
        </circle>
        <circle className="sacred-geometry__node-halo" cx="300" cy="185" r="10" fill="none" stroke="var(--glow)" strokeWidth="1">
          {motionAllowed && <animateMotion dur="18s" repeatCount="indefinite" path={NODE_PATH} />}
        </circle>
      </svg>
      <figcaption className="sacred-geometry__coordinates">{coordinate}</figcaption>
    </figure>
  );
}
