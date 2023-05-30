import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class ClientDto {

    @IsNotEmpty({ message: 'Name must not be empty' })
    username: string

    @IsNotEmpty({ message: 'Email must not be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string

    @MinLength(8, {message: 'Password must have at least 8 characters'})
    @IsNotEmpty({ message: 'Не все поля заполнены' })
    password: string;

}


