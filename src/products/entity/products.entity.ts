import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {StoresEntity} from "../../stores/entity/stores.entity";
import {ApiProperty} from "@nestjs/swagger";
import {OrdersEntity} from "../../orders/entity/orders.entity";


@Entity('products')
export class ProductsEntity{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    price: number;

    @ApiProperty({ type: () => StoresEntity})
    @ManyToMany((type) => StoresEntity, (store) => store.products )
    @JoinTable({
        name: 'product_store',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'store_id' },
    })
    stores: StoresEntity[];

    @ApiProperty({ type: () => OrdersEntity})
    @ManyToMany(() => OrdersEntity, (order) => order.products)
    @JoinTable({
        name: 'product_order',
        joinColumn: { name: 'product_id' },
        inverseJoinColumn: { name: 'order_id' },
    })
    orders: OrdersEntity[];

}