"use client";

import { useEffect, useState } from "react";

const SHOW_AFTER_PX = 520;

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > SHOW_AFTER_PX);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      className="scroll-to-top"
      type="button"
      aria-label="Back to top"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      disabled={!isVisible}
      data-visible={isVisible ? "true" : "false"}
      onClick={handleScrollToTop}
    >
      <span className="scroll-to-top__arrow" aria-hidden="true">↑</span>
      <span className="scroll-to-top__label" aria-hidden="true">BACK TO TOP</span>
    </button>
  );
}
