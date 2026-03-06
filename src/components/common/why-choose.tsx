export const WhyChoose = () => {
  const features = [
    {
      id: "01",
      title: "Instant Booking",
      description:
        "Reserve sports courts in seconds with a fast and simple booking process designed for speed.",
      color: "#74a069",
    },
    {
      id: "02",
      title: "Real-Time Availability",
      description:
        "View live schedules and only book time slots that are available in real-time.",
      color: "#48723f",
    },
    {
      id: "03",
      title: "Discover Courts Nearby",
      description:
        "Easily find premium sports venues close to your location with GPS integration.",
      color: "#2c452c",
    },
  ];

  return (
    <section
      id="why-choose"
      className="relative overflow-hidden bg-bg-light pt-[100px] pr-0 pb-[60px] pl-10 md:pt-[120px] md:pl-[60px] lg:pt-[140px] lg:pb-[100px] lg:pl-20"
    >
      {/* Vertical Bar */}
      <div className="absolute top-0 left-[10px] z-[1] h-full w-[10px] bg-bg-dark opacity-80 md:left-5 md:w-5 lg:left-[25px] lg:w-[25px]" />
      {/* Horizontal Bar */}
      <div className="absolute top-[10px] left-0 z-[1] h-[10px] w-full bg-bg-dark opacity-80 md:top-5 md:h-5 lg:top-[25px] lg:h-[25px]" />

      {/* Floating ball */}
      <div className="absolute top-[15px] right-[25px] z-[2] size-12 opacity-90">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
          <circle cx="50" cy="50" r="50" />
          <path d="M 20 20 Q 50 50 20 80" stroke="#102b0f" strokeWidth="6" fill="none" />
          <path d="M 80 20 Q 50 50 80 80" stroke="#102b0f" strokeWidth="6" fill="none" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1440px]">
        <div className="mb-20 pr-5 text-center md:pr-20">
          <h2 className="text-[2.5rem] uppercase text-text-dark md:text-[3.5rem] lg:text-[4.5rem] lg:leading-none">
            Why Choose Courtly
          </h2>
        </div>

        <div className="mx-auto flex max-w-[1000px] flex-col pr-5 md:pr-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group mb-5 flex cursor-pointer flex-col items-center gap-5 rounded-[20px] bg-bg-dark/[0.06] p-[30px] text-center transition-all duration-300 hover:bg-bg-dark/[0.1] md:flex-row md:justify-between md:gap-[50px] md:p-10 md:px-[50px] md:text-left"
            >
              <div className="flex flex-1 flex-col items-center gap-4 md:flex-row md:gap-[50px]">
                <div className="min-w-[60px] text-[2.5rem] text-text-dark" style={{ fontFamily: "var(--font-heading), cursive" }}>
                  {feature.id}
                </div>

                <div className="hidden size-[180px] shrink-0 lg:block">
                  <div
                    className="relative size-full overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                    style={{ backgroundColor: feature.color }}
                  >
                    <div className="absolute inset-0 border-2 border-white/30">
                      <div className="absolute top-1/2 left-0 h-0.5 w-full bg-white/30" />
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="mb-[15px] text-[1.8rem] uppercase text-text-dark">
                    {feature.title}
                  </h3>
                  <p className="max-w-[450px] text-[1.1rem] leading-[1.4] text-text-muted-dark">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="md:ml-[30px]">
                <div
                  className={`flex size-[60px] items-center justify-center rounded-full text-text-dark transition-all duration-300 group-hover:scale-110 ${
                    index === 0 ? "bg-primary" : "bg-white"
                  }`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
