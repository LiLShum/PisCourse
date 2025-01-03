import {Body, Controller, Get, Param, Post, Put, Req} from '@nestjs/common';
import ICreateUserDTO from "./createUser.dto";
import {UserService} from "./user.service";
import EditUserDto from "./dto/edit-user.dto";
import GrantUserDto from "./dto/Grant-user.dto";
import User from "../entities/user.entity";

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
    getUsers() : Promise<User[]> {
        return this.userService.getUsers();
    }

    @Get('/getUserByLogin/:login')
        getUserByLogin(@Param('login') login: string): Promise<User> {
        return this.userService.getUserByLogin(login);
    }

    @Put()
    editUserInfo(@Body() editUserDto: EditUserDto, @Req() req) {
        const token = req.headers['authorization'].split(' ')[1];
        return this.userService.editUserInfo(editUserDto, token);
    }

    @Post('/grantRoleToUser')
    grantRole(@Body() body: GrantUserDto) {
        return this.userService.grantRoleToUser(body.userId);
    }

    @Post('/revokeRoleToUser')
    revokeRole(@Body() body: GrantUserDto) {
        return this.userService.revokeRoleToUser(body.userId);
    }
}
