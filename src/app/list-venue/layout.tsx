import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Venue",
  description:
    "List your sports venue on Courtify for free. Reach more players, manage bookings effortlessly, and grow your business.",
  openGraph: {
    title: "List Your Venue | Courtify",
    description:
      "List your sports venue on Courtify for free. Reach more players, manage bookings, and grow your business.",
  },
  alternates: {
    canonical: "/list-venue",
  },
};

export default function ListVenueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
