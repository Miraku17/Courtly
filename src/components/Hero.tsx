import Image from 'next/image';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      {/* Background Court Lines */}
      <div className={styles.courtLines}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>
      
      {/* Floating Tennis Ball */}
      <div className={styles.tennisBall}>
        <svg viewBox="0 0 100 100" fill="var(--primary-color)">
          <circle cx="50" cy="50" r="50" />
          <path d="M 20 20 Q 50 50 20 80" stroke="#253a25" strokeWidth="6" fill="none" />
          <path d="M 80 20 Q 50 50 80 80" stroke="#253a25" strokeWidth="6" fill="none" />
        </svg>
      </div>

      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            Experience the Courtly Lifestyle 🎾
          </div>
          
          <h1 className={styles.title}>
            MORE THAN A <span className={styles.highlight}>COURT</span><br />
            <span className={styles.dash}>—</span> IT'S A LIFESTYLE
          </h1>
          
          <p className={styles.description}>
            Reach more players, manage bookings effortlessly, and grow your sports venue — all from one free platform.
          </p>
          
          <div className={styles.ctaGroup}>
            <button className={`${styles.btnCustom} ${styles.btnExplore}`}>
              Explore Courts
              <span className={styles.iconCircleWhite}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>
            <button className={`${styles.btnCustom} ${styles.btnTour}`}>
              <span className={styles.iconCircleDark}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </span>
              Take a Tour
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.imageWrapper}>
            <div className={styles.imagePlaceholder}>
              <Image 
                src="/hero_1.webp" 
                alt="Courtly Sports Action" 
                fill 
                className={styles.heroImageTag}
                priority
              />
            </div>
            
            <div className={styles.floatingStats}>
              <div className={styles.avatars}>
                <div className={styles.avatar} style={{backgroundColor: '#e6a88e'}}></div>
                <div className={styles.avatar} style={{backgroundColor: '#f1c40f'}}></div>
                <div className={styles.avatar} style={{backgroundColor: '#e74c3c'}}></div>
                <div className={styles.avatarCount}>240+</div>
              </div>
              <div className={styles.statsText}>
                Joined by 240+<br/>new members this<br/>month
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
