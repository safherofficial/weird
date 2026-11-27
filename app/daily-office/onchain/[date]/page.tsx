import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../../components/department-header";
import DepartmentFooter from "../../../../components/department-footer";
import OnchainReportView from "../onchain-report-view";
import { getOnchainReport } from "../onchain-data";

type OnchainIssuePageProps = {
  params: Promise<{ date: string }>;
};

export async function generateMetadata({ params }: OnchainIssuePageProps): Promise<Metadata> {
  const { date } = await params;
  const report = await getOnchainReport(date);
  if (!report) {
    return {
      title: "Onchain report not found | THE DYOR DEPARTMENT",
      robots: { index: false, follow: true },
    };
  }
  return {
    title: report.title + " | Onchain Intelligence",
    description: report.standfirst,
    alternates: { canonical: "/daily-office/onchain/" + date },
    openGraph: {
      title: report.title + " | THE DYOR DEPARTMENT",
      description: report.standfirst,
    },
    twitter: {
      card: "summary",
      title: report.title + " | THE DYOR DEPARTMENT",
      description: report.standfirst,
    },
  };
}

export default async function OnchainIssuePage({ params }: OnchainIssuePageProps) {
  const { date } = await params;
  const report = await getOnchainReport(date);
  if (!report) notFound();

  return (
    <main className="audit-page onchain-intelligence-page" id="main-content">
      <DepartmentHeader
        activeSection="daily"
        statusMessage={"ONCHAIN INTELLIGENCE / ISSUE " + date}
        ctaHref="/daily-office/onchain"
        ctaLabel="LATEST ONCHAIN FILE"
      />
      <div className="onchain-page-shell shell" id="content-start" tabIndex={-1}>
        <div className="onchain-issue-nav">
          <Link href="/daily-office/onchain/archive">← ALL DAILY FILES</Link>
          <span>ISSUE / {date} / SOLANA DEX ACTIVITY</span>
        </div>
        <OnchainReportView report={report} />
      </div>
      <DepartmentFooter message={["THIS FILE IS BASED ON A RECORDED PUBLIC-DATA SNAPSHOT.", "NO WALLET OWNERSHIP OR INTENT HAS BEEN INFERRED."]} />
    </main>
  );
}
