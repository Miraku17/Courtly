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

export const metadata: Metadata = {
  title: "Courtify - More Than A Court",
  description: "Join an elite community where world-class facilities meet a vibrant social scene.",
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
