"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type DepartmentHeaderProps = {
  activeSection?: "home" | "audit" | "simulator" | "utility" | "roadmap" | "whitepaper" | "museum" | "club" | "cope";
  statusMessage?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function DepartmentHeader({
  activeSection = "home",
  statusMessage = "ALL SYSTEMS NOMINALLY USELESS",
  ctaHref = "/audit",
  ctaLabel = "SUBMIT YOUR CASE",
}: DepartmentHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const departmentsHref = activeSection === "home" ? "#departments" : "/#departments";
  const manifestoHref = activeSection === "home" ? "#manifesto" : "/#manifesto";

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <a className="skip-link" href="#content-start">SKIP TO CONTENT</a>
      <div className="topline">
        <span>INDEPENDENT DEPARTMENT OF FINANCIAL REGRET</span>
        <span className="topline__right">
          <i aria-hidden="true" />
          <span>{statusMessage}</span>
        </span>
      </div>

      <header className="site-header shell">
        <Link className="brand" href="/" aria-label="The DYOR Department home" onClick={closeMenu}>
          <span className="brand__mark" aria-hidden="true">D.</span>
          <span className="brand__name">THE DYOR<br />DEPARTMENT</span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/audit" aria-current={activeSection === "audit" ? "page" : undefined}>
            THE AUDIT <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/simulator" aria-current={activeSection === "simulator" ? "page" : undefined}>
            THE SIMULATOR <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/utility-inspector" aria-current={activeSection === "utility" ? "page" : undefined}>
            UTILITY <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/roadmap-generator" aria-current={activeSection === "roadmap" ? "page" : undefined}>
            ROADMAP <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/whitepaper-factory" aria-current={activeSection === "whitepaper" ? "page" : undefined}>
            WHITEPAPER <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/museum" aria-current={activeSection === "museum" ? "page" : undefined}>
            THE MUSEUM <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/club" aria-current={activeSection === "club" ? "page" : undefined}>
            THE 99% CLUB <span aria-hidden="true">↗</span>
          </Link>
          <Link href="/cope-index" aria-current={activeSection === "cope" ? "page" : undefined}>
            COPE INDEX <span aria-hidden="true">↗</span>
          </Link>
          <Link href={departmentsHref}>DEPARTMENTS</Link>
          <Link href={manifestoHref}>MANIFESTO</Link>
        </nav>

        <div className="site-header__actions">
          <Link className="header-cta" href={ctaHref}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </Link>
          <button
            ref={menuButtonRef}
            className={"menu-toggle" + (menuOpen ? " is-open" : "")}
            type="button"
            aria-controls={menuId}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-toggle__label">{menuOpen ? "CLOSE" : "MENU"}</span>
            <span className="menu-toggle__icon" aria-hidden="true"><i /><i /></span>
          </button>
        </div>

        <nav id={menuId} className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
          <div className="mobile-nav__heading">
            <span>DEPARTMENT DIRECTORY</span>
            <span>10 DESTINATIONS / 1 PURPOSE</span>
          </div>
          <Link href="/audit" aria-current={activeSection === "audit" ? "page" : undefined} onClick={closeMenu}>
            <span>01</span> THE AUDIT <b aria-hidden="true">↗</b>
          </Link>
          <Link href="/simulator" aria-current={activeSection === "simulator" ? "page" : undefined} onClick={closeMenu}>
            <span>02</span> THE SIMULATOR <b aria-hidden="true">↗</b>
          </Link>
          <Link href="/utility-inspector" aria-current={activeSection === "utility" ? "page" : undefined} onClick={closeMenu}>
            <span>03</span> UTILITY INSPECTOR <b aria-hidden="true">↗</b>
          </Link>
          <Link href="/roadmap-generator" aria-current={activeSection === "roadmap" ? "page" : undefined} onClick={closeMenu}>
            <span>04</span> ROADMAP GENERATOR <b aria-hidden="true">↗</b>
          </Link>
          <Link href="/whitepaper-factory" aria-current={activeSection === "whitepaper" ? "page" : undefined} onClick={closeMenu}>
            <span>05</span> WHITEPAPER FACTORY <b aria-hidden="true">↗</b>
          </Link>
          <Link href="/museum" aria-current={activeSection === "museum" ? "page" : undefined} onClick={closeMenu}>
            <span>06</span> THE BAGHOLDER MUSEUM <b aria-hidden="true">↗</b>
          </Link>
          <Link href="/club" aria-current={activeSection === "club" ? "page" : undefined} onClick={closeMenu}>
            <span>07</span> THE 99% CLUB <b aria-hidden="true">↗</b>
          </Link>
          <Link href="/cope-index" aria-current={activeSection === "cope" ? "page" : undefined} onClick={closeMenu}>
            <span>08</span> GLOBAL COPE INDEX <b aria-hidden="true">↗</b>
          </Link>
          <Link href={departmentsHref} onClick={closeMenu}>
            <span>09</span> DEPARTMENTS <b aria-hidden="true">↗</b>
          </Link>
          <Link href={manifestoHref} onClick={closeMenu}>
            <span>10</span> MANIFESTO <b aria-hidden="true">↗</b>
          </Link>
          <Link className="mobile-nav__cta" href={ctaHref} onClick={closeMenu}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </Link>
          <div className="mobile-nav__foot">NO TOKEN. NO UTILITY. NO FINANCIAL ADVICE.</div>
        </nav>
      </header>
    </>
  );
}
