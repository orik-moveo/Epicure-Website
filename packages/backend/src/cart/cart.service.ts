import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from '../../../shared/entities/cartItem.entity';
import { AddToCartDto } from '../../../shared/dto/cart/addToCart.dto';
import { UpdateCartItemDto } from '../../../shared/dto/cart/updateCartItem.dto';
import { MergeCartDto } from '../../../shared/dto/cart/mergeCart.dto';
import { normalizeArray, itemsMatch, mapDishToDto, mapCartItemToResponseDto } from './utils/cart.utils';
import { CartItemResponseDto } from '../../../shared/dto/cart/cartItemResponse.dto';
import { DishService } from '../dish/dish.service';
import { CartItemDishDto } from '../../../shared/dto/cart/cartItemDish.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartRepository: Repository<CartItem>,
    private readonly dishService: DishService
  ) {}

  private async fetchDishData(dishId: string): Promise<CartItemDishDto | null> {
    try {
      const dishResponse = await this.dishService.getOne(dishId);
      if (!dishResponse?.data) {
        return null;
      }
      return mapDishToDto(dishResponse.data);
    } catch (error) {
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

    const cartItemsWithDishes = await Promise.all(
      cartItems.map(async (item) => {
        const dish = await this.fetchDishData(item.dishId);

        if (!dish) {
          await this.cartRepository.remove(item);
          return null;
        }

        return mapCartItemToResponseDto(item, dish);
      })
    );

    return cartItemsWithDishes.filter(
      (item): item is CartItemResponseDto => item !== null
    );
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
      await this.addToCart(userId, localItem);
    }

    return this.getUserCart(userId);
  }
}


