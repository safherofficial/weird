"use client";

import { useEffect } from "react";
import Link from "next/link";
import DepartmentHeader from "./components/department-header";
import DepartmentFooter from "./components/department-footer";
import SectionLabel from "./components/section-label";
import styles from "./not-found.module.css";

type DepartmentErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function DepartmentError({ error, reset }: DepartmentErrorProps) {
  useEffect(() => {
    console.error("THE DYOR DEPARTMENT / PAGE ERROR", error);
  }, [error]);

  return (
    <>
      <DepartmentHeader
        statusMessage="SYSTEM INTERRUPTION / ERROR FILE OPEN"
        ctaHref="/"
        ctaLabel="RETURN TO HQ"
      />

      <main id="main-content" className={styles.page}>
        <section
          className={styles.file + " shell"}
          id="content-start"
          aria-labelledby="department-error-title"
          tabIndex={-1}
        >
          <div className={styles.meta}>
            <SectionLabel>OPERATIONS / INCIDENT REPORT</SectionLabel>
            <span>DEPARTMENT FORM / ERR-500</span>
          </div>

          <div className={styles.layout}>
            <div className={styles.signal} role="img" aria-label="Error 500: page interrupted">
              <span aria-hidden="true">500</span>
              <small>RECORD STATUS / INTERRUPTED</small>
            </div>

            <div className={styles.copy}>
              <p className={styles.eyebrow}>THE DEPARTMENT HAS ENCOUNTERED AN INTERRUPTION.</p>
              <h1 id="department-error-title">
                THIS FILE COULD NOT BE OPENED.
                <br />
                <em>THE CASE IS UNDER REVIEW.</em>
              </h1>
              <p className={styles.description}>
                Something interrupted this page. Retry the request or return to headquarters.
                No case answers or local Passport records are displayed in this notice.
              </p>

              {error.digest && (
                <p className={styles.disclaimer}>
                  INCIDENT REFERENCE / {error.digest}
                </p>
              )}

              <div className={styles.actions}>
                <button className="button button--primary" type="button" onClick={reset}>
                  RETRY THIS FILE <span aria-hidden="true">↻</span>
                </button>
                <Link className="button button--quiet" href="/">
                  RETURN TO HEADQUARTERS <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <span>FILE ERR-500 / STATUS OPEN</span>
            <Link href="/#departments">BROWSE ALL DIVISIONS ↗</Link>
          </div>
        </section>
      </main>

      <DepartmentFooter
        message={[
          "THE INTERRUPTION HAS BEEN FILED.",
          "YOUR WAY BACK TO HQ REMAINS AVAILABLE.",
        ]}
      />
    </>
  );
}
