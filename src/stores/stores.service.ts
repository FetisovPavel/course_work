import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ProductsEntity} from "../products/entity/products.entity";
import {In, Repository} from "typeorm";
import {StoresEntity} from "./entity/stores.entity";
import {CreateStoresDto} from "./dto/stores.dto";
import {IncompleteStoreDto} from "./dto/incomplete-store.dto";

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly ProductRepository:Repository<ProductsEntity>,
        @InjectRepository(StoresEntity)
        private readonly StoresRepository:Repository<StoresEntity>
    ) {
    }

    async create(storesDto: CreateStoresDto): Promise<StoresEntity>
    {
        const store = this.StoresRepository.create();
        store.name = storesDto.name;
        store.address = storesDto.address;
        if(storesDto.products!=null){
            console.log('not null')
            store.products = await this.ProductRepository.findBy({
                id: In(storesDto.products),
            });
        }
        await this.StoresRepository.save(store);
        return store;
    }

    findAll():Promise<StoresEntity[]>{
        return this.StoresRepository.find({
            relations: {
                products: true
            },
        });
    }

    findOne(id: number): Promise<StoresEntity> {
        return this.StoresRepository.findOne({
            where: { id },
            relations: { products: true },
        });
    }

    async findIncomplete(): Promise<IncompleteStoreDto[]> {
        const stores = await this.StoresRepository.find();
        return stores.map((store) => {
            const incompleteStore = new IncompleteStoreDto();
            incompleteStore.id = store.id;
            incompleteStore.name = store.name;
            incompleteStore.address = store.address
            return incompleteStore;
        });
    }

    async update(id: number, updatedStore: StoresEntity) {
        const store = await this.StoresRepository.findOne({ where: { id } });
        store.name = updatedStore.name;
        store.address = updatedStore.address;
        store.products = updatedStore.products;
        await this.StoresRepository.save(store);
        return store;
    }

    remove(id: number){
        this.StoresRepository.delete({ id });
    }
}
