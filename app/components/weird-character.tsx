"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ANIMATION_CONFIG,
  CHARACTER_DEFAULTS,
  SPRITE_FRAME_SIZE,
  SPRITE_SOURCES,
  type ClipConfig,
  type ClipName,
} from "./weird-character-config";

interface WeirdCharacterProps {
  size?: number;
  travel?: boolean;
  travelSpeed?: number;
  debug?: boolean;
}

interface LoadedSheet {
  source: string;
  columns: number;
  rows: number;
  frameCount: number;
}

type MachineMode = ClipName;
interface Machine {
  mode: MachineMode;
  frame: number;
  accumulator: number;
  fallRequested: boolean;
  x: number;
  direction: 1 | -1;
  lastTimestamp: number;
}
interface RenderFrame {
  mode: MachineMode;
  frame: number;
  columns: number;
  rows: number;
  source: string;
  fallRequested: boolean;
}

function loadImage(source: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Unable to load character sprite: ${source}`));
    image.src = source;
  });
}

export default function WeirdCharacter({
  size = CHARACTER_DEFAULTS.size,
  travel = CHARACTER_DEFAULTS.travel,
  travelSpeed = CHARACTER_DEFAULTS.travelSpeed,
  debug = false,
}: WeirdCharacterProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const machineRef = useRef<Machine>({
    mode: "idle", frame: 0, accumulator: 0, fallRequested: false,
    x: 0, direction: -1, lastTimestamp: 0,
  });
  const sheetsRef = useRef<Partial<Record<keyof typeof SPRITE_SOURCES, LoadedSheet>>>({});
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const reducedTimerRef = useRef<number>(0);
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [view, setView] = useState<RenderFrame>({
    mode: "idle", frame: 0,
    columns: ANIMATION_CONFIG.idle.columns,
    rows: ANIMATION_CONFIG.idle.frameCount / ANIMATION_CONFIG.idle.columns,
    source: SPRITE_SOURCES.idle, fallRequested: false,
  });

  const clipConfig = useCallback((mode: MachineMode): ClipConfig => {
    const configured = ANIMATION_CONFIG[mode];
    const sheet = sheetsRef.current[mode === "trip" || mode === "fall" ? "fall" : mode];
    if (!sheet) return configured;
    if (mode === "trip" || mode === "fall") {
      const tripFrameCount = ANIMATION_CONFIG.trip.frameCount;
      const configuredFallFrames = ANIMATION_CONFIG.fall.frameCount;
      const hasSeparateTrip = sheet.frameCount >= tripFrameCount + configuredFallFrames;
      return {
        ...configured,
        columns: sheet.columns,
        startFrame: hasSeparateTrip && mode === "fall" ? (ANIMATION_CONFIG.fall.startFrame ?? tripFrameCount) : 0,
        frameCount: mode === "trip" ? tripFrameCount : hasSeparateTrip ? configuredFallFrames : sheet.frameCount,
      };
    }
    return { ...configured, columns: sheet.columns, frameCount: sheet.frameCount };
  }, []);

  const publishFrame = useCallback((machine: Machine) => {
    const config = clipConfig(machine.mode);
    const sourceKey = machine.mode === "trip" || machine.mode === "fall" ? "fall" : machine.mode;
    const sheet = sheetsRef.current[sourceKey];
    if (!sheet) return;
    const absoluteFrame = (config.startFrame ?? 0) + machine.frame;
    setView({
      mode: machine.mode,
      frame: machine.frame,
      columns: sheet.columns,
      rows: sheet.rows,
      source: sheet.source,
      fallRequested: machine.fallRequested,
    });
    const button = buttonRef.current;
    if (button) {
      button.style.transform = `translate3d(${-machine.x}px, 0, 0)`;
      button.dataset.facing = machine.direction > 0 ? "left" : "right";
      if (debug) button.dataset.absoluteFrame = String(absoluteFrame);
    }
  }, [clipConfig, debug]);

  useEffect(() => {
    let active = true;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => {
      reducedMotionRef.current = media.matches;
      setReducedMotion(media.matches);
    };
    updateReducedMotion();
    media.addEventListener("change", updateReducedMotion);

    const preload = async () => {
      const entries = await Promise.all(
        Object.entries(SPRITE_SOURCES).map(async ([key, source]) => {
          const image = await loadImage(source);
          const width = image.naturalWidth;
          const height = image.naturalHeight;
          if (width % SPRITE_FRAME_SIZE !== 0 || height % SPRITE_FRAME_SIZE !== 0) {
            console.warn(
              `[WeirdCharacter] ${source} dimensions ${width}x${height} are not multiples of ${SPRITE_FRAME_SIZE}px.`,
            );
          }
          const columns = width / SPRITE_FRAME_SIZE;
          const rows = height / SPRITE_FRAME_SIZE;
          return [key, { source, columns, rows, frameCount: columns * rows }] as const;
        }),
      );
      if (!active) return;
      sheetsRef.current = Object.fromEntries(entries) as typeof sheetsRef.current;
      // If the supplied fall sheet has only eight frames, the trip clip is skipped.
      machineRef.current = { ...machineRef.current, mode: "idle", frame: 0, accumulator: 0, lastTimestamp: 0 };
      publishFrame(machineRef.current);
      setReady(true);
    };

    preload().catch((error: unknown) => {
      if (active) console.error("[WeirdCharacter] Sprite preload failed.", error);
    });

    return () => {
      active = false;
      media.removeEventListener("change", updateReducedMotion);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (reducedTimerRef.current) window.clearTimeout(reducedTimerRef.current);
    };
  }, [publishFrame]);

  useEffect(() => {
    if (!ready || reducedMotion) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      return;
    }
    let active = true;
    const tick = (timestamp: number) => {
      if (!active) return;
      const machine = machineRef.current;
      if (!machine.lastTimestamp) machine.lastTimestamp = timestamp;
      const delta = Math.min(timestamp - machine.lastTimestamp, 100);
      machine.lastTimestamp = timestamp;
      machine.accumulator += delta;
      if (travel && machine.mode === "walk") {
        const stageWidth = stageRef.current?.clientWidth ?? window.innerWidth;
        const maxX = Math.max(0, stageWidth - size);
        machine.x += machine.direction * travelSpeed * delta / 1000;
        if (machine.x <= 0 || machine.x >= maxX) {
          machine.x = Math.max(0, Math.min(maxX, machine.x));
          machine.direction = machine.direction === 1 ? -1 : 1;
        }
      } else if (travel && machine.mode === "trip") {
        const config = clipConfig(machine.mode);
        const progress = config.frameCount <= 1 ? 1 : machine.frame / (config.frameCount - 1);
        const deceleratingSpeed = travelSpeed * (1 - progress);
        const stageWidth = stageRef.current?.clientWidth ?? window.innerWidth;
        const maxX = Math.max(0, stageWidth - size);
        machine.x = Math.max(0, Math.min(maxX, machine.x + machine.direction * deceleratingSpeed * delta / 1000));
      }
      if (buttonRef.current) {
        buttonRef.current.style.transform = `translate3d(${-machine.x}px, 0, 0)`;
        buttonRef.current.dataset.facing = machine.direction > 0 ? "left" : "right";
      }

      let changed = false;

      while (true) {
        const config = clipConfig(machine.mode);
        const frameDuration = 1000 / config.fps;
        if (machine.accumulator < frameDuration) break;
        machine.accumulator -= frameDuration;

        if (machine.frame < config.frameCount - 1) {
          machine.frame += 1;
          changed = true;
          continue;
        }

        if (machine.mode === "walk" && machine.fallRequested) {
          const fallSheet = sheetsRef.current.fall;
          const hasSeparateTrip = (fallSheet?.frameCount ?? 0) >= ANIMATION_CONFIG.trip.frameCount + ANIMATION_CONFIG.fall.frameCount;
          machine.mode = hasSeparateTrip ? "trip" : "fall";
          machine.frame = 0;
          machine.accumulator = 0;
          changed = true;
          break;
        }
        if (config.loop) {
          machine.frame = 0;
          changed = true;
          continue;
        }
        if (machine.mode === "trip") {
          machine.mode = "fall";
          machine.frame = 0;
          machine.accumulator = 0;
          changed = true;
          break;
        }
        machine.mode = "idle";
        machine.frame = 0;
        machine.fallRequested = false;
        machine.accumulator = 0;
        changed = true;
        break;
      }
      if (changed) publishFrame(machine);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      machineRef.current.lastTimestamp = 0;
    };
  }, [clipConfig, publishFrame, ready, reducedMotion, size, travel, travelSpeed]);

  const handleClick = () => {
    if (!ready) return;
    const machine = machineRef.current;
    if (reducedMotionRef.current) {
      if (machine.mode === "idle") {
        machine.mode = "walk";
        machine.frame = 0;
        publishFrame(machine);
      } else if (machine.mode === "walk" && !machine.fallRequested) {
        machine.fallRequested = true;
        machine.mode = "fall";
        const fallConfig = clipConfig("fall");
        machine.frame = fallConfig.frameCount - 1;
        publishFrame(machine);
        if (reducedTimerRef.current) window.clearTimeout(reducedTimerRef.current);
        reducedTimerRef.current = window.setTimeout(() => {
          machineRef.current.mode = "idle";
          machineRef.current.frame = 0;
          machineRef.current.fallRequested = false;
          publishFrame(machineRef.current);
        }, 900);
      }
      return;
    }
    if (machine.mode === "idle") {
      machine.mode = "walk";
      machine.frame = 0;
      machine.accumulator = 0;
      machine.fallRequested = false;
      machine.lastTimestamp = 0;
      publishFrame(machine);
    } else if (machine.mode === "walk" && !machine.fallRequested) {
      machine.fallRequested = true;
      publishFrame(machine);
    }
  };

  if (!ready) return null;
  const absoluteFrame = (clipConfig(view.mode).startFrame ?? 0) + view.frame;
  const column = absoluteFrame % view.columns;
  const row = Math.floor(absoluteFrame / view.columns);
  const backgroundStyle = {
    width: size,
    height: size,
    backgroundImage: `url("${view.source}")`,
    backgroundSize: `${view.columns * size}px ${view.rows * size}px`,
    backgroundPosition: `-${column * size}px -${row * size}px`,
  } as const;

  return (
    <div ref={stageRef} className="weird-character-stage" aria-label="The Everyman Bagholder character">
      <button
        type="button"
        ref={buttonRef}
        className="weird-character"
        aria-label="The Everyman Bagholder. Click once to walk, click again to watch him trip and recover."
        title="Click to send the Bagholder on his way"
        onClick={handleClick}
        draggable={false}
        style={{
          width: size,
          height: size,
          right: 18,
          bottom: 18,
        }}
        data-mode={view.mode}
        data-frame={absoluteFrame}
        data-fall-requested={view.fallRequested ? "true" : "false"}
      >
        <span className="weird-character__sprite" style={backgroundStyle} aria-hidden="true" />
        {debug && <span className="weird-character__debug" aria-hidden="true">{view.mode.toUpperCase()} · {view.frame + 1}</span>}
      </button>
    </div>
  );
}
