'use client';

import { useIsMobile } from '../../../hooks/useIsMobile';
import { useTranslation } from '../../../hooks/useTranslation';
import { Restaurant } from '../../../app/types/restaurants.types';
import CardsCarousel from '../../CardsCarousel/CardsCarousel';
import RestaurantCard from '../../restaurants/RestaurantCard';
import styles from './PopularRestaurants.module.scss';

interface PopularRestaurantsProps {
  title: string;
  restaurants: Restaurant[];
}

export default function PopularRestaurants({
  title,
  restaurants,
}: PopularRestaurantsProps) {
  const isMobile = useIsMobile();
  const popularRestaurants = useTranslation('popularRestaurants');

  if (!restaurants || restaurants.length === 0) {
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
          {restaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              image={restaurant.image[0]}
              name={restaurant.name}
              chefName={restaurant.chef.name}
              rating={restaurant.rating}
            />
          ))}
        </CardsCarousel>
      </div>
      {!isMobile && (
        <div className={styles.allRestaurantsLink}>
          {popularRestaurants.allRestaurants}
        </div>
      )}
    </section>
  );
}
