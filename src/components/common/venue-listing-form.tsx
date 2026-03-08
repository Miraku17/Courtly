"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Mail, MapPin } from "lucide-react";
import { FadeIn } from "@/components/common/fade-in";

export const VenueListingForm = () => {
  const [venueName, setVenueName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement form submission
  };

  return (
    <section className="bg-bg-light py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <FadeIn>
            <h2 className="mb-6 text-[2.5rem] font-bold uppercase leading-tight text-text-dark md:text-[3.5rem]">
              Ready to
              <br />
              <span className="text-section-dark">Get Listed?</span>
            </h2>
            <p className="text-[1.05rem] leading-relaxed text-text-muted-dark">
              Fill in a few details and we&apos;ll reach out to complete your
              venue setup. It&apos;s completely free.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-3xl border border-black/5 bg-white p-8 shadow-sm"
            >
              {/* Venue Name */}
              <div className="space-y-2">
                <label className="ml-1 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-text-muted-dark">
                  Venue Name
                </label>
                <div className="group relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-dark/50 transition-colors group-focus-within:text-section-dark">
                    <Building2 size={18} />
                  </div>
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="e.g. Central Sports Hub"
                    required
                    className="w-full rounded-2xl border border-black/8 bg-bg-light/50 px-11 py-3.5 text-[0.95rem] text-text-dark placeholder-text-muted-dark/40 outline-none transition-all duration-300 focus:border-section-dark/40 focus:ring-4 focus:ring-section-dark/5"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="ml-1 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-text-muted-dark">
                  Location
                </label>
                <div className="group relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-dark/50 transition-colors group-focus-within:text-section-dark">
                    <MapPin size={18} />
                  </div>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Manila, Philippines"
                    required
                    className="w-full rounded-2xl border border-black/8 bg-bg-light/50 px-11 py-3.5 text-[0.95rem] text-text-dark placeholder-text-muted-dark/40 outline-none transition-all duration-300 focus:border-section-dark/40 focus:ring-4 focus:ring-section-dark/5"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="ml-1 text-[0.8rem] font-bold uppercase tracking-[0.1em] text-text-muted-dark">
                  Your Email
                </label>
                <div className="group relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted-dark/50 transition-colors group-focus-within:text-section-dark">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full rounded-2xl border border-black/8 bg-bg-light/50 px-11 py-3.5 text-[0.95rem] text-text-dark placeholder-text-muted-dark/40 outline-none transition-all duration-300 focus:border-section-dark/40 focus:ring-4 focus:ring-section-dark/5"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-section-dark py-4 text-[1rem] font-bold text-primary shadow-lg transition-all duration-300 hover:opacity-90"
              >
                Submit My Venue
                <ArrowRight size={18} />
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
