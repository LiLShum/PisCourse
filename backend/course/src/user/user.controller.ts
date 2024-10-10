import {Body, Controller, Get, Post} from '@nestjs/common';
import ICreateUserDTO from "./createUser.dto";
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }
    @Post()
    createUser(@Body() user: ICreateUserDTO) {
        try {
            return this.userService.createUser(user);
        }
        catch (e: any) {
            console.log(e.message);
        }
    }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }
}
