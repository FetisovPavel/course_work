import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateOrdersDto{

    @IsNotEmpty({ message: 'Address must not be empty' })
    @ApiProperty({ example: 'Динамовская, 28', description: 'Адрес' })
    address: string;

    @IsNotEmpty({ message: 'Store must not be empty' })
    @ApiProperty({ example: 1, description: 'Магазин' })
    store: number;

    @IsNotEmpty({ message: 'Client must not be empty' })
    @ApiProperty({ example: 1, description: 'Клиент' })
    client: number;

    @IsNotEmpty({ message: 'Product must not be empty' })
    @ApiProperty({ example: 1, description: 'Товар' })
    products: number[];
}