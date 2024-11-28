import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import User  from '../entities/user.entity';
import {TokenService} from "../token/token.service";
import TokenEntity from "../entities/token.entity";
import {JwtService} from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, TokenEntity])
    ],
    providers: [UserService, TokenService, JwtService],
    controllers: [UserController],
    exports: [UserService],
})
export default class UserModule {}
