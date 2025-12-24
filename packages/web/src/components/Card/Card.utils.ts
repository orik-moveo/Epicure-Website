import { CardVariant } from './Card.types';
import styles from './Card.module.scss';

export function getCardClass(isMobile: boolean, variant?: CardVariant): string {
  if (isMobile) {
    if (variant === CardVariant.Dish) {
      return `${styles.mobileCard} ${styles.mobileCardDish}`;
    }
    if (variant === CardVariant.ChefRestaurant) {
      return `${styles.mobileCard} ${styles.mobileCardChefRestaurant}`;
    }
    return styles.mobileCard;
  }
  if (variant === CardVariant.Dish) {
    return `${styles.card} ${styles.cardDish}`;
  }
  if (variant === CardVariant.ChefRestaurant) {
    return `${styles.card} ${styles.cardChefRestaurant}`;
  }
  return styles.card;
}

export function getImageContainerClass(
  isMobile: boolean,
  variant?: CardVariant
): string {
  if (isMobile) {
    if (variant === CardVariant.Dish) {
      return `${styles.mobileImageContainer} ${styles.mobileImageContainerDish}`;
    }
    if (variant === CardVariant.ChefRestaurant) {
      return `${styles.mobileImageContainer} ${styles.mobileImageContainerChefRestaurant}`;
    }
    return styles.mobileImageContainer;
  }
  if (variant === CardVariant.Dish) {
    return `${styles.imageContainer} ${styles.cardDishImageContainer}`;
  }
  if (variant === CardVariant.ChefRestaurant) {
    return `${styles.imageContainer} ${styles.cardChefRestaurantImageContainer}`;
  }
  return styles.imageContainer;
}

export function getBottomSectionClass(
  isMobile: boolean,
  variant?: CardVariant
): string {
  if (isMobile) {
    if (variant === CardVariant.Dish) {
      return `${styles.mobileBottomSection} ${styles.mobileBottomSectionDish}`;
    }
    if (variant === CardVariant.ChefRestaurant) {
      return `${styles.mobileBottomSection} ${styles.mobileBottomSectionChefRestaurant}`;
    }
    return styles.mobileBottomSection;
  }
  if (variant === CardVariant.Dish) {
    return styles.bottomSectionDish;
  }
  if (variant === CardVariant.ChefRestaurant) {
    return styles.bottomSectionChefRestaurant;
  }
  return styles.bottomSection;
}
