import {Injectable, Req, Res, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UserService} from "../user/user.service";
import AuthDto from "./dto/auth.dto";
import { sha256 } from 'js-sha256';
import User from "../entities/user.entity";
import { jwtConstants } from "./auth.constants"
import CreateUserDTO from "../user/createUser.dto";
import {TokenService} from "../token/token.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
    ) {}

    async signIn(authData : AuthDto, @Res() res) {
        const user: User = await this.userService.getUserByLogin(authData.login);
        const inputPassword = sha256(authData.password);
        if(user.password !== inputPassword) {
            throw new UnauthorizedException();
        }
        const payload = { userId: user.userId, login: user.login, role: user.role };
        const tokens =  this.tokenService.generateTokens(payload);
        await this.tokenService.saveToken(user.userId, tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return {...tokens, user: user};
    }

    async register(createUserDto : CreateUserDTO, @Res() res) {
        createUserDto.password =  sha256(String(createUserDto.password));
        const createdUser =  await this.userService.createUser(createUserDto);
        const payload = { userId: createdUser.userId, login: createdUser.login, role: createdUser.role };
        const tokens =  this.tokenService.generateTokens(payload);
        await this.tokenService.saveToken(createdUser.userId, tokens.refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

        return {...tokens, user: createdUser};
    }

   async refresh(@Req() req) {
        const {refreshToken} = req.cookies;
        return await this.userService.refresh(refreshToken);
   }

    async  logout(@Req() req, @Res() res) {
        const token = await this.tokenService.deleteToken(req.cookies['refreshToken']);
        res.clearCookie('refreshToken');
        return token;
    }
}
