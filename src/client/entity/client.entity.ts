import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {OrdersEntity} from "../../orders/entity/orders.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity('clients')
export class ClientsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column( {type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @OneToMany(() => OrdersEntity, (order) => order.client)
    orders: OrdersEntity[]

}


