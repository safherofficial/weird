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
  liquidityUsd: number;
  volume24hUsd: number;
  marketCapUsd: number | null;
  fdvUsd: number | null;
  priceChange1hPct: number | null;
  priceChange24hPct: number | null;
  buys24h: number;
  sells24h: number;
  totalTransactions24h: number;
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

const RAW_BASE = "https://raw.githubusercontent.com/safherofficial/weird/main/content/onchain";

async function fetchPublicJson<T>(url: string, fresh = false): Promise<T | null> {
  try {
    const response = await fetch(url, fresh
      ? { headers: { accept: "application/json" }, cache: "no-store" }
      : { headers: { accept: "application/json" }, next: { revalidate: 300 } },
    );
    if (!response.ok) return null;
    return await response.json() as T;
  } catch {
    return null;
  }
}

export async function getOnchainReportIndex(): Promise<OnchainReportIndex | null> {
  const index = await fetchPublicJson<OnchainReportIndex>(RAW_BASE + "/index.json", true);
  if (!index || index.schemaVersion !== 1 || !Array.isArray(index.reports)) return null;
  return index;
}

export async function getOnchainReport(date: string): Promise<OnchainReport | null> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const report = await fetchPublicJson<OnchainReport>(RAW_BASE + "/" + date + ".json");
  if (!report || report.schemaVersion !== 1 || report.issueDate !== date || !Array.isArray(report.sections)) return null;
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
