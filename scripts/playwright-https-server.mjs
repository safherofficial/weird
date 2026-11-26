import { spawn, spawnSync } from "node:child_process";
import { request as httpRequest } from "node:http";
import { createServer } from "node:https";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const root = process.cwd();
const nextPort = Number(process.env.PLAYWRIGHT_UPSTREAM_PORT ?? 3100);
const proxyPort = Number(process.env.PLAYWRIGHT_HTTPS_PORT ?? 3443);
const certificateDirectory = mkdtempSync(join(tmpdir(), "weird-playwright-"));
const certificatePath = join(certificateDirectory, "localhost.crt");
const privateKeyPath = join(certificateDirectory, "localhost.key");

const certificate = spawnSync(
  "openssl",
  [
    "req",
    "-x509",
    "-newkey",
    "rsa:2048",
    "-nodes",
    "-keyout",
    privateKeyPath,
    "-out",
    certificatePath,
    "-days",
    "1",
    "-subj",
    "/CN=localhost",
    "-addext",
    "subjectAltName=DNS:localhost,IP:127.0.0.1",
  ],
  { stdio: "ignore" },
);

if (certificate.status !== 0) {
  rmSync(certificateDirectory, { recursive: true, force: true });
  throw new Error("Unable to create the temporary HTTPS certificate for Playwright.");
}

const next = spawn(
  process.execPath,
  [resolve(root, "node_modules/next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", String(nextPort)],
  { cwd: root, env: process.env, stdio: "inherit" },
);

let closing = false;

const proxy = createServer(
  {
    key: readFileSync(privateKeyPath),
    cert: readFileSync(certificatePath),
  },
  (request, response) => {
    const upstream = httpRequest(
      {
        hostname: "127.0.0.1",
        port: nextPort,
        method: request.method,
        path: request.url,
        headers: {
          ...request.headers,
          host: "127.0.0.1:" + nextPort,
          "x-forwarded-host": request.headers.host ?? ("localhost:" + proxyPort),
          "x-forwarded-proto": "https",
        },
      },
      (upstreamResponse) => {
        response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers);
        upstreamResponse.pipe(response);
      },
    );

    upstream.on("error", (error) => {
      if (!response.headersSent) response.writeHead(502, { "content-type": "text/plain" });
      response.end("Playwright HTTPS proxy upstream error: " + error.message);
    });

    request.pipe(upstream);
  },
);

function shutdown() {
  if (closing) return;
  closing = true;
  proxy.close();
  next.kill("SIGTERM");
  rmSync(certificateDirectory, { recursive: true, force: true });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
next.on("exit", (code) => {
  if (!closing) {
    shutdown();
    process.exitCode = code ?? 1;
  }
});

async function waitForNext() {
  const started = Date.now();
  while (Date.now() - started < 120_000) {
    if (next.exitCode !== null) {
      throw new Error("Next.js exited before becoming ready (code " + next.exitCode + ").");
    }

    try {
      const result = await fetch("http://127.0.0.1:" + nextPort + "/", {
        signal: AbortSignal.timeout(1500),
      });
      if (result.ok) return;
    } catch {
      // The production server can take a moment to bind after startup.
    }

    await new Promise((resolvePromise) => setTimeout(resolvePromise, 500));
  }

  throw new Error("Next.js did not become ready within 120 seconds.");
}

try {
  await waitForNext();
  await new Promise((resolveListen, rejectListen) => {
    proxy.once("error", rejectListen);
    proxy.listen(proxyPort, "127.0.0.1", resolveListen);
  });
  console.log("Playwright HTTPS proxy ready at https://localhost:" + proxyPort);
} catch (error) {
  shutdown();
  throw error;
}
