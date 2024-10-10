import {Inject, Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import ICreateUserDTO from "./createUser.dto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {

    }

    async createUser(user: ICreateUserDTO) {
        const createdUser = await this.userRepository.create(user);
        return this.userRepository.save(createdUser);
    }
}
