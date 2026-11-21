export type ClubMemeTemplate = {
  id: string;
  name: string;
  category: string;
  topText: string;
  bottomText: string;
  caption: string;
};

export type ClubPublicChallenge = {
  id: string;
  code: string;
  title: string;
  brief: string;
  prompt: string;
  postText: string;
};

export const CLUB_MEME_TEMPLATES: readonly ClubMemeTemplate[] = [
  {
    id: "conviction-chart",
    name: "CONVICTION VS CHART",
    category: "CONVICTION",
    topText: "THE CHART IS DOWN 94%.",
    bottomText: "MY CONVICTION IS UP 600%.",
    caption: "The chart has been referred to the Department for further review.",
  },
  {
    id: "research-loop",
    name: "THE DYOR LOOP",
    category: "DYOR",
    topText: "I DID MY OWN RESEARCH.",
    bottomText: "THEN I ASKED CT IF I WAS RIGHT.",
    caption: "Independent research. Community-certified confidence.",
  },
  {
    id: "still-early",
    name: "STILL EARLY",
    category: "TIMING",
    topText: "DOWN 96%.",
    bottomText: "THE TIMELINE SAYS I'M STILL EARLY.",
    caption: "The definition of early is currently under departmental review.",
  },
  {
    id: "position-expansion",
    name: "POSITION EXPANSION",
    category: "AVERAGING DOWN",
    topText: "I DIDN'T AVERAGE DOWN.",
    bottomText: "I EXPANDED THE THESIS.",
    caption: "Please update the paperwork. This is a strategic reclassification.",
  },
  {
    id: "next-one",
    name: "THE NEXT ONE",
    category: "MANIFESTO",
    topText: "IT'S NEVER OUR FAULT WHEN WE LOSE.",
    bottomText: "THE NEXT ONE IS MINE.",
    caption: "I did my own research. I know exactly what I'm doing.",
  },
  {
    id: "community-takeover",
    name: "COMMUNITY TAKEOVER",
    category: "CT CULTURE",
    topText: "THE DEV HAS GONE QUIET.",
    bottomText: "THE NEW PROFILE PICTURE IS LIVE.",
    caption: "Community takeover: deliverables pending, banners updated.",
  },
];

export const CLUB_PUBLIC_CHALLENGES: readonly ClubPublicChallenge[] = [
  {
    id: "excuse-without-blame",
    code: "WAR / 01",
    title: "THE PERFECT EXCUSE",
    brief: "Explain a fictional red candle without accepting personal liability.",
    prompt: "CHALLENGE: Give a red candle its most creative explanation. No real token names, wallet details or PnL screenshots.",
    postText: "THE 99% CLUB CHALLENGE / THE PERFECT EXCUSE. Explain a fictional red candle without accepting personal liability. Best departmental explanation wins absolutely nothing. #The99PercentClub #ItsNeverOurFault",
  },
  {
    id: "dyor-receipt",
    code: "WAR / 02",
    title: "THE DYOR RECEIPT",
    brief: "Describe your research process in one sentence. The more independent, the better.",
    prompt: "CHALLENGE: What did 'I did my own research' actually involve? One sentence. Keep addresses and private information out of it.",
    postText: "THE 99% CLUB CHALLENGE / THE DYOR RECEIPT. Describe your research process in one sentence. Extra credit for an unnecessarily long chain of verification. #The99PercentClub #DYOR",
  },
  {
    id: "ct-translator",
    code: "WAR / 03",
    title: "CT TRANSLATOR",
    brief: "Translate one crypto phrase into what the trenches think it means.",
    prompt: "CHALLENGE: Translate one crypto phrase into plain English. 'Strong hands', 'soon' and 'community takeover' are now under review.",
    postText: "THE 99% CLUB CHALLENGE / CT TRANSLATOR. Pick one crypto phrase and translate what it really means in the trenches. #The99PercentClub #CryptoTwitter",
  },
  {
    id: "next-thesis",
    code: "WAR / 04",
    title: "THE NEXT ONE IS MINE",
    brief: "Write the opening line of your next fictional thesis. Conviction is mandatory; token shilling is not.",
    prompt: "CHALLENGE: Write the opening line of your next fictional investment thesis. No tickers, calls to buy or financial promises.",
    postText: "THE 99% CLUB CHALLENGE / THE NEXT ONE IS MINE. Write the opening line of your next fictional thesis. Conviction is mandatory. Shilling is not. #The99PercentClub #TheNextOneIsMine",
  },
  {
    id: "faction-roll-call",
    code: "WAR / 05",
    title: "FACTION ROLL CALL",
    brief: "Post your fictional faction and nominate another member of the trenches.",
    prompt: "CHALLENGE: Name your 99% Club faction and nominate a friend to file their own fictional membership.",
    postText: "THE 99% CLUB CHALLENGE / FACTION ROLL CALL. Name your fictional faction, post your motto and nominate the next degen. #The99PercentClub #ItsNeverOurFault",
  },
  {
    id: "position-reclassification",
    code: "WAR / 06",
    title: "THE POSITION RECLASSIFICATION",
    brief: "Rename a fictional average-down into a strategic portfolio decision. Evidence is optional; confidence is compulsory.",
    prompt: "CHALLENGE: Reclassify a fictional average-down as a strategic position expansion. Keep it humorous; no real tickers, wallet details or PnL screenshots.",
    postText: "THE 99% CLUB CHALLENGE / POSITION RECLASSIFICATION. Rename a fictional average-down as a strategic expansion. The paperwork must sound convincing. #The99PercentClub #ItsNeverOurFault",
  },
];
