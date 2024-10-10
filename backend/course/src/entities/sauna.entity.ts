import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import Mark from "./marks.entity";
import Comments from "./comments.entity";
import Booking from "./booking.entity";
import Addresses from "./addresses.entity";

@Entity()
export default class Sauna {
    @PrimaryGeneratedColumn()
    saunaId: number;

    @Column()
    name: string;

    @Column()
    hasSwimmingPool: boolean;

    @Column()
    hasBilliard: boolean;

    @Column()
    description: string

    @Column()
    address: string;

    @ManyToOne(()=> User, (user) => user.saunas)
    user: User

    @OneToMany(() => Mark, mark => mark.sauna)
    marks: Mark[]

    @OneToMany(() => Comments, comment => comment.sauna)
    comments: Comments[];

    @OneToMany(() => Booking, booking => booking.sauna)
    bookings: Booking[];

    @OneToOne(() => Addresses)
    @JoinColumn()
    Address: Addresses;
}