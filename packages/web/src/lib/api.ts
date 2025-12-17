const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

export async function getHomepage() {
  const response = await fetch(`${BACKEND_URL}/api/homepage`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch homepage');
  }
  return response.json();
}
