"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DepartmentNarrative } from "../lib/department-narrative";
import type { DepartmentSection } from "../divisions";

type DepartmentCaseChainProps = {
  currentDepartment: DepartmentSection;
};

export default function DepartmentCaseChain({ currentDepartment }: DepartmentCaseChainProps) {
  const [narrative, setNarrative] = useState<DepartmentNarrative | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setNarrative(null);
    setFailed(false);

    fetch("/api/department-case?department=" + encodeURIComponent(currentDepartment), {
      cache: "no-store",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("The Department case file is unavailable.");
        return response.json() as Promise<DepartmentNarrative>;
      })
      .then((result) => setNarrative(result))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setFailed(true);
      });

    return () => controller.abort();
  }, [currentDepartment]);

  if (failed) {
    return (
      <div className="department-case-chain department-case-chain--error" role="status">
        <span>DEPARTMENTAL CASE THREAD / TEMPORARILY UNAVAILABLE</span>
        <p>The daily cross-office file could not be retrieved. Existing department routes remain available.</p>
      </div>
    );
  }

  if (!narrative) {
    return (
      <div className="department-case-chain department-case-chain--loading" role="status" aria-live="polite">
        <span>DEPARTMENTAL CASE THREAD / CHECKING TODAY'S FILE</span>
        <p>Verifying the shared case reference and its previous Department records…</p>
      </div>
    );
  }

  return (
    <section className="department-case-chain" aria-labelledby="department-case-chain-title">
      <div className="department-case-chain__header">
        <div>
          <span>SHARED CASE THREAD / {narrative.reference} / UTC {narrative.issueDate}</span>
          <h3 id="department-case-chain-title">{narrative.caseTheme}</h3>
          <strong>{narrative.headline}</strong>
        </div>
        <div className="department-case-chain__current-office">
          <span>CURRENT OFFICE</span>
          <strong>{narrative.currentOffice.number} / {narrative.currentOffice.title}</strong>
        </div>
      </div>

      <p className="department-case-chain__narrative">{narrative.narrative}</p>

      <div className="department-case-chain__route" aria-label="Three-office case handoff">
        {narrative.offices.map((office, index) => (
          <article className={"department-case-chain__step" + (office.isCurrent ? " is-current" : "")} key={office.section}>
            <span>HANDOFF / 0{index + 1}</span>
            <strong>{office.title}</strong>
            <p>{office.responsibility}</p>
            {office.isCurrent ? (
              <small>YOU ARE HERE / CURRENT FILE</small>
            ) : (
              <Link href={office.href ?? "/"}>OPEN OFFICE ↗</Link>
            )}
          </article>
        ))}
      </div>

      <div className="department-case-chain__precedents">
        <article>
          <span>PRECEDENT FILE / {narrative.precedent.accession}</span>
          <strong>{narrative.precedent.title}</strong>
          <p>{narrative.precedent.summary}</p>
          <Link href={narrative.precedent.href}>READ PREVIOUS CASE ↗</Link>
        </article>
        <article>
          <span>RELATED RELIC / {narrative.relic.accession}</span>
          <strong>{narrative.relic.title}</strong>
          <p>{narrative.relic.description}</p>
          <Link href={narrative.relic.href}>OPEN MUSEUM RECORD ↗</Link>
        </article>
      </div>

      <p className="department-case-chain__notice">
        FICTIONAL CASE CONTINUITY / NO REAL PROJECT, WALLET, PERSON OR MARKET EVENT IS MONITORED.
      </p>
    </section>
  );
}
