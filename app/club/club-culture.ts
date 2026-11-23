export const CLUB_CULTURE_CATEGORIES = [
  "MANIFESTO",
  "DYOR",
  "EXCUSE",
  "CT TRANSLATOR",
] as const;

export type ClubCultureCategory = typeof CLUB_CULTURE_CATEGORIES[number];

export type ClubCulturePost = {
  id: string;
  category: ClubCultureCategory;
  title: string;
  angle: string;
  copy: string;
  replyPrompt: string;
};

export const CLUB_CULTURE_POSTS: readonly ClubCulturePost[] = [
  {
    id: "the-next-one",
    category: "MANIFESTO",
    title: "THE NEXT ONE IS MINE",
    angle: "The official promise after every cycle.",
    copy: "I did my own research. I trust my process. The red candle is under review. The next one is mine. #The99PercentClub",
    replyPrompt: "What is the first sentence of your next investment thesis?",
  },
  {
    id: "dyor-receipt",
    category: "DYOR",
    title: "THE DYOR RECEIPT",
    angle: "Independence, with a little help from the timeline.",
    copy: "Read the whitepaper. Checked the wallets. Opened the chart. Asked CT if my conclusions were right. Independent research, community-verified confidence. #The99PercentClub",
    replyPrompt: "What counts as research in your corner of crypto?",
  },
  {
    id: "loss-classification",
    category: "EXCUSE",
    title: "LOSS CLASSIFICATION",
    angle: "The official post-mortem, pending personal liability.",
    copy: "The Department has classified this loss as macro conditions, low liquidity, early timing and a temporary misunderstanding of my thesis. Personal liability remains pending. #The99PercentClub",
    replyPrompt: "Which department gets the case file when a trade goes red?",
  },
  {
    id: "ct-translator",
    category: "CT TRANSLATOR",
    title: "CT TRANSLATOR",
    angle: "A field guide to the language of the trenches.",
    copy: "Community takeover: new profile picture. Roadmap: soon. Strong hands: nobody found the sell button. #The99PercentClub",
    replyPrompt: "Which crypto phrase deserves an official translation?",
  },
  {
    id: "average-down",
    category: "EXCUSE",
    title: "POSITION EXPANSION",
    angle: "It was not averaging down. It was a strategic reclassification.",
    copy: "I didn't average down. I expanded my exposure to the long-term narrative. Please update the paperwork. #The99PercentClub",
    replyPrompt: "What is your most creative synonym for averaging down?",
  },
  {
    id: "ca-verification",
    category: "DYOR",
    title: "THE VERIFICATION LOOP",
    angle: "Trust, but ask the timeline to confirm.",
    copy: "The CA was checked. Then CT checked the CA. Then I checked CT. The research chain is fully decentralised. #The99PercentClub",
    replyPrompt: "How many independent checks does a CA need before CT agrees?",
  },
  {
    id: "still-early",
    category: "MANIFESTO",
    title: "STILL EARLY",
    angle: "A flexible definition of time.",
    copy: "Down 93%? The timeline says I'm early. The chart says otherwise. We have agreed to disagree. #The99PercentClub",
    replyPrompt: "At what point does 'still early' become an archaeological period?",
  },
  {
    id: "no-fault",
    category: "MANIFESTO",
    title: "NO FAULT FOUND",
    angle: "The club's operating principle.",
    copy: "It's never our fault when we lose. The next one is mine. I know exactly what I'm doing. #The99PercentClub",
    replyPrompt: "Complete this sentence: the market would have worked if…",
  },  {
    "id": "bridge-receipt",
    "category": "DYOR",
    "title": "THE BRIDGE RECEIPT",
    "angle": "Every transfer was a research thesis until the confirmation screen appeared.",
    "copy": "I checked the destination chain, the route, the fee and the timeline. I forgot to check whether I was ready to explain the wait. #The99PercentClub",
    "replyPrompt": "Which part of a cross-chain move gets explained only after it takes longer than expected?"
  },
  {
    "id": "unlock-calendar",
    "category": "EXCUSE",
    "title": "THE UNLOCK CALENDAR",
    "angle": "The date was public. The attention was elsewhere.",
    "copy": "The unlock was on the calendar. My attention was on the pinned bullish thread. The Department accepts no responsibility for either tab. #The99PercentClub",
    "replyPrompt": "What public detail did your fictional thesis somehow treat as breaking news?"
  },
  {
    "id": "airdrop-eligibility",
    "category": "DYOR",
    "title": "THE ELIGIBILITY REVIEW",
    "angle": "Every task was complete. The allocation remained a matter of interpretation.",
    "copy": "I completed every task, refreshed the eligibility page and classified the missing allocation as a clerical misunderstanding. #The99PercentClub",
    "replyPrompt": "What is the most elaborate explanation for a fictional airdrop eligibility surprise?"
  },
  {
    "id": "governance-vote",
    "category": "CT TRANSLATOR",
    "title": "GOVERNANCE BY SCREENSHOT",
    "angle": "The vote closed. The group chat opened a second round.",
    "copy": "The proposal passed. Three screenshots later, we discovered the quorum and the group chat had different definitions of participation. #The99PercentClub",
    "replyPrompt": "Which governance phrase deserves translation into plain group-chat English?"
  },
  {
    "id": "yield-reclassification",
    "category": "EXCUSE",
    "title": "THE YIELD RECLASSIFICATION",
    "angle": "The yield looked passive. The explanation became a full-time role.",
    "copy": "The yield looked passive. The explanations required a full-time communications department and a much longer disclaimer. #The99PercentClub",
    "replyPrompt": "What would your fictional yield strategy be renamed after the first uncomfortable question?"
  },
  {
    "id": "narrative-migration",
    "category": "MANIFESTO",
    "title": "THE NARRATIVE MIGRATION",
    "angle": "A new chain, a new story and the same unreviewed conviction.",
    "copy": "The old narrative is resting. The new one has a fresh ticker, the same conviction and absolutely no lessons attached. #The99PercentClub",
    "replyPrompt": "What does your investment thesis carry with it when it migrates to a new narrative?"
  }

];
