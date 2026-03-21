"use client";

import { FadeIn } from "@/components/common/fade-in";
import SpotlightCard from "@/components/SpotlightCard";
import { Star, Quote } from "lucide-react";

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
    text: "Courtify made it so easy to find courts near me. I went from never playing to booking three times a week. The platform is a game changer.",
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
    text: "Found my go-to padel court through Courtify. Real-time availability means no more showing up to a full house. Absolutely love it.",
    rating: 5,
    initials: "EP",
    color: "#3d6b35",
    sport: "Padel",
  },
  {
    name: "David Thompson",
    role: "Venue Manager",
    text: "Our occupancy went up 40% within the first month of listing on Courtify. The dashboard analytics are incredibly useful for planning.",
    rating: 5,
    initials: "DT",
    color: "#628f58",
    sport: "Tennis",
  },
];

const TestimonialCard = ({ t, index }: { t: (typeof testimonials)[number]; index: number }) => (
  <FadeIn delay={index * 0.1} className="h-full">
    <SpotlightCard
      className="dark group flex h-full flex-col justify-between transition-all duration-300 hover:border-primary/30"
      spotlightColor="rgba(217, 241, 112, 0.15)"
    >
      <div className="relative z-10">
        {/* Sport tag & Rating */}
        <div className="mb-6 flex items-center justify-between">
          <span className="rounded-lg border border-primary/20 bg-primary/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-primary backdrop-blur-sm">
            {t.sport}
          </span>
          <div className="flex gap-1 text-primary">
            {Array.from({ length: t.rating }).map((_, j) => (
              <Star key={j} size={12} fill="currentColor" />
            ))}
          </div>
        </div>

        {/* Quote Icon */}
        <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-white/[0.03] text-primary/40 transition-colors group-hover:text-primary/60">
          <Quote size={18} fill="currentColor" className="opacity-50" />
        </div>

        {/* Quote text */}
        <p className="mb-8 text-[1rem] leading-[1.7] font-medium text-white/80 group-hover:text-white transition-colors">
          "{t.text}"
        </p>
      </div>

      {/* Author Info */}
      <div className="relative z-10 flex items-center gap-4 border-t border-white/[0.06] pt-6 mt-auto">
        <div
          className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl text-[0.85rem] font-bold text-white shadow-2xl overflow-hidden"
          style={{ backgroundColor: t.color }}
        >
          {/* Subtle overlay on avatar */}
          <div className="absolute inset-0 bg-black/10" />
          <span className="relative z-10">{t.initials}</span>
        </div>
        <div>
          <p className="text-[0.95rem] font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            {t.name}
          </p>
          <p className="text-[0.75rem] font-medium text-white/40 uppercase tracking-wider">
            {t.role}
          </p>
        </div>
      </div>
    </SpotlightCard>
  </FadeIn>
);

export const Testimonials = () => {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-bg-dark py-24 lg:py-32">
      {/* Background decorations */}
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-20 flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-end">
          <FadeIn className="text-center lg:text-left">
            <p className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[0.75rem] font-bold uppercase tracking-[0.2em] text-primary">
              Testimonials
            </p>
            <h2 className="text-[2.5rem] font-extrabold leading-tight text-white sm:text-[3.5rem] lg:text-[4.5rem]">
              VOICES FROM <br className="hidden md:block" />
              <span className="text-primary">THE COURT</span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2} className="max-w-[450px] text-center lg:text-right">
            <p className="text-[1.1rem] leading-relaxed text-white/50">
              Hear from players and venue owners who are already part of the Courtify community. 
              Our platform connects sports enthusiasts with world-class facilities.
            </p>
          </FadeIn>
        </div>

        {/* Grid layout with spotlight cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.5}>
          <div className="mt-20 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-8 px-8 py-10 sm:grid-cols-4 sm:gap-4 md:px-12">
              {[
                { value: "4.9", label: "Average Rating", icon: <Star size={16} className="fill-primary" /> },
                { value: "2,000+", label: "Happy Players", icon: null },
                { value: "200+", label: "Venues Listed", icon: null },
                { value: "95%", label: "Would Recommend", icon: null },
              ].map((stat) => (
                <div key={stat.label} className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-[2.2rem] font-extrabold tracking-tight text-white">
                      {stat.value}
                    </p>
                    {stat.icon && <div className="text-primary">{stat.icon}</div>}
                  </div>
                  <p className="text-[0.75rem] font-bold uppercase tracking-widest text-white/30">
                    {stat.label}
                  </p>
                  
                  {/* Decorative line for sm+ screens */}
                  <div className="absolute -right-4 top-1/2 hidden h-12 w-[1px] -translate-y-1/2 bg-white/10 sm:block last:hidden" />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
