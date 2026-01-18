export const API_ENDPOINTS = {
  HOMEPAGE: '/api/homepage',
  RESTAURANTS: '/api/restaurants',
  RESTAURANT_BY_ID: (id: string) => `/api/restaurants/${id}`,
  RESTAURANT_LOCATIONS: '/api/restaurants/locations',
  DISH_BY_ID: (id: string) => `/api/dishes/${id}`,
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
  },
} as const;
