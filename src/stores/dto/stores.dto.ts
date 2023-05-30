import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty} from "class-validator";

export class CreateStoresDto{

    @IsNotEmpty({ message: 'Name must not be empty' })
    @ApiProperty({ example: 'Kugoo store', description: 'Название магазина' })
    name: string;

    @IsNotEmpty({ message: 'Address must not be empty' })
    @ApiProperty({ example: 'Октябрьская, 4', description: 'Адрес магазина' })
    address: string;

    @ApiProperty({ example: [1,2], description: 'Список товаров' })
    products: number[];

}