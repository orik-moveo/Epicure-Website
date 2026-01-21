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

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(AuthGuardJwt)
  async addToCart(
    @GetUser() jwtPayload: JwtPayload,
    @Body() addToCartDto: AddToCartDto
  ) {
    return this.cartService.addToCart(jwtPayload.sub, addToCartDto);
  }

  @Post('merge')
  @UseGuards(AuthGuardJwt)
  async mergeCart(
    @GetUser() jwtPayload: JwtPayload,
    @Body() mergeCartDto: MergeCartDto
  ) {
    return this.cartService.mergeCart(jwtPayload.sub, mergeCartDto);
  }

  @Get()
  @UseGuards(AuthGuardJwt)
  async getUserCart(@GetUser() jwtPayload: JwtPayload) {
    return this.cartService.getUserCart(jwtPayload.sub);
  }

  @Put(':id')
  @UseGuards(AuthGuardJwt)
  async updateCartItem(
    @GetUser() jwtPayload: JwtPayload,
    @Param('id') cartItemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto
  ) {
    return this.cartService.updateCartItem(
      jwtPayload.sub,
      cartItemId,
      updateCartItemDto
    );
  }
}
