import styles from './Testimonials.module.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Tennis Player',
      text: 'CourtBook made it so easy to find a tennis court during peak hours. The instant booking feature is a game changer!',
      avatar: '👨‍🦱'
    },
    {
      name: 'Sarah Smith',
      role: 'Venue Owner',
      text: 'Since listing my basketball court, my bookings have increased by 40%. The management tools are intuitive and powerful.',
      avatar: '👩‍🦰'
    },
    {
      name: 'Mike Brown',
      role: 'Badminton Enthusiast',
      text: 'I love how I can see real-time availability. No more calling around to find an open slot.',
      avatar: '🧔'
    }
  ];

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <div className={styles.header}>
          <h2>What Our Community Says</h2>
          <p>Join thousands of happy players and venue owners.</p>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.avatar}>{t.avatar}</div>
              <p className={styles.text}>"{t.text}"</p>
              <div className={styles.author}>
                <h4>{t.name}</h4>
                <p>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
