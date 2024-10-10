import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";

@Entity()
export default class Addresses {
    @PrimaryGeneratedColumn()
    addressId: number;

    @Column()
    region: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    houseNumber: string;

}