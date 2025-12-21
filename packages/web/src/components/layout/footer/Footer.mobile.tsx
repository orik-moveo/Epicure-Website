'use client';

import { useTranslations } from 'next-intl';
import styles from './Footer.mobile.module.scss';

export default function FooterMobile() {
  const t = useTranslations('footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <span className={styles.link}>
            {t('contactUs')}
          </span>
          <span className={styles.link}>
            {t('termOfUse')}
          </span>
          <span className={styles.link}>
            {t('privacyPolicy')}
          </span>
        </div>
      </div>
    </footer>
  );
}
