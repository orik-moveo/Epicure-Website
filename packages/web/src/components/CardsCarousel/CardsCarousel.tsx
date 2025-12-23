'use client';

import { useIsMobile } from '../../hooks/useIsMobile';
import styles from './CardsCarousel.module.scss';

interface CardsCarouselProps {
  children: React.ReactNode;
}

export default function CardsCarousel({ children }: CardsCarouselProps) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  return (
    <div className={isMobile ? styles.mobile : styles.desktop}>
      {children}
    </div>
  );
}

