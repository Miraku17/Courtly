import type { Metadata } from "next";
import { Inter, Lilita_One } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lilitaOne = Lilita_One({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
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
      <body className={`${inter.variable} ${lilitaOne.variable}`}>
        {children}
      </body>
    </html>
  );
}
