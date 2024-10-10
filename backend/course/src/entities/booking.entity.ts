import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import Sauna from "./sauna.entity";

@Entity()
export default class Booking {

    @PrimaryGeneratedColumn()
    bookingId: number;

    @Column()
    dateStart: Date;

    @Column()
    dateEnd: Date;

    @ManyToOne(() => User, user => user.bookings)
    user: User;

    @ManyToOne(() => Sauna, sauna => sauna.bookings)
    sauna: Sauna;
}