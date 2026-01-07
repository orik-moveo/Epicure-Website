import { Restaurant, OpeningHours } from '../../../types/restaurants.types';

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

export function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

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

export function isRestaurantOpen(
  restaurant: Restaurant,
  currentTime: Date
): boolean {
  if (!restaurant.openingHours || restaurant.openingHours.length === 0) {
    return false;
  }

  const currentDay = getDayOfWeek(currentTime);
  const currentTimeStr = formatTime(currentTime);

  const todayHours = restaurant.openingHours.find(
    (hours) => hours.day === currentDay
  );

  if (!todayHours) {
    return false; // Closed on this day
  }

  return isTimeBetween(currentTimeStr, todayHours.open, todayHours.close);
}
