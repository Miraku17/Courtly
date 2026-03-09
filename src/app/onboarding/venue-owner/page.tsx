"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, Check, MapPin, Phone, Mail } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

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
  });

  const nextStep = () => setStep((prev) => (prev < 4 ? (prev + 1) as Step : prev));
  const prevStep = () => setStep((prev) => (prev > 1 ? (prev - 1) as Step : prev));

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const progress = (step / 4) * 100;

  return (
    <div className="min-h-svh bg-[#0a1a0a] text-white flex flex-col font-mona overflow-x-hidden">
      {/* Navigation Header */}
      <header className="px-6 py-8 md:px-12 flex items-center justify-between border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 text-[1.4rem] uppercase font-bold tracking-tighter">
          <div className="bg-primary p-1 rounded-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="18" height="18" className="text-bg-dark">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          COURTLY
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[0.7rem] font-bold transition-colors ${
                  step >= s ? "bg-primary text-bg-dark" : "bg-white/10 text-white/40"
                }`}
              >
                {step > s ? <Check size={12} strokeWidth={3} /> : s}
              </div>
              <span className={`text-[0.75rem] font-bold uppercase tracking-wider ${
                step >= s ? "text-white" : "text-white/30"
              }`}>
                {s === 1 && "Identity"}
                {s === 2 && "Location"}
                {s === 3 && "Details"}
                {s === 4 && "Review"}
              </span>
              {s < 4 && <div className="w-8 h-px bg-white/10 ml-2" />}
            </div>
          ))}
        </div>

        <button className="text-[0.85rem] font-bold text-white/50 hover:text-white transition-colors">
          Save and Exit
        </button>
      </header>

      {/* Progress Bar (Mobile) */}
      <div className="md:hidden w-full h-1 bg-white/5">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-[640px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-[2.2rem] md:text-[3.2rem] font-bold leading-[1.1] mb-4">
                      Let&apos;s start with <span className="text-primary italic">your venue identity.</span>
                    </h1>
                    <p className="text-[1.1rem] text-white/60 max-w-[480px]">
                      Your venue name will be visible to all players. Make it professional and recognizable.
                    </p>
                  </div>

                  <div className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <label className="text-[0.8rem] font-bold uppercase tracking-widest text-white/40 ml-1">Venue Name</label>
                      <input 
                        type="text" 
                        value={formData.venueName}
                        onChange={(e) => updateFormData({ venueName: e.target.value })}
                        placeholder="e.g. Royal Tennis Club"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-[1.1rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[0.8rem] font-bold uppercase tracking-widest text-white/40 ml-1">Venue Type</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {["Tennis", "Padel", "Pickleball", "Multisport"].map((type) => (
                          <button
                            key={type}
                            onClick={() => updateFormData({ venueType: type })}
                            className={`py-3 rounded-xl border font-bold text-[0.9rem] transition-all ${
                              formData.venueType === type 
                                ? "bg-primary text-bg-dark border-primary shadow-lg shadow-primary/10" 
                                : "bg-white/[0.03] border-white/10 text-white/60 hover:border-white/20"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-[2.2rem] md:text-[3.2rem] font-bold leading-[1.1] mb-4">
                      Where is your <span className="text-primary italic">venue located?</span>
                    </h1>
                    <p className="text-[1.1rem] text-white/60 max-w-[480px]">
                      Providing an accurate address helps players find your courts easily.
                    </p>
                  </div>

                  <div className="space-y-6 pt-4">
                    <div className="space-y-2 relative">
                      <label className="text-[0.8rem] font-bold uppercase tracking-widest text-white/40 ml-1">Street Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={20} />
                        <input 
                          type="text" 
                          value={formData.address}
                          onChange={(e) => updateFormData({ address: e.target.value })}
                          placeholder="Street name and number"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-14 py-4 text-[1.1rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[0.8rem] font-bold uppercase tracking-widest text-white/40 ml-1">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => updateFormData({ city: e.target.value })}
                          placeholder="City name"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-[1.1rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.8rem] font-bold uppercase tracking-widest text-white/40 ml-1">Contact Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateFormData({ phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-14 py-4 text-[1.1rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[0.8rem] font-bold uppercase tracking-widest text-white/40 ml-1">Contact Email</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData({ email: e.target.value })}
                          placeholder="venue@example.com"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-14 py-4 text-[1.1rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-[2.2rem] md:text-[3.2rem] font-bold leading-[1.1] mb-4">
                      Share some <span className="text-primary italic">key details.</span>
                    </h1>
                    <p className="text-[1.1rem] text-white/60 max-w-[480px]">
                      Help players understand what makes your venue unique and how much it costs to play.
                    </p>
                  </div>

                  <div className="space-y-6 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[0.8rem] font-bold uppercase tracking-widest text-white/40 ml-1">Number of Courts</label>
                        <select 
                          value={formData.courtsCount}
                          onChange={(e) => updateFormData({ courtsCount: e.target.value })}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-[1.1rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all appearance-none cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 10, 15, 20].map((n) => (
                            <option key={n} value={n} className="bg-[#0a1a0a]">{n} Courts</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.8rem] font-bold uppercase tracking-widest text-white/40 ml-1">Hourly Rate ($)</label>
                        <input 
                          type="number" 
                          value={formData.pricing}
                          onChange={(e) => updateFormData({ pricing: e.target.value })}
                          placeholder="e.g. 45"
                          className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-[1.1rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[0.8rem] font-bold uppercase tracking-widest text-white/40 ml-1">Brief Description</label>
                      <textarea 
                        value={formData.description}
                        onChange={(e) => updateFormData({ description: e.target.value })}
                        placeholder="Tell players about your venue, facilities, and any special requirements..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-[1.1rem] outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all min-h-[120px] resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-[2.2rem] md:text-[3.2rem] font-bold leading-[1.1] mb-4">
                      All set! <span className="text-primary italic">Let&apos;s review.</span>
                    </h1>
                    <p className="text-[1.1rem] text-white/60 max-w-[480px]">
                      Take a quick look at your details before we finalize your venue profile.
                    </p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-6">
                    <div className="flex justify-between items-start border-b border-white/5 pb-6">
                      <div>
                        <h3 className="text-white/40 uppercase text-[0.75rem] font-bold tracking-[0.15em] mb-1">Venue Identity</h3>
                        <p className="text-[1.4rem] font-bold">{formData.venueName || "Not specified"}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-[0.7rem] font-bold rounded-md border border-primary/20">
                          {formData.venueType} Venue
                        </span>
                      </div>
                      <button onClick={() => setStep(1)} className="text-primary text-[0.8rem] font-bold">Edit</button>
                    </div>

                    <div className="flex justify-between items-start border-b border-white/5 pb-6">
                      <div>
                        <h3 className="text-white/40 uppercase text-[0.75rem] font-bold tracking-[0.15em] mb-1">Location & Contact</h3>
                        <p className="text-[1.1rem] text-white/80">{formData.address || "No address provided"}</p>
                        <p className="text-[0.95rem] text-white/50">{formData.city} &bull; {formData.phone}</p>
                      </div>
                      <button onClick={() => setStep(2)} className="text-primary text-[0.8rem] font-bold">Edit</button>
                    </div>

                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white/40 uppercase text-[0.75rem] font-bold tracking-[0.15em] mb-1">Facilities & Pricing</h3>
                        <p className="text-[1.1rem] text-white/80">{formData.courtsCount} Courts &bull; ${formData.pricing || "0"}/hr</p>
                        <p className="text-[0.95rem] text-white/50 mt-1 italic truncate max-w-[400px]">
                          &quot;{formData.description || "No description provided"}&quot;
                        </p>
                      </div>
                      <button onClick={() => setStep(3)} className="text-primary text-[0.8rem] font-bold">Edit</button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-10">
            <button
              onClick={prevStep}
              className={`flex items-center gap-2 text-[1rem] font-bold transition-all ${
                step === 1 ? "opacity-0 pointer-events-none" : "text-white/50 hover:text-white"
              }`}
            >
              <ChevronLeft size={20} />
              Back
            </button>

            <button
              onClick={step === 4 ? undefined : nextStep}
              className={`flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-[1.1rem] transition-all ${
                step === 4 
                  ? "bg-primary text-bg-dark shadow-xl shadow-primary/20 hover:scale-[1.02]" 
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {step === 4 ? "Complete Setup" : "Continue"}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </main>

      {/* Decorative background */}

      {/* Dot grid — fades out toward edges */}
      <div className="bg-dot-grid fixed inset-0 pointer-events-none z-[-1] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black_30%,transparent_100%)]" />

      {/* Gradient orbs */}
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-primary/[0.07] rounded-full blur-[140px] pointer-events-none z-[-1]" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none z-[-1]" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/[0.025] rounded-full blur-[180px] pointer-events-none z-[-1]" />
      <div className="fixed top-1/4 right-1/3 w-64 h-64 bg-primary/[0.05] rounded-full blur-[80px] pointer-events-none z-[-1]" />

      {/* Thin court-inspired accent lines */}
      <div className="fixed left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent pointer-events-none z-[-1]" />
      <div className="fixed top-1/2 left-0 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/8 to-transparent pointer-events-none z-[-1]" />

      {/* Court wireframe — bottom right */}
      <div className="fixed right-[-60px] bottom-[-100px] w-[380px] opacity-[0.045] text-primary rotate-[8deg] pointer-events-none z-[-1]">
        <svg viewBox="0 0 300 580" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
          <rect x="1" y="1" width="298" height="578" />
          <line x1="0" y1="290" x2="300" y2="290" />
          <line x1="46" y1="0" x2="46" y2="580" />
          <line x1="254" y1="0" x2="254" y2="580" />
          <line x1="46" y1="170" x2="254" y2="170" />
          <line x1="46" y1="410" x2="254" y2="410" />
          <line x1="150" y1="170" x2="150" y2="410" />
          <line x1="150" y1="0" x2="150" y2="14" />
          <line x1="150" y1="566" x2="150" y2="580" />
        </svg>
      </div>

      {/* Court wireframe — top left (mirror, more faded) */}
      <div className="fixed left-[-80px] top-[-60px] w-[260px] opacity-[0.025] text-primary -rotate-[6deg] pointer-events-none z-[-1]">
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


      {/* Diamond accent */}
      <div className="fixed bottom-[28%] left-[10%] w-10 h-10 border border-primary/10 rotate-45 pointer-events-none z-[-1]" />
      <div className="fixed bottom-[28%] left-[10%] w-5 h-5 border border-primary/8 rotate-45 translate-x-[10px] translate-y-[10px] pointer-events-none z-[-1]" />

i     </div>
  );
}
