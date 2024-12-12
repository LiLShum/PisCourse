import {IUser} from "../User";
import {SaunaDto} from "../sauna/add-sauna.dto";

export default interface BookingDto {
    date: Date;

    startTime: Date;

    endTime: Date;

    userId: number;

    saunaId: number;

}

export interface ClientBookingDto {
    date: Date;

    startTime: Date;

    endTime: Date;

}

export interface UserBookingsDto {
    bookingId: number,
    date: Date,
    startTime: Date,
    endTime: Date,
    sauna: SaunaBooking;
}

interface SaunaBooking {
    saunaId: number;

    name: string;

    billiard: number;

    price: number;

    description: string;
}