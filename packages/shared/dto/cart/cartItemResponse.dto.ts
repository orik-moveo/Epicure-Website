import { CartItemDishDto } from "./cartItemDish.dto";

export class CartItemResponseDto {
  id!: string;
  quantity!: number;
  sides!: string[] | null;
  changes!: string[] | null;

  dish!: CartItemDishDto | null;
}
