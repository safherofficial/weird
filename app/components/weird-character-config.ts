export const SPRITE_FRAME_SIZE = 256;

export interface IdleAnimationConfig {
  source: string;
  columns: number;
  frameCount: number;
  fps: number;
  loop: true;
}

export const SPRITE_SOURCES = {
  idle: "/sprites/idle.png",
} as const;

// A calm idle cycle: the full eight-pose loop now takes four seconds.
export const IDLE_ANIMATION: IdleAnimationConfig = {
  source: SPRITE_SOURCES.idle,
  columns: 8,
  frameCount: 8,
  fps: 2,
  loop: true,
};

export const CHARACTER_DEFAULTS = {
  size: 160,
} as const;
