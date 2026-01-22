import { CartItemDishDto } from "../../../../shared/dto/cart/cartItemDish.dto";
import { CartItemResponseDto } from "../../../../shared/dto/cart/cartItemResponse.dto";
import { CartItem } from "../../../../shared/entities/cartItem.entity";
import { StrapiDishData } from "../../../../shared/types/strapiDish.types";

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
