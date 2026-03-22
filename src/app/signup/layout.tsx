import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your free Courtify account. Join as a player to discover and book courts, or as a venue owner to list your sports facilities.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/signup",
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
