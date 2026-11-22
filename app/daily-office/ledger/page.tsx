import type { Metadata } from "next";
import Link from "next/link";
import DepartmentHeader from "../../components/department-header";
import DepartmentFooter from "../../components/department-footer";
import { buildInstitutionalMemory } from "../institutional-memory";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Institutional Memory Ledger",
  description: "A chronological register of recent fictional Trenches Desk dispatches, connected by date, reference and deliberately unresolved institutional paperwork.",
  alternates: { canonical: "/daily-office/ledger" },
  robots: { index: false, follow: true },
};

export default function InstitutionalMemoryLedgerPage() {
  const issueDate = new Date().toISOString().slice(0, 10);
  const records = buildInstitutionalMemory(issueDate, 14).slice().reverse();

  return (
    <main className="audit-page institutional-memory-page" id="main-content">
      <DepartmentHeader
        activeSection="daily"
        statusMessage="INSTITUTIONAL MEMORY / FICTIONAL CHRONOLOGY"
        ctaHref="/daily-office"
        ctaLabel="TODAY'S FILE"
      />

      <div className="institutional-memory-shell shell" id="content-start" tabIndex={-1}>
        <header className="institutional-memory-intro">
          <div className="audit-intro__meta">
            <span>INSTITUTIONAL MEMORY / 14 UTC ENTRIES</span>
            <span>REGISTER UPDATED / {issueDate}</span>
          </div>
          <p className="eyebrow">THE TRENCHES DESK / HISTORICAL REGISTER</p>
          <h1>THE MEMORY<br /><span>LEDGER.</span></h1>
          <p className="audit-intro__lead">
            Fourteen consecutive fictional dispatches, preserved as a connected paper trail. Each file inherits the previous disposition, forwards its unfinished paperwork and leaves a reference for the next office.
          </p>
          <div className="institutional-memory-notice">
            <span>RECORD POLICY / FICTIONAL CONTINUITY</span>
            <strong>THE REGISTER IS GENERATED FROM UTC DATES.</strong>
            <small>NO REAL INCIDENTS, ACCOUNTS, WALLETS OR MARKET EVENTS ARE FOLLOWED. NO VISITOR DATA IS STORED.</small>
          </div>
        </header>

        <section className="institutional-memory-list" aria-label="Fourteen most recent fictional daily records">
          {records.map((record, index) => (
            <article className="institutional-memory-record" key={record.issueDate}>
              <div className="institutional-memory-record__top">
                <span>REGISTER / {String(14 - index).padStart(2, "0")} · {record.reference}</span>
                <time dateTime={record.issueDate}>{record.issueDate} / UTC</time>
              </div>
              <p className="institutional-memory-record__theme">{record.caseTheme}</p>
              <h2><Link href={record.href}>{record.headline}</Link></h2>
              <p className="institutional-memory-record__bulletin">{record.bulletin}</p>
              <div className="institutional-memory-record__handoff">
                <span>INSTITUTIONAL HANDOFF</span>
                <p>{record.handoffNote}</p>
              </div>
              <div className="institutional-memory-record__bottom">
                <div>
                  <span>FILED UNDER</span>
                  <strong>{record.assignedDepartment}</strong>
                </div>
                <div>
                  <span>DISPOSITION</span>
                  <strong>{record.disposition}</strong>
                </div>
              </div>
              <div className="institutional-memory-record__links">
                <Link href={record.href}>OPEN ORIGINAL FILE ↗</Link>
                {record.predecessor ? (
                  <Link href={record.predecessor.href}>PRECEDING FILE / {record.predecessor.reference} ↗</Link>
                ) : (
                  <span>FIRST ENTRY IN THIS WINDOW</span>
                )}
                {record.successor ? (
                  <Link href={record.successor.href}>NEXT FILE / {record.successor.reference} ↗</Link>
                ) : (
                  <span>CURRENT REGISTER ENDPOINT</span>
                )}
              </div>
            </article>
          ))}
        </section>

        <div className="institutional-memory-return">
          <Link className="button button--primary" href="/daily-office">RETURN TO TODAY'S TRENCHES DESK ↗</Link>
          <Link className="button button--quiet" href="/daily-office/atlas">OPEN THE CROSS-DIVISION CASE ATLAS ↗</Link>
          <Link className="button button--quiet" href="/cope-index">OPEN THE GLOBAL COPE INDEX ↗</Link>
        </div>
      </div>

      <DepartmentFooter message={["THE REGISTER HAS BEEN RECONCILED.", "THE SAME QUESTIONS REMAIN FILED UNDER A NEW DATE."]} />
    </main>
  );
}
