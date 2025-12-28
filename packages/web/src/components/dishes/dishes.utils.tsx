import { Dish } from '../../app/types/dishes.types';

export function formatIngredients(ingredients: Dish['ingredients']): string {
  if (!ingredients || ingredients.length === 0) {
    return '';
  }
  return ingredients.map((item) => item.ingredient).join(', ');
}

export function formatPrice(price: number | undefined | null): string {
  if (price === undefined || price === null) {
    return '0';
  }
  return price.toString();
}

export function getDietIconPath(
  dietType: Dish['dietType'] | undefined | null
): string | null {
  if (!dietType || dietType === 'none') {
    return null;
  }

  return `/assets/icons/${dietType}.svg`;
}
