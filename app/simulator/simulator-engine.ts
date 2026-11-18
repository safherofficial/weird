export const SIMULATOR_VERSION = 1;
export const SIMULATOR_ROUNDS = 7;
export const STARTING_CREDITS = 1000;
export const STARTING_PRICE = 10;
export const ASSET_NAME = "HYPE-404";
export const ASSET_LABEL = "FICTIONAL COMMUNITY TOKEN / NOT A REAL ASSET";

export type SimulatorActionId = "hold" | "trim" | "average" | "telegram";

export type SimulatorAction = {
  id: SimulatorActionId;
  label: string;
  description: string;
  shortLabel: string;
};

export type MarketEvent = {
  day: number;
  headline: string;
  memo: string;
  telegram: string;
  multiplier: number;
  movement: string;
};

export type SimulatorHistoryEntry = {
  day: number;
  headline: string;
  action: SimulatorActionId;
  actionLabel: string;
  priceBefore: number;
  priceAfter: number;
  movement: string;
  cashAfter: number;
  unitsAfter: number;
  netWorthAfter: number;
};

export type SimulatorProgress = {
  completedRounds: number;
  price: number;
  cash: number;
  units: number;
  positionValue: number;
  netWorth: number;
  paperPnl: number;
  paperReturn: number;
  history: SimulatorHistoryEntry[];
  counts: Record<SimulatorActionId, number>;
};

export type SimulatorProfile = {
  title: string;
  subtitle: string;
  roast: string;
  ending: string;
};

export type SimulatorResult = SimulatorProgress & {
  decisions: number[];
  caseNumber: string;
  profile: SimulatorProfile;
  decisionSummary: string;
};

export const actions: SimulatorAction[] = [
  {
    id: "hold",
    label: "HOLD THE BAG",
    shortLabel: "HOLD",
    description: "The thesis has not changed. The chart is simply being disrespectful.",
  },
  {
    id: "trim",
    label: "TRIM 20%",
    shortLabel: "TRIM",
    description: "Sell one fifth of your remaining fictional position. Call it risk management.",
  },
  {
    id: "average",
    label: "AVERAGE DOWN",
    shortLabel: "BUY MORE",
    description: "Deploy up to 125 Department Credits from your imaginary cash reserve.",
  },
  {
    id: "telegram",
    label: "ASK TELEGRAM",
    shortLabel: "ASK CHAT",
    description: "Outsource your conviction to people whose profile pictures are cartoon frogs.",
  },
];

export const marketEvents: MarketEvent[] = [
  {
    day: 1,
    headline: "FOUNDER POSTS: “BIG THINGS SOON.”",
    memo: "A screenshot of a calendar appears. No date is visible. The community calls it a catalyst.",
    telegram: "ADMIN: “WE CANNOT SAY MUCH RIGHT NOW. BUT SOON.”",
    multiplier: 1.45,
    movement: "+45.0%",
  },
  {
    day: 2,
    headline: "TEAM WALLET MOVES TO A NEW ADDRESS.",
    memo: "The wallet tracker notices activity. The official explanation is that everything is normal.",
    telegram: "MOD: “PLEASE STOP FUDDING THE WALLET. IT IS PROBABLY JUST RESTRUCTURING.”",
    multiplier: 0.62,
    movement: "−38.0%",
  },
  {
    day: 3,
    headline: "CEX LISTING RUMOUR REACHES 14,000 REPLIES.",
    memo: "The source is a reply to a post by someone who knows someone. The chart responds anyway.",
    telegram: "COMMUNITY: “WE TOLD YOU. THE SIGNS WERE THERE.”",
    multiplier: 1.58,
    movement: "+58.0%",
  },
  {
    day: 4,
    headline: "TOKENOMICS UPDATE: TOKENOMICS REMAIN.",
    memo: "A vesting schedule is reposted. Several holders discover the word “unlock” for the first time.",
    telegram: "ADMIN: “NOTHING HAS CHANGED. PLEASE READ THE MEDIUM ARTICLE.”",
    multiplier: 0.74,
    movement: "−26.0%",
  },
  {
    day: 5,
    headline: "INFLUENCER POSTS THREE ROCKET EMOJIS.",
    memo: "Engagement spikes. No disclosure, thesis or useful information accompanies the emojis.",
    telegram: "CHAT: “THIS IS THE CONFIRMATION WE NEEDED.”",
    multiplier: 1.25,
    movement: "+25.0%",
  },
  {
    day: 6,
    headline: "LIQUIDITY DEPTH LOOKS LIKE A PADDLING POOL.",
    memo: "The spread widens. A chart with fewer buyers than a Monday morning meeting is circulated.",
    telegram: "MOD: “PRICE ACTION IS TEMPORARY. COMMUNITY IS FOREVER.”",
    multiplier: 0.38,
    movement: "−62.0%",
  },
  {
    day: 7,
    headline: "FOUNDER CHANGES PROFILE PICTURE.",
    memo: "The new artwork is described as a strategic brand evolution. The roadmap remains unchanged.",
    telegram: "ADMIN: “WE ARE ENTERING A NEW ERA. PLEASE STAY PATIENT.”",
    multiplier: 1.16,
    movement: "+16.0%",
  },
];

const profiles: Record<string, SimulatorProfile> = {
  telegram: {
    title: "THE TELEGRAM SENTINEL",
    subtitle: "You did not trade the market. You monitored the community's reaction to it.",
    roast: "You know which admin is online at 03:17. You still do not know where the liquidity went.",
    ending: "REFERRED TO THE OFFICE OF COMMUNITY-BASED DENIAL.",
  },
  accumulator: {
    title: "THE INFINITE ACCUMULATOR",
    subtitle: "Every lower price was an invitation to deepen the relationship.",
    roast: "You did not catch the falling knife. You subscribed to its newsletter.",
    ending: "AWARDED THE GOLDEN AVERAGE-DOWN CERTIFICATE.",
  },
  defector: {
    title: "THE EXIT LIQUIDITY DEFECTOR",
    subtitle: "You left the party while the music was still playing. Unforgivable behaviour.",
    roast: "You sold into the chaos and kept your imaginary credits. The group chat has noticed.",
    ending: "RELEASED FROM THE BAG. SOCIAL CONSEQUENCES MAY APPLY.",
  },
  consultant: {
    title: "THE EARLY EXIT CONSULTANT",
    subtitle: "You found the sell button. The timing, however, remains under investigation.",
    roast: "You escaped the position, then watched the next candle with the energy of a divorcee.",
    ending: "REFERRED TO THE DEPARTMENT OF POST-EXIT REGRET.",
  },
  diamond: {
    title: "THE DIAMOND-HANDED PHILOSOPHER",
    subtitle: "You held through every plot twist. The bag is now a family heirloom.",
    roast: "The chart went through seven stages of grief. You are still waiting for stage eight: recovery.",
    ending: "PROMOTED TO PERMANENT CUSTODIAN OF THE BAG.",
  },
  liquidity: {
    title: "CERTIFIED EXIT LIQUIDITY",
    subtitle: "The market needed an exit. You arrived with impeccable punctuality.",
    roast: "The early holders appreciate your contribution. They have already muted the conversation.",
    ending: "FILED UNDER: A VALUABLE LESSON WITH NO REFUND.",
  },
  tourist: {
    title: "THE VOLATILITY TOURIST",
    subtitle: "You visited every emotional climate and returned with the same suitcase.",
    roast: "You bought the story, toured the drawdown and left a five-star review for the community.",
    ending: "CLEARED TO LEAVE THE MARKETPLACE. PLEASE KEEP YOUR RECEIPT.",
  },
  survivor: {
    title: "THE PAPER-HANDS SURVIVOR",
    subtitle: "An unexpectedly sensible sequence of imaginary decisions.",
    roast: "You treated a meme token like a revolving door. The Department is not sure how to process this.",
    ending: "RELEASED WITH A CAUTIONARY FOOTNOTE.",
  },
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function emptyCounts(): Record<SimulatorActionId, number> {
  return { hold: 0, trim: 0, average: 0, telegram: 0 };
}

export function isValidDecisions(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length === SIMULATOR_ROUNDS &&
    value.every((decision) => Number.isInteger(decision) && decision >= 0 && decision < actions.length)
  );
}

export function encodeSimulatorCode(decisions: number[]): string {
  if (!isValidDecisions(decisions)) {
    throw new Error("A complete, valid simulation is required.");
  }
  return "s" + SIMULATOR_VERSION + "-" + decisions.join("");
}

export function decodeSimulatorCode(value: unknown): number[] | null {
  if (typeof value !== "string") return null;
  const match = value.match(new RegExp("^s" + SIMULATOR_VERSION + "-([0-3]{" + SIMULATOR_ROUNDS + "})$"));
  if (!match) return null;
  const decisions = [...match[1]].map(Number);
  return isValidDecisions(decisions) ? decisions : null;
}

export function simulateProgress(decisions: number[]): SimulatorProgress {
  if (
    !Array.isArray(decisions) ||
    decisions.length > SIMULATOR_ROUNDS ||
    !decisions.every((decision) => Number.isInteger(decision) && decision >= 0 && decision < actions.length)
  ) {
    throw new Error("Simulation decisions are invalid.");
  }

  let price = STARTING_PRICE;
  let cash = STARTING_CREDITS * 0.25;
  let units = (STARTING_CREDITS * 0.75) / STARTING_PRICE;
  const history: SimulatorHistoryEntry[] = [];
  const counts = emptyCounts();

  decisions.forEach((decisionIndex, index) => {
    const action = actions[decisionIndex];
    const event = marketEvents[index];
    const priceBefore = price;

    if (action.id === "trim") {
      const unitsToSell = units * 0.2;
      units -= unitsToSell;
      cash += unitsToSell * price;
    } else if (action.id === "average" && cash >= 25) {
      const amount = Math.min(125, cash);
      units += amount / price;
      cash -= amount;
    }

    counts[action.id] += 1;
    price *= event.multiplier;

    const positionValue = units * price;
    const netWorth = cash + positionValue;
    history.push({
      day: event.day,
      headline: event.headline,
      action: action.id,
      actionLabel: action.shortLabel,
      priceBefore: round(priceBefore),
      priceAfter: round(price),
      movement: event.movement,
      cashAfter: round(cash),
      unitsAfter: round(units),
      netWorthAfter: round(netWorth),
    });
  });

  const positionValue = units * price;
  const netWorth = cash + positionValue;
  const paperPnl = netWorth - STARTING_CREDITS;

  return {
    completedRounds: decisions.length,
    price: round(price),
    cash: round(cash),
    units: round(units),
    positionValue: round(positionValue),
    netWorth: round(netWorth),
    paperPnl: round(paperPnl),
    paperReturn: round((paperPnl / STARTING_CREDITS) * 100),
    history,
    counts,
  };
}

function selectProfile(progress: SimulatorProgress): SimulatorProfile {
  const { hold, trim, average, telegram } = progress.counts;

  if (telegram >= 3) return profiles.telegram;
  if (average >= 3) return profiles.accumulator;
  if (trim >= 4) return progress.netWorth >= STARTING_CREDITS ? profiles.defector : profiles.consultant;
  if (hold >= 5) return profiles.diamond;
  if (progress.netWorth >= STARTING_CREDITS) return profiles.survivor;
  if (progress.netWorth <= 400) return profiles.liquidity;
  return profiles.tourist;
}

export function buildSimulatorResult(decisions: number[]): SimulatorResult {
  if (!isValidDecisions(decisions)) {
    throw new Error("A complete, valid simulation is required.");
  }

  const progress = simulateProgress(decisions);
  const profile = selectProfile(progress);
  const counts = progress.counts;
  const decisionSummary = [
    counts.hold + " holds",
    counts.trim + " trims",
    counts.average + " average-downs",
    counts.telegram + " Telegram consultations",
  ].join(" / ");

  const seed = decisions.reduce((sum, decision, index) => ((sum * 29) + (decision + 1) * (index + 13)) % 900000, 404404);
  const caseNumber = String(seed + 100000).slice(-6);

  return {
    ...progress,
    decisions: [...decisions],
    caseNumber,
    profile,
    decisionSummary,
  };
}
