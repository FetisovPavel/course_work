import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateProductsDto {

    @IsNotEmpty({ message: 'Name must not be empty' })
    @ApiProperty({ example: 'Kugoo S3', description: 'Название товара' })
    name: string;

    @IsNotEmpty({ message: 'Price must not be empty' })
    @ApiProperty({ example: '25000', description: 'Цена товара' })
    price: number;

    @IsNotEmpty({ message: 'List of stores must not be empty' })
    @ApiProperty({ example: [1,2], description: 'Список магазинов' })
    stores: number[];

    @ApiProperty({ example: [1,2], description: 'История заказов' })
    orders: number[];

}