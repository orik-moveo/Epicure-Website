'use client';

import { useSearchParams } from 'next/navigation';
import { useIsMobile } from '../../../hooks/useIsMobile';
import { useTranslation } from '../../../hooks/useTranslation';
import { Restaurant, RestaurantLocation } from '../../types/restaurants.types';
import { FilterOption } from '../../types/filters.types';
import RestaurantCard from '../../../components/restaurants/RestaurantCard';
import RestaurantMapView from '../../../components/filters/primaryFilters/mapView/RestaurantMapView';
import PrimaryFilters from '../../../components/filters/primaryFilters/PrimaryFilters';
import SecondaryFilters from '../../../components/filters/secondaryFilters/SecondaryFilters';
import {
  filterRestaurantsByRating,
  parseRatingParam,
} from '../../../components/filters/secondaryFilters/utils/filterRestaurants';
import styles from './Restaurants.module.scss';

interface RestaurantsClientProps {
  data: {
    data?: Restaurant[];
  };
  locationsData?: {
    data?: RestaurantLocation[];
  };
  filter: FilterOption;
}

export default function RestaurantsClient({
  data,
  locationsData,
  filter,
}: RestaurantsClientProps) {
  const isMobile = useIsMobile();
  const translations = useTranslation('restaurants');
  const searchParams = useSearchParams();

  if (isMobile === null) {
    return null;
  }

  const allRestaurants = data?.data || [];

  // Parse rating filter from URL
  const ratingParam = searchParams.get('rating');
  const selectedRatings = parseRatingParam(ratingParam);

  // Apply rating filter
  const restaurants = filterRestaurantsByRating(
    allRestaurants,
    selectedRatings
  );

  return (
    <section className={isMobile ? styles.mobile : styles.desktop}>
      {isMobile && <h2 className={styles.title}>{translations.title}</h2>}
      <PrimaryFilters activeFilter={filter} />
      <SecondaryFilters />
      {filter === 'mapView' ? (
        <RestaurantMapView locations={locationsData?.data || []} />
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
