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
    prompt: "WHERE DID THE CA FIRST ENTER YOUR TIMELINE?",
    note: "The first touchpoint is often a reply, a repost or a suspiciously confident group chat.",
    options: [
      { label: "I found the mint, checked the launch transaction and built my own thesis.", research: 5, cope: 1, crowd: 0, tag: "overprepared" },
      { label: "I saw the launch, then checked the CA, deployer history and holder spread.", research: 4, cope: 2, crowd: 1, tag: "overprepared" },
      { label: "I checked the chart and the bonding-curve progress bar. The colours looked convincing.", research: 2, cope: 3, crowd: 2, tag: "visual-learner" },
      { label: "A large account posted “next 100x” and the replies did the rest.", research: 0, cope: 5, crowd: 5, tag: "social-proof" },
    ],
  },
  {
    prompt: "WHAT DID YOU CHECK ABOUT THE DEPLOYER?",
    note: "A cartoon PFP and a pinned “building” post are not a track record.",
    options: [
      { label: "Deployer history, funding path and prior launches checked independently.", research: 5, cope: 1, crowd: 0, tag: "onchain-detective" },
      { label: "Anonymous, but the launch wallet and public history were reviewed.", research: 4, cope: 2, crowd: 1, tag: "overprepared" },
      { label: "The founder sounded convincing on an X Space with 900 listeners.", research: 1, cope: 4, crowd: 3, tag: "dev-trust" },
      { label: "The Telegram mods said the deployer is cooking and the bundle is FUD.", research: 0, cope: 5, crowd: 5, tag: "dev-trust" },
    ],
  },
  {
    prompt: "WHAT DID YOU CHECK BEFORE TOUCHING THE BUY BUTTON?",
    note: "The Department would like the checks you completed before the green candle—not the ones you promised to do after.",
    options: [
      { label: "Curve progress, holder distribution, deployer history and pool conditions.", research: 5, cope: 1, crowd: 0, tag: "liquidity-hunter" },
      { label: "Early wallet clusters, launch transactions and whether the same wallets keep reappearing.", research: 4, cope: 2, crowd: 0, tag: "onchain-detective" },
      { label: "The five-minute chart, volume and the feeling that everyone else was already in.", research: 2, cope: 3, crowd: 2, tag: "chart-watcher" },
      { label: "Trending page, KOL replies and the number of “CA?” comments.", research: 0, cope: 5, crowd: 5, tag: "social-proof" },
    ],
  },
  {
    prompt: "WHAT FINALLY MADE YOU CHASE THE CANDLE?",
    note: "The candle was moving. Your timeline was moving faster.",
    options: [
      { label: "A thesis I had written before the ticker started trending.", research: 5, cope: 1, crowd: 0, tag: "overprepared" },
      { label: "A curve milestone or launch event I could verify on the actual source.", research: 4, cope: 2, crowd: 1, tag: "catalyst-chaser" },
      { label: "It was up 300% in minutes. The next candle surely had room.", research: 1, cope: 5, crowd: 3, tag: "fomo" },
      { label: "A KOL posted “last chance before graduation” and pinned the CA.", research: 0, cope: 5, crowd: 5, tag: "fomo" },
    ],
  },
  {
    prompt: "WHAT DO YOU DO WHEN CT AND TELEGRAM START SHOUTING TOGETHER?",
    note: "A trending CA is not proof of demand. Repetition is not independent confirmation.",
    options: [
      { label: "I read the timeline for context, then check the underlying claims myself.", research: 4, cope: 1, crowd: 0, tag: "onchain-detective" },
      { label: "I monitor X replies, Telegram and Spaces like a full-time community employee.", research: 2, cope: 3, crowd: 3, tag: "telegram-sentinel" },
      { label: "I trust the pinned admin. They have been “here since the trenches”.", research: 1, cope: 4, crowd: 4, tag: "dev-trust" },
      { label: "I ask the chat whether the wallet cluster is FUD or “smart money”.", research: 0, cope: 5, crowd: 5, tag: "social-proof" },
    ],
  },
  {
    prompt: "THE TOKEN IS DOWN 82% AFTER GRADUATION. WHAT NOW?",
    note: "A fictional post-graduation drawdown. Nobody is inspecting your wallet or browser history.",
    options: [
      { label: "Reassess the original thesis against the new pool, distribution and actual evidence.", research: 5, cope: 1, crowd: 0, tag: "planned" },
      { label: "Average down. The next community takeover post will surely fix the chart.", research: 1, cope: 5, crowd: 1, tag: "infinite-accumulator" },
      { label: "I cannot sell after graduation. The ticker and I have unfinished business.", research: 0, cope: 5, crowd: 1, tag: "diamond-handed" },
      { label: "Refresh CT for a CTO update, then Telegram for confirmation, until sunrise.", research: 0, cope: 5, crowd: 5, tag: "telegram-sentinel" },
    ],
  },
  {
    prompt: "WHAT DOES THE TOKEN GIVE HOLDERS BESIDES A TICKER?",
    note: "A meme can be the whole joke. Calling a ticker a product does not make it one.",
    options: [
      { label: "It has a real, clearly described function beyond being traded.", research: 5, cope: 1, crowd: 0, tag: "overprepared" },
      { label: "There is a defined token role, with mechanics and limits that can be checked.", research: 4, cope: 2, crowd: 1, tag: "tokenomics-poet" },
      { label: "The memes, group chat and shared lore are the product. Nobody is pretending otherwise.", research: 1, cope: 4, crowd: 3, tag: "utility-optimist" },
      { label: "It is a ticker, a frog and a promise that the timeline will understand eventually.", research: 0, cope: 5, crowd: 5, tag: "narrative-engineer" },
    ],
  },
  {
    prompt: "WHAT DOES A GREEN FIVE-MINUTE CANDLE MEAN TO YOU?",
    note: "A single green candle is not a thesis, even when the replies say “send”.",
    options: [
      { label: "I use a repeatable process and know which price action would invalidate the idea.", research: 4, cope: 1, crowd: 0, tag: "planned" },
      { label: "I compare the curve, the post-graduation pool and more than one timeframe.", research: 3, cope: 2, crowd: 0, tag: "chart-watcher" },
      { label: "One green candle and I am already writing the 100x post.", research: 0, cope: 5, crowd: 2, tag: "visual-learner" },
      { label: "I follow the account whose last call almost graduated.", research: 1, cope: 4, crowd: 5, tag: "fomo" },
    ],
  },
  {
    prompt: "BE HONEST: WHAT IS YOUR EXIT PLAN AFTER THE LAUNCH HYPE?",
    note: "The Department is especially interested in what happens after the pinned “we are early” message.",
    options: [
      { label: "Written exit conditions, invalidation rules and a plan that exists before the next candle.", research: 5, cope: 1, crowd: 0, tag: "planned" },
      { label: "I will reassess at the curve milestone, using evidence rather than the celebration thread.", research: 3, cope: 3, crowd: 1, tag: "catalyst-chaser" },
      { label: "At 100x. The screenshot is already drafted; the exit plan is in a future phase.", research: 0, cope: 5, crowd: 2, tag: "moon-prophet" },
      { label: "Exit? I am now a founding member of the community takeover.", research: 0, cope: 5, crowd: 1, tag: "diamond-handed" },
    ],
  },
  {
    prompt: "WHICH LAUNCH RED FLAG DID YOU EXPLAIN AWAY?",
    note: "The Department has opened a separate folder for the phrase “probably nothing”.",
    options: [
      { label: "A concentrated holder set, unclear permissions or a pool too thin for the story.", research: 4, cope: 1, crowd: 0, tag: "liquidity-hunter" },
      { label: "The deployer went quiet, but I treated the silence as a stealth-build phase.", research: 1, cope: 4, crowd: 2, tag: "dev-trust" },
      { label: "Bundle-wallet questions were labelled FUD by accounts repeating the same KOL call.", research: 0, cope: 5, crowd: 5, tag: "social-proof" },
      { label: "The top-wallet chart looked like a family reunion. I called it community alignment.", research: 0, cope: 5, crowd: 1, tag: "narrative-engineer" },
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
    title: "THE GREEN-CANDLE APPRECIATOR",
    subtitle: "A five-minute green candle appeared. You immediately saw the next 100x in its reflection.",
    roast: "You zoomed into the first green candle until every wick looked like insider information.",
  },
  "social-proof": {
    title: "THE CT-APPROVED INVESTOR",
    subtitle: "Timeline conviction: maximum. Independent verification: still loading.",
    roast: "You trusted the timeline. The KOL deleted the call and the group chat changed its name.",
  },
  "dev-trust": {
    title: "THE DEPLOYER WHISPERER",
    subtitle: "The deployer stopped posting. You interpreted the silence as a stealth-build phase.",
    roast: "The deployer said 'building'. Archaeologists are still searching for the handover keys.",
  },
  "chart-watcher": {
    title: "THE FIVE-MINUTE CANDLE ROMANTIC",
    subtitle: "You saw a green candle after the CA trended. You heard the sound of a life-changing entry.",
    roast: "You and the chart had something special. Then the chart started seeing other people.",
  },
  "catalyst-chaser": {
    title: "THE CA / CATALYST COLLECTOR",
    subtitle: "Every KOL post, curve screenshot and exchange rumour became a catalyst worth refreshing for.",
    roast: "You followed the catalysts all the way to an undisclosed location.",
  },
  fomo: {
    title: "CERTIFIED EXIT LIQUIDITY",
    subtitle: "You did not chase the pump. You provided it with an exit.",
    roast: "The early holders appreciate your contribution to the ecosystem. They would like to thank you privately.",
  },
  planned: {
    title: "THE PLAN-FIRST OPERATOR",
    subtitle: "You wrote the thesis, know what would invalidate it and set an exit condition before the next candle.",
    roast: "Fourteen tabs of CA research and an exit plan written before the timeline could rename the drawdown. CT has requested your browser history.",
  },
  "infinite-accumulator": {
    title: "THE INFINITE ACCUMULATOR",
    subtitle: "Every lower low is an invitation to deepen the lore.",
    roast: "At this point, you are not buying the dip. You are in a committed relationship with it.",
  },
  "telegram-sentinel": {
    title: "THE CT / TELEGRAM SENTINEL",
    subtitle: "You have not slept, but you know every KOL reply, mod status and pinned Telegram update.",
    roast: "You know every mod by first name. None of them can confirm who controls the deployer wallet.",
  },
  "moon-prophet": {
    title: "THE NEXT-100X PROPHET",
    subtitle: "The next ticker's 100x has already been spent in your head. The CA has not even been checked.",
    roast: "You already spent the gains. The blockchain has no record of this transaction.",
  },
  "diamond-handed": {
    title: "THE POST-GRADUATION DIAMOND HAND",
    subtitle: "The deployer vanished, the CTO arrived and the post-graduation chart turned red. Your thesis remains pinned.",
    roast: "You are not holding a bag. You are preserving a historical artifact.",
  },
  "onchain-detective": {
    title: "THE BUNDLE-CHASING ON-CHAIN DETECTIVE",
    subtitle: "You followed the fictional early-wallet cluster. The cluster followed a different timeline.",
    roast: "You drew lines between seventeen wallets and still could not establish common ownership or find the exit.",
  },
  "utility-optimist": {
    title: "THE MEME-IS-THE-PRODUCT REALIST",
    subtitle: "The memes, group chat and shared lore are the product. You are not pretending a future app is already shipping.",
    roast: "The Department asked where the utility roadmap was. You pointed at the frog and said, 'That is the roadmap.'",
  },
  "tokenomics-poet": {
    title: "THE TOKEN-MECHANICS AUDITOR",
    subtitle: "You want a defined token role, mechanics that can be checked and limits written in plain sight.",
    roast: "You asked what the token actually does. The launch thread responded with a pie chart and a rocket.",
  },
  "narrative-engineer": {
    title: "THE CT NARRATIVE ENGINEER",
    subtitle: "You connected the KOL call, the wallet arrows and the next exchange rumour into one immaculate thesis.",
    roast: "You connected three screenshots, two Telegram rumours and one deleted post. None came from the same source.",
  },
  "liquidity-hunter": {
    title: "THE POST-GRADUATION LIQUIDITY HUNTER",
    subtitle: "You checked the fictional pool after graduation. The depth chart offered a very brief conversation.",
    roast: "You found the liquidity. It was last seen boarding a bridge.",
  },
};
