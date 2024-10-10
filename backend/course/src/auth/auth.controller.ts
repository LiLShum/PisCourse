import {Body, Controller, Inject, Post, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import AuthDto from "./dto/auth.dto";
import CreateUserDTO from "../user/createUser.dto";
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }
    @Post('signIn')
    async signIn(@Body() authDto: AuthDto, @Res() res) {
        res.end(await this.authService.signIn(authDto, res));
    }

    @Post('register')
    async register(@Body() createUserDto : CreateUserDTO, @Res() res) {
        res.end(await this.authService.register(createUserDto, res));
    }

}
