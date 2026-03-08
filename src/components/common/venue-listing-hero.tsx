"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const perks = [
  "Free to list — always",
  "Reach thousands of players",
  "Manage bookings effortlessly",
];

export const VenueListingHero = () => {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-bg-dark">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[0.85rem] font-bold uppercase tracking-[0.15em] text-primary">
            For Venue Owners
          </span>

          <h1 className="mb-8 text-[3.5rem] font-bold uppercase leading-[0.9] text-white md:text-[5rem] lg:text-[7rem]">
            List Your
            <br />
            <span className="text-primary">Venue.</span>
            <br />
            Grow Your
            <br />
            Business.
          </h1>

          <p className="mb-10 max-w-[520px] text-[1.1rem] leading-relaxed text-text-muted/70">
            Join hundreds of venue owners on Courtly. Get discovered by players,
            fill your courts, and manage bookings — all for free.
          </p>

          <div className="mb-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-[1.05rem] font-bold text-bg-dark shadow-lg shadow-primary/10 transition-all duration-300 hover:bg-primary-hover"
            >
              Get Started Free
              <ArrowRight size={20} />
            </Link>
          </div>

          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-center gap-2 text-[0.95rem] text-text-muted/60"
              >
                <CheckCircle size={16} className="shrink-0 text-primary" />
                {perk}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
