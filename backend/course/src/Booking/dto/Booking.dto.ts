import User from "../../entities/user.entity";
import {SaunaDto} from "../../saunas/dto/addSauna.dto";

export default interface BookingDto {
    date: Date;

    startTime: Date;

    endTime: Date;

    userId: number;

    saunaId: number;
}