import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const steps = [
    {
      icon: '🔍',
      title: 'Search Courts',
      description: 'Find the perfect court near you for any sport.'
    },
    {
      icon: '📅',
      title: 'Check Availability',
      description: 'See real-time schedules and pick your slot.'
    },
    {
      icon: '⚡',
      title: 'Book Instantly',
      description: 'Secure your booking with a few clicks.'
    },
    {
      icon: '🎾',
      title: 'Play & Review',
      description: 'Enjoy your game and share your experience.'
    }
  ];

  const ownerSteps = [
    {
      icon: '📝',
      title: 'Create Listing',
      description: 'Add your venue details and photos.'
    },
    {
      icon: '⚙️',
      title: 'Set Availability',
      description: 'Control your schedule and pricing.'
    },
    {
      icon: '💰',
      title: 'Accept Bookings',
      description: 'Get notified and start earning.'
    }
  ];

  return (
    <section id="how-it-works" className={styles.howItWorks}>
      <div className="container">
        <div className={styles.header}>
          <h2>How It Works</h2>
          <p>Whether you're a player or a venue owner, we've got you covered.</p>
        </div>

        <div className={styles.tabs}>
          <div className={styles.column}>
            <h3>For Players</h3>
            <div className={styles.stepsGrid}>
              {steps.map((step, index) => (
                <div key={index} className={styles.stepCard}>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  {index < steps.length - 1 && <div className={styles.connector}></div>}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.column}>
            <h3>For Owners</h3>
            <div className={styles.stepsGrid}>
              {ownerSteps.map((step, index) => (
                <div key={index} className={styles.stepCard}>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  {index < ownerSteps.length - 1 && <div className={styles.connector}></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
