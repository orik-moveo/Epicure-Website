import { CardVariant } from './Card.types';
import styles from './Card.module.scss';

export function getCardClass(isMobile: boolean, variant?: CardVariant): string {
  if (isMobile) {
    return variant === CardVariant.Dish
      ? `${styles.mobileCard} ${styles.mobileCardDish}`
      : styles.mobileCard;
  }
  return variant === CardVariant.Dish
    ? `${styles.card} ${styles.cardDish}`
    : styles.card;
}

export function getImageContainerClass(
  isMobile: boolean,
  variant?: CardVariant
): string {
  if (isMobile) {
    return variant === CardVariant.Dish
      ? `${styles.mobileImageContainer} ${styles.mobileImageContainerDish}`
      : styles.mobileImageContainer;
  }
  return variant === CardVariant.Dish
    ? `${styles.imageContainer} ${styles.cardDishImageContainer}`
    : styles.imageContainer;
}

export function getBottomSectionClass(
  isMobile: boolean,
  variant?: CardVariant
): string {
  if (isMobile) {
    return variant === CardVariant.Dish
      ? `${styles.mobileBottomSection} ${styles.mobileBottomSectionDish}`
      : styles.mobileBottomSection;
  }
  return variant === CardVariant.Dish
    ? styles.bottomSectionDish
    : styles.bottomSection;
}
