import assert from "node:assert/strict";
import { test } from "node:test";
import {
  formatOnchainMoney,
  formatOnchainPercent,
  truncateAddress,
} from "../app/daily-office/onchain/onchain-data";

test("onchain currency formatting keeps missing values explicit", () => {
  assert.equal(formatOnchainMoney(12500), "$12,500");
  assert.equal(formatOnchainMoney(0.0000123), "$0.000012");
  assert.equal(formatOnchainMoney(null), "N/D");
});

test("onchain percentage formatting preserves direction", () => {
  assert.equal(formatOnchainPercent(12.345), "+12.35%");
  assert.equal(formatOnchainPercent(-4.2), "-4.20%");
  assert.equal(formatOnchainPercent(null), "N/D");
});

test("wallet and token addresses are shortened without losing their ends", () => {
  assert.equal(truncateAddress("12345678901234567890"), "12345678…4567890");
  assert.equal(truncateAddress("short-address"), "short-address");
});
