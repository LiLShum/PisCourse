import {Module} from "@nestjs/common";
import CommentController from "./comment.controller";
import CommentService from "./comment.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import Sauna from "../entities/sauna.entity";
import Addresses from "../entities/addresses.entity";
import User from "../entities/user.entity";
import SwimmingPoolEntity from "../entities/SwimmingPool.entity";
import ImageEntity from "../entities/image.entity";
import Booking from "../entities/booking.entity";
import Comments from "../entities/comments.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Sauna, Addresses, User, SwimmingPoolEntity, ImageEntity, Comments])
    ],
    providers: [CommentService],
    controllers: [CommentController],
})
export default class CommentModule {}