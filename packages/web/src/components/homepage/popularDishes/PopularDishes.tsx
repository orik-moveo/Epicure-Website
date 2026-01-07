'use client';

import { Dish } from '../../../app/types/dishes.types';
import CardsCarousel from '../../CardsCarousel/CardsCarousel';
import styles from './PopularDishes.module.scss';
import { CardSize, CardVariant } from '@/components/Card/Card.types';
import Card from '@/components/Card/Card';

interface PopularDishesProps {
  title: string;
  dishes: Dish[];
}

export default function PopularDishes({ title, dishes }: PopularDishesProps) {
  if (!dishes || dishes.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardsContainer}>
        <CardsCarousel>
          {dishes.map((dish, index) => (
            <Card
              key={index}
              variant={CardVariant.Dish}
              image={dish.image[0]}
              title={dish.name}
              ingredients={dish.ingredients}
              price={dish.price}
              dietType={dish.dietType}
              size={CardSize.Large}
            />
          ))}
        </CardsCarousel>
      </div>
    </section>
  );
}
