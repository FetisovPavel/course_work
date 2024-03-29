import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {BadRequestException, ValidationPipe} from "@nestjs/common";
import {ValidationError} from "class-validator";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            const messages = errors.map(error => Object.values(error.constraints));
            return new BadRequestException(messages);
          },
        }),
    );
    await app.listen(3001);
}

bootstrap();