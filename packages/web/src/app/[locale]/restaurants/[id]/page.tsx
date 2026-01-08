import { getRestaurant } from '@/lib/api';
import RestaurantClient from './RestaurantClient';
import { MealType } from '@/app/types/dishes.types';
import { redirect } from 'next/navigation';

interface RestaurantPageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{ meal?: string | string[] }>;
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

  return (
    <main>
      <RestaurantClient restaurant={data.data} meal={selectedMeal} />
    </main>
  );
}
