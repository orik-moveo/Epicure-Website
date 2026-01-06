'use client';

import { useSearchParams, useRouter, useParams } from 'next/navigation';
import { useIsMobile } from '../../../../hooks/useIsMobile';
import { useTranslation } from '../../../../hooks/useTranslation';
import { Restaurant } from '../../../types/restaurants.types';
import { Dish } from '../../../types/dishes.types';
import DishCard from '../../../../components/dishes/DishCard';
import { isRestaurantOpen } from './restaurant.utils';
import styles from './Restaurant.module.scss';

interface RestaurantClientProps {
  restaurant: Restaurant & {
    id?: number;
    documentId?: string;
    dishes?: Dish[];
  };
  meal?: string | string[];
}

export default function RestaurantClient({
  restaurant,
  meal,
}: RestaurantClientProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const translations = useTranslation('restaurant');

  if (isMobile === null) {
    return null;
  }

  const selectedMeal =
    typeof meal === 'string' ? meal : meal?.[0] || 'breakfast';

  const isOpen = isRestaurantOpen(restaurant, new Date());

  const filteredDishes =
    restaurant.dishes?.filter((dish) =>
      dish.meal_types?.some((mealType) => mealType.name === selectedMeal)
    ) || [];

  const locale = params.locale as string;

  const restaurantId = restaurant.documentId || (params.id as string);

  const handleMealClick = (mealType: string) => {
    const urlParams = new URLSearchParams(searchParams.toString());
    urlParams.set('meal', mealType);
    router.replace(
      `/${locale}/restaurants/${restaurantId}?${urlParams.toString()}`
    );
  };

  const mealTypes = ['breakfast', 'lunch', 'dinner'];

  return (
    <div className={isMobile ? styles.mobile : styles.desktop}>
      <div className={styles.headerImage}>
        {restaurant.image?.[0] && (
          <img
            src={restaurant.image[0].url}
            alt={restaurant.name}
            className={styles.image}
          />
        )}
      </div>

      <h1 className={styles.restaurantName}>{restaurant.name}</h1>
      <p className={styles.chefName}>{restaurant.chef.name}</p>
      <div className={styles.statusContainer}>
        <img
          src="/assets/icons/clock.svg"
          alt="Clock"
          className={styles.clockIcon}
        />
        <span className={styles.statusText}>
          {isOpen ? translations.openNow : translations.closedNow}
        </span>
      </div>

      <div className={styles.mealTabs}>
        {mealTypes.map((mealType) => (
          <button
            key={mealType}
            className={`${styles.mealTab} ${
              selectedMeal === mealType ? styles.active : ''
            }`}
            onClick={() => handleMealClick(mealType)}
          >
            {translations[mealType]}
          </button>
        ))}
      </div>

      <div className={styles.dishGrid}>
        {filteredDishes.map((dish, index) => (
          <DishCard
            key={(dish as any).documentId || index}
            image={dish.image?.[0] || { url: '' }}
            name={dish.name}
            ingredients={dish.ingredients}
            price={dish.price}
            dietType={dish.dietType}
            size="small"
          />
        ))}
      </div>
    </div>
  );
}
