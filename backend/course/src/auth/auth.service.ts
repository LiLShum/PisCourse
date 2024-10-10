import {Injectable, Res, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UserService} from "../user/user.service";
import AuthDto from "./dto/auth.dto";
import { sha256 } from 'js-sha256';
import {User} from "../entities/user.entity";
import { jwtConstants } from "./auth.constants"
import CreateUserDTO from "../user/createUser.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
    ) {}

    async signIn(authData : AuthDto, @Res() res) {
        const user: User = await this.userService.getUserByLogin(authData.login);

        const inputPassword = sha256(authData.password);

        if(user.password !== inputPassword) {
            throw new UnauthorizedException();
        }

        const access_token = await this.jwtService.signAsync(user.userId.toString(), {secret: jwtConstants.secret});

        res.set('authorization', access_token);

        return access_token;
    }

    async register(createUserDto : CreateUserDTO, @Res() res) {

        createUserDto.password =  sha256(createUserDto.password)

        const createdUser =  await this.userService.createUser(createUserDto);

        const token =  this.jwtService.signAsync(createdUser.userId.toString() , {secret: jwtConstants.secret});

        res.set('authorization', token);

        return token;
    }
}
