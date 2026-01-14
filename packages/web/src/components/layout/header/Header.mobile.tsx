'use client';

import { useState } from 'react';
import Link from 'next/link';
import MobileMenu from '../MobileMenu/MobileMenu';
import styles from './Header.mobile.module.scss';
import AuthDialog from '../../auth/authDialog';

export default function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        {/* Hamburger Icon */}
        <button
          className={styles.hamburgerButton}
          aria-label="Menu"
          onClick={handleMenuToggle}
        >
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
          <button className={styles.iconButton} aria-label="User" onClick={() => setIsAuthDialogOpen(true)}>
            <img src="/assets/icons/user.svg" alt="User" />
          </button>
          <button className={styles.iconButton} aria-label="Shopping Bag">
            <img src="/assets/icons/shoppingbag.svg" alt="Shopping Bag" />
          </button>
        </div>
      </header>
      <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
      <AuthDialog open={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)} />
    </>
  );
}
