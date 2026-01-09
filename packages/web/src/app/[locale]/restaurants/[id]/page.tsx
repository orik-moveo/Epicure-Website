import { getRestaurant, getDish } from '@/lib/api';
import RestaurantClient from './RestaurantClient';
import { MealType } from '@/app/types/dishes.types';
import { redirect } from 'next/navigation';

interface RestaurantPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ meal?: string | string[]; dish?: string }>;
}

export default async function RestaurantPage({
  params,
  searchParams,
}: RestaurantPageProps) {
  await params; // Await params for Next.js 15+
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  if (!resolvedSearchParams.meal) {
    redirect(
      `/${resolvedParams.locale}/restaurants/${resolvedParams.id}?meal=${MealType.Breakfast}`
    );
  }

  const mealParam = resolvedSearchParams.meal;

  const selectedMeal: MealType =
    typeof mealParam === 'string' &&
    Object.values(MealType).includes(mealParam as MealType)
      ? (mealParam as MealType)
      : MealType.Breakfast;

  const data = await getRestaurant(resolvedParams.id);

  let selectedDish = null;
  if (resolvedSearchParams.dish) {
    try {
      const dishResponse = await getDish(resolvedSearchParams.dish);
      selectedDish = dishResponse.data;
    } catch (error) {
      console.error('Failed to fetch dish on server:', error);
    }
  }

  return (
    <main>
      <RestaurantClient
        restaurant={data.data}
        meal={selectedMeal}
        initialDish={selectedDish}
      />
    </main>
  );
}
