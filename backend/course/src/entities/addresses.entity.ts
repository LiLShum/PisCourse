import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Sauna from "./sauna.entity";

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

    @OneToOne(()=> Sauna, (sauna) => sauna.address,{ onDelete: 'CASCADE'} )
    @JoinColumn()
    sauna: Sauna;

}