'use client';

import { useIsMobile } from '../../../hooks/useIsMobile';
import { Dish } from '../../../app/types/dishes.types';
import CardsCarousel from '../../CardsCarousel/CardsCarousel';
import DishCard from '../../dishes/DishCard';
import styles from './PopularDishes.module.scss';

interface PopularDishesProps {
  title: string;
  dishes: Dish[];
}

export default function PopularDishes({ title, dishes }: PopularDishesProps) {
  const isMobile = useIsMobile();

  if (!dishes || dishes.length === 0) {
    return null;
  }

  if (isMobile === null) {
    return null;
  }

  return (
    <section className={isMobile ? styles.mobile : styles.desktop}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardsContainer}>
        <CardsCarousel>
          {dishes.map((dish, index) => (
            <DishCard
              key={index}
              image={dish.image[0]}
              name={dish.name}
              ingredients={dish.ingredients}
              price={dish.price}
              dietType={dish.dietType}
            />
          ))}
        </CardsCarousel>
      </div>
    </section>
  );
}
