'use client';

import { useIsMobile } from '../../hooks/useIsMobile';
import Card from '../Card/Card';
import { CardVariant } from '../Card/Card.types';
import { Dish } from '../../app/types/dishes.types';
import {
  formatIngredients,
  formatPrice,
  getDietIconPath,
} from './dishes.utils';
import styles from './DishCard.module.scss';

type DishCardProps = Omit<Dish, 'image'> & {
  image: Dish['image'][0];
};

export default function DishCard({
  image,
  name,
  ingredients,
  price,
  dietType,
}: DishCardProps) {
  const isMobile = useIsMobile();
  const ingredientsText = formatIngredients(ingredients);
  const priceText = formatPrice(price);
  const dietIconPath = getDietIconPath(dietType);

  const middleContent = dietIconPath ? (
    <img src={dietIconPath} alt={dietType} className={styles.dietIcon} />
  ) : null;

  const cardClassName = isMobile ? styles.mobileDishCard : '';

  return (
    <div className={cardClassName}>
      <Card
        image={image}
        title={name}
        subtitle={ingredientsText}
        variant={CardVariant.Dish}
        middleContent={middleContent}
        bottomContent={
          <div className={styles.priceContainer}>
            <img
              src="/assets/icons/shekel.svg"
              alt="Shekel"
              className={styles.shekelIcon}
            />
            <span className={styles.price}>{priceText}</span>
          </div>
        }
      />
    </div>
  );
}
