import {Injectable} from '@nestjs/common';
import {Repository} from "typeorm";
import User from "../entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import CreateUserDTO from "./createUser.dto";
import {TokenService} from "../token/token.service";
import TokenEntity from "../entities/token.entity";
import EditUserDto from "./dto/edit-user.dto";
import TokenPayload from "../token/dto/token-payload";
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../auth/auth.constants";
import {sha256} from "js-sha256";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                private readonly tokenService: TokenService,
                private readonly jwtService: JwtService) {
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

    async getUserById(userId: number) : Promise<User> {
        return this.userRepository.findOne({where: {userId: userId}});
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new Error("User isn't authorized");
        }

        const userData: User = await this.tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB: TokenEntity = await this.tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDB) {
            throw new Error("Unauthorized error");
        }

        const user = await this.getUserById(userData.userId);
        const payload = { userId: user.userId, login: user.login, role: user.role };

        const tokens = this.tokenService.generateTokens(payload);
        const accessToken = tokens.accessToken;
        return { accessToken, user  };
    }

    async editUserInfo(editUserDto: EditUserDto, accessToken: string)  {

        const payload : TokenPayload = this.jwtService.verify(accessToken, {secret: jwtConstants.secret});

        const user = await this.getUserById(payload.userId);

        const updateResult = await this.userRepository
            .createQueryBuilder()
            .update(user)
            .set({
                name: editUserDto.name === '' || null ?  user.name : editUserDto.name,
                secondName: editUserDto.secondName === '' || null ?  user.secondName : editUserDto.secondName,
                lastName: editUserDto.lastName === '' || null ?  user.lastName : editUserDto.lastName,
                phone: editUserDto.phone === '' || null ?  user.phone : editUserDto.phone,
                password: editUserDto.password === '' || null ? user.password : sha256(String(editUserDto.password)),
                login: editUserDto.login === '' || null ? user.login : editUserDto.login,
            })
            .where("userId = :userId", { userId: user.userId })
            .execute();
    }

    async grantRoleToUser(userId: number) {
        const updateResult = await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({
                role: 'creator',
            })
            .where("userId = :userId", {userId})
            .execute()
    }

    async revokeRoleToUser(userId: number) {
        const updateResult = await this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({
                role: 'user',
            })
            .where("userId = :userId", {userId})
            .execute()
    }
}
