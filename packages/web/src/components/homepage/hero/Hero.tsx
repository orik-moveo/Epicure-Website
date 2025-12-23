'use client';

import { useRef } from 'react';
import { useIsMobile } from '../../../hooks/useIsMobile';
import styles from './Hero.module.scss';

interface HeroProps {
  title: string;
  searchPlaceholder: string;
  backgroundImage: {
    url: string;
    width?: number;
    height?: number;
  };
}

export default function Hero({
  title,
  searchPlaceholder,
  backgroundImage,
}: HeroProps) {
  const isMobile = useIsMobile();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchBarClick = () => {
    searchInputRef.current?.focus();
  };

  if (!backgroundImage?.url) {
    console.error('Hero: backgroundImage.url is missing', backgroundImage);
    return null;
  }

  if (isMobile === null) {
    return null;
  }

  return (
    <section
      className={isMobile ? styles.mobile : styles.desktop}
      style={{
        backgroundImage: `url(${backgroundImage.url})`,
      }}
    >
      <div className={styles.centerInfo}>
        <h1 className={styles.title}>{title}</h1>
        <div
          className={styles.searchBar}
          onClick={handleSearchBarClick}
          tabIndex={0}
        >
          <img src="/assets/icons/search.svg" alt="Search" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder={searchPlaceholder}
            className={styles.searchInput}
          />
        </div>
      </div>
    </section>
  );
}
