'use client';

import { useIsMobile } from '../../hooks/useIsMobile';
import { CardVariant, CardSize } from './Card.types';
import {
  getCardClass,
  getImageContainerClass,
  getBottomSectionClass,
} from './Card.utils';
import styles from './Card.module.scss';
import { Dish } from '@/app/types/dishes.types';
import {
  formatIngredients,
  getDietIconPath,
  formatPrice,
} from '../dishes/dishes.utils';
import { renderStars } from '../restaurants/restaurants.utils';

interface CardImage {
  url: string;
  width?: number;
  height?: number;
}

interface CardProps {
  variant: CardVariant;
  size?: CardSize;
  image: CardImage;
  title: string;
  chefName?: string;
  rating?: number;
  ingredients?: Dish['ingredients'];
  price?: number;
  dietType?: Dish['dietType'];
}

export default function Card(props: CardProps) {
  const {
    variant,
    size = CardSize.Large,
    image,
    title,
    chefName,
    rating,
    ingredients,
    price,
    dietType,
  } = props;

  const isMobile = useIsMobile();
  if (isMobile === null) return null;

  const subtitleText =
    variant === CardVariant.Dish
      ? formatIngredients(ingredients || [])
      : chefName || '';

  const dietIconPath =
    variant === CardVariant.Dish ? getDietIconPath(dietType) : null;

  const bottomContent =
    variant === CardVariant.Dish ? (
      <div className={styles.priceContainer}>
        <img
          src="/assets/icons/shekel.svg"
          alt="Shekel"
          className={styles.shekelIcon}
        />
        <span className={styles.price}>{formatPrice(price)}</span>
      </div>
    ) : (
      <div className={styles.starsContainer}>
        {renderStars({ rating: rating || 0, starClassName: styles.star })}
      </div>
    );

  const showSubtitle = size !== CardSize.XSmall;
  const showMiddleContent = size === CardSize.Large || size === CardSize.Small;
  const showBottomContent =
    size === CardSize.Large ||
    size === CardSize.Medium ||
    size === CardSize.Small;

  const cardClass = getCardClass(size, variant);
  const imageContainerClass = getImageContainerClass();
  const bottomSectionClass = getBottomSectionClass();

  return (
    <div className={cardClass}>
      <div className={imageContainerClass}>
        {image?.url && (
          <img src={image.url} alt={title} className={styles.image} />
        )}
      </div>

      <div className={bottomSectionClass}>
        <div className={styles.topWrapper}>
          <div className={styles.titleSubtitleContainer}>
            <h3 className={styles.title}>{title}</h3>
            {showSubtitle && <p className={styles.subtitle}>{subtitleText}</p>}
          </div>

          {!isMobile && showMiddleContent && dietIconPath && (
            <div className={styles.middleContent}>
              <img src={dietIconPath} alt="diet" className={styles.dietIcon} />
            </div>
          )}
        </div>

        <div className={styles.bottomWrapper}>
          {isMobile && variant === CardVariant.Dish ? (
            <div className={styles.mobileDishBottomWrapper}>
              {showMiddleContent && dietIconPath && (
                <div className={styles.middleContent}>
                  <img
                    src={dietIconPath}
                    alt="diet"
                    className={styles.dietIcon}
                  />
                </div>
              )}
              {showBottomContent && (
                <div className={styles.bottomContent}>{bottomContent}</div>
              )}
            </div>
          ) : (
            <>
              {showBottomContent && bottomContent && !isMobile && (
                <div className={styles.bottomContent}>{bottomContent}</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
