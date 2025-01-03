import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./user.entity";
import Comments from "./comments.entity";
import Booking from "./booking.entity";
import Addresses from "./addresses.entity";
import SwimmingPoolEntity from "./SwimmingPool.entity";
import ImageEntity from "./image.entity";

@Entity()
export default class Sauna {
    @PrimaryGeneratedColumn()
    saunaId: number;

    @Column()
    name: string;

    @Column()
    billiard: number;

    @Column()
    price: number;

    @Column()
    description: string;

    @OneToOne(() => Addresses,(address) => address.sauna, { onDelete: 'CASCADE', cascade: true, eager: true })
    @JoinColumn()
    address: Addresses;

    @ManyToOne(()=> User, (user) => user.saunas,)
    user: User;

    @OneToMany(() => Comments, comment => comment.sauna, { onDelete: 'CASCADE' })
    comments: Comments[];

    @OneToMany(() => Booking, booking => booking.sauna, { onDelete: 'CASCADE' })
    bookings: Booking[];

    @OneToMany(() => SwimmingPoolEntity, (swimmingPoll) => swimmingPoll.sauna, { onDelete: 'CASCADE', cascade: true, })
    swimmingPools?: SwimmingPoolEntity[];

    @OneToMany(() => ImageEntity, image => image.sauna, { onDelete: 'CASCADE'})
    images: ImageEntity[];
}