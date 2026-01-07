'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslation } from '../../../hooks/useTranslation';
import { Restaurant, RestaurantLocation } from '../../types/restaurants.types';
import { FilterOption } from '../../types/filters.types';
import RestaurantMapView from '../../../components/filters/primaryFilters/mapView/RestaurantMapView';
import PrimaryFilters from '../../../components/filters/primaryFilters/PrimaryFilters';
import SecondaryFilters from '../../../components/filters/secondaryFilters/SecondaryFilters';
import {
  filterRestaurantsByRating,
  parseRatingParam,
  filterRestaurantsByPriceRange,
  parseRangeParam,
  filterRestaurantsByDistance,
} from '../../../components/filters/secondaryFilters/utils/filterRestaurants';
import styles from './Restaurants.module.scss';
import { CardSize, CardVariant } from '@/components/Card/Card.types';
import Card from '@/components/Card/Card';

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
  const translations = useTranslation('restaurants');
  const searchParams = useSearchParams();

  const allRestaurants = data?.data || [];

  // Parse rating filter from URL
  const ratingParam = searchParams.get('rating');
  const selectedRatings = parseRatingParam(ratingParam);

  // Parse price range filter from URL
  const priceRangeParam = searchParams.get('priceRange');
  const priceRange = parseRangeParam(priceRangeParam);

  // Parse distance filter from URL
  const distanceParam = searchParams.get('distance');
  const distanceRange = parseRangeParam(distanceParam);

  // Parse user location from URL
  const userLatParam = searchParams.get('userLat');
  const userLngParam = searchParams.get('userLng');
  const userLat = userLatParam ? parseFloat(userLatParam) : null;
  const userLng = userLngParam ? parseFloat(userLngParam) : null;

  // Apply filters sequentially
  let restaurants = filterRestaurantsByRating(allRestaurants, selectedRatings);

  restaurants = filterRestaurantsByPriceRange(
    restaurants,
    priceRange?.[0] ?? null,
    priceRange?.[1] ?? null
  );

  restaurants = filterRestaurantsByDistance(
    restaurants,
    userLat,
    userLng,
    distanceRange?.[1] ?? null
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{translations.title}</h2>
      <PrimaryFilters activeFilter={filter} />
      <SecondaryFilters />
      {filter === 'mapView' ? (
        <RestaurantMapView locations={locationsData?.data || []} />
      ) : (
        <div className={styles.cardsContainer}>
          {restaurants.map((restaurant, index) => (
            <div key={index} className={styles.cardWrapper}>
              <Card
                variant={CardVariant.Restaurant}
                image={restaurant.image[0]}
                title={restaurant.name}
                chefName={restaurant.chef.name}
                rating={restaurant.rating}
                size={CardSize.Medium}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
