import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Sports Courts — Pickleball, Tennis & More in Cebu",
  description:
    "Explore pickleball, tennis, basketball, and badminton courts in Cebu and nearby areas. Filter by sport, location, and availability to find and book the perfect court.",
  keywords: [
    "pickleball courts Cebu",
    "tennis courts Cebu",
    "basketball courts Cebu",
    "badminton courts Cebu",
    "sports courts near me",
    "book pickleball court",
  ],
  openGraph: {
    title: "Browse Sports Courts — Pickleball, Tennis & More in Cebu | Courtify",
    description:
      "Explore pickleball, tennis, basketball, and badminton courts in Cebu. Find and book the perfect court.",
  },
  alternates: {
    canonical: "/courts",
  },
};

export default function CourtsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
