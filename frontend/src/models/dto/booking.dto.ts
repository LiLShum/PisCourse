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