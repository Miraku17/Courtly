"use client";

import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { FadeIn } from "@/components/common/fade-in";
import { TennisBallScene } from "@/components/three/tennis-ball-scene";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-bg-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden px-5 py-20 sm:px-10 lg:py-32">
        {/* Background elements */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-40">
          <motion.div
            initial={{ opacity: 0, rotate: 35 }}
            animate={{ opacity: 1, rotate: 38 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute left-[55%] top-[-20%] h-[150%] w-[15px] bg-primary/20"
          />
          <div className="absolute -left-1/4 -top-1/4 h-full w-full rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px]">
          <div className="max-w-[800px]">
            <FadeIn delay={0.1}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[0.85rem] font-bold tracking-wide text-primary backdrop-blur-md">
                OUR STORY 🎾
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="mb-6 text-[3.5rem] font-extrabold leading-[1.1] text-text-main md:text-[5rem] lg:text-[6.5rem]">
                REVOLUTIONIZING THE <span className="text-primary">GAME</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-[1.25rem] leading-relaxed text-text-muted/90 md:text-[1.5rem]">
                Courtify is more than just a booking platform. We're a community-driven ecosystem 
                dedicated to making sports accessible, social, and seamless for everyone.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* 3D Element for desktop */}
        <div className="absolute right-[5%] top-1/2 hidden size-[400px] -translate-y-1/2 opacity-40 lg:block">
          <TennisBallScene />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="bg-[#eaf6df] px-5 py-20 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <FadeIn direction="left">
              <div className="relative aspect-square w-full overflow-hidden rounded-[40px]">
                <Image
                  src="/hero_2.png"
                  alt="Players on court"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>
            </FadeIn>

            <div>
              <FadeIn delay={0.2}>
                <p className="mb-4 text-[0.9rem] font-bold uppercase tracking-[0.2em] text-section-dark">
                  Our Mission
                </p>
                <h2 className="mb-8 text-[2.5rem] font-extrabold uppercase leading-tight text-text-dark md:text-[3.5rem]">
                  Empowering Athletes & Venue Owners
                </h2>
                <div className="space-y-6 text-[1.1rem] leading-relaxed text-text-muted-dark">
                  <p>
                    At Courtify, we believe that finding a place to play should be as easy as 
                    finding a place to eat. Our mission is to bridge the gap between sports 
                    enthusiasts and premium facilities through innovative technology.
                  </p>
                  <p>
                    We're building a world where every court is occupied, every player has 
                    a partner, and every sports business thrives. By simplifying the 
                    administrative hurdles, we let you focus on what truly matters: 
                    <span className="font-bold text-section-dark"> The Game.</span>
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative overflow-hidden px-5 py-20 sm:px-10 lg:py-32">
        <div className="relative z-10 mx-auto max-w-[1100px]">
          <FadeIn className="mb-16 md:mb-20">
            <p className="mb-4 text-[0.8rem] font-bold uppercase tracking-[0.25em] text-primary/60">
              What drives us
            </p>
            <h2 className="text-[2rem] font-extrabold leading-tight text-text-main md:text-[2.75rem]">
              Built on principles,<br className="hidden sm:block" /> not just features.
            </h2>
          </FadeIn>

          <div className="space-y-0 divide-y divide-white/[0.06]">
            {[
              {
                num: "01",
                title: "Access for everyone",
                desc: "Finding a court shouldn't be complicated. We make it simple for anyone to discover, compare, and book — no matter where they are or what they play.",
              },
              {
                num: "02",
                title: "Technology that stays invisible",
                desc: "The best tech gets out of your way. Real-time availability, instant booking, automated management — it all just works so you can focus on playing.",
              },
              {
                num: "03",
                title: "Stronger together",
                desc: "Every booking is a connection. We help players find each other, venues build loyal communities, and local sports scenes grow organically.",
              },
              {
                num: "04",
                title: "Honest by default",
                desc: "Fair pricing, transparent policies, real reviews. We don't hide fees or inflate numbers. What you see is what you get.",
              },
            ].map((value, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <div className="group grid grid-cols-1 gap-2 py-10 sm:grid-cols-[auto_1fr] sm:gap-x-12 md:py-14 md:grid-cols-[60px_280px_1fr] md:items-baseline">
                  <span className="text-[0.8rem] font-bold tabular-nums text-primary/40 tracking-wider">
                    {value.num}
                  </span>
                  <h3 className="text-[1.25rem] font-bold text-white md:text-[1.4rem]">
                    {value.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-text-muted/70 sm:col-start-2 md:col-start-3 max-w-[520px]">
                    {value.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden bg-primary px-5 py-20 text-text-dark sm:px-10">
        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="grid gap-12 text-center md:grid-cols-4">
            {[
              { label: "Active Players", value: "10k+" },
              { label: "Venues Listed", value: "500+" },
              { label: "Bookings Made", value: "50k+" },
              { label: "Cities Covered", value: "20+" }
            ].map((stat, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <div className="text-[3rem] font-extrabold leading-none md:text-[4rem]">{stat.value}</div>
                <div className="mt-2 text-[0.9rem] font-bold uppercase tracking-widest opacity-80">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
        {/* Decorative background shape */}
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />
      </section>

      {/* Team/Join Us Section */}
      <section className="bg-bg-dark px-5 py-20 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px] text-center">
          <FadeIn>
            <h2 className="mb-8 text-[2.5rem] font-extrabold uppercase text-text-main md:text-[3.5rem]">
              Want to join the revolution?
            </h2>
            <p className="mx-auto mb-12 max-w-[700px] text-[1.1rem] text-text-muted">
              We're always looking for passionate individuals who love sports and technology. 
              Check out our careers page or reach out to us directly.
            </p>
            <button className="rounded-full bg-white px-10 py-4 font-bold text-text-dark transition-transform hover:scale-105">
              Contact Us
            </button>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </main>
  );
}
