import Image from "next/image";


const experiences = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "Instant Court Booking",
    description:
      "Reserve any available court in seconds. Pick your sport, choose a time slot, and confirm — no calls, no waiting.",
    image: "/instant.png",
    imageAlt: "Instant Court Booking",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Group & Event Rentals",
    description:
      "Organize tournaments, corporate events, or casual group sessions. Book multiple courts at once with flexible scheduling.",
    image: "/group-rentals.png",
    imageAlt: "Group and Event Rentals",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    title: "Easy Cancellations",
    description:
      "Plans change — no problem. Cancel or reschedule any booking with a single tap, hassle-free and with no hidden fees.",
    image: "/cancellations.png",
    imageAlt: "Easy Cancellations",
  },
];

import { FadeIn } from "@/components/common/fade-in";

export const BookingExperiences = () => {
  return (
    <section className="bg-bg-light py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Header: description left, title right */}
        <FadeIn className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[300px] text-[1rem] leading-relaxed text-text-muted-dark">
            Designed to make every booking seamless, every game memorable, and every venue accessible.
          </p>
          <h2 className="text-[2.2rem] uppercase text-text-dark md:text-[2.8rem] lg:text-right lg:text-[3.5rem]">
            Booking Options
            <br />
            & Experiences
          </h2>
        </FadeIn>

        {/* Cards grid */}
        <div className="rounded-3xl border-2 border-section-dark p-3 md:p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            {experiences.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div
                  className="flex h-full flex-col rounded-2xl bg-white p-6 md:p-7"
                >
                  {/* Icon + Title */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-section-dark text-primary">
                      {exp.icon}
                    </div>
                    <h3 className="text-[1.1rem] font-semibold text-text-dark">
                      {exp.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-[0.9rem] leading-relaxed text-text-muted-dark">
                    {exp.description}
                  </p>

                  {/* Placeholder image */}
                  <div className="mt-auto aspect-4/3 w-full overflow-hidden rounded-xl">
                    <Image
                      src={exp.image}
                      alt={exp.imageAlt}
                      width={600}
                      height={450}
                      className="size-full object-cover"
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
