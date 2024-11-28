import {Module} from "@nestjs/common";
import BookingController from "./Booking.controller";
import BookingService from "./Booking.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import Sauna from "../entities/sauna.entity";
import Addresses from "../entities/addresses.entity";
import User from "../entities/user.entity";
import SwimmingPoolEntity from "../entities/SwimmingPool.entity";
import ImageEntity from "../entities/image.entity";
import Booking from "../entities/booking.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Sauna, Addresses, User, SwimmingPoolEntity, ImageEntity, Booking]),],
    providers: [BookingService],
    controllers: [BookingController]
})
export default class BookingModule {}