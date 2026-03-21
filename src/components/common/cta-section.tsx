import Link from "next/link";
import { FadeIn } from "@/components/common/fade-in";

export const CTASection = () => {
  return (
    <section className="bg-bg-dark px-4 py-16 text-center text-text-main sm:px-5 md:py-20 lg:py-[100px]">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn>
          <h2 className="mb-5 text-[2rem] sm:text-[2.5rem] md:text-[3rem]">List Your Venue on Courtify</h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mb-10 text-[1rem] text-text-muted sm:text-[1.25rem]">
            Reach more players, manage bookings effortlessly, and grow your sports
            venue — try it free for 7 days.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
          <button className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 font-semibold text-text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover">
            Book Your First Court
          </button>
          <Link href="/list-venue" className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 font-semibold text-text-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f0f0f0]">
            List Your Venue
          </Link>
        </div>
        </FadeIn>
      </div>
    </section>
  );
};
