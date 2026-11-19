import Link from "next/link";
import DepartmentHeader from "./components/department-header";
import DepartmentFooter from "./components/department-footer";
import SectionLabel from "./components/section-label";

const conditions = [
  { label: "GLOBAL COPE INDEX", value: "ELEVATED", tone: "green" },
  { label: "EXIT LIQUIDITY LEVEL", value: "CRITICAL", tone: "red" },
  { label: "DEV COMMUNICATION", value: "LAST SEEN: SOON", tone: "muted" },
  { label: "ROADMAP STATUS", value: "STILL COOKING", tone: "green" },
  { label: "FINANCIAL DIGNITY", value: "NOT DETECTED", tone: "red" },
];

const departments = [
  {
    number: "01",
    title: "THE DYOR AUDIT",
    description: "Submit your research process for a completely unnecessary investigation.",
    status: "NOW ACCEPTING CASES",
    href: "/audit",
    featured: true,
  },
  {
    number: "02",
    title: "THE BAGHOLDER SIMULATOR",
    description: "Seven rounds. Four questionable decisions. One entirely fictional asset. How heavy can an imaginary bag get?",
    status: "NOW ACCEPTING BAGHOLDERS",
    href: "/simulator",
    featured: true,
  },
  {
    number: "03",
    title: "UTILITY INSPECTOR",
    description: "Seven questions. Three departmental scores. Investigating revolutionary solutions in search of an actual problem.",
    status: "NOW ACCEPTING CLAIMS",
    href: "/utility-inspector",
    featured: true,
  },
  {
    number: "04",
    title: "ROADMAP GENERATOR",
    description: "Six questions. Seven fictional phases. Generate a roadmap with ambitious milestones and deadlines that are always just around the corner.",
    status: "NOW ACCEPTING MILESTONES",
    href: "/roadmap-generator",
    featured: true,
  },
  {
    number: "05",
    title: "WHITEPAPER FACTORY",
    description: "Seven questions. Nine sections. Generate a technically impressive document for a project that may or may not exist.",
    status: "NOW ACCEPTING ABSTRACTS",
    href: "/whitepaper-factory",
    featured: true,
  },
  {
    number: "06",
    title: "THE BAGHOLDER MUSEUM",
    description: "Twelve preserved artifacts from the age of questionable conviction. Please do not touch the liquidity puddle.",
    status: "COLLECTION OPEN",
    href: "/museum",
    featured: true,
  },
  {
    number: "07",
    title: "THE 99% CLUB",
    description: "Five questions. Three fictional indices. A membership card with absolutely no practical value.",
    status: "APPLICATIONS OPEN",
    href: "/club",
    featured: true,
  },
  {
    number: "08",
    title: "THE GLOBAL COPE INDEX",
    description: "A daily synthetic reading of conviction pressure, narrative fog, Telegram reliance and the power of soon.",
    status: "DAILY INDEX / SYNTHETIC",
    href: "/cope-index",
    featured: true,
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <DepartmentHeader activeSection="home" statusMessage="ALL SYSTEMS NOMINALLY USELESS" />



      <section className="hero shell" id="content-start" tabIndex={-1}>
        <div className="hero__meta">
          <SectionLabel>OFFICIAL DEPARTMENT PORTAL</SectionLabel>
          <span className="micro-code">REF. DYOR-001 / EST. UNFORTUNATELY</span>
        </div>

        <div className="hero__grid">
          <div className="hero__copy">
            <p className="eyebrow">A PUBLIC SERVICE ANNOUNCEMENT FOR THE CRYPTO-ADJACENT</p>
            <h1>YOUR RESEARCH<br />WAS <span>IMPECCABLE.</span><br />YOUR ENTRY<br />WAS NOT.</h1>
            <p className="hero__description">
              You checked the team. Studied the tokenomics. Joined the Telegram.
              Read the whitepaper. And somehow, you are still holding the bag.
            </p>
            <div className="hero__actions">
              <Link className="button button--primary" href="/audit">SUBMIT YOUR DYOR AUDIT <span>↗</span></Link>
              <a className="button button--quiet" href="#departments">INSPECT THE DEPARTMENT <span>↓</span></a>
            </div>
            <p className="hero__footnote"><span className="asterisk">*</span> NO TOKEN. NO UTILITY. NO REFUNDS FOR EMOTIONAL DAMAGE.</p>
          </div>

          <aside className="case-panel" aria-label="Department case file">
            <div className="case-panel__head">
              <span>DEPARTMENTAL RECORD</span>
              <span className="case-panel__stamp">FILED</span>
            </div>
            <div className="case-panel__id">CASE No. 000001—YOU</div>
            <div className="case-panel__illustration" aria-hidden="true">
              <div className="chart-grid" />
              <svg viewBox="0 0 420 190" role="img" aria-label="Illustrative chart showing a sharp decline">
                <defs>
                  <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#b6ff65" stopOpacity=".18" />
                    <stop offset="100%" stopColor="#b6ff65" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 46 L36 39 L64 49 L92 31 L121 44 L150 55 L177 50 L205 75 L233 68 L260 95 L285 89 L310 116 L335 107 L360 145 L389 140 L420 174 L420 190 L0 190 Z" fill="url(#area)" />
                <path d="M0 46 L36 39 L64 49 L92 31 L121 44 L150 55 L177 50 L205 75 L233 68 L260 95 L285 89 L310 116 L335 107 L360 145 L389 140 L420 174" fill="none" stroke="#b6ff65" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                <path d="M0 158 H420" stroke="#343b34" strokeDasharray="3 6" />
              </svg>
              <span className="chart-caption">ILLUSTRATIVE PERFORMANCE / NOT YOUR ACTUAL PORTFOLIO</span>
              <span className="chart-loss">-97.4% <small>totally hypothetical</small></span>
            </div>
            <div className="case-panel__rows">
              <div><span>RESEARCH EFFORT</span><strong className="green-text">EXCESSIVE</strong></div>
              <div><span>ENTRY TIMING</span><strong className="red-text">UNFORTUNATE</strong></div>
              <div><span>EXIT STRATEGY</span><strong>NOT DETECTED</strong></div>
              <div><span>CONVICTION</span><strong>UNREASONABLE</strong></div>
            </div>
            <div className="case-panel__footer"><span>THE MARKET HAS BEEN NOTIFIED.</span><span>● OPEN CASE</span></div>
          </aside>
        </div>
        <div className="hero__bottomline"><span>FIG. 01 — A FAMILIAR PATTERN</span><span>ALL FIGURES SHOWN ARE SATIRICAL</span></div>
      </section>

      <section className="ticker" aria-label="Department ticker">
        <div className="ticker__track">
          {Array.from({ length: 2 }).map((_, index) => (
            <span className="ticker__group" key={index}>
              <b>WE DID THE RESEARCH</b><i>✳</i><b>WE BOUGHT THE TOP</b><i>✳</i><b>WE TRUSTED THE DEV</b><i>✳</i><b>WE ARE STILL EARLY</b><i>✳</i><b>WE ARE NOT FINANCIAL ADVISORS</b><i>✳</i>
            </span>
          ))}
        </div>
      </section>

      <section className="conditions shell">
        <div className="conditions__heading">
          <SectionLabel>LIVE DEPARTMENTAL CONDITIONS</SectionLabel>
          <span className="micro-code">UPDATE FREQUENCY: EMOTIONALLY UNSTABLE</span>
        </div>
        <div className="conditions__grid">
          {conditions.map((item, index) => (
            <div className="condition" key={item.label}>
              <span className="condition__index">0{index + 1}</span>
              <span className="condition__label">{item.label}</span>
              <strong className={"condition__value condition__value--" + item.tone}>{item.value}</strong>
              <span className="condition__foot">FICTIONAL DEPARTMENTAL METRIC</span>
            </div>
          ))}
        </div>
        <p className="conditions__disclaimer">These are satirical status labels, not live market data, forecasts or investment indicators.</p>
      </section>

      <section className="departments shell" id="departments">
        <div className="section-heading">
          <div>
            <SectionLabel>THE OFFICE OF QUESTIONABLE DECISIONS</SectionLabel>
            <h2>OUR DEPARTMENTS.<br /><span>YOUR PROBLEM.</span></h2>
          </div>
          <p>Sixteen committees. Zero solutions.<br />Currently, all eight departments are accepting cases.</p>
        </div>
        <div className="department-grid">
          {departments.map((item) => {
            const card = (
              <>
                <div className="department-card__top">
                  <span>DEPT. {item.number}</span>
                  <span>{item.featured ? "● AVAILABLE" : "○ PENDING"}</span>
                </div>
                <div className="department-card__icon" aria-hidden="true">
                  {item.number === "01" ? "⌁" : item.number === "02" ? "↘" : item.number === "03" ? "⌕" : "↗"}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="department-card__bottom">
                  <span>{item.status}</span>
                  <b aria-hidden="true">{item.featured ? "↗" : "—"}</b>
                </div>
              </>
            );

            return item.featured ? (
              <Link className="department-card department-card--featured" href={item.href} key={item.number}>
                {card}
              </Link>
            ) : (
              <article
                className="department-card department-card--pending"
                key={item.number}
                aria-label={item.title + ", coming soon"}
              >
                {card}
              </article>
            );
          })}
        </div>
      </section>

      <section className="manifesto" id="manifesto">
        <div className="manifesto__inner shell">
          <SectionLabel>THE DEPARTMENTAL POSITION</SectionLabel>
          <p className="manifesto__statement">WE ARE NOT HERE TO JUDGE YOU.<br /><span>WE ARE HERE BECAUSE WE ARE YOU.</span></p>
          <div className="manifesto__bottom">
            <p>We read the whitepapers. We checked the wallets. We followed the smart money. We zoomed out. We zoomed in. We found conviction in a Telegram message with seventeen rocket emojis.</p>
            <p>And sometimes, despite all that research, the market did what the market does.</p>
          </div>
        </div>
      </section>

      <section className="closing shell">
        <div className="closing__kicker">YOUR FILE IS STILL OPEN.</div>
        <h2>AT LEAST<br /><span>WE'RE EARLY.</span></h2>
        <p>On what? We have not established that yet.</p>
        <Link className="button button--primary" href="/audit">GET YOUR OFFICIAL DYOR REPORT <span>↗</span></Link>
      </section>

      <DepartmentFooter message={["AN INSTITUTION BUILT BY PEOPLE WHO DID THEIR RESEARCH", "AND STILL GOT REKT."]} />
    </main>
  );
}