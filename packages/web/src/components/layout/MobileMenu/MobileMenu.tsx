'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTranslation } from '../../../hooks/useTranslation';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const locale = useLocale();
  const nav = useTranslation('header.nav');
  const footer = useTranslation('footer');

  return (
    <div className={`${styles.menu} ${isOpen ? styles.open : styles.closed}`}>
      <div className={styles.topRow}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          <img src="/assets/icons/x.svg" alt="Close" />
        </button>
      </div>

      <div className={styles.navSection}>
        <Link
          href={`/${locale}/restaurants`}
          className={styles.navItem}
          onClick={onClose}
        >
          {nav.restaurants}
        </Link>
        <span className={styles.navItem}>{nav.chefs}</span>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.footerSection}>
        <span className={styles.footerItem}>{footer.contactUs}</span>
        <span className={styles.footerItem}>{footer.termOfUse}</span>
        <span className={styles.footerItem}>{footer.privacyPolicy}</span>
      </div>
    </div>
  );
}
