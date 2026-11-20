export const SPRITE_FRAME_SIZE = 256;

export type ClipName = "idle" | "walk" | "trip" | "fall";

export interface ClipConfig {
  source: string;
  columns: number;
  frameCount: number;
  fps: number;
  loop: boolean;
  startFrame?: number;
}

export const SPRITE_SOURCES = {
  base: "/sprites/base.png",
  idle: "/sprites/idle.png",
  walk: "/sprites/walk.png",
  fall: "/sprites/fall.png",
} as const;

// All playback tuning lives here; the component contains no frame-count literals.
export const ANIMATION_CONFIG: Record<ClipName, ClipConfig> = {
  idle: { source: SPRITE_SOURCES.idle, columns: 8, frameCount: 8, fps: 8, loop: true, startFrame: 0 },
  walk: { source: SPRITE_SOURCES.walk, columns: 8, frameCount: 8, fps: 12, loop: true, startFrame: 0 },
  trip: { source: SPRITE_SOURCES.fall, columns: 8, frameCount: 8, fps: 12, loop: false, startFrame: 0 },
  fall: { source: SPRITE_SOURCES.fall, columns: 8, frameCount: 8, fps: 10, loop: false, startFrame: 8 },
};

export const CHARACTER_DEFAULTS = {
  size: 160,
  travel: false,
  travelSpeed: 40,
} as const;
