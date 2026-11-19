import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./passport/achievements.css";
import "./components/screen-crawler.css";
import { SITE_URL } from "./site-config";
import AchievementToastHost from "./components/achievement-toast";
import ScreenCrawler from "./components/screen-crawler";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "THE DYOR DEPARTMENT — Your research was impeccable. Your entry was not.",
    template: "%s | THE DYOR DEPARTMENT",
  },
  description:
    "An independent institution dedicated to questionable conviction, over-researched entries and the fine art of holding the bag. No token. No utility. Just collective suffering.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "THE DYOR DEPARTMENT",
    description: "You did your own research. The market did its own thing.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DYOR DEPARTMENT",
    description: "You did your own research. The market did its own thing.",
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
        <ScreenCrawler />
        <AchievementToastHost />
      </body>
    </html>
  );
}