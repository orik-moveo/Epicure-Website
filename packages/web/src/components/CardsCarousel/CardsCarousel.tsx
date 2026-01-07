'use client';

import styles from './CardsCarousel.module.scss';

interface CardsCarouselProps {
  children: React.ReactNode;
}

export default function CardsCarousel({ children }: CardsCarouselProps) {
  return <div className={styles.carousel}>{children}</div>;
}
