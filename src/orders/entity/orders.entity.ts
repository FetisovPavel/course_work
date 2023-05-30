import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {StoresEntity} from "../../stores/entity/stores.entity";
import {ApiProperty} from "@nestjs/swagger";
import {ProductsEntity} from "../../products/entity/products.entity";
import {ClientsEntity} from "../../client/entity/client.entity";

@Entity('orders')
export class OrdersEntity{

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    address: string;

    @ApiProperty({ type: () => StoresEntity})
    @ManyToOne(() => StoresEntity, (store) => store.orders)
    store: StoresEntity

    @ApiProperty({ type: () => ClientsEntity})
    @ManyToOne(() => ClientsEntity, (client) => client.orders)
    client: ClientsEntity

    @ApiProperty({ type: () => ProductsEntity})
    @ManyToMany(() => ProductsEntity, (product) => product.orders)
    @JoinTable({
        name: 'product_order',
        joinColumn: { name: 'order_id' },
        inverseJoinColumn: { name: 'product_id' },
    })
    products: ProductsEntity[]

    @ApiProperty()
    @Column( {type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

}