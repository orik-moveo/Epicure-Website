'use client';

import Image from 'next/image';
import styles from './FilterToggleButton.module.scss';

export interface FilterToggleButtonProps {
  label: string;
  isOpen: boolean;
  onClick: () => void;
  isMobile: boolean | null;
}

export default function FilterToggleButton({
  label,
  isOpen,
  onClick,
  isMobile,
}: FilterToggleButtonProps) {
  if (isMobile === null) {
    return null;
  }

  return (
    <button
      className={`${styles.filterButton} ${
        isMobile ? styles.mobile : styles.desktop
      } ${isOpen ? styles.isOpen : ''}`}
      onClick={onClick}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {label}
      <Image
        src="/assets/icons/arrow.svg"
        alt=""
        width={24}
        height={24}
        className={styles.arrowIcon}
      />
    </button>
  );
}
