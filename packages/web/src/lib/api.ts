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
