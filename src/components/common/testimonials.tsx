export const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Tennis Player",
      text: "CourtBook made it so easy to find a tennis court during peak hours. The instant booking feature is a game changer!",
      avatar: "👨‍🦱",
    },
    {
      name: "Sarah Smith",
      role: "Venue Owner",
      text: "Since listing my basketball court, my bookings have increased by 40%. The management tools are intuitive and powerful.",
      avatar: "👩‍🦰",
    },
    {
      name: "Mike Brown",
      role: "Badminton Enthusiast",
      text: "I love how I can see real-time availability. No more calling around to find an open slot.",
      avatar: "🧔",
    },
  ];

  return (
    <section id="testimonials" className="bg-bg-light">
      <div className="mx-auto max-w-[1440px] px-10">
        <div className="mb-[60px] text-center">
          <h2 className="mb-4 text-[2.5rem] text-text-dark">What Our Community Says</h2>
          <p className="text-[1.1rem] text-text-muted-dark">
            Join thousands of happy players and venue owners.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl bg-white p-10 shadow-[0_4px_6px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-5 text-[3rem]">{t.avatar}</div>
              <p className="mb-[25px] grow text-[1.1rem] italic text-text-dark">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <h4 className="mb-[5px] text-bg-dark">{t.name}</h4>
                <p className="text-[0.9rem] font-medium text-text-muted-dark">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
