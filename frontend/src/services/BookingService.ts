import BookingDto, {ClientBookingDto} from "../models/dto/booking.dto";
import $api from "../http";

export default class BookingService {
    static async bookingSauna(bookingDto: BookingDto) {
        return await $api.post<Promise<BookingDto>>('http://localhost:4000/booking', bookingDto);
    }

    static async getBookings() {
        return $api.get('http://localhost:4000/booking');
    }
}