'use client';

import styles from './Footer.web.module.scss';

export default function FooterWeb() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <span className={styles.link}>
            Contact Us
          </span>
          <span className={styles.link}>
            Term of Use
          </span>
          <span className={styles.link}>
            Privacy Policy
          </span>
        </div>
      </div>
    </footer>
  );
}
