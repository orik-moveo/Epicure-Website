'use client';

import { useIsMobile } from '../../../hooks/useIsMobile';
import { useTranslation } from '../../../hooks/useTranslation';
import { Restaurant } from '../../types/restaurants.types';
import { FilterOption } from '../../types/filters.types';
import RestaurantCard from '../../../components/restaurants/RestaurantCard';
import PrimaryFilters from '../../../components/filters/PrimaryFilters';
import SecondaryFilters from '../../../components/filters/SecondaryFilters';
import styles from './Restaurants.module.scss';

interface RestaurantsClientProps {
  data: {
    data?: Restaurant[];
  };
  filter: FilterOption;
}

export default function RestaurantsClient({
  data,
  filter,
}: RestaurantsClientProps) {
  const isMobile = useIsMobile();
  const translations = useTranslation('restaurants');

  if (isMobile === null) {
    return null;
  }

  const restaurants = data?.data || [];

  return (
    <section className={isMobile ? styles.mobile : styles.desktop}>
      {isMobile && <h2 className={styles.title}>{translations.title}</h2>}
      <PrimaryFilters activeFilter={filter} />
      <SecondaryFilters />
      {filter === 'mapView' ? (
        <div>Map View Placeholder</div>
      ) : (
        <div className={styles.cardsContainer}>
          {restaurants.map((restaurant, index) => (
            <div key={index} className={styles.cardWrapper}>
              <RestaurantCard
                image={restaurant.image[0]}
                name={restaurant.name}
                chefName={restaurant.chef.name}
                rating={restaurant.rating}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
