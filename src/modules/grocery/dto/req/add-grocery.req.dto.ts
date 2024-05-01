import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddGroceryReqDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    inventory_level: number;

}