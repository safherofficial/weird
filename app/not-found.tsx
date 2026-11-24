import Link from "next/link";
import DepartmentFooter from "./components/department-footer";
import DepartmentHeader from "./components/department-header";
import SectionLabel from "./components/section-label";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <DepartmentHeader
        statusMessage="PUBLIC RECORD NOT LOCATED / 404"
        ctaHref="/audit"
        ctaLabel="START DYOR AUDIT 2.0"
      />

      <main id="main-content" className={styles.page}>
        <section
          className={styles.file + " shell"}
          id="content-start"
          aria-labelledby="not-found-title"
          tabIndex={-1}
        >
          <div className={styles.meta}>
            <SectionLabel>ROUTING / ARCHIVE EXCEPTION</SectionLabel>
            <span>DEPARTMENT FORM / DD-404</span>
          </div>

          <div className={styles.layout}>
            <div className={styles.signal} aria-label="Error 404">
              <span aria-hidden="true">404</span>
              <small>RECORD STATUS / NOT LOCATED</small>
            </div>

            <div className={styles.copy}>
              <p className={styles.eyebrow}>THE DEPARTMENT HAS CHECKED ITS RECORDS.</p>
              <h1 id="not-found-title">
                THIS PAGE HAS
                <br />
                <em>LEFT THE TRENCHES.</em>
              </h1>
              <p className={styles.description}>
                We searched the public register, checked the last known contract
                address and asked three KOLs. Nobody can verify this route.
              </p>

              <div className={styles.actions}>
                <Link className="button button--primary" href="/">
                  RETURN TO HEADQUARTERS <span aria-hidden="true">↗</span>
                </Link>
                <Link className="button button--quiet" href="/audit">
                  RUN THE DYOR AUDIT <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <p className={styles.disclaimer}>
                NO LIVE INDEXER. NO REAL WALLET SEARCH. JUST A MISSING PAGE.
              </p>
            </div>
          </div>

          <div className={styles.bottom}>
            <span>FILE DD-404 / STATUS OPEN</span>
            <Link href="/#departments">BROWSE ALL DIVISIONS ↗</Link>
          </div>
        </section>
      </main>

      <DepartmentFooter
        message={[
          "THIS ROUTE COULD NOT BE RECOVERED.",
          "YOUR EXIT TO HQ REMAINS AVAILABLE.",
        ]}
      />
    </>
  );
}
