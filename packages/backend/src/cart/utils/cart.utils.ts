import { CartItemDishDto } from "../../../../shared/dto/cart/cartItemDish.dto";
import { CartItemResponseDto } from "../../../../shared/dto/cart/cartItemResponse.dto";
import { CartItem } from "../../../../shared/entities/cartItem.entity";

export function normalizeArray(
  arr: string[] | null | undefined
): string[] | null {
  if (!arr || arr.length === 0) return null;
  return [...arr].sort();
}

export function itemsMatch(
  item1: { dishId: string; sides: string[] | null; changes: string[] | null },
  item2: { dishId: string; sides: string[] | null; changes: string[] | null }
): boolean {
  if (item1.dishId !== item2.dishId) return false;

  const sides1 = normalizeArray(item1.sides);
  const sides2 = normalizeArray(item2.sides);
  const changes1 = normalizeArray(item1.changes);
  const changes2 = normalizeArray(item2.changes);

  return (
    JSON.stringify(sides1) === JSON.stringify(sides2) &&
    JSON.stringify(changes1) === JSON.stringify(changes2)
  );
}

export function mapDishToDto(dishData: any): CartItemDishDto | null {
    if (!dishData) return null;

    const imageUrl =
      dishData.image && Array.isArray(dishData.image) && dishData.image.length > 0
        ? dishData.image[0].url
        : null;

    return {
      documentId: dishData.documentId,
      name: dishData.name,
      price: dishData.price,
      image: imageUrl,
    };
  }

  export function mapCartItemToResponseDto(
    item: CartItem,
    dish: CartItemDishDto | null
  ): CartItemResponseDto {
    return {
      id: item.id,
      quantity: item.quantity,
      sides: item.sides,
      changes: item.changes,
      dish,
    };
  }
