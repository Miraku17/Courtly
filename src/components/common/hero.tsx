"use client";

import Image from "next/image";
import { FadeIn } from "@/components/common/fade-in";
import { TennisBallScene } from "@/components/three/tennis-ball-scene";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative z-[1] flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-bg-dark p-5 sm:p-10">
      {/* Background Court Lines with subtle motion */}
      <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden opacity-40">
        <motion.div 
          initial={{ opacity: 0, rotate: 35 }}
          animate={{ opacity: 1, rotate: 38 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute left-[55%] top-[-20%] h-[150%] w-[15px] bg-primary/20" 
        />
        <motion.div 
          initial={{ opacity: 0, rotate: -55 }}
          animate={{ opacity: 1, rotate: -52 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-20%] left-[35%] h-[80%] w-[15px] bg-primary/20" 
        />
        <div className="absolute right-[25%] top-0 h-[40%] w-[15px] rotate-[35deg] bg-primary/10" />
        
        {/* Radial glow */}
        <div className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Floating 3D Tennis Ball */}
      <div className="absolute right-[10%] top-[15%] z-0 hidden size-[300px] opacity-60 lg:block xl:size-[450px]">
        <TennisBallScene />
      </div>



      <div className="relative z-[2] mx-auto grid w-full max-w-[1440px] items-center gap-[40px] text-center lg:grid-cols-[1.2fr_1fr] lg:gap-[80px] lg:text-left">
        <div className="flex flex-col items-center lg:items-start">
          <FadeIn delay={0.1}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[0.85rem] font-bold tracking-wide text-primary backdrop-blur-md">
              <span className="flex size-2 animate-pulse rounded-full bg-primary" />
              EXPERIENCE THE COURTIFY LIFESTYLE 🎾
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="mb-6 text-[2.5rem] font-extrabold leading-[1.05] text-text-main sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[6.5rem]">
              PADEL YOUR <span className="relative inline-block text-primary">
                WAY
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 0 100 5" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-30" />
                </svg>
              </span>
              <br />
              <div className="mt-2 flex items-center justify-center gap-4 lg:justify-start">
                <span className="hidden h-[3px] w-[80px] bg-primary/50 lg:inline-block" />
                <span>PLAY WITHOUT LIMITS</span>
              </div>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mb-10 max-w-[540px] text-[1.15rem] leading-relaxed text-text-muted/90">
              Reach more players, manage bookings effortlessly, and grow your
              sports venue — all from one powerful, free platform designed for the modern game.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-5 lg:justify-start">
              <button className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-primary px-8 py-4 font-bold text-text-dark transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(217,241,112,0.4)]">
                <span className="relative z-10">Explore Courts</span>
                <span className="relative z-10 flex size-9 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:rotate-45">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
              
              <button className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-8 py-4 font-bold text-text-main backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:text-white">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-text-dark transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </span>
                Take a Tour
              </button>
            </div>
          </FadeIn>
        </div>

        <FadeIn direction="right" delay={0.4} className="flex justify-center">
          <div className="relative w-full max-w-[480px] lg:max-w-none">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[40px] border border-white/5 shadow-2xl lg:aspect-[3.5/4.5]">
              <Image
                src="/hero_1.webp"
                alt="Courtify Sports Action"
                fill
                className="object-cover object-right transition-transform duration-700 hover:scale-105"
                priority
              />

              {/* Dynamic Overlays */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-bg-dark/20 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-primary/5 mix-blend-overlay" />

              {/* Booking Status Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-6 right-4 z-10 flex items-center gap-3 rounded-2xl border border-primary/20 bg-bg-dark/80 p-3 backdrop-blur-md sm:bottom-10 sm:right-8"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
                  <div className="size-3 animate-ping rounded-full bg-primary" />
                  <div className="absolute size-3 rounded-full bg-primary" />
                </div>
                <div>
                  <div className="text-[0.85rem] font-bold text-white">Live Availability</div>
                  <div className="text-[0.7rem] text-text-muted">12 Courts open now</div>
                </div>
              </motion.div>
            </div>

            {/* Decorative elements around image */}
            <div className="absolute -right-6 -top-6 -z-10 size-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
