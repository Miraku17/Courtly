import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Courtify account to book courts, manage venues, and track your reservations.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/signin",
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
