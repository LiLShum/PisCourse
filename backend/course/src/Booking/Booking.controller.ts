import {Body, Controller, Delete, Get, Inject, Param, Post} from "@nestjs/common";
import BookingDto from "./dto/Booking.dto";
import BookingService from "./Booking.service";

@Controller('booking')
export default class BookingController {
    constructor(@Inject() private readonly bookingService: BookingService) {
    }
    @Post()
    async bookingSauna(@Body() bookingDto: BookingDto) {
        return await this.bookingService.bookingSauna(bookingDto);
    }

    @Get()
    async getBookings() {
        return await this.bookingService.getBookings();
    }

    @Delete(':bookingId')
    async deleteBooking(@Param('bookingId') bookingId: string) {
        return this.bookingService.deleteBooking(+bookingId);
    }

    @Get('userBookings/:userId')
    async getUserBookings(@Param('userId') userId: string) {
        return this.bookingService.getUserBookings(+userId);
    }
}