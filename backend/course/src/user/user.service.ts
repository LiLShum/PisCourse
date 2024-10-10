import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import CreateUserDTO from "./createUser.dto";
import * as bcrypt from 'bcrypt';
import {jwtConstants} from "../auth/auth.constants";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

    }

    async getUsers() : Promise<User[]> {
        return this.userRepository.find();
    }

    async createUser(user: CreateUserDTO) : Promise<User> {
        const createdUser = this.userRepository.create(user);
        return this.userRepository.save(createdUser);
    }

    async getUserByLogin(login: string) : Promise<User> {
        return this.userRepository.findOne({where: {login: login}});
    }
}
