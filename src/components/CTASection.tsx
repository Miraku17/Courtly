import styles from './CTASection.module.css';

const CTASection = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={`container ${styles.container}`}>
        <h2>List Your Venue on Courtly</h2>
        <p>Reach more players, manage bookings effortlessly, and grow your sports venue — all from one free platform.</p>
        <div className={styles.buttons}>
          <button className="btn btn-primary">Book Your First Court</button>
          <button className="btn btn-secondary">List Your Venue</button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
