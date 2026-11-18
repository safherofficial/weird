import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "THE DYOR DEPARTMENT — Your research was impeccable. Your entry was not.",
    template: "%s | THE DYOR DEPARTMENT",
  },
  description:
    "An independent institution dedicated to questionable conviction, over-researched entries and the fine art of holding the bag. No token. No utility. Just collective suffering.",
  metadataBase: new URL("https://the-dyor-department.vercel.app"),
  openGraph: {
    title: "THE DYOR DEPARTMENT",
    description: "You did your own research. The market did its own thing.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE DYOR DEPARTMENT",
    description: "You did your own research. The market did its own thing.",
  },
};

export const viewport: Viewport = {
  themeColor: "#090b09",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}