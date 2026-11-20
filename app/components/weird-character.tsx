"use client";

import { useEffect, useRef, useState } from "react";
import {
  CHARACTER_DEFAULTS,
  IDLE_ANIMATION,
  SPRITE_FRAME_SIZE,
} from "./weird-character-config";

interface WeirdCharacterProps {
  size?: number;
  debug?: boolean;
}

interface LoadedSprite {
  columns: number;
  rows: number;
  frameCount: number;
}

function preloadSprite(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load character sprite: ${source}`));
    image.src = source;
  });
}

export default function WeirdCharacter({
  size = CHARACTER_DEFAULTS.size,
  debug = false,
}: WeirdCharacterProps) {
  const [loadedSprite, setLoadedSprite] = useState<LoadedSprite | null>(null);
  const [frame, setFrame] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    let active = true;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    preloadSprite(IDLE_ANIMATION.source)
      .then((image) => {
        if (!active) return;
        const { naturalWidth, naturalHeight } = image;
        if (naturalWidth % SPRITE_FRAME_SIZE !== 0 || naturalHeight % SPRITE_FRAME_SIZE !== 0) {
          console.warn(
            `[WeirdCharacter] ${IDLE_ANIMATION.source} dimensions ${naturalWidth}x${naturalHeight} are not multiples of ${SPRITE_FRAME_SIZE}px.`,
          );
        }
        const columns = naturalWidth / SPRITE_FRAME_SIZE;
        const rows = naturalHeight / SPRITE_FRAME_SIZE;
        const frameCount = columns * rows;
        if (frameCount !== IDLE_ANIMATION.frameCount || columns !== IDLE_ANIMATION.columns) {
          console.warn(
            `[WeirdCharacter] Idle sprite layout differs from its config: detected ${columns}x${rows} (${frameCount} frames), configured ${IDLE_ANIMATION.columns} columns and ${IDLE_ANIMATION.frameCount} frames.`,
          );
        }
        setLoadedSprite({ columns, rows, frameCount });
      })
      .catch((error: unknown) => {
        if (active) console.error("[WeirdCharacter] Idle sprite preload failed.", error);
      });

    return () => {
      active = false;
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    if (!loadedSprite || reducedMotion) return;

    let active = true;
    let animationFrame = 0;
    let previousTimestamp = 0;
    let elapsed = 0;

    const frameDuration = 1000 / IDLE_ANIMATION.fps;
    const tick = (timestamp: number) => {
      if (!active) return;
      if (!previousTimestamp) previousTimestamp = timestamp;
      elapsed += Math.min(timestamp - previousTimestamp, 100);
      previousTimestamp = timestamp;

      if (elapsed >= frameDuration) {
        const steps = Math.floor(elapsed / frameDuration);
        elapsed -= steps * frameDuration;
        const nextFrame = IDLE_ANIMATION.loop
          ? (frameRef.current + steps) % IDLE_ANIMATION.frameCount
          : Math.min(frameRef.current + steps, IDLE_ANIMATION.frameCount - 1);
        frameRef.current = nextFrame;
        setFrame(nextFrame);
      }
      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => {
      active = false;
      window.cancelAnimationFrame(animationFrame);
    };
  }, [loadedSprite, reducedMotion]);

  if (!loadedSprite) return null;

  const column = frame % loadedSprite.columns;
  const row = Math.floor(frame / loadedSprite.columns);
  const backgroundStyle = {
    width: size,
    height: size,
    backgroundImage: `url("${IDLE_ANIMATION.source}")`,
    backgroundSize: `${loadedSprite.columns * size}px ${loadedSprite.rows * size}px`,
    backgroundPosition: `-${column * size}px -${row * size}px`,
  } as const;

  return (
    <div
      className="weird-character-stage"
      aria-hidden="true"
    >
      <div
        className="weird-character"
        style={{ width: size, height: size }}
        data-mode="idle"
        data-frame={frame}
      >
        <span className="weird-character__sprite" style={backgroundStyle} />
        {debug && (
          <span className="weird-character__debug">
            IDLE · {frame + 1}/{IDLE_ANIMATION.frameCount} · {reducedMotion ? "STATIC" : `${IDLE_ANIMATION.fps} FPS`}
          </span>
        )}
      </div>
    </div>
  );
}
