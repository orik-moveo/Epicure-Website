import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from '../../../shared/dto/cart/addToCart.dto';
import { UpdateCartItemDto } from '../../../shared/dto/cart/updateCartItem.dto';
import { MergeCartDto } from '../../../shared/dto/cart/mergeCart.dto';
import { AuthGuardJwt } from '../auth/guards/authGuardJwt';
import { GetUser } from '../auth/decorators/getUser.decorator';
import type { JwtPayload } from '../auth/interfaces/jwtPayload.interface';
import { CartItemResponseDto } from '../../../shared/dto/cart/cartItemResponse.dto';

@Controller('cart')
@UseGuards(AuthGuardJwt)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(
    @GetUser() jwtPayload: JwtPayload,
    @Body() addToCartDto: AddToCartDto
  ): Promise<CartItemResponseDto> {
    return this.cartService.addToCart(jwtPayload.sub, addToCartDto);
  }

  @Post('merge')
  async mergeCart(
    @GetUser() jwtPayload: JwtPayload,
    @Body() mergeCartDto: MergeCartDto
  ): Promise<CartItemResponseDto[]> {
    return this.cartService.mergeCart(jwtPayload.sub, mergeCartDto);
  }

  @Get()
  async getUserCart(@GetUser() jwtPayload: JwtPayload): Promise<CartItemResponseDto[]> {
    return this.cartService.getUserCart(jwtPayload.sub);
  }

  @Put(':id')
  async updateCartItem(
    @GetUser() jwtPayload: JwtPayload,
    @Param('id') cartItemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto
  ): Promise<CartItemResponseDto | null> {
    return this.cartService.updateCartItem(
      jwtPayload.sub,
      cartItemId,
      updateCartItemDto
    );
  }
}
