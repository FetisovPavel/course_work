import {IsNotEmpty} from 'class-validator';

export class ClientAuthorizationDto {
    @IsNotEmpty({ message: 'Не все поля заполнены' })
    username: string;

    @IsNotEmpty({ message: 'Не все поля заполнены' })
    password: string;
}

