"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const perks = [
  "Free to list — no hidden fees",
  "Reach thousands of players",
  "Full booking management",
];

export const VenueListingHero = () => {
  return (
    <section className="relative overflow-hidden bg-bg-dark px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-32 md:px-10 md:pb-32 md:pt-40">
      {/* Background — diagonal lines instead of dot grid */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_3.png"
          alt=""
          fill
          priority
          className="pointer-events-none object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/30 via-bg-dark/70 to-bg-dark" />
        <div className="absolute inset-0 bg-diagonal-lines" />
      </div>

      {/* Strong accent line at top */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-0 h-[3px] w-full origin-left bg-gradient-to-r from-primary via-primary/60 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Centered editorial layout — different from courts' left-aligned hero */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block border border-primary/30 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              For Venue Owners
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 max-w-[800px] text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            List your venue.
            <br />
            <span className="text-primary">Fill your courts.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10 max-w-[520px] text-sm leading-relaxed text-white/50 sm:text-base md:text-lg"
          >
            Join hundreds of venue owners on Courtly. Get discovered by players,
            fill empty time slots, and manage bookings — all completely free.
          </motion.p>

          {/* CTA buttons — sharp rectangular style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-12 flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Link
              href="/signup"
              className="group flex items-center justify-center gap-2 bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-text-dark transition-all hover:brightness-110"
            >
              Get Started Free
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="#contact-form"
              className="flex items-center justify-center border border-white/20 bg-white/[0.04] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all hover:border-white/40 hover:bg-white/[0.08]"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Perks — horizontal with vertical dividers */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/10"
          >
            {perks.map((perk) => (
              <div
                key={perk}
                className="flex items-center gap-2 px-5 text-[13px] text-white/40"
              >
                <CheckCircle size={14} className="flex-shrink-0 text-primary" />
                {perk}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
