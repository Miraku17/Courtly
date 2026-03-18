"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/common/fade-in";
import { UserPlus, Building2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Sign up for free in seconds. Choose the Venue Owner role and you're ready to go.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Add Your Venue",
    description:
      "Fill in your venue details — location, courts, sports, photos, and operating hours.",
    icon: Building2,
  },
  {
    number: "03",
    title: "Start Getting Bookings",
    description:
      "Go live and get discovered. Players find and book your courts directly through Courtly.",
    icon: Rocket,
  },
];

export const VenueListingSteps = () => {
  return (
    <section className="relative overflow-hidden bg-bg-dark px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-crosshatch" />

      <div className="relative mx-auto max-w-[1440px]">
        <FadeIn>
          <div className="mb-14 sm:mb-20">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              Getting started
            </p>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
              List your venue in 3 steps
            </h2>
          </div>
        </FadeIn>

        {/* Horizontal editorial rows — not cards */}
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={0.1 * i}>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col gap-4 border-t border-white/[0.08] py-8 sm:flex-row sm:items-center sm:gap-8 md:gap-12 md:py-10"
              >
                {/* Large step number */}
                <div className="flex items-center gap-4 sm:w-[140px] sm:flex-shrink-0 md:w-[180px]">
                  <span className="text-4xl font-extrabold text-primary/20 transition-colors group-hover:text-primary/50 md:text-5xl">
                    {step.number}
                  </span>
                  <div className="flex size-10 items-center justify-center border border-primary/20 bg-primary/[0.06] transition-all group-hover:border-primary/40 group-hover:bg-primary/10">
                    <step.icon
                      size={18}
                      strokeWidth={2}
                      className="text-primary"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="mb-1.5 text-lg font-bold text-white md:text-xl">
                    {step.title}
                  </h3>
                  <p className="max-w-[440px] text-sm leading-relaxed text-white/35">
                    {step.description}
                  </p>
                </div>

                {/* Arrow indicator on hover */}
                <div className="hidden text-white/10 transition-all group-hover:text-primary/40 sm:block">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>
            </FadeIn>
          ))}
          {/* Bottom border */}
          <div className="border-t border-white/[0.08]" />
        </div>
      </div>
    </section>
  );
};
