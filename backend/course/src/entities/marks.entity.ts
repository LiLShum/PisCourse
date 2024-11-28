import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import User from "./user.entity";
import Sauna from "./sauna.entity";
@Entity()
export default class Mark {

    @PrimaryGeneratedColumn()
    markId: number;

    @Column()
    mark: number;

    @ManyToOne(() => User, (user) => user.marks)
    user: User;

    @ManyToOne(() => Sauna, (sauna) => sauna.marks)
    sauna: Sauna;

}