"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { VenueListingHero } from "@/components/common/venue-listing-hero";
import { VenueListingSteps } from "@/components/common/venue-listing-steps";
import { VenueListingForm } from "@/components/common/venue-listing-form";
import { FadeIn } from "@/components/common/fade-in";
import {
  BarChart3,
  CalendarCheck,
  Globe,
  Shield,
  Smartphone,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Get Discovered",
    desc: "Reach thousands of local players actively searching for courts to book.",
  },
  {
    icon: CalendarCheck,
    title: "Manage Bookings",
    desc: "Accept, reschedule, or cancel bookings from a single dashboard.",
  },
  {
    icon: BarChart3,
    title: "Track Performance",
    desc: "See your venue's occupancy rates, revenue, and player reviews at a glance.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    desc: "Manage everything on the go. Your dashboard works on any device.",
  },
  {
    icon: Shield,
    title: "Direct Payments",
    desc: "Players pay you directly via your QR code. No middleman, no processing fees.",
  },
  {
    icon: TrendingUp,
    title: "Grow Revenue",
    desc: "Fill empty time slots and increase utilization with dynamic visibility.",
  },
];

const ownerStats = [
  { value: "200+", label: "Venues Listed" },
  { value: "95%", label: "Occupancy Boost" },
  { value: "$0", label: "Listing Fee" },
  { value: "4.9", label: "Owner Rating" },
];

export default function ListVenuePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-bg-dark"
    >
      <Navbar />
      <VenueListingHero />

      {/* ── Stats Bar — bold primary accent band ── */}
      <section className="bg-primary">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-2 divide-x divide-text-dark/10 sm:grid-cols-4">
            {ownerStats.map((stat, i) => (
              <FadeIn key={stat.label} delay={0.05 * i}>
                <div className="flex flex-col items-center gap-1 py-6 sm:py-8">
                  <span className="text-2xl font-extrabold text-text-dark sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-text-dark/50">
                    {stat.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <VenueListingSteps />

      {/* ── Features — bento-style 2-column layout ── */}
      <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0c220b] px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28">
        <div className="pointer-events-none absolute inset-0 bg-crosshatch" />

        <div className="relative mx-auto max-w-[1440px]">
          <div className="mb-12 sm:mb-16">
            <FadeIn>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                Why Courtify
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
                  Everything you need to grow
                </h2>
                <p className="max-w-[340px] text-[13px] leading-relaxed text-white/30">
                  Tools built for venue owners, not generic booking software.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Bento grid — asymmetric, not uniform */}
          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <FadeIn key={feature.title} delay={0.06 * i}>
                <div className="group flex h-full flex-col bg-[#0c220b] p-7 transition-all duration-300 hover:bg-white/[0.04] sm:p-8">
                  <div className="mb-5 flex size-10 items-center justify-center border border-primary/20 bg-primary/[0.06]">
                    <feature.icon
                      size={18}
                      strokeWidth={2}
                      className="text-primary"
                    />
                  </div>
                  <h3 className="mb-2 text-[15px] font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-white/35">
                    {feature.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <VenueListingForm />
      <Footer />
    </motion.main>
  );
}
