import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/common/fade-in";

const tags = ["Free Listing", "Smart Dashboard", "Instant Payouts"];

const stats = [
  { value: "2k", suffix: "+", label: "Active", sublabel: "Venues" },
  { value: "50k", suffix: "+", label: "Monthly", sublabel: "Bookings" },
  { value: "98", suffix: "%", label: "Owner", sublabel: "Satisfaction" },
  { value: "24/7", suffix: "", label: "Support", sublabel: "Available" },
];

export const VenuePromo = () => {
  return (
    <section className="bg-bg-light py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Top: Image + Text */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <FadeIn direction="left">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl lg:aspect-auto lg:h-[520px]">
            <Image
              src="/pickle.png"
              alt="Sports venue with courts"
              fill
              className="object-cover"
            />
          </div>
          </FadeIn>

          {/* Text content */}
          <FadeIn direction="right" delay={0.2}>
            <h2 className="mb-6 text-[2.2rem] uppercase text-text-dark md:text-[2.8rem] lg:text-[3.5rem]">
              Grow Your Venue With Courtly
            </h2>

            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-2 text-[0.95rem] font-medium text-text-dark">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className="text-primary">
                    <path d="M12 2C9.5 2 8 4 8 6.5C8 9 10.5 11 12 11C13.5 11 16 9 16 6.5C16 4 14.5 2 12 2ZM12 22C14.5 22 16 20 16 17.5C16 15 13.5 13 12 13C10.5 13 8 15 8 17.5C8 20 9.5 22 12 22ZM2 12C2 14.5 4 16 6.5 16C9 16 11 13.5 11 12C11 10.5 9 8 6.5 8C4 8 2 9.5 2 12ZM22 12C22 9.5 20 8 17.5 8C15 8 13 10.5 13 12C13 13.5 15 16 17.5 16C20 16 22 14.5 22 12Z" />
                  </svg>
                  {tag}
                </span>
              ))}
            </div>

            <p className="mb-8 max-w-[540px] text-[1.05rem] leading-[1.7] text-text-muted-dark">
              Turn your sports facility into a thriving business. Courtly gives venue owners the tools to reach thousands of local players, manage bookings effortlessly, and maximize court utilization — all completely free. No commissions, no hidden fees.
            </p>

            {/* Highlight stats row */}
            <div className="mb-8 flex items-center gap-8">
              <div>
                <p className="text-[2rem] font-bold text-text-dark">
                  100%
                </p>
                <p className="text-[0.85rem] text-text-muted-dark">Free for Owners</p>
              </div>
              <div className="h-10 w-px bg-text-dark/15" />
              <div>
                <p className="text-[2rem] font-bold text-text-dark">
                  5 Min
                </p>
                <p className="text-[0.85rem] text-text-muted-dark">Setup Time</p>
              </div>
            </div>

            {/* CTA */}
            <Link href="/list-venue" className="inline-flex items-center gap-3 rounded-full border-2 border-text-dark bg-transparent px-6 py-3 font-semibold text-text-dark transition-all duration-300 hover:bg-text-dark hover:text-[#ffffff]">
              List Your Venue
              <span className="flex size-8 items-center justify-center rounded-full bg-text-dark text-[#ffffff] transition-all duration-300 group-hover:bg-[#ffffff] group-hover:text-text-dark">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </FadeIn>
        </div>

        {/* Bottom stats row */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:mt-14">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
            <div
              className="flex h-full flex-col rounded-2xl bg-section-dark p-5 md:p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[0.85rem] font-medium text-text-muted">{s.label} {s.sublabel}</p>
                <div className="flex size-8 items-center justify-center rounded-full border border-primary/40">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                </div>
              </div>
              <p className="text-[2rem] font-bold leading-none text-primary md:text-[2.4rem]">
                {s.value}
                <span className="text-[1.2rem]">{s.suffix}</span>
              </p>
            </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
