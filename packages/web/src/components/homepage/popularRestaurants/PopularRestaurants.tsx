'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTranslation } from '../../../hooks/useTranslation';
import { Restaurant } from '../../../app/types/restaurants.types';
import CardsCarousel from '../../CardsCarousel/CardsCarousel';
import styles from './PopularRestaurants.module.scss';
import { CardSize, CardVariant } from '@/components/Card/Card.types';
import Card from '@/components/Card/Card';

interface PopularRestaurantsProps {
  title: string;
  restaurants: Restaurant[];
}

export default function PopularRestaurants({
  title,
  restaurants,
}: PopularRestaurantsProps) {
  const locale = useLocale();
  const popularRestaurants = useTranslation('popularRestaurants');

  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardsContainer}>
        <CardsCarousel>
          {restaurants.map((restaurant, index) => (
            <Card
              key={index}
              variant={CardVariant.Restaurant}
              image={restaurant.image[0]}
              title={restaurant.name}
              chefName={restaurant.chef.name}
              rating={restaurant.rating}
              size={CardSize.Medium}
            />
          ))}
        </CardsCarousel>
      </div>
      <Link
        href={`/${locale}/restaurants`}
        className={styles.allRestaurantsLink}
      >
        {popularRestaurants.allRestaurants}
      </Link>
    </section>
  );
}
