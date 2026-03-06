import { FadeIn } from "@/components/common/fade-in";

export const HowItWorks = () => {
  const playerSteps = [
    { step: "01", title: "Search Courts", description: "Browse venues near you filtered by sport, location, and amenities." },
    { step: "02", title: "Check Availability", description: "View real-time schedules and select a time slot that works for you." },
    { step: "03", title: "Book Instantly", description: "Confirm your reservation in seconds with secure online payment." },
    { step: "04", title: "Play & Review", description: "Show up, enjoy your game, and leave a review for the community." },
  ];

  const ownerSteps = [
    { step: "01", title: "Create Your Listing", description: "Add your venue details, photos, pricing, and available time slots." },
    { step: "02", title: "Set Your Schedule", description: "Define availability windows and let the platform handle the rest." },
    { step: "03", title: "Accept & Earn", description: "Receive bookings automatically and track revenue from your dashboard." },
  ];

  return (
    <section id="how-it-works" className="bg-section-dark py-20 text-text-main lg:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Header */}
        <FadeIn className="mb-16 text-center lg:mb-20">
          <p className="mb-3 text-[0.85rem] font-semibold uppercase tracking-[0.15em] text-primary">
            How It Works
          </p>
          <h2 className="mb-5 text-[2.2rem] md:text-[3rem] lg:text-[3.5rem]">
            Simple Steps to Get Started
          </h2>
          <p className="mx-auto max-w-[520px] text-[1.05rem] leading-relaxed text-text-muted">
            Whether you&apos;re looking for a court or listing your venue, the process is effortless.
          </p>
        </FadeIn>

        {/* Two columns */}
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          {/* For Players */}
          <FadeIn direction="left" className="flex-1">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-primary/30" />
              <h3 className="shrink-0 text-[0.85rem] font-bold uppercase tracking-[0.12em] text-primary">
                For Players
              </h3>
              <div className="h-px flex-1 bg-primary/30" />
            </div>

            <div className="flex flex-col gap-5">
              {playerSteps.map((s) => (
                <div
                  key={s.step}
                  className="group flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5 transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.08] md:gap-6 md:p-6"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-[0.85rem] font-bold text-bg-dark md:size-12">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="mb-1.5 text-[1.1rem] font-semibold text-[#ffffff] md:text-[1.15rem]">
                      {s.title}
                    </h4>
                    <p className="text-[0.9rem] leading-relaxed text-text-muted">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Divider */}
          <div className="h-px w-full bg-white/10 lg:h-auto lg:w-px" />

          {/* For Owners */}
          <FadeIn direction="right" className="flex-1">
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-primary/30" />
              <h3 className="shrink-0 text-[0.85rem] font-bold uppercase tracking-[0.12em] text-primary">
                For Venue Owners
              </h3>
              <div className="h-px flex-1 bg-primary/30" />
            </div>

            <div className="flex flex-col gap-5">
              {ownerSteps.map((s) => (
                <div
                  key={s.step}
                  className="group flex gap-5 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-5 transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.08] md:gap-6 md:p-6"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-[0.85rem] font-bold text-bg-dark md:size-12">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="mb-1.5 text-[1.1rem] font-semibold text-[#ffffff] md:text-[1.15rem]">
                      {s.title}
                    </h4>
                    <p className="text-[0.9rem] leading-relaxed text-text-muted">
                      {s.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
