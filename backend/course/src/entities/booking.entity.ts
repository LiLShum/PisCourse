import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./user.entity";
import Sauna from "./sauna.entity";

@Entity()
export default class Booking {

    @PrimaryGeneratedColumn()
    bookingId: number;

    @Column()
    date: Date;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @ManyToOne(() => User, user => user.bookings, { onDelete: 'CASCADE', cascade: true, })
    user: User;

    @ManyToOne(() => Sauna, sauna => sauna.bookings, { onDelete: 'CASCADE', cascade: true, })
    sauna: Sauna;
}