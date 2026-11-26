import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

function findOpenGraphImages(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return findOpenGraphImages(fullPath);
    return entry.isFile() && entry.name === "opengraph-image.tsx" ? [fullPath] : [];
  });
}

test("R4 generated social images use the default Node.js runtime, not deprecated Edge runtime", () => {
  const imageFiles = findOpenGraphImages("app");
  assert.equal(imageFiles.length, 31, "all 31 generated social image routes must remain present");

  for (const path of imageFiles) {
    const source = readFileSync(path, "utf8");
    assert.match(source, /from ["']next\/og["']/u, `${path} must continue using Next ImageResponse`);
    assert.doesNotMatch(source, /export const runtime\s*=\s*["']edge["']/u, `${path} must not pin the deprecated Edge runtime`);
  }
});

test("R4 Content Security Policy allows only the resources this application uses", () => {
  const config = readFileSync("next.config.ts", "utf8");
  const readme = readFileSync("README.md", "utf8");
  const vercel = JSON.parse(readFileSync("vercel.json", "utf8")) as {
    headers?: Array<{ headers?: Array<{ key?: string; value?: string }> }>;
  };
  const policy = config.match(/const contentSecurityPolicy = \[([\s\S]*?)\]\.join\("; "\)/u)?.[1] ?? "";

  assert.ok(policy.length > 0, "CSP must be defined in Next config and applied to all routes");
  for (const directive of [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "script-src 'self' 'unsafe-inline'",
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-src 'none'",
    "upgrade-insecure-requests",
  ]) {
    assert.ok(policy.includes(directive), `CSP must include ${directive}`);
  }
  assert.doesNotMatch(policy, /unsafe-eval/u, "production CSP must not enable eval");
  assert.doesNotMatch(policy, /fonts\.googleapis\.com|fonts\.gstatic\.com/u, "self-hosted fonts must not require Google font origins");

  const layout = readFileSync("app/layout.tsx", "utf8");
  assert.match(layout, /from ["']next\/font\/google["']/u);
  assert.match(layout, /DM_Mono/u);
  assert.match(layout, /Space_Grotesk/u);
  assert.doesNotMatch(layout, /fonts\.googleapis\.com|fonts\.gstatic\.com/u);
  assert.match(readme, /Content Security Policy/);
  assert.match(readme, /does not enable dynamic `eval` execution/);

  const existingSecurityHeaders = new Set(
    vercel.headers?.flatMap((rule) => rule.headers?.map((header) => header.key?.toLowerCase()) ?? []) ?? []
  );
  for (const header of [
    "x-content-type-options",
    "x-frame-options",
    "referrer-policy",
    "permissions-policy",
    "strict-transport-security",
  ]) {
    assert.ok(existingSecurityHeaders.has(header), `existing Vercel security header ${header} must be retained`);
  }
});


test("R4 application source does not add known unsafe HTML or dynamic-code execution sinks", () => {
  const sourceFiles = findApplicationSourceFiles("app");
  const unsafePatterns = [
    ["dangerouslySetInnerHTML", /dangerouslySetInnerHTML/u],
    ["document.write", /document\.write\s*\(/u],
    ["eval", /\beval\s*\(/u],
    ["new Function", /new\s+Function\s*\(/u],
  ] as const;

  for (const path of sourceFiles) {
    const source = readFileSync(path, "utf8");
    for (const [label, pattern] of unsafePatterns) {
      assert.doesNotMatch(source, pattern, `${path} must not use ${label}`);
    }
  }
});

function findApplicationSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return findApplicationSourceFiles(fullPath);
    return entry.isFile() && /\.tsx?$/u.test(entry.name) ? [fullPath] : [];
  });
}
