"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Mail, MapPin, Phone } from "lucide-react";
import { FadeIn } from "@/components/common/fade-in";

export const VenueListingForm = () => {
  const [venueName, setVenueName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement form submission
  };

  return (
    <section
      id="contact-form"
      className="relative overflow-hidden bg-[#0a1a0a] px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-diagonal-lines" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_520px] lg:gap-20">
          {/* Left content */}
          <FadeIn>
            <div className="max-w-[500px]">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
                Get in touch
              </p>
              <h2 className="mb-5 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
                Ready to get listed?
              </h2>
              <p className="mb-10 text-sm leading-relaxed text-white/40 sm:text-base">
                Fill in a few details and we&apos;ll reach out to complete your
                venue setup. Listing is completely free — no commissions, no
                hidden fees.
              </p>

              {/* FAQ — clean stacked rows with left accent */}
              <div className="flex flex-col gap-0">
                {[
                  {
                    q: "How long does setup take?",
                    a: "Most venues are live within 24 hours of submitting their details.",
                  },
                  {
                    q: "Is there a cost?",
                    a: "No. Listing your venue on Courtly is free. We charge a small service fee to players.",
                  },
                  {
                    q: "Can I manage multiple venues?",
                    a: "Yes. Add as many locations as you need from a single dashboard.",
                  },
                ].map((item, i) => (
                  <FadeIn key={item.q} delay={0.1 * i}>
                    <div className="border-l-2 border-primary/20 py-4 pl-5 transition-all hover:border-primary/50 hover:bg-white/[0.01]">
                      <h4 className="mb-1 text-[13px] font-bold text-white">
                        {item.q}
                      </h4>
                      <p className="text-[12px] leading-relaxed text-white/30">
                        {item.a}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right form — sharp edges, not rounded */}
          <FadeIn delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 border border-white/[0.1] bg-white/[0.03] p-7 sm:p-9"
            >
              <div className="mb-2">
                <h3 className="text-lg font-bold text-white">
                  Submit your venue
                </h3>
                <p className="mt-1 text-[12px] text-white/30">
                  We&apos;ll get back to you within one business day.
                </p>
              </div>

              {/* Venue Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">
                  Venue Name
                </label>
                <div className="group relative">
                  <Building2
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-primary"
                  />
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="e.g. Central Sports Hub"
                    required
                    className="w-full border border-white/[0.1] bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/15 transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:outline-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">
                  Location
                </label>
                <div className="group relative">
                  <MapPin
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-primary"
                  />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. San Francisco, CA"
                    required
                    className="w-full border border-white/[0.1] bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/15 transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">
                  Email
                </label>
                <div className="group relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-primary"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full border border-white/[0.1] bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/15 transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/25">
                  Phone
                  <span className="ml-1 text-white/10">(optional)</span>
                </label>
                <div className="group relative">
                  <Phone
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-primary"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full border border-white/[0.1] bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-white/15 transition-all focus:border-primary/40 focus:bg-white/[0.05] focus:outline-none"
                  />
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="mt-3 flex w-full items-center justify-center gap-2 bg-primary py-4 text-sm font-bold uppercase tracking-wider text-text-dark transition-all hover:brightness-110"
              >
                Submit My Venue
                <ArrowRight size={16} />
              </motion.button>

              <p className="text-center text-[10px] text-white/15">
                By submitting, you agree to our terms of service.
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
