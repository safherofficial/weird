import type { DepartmentCrossRead } from "../lib/department-cross-read";

export const SIMULATOR_VERSION = 2;
export const SIMULATOR_ROUNDS = 7;
export const STARTING_CREDITS = 1000;
export const STARTING_PRICE = 10;
export const ASSET_NAME = "HYPE-404";
export const ASSET_LABEL = "FICTIONAL PUMP.FUN LAUNCH / NOT A REAL ASSET";

export type SimulatorActionId = "hold" | "trim" | "average" | "telegram" | "verify" | "guard";

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
  intelNote: string;
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
  intelNote: string | null;
  guardTriggered: boolean;
  intelFilesAfter: number;
  guardOrdersAfter: number;
  researchScoreAfter: number;
  chatHeatAfter: number;
  exitDisciplineAfter: number;
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
  intelFilesRemaining: number;
  guardOrdersRemaining: number;
  researchScore: number;
  chatHeat: number;
  exitDiscipline: number;
  guardsTriggered: number;
};

export type SimulatorProfile = {
  title: string;
  subtitle: string;
  roast: string;
  ending: string;
};

export type SimulatorResult = SimulatorProgress & {
  crossRead: DepartmentCrossRead;
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
  {
    id: "verify",
    label: "VERIFY THE RECEIPTS",
    shortLabel: "VERIFY",
    description: "Spend one of three intelligence files to inspect the fictional launch evidence and reduce timeline noise.",
  },
  {
    id: "guard",
    label: "SET A 20% DRAWDOWN GUARD",
    shortLabel: "GUARD",
    description: "Spend one of two order slips. If the next event drops 20% or more, a quarter of the remaining paper position is sold at the trigger level.",
  },
];

export const marketEvents: MarketEvent[] = [
  {
    day: 1,
    headline: "A 2:13 AM PUMP.FUN LAUNCH HITS THE TIMELINE.",
    memo: "The CA is pasted into three group chats before anyone asks what the ticker means. A green five-minute candle is immediately described as a life-changing opportunity.",
    telegram: "CHAT: “CA JUST DROPPED. DON'T SLEEP. THIS ONE IS DIFFERENT.”",
    intelNote: "The first wallet cluster shares a funding trail in this fictional case file. The launch memo does not establish who controls the wallets.",
    multiplier: 1.45,
    movement: "+45.0%",
  },
  {
    day: 2,
    headline: "THE FIRST WALLET CLUSTER BECOMES A COMMUNITY THEORY.",
    memo: "Several fictional wallets appear to have arrived together. The timeline calls it organic demand; the Department asks whether the launch transaction has actually been checked.",
    telegram: "MOD: “STOP POSTING THE BUNDLE SCREENSHOT. YOU ARE KILLING THE VIBE.”",
    intelNote: "The bundle screenshot is old by one round. The fictional activity log shows clustered timing, not proof of a coordinated operator.",
    multiplier: 0.62,
    movement: "−38.0%",
  },
  {
    day: 3,
    headline: "THREE KOLS POST THE SAME 'STILL EARLY' SCREENSHOT.",
    memo: "The CA is now accompanied by identical arrows, identical conviction and three different claims of independent discovery. The paper chart responds to the attention.",
    telegram: "CHAT: “SMART MONEY IS HERE. I SAW THE SAME SCREENSHOT ON FOUR ACCOUNTS.”",
    intelNote: "Three KOL posts reuse the same crop. The source timestamps do not support three independent discoveries.",
    multiplier: 1.58,
    movement: "+58.0%",
  },
  {
    day: 4,
    headline: "THE BONDING CURVE COMPLETES. THE GROUP CHAT DECLARES VICTORY.",
    memo: "The fictional token graduates to its post-curve pool. Members celebrate the milestone before checking who is still holding, how the pool behaves or whether the next wave of buyers exists.",
    telegram: "ADMIN: “WE GRADUATED. THIS IS ONLY THE BEGINNING. NO REASON TO SELL.”",
    intelNote: "Graduation confirms a curve milestone only. It does not guarantee depth, continuity or an orderly post-curve pool.",
    multiplier: 0.74,
    movement: "−26.0%",
  },
  {
    day: 5,
    headline: "THE DEPLOYER GOES QUIET. THE CTO ANNOUNCEMENT GOES LIVE.",
    memo: "A community takeover is announced. The new moderators inherit the CA, the memes and a pinned message written by someone who has not been seen since the launch.",
    telegram: "CTO CHAT: “WE TAKE IT FROM HERE. SAME MEME. NEW ADMIN PERMISSIONS.”",
    intelNote: "The CTO handover has no verified signer roster in this fictional packet. Community enthusiasm is not an access-control record.",
    multiplier: 1.25,
    movement: "+25.0%",
  },
  {
    day: 6,
    headline: "EARLY WALLETS DISTRIBUTE. THE POOL HAS OTHER PLANS.",
    memo: "The fictional post-graduation pool absorbs a burst of selling. Slippage becomes the most active member of the community, while the chart account changes its timeframe.",
    telegram: "MOD: “THIS IS HEALTHY ROTATION. PLEASE STOP USING THE WORD EXIT.”",
    intelNote: "The pool-depth note flags a thin exit path. The fictional wallet labels do not establish beneficial ownership.",
    multiplier: 0.38,
    movement: "−62.0%",
  },
  {
    day: 7,
    headline: "THE ORIGINAL KOL RETURNS WITH A COMPLETELY NEW THESIS.",
    memo: "The old call is deleted from the timeline. A new narrative appears, the same CA is reposted and the community is told that the real entry was always the next entry.",
    telegram: "CHAT: “WE ARE SO EARLY IT LOOKS LATE. JUST ZOOM OUT.”",
    intelNote: "The returning KOL changed the headline, not the transaction history. The original launch file remains unchanged.",
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
  auditor: {
    title: "THE RECEIPT-REQUESTING AUDITOR",
    subtitle: "You spent the run checking the fictional evidence instead of treating every timeline screenshot as a primary source.",
    roast: "You opened the receipts. The group chat has opened a separate investigation into your attitude.",
    ending: "AWARDED THREE STAMPS AND A PERMANENTLY MUTED TELEGRAM CHANNEL.",
  },
  guardian: {
    title: "THE DRAWDOWN-GUARD SPECIALIST",
    subtitle: "Your contingency orders triggered during the scripted sell-offs. You planned for the chart to misbehave.",
    roast: "You brought an exit procedure to a community that thought the word exit was FUD.",
    ending: "TRANSFERRED TO THE DEPARTMENT OF PRE-APPROVED EXITS.",
  },
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function emptyCounts(): Record<SimulatorActionId, number> {
  return { hold: 0, trim: 0, average: 0, telegram: 0, verify: 0, guard: 0 };
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, value));
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
  // Read v1 case links forever; newly generated challenge links use the expanded v2 action set.
  const currentMatch = value.match(/^s2-([0-5]{7})$/);
  const legacyMatch = value.match(/^s1-([0-3]{7})$/);
  const match = currentMatch ?? legacyMatch;
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
  let intelFilesRemaining = 3;
  let guardOrdersRemaining = 2;
  let researchScore = 0;
  let chatHeat = 0;
  let exitDiscipline = 0;
  let guardsTriggered = 0;

  decisions.forEach((decisionIndex, index) => {
    const action = actions[decisionIndex];
    const event = marketEvents[index];
    const priceBefore = price;
    let actionLabel = action.shortLabel;
    let intelNote: string | null = null;
    let guardPlaced = false;
    let guardTriggered = false;

    if (action.id === "trim") {
      const unitsToSell = units * 0.2;
      units -= unitsToSell;
      cash += unitsToSell * price;
      exitDiscipline = clampScore(exitDiscipline + 16);
      chatHeat = clampScore(chatHeat - 6);
    } else if (action.id === "average") {
      if (cash >= 25) {
        const amount = Math.min(125, cash);
        units += amount / price;
        cash -= amount;
        chatHeat = clampScore(chatHeat + 9);
        exitDiscipline = clampScore(exitDiscipline - 4);
      } else {
        actionLabel = "ADD SKIPPED";
      }
    } else if (action.id === "telegram") {
      chatHeat = clampScore(chatHeat + 22);
      researchScore = clampScore(researchScore - 4);
    } else if (action.id === "verify") {
      if (intelFilesRemaining > 0) {
        intelFilesRemaining -= 1;
        researchScore = clampScore(researchScore + 24);
        chatHeat = clampScore(chatHeat - 12);
        intelNote = event.intelNote;
        actionLabel = "RECEIPTS VERIFIED";
      } else {
        actionLabel = "NO INTEL FILES";
      }
    } else if (action.id === "guard") {
      if (guardOrdersRemaining > 0) {
        guardOrdersRemaining -= 1;
        guardPlaced = true;
        actionLabel = "GUARD SET";
      } else {
        actionLabel = "NO GUARD ORDERS";
      }
    } else {
      chatHeat = clampScore(chatHeat + 2);
    }

    counts[action.id] += 1;
    price *= event.multiplier;

    // A 20% stop order is filled at its trigger level, not at the worse event close.
    if (guardPlaced) {
      if (event.multiplier <= 0.8 && units > 0) {
        const unitsToSell = units * 0.25;
        units -= unitsToSell;
        cash += unitsToSell * priceBefore * 0.8;
        guardsTriggered += 1;
        exitDiscipline = clampScore(exitDiscipline + 18);
        guardTriggered = true;
        actionLabel = "GUARD EXECUTED";
      } else {
        actionLabel = "GUARD EXPIRED";
      }
    }

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
      intelNote,
      guardTriggered,
      intelFilesAfter: intelFilesRemaining,
      guardOrdersAfter: guardOrdersRemaining,
      researchScoreAfter: researchScore,
      chatHeatAfter: chatHeat,
      exitDisciplineAfter: exitDiscipline,
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
    intelFilesRemaining,
    guardOrdersRemaining,
    researchScore,
    chatHeat,
    exitDiscipline,
    guardsTriggered,
  };
}

function selectProfile(progress: SimulatorProgress): SimulatorProfile {
  const { hold, trim, telegram, verify } = progress.counts;
  const executedAdds = progress.history.filter(
    (entry) => entry.action === "average" && entry.actionLabel === "ADD"
  ).length;

  if (telegram >= 3 || progress.chatHeat >= 55) return profiles.telegram;
  if (verify >= 3 || progress.researchScore >= 60) return profiles.auditor;
  if (progress.guardsTriggered >= 2) return profiles.guardian;
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
    counts.verify + " receipt checks",
    counts.guard + " guard orders / " + progress.guardsTriggered + " triggered",
  ].join(" / ");

  const seed = decisions.reduce((sum, decision, index) => ((sum * 29) + (decision + 1) * (index + 13)) % 900000, 404404);
  const caseNumber = String(seed + 100000).slice(-6);
  const dominantAction = actions.reduce((best, action) =>
    counts[action.id] > counts[best.id] ? action : best, actions[0]);
  const largestSwing = progress.history.reduce((best, entry, index, history) => {
    const previousWorth = index === 0 ? STARTING_CREDITS : history[index - 1].netWorthAfter;
    const change = round(entry.netWorthAfter - previousWorth);
    return Math.abs(change) > Math.abs(best.change) ? { entry, change } : best;
  }, {
    entry: progress.history[0],
    change: round(progress.history[0].netWorthAfter - STARTING_CREDITS),
  });
  const crossRead: DepartmentCrossRead = {
    headline: progress.chatHeat >= 55 || counts.telegram >= 3
      ? "THE CHAT HAS A SEAT AT THE TRADING DESK"
      : progress.researchScore >= 60 || counts.verify >= 3
        ? "THE RECEIPTS OUTRANKED THE TIMELINE"
        : progress.guardsTriggered >= 2
          ? "THE CONTINGENCY PLAN ACTUALLY TRIGGERED"
          : executedAdds >= 3
            ? "POSITION EXPANSION BECAME THE MAIN EVENT"
            : counts.trim >= 4
              ? "REPEATED TRIMS SHAPED THE EXIT"
              : counts.hold >= 5
                ? "HOLD WAS THE DEFAULT RESPONSE"
                : skippedAddAttempts > 0
                  ? "THE ADD BUTTON OUTRAN THE CASH RESERVE"
                  : "A MIXED SEVEN-ROUND DECISION SEQUENCE",
    interpretation:
      "Across the seven fictional rounds you selected " + counts.hold + " HOLD, " + counts.trim + " TRIM, " +
      executedAdds + " executed ADD TO POSITION and " + skippedAddAttempts + " skipped add attempts, " +
      counts.telegram + " CT / Telegram consultations, " + counts.verify + " receipt checks and " + counts.guard +
      " drawdown guards. Research integrity finished at " + progress.researchScore + "/100, chat dependency at " +
      progress.chatHeat + "/100 and exit discipline at " + progress.exitDiscipline + "/100. The largest change in marked paper net worth arrived on Day " +
      largestSwing.entry.day + " (" + (largestSwing.change >= 0 ? "+" : "") + largestSwing.change.toFixed(2) +
      " DPC versus the prior round close). This describes the simulator path only; it is not a prediction or a real trading profile.",
    signals: [
      {
        label: "DECISION MIX",
        context: "ALL SEVEN SCRIPTED ROUNDS",
        answer: dominantAction.label + " / " + counts[dominantAction.id] + " selections",
        detail: decisionSummary,
      },
      {
        label: "LARGEST PAPER-NET-WORTH SWING",
        context: "DAY " + String(largestSwing.entry.day).padStart(2, "0") + " / " + largestSwing.entry.headline,
        answer: largestSwing.entry.actionLabel,
        detail: (largestSwing.change >= 0 ? "+" : "") + largestSwing.change.toFixed(2) + " DPC versus the prior round close.",
      },
    ],
  };

  return {
    ...progress,
    crossRead,
    decisions: [...decisions],
    caseNumber,
    profile,
    decisionSummary,
  };
}
