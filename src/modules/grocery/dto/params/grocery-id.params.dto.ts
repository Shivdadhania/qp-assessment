import { IsNotEmpty, IsString } from 'class-validator';

export class GroceryIdParamsDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
