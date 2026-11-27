import assert from "node:assert/strict";
import { test } from "node:test";
import {
  actions,
  buildSimulatorResult,
  decodeSimulatorCode,
  encodeSimulatorCode,
  simulateProgress,
} from "../app/simulator/simulator-engine";

test("v2 challenge codes support all six decisions and legacy v1 cases remain readable", () => {
  const decisions = [0, 1, 2, 3, 4, 5, 0];

  assert.equal(actions.length, 6);
  assert.deepEqual(decodeSimulatorCode(encodeSimulatorCode(decisions)), decisions);
  assert.deepEqual(decodeSimulatorCode("s1-0123012"), [0, 1, 2, 3, 0, 1, 2]);
  assert.equal(decodeSimulatorCode("s1-0123456"), null);
});

test("receipt checks spend a finite intel supply and raise research integrity", () => {
  const progress = simulateProgress([4, 4, 4, 0, 0, 0, 0]);

  assert.equal(progress.intelFilesRemaining, 0);
  assert.equal(progress.researchScore, 72);
  assert.equal(progress.counts.verify, 3);
  assert.equal(progress.history[0].intelNote?.length ? true : false, true);
  assert.equal(progress.history[3].intelNote, null);
});

test("a drawdown guard triggers at the 20% threshold without changing the scripted price path", () => {
  const guarded = simulateProgress([0, 5, 0, 0, 0, 0, 0]);
  const unguarded = simulateProgress([0, 0, 0, 0, 0, 0, 0]);

  assert.equal(guarded.guardsTriggered, 1);
  assert.equal(guarded.guardOrdersRemaining, 1);
  assert.equal(guarded.history[1].guardTriggered, true);
  assert.equal(guarded.history[1].actionLabel, "GUARD EXECUTED");
  assert.equal(guarded.history[1].priceAfter, unguarded.history[1].priceAfter);
  assert.equal(guarded.history[1].movement, "−38.0%");
});

test("the completed result records the expanded strategy systems", () => {
  const result = buildSimulatorResult([4, 5, 1, 3, 4, 5, 0]);

  assert.equal(result.completedRounds, 7);
  assert.equal(result.history.length, 7);
  assert.equal(result.counts.verify, 2);
  assert.equal(result.counts.guard, 2);
  assert.equal(typeof result.researchScore, "number");
  assert.equal(typeof result.chatHeat, "number");
  assert.equal(typeof result.exitDiscipline, "number");
  assert.equal(result.crossRead.signals.length, 2);
});
