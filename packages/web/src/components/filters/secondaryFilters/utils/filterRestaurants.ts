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
