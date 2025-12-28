'use client';

import { useTranslation } from '../../../hooks/useTranslation';
import styles from './MobileMenu.module.scss';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
        <span className={styles.navItem}>{nav.restaurants}</span>
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
