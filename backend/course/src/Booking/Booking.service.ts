import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import Booking from "../entities/booking.entity";
import {Repository} from "typeorm";
import Sauna from "../entities/sauna.entity";
import User from "../entities/user.entity";
import BookingDto from "./dto/Booking.dto";

@Injectable()
export default class BookingService {
    constructor(@InjectRepository(Booking) private readonly bookingRepository: Repository<Booking>,
                @InjectRepository(Sauna) private readonly saunaRepository: Repository<Sauna>,
                @InjectRepository(User) private readonly userRepository: Repository<User>) {
    }

    async bookingSauna(bookingDto: BookingDto) {
        const sauna = await this.saunaRepository.findOne({
            where: {
            saunaId: bookingDto.saunaId,
            }
        });

        const user = await this.userRepository.findOne({
            where: {
                userId: bookingDto.userId,
            }
        });

        const booking = new Booking();

        booking.sauna = sauna;
        booking.user = user;
        booking.startTime = bookingDto.startTime;
        booking.endTime = bookingDto.endTime;
        booking.date = bookingDto.date;

        return await this.bookingRepository.manager.save<Booking>(booking);
    }

    async getBookings()  {
        return await this.bookingRepository.find();
    }

    async getUserBookings(userId: number) {
        return await this.bookingRepository.find({
            where: {
                user: {
                    userId: userId
                }
            },
            relations: {
                sauna: true
            }
        });
    }

    async deleteBooking(bookingId: number) {
        return await this.bookingRepository.delete({bookingId: bookingId});
    }
}