import {BadRequestException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import Booking from "../entities/booking.entity";
import {LessThan, MoreThan, Repository} from "typeorm";
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
        const { date, startTime, endTime, saunaId } = bookingDto;

        const roundToMinutes = (date: Date) => {
            const roundedDate = new Date(date);
            roundedDate.setSeconds(0, 0);
            return roundedDate;
        };

        const currentStartTime = roundToMinutes(new Date(startTime));
        const currentEndTime = roundToMinutes(new Date(endTime));

        const overlappingBooking = await this.bookingRepository.findOne({
            where: {
                sauna: { saunaId: saunaId },
                date,
                startTime: LessThan(currentEndTime),
                endTime: MoreThan(currentStartTime),
            },
        });

        if (overlappingBooking) {
            throw new BadRequestException("Выбранный временной интервал уже занят.");
        }

        const sauna = await this.saunaRepository.findOne({
            where: { saunaId: saunaId },
        });

        const user = await this.userRepository.findOne({
            where: { userId: bookingDto.userId },
        });

        const booking = new Booking();
        booking.sauna = sauna;
        booking.user = user;
        booking.date = date;
        booking.startTime = currentStartTime;
        booking.endTime = currentEndTime;

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