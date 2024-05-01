import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GroceryListQueryDto {
  @IsNotEmpty()
  current_page!: number;

  @IsNotEmpty()
  record_per_page!: number;

  @IsOptional()
  @IsString()
  name?: string;
}
