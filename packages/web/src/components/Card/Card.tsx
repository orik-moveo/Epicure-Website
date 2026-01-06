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
  size?: 'default' | 'small';
  middleContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}

export default function Card({
  image,
  title,
  subtitle,
  variant,
  size = 'default',
  middleContent,
  bottomContent,
}: CardProps) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  let cardClass = getCardClass(isMobile, variant);
  if (size === 'small' && variant === CardVariant.Dish) {
    if (isMobile) {
      cardClass += ` ${styles.mobileCardDishSmall}`;
    } else {
      cardClass += ` ${styles.cardDishSmall}`;
    }
  }
  let imageContainerClass = getImageContainerClass(isMobile, variant);
  let bottomSectionClass = getBottomSectionClass(isMobile, variant);

  if (isMobile && size === 'small' && variant === CardVariant.Dish) {
    imageContainerClass += ` ${styles.mobileImageContainerDishSmall}`;
    bottomSectionClass += ` ${styles.mobileBottomSectionDishSmall}`;
  }

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
