import type { Metadata } from "next";
import Link from "next/link";
import AuditClient from "./audit-client";

export const metadata: Metadata = {
  title: "The DYOR Audit",
  description: "Submit your research process for an entirely unnecessary investigation.",
};

export default function AuditPage() {
  return (
    <main className="audit-page">
      <div className="topline">
        <span>INDEPENDENT DEPARTMENT OF FINANCIAL REGRET</span>
        <span className="topline__right"><i /> CASE INTAKE OPEN</span>
      </div>
      <header className="site-header shell">
        <Link className="brand" href="/" aria-label="The DYOR Department home">
          <span className="brand__mark">D.</span>
          <span className="brand__name">THE DYOR<br />DEPARTMENT<span className="brand__reg">®</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/audit" aria-current="page">THE AUDIT <span>↗</span></Link>
          <Link href="/#departments">DEPARTMENTS</Link>
          <Link href="/#manifesto">MANIFESTO</Link>
        </nav>
        <Link className="header-cta" href="/">← BACK TO HQ</Link>
      </header>
      <div className="audit-shell shell">
        <div className="audit-intro">
          <div className="audit-intro__meta"><span>FORM DYOR-001</span><span>CONFIDENTIAL(ISH)</span></div>
          <p className="eyebrow">OFFICE OF QUESTIONABLE DUE DILIGENCE</p>
          <h1>THE DYOR<br /><span>AUDIT.</span></h1>
          <p className="audit-intro__lead">Six questions. One deeply unnecessary investigation. Find out what kind of financial decision-maker you have become.</p>
          <div className="audit-warning"><span>!</span><p>THIS IS A SATIRICAL PERSONALITY QUIZ. It does not assess actual investment skill, risk tolerance or financial decisions. No real assets or wallets involved.</p></div>
        </div>
        <AuditClient />
      </div>
      <footer className="site-footer shell">
        <Link className="brand brand--footer" href="/">
          <span className="brand__mark">D.</span>
          <span className="brand__name">THE DYOR<br />DEPARTMENT<span className="brand__reg">®</span></span>
        </Link>
        <p>YOUR RESEARCH HAS BEEN ACKNOWLEDGED.<br />YOUR LOSSES REMAIN YOURS.</p>
        <div className="site-footer__right"><span>NO TOKEN. NO UTILITY. NO FINANCIAL ADVICE.</span><span>© THE DEPARTMENT — FOR ENTERTAINMENT ONLY</span></div>
      </footer>
    </main>
  );
}