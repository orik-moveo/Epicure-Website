'use client';

import { useIsMobile } from '../../hooks/useIsMobile';
import styles from './Card.module.scss';

interface CardImage {
  url: string;
  width?: number;
  height?: number;
}

interface CardProps {
  image: CardImage;
  title: string;
  subtitle: string;
  bottomContent?: React.ReactNode;
}

export default function Card({
  image,
  title,
  subtitle,
  bottomContent,
}: CardProps) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  return (
    <div className={isMobile ? styles.mobileCard : styles.card}>
      <div
        className={
          isMobile ? styles.mobileImageContainer : styles.imageContainer
        }
      >
        {image?.url && (
          <img src={image.url} alt={title} className={styles.image} />
        )}
      </div>
      <div
        className={isMobile ? styles.mobileBottomSection : styles.bottomSection}
      >
        <div className={styles.titleSubtitleContainer}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        {bottomContent && !isMobile && (
          <div className={styles.bottomContent}>{bottomContent}</div>
        )}
      </div>
    </div>
  );
}
