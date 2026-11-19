"use client";

import { useEffect, useState } from "react";
import AchievementEmblem from "../passport/achievement-emblem";
import {
  ACHIEVEMENT_UNLOCK_EVENT,
  type PassportAchievement,
} from "../passport/passport-store";

type ToastEntry = PassportAchievement & { toastId: number };

export default function AchievementToastHost() {
  const [items, setItems] = useState<ToastEntry[]>([]);

  useEffect(() => {
    function handleUnlock(event: Event) {
      const achievement = (event as CustomEvent<PassportAchievement>).detail;
      if (!achievement || typeof achievement.id !== "string") return;
      const toastId = Date.now() + Math.random();
      setItems((current) => [...current, { ...achievement, toastId }].slice(-3));
      window.setTimeout(() => {
        setItems((current) => current.filter((item) => item.toastId !== toastId));
      }, 6500);
    }

    window.addEventListener(ACHIEVEMENT_UNLOCK_EVENT, handleUnlock);
    return () => window.removeEventListener(ACHIEVEMENT_UNLOCK_EVENT, handleUnlock);
  }, []);

  if (!items.length) return null;

  return (
    <div className="achievement-toast-stack" aria-live="polite" aria-relevant="additions">
      {items.map((item) => (
        <aside className="achievement-toast" key={item.toastId} role="status">
          <AchievementEmblem icon={item.icon} rarity={item.rarity} earned />
          <div className="achievement-toast__copy">
            <span>ACHIEVEMENT UNLOCKED / {item.rarity}</span>
            <strong>{item.title}</strong>
            <small>{item.description}</small>
          </div>
          <button type="button" aria-label="Dismiss achievement notification" onClick={() => setItems((current) => current.filter((entry) => entry.toastId !== item.toastId))}>×</button>
        </aside>
      ))}
    </div>
  );
}
