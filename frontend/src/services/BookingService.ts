import BookingDto, {ClientBookingDto} from "../models/dto/booking.dto";
import $api from "../http";
import {AxiosResponse} from "axios";
import {UserBookingsDto} from "../models/dto/booking.dto";

export default class BookingService {
    static async bookingSauna(bookingDto: BookingDto) {
        return await $api.post<Promise<BookingDto>>('http://localhost:4000/booking', bookingDto);
    }

    static async getBookings() {
        return $api.get('http://localhost:4000/booking');
    }

    static async getUserBookings(userId: string) : Promise<AxiosResponse<UserBookingsDto[]>> {
        return $api.get<UserBookingsDto[]>(`http://localhost:4000/booking/userBookings/${userId}`);
    }

    static async deleteBooking(bookingId: string) : Promise<AxiosResponse<UserBookingsDto[]>> {
        return $api.delete(`http://localhost:4000/booking/${bookingId}`);
    }
}