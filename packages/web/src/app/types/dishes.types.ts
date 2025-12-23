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
}
