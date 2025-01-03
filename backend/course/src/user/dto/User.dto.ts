import Sauna from "../../entities/sauna.entity";
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

    comments: Comments[];

    bookings: Booking[];
}