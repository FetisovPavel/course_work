import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('tokens')
export class TokenEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    username: string;

    @Column()
    token: string;

    @Column()
    expirationDate: Date;

}

