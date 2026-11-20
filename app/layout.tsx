import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./passport/achievements.css";
import "./components/laser-cursor.css";
import { SITE_URL } from "./site-config";
import AchievementToastHost from "./components/achievement-toast";
import CircuitClickReveal from "./components/circuit-click-reveal";
import LaserCursor from "./components/laser-cursor";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "THE DYOR DEPARTMENT — You came for the 100x. You stayed because you can't sell at a loss.",
    template: "%s | THE DYOR DEPARTMENT",
  },
  description:
    "The fictional aftercare office for Crypto Twitter, Solana trenches and pump.fun degeneracy. FOMO, KOL calls, bonding curves and bagholder behaviour. No token, no alpha, no financial advice.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "THE DYOR DEPARTMENT",
    description: "You came for the 100x. You stayed because you can't sell at a loss. Official aftercare for the Solana trenches.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DYOR DEPARTMENT",
    description: "You came for the 100x. You stayed because you can't sell at a loss. Official aftercare for the Solana trenches.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#090b09",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
        <AchievementToastHost />
      </body>
    </html>
  );
}
