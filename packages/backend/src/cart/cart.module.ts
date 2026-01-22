import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItem } from '../../../shared/entities/cartItem.entity';
import { DishModule } from '../dish/dish.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), DishModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
