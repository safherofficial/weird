import Image from "next/image";
import type { PassportAchievement, BadgeRarity } from "./passport-store";
import { ACHIEVEMENT_BADGE_ASSETS, CLUB_BADGE_MARKS } from "./badge-assets";

type AchievementEmblemProps = {
  id: PassportAchievement["id"];
  rarity: BadgeRarity;
  earned: boolean;
};

export default function AchievementEmblem({ id, rarity, earned }: AchievementEmblemProps) {
  const src = ACHIEVEMENT_BADGE_ASSETS[id];
  const mark = CLUB_BADGE_MARKS[id];

  if (!src && !mark) return null;

  return (
    <span
      className={`achievement-emblem achievement-emblem--${rarity.toLowerCase()}${earned ? " is-earned" : " is-locked"}`}
      aria-hidden="true"
    >
      {src ? (
        <Image
          className="achievement-emblem__art"
          src={src}
          alt=""
          width={144}
          height={144}
          sizes="(max-width: 760px) 80px, 96px"
          draggable={false}
        />
      ) : (
        <svg className="achievement-emblem__vector" viewBox="0 0 144 144" focusable="false">
          <circle cx="72" cy="72" r="62" fill="#0a0e0a" stroke="#526b43" strokeWidth="3" />
          <circle cx="72" cy="72" r="53" fill="none" stroke="#b6ff65" strokeOpacity=".55" strokeWidth="1.5" strokeDasharray="4 5" />
          <path d="M72 18 85 37 108 36 107 59 126 72 107 85 108 108 85 107 72 126 59 107 36 108 37 85 18 72 37 59 36 36 59 37Z" fill="#182416" stroke="#8ba96d" strokeWidth="1.5" />
          <text x="72" y="83" textAnchor="middle" fill="#d8efc5" fontFamily="monospace" fontSize={mark.length > 2 ? "22" : "42"} fontWeight="900">{mark}</text>
          <path d="M72 5V14M72 130V139M5 72H14M130 72H139" stroke="#b6ff65" strokeWidth="2" />
        </svg>
      )}
    </span>
  );
}
