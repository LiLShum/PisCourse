import { Module } from '@nestjs/common';
import UserModule from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./auth.constants";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {TokenService} from "../token/token.service";
import {TokenModule} from "../token/token.module";

@Module({
    imports: [
        TokenModule,
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'}
        })
    ],
    providers: [
        AuthService,
    ],
    controllers: [
        AuthController
    ],
    exports: [
        AuthService,
    ]
})
export class AuthModule {}
