import Image from "next/image";

const testimonials = [
  {
    name: "Kristin Watson",
    role: "Club Player",
    text: "I came for the tennis, but stayed for the community. There's an incredible energy here that makes every session the highlight of my week.",
    rating: 5,
    initials: "KW",
    color: "#74a069",
  },
  {
    name: "Mike Miller",
    role: "Venue Owner",
    text: "The perfect balance of professional training and a vibrant social scene. My game has improved, and I've made friends for life.",
    rating: 5,
    initials: "MM",
    color: "#48723f",
  },
];

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-bg-light py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Layout: title left, cards right */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
          {/* Left — sticky title */}
          <div className="lg:sticky lg:top-24">
            <p className="mb-3 text-[0.85rem] font-semibold uppercase tracking-[0.15em] text-section-dark">
              Testimonials
            </p>
            <h2 className="mb-5 text-[2.2rem] uppercase text-text-dark md:text-[2.8rem] lg:text-[3.5rem]">
              Voices From The Court
            </h2>

            {/* Navigation dots */}
            <div className="flex items-center gap-3">
              <div className="size-3 rounded-full bg-section-dark" />
              <div className="size-3 rounded-full bg-primary" />
            </div>
          </div>

          {/* Right — testimonial cards */}
          <div className="flex flex-col gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-text-dark/[0.06] bg-white p-6 transition-all duration-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] md:p-8"
              >
                {/* Top: avatar + name + rating */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex size-12 items-center justify-center rounded-full text-[0.85rem] font-bold text-[#ffffff]"
                      style={{ backgroundColor: t.color }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-[1rem] font-semibold text-text-dark">{t.name}</p>
                      <p className="text-[0.85rem] text-text-muted-dark">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <StarIcon key={j} />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="relative">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="mb-3 text-primary/30">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-[1.05rem] leading-[1.7] text-text-dark">
                    {t.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
