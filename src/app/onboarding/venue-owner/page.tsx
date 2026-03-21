"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, Check, MapPin, Phone, Mail } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS = ["Identity", "Location", "Details", "Review"];
const STEP_SUBTITLES = [
  "Name & sport type",
  "Address & contact",
  "Courts & pricing",
  "Final review",
];

const VENUE_TYPES = [
  { label: "Tennis", icon: "🎾" },
  { label: "Padel", icon: "🏸" },
  { label: "Pickleball", icon: "🏓" },
  { label: "Multisport", icon: "⚡" },
];

function StepContextPanel({ step, formData }: { step: Step; formData: { venueName: string; venueType: string } }) {
  const venueIcon = VENUE_TYPES.find((v) => v.label === formData.venueType)?.icon ?? "🎾";
  const displayName = formData.venueName.trim() || "Your Venue Name";

  const Tip = ({ text }: { text: string }) => (
    <div className="flex items-start gap-2.5">
      <div className="w-4 h-4 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
      </div>
      <p className="text-[0.78rem] text-white/40 leading-snug">{text}</p>
    </div>
  );

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[0.72rem] font-bold uppercase tracking-widest text-white/30 mb-3">
      {children}
    </p>
  );

  if (step === 1) {
    return (
      <div className="space-y-6">
        <div>
          <SectionLabel>Player preview</SectionLabel>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center text-[1.1rem] flex-shrink-0">
                {venueIcon}
              </div>
              <div className="min-w-0">
                <p className={`font-bold text-[0.95rem] leading-tight transition-colors ${formData.venueName ? "text-white" : "text-white/25 italic"}`}>
                  {displayName}
                </p>
                <p className="text-[0.75rem] text-white/40 mt-0.5">{formData.venueType} · Open now</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 pl-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i <= 4 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="text-primary/70">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <span className="text-[0.68rem] text-white/30 ml-0.5">4.8 · 124 reviews</span>
            </div>
          </div>
          <p className="text-[0.72rem] text-white/25 mt-2 ml-1">
            This is how your venue appears in search results.
          </p>
        </div>
        <div className="space-y-4">
          <SectionLabel>Tips</SectionLabel>
          <Tip text="Use your full, official venue name" />
          <Tip text="Avoid abbreviations players won't recognize" />
          <Tip text="Pick the sport type that best fits your courts" />
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-2">
        {/* Stat callout
        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5">
          <p className="text-[2rem] font-bold text-primary leading-none">73%</p>
          <p className="text-[0.78rem] text-white/40 mt-1.5 leading-snug">
            of bookings come from players within 5 km of the venue.
          </p>
        </div> */}

        {/* Mock nearby venues list */}
        <div>
          <SectionLabel>How you appear to nearby players</SectionLabel>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5">
            {[
              { name: "City Sports Center", dist: "1.2 km", faded: true },
              { name: displayName, dist: "—", highlight: true, icon: venueIcon },
              { name: "Westside Courts", dist: "3.8 km", faded: true },
            ].map((row) => (
              <div
                key={row.name}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${row.highlight ? "bg-primary/[0.08]" : ""}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[0.85rem] flex-shrink-0 ${row.highlight ? "bg-primary/20 border border-primary/30" : "bg-white/5"}`}>
                  {row.icon ?? "🏟️"}
                </div>
                <p className={`flex-1 text-[0.8rem] font-bold truncate ${row.highlight ? "text-white" : "text-white/30"}`}>
                  {row.name}
                </p>
                <p className={`text-[0.72rem] flex-shrink-0 ${row.highlight ? "text-primary font-bold" : "text-white/20"}`}>
                  {row.dist}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[0.72rem] text-white/25 mt-2 ml-1">
            Accurate address improves your placement.
          </p>
        </div>

        <div className="space-y-4">
          <SectionLabel>Tips</SectionLabel>
          <Tip text="Include unit or floor number if applicable" />
          <Tip text="Double-check the city — it affects search filters" />
          <Tip text="A phone number builds trust with first-time bookers" />
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="space-y-6">
        {/* Pricing benchmark */}
        <div>
          <SectionLabel>Market rates near you</SectionLabel>
          <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 space-y-3">
            {[
              { label: "Budget", range: "$20–35/hr", width: "45%" },
              { label: "Mid-range", range: "$36–60/hr", width: "70%", highlight: true },
              { label: "Premium", range: "$61–100/hr", width: "30%" },
            ].map((tier) => (
              <div key={tier.label} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className={`text-[0.72rem] font-bold ${tier.highlight ? "text-primary" : "text-white/35"}`}>
                    {tier.label}
                  </span>
                  <span className={`text-[0.72rem] ${tier.highlight ? "text-white/70" : "text-white/25"}`}>
                    {tier.range}
                  </span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${tier.highlight ? "bg-primary/60" : "bg-white/10"}`}
                    style={{ width: tier.width }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[0.72rem] text-white/25 mt-2 ml-1">
            Most booked venues fall in the mid-range tier.
          </p>
        </div>

        {/* What players look for */}
        <div className="space-y-4">
          <SectionLabel>What players look for</SectionLabel>
          {[
            { icon: "💡", text: "Clear description of facilities and rules" },
            { icon: "🏅", text: "Court surface type (hard, clay, artificial)" },
            { icon: "🚗", text: "Parking and public transport access" },
          ].map((item) => (
            <div key={item.text} className="flex items-start gap-2.5">
              <span className="text-[0.9rem] flex-shrink-0 mt-0.5">{item.icon}</span>
              <p className="text-[0.78rem] text-white/40 leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="space-y-6">
        {/* What happens next */}
        <div>
          <SectionLabel>After you launch</SectionLabel>
          <div className="space-y-3">
            {[
              { icon: "🔍", title: "Go live in search", desc: "Your venue appears to players searching in your area." },
              { icon: "📅", title: "Receive booking requests", desc: "Players can request slots — you approve or adjust." },
              { icon: "📊", title: "Track performance", desc: "Monitor views, bookings, and revenue from your dashboard." },
            ].map((item, i) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-[0.9rem]">
                    {item.icon}
                  </div>
                  {i < 2 && <div className="w-px flex-1 bg-white/5" />}
                </div>
                <div className="pb-3">
                  <p className="text-[0.82rem] font-bold text-white/80">{item.title}</p>
                  <p className="text-[0.75rem] text-white/35 mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badge */}
        <div className="bg-primary/[0.06] border border-primary/15 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
            <Check size={16} className="text-primary" strokeWidth={3} />
          </div>
          <div>
            <p className="text-[0.82rem] font-bold text-white/80">Free forever for venue owners</p>
            <p className="text-[0.72rem] text-white/35 mt-0.5">No listing fees. No hidden charges.</p>
          </div>
        </div>
      </div>
    );
  }

  return <div />;
}

export default function VenueOwnerOnboarding() {
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    venueName: "",
    venueType: "Tennis",
    address: "",
    city: "",
    phone: "",
    email: "",
    description: "",
    pricing: "",
    courtsCount: "1",
    tags: [] as string[],
  });

  const [tagInput, setTagInput] = useState("");

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase().replace(/,+$/, "");
    if (tag && !formData.tags.includes(tag)) {
      updateFormData({ tags: [...formData.tags, tag] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    updateFormData({ tags: formData.tags.filter((t) => t !== tag) });
  };

  const nextStep = () => setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));


  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-svh bg-[#0a1a0a] text-white flex flex-col font-mona overflow-x-hidden">
      {/* ── Mobile Header ── */}
      <header className="md:hidden px-6 py-5 flex items-center justify-between border-b border-white/5">
        <Link
          href="/"
          className="flex items-center gap-2 text-[1.2rem] uppercase font-bold tracking-tighter"
        >
          <div className="bg-primary p-1 rounded-md">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              width="16"
              height="16"
              className="text-bg-dark"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          COURTLY
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-[0.8rem] font-bold text-white/30 uppercase tracking-wider">
            Step {step} / 4
          </span>
          <button className="text-[0.8rem] font-bold text-white/30 hover:text-white transition-colors">
            Save
          </button>
        </div>
      </header>

      {/* Mobile Progress Bar */}
      <div className="md:hidden w-full h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="flex-1 flex min-h-0">
        {/* Left Context Panel */}
        <aside className="hidden md:flex flex-col w-[380px] xl:w-[440px] flex-shrink-0 border-r border-white/5 bg-white/[0.012]">
          {/* Logo */}
          <div className="px-10 py-8 border-b border-white/5">
            <Link
              href="/"
              className="flex items-center gap-2 text-[1.4rem] uppercase font-bold tracking-tighter"
            >
              <div className="bg-primary p-1 rounded-md">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  width="18"
                  height="18"
                  className="text-bg-dark"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              COURTLY
            </Link>
          </div>

          {/* Vertical Step Indicator */}
          <div className="px-10 py-8 space-y-1">
            {STEP_LABELS.map((label, i) => {
              const s = (i + 1) as Step;
              const isCompleted = step > s;
              const isActive = step === s;
              return (
                <div key={s} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[0.75rem] font-bold flex-shrink-0 transition-all duration-300 ${
                        isCompleted
                          ? "bg-primary text-bg-dark"
                          : isActive
                          ? "bg-primary/15 border border-primary text-primary"
                          : "bg-white/5 border border-white/10 text-white/25"
                      }`}
                    >
                      {isCompleted ? <Check size={14} strokeWidth={3} /> : s}
                    </div>
                    {s < 4 && <div className="w-px h-10 bg-white/5 mt-1.5" />}
                  </div>
                  <div className="pt-1 pb-4">
                    <p
                      className={`text-[0.8rem] font-bold uppercase tracking-wider transition-colors ${
                        isActive ? "text-white" : isCompleted ? "text-white/70" : "text-white/25"
                      }`}
                    >
                      {label}
                    </p>
                    <p
                      className={`text-[0.72rem] mt-0.5 transition-colors ${
                        isActive ? "text-white/50" : "text-white/20"
                      }`}
                    >
                      {STEP_SUBTITLES[i]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Per-Step Contextual Content */}
          <div className="flex-1 px-10 pb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <StepContextPanel step={step} formData={formData} />
              </motion.div>
            </AnimatePresence>
          </div>

        </aside>

        {/* ── Right Form Panel ── */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="hidden md:flex px-12 py-5 justify-end border-b border-white/5">
            <button className="text-[0.82rem] font-bold text-white/35 hover:text-white transition-colors">
              Save and Exit
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center px-6 md:px-14 py-10 md:py-16">
            <div className="w-full max-w-[540px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {/* ── Step 1: Identity ── */}
                  {step === 1 && (
                    <div className="space-y-8">
                      <div>
                        <h1 className="text-[2rem] md:text-[2.8rem] font-bold leading-[1.1] mb-3">
                          Let&apos;s start with{" "}
                          <span className="text-primary italic">your venue identity.</span>
                        </h1>
                        <p className="text-[1rem] text-white/50 max-w-[440px]">
                          Your venue name will be visible to all players. Make it professional
                          and recognizable.
                        </p>
                      </div>

                      <div className="space-y-5 pt-2">
                        <div className="space-y-2">
                          <label className="text-[0.72rem] font-bold uppercase tracking-widest text-white/35 ml-1">
                            Venue Name
                          </label>
                          <input
                            type="text"
                            value={formData.venueName}
                            onChange={(e) => updateFormData({ venueName: e.target.value })}
                            placeholder="e.g. Royal Tennis Club"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-[1.05rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(var(--color-primary-rgb,100,220,100),0.07)] transition-all"
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-[0.72rem] font-bold uppercase tracking-widest text-white/35 ml-1">
                            Venue Type
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {VENUE_TYPES.map(({ label, icon }) => (
                              <button
                                key={label}
                                onClick={() => updateFormData({ venueType: label })}
                                className={`py-3.5 rounded-xl border font-bold text-[0.9rem] transition-all flex flex-col items-center gap-1.5 ${
                                  formData.venueType === label
                                    ? "bg-primary text-bg-dark border-primary shadow-lg shadow-primary/15"
                                    : "bg-white/[0.03] border-white/10 text-white/55 hover:border-white/20 hover:bg-white/[0.05]"
                                }`}
                              >
                                <span className="text-[1.2rem] leading-none">{icon}</span>
                                <span>{label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 2: Location ── */}
                  {step === 2 && (
                    <div className="space-y-8">
                      <div>
                        <h1 className="text-[2rem] md:text-[2.8rem] font-bold leading-[1.1] mb-3">
                          Where is your{" "}
                          <span className="text-primary italic">venue located?</span>
                        </h1>
                        <p className="text-[1rem] text-white/50 max-w-[440px]">
                          Providing an accurate address helps players find your courts easily.
                        </p>
                      </div>

                      <div className="space-y-5 pt-2">
                        <div className="space-y-2">
                          <label className="text-[0.72rem] font-bold uppercase tracking-widest text-white/35 ml-1">
                            Street Address
                          </label>
                          <div className="relative">
                            <MapPin
                              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/25"
                              size={18}
                            />
                            <input
                              type="text"
                              value={formData.address}
                              onChange={(e) => updateFormData({ address: e.target.value })}
                              placeholder="Street name and number"
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-5 py-4 text-[1.05rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-white/35 ml-1">
                              City
                            </label>
                            <input
                              type="text"
                              value={formData.city}
                              onChange={(e) => updateFormData({ city: e.target.value })}
                              placeholder="City name"
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-[1.05rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-white/35 ml-1">
                              Contact Phone
                            </label>
                            <div className="relative">
                              <Phone
                                className="absolute left-5 top-1/2 -translate-y-1/2 text-white/25"
                                size={16}
                              />
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => updateFormData({ phone: e.target.value })}
                                placeholder="+1 (555) 000-0000"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-5 py-4 text-[1.05rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[0.72rem] font-bold uppercase tracking-widest text-white/35 ml-1">
                            Contact Email
                          </label>
                          <div className="relative">
                            <Mail
                              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/25"
                              size={16}
                            />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => updateFormData({ email: e.target.value })}
                              placeholder="venue@example.com"
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-5 py-4 text-[1.05rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 3: Details ── */}
                  {step === 3 && (
                    <div className="space-y-8">
                      <div>
                        <h1 className="text-[2rem] md:text-[2.8rem] font-bold leading-[1.1] mb-3">
                          Share some{" "}
                          <span className="text-primary italic">key details.</span>
                        </h1>
                        <p className="text-[1rem] text-white/50 max-w-[440px]">
                          Help players understand what makes your venue unique and how much it
                          costs to play.
                        </p>
                      </div>

                      <div className="space-y-5 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-white/35 ml-1">
                              Number of Courts
                            </label>
                            <select
                              value={formData.courtsCount}
                              onChange={(e) => updateFormData({ courtsCount: e.target.value })}
                              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-[1.05rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                            >
                              {[1, 2, 3, 4, 5, 10, 15, 20].map((n) => (
                                <option key={n} value={n} className="bg-[#0a1a0a]">
                                  {n} {n === 1 ? "Court" : "Courts"}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-white/35 ml-1">
                              Hourly Rate (USD)
                            </label>
                            <div className="relative">
                              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 font-bold text-[1rem]">
                                $
                              </span>
                              <input
                                type="number"
                                value={formData.pricing}
                                onChange={(e) => updateFormData({ pricing: e.target.value })}
                                placeholder="45"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-5 py-4 text-[1.05rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between ml-1 mr-1">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-white/35">
                              Brief Description
                            </label>
                            <span className="text-[0.7rem] text-white/25">
                              {formData.description.length} / 280
                            </span>
                          </div>
                          <textarea
                            value={formData.description}
                            onChange={(e) =>
                              updateFormData({
                                description: e.target.value.slice(0, 280),
                              })
                            }
                            placeholder="Tell players about your venue, facilities, and any special requirements..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-[1.05rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all min-h-[130px] resize-none leading-relaxed"
                          />
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between ml-1 mr-1">
                            <label className="text-[0.72rem] font-bold uppercase tracking-widest text-white/35">
                              Tags
                            </label>
                            <span className="text-[0.7rem] text-white/25">
                              Press Enter or comma to add
                            </span>
                          </div>
                          <div className={`w-full bg-white/[0.03] border rounded-xl px-4 py-3 transition-all flex flex-wrap gap-2 ${formData.tags.length > 0 ? "border-white/10" : "border-white/10"} focus-within:border-primary/50 focus-within:bg-white/[0.05]`}>
                            {formData.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[0.78rem] font-bold rounded-lg"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="text-primary/50 hover:text-primary transition-colors leading-none"
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            <input
                              type="text"
                              value={tagInput}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val.endsWith(",")) {
                                  addTag(val);
                                } else {
                                  setTagInput(val);
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addTag(tagInput);
                                }
                                if (e.key === "Backspace" && tagInput === "" && formData.tags.length > 0) {
                                  removeTag(formData.tags[formData.tags.length - 1]);
                                }
                              }}
                              placeholder={formData.tags.length === 0 ? "e.g. parking, floodlights, clay courts..." : ""}
                              className="flex-1 min-w-[140px] bg-transparent text-[1rem] outline-none placeholder:text-white/20 py-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Step 4: Review ── */}
                  {step === 4 && (
                    <div className="space-y-8">
                      <div>
                        <h1 className="text-[2rem] md:text-[2.8rem] font-bold leading-[1.1] mb-3">
                          All set!{" "}
                          <span className="text-primary italic">Let&apos;s review.</span>
                        </h1>
                        <p className="text-[1rem] text-white/50 max-w-[440px]">
                          Take a quick look at your details before we finalize your venue
                          profile.
                        </p>
                      </div>

                      <div className="space-y-3">
                        {/* Identity */}
                        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex justify-between items-start group hover:border-white/12 transition-colors">
                          <div>
                            <h3 className="text-white/35 uppercase text-[0.68rem] font-bold tracking-[0.15em] mb-2">
                              Venue Identity
                            </h3>
                            <p className="text-[1.3rem] font-bold leading-tight">
                              {formData.venueName || (
                                <span className="text-white/30 italic text-base">Not specified</span>
                              )}
                            </p>
                            <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 bg-primary/10 text-primary text-[0.68rem] font-bold rounded-lg border border-primary/20">
                              {VENUE_TYPES.find((v) => v.label === formData.venueType)?.icon}{" "}
                              {formData.venueType}
                            </span>
                          </div>
                          <button
                            onClick={() => setStep(1)}
                            className="text-white/30 hover:text-primary text-[0.75rem] font-bold transition-colors ml-4 flex-shrink-0"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Location */}
                        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex justify-between items-start hover:border-white/12 transition-colors">
                          <div>
                            <h3 className="text-white/35 uppercase text-[0.68rem] font-bold tracking-[0.15em] mb-2">
                              Location & Contact
                            </h3>
                            <p className="text-[1rem] text-white/80">
                              {formData.address || (
                                <span className="text-white/30 italic">No address provided</span>
                              )}
                            </p>
                            <p className="text-[0.9rem] text-white/45 mt-1">
                              {[formData.city, formData.phone].filter(Boolean).join(" · ") || (
                                <span className="italic">No contact info</span>
                              )}
                            </p>
                          </div>
                          <button
                            onClick={() => setStep(2)}
                            className="text-white/30 hover:text-primary text-[0.75rem] font-bold transition-colors ml-4 flex-shrink-0"
                          >
                            Edit
                          </button>
                        </div>

                        {/* Details */}
                        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex justify-between items-start hover:border-white/12 transition-colors">
                          <div className="min-w-0">
                            <h3 className="text-white/35 uppercase text-[0.68rem] font-bold tracking-[0.15em] mb-2">
                              Facilities & Pricing
                            </h3>
                            <p className="text-[1rem] text-white/80">
                              {formData.courtsCount}{" "}
                              {formData.courtsCount === "1" ? "Court" : "Courts"}
                              {formData.pricing && (
                                <>
                                  {" "}
                                  &middot;{" "}
                                  <span className="text-primary font-bold">
                                    ${formData.pricing}/hr
                                  </span>
                                </>
                              )}
                            </p>
                            {formData.description && (
                              <p className="text-[0.85rem] text-white/40 mt-1 italic line-clamp-2">
                                &ldquo;{formData.description}&rdquo;
                              </p>
                            )}
                            {formData.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {formData.tags.map((tag) => (
                                  <span key={tag} className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[0.68rem] font-bold rounded-md">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => setStep(3)}
                            className="text-white/30 hover:text-primary text-[0.75rem] font-bold transition-colors ml-4 flex-shrink-0"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ── Navigation Controls ── */}
              <div className="mt-10 flex items-center justify-between pt-8 border-t border-white/5">
                <button
                  onClick={prevStep}
                  className={`flex items-center gap-2 text-[0.9rem] font-bold transition-all ${
                    step === 1
                      ? "opacity-0 pointer-events-none"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <ChevronLeft size={18} />
                  Back
                </button>

                <button
                  onClick={step === 4 ? undefined : nextStep}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-primary text-bg-dark font-bold text-[1rem] transition-all hover:scale-[1.02] active:scale-[0.99] shadow-lg shadow-primary/20"
                >
                  {step === 4 ? "Complete Setup" : "Continue"}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── Decorative Background ── */}
      <div className="bg-dot-grid fixed inset-0 pointer-events-none z-[-1] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black_30%,transparent_100%)]" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.07] rounded-full blur-[140px] pointer-events-none z-[-1]" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none z-[-1]" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/[0.025] rounded-full blur-[180px] pointer-events-none z-[-1]" />

      <div className="fixed left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none z-[-1]" />
      <div className="fixed top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent pointer-events-none z-[-1]" />

      <div className="fixed right-[-60px] bottom-[-100px] w-[380px] opacity-[0.04] text-primary rotate-[8deg] pointer-events-none z-[-1]">
        <svg viewBox="0 0 300 580" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <rect x="1" y="1" width="298" height="578" />
          <line x1="0" y1="290" x2="300" y2="290" />
          <line x1="46" y1="0" x2="46" y2="580" />
          <line x1="254" y1="0" x2="254" y2="580" />
          <line x1="46" y1="170" x2="254" y2="170" />
          <line x1="46" y1="410" x2="254" y2="410" />
          <line x1="150" y1="170" x2="150" y2="410" />
        </svg>
      </div>

      <div className="fixed bottom-[28%] left-[10%] w-10 h-10 border border-primary/10 rotate-45 pointer-events-none z-[-1]" />
      <div className="fixed bottom-[28%] left-[10%] w-5 h-5 border border-primary/8 rotate-45 translate-x-[10px] translate-y-[10px] pointer-events-none z-[-1]" />
    </div>
  );
}
