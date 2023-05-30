import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {In, Repository} from "typeorm";
import {ProductsEntity} from "../products/entity/products.entity";
import {StoresEntity} from "../stores/entity/stores.entity";
import {OrdersEntity} from "./entity/orders.entity";
import {CreateOrdersDto} from "./dto/orders.dto";
import {IncompleteOrderDto} from "./dto/incomplete-order.dto";
import {ClientsEntity} from "../client/entity/client.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrdersEntity)
        private readonly OrdersRepository:Repository<OrdersEntity>,
        @InjectRepository(StoresEntity)
        private readonly StoresRepository:Repository<StoresEntity>,
        @InjectRepository(ClientsEntity)
        private readonly ClientsRepository:Repository<ClientsEntity>,
        @InjectRepository(ProductsEntity)
        private readonly ProductsRepository:Repository<ProductsEntity>,
    ) {
    }

    async create(ordersDto: CreateOrdersDto): Promise<OrdersEntity>
    {
        const order = this.OrdersRepository.create();
        order.address = ordersDto.address;
        order.store = await this.StoresRepository.findOne({ where: { id: ordersDto.store}})
        order.client = await this.ClientsRepository.findOne({ where: { id: ordersDto.client}})
        if (ordersDto.products!=null){
            order.products = await this.ProductsRepository.findBy({
                id: In(ordersDto.products),
            });
        }
        await this.OrdersRepository.save(order);
        return order;
    }

    async findAll(): Promise<OrdersEntity[]>{
       return await this.OrdersRepository.find({
           relations: {
               store: true,
               client: true,
               products: true
           }
       })
    }

    findOne(id: number): Promise<OrdersEntity> {
        return this.OrdersRepository.findOne({
            where: { id },
            relations: { store: true, client: true },
        });
    }

    async findIncomplete(): Promise<IncompleteOrderDto[]> {
        const orders = await this.OrdersRepository.find();
        return orders.map((order) => {
            const incompleteOrder = new IncompleteOrderDto();
            incompleteOrder.id = order.id;
            incompleteOrder.address = order.address;
            return incompleteOrder;
        });
    }

    async update(id: number, updatedOrder: OrdersEntity) {
        const order = await this.OrdersRepository.findOne({ where: { id } });
        order.address = updatedOrder.address;
        order.store = updatedOrder.store;
        order.client = updatedOrder.client;
        await this.OrdersRepository.save(order);
        return order;
    }

    remove(id: number) {
        this.OrdersRepository.delete({ id });
    }
}
