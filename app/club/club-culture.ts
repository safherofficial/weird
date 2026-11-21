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
  },
];
