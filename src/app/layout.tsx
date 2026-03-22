import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const panchang = localFont({
  src: [
    { path: "../../public/font/ClashDisplay-Extralight.otf", weight: "200", style: "normal" },
    { path: "../../public/font/ClashDisplay-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/font/ClashDisplay-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/font/ClashDisplay-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/font/ClashDisplay-Semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/font/ClashDisplay-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-panchang",
  display: "swap",
});

const clashDisplay = localFont({
  src: [
    { path: "../../public/font/ClashDisplay-Extralight.otf", weight: "200", style: "normal" },
    { path: "../../public/font/ClashDisplay-Light.otf", weight: "300", style: "normal" },
    { path: "../../public/font/ClashDisplay-Regular.otf", weight: "400", style: "normal" },
    { path: "../../public/font/ClashDisplay-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/font/ClashDisplay-Semibold.otf", weight: "600", style: "normal" },
    { path: "../../public/font/ClashDisplay-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://courtify.com";
const SITE_NAME = "Courtify";
const DEFAULT_DESCRIPTION =
  "Discover, book, and manage sports courts near you. Courtify connects players with premium venues and helps venue owners grow their business — all in one platform.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Courtify — Discover & Book Sports Courts Near You",
    template: "%s | Courtify",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "sports court booking",
    "book tennis court",
    "book basketball court",
    "book badminton court",
    "book pickleball court",
    "pickleball Cebu",
    "Cebu pickleball courts",
    "pickleball court booking",
    "sports venue finder",
    "court reservation",
    "sports facilities near me",
    "sports courts Cebu",
    "venue management platform",
    "Courtify",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Courtify — Discover & Book Sports Courts Near You",
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Courtify — Discover & Book Sports Courts Near You",
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${clashDisplay.variable} ${panchang.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
