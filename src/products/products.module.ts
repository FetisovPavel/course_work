import { Module } from '@nestjs/common';
import {ProductsController} from "./products.controller";
import {ProductsService} from "./products.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductsEntity} from "./entity/products.entity";
import {StoresEntity} from "../stores/entity/stores.entity";
import {OrdersEntity} from "../orders/entity/orders.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductsEntity, StoresEntity, OrdersEntity])
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})

export class ProductsModule {
}
