export type ArchetypeId =
  | "overprepared"
  | "visual-learner"
  | "social-proof"
  | "dev-trust"
  | "chart-watcher"
  | "catalyst-chaser"
  | "fomo"
  | "planned"
  | "infinite-accumulator"
  | "telegram-sentinel"
  | "moon-prophet"
  | "diamond-handed"
  | "onchain-detective"
  | "utility-optimist"
  | "tokenomics-poet"
  | "narrative-engineer"
  | "liquidity-hunter";

export type AuditOption = {
  label: string;
  research: number;
  cope: number;
  crowd: number;
  tag: ArchetypeId;
};

export type AuditQuestion = {
  prompt: string;
  note: string;
  options: AuditOption[];
};

export type Archetype = {
  title: string;
  subtitle: string;
  roast: string;
};

export const questions: AuditQuestion[] = [
  {
    prompt: "DID YOU READ THE WHITEPAPER?",
    note: "The document that changed everything. Allegedly.",
    options: [
      { label: "Cover to cover. I even checked the references.", research: 5, cope: 1, crowd: 0, tag: "overprepared" },
      { label: "Abstract, tokenomics, conclusion. The essentials.", research: 4, cope: 2, crowd: 1, tag: "overprepared" },
      { label: "I studied the diagrams. They looked expensive.", research: 2, cope: 3, crowd: 2, tag: "visual-learner" },
      { label: "I saw a thread saying the tech was groundbreaking.", research: 0, cope: 5, crowd: 5, tag: "social-proof" },
    ],
  },
  {
    prompt: "HOW DID YOU VERIFY THE TEAM?",
    note: "A profile picture is not a professional reference.",
    options: [
      { label: "Track record, identities and previous work checked independently.", research: 5, cope: 1, crowd: 0, tag: "onchain-detective" },
      { label: "Anonymous, but the public work and history checked out.", research: 4, cope: 2, crowd: 1, tag: "overprepared" },
      { label: "The founder sounds convincing on Spaces.", research: 1, cope: 4, crowd: 3, tag: "dev-trust" },
      { label: "The Telegram mods said the dev is cooking.", research: 0, cope: 5, crowd: 5, tag: "dev-trust" },
    ],
  },
  {
    prompt: "WHAT DID YOU CHECK BEFORE BUYING?",
    note: "Please select what you actually checked, not what you meant to check.",
    options: [
      { label: "Liquidity depth, holders, contract permissions and wallet flows.", research: 5, cope: 1, crowd: 0, tag: "liquidity-hunter" },
      { label: "On-chain activity, distribution and a few independent dashboards.", research: 4, cope: 2, crowd: 0, tag: "onchain-detective" },
      { label: "The chart, the volume and the general atmosphere.", research: 2, cope: 3, crowd: 2, tag: "chart-watcher" },
      { label: "Trending page, replies and the number of rocket emojis.", research: 0, cope: 5, crowd: 5, tag: "social-proof" },
    ],
  },
  {
    prompt: "WHAT FINALLY MADE YOU CLICK BUY?",
    note: "The moment of truth. Or the moment before it.",
    options: [
      { label: "A thesis I had researched independently.", research: 5, cope: 1, crowd: 0, tag: "overprepared" },
      { label: "A catalyst supported by evidence I could verify.", research: 4, cope: 2, crowd: 1, tag: "catalyst-chaser" },
      { label: "It was already up 300%. Still early, right?", research: 1, cope: 5, crowd: 3, tag: "fomo" },
      { label: "A respected account said: last chance before the send.", research: 0, cope: 5, crowd: 5, tag: "fomo" },
    ],
  },
  {
    prompt: "HOW DO YOU USE THE COMMUNITY CHAT?",
    note: "The group chat is not a substitute for independent verification.",
    options: [
      { label: "I observe it for context, then verify claims elsewhere.", research: 4, cope: 1, crowd: 0, tag: "onchain-detective" },
      { label: "I read most messages. It is practically my second job.", research: 2, cope: 3, crowd: 3, tag: "telegram-sentinel" },
      { label: "I trust the admins. They have been here since launch.", research: 1, cope: 4, crowd: 4, tag: "dev-trust" },
      { label: "I ask the chat whether a red flag is actually FUD.", research: 0, cope: 5, crowd: 5, tag: "social-proof" },
    ],
  },
  {
    prompt: "THE TOKEN IS DOWN 82%. WHAT NOW?",
    note: "A hypothetical scenario. Your browser history is not being inspected.",
    options: [
      { label: "Reassess the thesis and act according to predefined rules.", research: 5, cope: 1, crowd: 0, tag: "planned" },
      { label: "Average down. The discount is becoming a personality trait.", research: 1, cope: 5, crowd: 1, tag: "infinite-accumulator" },
      { label: "I cannot sell now. We have been through too much together.", research: 0, cope: 5, crowd: 1, tag: "diamond-handed" },
      { label: "Mute the chart, refresh Telegram, repeat until sunrise.", research: 0, cope: 5, crowd: 5, tag: "telegram-sentinel" },
    ],
  },
  {
    prompt: "WHAT DOES THE TOKEN ACTUALLY DO?",
    note: "A revolutionary solution should ideally have a problem.",
    options: [
      { label: "It solves a defined user problem. I can explain how.", research: 5, cope: 1, crowd: 0, tag: "overprepared" },
      { label: "There is a documented utility model and token role.", research: 4, cope: 2, crowd: 1, tag: "tokenomics-poet" },
      { label: "The community is the utility. You just have to get it.", research: 1, cope: 4, crowd: 3, tag: "utility-optimist" },
      { label: "It represents a movement, a vibe and a higher purpose.", research: 0, cope: 5, crowd: 5, tag: "narrative-engineer" },
    ],
  },
  {
    prompt: "HOW DO YOU READ A CHART?",
    note: "Technical analysis is not improved by staring harder.",
    options: [
      { label: "I use a repeatable process and know what would invalidate it.", research: 4, cope: 1, crowd: 0, tag: "planned" },
      { label: "I zoom out, zoom in, then compare three timeframes.", research: 3, cope: 2, crowd: 0, tag: "chart-watcher" },
      { label: "One green candle and suddenly I can see the future.", research: 0, cope: 5, crowd: 2, tag: "visual-learner" },
      { label: "I follow the chart analyst whose last call almost hit.", research: 1, cope: 4, crowd: 5, tag: "fomo" },
    ],
  },
  {
    prompt: "BE HONEST: WHAT IS YOUR EXIT STRATEGY?",
    note: "There are no wrong answers. There are, however, concerning ones.",
    options: [
      { label: "Written levels, invalidation conditions and position rules.", research: 5, cope: 1, crowd: 0, tag: "planned" },
      { label: "I will reassess when the catalyst plays out.", research: 3, cope: 3, crowd: 1, tag: "catalyst-chaser" },
      { label: "At 100x. I will figure out the details when we get there.", research: 0, cope: 5, crowd: 2, tag: "moon-prophet" },
      { label: "Exit? I am building a long-term relationship.", research: 0, cope: 5, crowd: 1, tag: "diamond-handed" },
    ],
  },
  {
    prompt: "WHAT IS THE BIGGEST RED FLAG YOU IGNORED?",
    note: "This is the part where the Department takes notes.",
    options: [
      { label: "Concentrated liquidity, unlocked supply or unclear permissions.", research: 4, cope: 1, crowd: 0, tag: "liquidity-hunter" },
      { label: "The team stopped communicating, but I waited for an update.", research: 1, cope: 4, crowd: 2, tag: "dev-trust" },
      { label: "Every concern was dismissed as FUD by the community.", research: 0, cope: 5, crowd: 5, tag: "social-proof" },
      { label: "I saw the red flags. I thought they were part of the branding.", research: 0, cope: 5, crowd: 1, tag: "narrative-engineer" },
    ],
  },
];

export const classifications: Record<ArchetypeId, Archetype> = {
  overprepared: {
    title: "THE OVERQUALIFIED BAGHOLDER",
    subtitle: "A thesis was written. The market declined to read it.",
    roast: "You brought a research dossier to a knife fight. Respectfully, the knife had better liquidity.",
  },
  "visual-learner": {
    title: "THE CHART APPRECIATOR",
    subtitle: "The lines were moving. You felt something.",
    roast: "Technical analysis was performed. The technicals have requested privacy.",
  },
  "social-proof": {
    title: "THE TELEGRAM-APPROVED INVESTOR",
    subtitle: "Community conviction: maximum. Independent verification: pending.",
    roast: "You trusted the group chat. The group chat has changed its name and profile picture.",
  },
  "dev-trust": {
    title: "THE DEV WHISPERER",
    subtitle: "Anonymous team. Unconditional faith. Interesting combination.",
    roast: "The developer said 'big things coming'. Archaeologists are still waiting for the announcement.",
  },
  "chart-watcher": {
    title: "THE CANDLESTICK ROMANTIC",
    subtitle: "You saw volume. You heard wedding bells.",
    roast: "You and the chart had something special. Then the chart started seeing other people.",
  },
  "catalyst-chaser": {
    title: "THE CATALYST COLLECTOR",
    subtitle: "Every announcement was a sign. Even the typo.",
    roast: "You followed the catalysts all the way to an undisclosed location.",
  },
  fomo: {
    title: "CERTIFIED EXIT LIQUIDITY",
    subtitle: "You did not chase the pump. You provided it with an exit.",
    roast: "The early holders appreciate your contribution to the ecosystem. They would like to thank you privately.",
  },
  planned: {
    title: "THE PLAN-ADJACENT PROFESSIONAL",
    subtitle: "There was a plan. Events developed independently.",
    roast: "Your spreadsheet remains immaculate. The portfolio has declined to comment.",
  },
  "infinite-accumulator": {
    title: "THE INFINITE ACCUMULATOR",
    subtitle: "Every lower low is an invitation to deepen the lore.",
    roast: "At this point, you are not buying the dip. You are in a committed relationship with it.",
  },
  "telegram-sentinel": {
    title: "THE TELEGRAM SENTINEL",
    subtitle: "You have not slept, but you are fully informed about the community mood.",
    roast: "You know every admin by first name. None of them know where the liquidity went.",
  },
  "moon-prophet": {
    title: "THE 100X PROPHET",
    subtitle: "Unrealized profits have already been allocated to several imaginary properties.",
    roast: "You already spent the gains. The blockchain has no record of this transaction.",
  },
  "diamond-handed": {
    title: "THE DIAMOND-HANDED PHILOSOPHER",
    subtitle: "A temporary drawdown is just a long-term character arc.",
    roast: "You are not holding a bag. You are preserving a historical artifact.",
  },
  "onchain-detective": {
    title: "THE ON-CHAIN DETECTIVE",
    subtitle: "You followed the wallets. The wallets followed their own agenda.",
    roast: "You traced seventeen wallets and still could not locate the exit.",
  },
  "utility-optimist": {
    title: "THE UTILITY OPTIMIST",
    subtitle: "The use case is almost visible. Squint a little harder.",
    roast: "The product-market fit is in the room. It may be the room next door.",
  },
  "tokenomics-poet": {
    title: "THE TOKENOMICS POET",
    subtitle: "You found beauty in the vesting schedule. Nobody else did.",
    roast: "You can explain the emissions curve. You cannot explain the chart.",
  },
  "narrative-engineer": {
    title: "THE NARRATIVE ENGINEER",
    subtitle: "The story was compelling. The fundamentals were a separate department.",
    roast: "You connected the dots. Unfortunately, they were from three different projects.",
  },
  "liquidity-hunter": {
    title: "THE LIQUIDITY GHOST HUNTER",
    subtitle: "You checked the pools. The pools checked out emotionally.",
    roast: "You found the liquidity. It was last seen boarding a bridge.",
  },
};
