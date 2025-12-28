'use client';

import { useIsMobile } from '../../hooks/useIsMobile';
import { CardVariant } from './Card.types';
import {
  getCardClass,
  getImageContainerClass,
  getBottomSectionClass,
} from './Card.utils';
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
  variant?: CardVariant;
  middleContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export default function Card({
  image,
  title,
  subtitle,
  variant,
  middleContent,
  bottomContent,
}: CardProps) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  const cardClass = getCardClass(isMobile, variant);
  const imageContainerClass = getImageContainerClass(isMobile, variant);
  const bottomSectionClass = getBottomSectionClass(isMobile, variant);

  return (
    <div className={cardClass}>
      <div className={imageContainerClass}>
        {image?.url && (
          <img src={image.url} alt={title} className={styles.image} />
        )}
      </div>
      <div className={bottomSectionClass}>
        {isMobile && variant === CardVariant.Dish ? (
          <>
            <div className={styles.titleSubtitleContainer}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
            {(middleContent || bottomContent) && (
              <div className={styles.mobileDishBottomWrapper}>
                {middleContent && (
                  <div className={styles.middleContent}>{middleContent}</div>
                )}
                {bottomContent && (
                  <div className={styles.bottomContent}>{bottomContent}</div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div className={styles.titleSubtitleContainer}>
              <h3 className={styles.title}>{title}</h3>
              {middleContent ? (
                <div className={styles.middleContent}>{middleContent}</div>
              ) : variant === CardVariant.Dish ? (
                <div className={styles.middleContent}></div>
              ) : null}
              <p className={styles.subtitle}>{subtitle}</p>
            </div>
            {bottomContent && !isMobile && (
              <div className={styles.bottomContent}>{bottomContent}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
