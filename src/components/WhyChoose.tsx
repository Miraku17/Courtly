import styles from './WhyChoose.module.css';

const WhyChoose = () => {
  const features = [
    {
      id: '01',
      title: 'Instant Booking',
      description: 'Reserve sports courts in seconds with a fast and simple booking process designed for speed.',
      color: '#74a069'
    },
    {
      id: '02',
      title: 'Real-Time Availability',
      description: 'View live schedules and only book time slots that are available in real-time.',
      color: '#48723f'
    },
    {
      id: '03',
      title: 'Discover Courts Nearby',
      description: 'Easily find premium sports venues close to your location with GPS integration.',
      color: '#2c452c'
    }
  ];

  return (
    <section id="why-choose" className={styles.whyChoose}>
      <div className={styles.leftBar}></div>
      <div className={styles.topBar}></div>
      
      <div className={styles.topBall}>
        <svg viewBox="0 0 100 100" fill="var(--primary-color)">
          <circle cx="50" cy="50" r="50" />
          <path d="M 20 20 Q 50 50 20 80" stroke="#102b0f" strokeWidth="6" fill="none" />
          <path d="M 80 20 Q 50 50 80 80" stroke="#102b0f" strokeWidth="6" fill="none" />
        </svg>
      </div>

      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose Courtly</h2>
        </div>

        <div className={styles.list}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardMain}>
                <div className={styles.number}>{feature.id}</div>
                
                <div className={styles.imageBox}>
                  <div className={styles.imageInner} style={{ backgroundColor: feature.color }}>
                    {/* Stylized court pattern */}
                    <div className={styles.courtPattern}></div>
                  </div>
                </div>
                
                <div className={styles.textContent}>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
              
              <div className={styles.action}>
                <div className={styles.arrowCircle}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
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

export default WhyChoose;
