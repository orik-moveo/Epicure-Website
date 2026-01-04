import { Restaurant } from '../../../../app/types/restaurants.types';

export function filterRestaurantsByRating(
  restaurants: Restaurant[],
  selectedRatings: number[]
): Restaurant[] {
  if (selectedRatings.length === 0) {
    return restaurants;
  }

  return restaurants.filter((restaurant) =>
    selectedRatings.includes(restaurant.rating)
  );
}

export function parseRatingParam(ratingParam: string | null): number[] {
  if (!ratingParam) {
    return [];
  }

  return ratingParam
    .split(',')
    .map((r) => parseInt(r.trim(), 10))
    .filter((r) => !isNaN(r) && r >= 1 && r <= 5);
}

export function parseRangeParam(
  rangeParam: string | null
): [number, number] | null {
  if (!rangeParam) {
    return null;
  }

  const parts = rangeParam.split(',');
  if (parts.length !== 2) {
    return null;
  }

  const min = parseInt(parts[0].trim(), 10);
  const max = parseInt(parts[1].trim(), 10);

  if (isNaN(min) || isNaN(max) || min > max) {
    return null;
  }

  return [min, max];
}

export function formatRangeForUrl(range: [number, number]): string {
  return `${range[0]},${range[1]}`;
}

export function filterRestaurantsByPriceRange(
  restaurants: Restaurant[],
  minPrice: number | null,
  maxPrice: number | null
): Restaurant[] {
  if (minPrice === null || maxPrice === null) {
    return restaurants;
  }

  return restaurants.filter((restaurant) => {
    return restaurant.minPrice <= maxPrice && restaurant.maxPrice >= minPrice;
  });
}

export function isDefaultRange(
  range: [number, number],
  min: number,
  max: number,
  initialValue?: [number, number]
): boolean {
  if (!initialValue) {
    return range[0] === min && range[1] === max;
  }
  return range[0] === initialValue[0] && range[1] === initialValue[1];
}

// for future use?
export function calculatePriceRange(
  restaurants: Array<{ minPrice: number; maxPrice: number }>,
  defaultMin: number = 0,
  defaultMax: number = 500
): { min: number; max: number } {
  if (restaurants.length === 0) {
    return { min: defaultMin, max: defaultMax };
  }

  const allMinPrices = restaurants.map((r) => r.minPrice);
  const allMaxPrices = restaurants.map((r) => r.maxPrice);

  const min = Math.min(...allMinPrices);
  const max = Math.max(...allMaxPrices);

  return { min, max };
}
