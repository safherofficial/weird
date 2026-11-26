"use client";

import { useEffect, useRef, useState } from "react";

type HalftoneImageProps = {
  src?: string;
  alt: string;
  className?: string;
};

const SAMPLE_WIDTH = 420;
const SAMPLE_HEIGHT = 248;
const DOT_STEP = 4;
const DOT_RADIUS = 1.85;

export default function HalftoneImage({
  src = "/art/department-engraving.webp",
  alt,
  className = "",
}: HalftoneImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grayscaleRef = useRef<Uint8Array | null>(null);
  const [state, setState] = useState<"fallback" | "loaded">("fallback");

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context || !src) return;

    let disposed = false;
    let grayscale: Uint8Array | null = null;
    const image = new Image();
    image.decoding = "async";

    const renderDots = () => {
      if (!grayscale || disposed) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(SAMPLE_WIDTH * ratio);
      canvas.height = Math.round(SAMPLE_HEIGHT * ratio);
      canvas.style.aspectRatio = `${SAMPLE_WIDTH} / ${SAMPLE_HEIGHT}`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT);
      const primary = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
      context.fillStyle = primary || "currentColor";
      context.shadowColor = primary || "currentColor";
      context.shadowBlur = 0.7;

      for (let y = DOT_STEP / 2; y < SAMPLE_HEIGHT; y += DOT_STEP) {
        for (let x = DOT_STEP / 2; x < SAMPLE_WIDTH; x += DOT_STEP) {
          const index = y * SAMPLE_WIDTH + x;
          const darkness = 1 - grayscale[index] / 255;
          const radius = DOT_RADIUS * (0.18 + darkness * 0.82);
          if (radius < 0.42) continue;
          context.globalAlpha = 0.16 + darkness * 0.84;
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
      context.globalAlpha = 1;
    };

    const loadImage = () => {
      image.onload = () => {
        if (disposed) return;
        try {
          const sample = document.createElement("canvas");
          sample.width = SAMPLE_WIDTH;
          sample.height = SAMPLE_HEIGHT;
          const sampleContext = sample.getContext("2d", { willReadFrequently: true });
          if (!sampleContext) throw new Error("Canvas sampling is unavailable");
          const scale = Math.max(SAMPLE_WIDTH / image.naturalWidth, SAMPLE_HEIGHT / image.naturalHeight);
          const width = image.naturalWidth * scale;
          const height = image.naturalHeight * scale;
          sampleContext.drawImage(image, (SAMPLE_WIDTH - width) / 2, (SAMPLE_HEIGHT - height) / 2, width, height);
          const pixels = sampleContext.getImageData(0, 0, SAMPLE_WIDTH, SAMPLE_HEIGHT).data;
          grayscale = new Uint8Array(SAMPLE_WIDTH * SAMPLE_HEIGHT);
          for (let index = 0; index < grayscale.length; index += 1) {
            const offset = index * 4;
            grayscale[index] = Math.round(
              pixels[offset] * 0.2126 + pixels[offset + 1] * 0.7152 + pixels[offset + 2] * 0.0722,
            );
          }
          grayscaleRef.current = grayscale;
          renderDots();
          setState("loaded");
          sample.width = 1;
          sample.height = 1;
        } catch {
          setState("fallback");
        }
      };
      image.onerror = () => setState("fallback");
      image.src = src;
    };

    const observer = typeof IntersectionObserver === "undefined"
      ? null
      : new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            loadImage();
          }
        }, { rootMargin: "160px" });

    if (observer) observer.observe(canvas);
    else loadImage();

    const handleThemeChange = () => {
      grayscale = grayscaleRef.current;
      renderDots();
    };
    window.addEventListener("themechange", handleThemeChange);
    return () => {
      disposed = true;
      observer?.disconnect();
      window.removeEventListener("themechange", handleThemeChange);
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return (
    <figure className={`halftone-image ${className}`} data-image-state={state}>
      <canvas ref={canvasRef} className="halftone-image__canvas" role="img" aria-label={alt} />
      <div className="halftone-image__fallback" role="img" aria-label={alt}>
        <svg viewBox="0 0 420 248" aria-hidden="true">
          <g fill="none" stroke="var(--line)" strokeWidth="1">
            <rect x="1" y="1" width="418" height="246" />
            <rect x="71" y="1" width="348" height="215" />
            <rect x="71" y="81" width="214" height="166" />
            <circle cx="210" cy="124" r="92" />
            <circle cx="210" cy="124" r="63" strokeDasharray="2 7" />
            <path d="M210 8V240M12 124H408M45 32L375 216M375 32L45 216" strokeOpacity=".5" />
            <path d="M210 32C210 82 276 82 276 124C276 190 144 190 144 124C144 58 342 58 342 124" />
          </g>
          <circle cx="276" cy="124" r="4" fill="var(--accent)" />
          <circle cx="276" cy="124" r="12" fill="none" stroke="var(--glow)" />
        </svg>
        <span>IMAGE ARCHIVE / GEOMETRY FALLBACK</span>
      </div>
    </figure>
  );
}
