'use client';

import { useTranslation } from '../../../hooks/useTranslation';
import styles from './Footer.mobile.module.scss';

export default function FooterMobile() {
  const footer = useTranslation('footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <span className={styles.link}>
            {footer.contactUs}
          </span>
          <span className={styles.link}>
            {footer.termOfUse}
          </span>
          <span className={styles.link}>
            {footer.privacyPolicy}
          </span>
        </div>
      </div>
    </footer>
  );
}
