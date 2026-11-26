import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./accessibility-refinements.css";
import "./passport/achievements.css";
import "./components/laser-cursor.css";
import "./components/energy-scrollbar.css";
import "./components/scroll-to-top.css";
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
    "The fictional aftercare department for Crypto Twitter, Solana memecoin trenches and pump.fun culture. The 99% Club token is confirmed; its official details have not been announced. No alpha, no financial advice.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "THE DYOR DEPARTMENT",
    description: "You came for the 100x. You stayed because you can't sell at a loss. The 99% Club token is confirmed; its official details have not been announced.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DYOR DEPARTMENT",
    description: "You came for the 100x. You stayed because you can't sell at a loss. The 99% Club token is confirmed; its official details have not been announced.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#090b09",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" id="page-scroll-region">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap"
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
