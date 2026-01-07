export enum CardVariant {
  Restaurant = 'restaurant',
  Dish = 'dish',
}

export enum CardSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
  XSmall = 'xsmall',
}

export interface CardImage {
  url: string;
  width?: number;
  height?: number;
}

type CommonCardProps = {
  size?: CardSize;
  className?: string;
};

export type DishCardProps = CommonCardProps & {
  variant: CardVariant.Dish;
  image: CardImage;
  name: string;
  ingredients: string[];
  price: number;
  dietType?: string;
};

export type RestaurantCardProps = CommonCardProps & {
  variant: CardVariant.Restaurant;
  image: CardImage;
  name: string;
  chefName: string;
  rating: number;
};

export type CardProps = DishCardProps | RestaurantCardProps;
