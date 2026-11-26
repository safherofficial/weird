import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./accessibility-refinements.css";
import "./passport/achievements.css";
import "./components/laser-cursor.css";
import "./components/energy-scrollbar.css";
import "./components/scroll-to-top.css";
import "./theme-system.css";
import { SITE_URL } from "./site-config";
import AchievementToastHost from "./components/achievement-toast";
import CircuitClickReveal from "./components/circuit-click-reveal";
import LaserCursor from "./components/laser-cursor";
import EnergyScrollbar from "./components/energy-scrollbar";
import ScrollToTop from "./components/scroll-to-top";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "THE DYOR DEPARTMENT — You came for the 100x. You stayed because you can't sell at a loss.",
    template: "%s | THE DYOR DEPARTMENT",
  },
  description:
    "The fictional aftercare department for Crypto Twitter, Solana memecoin trenches and pump.fun culture, with the 99% Club satirizing investor behaviour across all chains. FOMO, KOL calls and bagholder behaviour. No token, no alpha, no financial advice.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "THE DYOR DEPARTMENT",
    description: "You came for the 100x. You stayed because you can't sell at a loss. Solana is the Department's starting point; the 99% Club is open to crypto culture across all chains.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DYOR DEPARTMENT",
    description: "You came for the 100x. You stayed because you can't sell at a loss. Solana is the Department's starting point; the 99% Club is open to crypto culture across all chains.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
};

const themeBootScript = `(function(){var root=document.documentElement;var theme="ice";try{var saved=localStorage.getItem("dyor-theme");if(typeof saved==="string"&&/^[a-z][a-z0-9-]{0,31}$/i.test(saved))theme=saved;}catch(e){}root.dataset.theme=theme;var meta=document.querySelector('meta[name="theme-color"]');if(!meta){meta=document.createElement("meta");meta.name="theme-color";document.head.appendChild(meta);}var bg=getComputedStyle(root).getPropertyValue("--bg").trim();if(bg)meta.content=bg;})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" id="page-scroll-region" data-theme="ice" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
        <CircuitClickReveal />
        <LaserCursor />
        <div role="region" aria-label="Page scroll controls">
          <EnergyScrollbar />
        </div>
        <ScrollToTop />
        <AchievementToastHost />
      </body>
    </html>
  );
}
