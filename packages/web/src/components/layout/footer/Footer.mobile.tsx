'use client';

import styles from './Footer.mobile.module.scss';

export default function FooterMobile() {
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
