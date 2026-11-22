"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { recordDepartmentVisit } from "../passport/passport-store";
import { divisionIdentityBySection, divisionNavigationGroups, type DepartmentSection } from "../divisions";

type DepartmentHeaderProps = {
  activeSection?: DepartmentSection;
  statusMessage?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

type DepartmentNavItem = {
  number: string;
  label: string;
  href: string;
  section: DepartmentSection;
};

const navigationGroups = divisionNavigationGroups;

const passportItem: DepartmentNavItem = {
  number: "11",
  label: "THE DEPARTMENT PASSPORT",
  href: "/passport",
  section: "passport",
};

function isCurrent(item: DepartmentNavItem, activeSection: DepartmentSection) {
  return item.section === activeSection;
}

export default function DepartmentHeader({
  activeSection,
  statusMessage = "ALL SYSTEMS NOMINALLY USELESS",
  ctaHref = "/audit",
  ctaLabel = "START DYOR AUDIT 2.0",
}: DepartmentHeaderProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const departmentsHref = isHomePage ? "#departments" : "/#departments";
  const manifestoHref = isHomePage ? "#manifesto" : "/#manifesto";
  const activeDivision = activeSection ? divisionIdentityBySection[activeSection] : undefined;

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

  useEffect(() => {
    if (activeSection) recordDepartmentVisit(activeSection);
  }, [activeSection]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function renderDepartmentLink(item: DepartmentNavItem, mobile = false) {
    const current = activeSection ? isCurrent(item, activeSection) : false;
    return (
      <Link
        className={mobile
          ? `mobile-nav__item${item.section === "passport" ? " mobile-nav__item--passport" : ""}`
          : "main-nav__item"}
        href={item.href}
        aria-current={current ? "page" : undefined}
        onClick={closeMenu}
        key={item.number}
      >
        <span className={mobile ? "mobile-nav__number" : "main-nav__number"}>{item.number}</span>
        <span className={mobile ? "mobile-nav__item-label" : "main-nav__item-label"}>{item.label}</span>
        <span className={mobile ? "mobile-nav__arrow" : "main-nav__arrow"} aria-hidden="true">↗</span>
      </Link>
    );
  }

  return (
    <>
      <a className="skip-link" href="#content-start">SKIP TO CONTENT</a>
      <div className="topline">
        <span>THE OFFICIAL AFTERCARE DESK FOR THE SOLANA TRENCHES</span>
        <span className="topline__right">
          <i aria-hidden="true" />
          <span>{statusMessage}</span>
        </span>
      </div>

      {activeDivision && (
        <div className="division-idbar shell" aria-label={"Division " + activeDivision.number + ": " + activeDivision.title}>
          <span className="division-idbar__index">DIVISION / {activeDivision.number}</span>
          <div className="division-idbar__identity">
            <strong>{activeDivision.title}</strong>
            <span>{activeDivision.category}</span>
          </div>
          <p>{activeDivision.mandate}</p>
        </div>
      )}

      <header className="site-header shell">
        <Link className="brand" href="/" aria-label="The DYOR Department home" onClick={closeMenu}>
          <span className="brand__mark" aria-hidden="true">D.</span>
          <span className="brand__name">THE DYOR<br />DEPARTMENT</span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          {navigationGroups.map((group) => {
            const groupIsActive = activeSection ? group.items.some((item) => isCurrent(item, activeSection)) : false;
            return (
              <details className="main-nav__group" data-active={groupIsActive || undefined} name="department-navigation" key={group.number}>
                <summary className="main-nav__trigger">
                  <span className="main-nav__trigger-index">{group.number}</span>
                  {group.label}
                  <span className="main-nav__trigger-arrow" aria-hidden="true">⌄</span>
                </summary>
                <div className="main-nav__panel">
                  <div className="main-nav__panel-heading">
                    <span>{group.descriptor}</span>
                    <Link href={"/#" + group.anchorId} onClick={closeMenu}>OPEN SECTION ↗</Link>
                  </div>
                  {group.items.map((item) => renderDepartmentLink(item))}
                </div>
              </details>
            );
          })}
          <Link
            className="main-nav__passport"
            href={passportItem.href}
            aria-current={activeSection && isCurrent(passportItem, activeSection) ? "page" : undefined}
            onClick={closeMenu}
          >
            {passportItem.label} <span aria-hidden="true">↗</span>
          </Link>
          <span className="main-nav__divider" aria-hidden="true" />
          <Link className="main-nav__utility-link" href={departmentsHref} onClick={closeMenu}>DIRECTORY</Link>
          <Link className="main-nav__utility-link" href={manifestoHref} onClick={closeMenu}>MANIFESTO</Link>
        </nav>

        <div className="site-header__actions">
          <Link className="header-cta" href={ctaHref} onClick={closeMenu}>
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

        <nav id={menuId} className="mobile-nav" aria-label="Department directory" hidden={!menuOpen}>
          <div className="mobile-nav__heading">
            <div>
              <span className="mobile-nav__eyebrow">INTERNAL ROUTING / DD-01</span>
              <strong>DEPARTMENT DIRECTORY</strong>
            </div>
            <span className="mobile-nav__count">11 DESTINATIONS<br />2 PORTAL SECTIONS</span>
          </div>

          <div className="mobile-nav__scroll">
            {navigationGroups.map((group) => (
              <section className="mobile-nav__section" aria-label={group.label} key={group.number}>
                <div className="mobile-nav__section-heading">
                  <Link href={"/#" + group.anchorId} onClick={closeMenu}>{group.number} / {group.label} ↗</Link>
                  <span>{String(group.items.length).padStart(2, "0")} UNITS</span>
                </div>
                {group.items.map((item) => renderDepartmentLink(item, true))}
              </section>
            ))}

            <section className="mobile-nav__section mobile-nav__section--identity" aria-label="Passport">
              <div className="mobile-nav__section-heading">
                <span>04 / PASSPORT</span>
                <span>01 UNIT</span>
              </div>
              {renderDepartmentLink(passportItem, true)}
            </section>

            <div className="mobile-nav__utility">
              <Link href={departmentsHref} onClick={closeMenu}>DIRECTORY <span aria-hidden="true">↗</span></Link>
              <Link href={manifestoHref} onClick={closeMenu}>MANIFESTO <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="mobile-nav__foot">NO TOKEN. NO ALPHA. NO LIVE MARKET DATA.</div>
          </div>

          <Link className="mobile-nav__cta" href={ctaHref} onClick={closeMenu}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </header>
    </>
  );
}
