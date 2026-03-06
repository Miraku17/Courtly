export const HowItWorks = () => {
  const steps = [
    { icon: "🔍", title: "Search Courts", description: "Find the perfect court near you for any sport." },
    { icon: "📅", title: "Check Availability", description: "See real-time schedules and pick your slot." },
    { icon: "⚡", title: "Book Instantly", description: "Secure your booking with a few clicks." },
    { icon: "🎾", title: "Play & Review", description: "Enjoy your game and share your experience." },
  ];

  const ownerSteps = [
    { icon: "📝", title: "Create Listing", description: "Add your venue details and photos." },
    { icon: "⚙️", title: "Set Availability", description: "Control your schedule and pricing." },
    { icon: "💰", title: "Accept Bookings", description: "Get notified and start earning." },
  ];

  return (
    <section id="how-it-works" className="bg-section-dark text-text-main">
      <div className="mx-auto max-w-[1440px] px-10">
        <div className="mb-[60px] text-center">
          <h2 className="mb-4 text-[2.5rem]">How It Works</h2>
          <p className="text-[1.1rem] text-text-muted">
            Whether you&apos;re a player or a venue owner, we&apos;ve got you covered.
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:gap-[60px]">
          <div className="flex-1">
            <h3 className="mb-10 text-center text-[1.5rem] text-primary">For Players</h3>
            <div className="flex flex-col gap-[30px]">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-xl bg-white/10 p-[30px] text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                >
                  <div className="mb-[15px] text-[2.5rem]">{step.icon}</div>
                  <h4 className="mb-2.5 text-[1.25rem]">{step.title}</h4>
                  <p className="text-[0.95rem] text-text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-white/20 lg:h-auto lg:w-px" />

          <div className="flex-1">
            <h3 className="mb-10 text-center text-[1.5rem] text-primary">For Owners</h3>
            <div className="flex flex-col gap-[30px]">
              {ownerSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-xl bg-white/10 p-[30px] text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                >
                  <div className="mb-[15px] text-[2.5rem]">{step.icon}</div>
                  <h4 className="mb-2.5 text-[1.25rem]">{step.title}</h4>
                  <p className="text-[0.95rem] text-text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
