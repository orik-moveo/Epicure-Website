import {
  Restaurant,
  OpeningHours,
} from '../../../../web/src/app/types/restaurants.types';

export interface RestaurantData {
  data: Restaurant[];
}

//Get day of week in lowercase string format (sunday, monday, etc.)
export function getDayOfWeek(date: Date): OpeningHours['day'] {
  const days: OpeningHours['day'][] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  return days[date.getDay()];
}

//Format time as HH:mm string
export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

//Check if a time string is between two time strings (HH:mm format)
export function isTimeBetween(
  current: string,
  open: string,
  close: string
): boolean {
  const [currentHour, currentMin] = current.split(':').map(Number);
  const [openHour, openMin] = open.split(':').map(Number);
  const [closeHour, closeMin] = close.split(':').map(Number);

  const currentMinutes = currentHour * 60 + currentMin;
  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes;
}

//Check if a restaurant is currently open based on its opening hours
export function isRestaurantOpen(
  restaurant: Restaurant,
  currentTime: Date
): boolean {
  if (!restaurant.openingHours || restaurant.openingHours.length === 0) {
    return false;
  }

  const currentDay = getDayOfWeek(currentTime);
  const currentTimeStr = formatTime(currentTime);

  // Find opening hours for current day
  const todayHours = restaurant.openingHours.find(
    (hours) => hours.day === currentDay
  );

  if (!todayHours) {
    return false; // Closed on this day
  }

  // Check if current time is between open and close
  return isTimeBetween(currentTimeStr, todayHours.open, todayHours.close);
}

//Filter restaurants that are currently open based on openingHours
export function filterOpenNow(data: RestaurantData): RestaurantData {
  const now = new Date();
  const openRestaurants = data.data.filter((restaurant) =>
    isRestaurantOpen(restaurant, now)
  );

  return { data: openRestaurants };
}
