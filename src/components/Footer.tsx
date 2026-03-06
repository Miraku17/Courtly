import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.info}>
          <Link href="/" className={styles.logo}>
            Courtly
          </Link>
          <p>The easiest way to book or list sports courts online.</p>
        </div>
        
        <div className={styles.links}>
          <h4>Company</h4>
          <ul>
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Contact</Link></li>
            <li><Link href="#">FAQ</Link></li>
          </ul>
        </div>
        
        <div className={styles.links}>
          <h4>Legal</h4>
          <ul>
            <li><Link href="#">Terms of Service</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>
        
        <div className={styles.newsletter}>
          <h4>Newsletter</h4>
          <p>Subscribe for updates and court tips.</p>
          <form className={styles.form}>
            <input type="email" placeholder="Email Address" required />
            <button type="submit" className="btn btn-primary">Join</button>
          </form>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Courtly. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
