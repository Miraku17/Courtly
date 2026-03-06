import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        
        <div className={styles.leftLinks}>
          <Link href="#coach" className={styles.linkGroup}>
            <span>Find</span>
            <span>Courts</span>
          </Link>
          <Link href="#partner" className={styles.linkGroup}>
            <span>List Your</span>
            <span>Venue</span>
          </Link>
        </div>

        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <svg viewBox="0 0 24 24" fill="var(--primary-color)" width="24" height="24">
              <path d="M12 2C9.5 2 8 4 8 6.5C8 9 10.5 11 12 11C13.5 11 16 9 16 6.5C16 4 14.5 2 12 2ZM12 22C14.5 22 16 20 16 17.5C16 15 13.5 13 12 13C10.5 13 8 15 8 17.5C8 20 9.5 22 12 22ZM2 12C2 14.5 4 16 6.5 16C9 16 11 13.5 11 12C11 10.5 9 8 6.5 8C4 8 2 9.5 2 12ZM22 12C22 9.5 20 8 17.5 8C15 8 13 10.5 13 12C13 13.5 15 16 17.5 16C20 16 22 14.5 22 12Z" />
            </svg>
          </span>
          COURTLY
        </Link>

        <div className={styles.rightActions}>
          <Link href="#talk" className={styles.talkLink}>
            LET'S TALK
          </Link>
          <button className={styles.menuBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
