const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export async function getHomepage() {
  const response = await fetch(`${BACKEND_URL}/api/homepage`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch homepage');
  }
  return response.json();
}

export async function getRestaurants(filter?: string) {
  const url = new URL(`${BACKEND_URL}/api/restaurants`);
  if (filter && filter !== 'all') {
    url.searchParams.set('filter', filter);
  }

  const response = await fetch(url.toString(), {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants');
  }
  return response.json();
}

export async function getRestaurant(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/restaurants/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch restaurant');
  }
  return response.json();
}

export async function getRestaurantLocations() {
  const url = `${BACKEND_URL}/api/restaurants/locations`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour (3600 seconds)
  });

  if (!response.ok) {
    throw new Error('Failed to fetch restaurant locations');
  }
  return response.json();
}

export async function getDish(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/dishes/${id}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch dish');
  }
  return response.json();
}
