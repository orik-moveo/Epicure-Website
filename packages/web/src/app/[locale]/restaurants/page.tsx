import { getRestaurants } from '../../../lib/api';
import RestaurantsClient from './RestaurantsClient';

export default async function RestaurantsPage() {
  const data = await getRestaurants();

  return (
    <main>
      <RestaurantsClient data={data} />
    </main>
  );
}
