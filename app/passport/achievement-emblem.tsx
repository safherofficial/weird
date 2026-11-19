import Image from "next/image";
import type { PassportAchievement, BadgeRarity } from "./passport-store";
import { ACHIEVEMENT_BADGE_ASSETS } from "./badge-assets";

type AchievementEmblemProps = {
  id: PassportAchievement["id"];
  rarity: BadgeRarity;
  earned: boolean;
};

export default function AchievementEmblem({ id, rarity, earned }: AchievementEmblemProps) {
  const src = ACHIEVEMENT_BADGE_ASSETS[id];

  if (!src) return null;

  return (
    <span
      className={`achievement-emblem achievement-emblem--${rarity.toLowerCase()}${earned ? " is-earned" : " is-locked"}`}
      aria-hidden="true"
    >
      <Image
        className="achievement-emblem__art"
        src={src}
        alt=""
        width={144}
        height={144}
        sizes="(max-width: 760px) 80px, 96px"
        draggable={false}
      />
    </span>
  );
}
