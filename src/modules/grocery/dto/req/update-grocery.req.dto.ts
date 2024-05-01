import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateGroceryReqDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    price?: number;

    @IsOptional()
    @IsNumber()
    inventory_level?: number;

}