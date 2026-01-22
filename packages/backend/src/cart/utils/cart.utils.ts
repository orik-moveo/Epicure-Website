import { CartItemDishDto } from "../../../../shared/dto/cart/cartItemDish.dto";
import { CartItemResponseDto } from "../../../../shared/dto/cart/cartItemResponse.dto";
import { CartItem } from "../../../../shared/entities/cartItem.entity";
import { StrapiDishData } from "../../../../shared/types/strapiDish.types";

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

  return (
    JSON.stringify(item1.sides) === JSON.stringify(item2.sides) &&
    JSON.stringify(item1.changes) === JSON.stringify(item2.changes)
  );
}

export function mapDishToDto(dishData: StrapiDishData | null | undefined): CartItemDishDto | null {
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
