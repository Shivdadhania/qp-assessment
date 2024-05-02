import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class AddGroceryReqDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  inventory_level: number;
}
