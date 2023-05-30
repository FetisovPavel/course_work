import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TokenEntity} from "./entity/client.entity.token";
import {ClientsEntity} from "./entity/client.entity";
import {OrdersEntity} from "../orders/entity/orders.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ClientsEntity, TokenEntity, OrdersEntity])],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}


