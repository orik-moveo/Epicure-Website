export interface Restaurant {
  image: Array<{
    url: string;
    width?: number;
    height?: number;
  }>;
  name: string;
  chef: {
    name: string;
  };
  rating: number;
}
