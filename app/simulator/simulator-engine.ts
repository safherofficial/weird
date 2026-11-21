export const SIMULATOR_VERSION = 1;
export const SIMULATOR_ROUNDS = 7;
export const STARTING_CREDITS = 1000;
export const STARTING_PRICE = 10;
export const ASSET_NAME = "HYPE-404";
export const ASSET_LABEL = "FICTIONAL PUMP.FUN LAUNCH / NOT A REAL ASSET";

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
    label: "ADD TO POSITION",
    shortLabel: "ADD",
    description: "Deploy up to 125 Department Credits from your imaginary cash reserve to buy more fictional units at the current paper price.",
  },
  {
    id: "telegram",
    label: "ASK CT / TELEGRAM",
    shortLabel: "ASK CT",
    description: "Hand your conviction to CT replies and Telegram admins whose main evidence is a rocket emoji and a pinned message.",
  },
];

export const marketEvents: MarketEvent[] = [
  {
    day: 1,
    headline: "A 2:13 AM PUMP.FUN LAUNCH HITS THE TIMELINE.",
    memo: "The CA is pasted into three group chats before anyone asks what the ticker means. A green five-minute candle is immediately described as a life-changing opportunity.",
    telegram: "CHAT: “CA JUST DROPPED. DON'T SLEEP. THIS ONE IS DIFFERENT.”",
    multiplier: 1.45,
    movement: "+45.0%",
  },
  {
    day: 2,
    headline: "THE FIRST WALLET CLUSTER BECOMES A COMMUNITY THEORY.",
    memo: "Several fictional wallets appear to have arrived together. The timeline calls it organic demand; the Department asks whether the launch transaction has actually been checked.",
    telegram: "MOD: “STOP POSTING THE BUNDLE SCREENSHOT. YOU ARE KILLING THE VIBE.”",
    multiplier: 0.62,
    movement: "−38.0%",
  },
  {
    day: 3,
    headline: "THREE KOLS POST THE SAME 'STILL EARLY' SCREENSHOT.",
    memo: "The CA is now accompanied by identical arrows, identical conviction and three different claims of independent discovery. The paper chart responds to the attention.",
    telegram: "CHAT: “SMART MONEY IS HERE. I SAW THE SAME SCREENSHOT ON FOUR ACCOUNTS.”",
    multiplier: 1.58,
    movement: "+58.0%",
  },
  {
    day: 4,
    headline: "THE BONDING CURVE COMPLETES. THE GROUP CHAT DECLARES VICTORY.",
    memo: "The fictional token graduates to its post-curve pool. Members celebrate the milestone before checking who is still holding, how the pool behaves or whether the next wave of buyers exists.",
    telegram: "ADMIN: “WE GRADUATED. THIS IS ONLY THE BEGINNING. NO REASON TO SELL.”",
    multiplier: 0.74,
    movement: "−26.0%",
  },
  {
    day: 5,
    headline: "THE DEPLOYER GOES QUIET. THE CTO ANNOUNCEMENT GOES LIVE.",
    memo: "A community takeover is announced. The new moderators inherit the CA, the memes and a pinned message written by someone who has not been seen since the launch.",
    telegram: "CTO CHAT: “WE TAKE IT FROM HERE. SAME MEME. NEW ADMIN PERMISSIONS.”",
    multiplier: 1.25,
    movement: "+25.0%",
  },
  {
    day: 6,
    headline: "EARLY WALLETS DISTRIBUTE. THE POOL HAS OTHER PLANS.",
    memo: "The fictional post-graduation pool absorbs a burst of selling. Slippage becomes the most active member of the community, while the chart account changes its timeframe.",
    telegram: "MOD: “THIS IS HEALTHY ROTATION. PLEASE STOP USING THE WORD EXIT.”",
    multiplier: 0.38,
    movement: "−62.0%",
  },
  {
    day: 7,
    headline: "THE ORIGINAL KOL RETURNS WITH A COMPLETELY NEW THESIS.",
    memo: "The old call is deleted from the timeline. A new narrative appears, the same CA is reposted and the community is told that the real entry was always the next entry.",
    telegram: "CHAT: “WE ARE SO EARLY IT LOOKS LATE. JUST ZOOM OUT.”",
    multiplier: 1.16,
    movement: "+16.0%",
  },
];

const profiles: Record<string, SimulatorProfile> = {
  telegram: {
    title: "THE CT / TELEGRAM SENTINEL",
    subtitle: "You consulted CT or Telegram in at least three rounds. The fictional market sequence had a separate agenda.",
    roast: "You know which KOL deleted the call and which mod is online at 03:17. The post-graduation pool remains a mystery.",
    ending: "REFERRED TO THE OFFICE OF COMMUNITY-BASED DENIAL.",
  },
  accumulator: {
    title: "THE POSITION-EXPANSION ACCUMULATOR",
    subtitle: "You executed three or more ADD TO POSITION decisions. The paper position kept expanding as the scripted launch sequence unfolded.",
    roast: "You gave the position a growth strategy. The chart submitted a competing plan.",
    ending: "AWARDED THE GOLDEN POSITION-EXPANSION CERTIFICATE.",
  },
  defector: {
    title: "THE EARLY POOL DEFECTOR",
    subtitle: "You used TRIM repeatedly and finished the fictional sequence above your starting paper capital. The group chat has noticed.",
    roast: "You reduced the position while the timeline was still renaming every sell-off healthy rotation.",
    ending: "RELEASED FROM THE BAG. SOCIAL CONSEQUENCES MAY APPLY.",
  },
  consultant: {
    title: "THE POST-GRADUATION EXIT CONSULTANT",
    subtitle: "You used TRIM repeatedly, but the final paper balance still finished below its starting value.",
    roast: "You kept reducing the position. The final drawdown still requested a meeting with your imaginary accountant.",
    ending: "REFERRED TO THE DEPARTMENT OF POST-EXIT REGRET.",
  },
  diamond: {
    title: "THE CTO-ERA DIAMOND HAND",
    subtitle: "You chose HOLD in at least five of the seven rounds. The fictional bag has become a long-running commitment.",
    roast: "The launch narrative changed several times. Your selected action did not.",
    ending: "PROMOTED TO PERMANENT CUSTODIAN OF THE BAG.",
  },
  liquidity: {
    title: "CERTIFIED EXIT LIQUIDITY",
    subtitle: "The scripted launch sequence left your final paper net worth at 400 DPC or less. The Department has filed the receipt.",
    roast: "The first fictional wallets appreciate your contribution to the post-graduation pool. Their CT accounts have gone quiet.",
    ending: "FILED UNDER: A VALUABLE LESSON WITH NO REFUND.",
  },
  tourist: {
    title: "THE VOLATILITY TOURIST",
    subtitle: "You made it through the fictional launch, graduation and post-graduation volatility without fitting any of the Department's other filing categories.",
    roast: "You bought the story, toured the drawdown and left a five-star review for the community.",
    ending: "CLEARED TO LEAVE THE MARKETPLACE. PLEASE KEEP YOUR RECEIPT.",
  },
  survivor: {
    title: "THE PAPER-HANDS SURVIVOR",
    subtitle: "You finished the scripted market sequence with at least your 1,000 starting paper credits. The Department is checking the arithmetic.",
    roast: "You kept the imaginary balance above water. CT has requested a screenshot and three explanations.",
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
    Array.from(value).every((decision) => Number.isInteger(decision) && decision >= 0 && decision < actions.length)
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
    !Array.from(decisions).every((decision) => Number.isInteger(decision) && decision >= 0 && decision < actions.length)
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
    let actionLabel = action.shortLabel;

    if (action.id === "trim") {
      const unitsToSell = units * 0.2;
      units -= unitsToSell;
      cash += unitsToSell * price;
    } else if (action.id === "average") {
      if (cash >= 25) {
        const amount = Math.min(125, cash);
        units += amount / price;
        cash -= amount;
      } else {
        actionLabel = "ADD SKIPPED";
      }
    }

    counts[action.id] += 1;
    price *= event.multiplier;

    const positionValue = units * price;
    const netWorth = cash + positionValue;
    history.push({
      day: event.day,
      headline: event.headline,
      action: action.id,
      actionLabel,
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
  const { hold, trim, telegram } = progress.counts;
  const executedAdds = progress.history.filter(
    (entry) => entry.action === "average" && entry.actionLabel === "ADD"
  ).length;

  if (telegram >= 3) return profiles.telegram;
  if (executedAdds >= 3) return profiles.accumulator;
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
  const executedAdds = progress.history.filter(
    (entry) => entry.action === "average" && entry.actionLabel === "ADD"
  ).length;
  const skippedAddAttempts = counts.average - executedAdds;
  const decisionSummary = [
    counts.hold + " holds",
    counts.trim + " trims",
    executedAdds + " additional buys" + (skippedAddAttempts ? " / " + skippedAddAttempts + " add attempts skipped" : ""),
    counts.telegram + " CT / Telegram consultations",
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
