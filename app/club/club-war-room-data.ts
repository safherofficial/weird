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
  },  {
    "id": "bridge-receipt",
    "name": "THE BRIDGE RECEIPT",
    "category": "CROSS-CHAIN",
    "topText": "I CHECKED THE ROUTE.",
    "bottomText": "NOT THE WAITING TIME.",
    "caption": "Cross-chain patience has been reclassified as a technical feature."
  },
  {
    "id": "unlock-calendar",
    "name": "THE UNLOCK CALENDAR",
    "category": "TOKEN UNLOCKS",
    "topText": "THE UNLOCK WAS PUBLIC.",
    "bottomText": "MY ATTENTION WAS NOT.",
    "caption": "The calendar was accurate. The conviction had other commitments."
  },
  {
    "id": "airdrop-checklist",
    "name": "THE AIRDROP CHECKLIST",
    "category": "AIRDROPS",
    "topText": "I COMPLETED EVERY TASK.",
    "bottomText": "THE ELIGIBILITY TAB DISAGREES.",
    "caption": "The Department has opened a review of the review."
  },
  {
    "id": "governance-vote",
    "name": "GOVERNANCE BY SCREENSHOT",
    "category": "GOVERNANCE",
    "topText": "THE PROPOSAL PASSED.",
    "bottomText": "THE GROUP CHAT IS STILL VOTING.",
    "caption": "The official result is final. The unofficial discussion has no closing date."
  },
  {
    "id": "yield-relabel",
    "name": "THE YIELD RECLASSIFICATION",
    "category": "YIELD",
    "topText": "THE YIELD WAS PASSIVE.",
    "bottomText": "THE EXPLANATION WAS FULL-TIME.",
    "caption": "Passive income has been moved to the active communications department."
  },
  {
    "id": "narrative-rotation",
    "name": "THE NARRATIVE ROTATION",
    "category": "NARRATIVE",
    "topText": "NEW CHAIN. NEW NARRATIVE.",
    "bottomText": "SAME OLD THESIS.",
    "caption": "The ticker changed. The Department's confidence did not."
  }

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
  },  {
    "id": "bridge-receipt",
    "code": "WAR / 07",
    "title": "THE BRIDGE RECEIPT",
    "brief": "Write the calmest explanation for a fictional cross-chain transfer that is taking longer than your patience.",
    "prompt": "CHALLENGE: Explain a fictional cross-chain transfer delay without sharing real addresses, transaction links or private details.",
    "postText": "THE 99% CLUB CHALLENGE / THE BRIDGE RECEIPT. Write the calmest explanation for a fictional cross-chain transfer taking longer than your patience. No real addresses or transaction links. #The99PercentClub #ItsNeverOurFault"
  },
  {
    "id": "unlock-window",
    "code": "WAR / 08",
    "title": "THE UNLOCK WINDOW",
    "brief": "Turn a fictional, publicly scheduled token unlock into an official departmental explanation.",
    "prompt": "CHALLENGE: File a fictional explanation for an unlock date everyone could see coming. No real tickers or trading calls.",
    "postText": "THE 99% CLUB CHALLENGE / THE UNLOCK WINDOW. File an explanation for a fictional unlock date everyone could see coming. The calendar is not accepting appeals. #The99PercentClub #ItsNeverOurFault"
  },
  {
    "id": "airdrop-eligibility",
    "code": "WAR / 09",
    "title": "THE ELIGIBILITY REVIEW",
    "brief": "Explain why a fictional airdrop checklist and the final eligibility result appear to disagree.",
    "prompt": "CHALLENGE: Write the official appeal for a fictional airdrop allocation that never arrived. No real wallet addresses or personal data.",
    "postText": "THE 99% CLUB CHALLENGE / THE ELIGIBILITY REVIEW. Write the appeal for a fictional airdrop allocation that never arrived. The Department will review the review. #The99PercentClub #DYOR"
  },
  {
    "id": "governance-quorum",
    "code": "WAR / 10",
    "title": "THE GOVERNANCE QUORUM",
    "brief": "Translate a fictional governance vote into the explanation the group chat actually wants to hear.",
    "prompt": "CHALLENGE: Give a fictional governance result its second, unofficial group-chat interpretation. Keep it chain-neutral and specific.",
    "postText": "THE 99% CLUB CHALLENGE / THE GOVERNANCE QUORUM. Give a fictional governance result its second, unofficial group-chat interpretation. #The99PercentClub #CryptoTwitter"
  },
  {
    "id": "yield-reclassification",
    "code": "WAR / 11",
    "title": "THE YIELD RECLASSIFICATION",
    "brief": "Rename a fictional yield disappointment as an entirely different departmental product.",
    "prompt": "CHALLENGE: Reclassify a fictional passive-yield disappointment as a strategic learning product. No real protocol claims.",
    "postText": "THE 99% CLUB CHALLENGE / THE YIELD RECLASSIFICATION. Rename a fictional passive-yield disappointment as a strategic learning product. #The99PercentClub #ItsNeverOurFault"
  },
  {
    "id": "narrative-migration",
    "code": "WAR / 12",
    "title": "THE NARRATIVE MIGRATION",
    "brief": "Move a fictional thesis to a new crypto narrative without admitting that the old one expired.",
    "prompt": "CHALLENGE: Write the handover note for a fictional thesis migrating to a new chain or narrative. No tickers or buy calls.",
    "postText": "THE 99% CLUB CHALLENGE / THE NARRATIVE MIGRATION. Write the handover note for a fictional thesis moving to a new chain or narrative. #The99PercentClub #TheNextOneIsMine"
  }

];
