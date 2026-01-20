import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from '@/app/types/auth.types';
import { API_ENDPOINTS } from './apiEndpoints';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

function createDefaultOptions(options?: RequestInit): RequestInit {
  return {
    ...options,
    credentials: 'include',
    headers: {
      'x-requested-with': 'XMLHttpRequest',
      ...(options?.body && { 'Content-Type': 'application/json' }),
      ...options?.headers,
    },
  };
}

export async function getHomepage() {
  const response = await fetch(`${BACKEND_URL}${API_ENDPOINTS.HOMEPAGE}`,
    createDefaultOptions({cache: 'no-store',})
  );
  if (!response.ok) {
    throw new Error('Failed to fetch homepage');
  }
  const json = await response.json();
  const data = json.data;

  return {
    hero: data.hero,
    popularRestaurants: data.popularRestaurants,
    popularDishes: data.popularDishes,
    chefOfWeek: data.chefOfWeek,
    about: data.about,
  };
}

export async function getRestaurants(filter?: string) {
  const url = new URL(`${BACKEND_URL}${API_ENDPOINTS.RESTAURANTS}`);
  if (filter && filter !== 'all') {
    url.searchParams.set('filter', filter);
  }

  const response = await fetch(url.toString(),
    createDefaultOptions({cache: 'no-store',})
  );
  if (!response.ok) {
    throw new Error('Failed to fetch restaurants');
  }
  return response.json();
}

export async function getRestaurant(id: string) {
  const response = await fetch(`${BACKEND_URL}${API_ENDPOINTS.RESTAURANT_BY_ID(id)}`,
    createDefaultOptions({cache: 'no-store',})
  );
  if (!response.ok) {
    throw new Error('Failed to fetch restaurant');
  }
  const json = await response.json();
  return json.data;
}

export async function getRestaurantLocations() {
  const url = `${BACKEND_URL}${API_ENDPOINTS.RESTAURANT_LOCATIONS}`;

  const response = await fetch(url,
    createDefaultOptions({next: { revalidate: 3600 },})
  );

  if (!response.ok) {
    throw new Error('Failed to fetch restaurant locations');
  }
  return response.json();
}

export async function getDish(id: string) {
  const response = await fetch(`${BACKEND_URL}${API_ENDPOINTS.DISH_BY_ID(id)}`,
    createDefaultOptions({cache: 'no-store',})
  );
  if (!response.ok) {
    throw new Error('Failed to fetch dish');
  }
  const json = await response.json();

  return json.data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${BACKEND_URL}${API_ENDPOINTS.AUTH.LOGIN}`, 
    createDefaultOptions({
    method: 'POST',
    body: JSON.stringify(payload),
  }));

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${BACKEND_URL}${API_ENDPOINTS.AUTH.REGISTER}`, 
    createDefaultOptions({
    method: 'POST',
    body: JSON.stringify(payload),
  }));
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return response.json();
}

export async function logout(): Promise<void> {
  const response = await fetch(`${BACKEND_URL}${API_ENDPOINTS.AUTH.LOGOUT}`, 
    createDefaultOptions({
    method: 'POST',
  }));
  if (!response.ok) {
    throw new Error('Logout failed');
  }
}

export async function getMe(){
  const response = await fetch(`${BACKEND_URL}${API_ENDPOINTS.AUTH.ME}`, 
    createDefaultOptions({
    method: 'GET',
  }));
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}