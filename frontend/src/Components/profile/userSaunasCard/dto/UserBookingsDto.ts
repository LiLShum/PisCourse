import BookingDto from "../../../../models/dto/booking.dto";
import {SaunaDto} from "../../../../models/sauna/add-sauna.dto";

export default interface UserBookingsDto {
    date: Date;

    startTime: Date;

    endTime: Date;

    userId: number;

    saunaId: number;

    sauna: SaunaDto;
}