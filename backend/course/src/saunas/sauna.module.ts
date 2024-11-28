import {Module} from "@nestjs/common";
import SaunaService from "./sauna.service";
import SaunaController from "./sauna.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import User from "../entities/user.entity";
import TokenEntity from "../entities/token.entity";
import Sauna from "../entities/sauna.entity";
import Addresses from "../entities/addresses.entity";
import SwimmingPoolEntity from "../entities/SwimmingPool.entity";
import {MulterModule} from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import ImageEntity from "../entities/image.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Sauna, Addresses, User, SwimmingPoolEntity, ImageEntity]),
    ],
    providers: [SaunaService],
    controllers: [SaunaController]
})
export default class SaunaModule{}