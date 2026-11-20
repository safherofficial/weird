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
    category: "CASE INVESTIGATION",
    description: "Submit your research process for a completely unnecessary investigation.",
    status: "ACCEPTING CASES",
    href: "/audit",
    symbol: "⌁",
  },
  {
    number: "02",
    title: "THE BAGHOLDER SIMULATOR",
    category: "BEHAVIOURAL SIMULATION",
    description: "Seven rounds. Four questionable decisions. One entirely fictional asset. How heavy can an imaginary bag get?",
    status: "SIMULATION OPEN",
    href: "/simulator",
    symbol: "↘",
  },
  {
    number: "03",
    title: "UTILITY INSPECTOR",
    category: "CLAIM ASSESSMENT",
    description: "Seven questions. Three departmental scores. Investigating revolutionary solutions in search of an actual problem.",
    status: "CLAIMS ACCEPTED",
    href: "/utility-inspector",
    symbol: "⌕",
  },
  {
    number: "04",
    title: "ROADMAP GENERATOR",
    category: "PROJECT DOCUMENTS",
    description: "Six questions. Seven fictional phases. Generate a roadmap with ambitious milestones and deadlines that are always just around the corner.",
    status: "MILESTONES OPEN",
    href: "/roadmap-generator",
    symbol: "⇢",
  },
  {
    number: "05",
    title: "WHITEPAPER FACTORY",
    category: "PROJECT DOCUMENTS",
    description: "Seven questions. Nine sections. Generate a technically impressive document for a project that may or may not exist.",
    status: "ABSTRACTS OPEN",
    href: "/whitepaper-factory",
    symbol: "▤",
  },
  {
    number: "06",
    title: "THE BAGHOLDER MUSEUM",
    category: "CULTURAL COLLECTION",
    description: "Twelve preserved artifacts from the age of questionable conviction. Please do not touch the liquidity puddle.",
    status: "COLLECTION OPEN",
    href: "/museum",
    symbol: "▧",
  },
  {
    number: "07",
    title: "THE 99% CLUB",
    category: "MEMBERSHIP OFFICE",
    description: "Five questions. Three fictional indices. A membership card with absolutely no practical value.",
    status: "APPLICATIONS OPEN",
    href: "/club",
    symbol: "◉",
  },
  {
    number: "08",
    title: "THE GLOBAL COPE INDEX",
    category: "SYNTHETIC MONITORING",
    description: "A daily synthetic reading of conviction pressure, narrative fog, Telegram reliance and the power of soon.",
    status: "DAILY SYNTHETIC INDEX",
    href: "/cope-index",
    symbol: "⌁",
  },
  {
    number: "09",
    title: "THE DEPARTMENT ARCHIVES",
    category: "PUBLIC RECORDS",
    description: "Twelve fictional records, incident reports and official memos from the administrative aftermath of doing your own research.",
    status: "ARCHIVE OPEN",
    href: "/archives",
    symbol: "▥",
  },
  {
    number: "10",
    title: "THE DAILY DEPARTMENT",
    category: "DAILY DISPATCH",
    description: "One fresh fictional dispatch every UTC day. Official bulletins, internal memos and incidents that should never have happened.",
    status: "TODAY'S DISPATCH FILED",
    href: "/daily-office",
    symbol: "▣",
  },
];

const departmentGroups = [
  {
    number: "01",
    code: "INVESTIGATION / 01—03",
    title: "CASEWORK",
    description: "Forensic reviews, questionable decisions and claims requiring further documentation.",
    items: departments.slice(0, 3),
  },
  {
    number: "02",
    code: "DOCUMENTS / 04—05",
    title: "PROJECT OFFICE",
    description: "The paperwork behind every ambitious promise. Formatting is immaculate. The milestones are fictional.",
    items: departments.slice(3, 5),
  },
  {
    number: "03",
    code: "COLLECTION / 06—10",
    title: "PUBLIC RECORDS",
    description: "Artifacts, indices, archived incidents and the daily record of collective conviction.",
    items: departments.slice(5),
  },
];

export default function Home() {
  return (
    <main id="main-content" className="hq-page">
      <DepartmentHeader activeSection="home" statusMessage="ALL SYSTEMS NOMINALLY USELESS" />

      <section className="hq-hero shell" id="content-start" tabIndex={-1}>
        <div className="hq-hero__topline">
          <SectionLabel>OFFICIAL DEPARTMENT HEADQUARTERS</SectionLabel>
          <span className="hq-reference">PUBLIC ACCESS / REF. DYOR-001</span>
        </div>

        <div className="hq-hero__grid">
          <div className="hq-hero__copy">
            <p className="hq-eyebrow"><span>INDEPENDENT INSTITUTION</span> / CRYPTO-ADJACENT AFFAIRS</p>
            <h1>YOUR RESEARCH<br />WAS <span>IMPECCABLE.</span><br />YOUR ENTRY<br />WAS NOT.</h1>
            <p className="hq-hero__lead">
              You checked the team. Studied the tokenomics. Joined the Telegram.
              Read the whitepaper. And somehow, you are still holding the bag.
            </p>
            <div className="hq-hero__actions">
              <Link className="button button--primary" href="/audit">OPEN A DYOR CASE <span>↗</span></Link>
              <a className="button button--quiet" href="#departments">ENTER THE DEPARTMENT <span>↓</span></a>
            </div>
            <div className="hq-hero__disclaimer">
              <span className="hq-hero__disclaimer-mark">!</span>
              <span>NO TOKEN. NO UTILITY. NO FINANCIAL ADVICE.<br />JUST A DEPARTMENTAL RESPONSE TO QUESTIONABLE CONVICTION.</span>
            </div>
          </div>

          <aside className="hq-casefile" aria-label="Illustrative departmental case file">
            <div className="hq-casefile__header">
              <span>DEPARTMENTAL CASE FILE</span>
              <span className="hq-casefile__seal">FILED</span>
            </div>
            <div className="hq-casefile__identity">
              <div>
                <span>CASE REFERENCE</span>
                <strong>000001—YOU</strong>
              </div>
              <span className="hq-casefile__classification">PUBLIC / SATIRICAL</span>
            </div>
            <div className="hq-casefile__chart">
              <div className="hq-casefile__chart-grid" aria-hidden="true" />
              <svg viewBox="0 0 440 200" role="img" aria-label="Illustrative chart with a sharp downward trend">
                <defs>
                  <linearGradient id="hqChartArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#b6ff65" stopOpacity=".22" />
                    <stop offset="100%" stopColor="#b6ff65" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 34 L28 28 L56 42 L83 25 L110 40 L137 48 L166 43 L194 67 L220 61 L247 87 L274 81 L303 109 L331 100 L357 132 L385 125 L411 161 L440 174 L440 200 L0 200 Z" fill="url(#hqChartArea)" />
                <path d="M0 34 L28 28 L56 42 L83 25 L110 40 L137 48 L166 43 L194 67 L220 61 L247 87 L274 81 L303 109 L331 100 L357 132 L385 125 L411 161 L440 174" fill="none" stroke="#b6ff65" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
                <path d="M0 178 H440" stroke="#53604d" strokeDasharray="3 7" />
              </svg>
              <span className="hq-casefile__loss">−97.4%<small>HYPOTHETICAL</small></span>
              <span className="hq-casefile__chart-label">ILLUSTRATIVE PERFORMANCE / NOT MARKET DATA</span>
            </div>
            <div className="hq-casefile__findings">
              <div><span>RESEARCH EFFORT</span><strong className="is-positive">EXCESSIVE</strong></div>
              <div><span>ENTRY TIMING</span><strong className="is-negative">UNFORTUNATE</strong></div>
              <div><span>EXIT STRATEGY</span><strong>NOT DETECTED</strong></div>
              <div><span>CONVICTION</span><strong>UNREASONABLE</strong></div>
            </div>
            <div className="hq-casefile__footer">
              <span>THE MARKET HAS BEEN NOTIFIED.</span>
              <span><i aria-hidden="true" /> OPEN CASE</span>
            </div>
          </aside>
        </div>

        <div className="hq-hero__register" aria-label="Department overview">
          <div><strong>10</strong><span>DEPARTMENTS</span></div>
          <div><strong>11</strong><span>PUBLIC DESTINATIONS</span></div>
          <div><strong>0</strong><span>FINANCIAL ADVICE</span></div>
          <p>YOU ARE NOT THE FIRST. YOU WILL NOT BE THE LAST.</p>
        </div>
      </section>

      <section className="hq-ticker" aria-label="Department ticker">
        <div className="hq-ticker__track">
          {Array.from({ length: 2 }).map((_, index) => (
            <span className="hq-ticker__group" key={index}>
              <b>WE DID THE RESEARCH</b><i>✳</i><b>WE BOUGHT THE TOP</b><i>✳</i><b>WE TRUSTED THE DEV</b><i>✳</i><b>WE ARE STILL EARLY</b><i>✳</i><b>WE ARE NOT FINANCIAL ADVISORS</b><i>✳</i>
            </span>
          ))}
        </div>
      </section>

      <section className="hq-status shell" aria-labelledby="hq-status-title">
        <div className="hq-section-heading hq-section-heading--compact">
          <div>
            <SectionLabel>DEPARTMENTAL SITUATION ROOM</SectionLabel>
            <h2 id="hq-status-title">CURRENT <span>CONDITIONS.</span></h2>
          </div>
          <p>FICTIONAL STATUS BOARD<br />NOT LIVE MARKET DATA</p>
        </div>
        <div className="hq-status__grid">
          {conditions.map((item, index) => (
            <div className="hq-status-card" key={item.label}>
              <span className="hq-status-card__index">0{index + 1}</span>
              <span className="hq-status-card__label">{item.label}</span>
              <strong className={"hq-status-card__value hq-status-card__value--" + item.tone}>{item.value}</strong>
              <span className="hq-status-card__foot">SYNTHETIC DEPARTMENTAL READING</span>
            </div>
          ))}
        </div>
        <p className="hq-status__disclaimer">These satirical status labels are fictional and are not live market data, forecasts or investment indicators.</p>
      </section>

      <section className="hq-directory shell" id="departments" aria-labelledby="hq-directory-title">
        <div className="hq-section-heading">
          <div>
            <SectionLabel>INTERNAL ROUTING / PUBLIC ACCESS</SectionLabel>
            <h2 id="hq-directory-title">THE DEPARTMENT.<br /><span>IN SESSION.</span></h2>
          </div>
          <p>Ten departments. Three offices.<br />No practical solutions guaranteed.</p>
        </div>

        <div className="hq-directory__groups">
          {departmentGroups.map((group) => (
            <section className="hq-office" key={group.number} aria-labelledby={"hq-office-" + group.number}>
              <div className="hq-office__header">
                <div className="hq-office__number">{group.number}</div>
                <div className="hq-office__identity">
                  <span>{group.code}</span>
                  <h3 id={"hq-office-" + group.number}>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <span className="hq-office__count">{String(group.items.length).padStart(2, "0")} UNITS</span>
              </div>
              <div className={"hq-office__grid hq-office__grid--" + group.number}>
                {group.items.map((item) => (
                  <Link className="hq-department" href={item.href} key={item.number}>
                    <div className="hq-department__top">
                      <span>DEPT. {item.number}</span>
                      <span className="hq-department__availability"><i aria-hidden="true" /> OPEN</span>
                    </div>
                    <div className="hq-department__symbol" aria-hidden="true">{item.symbol}</div>
                    <span className="hq-department__category">{item.category}</span>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                    <div className="hq-department__bottom">
                      <span>{item.status}</span>
                      <b aria-hidden="true">↗</b>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="hq-dispatch shell" aria-labelledby="hq-dispatch-title">
        <div className="hq-dispatch__panel">
          <div className="hq-dispatch__stamp" aria-hidden="true">DAILY<br />RECORD</div>
          <div className="hq-dispatch__content">
            <SectionLabel>THE DAILY DEPARTMENT / UTC DISPATCH</SectionLabel>
            <h2 id="hq-dispatch-title">THE MARKET<br /><span>NEVER FILES A REPORT.</span></h2>
            <p>We do. One date-seeded fictional dispatch every UTC day: KOL Intelligence, on-chain interpretations, risk reclassification, conviction metrics and a post-mortem that refuses to admit defeat.</p>
            <Link className="button button--outline" href="/daily-office">READ TODAY'S DISPATCH <span>↗</span></Link>
          </div>
          <div className="hq-dispatch__meta">
            <span>DOCUMENT CLASS</span><strong>PUBLIC RECORD</strong>
            <span>ISSUING OFFICE</span><strong>DAILY DEPARTMENT</strong>
            <span>DATA STATUS</span><strong className="is-positive">FICTIONAL / SATIRICAL</strong>
          </div>
        </div>
      </section>

      <section className="hq-passport shell" aria-label="Department Passport">
        <div>
          <span>YOUR VISITS. YOUR RECORD.</span>
          <p>Keep an optional local record of your journey through the Department.</p>
        </div>
        <Link href="/passport">OPEN DEPARTMENT PASSPORT <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="hq-manifesto" id="manifesto">
        <div className="hq-manifesto__inner shell">
          <SectionLabel>THE DEPARTMENTAL CHARTER</SectionLabel>
          <p className="hq-manifesto__statement">WE ARE NOT HERE TO JUDGE YOU.<br /><span>WE ARE HERE BECAUSE WE ARE YOU.</span></p>
          <div className="hq-manifesto__bottom">
            <p>We read the whitepapers. We checked the wallets. We followed the smart money. We zoomed out. We zoomed in. We found conviction in a Telegram message with seventeen rocket emojis.</p>
            <p>And sometimes, despite all that research, the market did what the market does.</p>
          </div>
        </div>
      </section>

      <section className="hq-closing shell">
        <span className="hq-closing__kicker">YOUR FILE IS STILL OPEN.</span>
        <h2>AT LEAST<br /><span>WE'RE EARLY.</span></h2>
        <p>On what? We have not established that yet.</p>
        <Link className="button button--primary" href="/audit">GET YOUR OFFICIAL DYOR REPORT <span>↗</span></Link>
      </section>

      <DepartmentFooter message={["AN INSTITUTION BUILT BY PEOPLE WHO DID THEIR RESEARCH", "AND STILL GOT REKT."]} />
    </main>
  );
}
