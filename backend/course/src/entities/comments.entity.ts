import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./user.entity";
import Sauna from "./sauna.entity";

@Entity()
    export default class Comments {

    @PrimaryGeneratedColumn()
    commentId: number;

    @Column()
    comment: string;

    @ManyToOne(() => User, user  => user.comments)
    user: User;

    @ManyToOne(() => Sauna, sauna => sauna.comments)
    sauna: Sauna;
}