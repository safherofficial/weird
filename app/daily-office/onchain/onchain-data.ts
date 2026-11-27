export type OnchainDiscovery = "NEW DEX PROFILE" | "COMMUNITY TAKEOVER";

export type OnchainObservation = {
  name: string;
  symbol: string;
  address: string;
  pairAddress: string | null;
  dexId: string;
  pairUrl: string;
  profileUrl: string | null;
  discoveryType: OnchainDiscovery;
  claimDate: string | null;
  priceUsd: number | null;
  liquidityUsd: number | null;
  volume24hUsd: number | null;
  marketCapUsd: number | null;
  fdvUsd: number | null;
  priceChange1hPct: number | null;
  priceChange24hPct: number | null;
  buys24h: number | null;
  sells24h: number | null;
  totalTransactions24h: number | null;
  buySharePct: number | null;
  volumeLiquidityRatio: number | null;
  pairCreatedAt: string | null;
  ageHours: number | null;
};

export type OnchainReportSection = {
  heading: string;
  paragraphs: string[];
};

export type OnchainReport = {
  schemaVersion: 1;
  issueDate: string;
  issuedAt: string;
  timezone: "Europe/Rome";
  title: string;
  standfirst: string;
  classification: string;
  sourceSummary: string;
  counts: {
    discoveryProfiles: number;
    solanaProfiles: number;
    solanaTakeovers: number;
    profilesChecked: number;
    pairsReturned: number;
    candidatePairs: number;
    qualifyingCandidates: number;
    freshQualifyingCandidates: number;
  };
  featuredToken: OnchainObservation | null;
  observations: OnchainObservation[];
  sections: OnchainReportSection[];
  methodology: string[];
  sources: { label: string; url: string }[];
};

export type OnchainReportIndexEntry = {
  issueDate: string;
  path: string;
  title: string;
  standfirst: string;
  classification: string;
  featuredSymbol: string | null;
  featuredTokenAddress: string | null;
  pairUrl: string | null;
  liquidityUsd: number | null;
  volume24hUsd: number | null;
  issuedAt: string;
};

export type OnchainReportIndex = {
  schemaVersion: 1;
  updatedAt: string;
  reports: OnchainReportIndexEntry[];
};

const CONTENT_REF =
  process.env.VERCEL_ENV === "preview" && process.env.VERCEL_GIT_COMMIT_REF
    ? encodeURIComponent(process.env.VERCEL_GIT_COMMIT_REF)
    : "main";
const RAW_BASE = "https://raw.githubusercontent.com/safherofficial/weird/" + CONTENT_REF + "/content/onchain";

export class OnchainDataUnavailableError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "OnchainDataUnavailableError";
  }
}

async function fetchPublicJson<T>(url: string, fresh = false): Promise<T | null> {
  let response: Response;
  try {
    const requestInit = (fresh
      ? { headers: { accept: "application/json" }, cache: "no-store" }
      : { headers: { accept: "application/json" }, next: { revalidate: 300 } }) as RequestInit;
    response = await fetch(url, requestInit);
  } catch (error) {
    throw new OnchainDataUnavailableError("The public Onchain archive could not be reached.", { cause: error });
  }

  if (response.status === 404) return null;
  if (!response.ok) {
    throw new OnchainDataUnavailableError("The public Onchain archive returned HTTP " + response.status + ".");
  }

  try {
    return await response.json() as T;
  } catch (error) {
    throw new OnchainDataUnavailableError("The public Onchain archive returned invalid JSON.", { cause: error });
  }
}

export async function getOnchainReportIndex(fresh = true): Promise<OnchainReportIndex | null> {
  const index = await fetchPublicJson<OnchainReportIndex>(RAW_BASE + "/index.json", fresh);
  if (index === null) return null;
  if (index.schemaVersion !== 1 || !Array.isArray(index.reports)) {
    throw new OnchainDataUnavailableError("The public Onchain archive index failed schema validation.");
  }
  return index;
}

export async function getOnchainReport(date: string): Promise<OnchainReport | null> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const report = await fetchPublicJson<OnchainReport>(RAW_BASE + "/" + date + ".json");
  if (report === null) return null;
  if (report.schemaVersion !== 1 || report.issueDate !== date || !Array.isArray(report.sections)) {
    throw new OnchainDataUnavailableError("The requested Onchain report failed schema validation.");
  }
  return report;
}

export function formatOnchainMoney(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "N/D";
  return "$" + value.toLocaleString("en-US", { maximumFractionDigits: value < 1 ? 6 : 0 });
}

export function formatOnchainPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return "N/D";
  return (value > 0 ? "+" : "") + value.toFixed(2) + "%";
}

export function truncateAddress(value: string): string {
  return value.length > 18 ? value.slice(0, 8) + "…" + value.slice(-7) : value;
}
