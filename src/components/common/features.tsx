export const Features = () => {
  const features = [
    { icon: "🛡️", title: "Secure Payments", description: "Your transactions are always safe and encrypted." },
    { icon: "🕒", title: "Real-time Availability", description: "Live schedules ensure you never double book." },
    { icon: "🏆", title: "Multi-sport Support", description: "From Tennis to Basketball, we support all sports." },
    { icon: "💬", title: "Ratings & Reviews", description: "Build trust with community-driven feedback." },
    { icon: "📱", title: "Mobile Friendly", description: "Book on the go with our responsive design." },
    { icon: "✨", title: "Instant Booking", description: "No more waiting for confirmation emails." },
  ];

  return (
    <section id="features" className="bg-bg-light">
      <div className="mx-auto max-w-[1440px] px-10">
        <div className="mb-[60px] text-center">
          <h2 className="mb-4 text-[2.5rem] text-text-dark">Platform Features</h2>
          <p className="text-[1.1rem] text-text-muted-dark">
            Everything you need to manage your bookings or your venue.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl border border-transparent bg-white p-10 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)]"
            >
              <div className="mb-5 text-[3rem]">{feature.icon}</div>
              <h3 className="mb-[15px] text-[1.5rem] text-text-dark">{feature.title}</h3>
              <p className="text-text-muted-dark">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
