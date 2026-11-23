import Link from "next/link";
import DepartmentHeader from "./components/department-header";
import DepartmentFooter from "./components/department-footer";
import SectionLabel from "./components/section-label";
import { departmentGroups } from "./divisions";
import { factions } from "./club/club-engine";
import ClubTokenNotice from "./club/club-token-notice";

const conditions = [
  { label: "BONDING CURVE", value: "GRADUATED / TOO LATE", tone: "green" },
  { label: "KOL CONSENSUS", value: "SELF-REFERENTIAL", tone: "muted" },
  { label: "DEV STATUS", value: "COOKING / KITCHEN UNKNOWN", tone: "green" },
  { label: "EXIT LIQUIDITY", value: "YOU", tone: "red" },
  { label: "COPE RESERVES", value: "INFINITE", tone: "red" },
];

export default function Home() {
  return (
    <main id="main-content" className="hq-page">
      <DepartmentHeader activeSection="home" statusMessage="ALL SYSTEMS NOMINALLY USELESS" />

      <section className="hq-hero hq-hero--identity shell" id="content-start" tabIndex={-1}>
        <div className="hq-hero__topline">
          <SectionLabel>OFFICIAL HEADQUARTERS OF FINANCIAL DELUSION</SectionLabel>
          <span className="hq-reference">PUBLIC ACCESS / REF. DYOR-001</span>
        </div>

        <div className="hq-hero__grid">
          <div className="hq-hero__copy">
            <p className="hq-eyebrow"><span>OFFICIAL AFTERCARE OFFICE</span> / PUMP.FUN · SOLANA TRENCHES · CRYPTO TWITTER</p>
            <h1>YOU CAME FOR<br />THE <span>100X.</span><br />YOU STAYED<br />BECAUSE YOU<br />CAN'T SELL<br />AT A LOSS.</h1>
            <p className="hq-hero__lead">
              You aped the launch, watched the bonding curve graduate, followed three KOL calls,
              tracked a mystery wallet and refreshed the chart through the night. Somehow, the exit plan is still loading.
            </p>
            <div className="hq-hero__culture-strip" aria-label="The Department's jurisdiction">
              <span>PUMP.FUN AFTERCARE</span>
              <span>SOLANA TRENCHES</span>
              <span>CRYPTO TWITTER</span>
              <span>100X RECOVERY UNIT</span>
            </div>
            <div className="hq-hero__actions">
              <Link className="button button--primary" href="/audit">ENTER FOMO CONTROL <span>↗</span></Link>
              <a className="button button--quiet" href="#departments">ENTER THE DEPARTMENT <span>↓</span></a>
            </div>
            <div className="hq-hero__disclaimer">
              <span className="hq-hero__disclaimer-mark">!</span>
              <span>NO TOKEN. NO ALPHA. NO EXIT STRATEGY.<br />JUST OFFICIAL PAPERWORK FOR FICTIONAL DEGEN BEHAVIOUR.</span>
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
                <strong>PF-000001—YOU</strong>
              </div>
              <span className="hq-casefile__classification">PUMP.FUN / FICTIONAL</span>
            </div>
            <div className="hq-casefile__chart">
              <div className="hq-casefile__chart-grid" aria-hidden="true" />
              <svg viewBox="0 0 440 200" role="img" aria-label="Illustrative chart with a sharp downward trend">
                <defs>
                  <linearGradient id="hqChartArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b62" stopOpacity=".22" />
                    <stop offset="100%" stopColor="#ff6b62" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 34 L28 28 L56 42 L83 25 L110 40 L137 48 L166 43 L194 67 L220 61 L247 87 L274 81 L303 109 L331 100 L357 132 L385 125 L411 161 L440 174 L440 200 L0 200 Z" fill="url(#hqChartArea)" />
                <path d="M0 34 L28 28 L56 42 L83 25 L110 40 L137 48 L166 43 L194 67 L220 61 L247 87 L274 81 L303 109 L331 100 L357 132 L385 125 L411 161 L440 174" fill="none" stroke="#ff6b62" strokeWidth="2.4" vectorEffect="non-scaling-stroke" />
                <path d="M0 178 H440" stroke="#53604d" strokeDasharray="3 7" />
              </svg>
              <span className="hq-casefile__loss">−97.4%<small>HYPOTHETICAL</small></span>
              <span className="hq-casefile__chart-label">FICTIONAL BAG PERFORMANCE / NOT MARKET DATA</span>
            </div>
            <div className="hq-casefile__findings">
              <div><span>RESEARCH EFFORT</span><strong className="is-positive">OVERCOOKED</strong></div>
              <div><span>ENTRY TIMING</span><strong className="is-negative">POST-GRADUATION</strong></div>
              <div><span>KOL DEPENDENCY</span><strong>CRITICAL</strong></div>
              <div><span>EXIT STRATEGY</span><strong>NOT DETECTED</strong></div>
            </div>
            <div className="hq-casefile__footer">
              <span>BONDING CURVE GRADUATED. SO DID YOUR LIQUIDITY.</span>
              <span><i aria-hidden="true" /> OPEN CASE</span>
            </div>
          </aside>
        </div>

        <div className="hq-hero__register" aria-label="Department overview">
          <div><strong>10</strong><span>DIVISIONS</span></div>
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

      <section className="hq-club shell" aria-labelledby="hq-club-title">
        <div className="hq-club__identity">
          <span className="hq-club__eyebrow">THE DEPARTMENT'S UNOFFICIAL OFFICIAL COMMUNITY / ALL CHAINS</span>
          <h2 id="hq-club-title">THE 99%<br /><em>CLUB.</em></h2>
          <p>
            Born in the Solana trenches. Open to every chain and every cycle. Find your fictional crypto archetype,
            receive your membership file and nominate the next degen who insists they are still early.
          </p>
          <div className="hq-club__actions">
            <Link className="button button--primary" href="/club">APPLY FOR MEMBERSHIP <span>↗</span></Link>
            <Link className="hq-club__text-link" href="/club#club-factions-title">MEET THE SIX FACTIONS ↗</Link>
          </div>
        </div>

        <div className="hq-club__membership" role="group" aria-label="The 99% Club identity">
          <div className="hq-club__membership-top"><span>FORM 99C-001</span><span>FICTIONAL ISSUE</span></div>
          <div className="hq-club__seal">99<span>%</span></div>
          <strong>IT'S NEVER OUR FAULT.</strong>
          <strong>THE NEXT ONE IS MINE.</strong>
          <div className="hq-club__membership-bottom">
            <span>MEMBERSHIP / ALL CHAINS</span>
            <span>EXPECTATIONS / MANAGED</span>
          </div>
        </div>

        <div className="hq-club__factions" aria-label="The six fictional 99% Club factions">
          <div><span>THE SIX FACTIONS</span><strong>ONE VERY FLEXIBLE THESIS</strong></div>
          {Object.values(factions).map((faction) => (
            <span className="hq-club__faction" key={faction.id}>
              <b>{faction.code}</b>{faction.title}
            </span>
          ))}
        </div>
        <p className="hq-club__disclaimer">“99%” IS A SATIRICAL CLUB IDENTITY, NOT A MEASURED STATISTIC. MEMBERSHIP IS FICTIONAL; THERE IS NO VERIFIED ROSTER, TOKEN OR FINANCIAL BENEFIT.</p>
      </section>

      <div className="shell">
        <ClubTokenNotice placement="home" />
      </div>

      <section className="hq-status shell" aria-labelledby="hq-status-title">
        <div className="hq-section-heading hq-section-heading--compact">
          <div>
            <SectionLabel>TRENCHES SITUATION ROOM</SectionLabel>
            <h2 id="hq-status-title">TRENCHES <span>CONDITIONS.</span></h2>
          </div>
          <p>FICTIONAL DEGEN READINGS<br />NOT LIVE MARKET DATA</p>
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
        <p className="hq-status__disclaimer">Every reading is fictional satire. No live token data, wallets, KOL accounts, forecasts or trading signals are involved.</p>
      </section>

      <section className="hq-directory shell" id="departments" aria-labelledby="hq-directory-title">
        <div className="hq-section-heading">
          <div>
            <SectionLabel>INTERNAL ROUTING / TRENCHES AFTERCARE</SectionLabel>
            <h2 id="hq-directory-title">YOUR NEXT<br /><span>BAD DECISION.</span></h2>
          </div>
          <p>Ten numbered divisions. Three routing groups.<br />No alpha. No financial recovery plan.</p>
        </div>

        <div className="hq-directory__groups">
          {departmentGroups.map((group) => (
            <section className="hq-office" id={"department-group-" + group.number} key={group.number} aria-labelledby={"hq-office-" + group.number}>
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
            <SectionLabel>THE TRENCHES DESK / UTC DAILY CT BRIEFING</SectionLabel>
            <h2 id="hq-dispatch-title">THE TRENCHES<br /><span>NEVER FILE A REPORT.</span></h2>
            <p>We do. One fictional dispatch every UTC day: pump.fun incidents, KOL echo chambers, wallet theories, CTO emergencies, FOMO behaviour and post-mortems with absolutely no admission of fault.</p>
            <Link className="button button--outline" href="/daily-office">READ TODAY'S TRENCHES REPORT <span>↗</span></Link>
          </div>
          <div className="hq-dispatch__meta">
            <span>DOCUMENT CLASS</span><strong>PUBLIC RECORD</strong>
            <span>ISSUING OFFICE</span><strong>THE TRENCHES DESK</strong>
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
            <p>We aped the first green candle, called the second one confirmation, and mistook a Telegram raid for due diligence. We chased wallet screenshots we could not verify, followed KOLs who followed each other, and stayed through graduation because someone said "send it".</p>
            <p>Then the dev went quiet, the chart turned red, and the group chat became a support group. This Department is not here to judge. We are in the screenshot too.</p>
          </div>
        </div>
      </section>

      <section className="hq-closing shell">
        <span className="hq-closing__kicker">ONE MORE ENTRY. ONE MORE EXCUSE.</span>
        <h2>STILL<br /><span>EARLY.</span></h2>
        <p>The next ticker is not a plan. The next green candle is not a strategy.</p>
        <Link className="button button--primary" href="/audit">GET YOUR OFFICIAL DEGEN DOSSIER <span>↗</span></Link>
      </section>

      <DepartmentFooter message={["THE OFFICIAL HEADQUARTERS OF FINANCIAL DELUSION", "BUILT BY DEGENS. FILED BY BAGHOLDERS."]} />
    </main>
  );
}
