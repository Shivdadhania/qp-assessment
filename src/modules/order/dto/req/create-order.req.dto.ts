import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class OrderGroceryDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id!: string;

  @IsNumber()
  @IsPositive()
  quantity!: number;
}

export class CreateOrderReqDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderGroceryDto)
  @ArrayNotEmpty()
  order_grocery: OrderGroceryDto[];
}
