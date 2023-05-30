import {Injectable} from '@nestjs/common';
import {In, Repository} from "typeorm";
import {ProductsEntity} from "./entity/products.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateProductsDto} from "./dto/products.dto";
import {IncompleteProductDto} from "./dto/incomplete-product.dto";
import {StoresEntity} from "../stores/entity/stores.entity";
import {OrdersEntity} from "../orders/entity/orders.entity";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly ProductRepository:Repository<ProductsEntity>,
        @InjectRepository(StoresEntity)
        private readonly StoresRepository:Repository<StoresEntity>,
        @InjectRepository(OrdersEntity)
        private readonly OrdersRepository:Repository<OrdersEntity>,
    ) {
    }

    async create(productDto: CreateProductsDto): Promise<ProductsEntity>
    {
        const product = this.ProductRepository.create();
        product.name = productDto.name;
        product.price = productDto.price;
        if (productDto.stores!=null){
            product.stores = await this.StoresRepository.findBy({
                id: In(productDto.stores),
            });
        }
        if (productDto.orders!=null){
            product.orders = await this.OrdersRepository.findBy({
                id: In(productDto.orders),
            });
        }
        await this.ProductRepository.save(product);
        return product;
    }

    async findAll(): Promise<ProductsEntity[]> {
        return await this.ProductRepository.find({
            relations: {
                stores: true,
                orders: true
            },
        });
    }

    async findOne(name: string): Promise<ProductsEntity> {
        return await this.ProductRepository.findOne({
            where: { name: name },
            relations: {
                stores: true,
                orders: true
            },
        });
    }

    async findIncomplete(): Promise<IncompleteProductDto[]> {
        const products = await this.ProductRepository.find();
        return products.map((product) => {
           const incompleteProduct = new IncompleteProductDto();
           incompleteProduct.id = product.id;
           incompleteProduct.name = product.name;
           return incompleteProduct;
        });
    }

    async update(id: number, updatedProduct: ProductsEntity) {
        const product = await this.ProductRepository.findOne({ where: { id } });
        product.name = updatedProduct.name;
        product.price = updatedProduct.price;
        product.stores = updatedProduct.stores;
        await this.ProductRepository.save(product);
        return product;
    }

    remove(id: number) {
        this.ProductRepository.delete({ id });
    }

}
