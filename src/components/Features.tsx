import styles from './Features.module.css';

const Features = () => {
  const features = [
    {
      icon: '🛡️',
      title: 'Secure Payments',
      description: 'Your transactions are always safe and encrypted.'
    },
    {
      icon: '🕒',
      title: 'Real-time Availability',
      description: 'Live schedules ensure you never double book.'
    },
    {
      icon: '🏆',
      title: 'Multi-sport Support',
      description: 'From Tennis to Basketball, we support all sports.'
    },
    {
      icon: '💬',
      title: 'Ratings & Reviews',
      description: 'Build trust with community-driven feedback.'
    },
    {
      icon: '📱',
      title: 'Mobile Friendly',
      description: 'Book on the go with our responsive design.'
    },
    {
      icon: '✨',
      title: 'Instant Booking',
      description: 'No more waiting for confirmation emails.'
    }
  ];

  return (
    <section id="features" className={styles.features}>
      <div className="container">
        <div className={styles.header}>
          <h2>Platform Features</h2>
          <p>Everything you need to manage your bookings or your venue.</p>
        </div>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
