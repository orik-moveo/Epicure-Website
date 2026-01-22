import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../../../shared/entities/cartItem.entity';
import { AddToCartDto } from '../../../shared/dto/cart/addToCart.dto';
import { UpdateCartItemDto } from '../../../shared/dto/cart/updateCartItem.dto';
import { MergeCartDto } from '../../../shared/dto/cart/mergeCart.dto';
import { normalizeArray, itemsMatch } from '../../../shared/utils/cart.utils';
import { mapDishToDto, mapCartItemToResponseDto } from './utils/cart.utils';
import { CartItemResponseDto } from '../../../shared/dto/cart/cartItemResponse.dto';
import { DishService } from '../dish/dish.service';
import { CartItemDishDto } from '../../../shared/dto/cart/cartItemDish.dto';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
    private readonly dishService: DishService
  ) {}

  private async fetchDishData(dishId: string): Promise<CartItemDishDto | null> {
    try {
      const dishResponse = await this.dishService.getOne(dishId);
      if (!dishResponse?.data) {
        this.logger.warn(`Dish not found for dishId: ${dishId}`);
        return null;
      }
      return mapDishToDto(dishResponse.data);
    } catch (error) {
      this.logger.error(
        `Failed to fetch dish data for dishId: ${dishId}`,
        error instanceof Error ? error.stack : String(error)
      );
      return null;
    }
  }

  private async mapCartItemToResponse(item: CartItem)
  : Promise<CartItemResponseDto> {
    const dish = await this.fetchDishData(item.dishId);
    return mapCartItemToResponseDto(item, dish);
  }

  async addToCart(
    userId: string,
    addToCartDto: AddToCartDto
  ): Promise<CartItemResponseDto> {
    const { dishId, quantity, sides, changes } = addToCartDto;

    const dish = await this.fetchDishData(dishId);
    if (!dish) {
      throw new NotFoundException(`Dish with id ${dishId} does not exist`);
    }

    const normalizedSides = normalizeArray(sides);
    const normalizedChanges = normalizeArray(changes);

    const existingItems = await this.cartRepository.find({
      where: { userId, dishId },
    });

    const exactMatch = existingItems.find((item) =>
      itemsMatch(
        { dishId, sides: normalizedSides, changes: normalizedChanges },
        { dishId: item.dishId, sides: item.sides, changes: item.changes }
      )
    );

    let savedCartItem: CartItem;

    if (exactMatch) {
      exactMatch.quantity += quantity;
      savedCartItem = await this.cartRepository.save(exactMatch);
    } else {
      const cartItem = this.cartRepository.create({
        userId,
        dishId,
        quantity,
        sides: normalizedSides,
        changes: normalizedChanges,
      });
      savedCartItem = await this.cartRepository.save(cartItem);
    }

    return this.mapCartItemToResponse(savedCartItem);
  }

  async updateCartItem(
    userId: string,
    cartItemId: string,
    updateCartItemDto: UpdateCartItemDto
  ): Promise<CartItemResponseDto | null> {
    const { quantity } = updateCartItemDto;

    const cartItem = await this.cartRepository.findOne({
      where: { id: cartItemId, userId },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (quantity === 0) {
      await this.cartRepository.remove(cartItem);
      return null;
    }

    cartItem.quantity = quantity;
    const savedCartItem = await this.cartRepository.save(cartItem);

    return this.mapCartItemToResponse(savedCartItem);
  }

  async getUserCart(userId: string): Promise<CartItemResponseDto[]> {
    const cartItems = await this.cartRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });

    if (cartItems.length === 0) return [];

    const dishIds = [...new Set(cartItems.map((item) => item.dishId))];

    let dishesMap = new Map<string, CartItemDishDto>();
    try {
      const dishesResponse = await this.dishService.getMany(dishIds);
      const dishesData = dishesResponse?.data ?? [];

      dishesData.forEach((dish: any) => {
        if (dish?.documentId) {
          const dishDto = mapDishToDto(dish);
          if (dishDto) {
            dishesMap.set(dish.documentId, dishDto);
          }
        }
      });
    } catch (error) {
      this.logger.error(
        `Failed to fetch dishes in bulk for userId: ${userId}`,
        error instanceof Error ? error.stack : String(error)
      );
    }

    const results: CartItemResponseDto[] = [];
    const itemsToRemove: CartItem[] = [];

    for (const item of cartItems) {
      const dishDto = dishesMap.get(item.dishId);
      if (!dishDto) {
        itemsToRemove.push(item);
        continue;
      }
      results.push(mapCartItemToResponseDto(item, dishDto));
    }

    if (itemsToRemove.length > 0) {
      await this.cartRepository.remove(itemsToRemove);
    }

    return results;
  }

  async removeCartItem(userId: string, cartItemId: string): Promise<void> {
    const cartItem = await this.cartRepository.findOne({
      where: {id: cartItemId,userId,},
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepository.remove(cartItem);
  }

  async mergeCart(
    userId: string,
    mergeCartDto: MergeCartDto
  ): Promise<CartItemResponseDto[]> {
    const { items: localItems } = mergeCartDto;

    for (const localItem of localItems) {
      try {
        await this.addToCart(userId, localItem);
      } catch (error) {
        this.logger.error(
          `Failed to add item to cart during merge for userId:
           ${userId}, dishId: ${localItem.dishId}`,
          error instanceof Error ? error.stack : String(error)
        );
      }    
    }

    return this.getUserCart(userId);
  }
}


