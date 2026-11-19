import type { BadgeIcon, BadgeRarity } from "./passport-store";

type AchievementEmblemProps = {
  icon: BadgeIcon;
  rarity: BadgeRarity;
  earned: boolean;
};

export default function AchievementEmblem({ icon, rarity, earned }: AchievementEmblemProps) {
  return (
    <span className={`achievement-emblem achievement-emblem--${rarity.toLowerCase()}${earned ? " is-earned" : " is-locked"}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" focusable="false">
        <circle className="achievement-emblem__outer" cx="50" cy="50" r="44" />
        <circle className="achievement-emblem__inner" cx="50" cy="50" r="35" />
        <g className="achievement-emblem__symbol" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {icon === "file" && <><path d="M34 24h23l12 12v40H34z"/><path d="M57 24v13h12M43 50h17M43 60h17M43 70l5 5 11-12"/></>}
          {icon === "audit" && <><circle cx="44" cy="43" r="17"/><path d="m57 56 17 17M36 43h16M44 35v16"/><path d="M25 76h22" strokeDasharray="3 5"/></>}
          {icon === "simulator" && <><path d="M31 34h38l-5 42H36z"/><path d="M40 34c0-10 20-10 20 0M39 62l9-8 7 5 10-13"/><path d="M59 46h6v6"/></>}
          {icon === "utility" && <><path d="M50 22 73 31v18c0 15-10 25-23 31C37 74 27 64 27 49V31z"/><path d="m38 49 8 8 17-19"/></>}
          {icon === "roadmap" && <><path d="M28 72c12-24 31-24 44-44"/><circle cx="29" cy="72" r="6"/><circle cx="50" cy="54" r="6"/><path d="M69 28v23M69 29h15l-5 7 5 7H69"/></>}
          {icon === "whitepaper" && <><path d="M30 23h28l12 12v43H30z"/><path d="M58 23v13h12M39 48h22M39 58h22M39 68h15"/><circle cx="68" cy="70" r="9"/></>}
          {icon === "club" && <><path d="m50 21 8 17 19 3-14 13 4 19-17-9-17 9 4-19-14-13 19-3z"/><path d="M26 79c6-7 12-9 18-9M74 79c-6-7-12-9-18-9"/></>}
          {icon === "cope" && <><path d="M20 50s11-20 30-20 30 20 30 20-11 20-30 20S20 50 20 50z"/><circle cx="50" cy="50" r="10"/><circle cx="50" cy="50" r="3" fill="currentColor" stroke="none"/></>}
          {icon === "museum" && <><path d="M23 39 50 24l27 15zM28 74h44M31 42v29M44 42v29M56 42v29M69 42v29"/><path d="M22 79h56"/></>}
          {icon === "streak" && <><rect x="27" y="29" width="46" height="45" rx="4"/><path d="M27 42h46M39 22v14M61 22v14M39 54h8M54 54h8M39 64h8"/><path d="m60 61-5 9h7l-4 9"/></>}
          {icon === "circuit" && <><path d="M50 50 29 29M50 50 71 29M50 50 29 71M50 50 71 71"/><circle cx="50" cy="50" r="10"/><circle cx="27" cy="27" r="6"/><circle cx="73" cy="27" r="6"/><circle cx="27" cy="73" r="6"/><circle cx="73" cy="73" r="6"/></>}
        </g>
        {earned && <path className="achievement-emblem__seal" d="m75 17 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />}
      </svg>
    </span>
  );
}
