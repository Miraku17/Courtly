"use client";

import { FadeIn } from "@/components/common/fade-in";


const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up for free in seconds. Choose the Venue Owner role and you're ready to go.",
  },
  {
    number: "02",
    title: "Add Your Venue",
    description: "Fill in your venue details — location, available courts, sports, and operating hours.",
  },
  {
    number: "03",
    title: "Start Getting Bookings",
    description: "Go live and get discovered. Players find and book your courts directly through Courtly.",
  }
];

export const VenueListingSteps = () => {
  return (
    <section className="border-t border-white/5 bg-bg-dark py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeIn className="mb-14">
          <h2 className="text-[2.2rem] font-bold uppercase text-white md:text-[3rem]">
            How It Works
          </h2>
          <p className="mt-4 max-w-[400px] text-[1rem] text-text-muted/60">
            Getting listed takes less than 5 minutes.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="rounded-2xl border border-white/5 bg-white/3 p-8">
                <p className="text-[4rem] font-bold leading-none text-white/10">{step.number}</p>
                <h3 className="mt-5 text-[1.1rem] font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-text-muted/60">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};
