import { getRestaurants } from '../../../lib/api';
import RestaurantsClient from './RestaurantsClient';
import { FilterOption, isValidFilterOption } from '../../types/filters.types';

interface RestaurantsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ filter?: string | string[] }>;
}

export default async function RestaurantsPage({
  params,
  searchParams,
}: RestaurantsPageProps) {
  await params; // Await params for Next.js 15+
  const resolvedSearchParams = await searchParams;

  // Extract and validate filter from searchParams
  const filterParam = resolvedSearchParams.filter;
  const filter: FilterOption = isValidFilterOption(filterParam)
    ? filterParam
    : 'all';

  const data =
    filter === 'mapView' ? { data: [] } : await getRestaurants(filter);

  return (
    <main>
      <RestaurantsClient data={data} filter={filter} />
    </main>
  );
}
