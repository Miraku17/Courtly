import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const monaSans = localFont({
  src: "./fonts/MonaSans.woff2",
  variable: "--font-mona",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Courtly - More Than A Court",
  description: "Join an elite community where world-class facilities meet a vibrant social scene.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={monaSans.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
