export enum MealType {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
}

export const MEAL_TYPES: MealType[] = [
  MealType.Breakfast,
  MealType.Lunch,
  MealType.Dinner,
];
export interface Dish {
  image: Array<{
    url: string;
    width?: number;
    height?: number;
  }>;
  name: string;
  ingredients: Array<{
    ingredient: string;
  }>;
  price: number;
  dietType: 'none' | 'spicy' | 'vegetarian' | 'vegan';
  meal_types?: Array<{
    label?: MealType;
  }>;
}
