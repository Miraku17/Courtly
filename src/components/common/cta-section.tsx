import { FadeIn } from "@/components/common/fade-in";

export const CTASection = () => {
  return (
    <section className="bg-bg-dark px-5 py-[100px] text-center text-text-main">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn>
          <h2 className="mb-5 text-[3rem]">List Your Venue on Courtly</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mb-10 text-[1.25rem] text-text-muted">
            Reach more players, manage bookings effortlessly, and grow your sports
            venue — all from one free platform.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <button className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 font-semibold text-text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover">
            Book Your First Court
          </button>
          <button className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 font-semibold text-text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f0f0f0]">
            List Your Venue
          </button>
        </div>
        </FadeIn>
      </div>
    </section>
  );
};
