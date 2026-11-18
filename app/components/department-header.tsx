"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type DepartmentHeaderProps = {
  activeSection?: "home" | "audit";
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
            <span>3 DESTINATIONS / 1 PURPOSE</span>
          </div>
          <Link href="/audit" aria-current={activeSection === "audit" ? "page" : undefined} onClick={closeMenu}>
            <span>01</span> THE AUDIT <b aria-hidden="true">↗</b>
          </Link>
          <Link href={departmentsHref} onClick={closeMenu}>
            <span>02</span> DEPARTMENTS <b aria-hidden="true">↗</b>
          </Link>
          <Link href={manifestoHref} onClick={closeMenu}>
            <span>03</span> MANIFESTO <b aria-hidden="true">↗</b>
          </Link>
          <div className="mobile-nav__foot">NO TOKEN. NO UTILITY. NO FINANCIAL ADVICE.</div>
        </nav>
      </header>
    </>
  );
}
