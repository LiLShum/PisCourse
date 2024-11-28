import {Body, Controller, Get, HttpStatus, Inject, Post, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import AuthDto from "./dto/auth.dto";
import CreateUserDTO from "../user/createUser.dto";
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }
    @Post('signIn')
    async signIn(@Body() authDto: AuthDto, @Res() res) {
        res.json(await this.authService.signIn(authDto, res));
    }

    @Post('register')
    async register(@Body() createUserDto : CreateUserDTO, @Res() res) {
        res.json(await this.authService.register(createUserDto, res));
    }

    @Get('logout')
    async logout(@Res() res, @Req() req) {
       res.json(await this.authService.logout(req, res));
    }

    @Get('refresh')
    async refresh(@Req() req) {
        return  await this.authService.refresh(req);
    }
}

