import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class AddToCartDto {
  @IsString()
  dishId!: string;

  @IsNumber()
  quantity!: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  sides!: string[] | null;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  changes!: string[] | null;
}
