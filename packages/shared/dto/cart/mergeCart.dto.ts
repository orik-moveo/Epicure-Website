import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddToCartDto } from './addToCart.dto';

export class MergeCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddToCartDto)
  items!: AddToCartDto[];
}
