export interface StrapiDishImage {
  url: string;
  width?: number;
  height?: number;
}

export interface StrapiDishData {
  documentId: string;
  name: string;
  price: number;
  image?: StrapiDishImage[] | null;
}
