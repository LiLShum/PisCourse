import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from "./entities/user.entity";
import { UserController } from './user/user.controller';
import {UserService} from "./user/user.service";
import UserModule from "./user/user.module";
import {AuthController} from "./auth/auth.controller";
import {AuthService} from "./auth/auth.service";
import {AuthModule} from "./auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import Sauna from "./entities/sauna.entity";
import Comments from "./entities/comments.entity";
import Addresses from "./entities/addresses.entity";
import Booking from "./entities/booking.entity";
import TokenEntity from "./entities/token.entity";
import ImageEntity from './entities/image.entity'
import {TokenService} from "./token/token.service";
import {TokenModule} from "./token/token.module";
import SwimmingPoolEntity from "./entities/SwimmingPool.entity";
import SaunaModule from "./saunas/sauna.module";
import SaunaController from "./saunas/sauna.controller";
import SaunaService from "./saunas/sauna.service";
import BookingModule from "./Booking/Booking.module";
import CommentModule from "./comments/comment.module";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'db', //db
        port: 5432,
        username: 'postgres',
        password: 'LOL123321lol',
        database: 'postgres',
        entities: [User, Sauna, Comments, Addresses, Booking, TokenEntity, SwimmingPoolEntity, ImageEntity],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([
          User, Sauna, Comments, Addresses, Booking, TokenEntity, SwimmingPoolEntity, ImageEntity
      ]),
      UserModule,
      AuthModule,
      JwtModule,
      TokenModule,
      SaunaModule,
      BookingModule,
      CommentModule
  ],
  controllers: [UserController, AuthController, SaunaController],
  providers: [UserService, AuthService, SaunaService],
})
export class AppModule {}
