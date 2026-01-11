'use client';

import { useEffect, useState } from 'react';
import { Dish, MEAL_TYPES, MealType } from '@/app/types/dishes.types';
import { Restaurant } from '@/app/types/restaurants.types';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { isRestaurantOpen } from './restaurant.utils';
import Card from '@/components/Card/Card';
import { CardVariant, CardSize } from '@/components/Card/Card.types';
import styles from './RestaurantClient.module.scss';
import DishDialog from '@/components/dishes/DishDialog/DishDialog';

interface RestaurantClientProps {
  restaurant: Restaurant;
  meal?: MealType;
  initialDish?: Dish | null;
}

export default function RestaurantClient({
  restaurant,
  meal,
  initialDish = null,
}: RestaurantClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const translations = useTranslation('restaurant');

  const selectedMeal = meal;

  const [selectedDish, setSelectedDish] = useState<Dish | null>(initialDish);
  const [isDialogOpen, setIsDialogOpen] = useState(!!initialDish);

  const handleDishClick = (dishId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('dish', dishId);

    // Use push to trigger server component re-fetch
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const dishId = searchParams.get('dish');

    if (!dishId) {
      setSelectedDish(null);
      setIsDialogOpen(false);
      return;
    }

    if (initialDish && initialDish.documentId === dishId) {
      setSelectedDish(initialDish);
      setIsDialogOpen(true);
    } else {
      setSelectedDish(null);
      setIsDialogOpen(false);
    }
  }, [searchParams, initialDish]);

  const handleCloseDialog = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('dish');

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      { scroll: false }
    );
  };

  const filteredDishes =
    restaurant.dishes?.filter((dish) =>
      dish.meal_types?.some((m) => m.label === selectedMeal)
    ) || [];

  const handleMealClick = (mealType: MealType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('meal', mealType);
    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      { scroll: false }
    );
  };

  const isOpen = isRestaurantOpen(restaurant, new Date());

  return (
    <div className={styles.container}>
      {restaurant.image && restaurant.image[0] && (
        <img
          src={restaurant.image[0].url}
          alt={restaurant.name}
          className={styles.image}
        />
      )}

      <div className={styles.content}>
        <h1 className={`${styles.title} ${styles.gap24}`}>{restaurant.name}</h1>

        {restaurant.chef && (
          <p className={`${styles.subtitle} ${styles.gap16}`}>
            {restaurant.chef.name}
          </p>
        )}

        <div className={styles.statusContainer}>
          <img
            src="/assets/icons/clock.svg"
            alt="Clock"
            className={styles.statusIcon}
          />
          <span className={styles.statusText}>
            {isOpen ? translations.openNow : translations.closedNow}
          </span>
        </div>

        <div className={`${styles.mealTabs} ${styles.gap48}`}>
          {MEAL_TYPES.map((mealType) => (
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

        {filteredDishes && filteredDishes.length > 0 && (
          <div className={`${styles.cardsContainer} ${styles.gap30}`}>
            {filteredDishes.map((dish, index) => (
              <Card
                key={index}
                variant={CardVariant.Dish}
                size={CardSize.Small}
                image={dish.image[0]}
                title={dish.name}
                ingredients={dish.ingredients}
                price={dish.price}
                dietType={dish.dietType}
                onClick={() => handleDishClick(dish.documentId || '')}
              />
            ))}
          </div>
        )}
      </div>
      <DishDialog
        dish={selectedDish}
        open={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
}
