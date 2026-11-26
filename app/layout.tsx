import type { Metadata, Viewport } from "next";
import { DM_Mono, Space_Grotesk } from "next/font/google";
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

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dm-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-space-grotesk",
});

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
    description: "You came for the 100x. You stayed because you can't sell at a loss. Solana is the Department's starting point; the 99% Club is open to crypto culture across all chains. Its token is confirmed; official details have not been announced.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DYOR DEPARTMENT",
    description: "You came for the 100x. You stayed because you can't sell at a loss. Solana is the Department's starting point; the 99% Club is open to crypto culture across all chains. Its token is confirmed; official details have not been announced.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#090b09",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      id="page-scroll-region"
      className={dmMono.variable + " " + spaceGrotesk.variable}
    >
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
