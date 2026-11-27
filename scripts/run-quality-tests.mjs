import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const compiledTestDirectory = join(root, ".quality-tests", "tests");
const compiledTests = readdirSync(compiledTestDirectory)
  .filter((name) => name.endsWith(".test.js"))
  .map((name) => join(compiledTestDirectory, name));

const testCommands = [
  ["compiled quality regression suite", ["--test", ...compiledTests]],
  ["Onchain generator recovery suite", ["--test", join(root, "tests", "onchain-generator.test.mjs")]],
];

let failed = false;
for (const [label, args] of testCommands) {
  console.log("\n=== " + label + " ===");
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });
  if (result.error) {
    console.error(label + " could not start:", result.error);
    failed = true;
  } else if (result.status !== 0) {
    failed = true;
  }
}

process.exitCode = failed ? 1 : 0;
