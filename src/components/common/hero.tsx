import Image from "next/image";

export const Hero = () => {
  return (
    <section className="relative z-[1] flex min-h-[calc(100vh-120px)] items-center bg-bg-dark p-5 sm:p-10">
      {/* Background Court Lines */}
      <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute left-[55%] top-[-20%] h-[150%] w-[15px] rotate-[35deg] bg-white" />
        <div className="absolute bottom-[-20%] left-[35%] h-[80%] w-[15px] -rotate-[55deg] bg-white" />
        <div className="absolute right-[25%] top-0 h-[40%] w-[15px] rotate-[35deg] bg-white" />
      </div>

      {/* Floating Tennis Ball */}
      <div className="absolute bottom-[15%] left-[42%] z-0 size-[60px] drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
          <circle cx="50" cy="50" r="50" />
          <path d="M 20 20 Q 50 50 20 80" stroke="#253a25" strokeWidth="6" fill="none" />
          <path d="M 80 20 Q 50 50 80 80" stroke="#253a25" strokeWidth="6" fill="none" />
        </svg>
      </div>

      <div className="relative z-[2] mx-auto grid w-full max-w-[1440px] items-center gap-[60px] text-center lg:grid-cols-[1.1fr_1fr] lg:text-left">
        <div className="flex flex-col items-center lg:items-start">
          <div className="mb-6 inline-flex items-center rounded-full bg-[#1b2e1b] px-4 py-2 text-[0.9rem] font-semibold text-primary">
            Experience the Courtly Lifestyle 🎾
          </div>

          <h1 className="mb-6 text-[3rem] text-text-main sm:text-[4rem] lg:text-[5.5rem]">
            MORE THAN A <span className="text-primary">COURT</span>
            <br />
            <span className="mr-2.5 mb-[15px] hidden h-2.5 w-[60px] bg-text-main align-middle lg:inline-block" />
            IT&apos;S A LIFESTYLE
          </h1>

          <p className="mb-10 max-w-[500px] text-[1.1rem] leading-relaxed text-text-muted">
            Reach more players, manage bookings effortlessly, and grow your
            sports venue — all from one free platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <button className="flex items-center gap-3 rounded-full bg-primary px-6 py-3 font-semibold text-text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover">
              Explore Courts
              <span className="flex size-8 items-center justify-center rounded-full bg-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>
            <button className="flex items-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f0f0f0]">
              <span className="flex size-8 items-center justify-center rounded-full bg-text-dark">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </span>
              Take a Tour
            </button>
          </div>
        </div>

        <div className="relative w-full">
          <div className="relative w-full pb-[70%] lg:pb-[110%]">
            <Image
              src="/hero_1.webp"
              alt="Courtly Sports Action"
              fill
              className="rounded-[32px] object-cover"
              priority
            />

            <div className="absolute left-2.5 top-5 z-10 flex items-center gap-3 rounded-[20px] bg-[#f8f9fa] px-3 py-2 shadow-[0_10px_20px_rgba(0,0,0,0.15)] sm:left-5 sm:px-5 sm:py-3 lg:left-[-40px] lg:top-10">
              <div className="flex items-center">
                <div className="size-[30px] rounded-full border-2 border-[#f8f9fa] bg-[#e6a88e]" />
                <div className="-ml-2.5 size-[30px] rounded-full border-2 border-[#f8f9fa] bg-[#f1c40f]" />
                <div className="-ml-2.5 size-[30px] rounded-full border-2 border-[#f8f9fa] bg-[#e74c3c]" />
                <div className="-ml-2.5 z-[4] flex size-[30px] items-center justify-center rounded-full border-2 border-[#f8f9fa] bg-primary text-[0.65rem] font-bold text-text-dark">
                  240+
                </div>
              </div>
              <div className="text-[0.75rem] font-medium leading-[1.2] text-text-dark">
                Joined by 240+
                <br />
                new members this
                <br />
                month
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
