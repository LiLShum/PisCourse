import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./entities/user.entity";
import { UserController } from './user/user.controller';
import {UserService} from "./user/user.service";
import UserModule from "./user/user.module";
import {AuthController} from "./auth/auth.controller";
import {AuthService} from "./auth/auth.service";
import {AuthModule} from "./auth/auth.module";
import {JwtModule} from "@nestjs/jwt";
import Sauna from "./entities/sauna.entity";
import Mark from "./entities/marks.entity";
import Comments from "./entities/comments.entity";
import Addresses from "./entities/addresses.entity";
import Booking from "./entities/booking.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost', //db
        port: 5432,
        username: 'postgres',
        password: 'LOL123321lol',
        database: 'postgres',
        entities: [User, Sauna, Mark, Comments, Addresses, Booking],
        synchronize: true,
      }),
      TypeOrmModule.forFeature([
          User, Sauna, Mark, Comments, Addresses, Booking
      ]),
      UserModule,
      AuthModule,
      JwtModule,
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService],
})
export class AppModule {}
