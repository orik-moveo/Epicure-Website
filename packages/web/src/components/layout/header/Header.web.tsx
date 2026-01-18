'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTranslation } from '../../../hooks/useTranslation';
import styles from './Header.web.module.scss';
import AuthDialog from '../../auth/authDialog';
import { useDialog } from '@/hooks/useDialog';

export default function HeaderWeb() {
  const locale = useLocale();
  const pathname = usePathname();
  const nav = useTranslation('header.nav');
  const search = useTranslation('header.search');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isAuthDialogOpen, openAuthDialog, closeAuthDialog } = useDialog();

  const isRestaurantsPage = pathname?.includes('/restaurants');

  const handleSearchBarClick = () => {
    searchInputRef.current?.focus();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/assets/icons/logo.svg" alt="Epicure" />
        </Link>

        <nav className={styles.nav}>
          <Link
            href={`/${locale}/restaurants`}
            className={`${styles.navLink} ${
              isRestaurantsPage ? styles.active : ''
            }`}
          >
            {nav.restaurants}
          </Link>
          <span className={styles.navLink}>{nav.chefs}</span>
        </nav>

        <div className={styles.rightSection}>
          <div
            className={styles.searchBar}
            onClick={handleSearchBarClick}
            tabIndex={0}
          >
            <img src="/assets/icons/search.svg" alt="Search" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder={search.placeholder}
              className={styles.searchInput}
            />
          </div>

          <button className={styles.iconButton} aria-label="User" onClick={openAuthDialog}>
            <img src="/assets/icons/user.svg" alt="User" />
          </button>

          <button className={styles.iconButton} aria-label="Shopping Bag">
            <img src="/assets/icons/shoppingbag.svg" alt="Shopping Bag" />
          </button>
        </div>
      </div>
      <AuthDialog open={isAuthDialogOpen} onClose={closeAuthDialog} />
    </header>
  );
}
