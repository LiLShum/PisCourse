import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import Sauna from "./sauna.entity";

@Entity()
export default class SwimmingPoolEntity {
    @PrimaryGeneratedColumn()
    swimmingPoolId: number;

    @Column()
    width: number;

    @Column()
    length: number;

    @ManyToOne(() => Sauna, (sauna) => sauna.swimmingPools, { onDelete: 'CASCADE' })
    sauna: Sauna;
}