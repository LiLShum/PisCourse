import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn} from 'typeorm';
import Sauna from "./sauna.entity";
import Comments from "./comments.entity";
import Booking from "./booking.entity";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column( {unique: true})
    login: string;

    @Column()
    name: string;

    @Column()
    secondName: string;

    @Column()
    lastName: string;

    @Column()
    role: string;

    @Column()
    phone: string;

    @Column( {})
    password: string;

    @OneToMany(()=> Sauna, (sauna) => sauna.user)
    saunas: Sauna[]

    @OneToMany(() => Comments, comment => comment.user)
    comments: Comments[];

    @OneToMany(() => Booking, booking => booking.user, { onDelete: 'CASCADE'})
    bookings: Booking[];
}