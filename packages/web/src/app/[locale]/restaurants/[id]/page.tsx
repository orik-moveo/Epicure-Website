import { getRestaurant } from '../../../../lib/api';
import RestaurantClient from './RestaurantClient';

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

  const data = await getRestaurant(resolvedParams.id);

  return (
    <main>
      <RestaurantClient
        restaurant={data.data}
        meal={resolvedSearchParams.meal}
      />
    </main>
  );
}
