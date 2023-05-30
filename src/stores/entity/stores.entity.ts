import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductsEntity} from "../../products/entity/products.entity";
import {OrdersEntity} from "../../orders/entity/orders.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('stores')
export class StoresEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    address: string;

    @ApiProperty({ type: () => OrdersEntity})
    @OneToMany(() => OrdersEntity, (order) => order.store)
    orders: OrdersEntity[]

    @ApiProperty({ type: () => ProductsEntity})
    @ManyToMany(() => ProductsEntity, (product) => product.stores)
    @JoinTable({
        name: 'product_store',
        joinColumn: { name: 'store_id' },
        inverseJoinColumn: { name: 'product_id' },
    })
    products: ProductsEntity[];
}