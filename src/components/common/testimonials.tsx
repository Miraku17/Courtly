"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/common/fade-in";
import SpotlightCard from "@/components/SpotlightCard";

const testimonials = [
  {
    name: "Kristin Watson",
    role: "Club Player",
    text: "I came for the tennis, but stayed for the community. There's an incredible energy here that makes every session the highlight of my week.",
    rating: 5,
    initials: "KW",
    color: "#74a069",
    sport: "Tennis",
  },
  {
    name: "Mike Miller",
    role: "Venue Owner",
    text: "The perfect balance of professional training and a vibrant social scene. My game has improved, and I've made friends for life.",
    rating: 5,
    initials: "MM",
    color: "#48723f",
    sport: "Padel",
  },
  {
    name: "Sarah Chen",
    role: "Pickleball Enthusiast",
    text: "Courtly made it so easy to find courts near me. I went from never playing to booking three times a week. The platform is a game changer.",
    rating: 5,
    initials: "SC",
    color: "#2c452c",
    sport: "Pickleball",
  },
  {
    name: "James Rodriguez",
    role: "Basketball Coach",
    text: "Managing court bookings used to be a nightmare. Now my team has a consistent schedule and our players love the seamless experience.",
    rating: 5,
    initials: "JR",
    color: "#5a8a4f",
    sport: "Basketball",
  },
  {
    name: "Emily Park",
    role: "Padel Player",
    text: "Found my go-to padel court through Courtly. Real-time availability means no more showing up to a full house. Absolutely love it.",
    rating: 5,
    initials: "EP",
    color: "#3d6b35",
    sport: "Padel",
  },
  {
    name: "David Thompson",
    role: "Venue Manager",
    text: "Our occupancy went up 40% within the first month of listing on Courtly. The dashboard analytics are incredibly useful for planning.",
    rating: 5,
    initials: "DT",
    color: "#628f58",
    sport: "Tennis",
  },
];

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const TestimonialCard = ({ t, index }: { t: (typeof testimonials)[number]; index: number }) => (
  <FadeIn delay={index * 0.1} className="h-full">
    <SpotlightCard
      className="flex h-full flex-col justify-between"
      spotlightColor="rgba(217, 241, 112, 0.15)"
    >
      {/* Sport tag */}
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-primary">
          {t.sport}
        </span>
        <div className="flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, j) => (
            <StarIcon key={j} />
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="relative mb-6 flex-1">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="mb-3 text-primary/25">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-[0.95rem] leading-[1.8] text-white/70">
          {t.text}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-white/[0.08] pt-4">
        <div
          className="flex size-11 items-center justify-center rounded-full text-[0.8rem] font-bold text-white shadow-lg"
          style={{ backgroundColor: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-[0.9rem] font-semibold text-white">{t.name}</p>
          <p className="text-[0.75rem] text-white/40">{t.role}</p>
        </div>
      </div>
    </SpotlightCard>
  </FadeIn>
);

export const Testimonials = () => {
  return (
    <section id="testimonials" className="overflow-hidden bg-bg-dark py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <FadeIn className="mb-14 text-center">
          <p className="mb-3 text-[0.85rem] font-semibold uppercase tracking-[0.25em] text-primary">
            Testimonials
          </p>
          <h2 className="mb-4 text-[2.2rem] font-extrabold uppercase text-white md:text-[3rem] lg:text-[4rem]">
            Voices From The Court
          </h2>
          <p className="mx-auto max-w-[500px] text-[0.95rem] text-white/40">
            Hear from players and venue owners who are already part of the Courtly community.
          </p>
        </FadeIn>

        {/* Grid layout with spotlight cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.5}>
          <div className="mt-14 flex flex-col items-center justify-center gap-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-8 py-6 sm:flex-row sm:gap-12 md:gap-16">
            {[
              { value: "4.9", label: "Average Rating" },
              { value: "2,000+", label: "Happy Players" },
              { value: "200+", label: "Venues Listed" },
              { value: "95%", label: "Would Recommend" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[1.8rem] font-extrabold text-primary">{stat.value}</p>
                <p className="text-[0.75rem] uppercase tracking-wider text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
