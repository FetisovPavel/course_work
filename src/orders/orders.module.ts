import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrdersEntity} from "./entity/orders.entity";
import {StoresEntity} from "../stores/entity/stores.entity";

import {ProductsEntity} from "../products/entity/products.entity";
import {ClientsEntity} from "../client/entity/client.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrdersEntity, StoresEntity, ClientsEntity, ProductsEntity])
    ],
    providers: [OrdersService],
    controllers: [OrdersController]
})
export class OrdersModule {}
