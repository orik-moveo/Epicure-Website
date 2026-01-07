import { CardVariant, CardSize } from './Card.types';
import styles from './Card.module.scss';

export function getCardClass(
  size: CardSize = CardSize.Large,
  variant?: CardVariant
): string {
  const classes = [styles.card];

  // Add size modifier
  switch (size) {
    case CardSize.Large:
      classes.push(styles['card--large']);
      break;
    case CardSize.Medium:
      classes.push(styles['card--medium']);
      break;
    case CardSize.Small:
      classes.push(styles['card--small']);
      break;
    case CardSize.XSmall:
      classes.push(styles['card--xsmall']);
      break;
  }

  // Add variant modifier
  if (variant === CardVariant.Dish) {
    classes.push(styles['card--dish']);
  }

  return classes.join(' ');
}

export function getImageContainerClass(): string {
  return styles.imageContainer;
}

export function getBottomSectionClass(): string {
  return styles.bottomSection;
}
