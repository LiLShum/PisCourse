import {Column, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Sauna from "../../entities/sauna.entity";
import Mark from "../../entities/marks.entity";
import Comments from "../../entities/comments.entity";
import Booking from "../../entities/booking.entity";

export default interface IUser {
    userId: number;

    login: string;

    name: string;

    secondName: string;

    lastName: string;

    role: string;

    phone: string;

    password: string;

    saunas: Sauna[]

    marks: Mark[]

    comments: Comments[];

    bookings: Booking[];
}