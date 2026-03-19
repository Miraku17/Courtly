"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/common/fade-in";

const testimonials = [
  {
    name: "Kristin Watson",
    role: "Club Player",
    text: "I came for the tennis, but stayed for the community. There's an incredible energy here that makes every session the highlight of my week.",
    rating: 5,
    initials: "KW",
    color: "#74a069",
  },
  {
    name: "Mike Miller",
    role: "Venue Owner",
    text: "The perfect balance of professional training and a vibrant social scene. My game has improved, and I've made friends for life.",
    rating: 5,
    initials: "MM",
    color: "#48723f",
  },
  {
    name: "Sarah Chen",
    role: "Pickleball Enthusiast",
    text: "Courtly made it so easy to find courts near me. I went from never playing to booking three times a week. The platform is a game changer.",
    rating: 5,
    initials: "SC",
    color: "#2c452c",
  },
  {
    name: "James Rodriguez",
    role: "Basketball Coach",
    text: "Managing court bookings used to be a nightmare. Now my team has a consistent schedule and our players love the seamless experience.",
    rating: 5,
    initials: "JR",
    color: "#5a8a4f",
  },
  {
    name: "Emily Park",
    role: "Padel Player",
    text: "Found my go-to padel court through Courtly. Real-time availability means no more showing up to a full house. Absolutely love it.",
    rating: 5,
    initials: "EP",
    color: "#3d6b35",
  },
  {
    name: "David Thompson",
    role: "Venue Manager",
    text: "Our occupancy went up 40% within the first month of listing on Courtly. The dashboard analytics are incredibly useful for planning.",
    rating: 5,
    initials: "DT",
    color: "#628f58",
  },
];

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const TestimonialCard = ({ t }: { t: (typeof testimonials)[number] }) => (
  <div className="w-[340px] flex-shrink-0 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.07] sm:w-[380px]">
    <div className="mb-4 flex gap-0.5">
      {Array.from({ length: t.rating }).map((_, j) => (
        <StarIcon key={j} />
      ))}
    </div>

    <div className="relative mb-5">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-1 -left-1 text-primary/20">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="pl-5 text-[0.95rem] leading-[1.7] text-white/70">
        {t.text}
      </p>
    </div>

    <div className="flex items-center gap-3 border-t border-white/[0.08] pt-4">
      <div
        className="flex size-10 items-center justify-center rounded-full text-[0.75rem] font-bold text-white"
        style={{ backgroundColor: t.color }}
      >
        {t.initials}
      </div>
      <div>
        <p className="text-[0.9rem] font-semibold text-white">{t.name}</p>
        <p className="text-[0.75rem] text-white/40">{t.role}</p>
      </div>
    </div>
  </div>
);

export const Testimonials = () => {
  const doubledTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="overflow-hidden bg-bg-dark py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeIn className="mb-14 text-center">
          <p className="mb-3 text-[0.85rem] font-semibold uppercase tracking-[0.25em] text-primary">
            Testimonials
          </p>
          <h2 className="text-[2.2rem] font-extrabold uppercase text-white md:text-[3rem] lg:text-[4rem]">
            Voices From The Court
          </h2>
        </FadeIn>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-6 overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {doubledTestimonials.map((t, i) => (
            <TestimonialCard key={`row1-${i}`} t={t} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          {[...doubledTestimonials].reverse().map((t, i) => (
            <TestimonialCard key={`row2-${i}`} t={t} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
