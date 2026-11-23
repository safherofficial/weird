import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DepartmentHeader from "../../../components/department-header";
import DepartmentFooter from "../../../components/department-footer";
import DailyOfficeClient from "../../daily-client";
import DailyOfficeRelatedLinks from "../../daily-office-related-links";
import { buildDailyOfficeDispatch } from "../../daily-engine";
import { isValidInstitutionalMemoryDate, shiftInstitutionalMemoryDate } from "../../institutional-memory";

type InstitutionalMemoryRecordPageProps = {
  params: Promise<{ date: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: InstitutionalMemoryRecordPageProps): Promise<Metadata> {
  const { date } = await params;
  if (!isValidInstitutionalMemoryDate(date)) {
    return {
      title: "Institutional Record Not Found",
      robots: { index: false, follow: false },
    };
  }

  const dispatch = buildDailyOfficeDispatch(date);
  const route = "/daily-office/archive/" + date;
  return {
    title: dispatch.headline + " | INSTITUTIONAL MEMORY",
    description: dispatch.bulletin,
    alternates: { canonical: route },
    robots: { index: false, follow: true },
    openGraph: {
      title: dispatch.headline,
      description: dispatch.bulletin,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: dispatch.headline,
      description: dispatch.bulletin,
    },
  };
}

export default async function InstitutionalMemoryRecordPage({ params }: InstitutionalMemoryRecordPageProps) {
  const { date } = await params;
  if (!isValidInstitutionalMemoryDate(date)) notFound();

  const dispatch = buildDailyOfficeDispatch(date);
  const route = "/daily-office/archive/" + date;
  const today = new Date().toISOString().slice(0, 10);
  const previousDate = shiftInstitutionalMemoryDate(date, -1);
  const nextDate = shiftInstitutionalMemoryDate(date, 1);
  const hasNext = nextDate <= today;

  return (
    <main className="audit-page institutional-memory-record-page" id="main-content">
      <DepartmentHeader
        activeSection="daily"
        statusMessage={"INSTITUTIONAL MEMORY / " + dispatch.reference}
        ctaHref="/daily-office/ledger"
        ctaLabel="BACK TO MEMORY LEDGER"
      />

      <div className="institutional-memory-shell shell" id="content-start" tabIndex={-1}>
        <div className="institutional-memory-record-nav">
          <Link href="/daily-office/ledger">← INSTITUTIONAL MEMORY LEDGER</Link>
          <span>{dispatch.issueDate} / UTC · {dispatch.reference}</span>
        </div>
        <DailyOfficeClient dispatch={dispatch} pagePath={route} headlineLevel="h1" />
        <DailyOfficeRelatedLinks dispatch={dispatch} />
        <nav className="institutional-memory-adjacent" aria-label="Adjacent daily records">
          <Link href={"/daily-office/archive/" + previousDate}>
            <span>PRECEDING UTC RECORD</span>
            <strong>{previousDate}</strong>
          </Link>
          {hasNext ? (
            <Link href={"/daily-office/archive/" + nextDate}>
              <span>NEXT UTC RECORD</span>
              <strong>{nextDate}</strong>
            </Link>
          ) : (
            <Link href="/daily-office">CURRENT TRENCHES DESK</Link>
          )}
        </nav>
        <p className="institutional-memory-disclaimer">
          This dated record is regenerated deterministically from its UTC issue date. It is fictional satire, not an account of real people, projects, wallets, tokens, transactions or market events.
        </p>
      </div>

      <DepartmentFooter message={["THIS FILE REMAINS IN THE REGISTER.", "ITS UNFINISHED PAPERWORK HAS BEEN FORWARDED."]} />
    </main>
  );
}
