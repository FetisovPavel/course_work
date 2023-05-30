import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductsEntity} from "../products/entity/products.entity";
import {StoresEntity} from "./entity/stores.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductsEntity, StoresEntity])
    ],
    controllers: [StoresController],
    providers: [StoresService]
})
export class StoresModule {}
