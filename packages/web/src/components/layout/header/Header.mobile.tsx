'use client';

import Link from 'next/link';
import styles from './Header.mobile.module.css';

export default function HeaderMobile() {
  return (
    <header className={styles.header}>
      {/* Hamburger Icon */}
      <button className={styles.hamburgerButton} aria-label="Menu">
        <img src="/assets/icons/hamburger.svg" alt="Menu" />
      </button>

      {/* Logo - Centered */}
      <Link href="/" className={styles.logo}>
        <img src="/assets/icons/mobile-logo.svg" alt="Epicure" />
      </Link>

      {/* Right side: Search, User, Shopping Bag */}
      <div className={styles.rightSection}>
        <button className={styles.iconButton} aria-label="Search">
          <img src="/assets/icons/search.svg" alt="Search" />
        </button>
        <button className={styles.iconButton} aria-label="User">
          <img src="/assets/icons/user.svg" alt="User" />
        </button>
        <button className={styles.iconButton} aria-label="Shopping Bag">
          <img src="/assets/icons/shoppingbag.svg" alt="Shopping Bag" />
        </button>
      </div>
    </header>
  );
}
