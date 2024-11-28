import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../auth/auth.constants";
import User from "../entities/user.entity";
import TokenEntity from "../entities/token.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class TokenService {

    constructor(private readonly jwtService: JwtService,
                @InjectRepository(TokenEntity) private readonly tokenSchema: Repository<TokenEntity>) {
    }
    generateTokens(payload) {
        const accessToken = this.jwtService.sign(payload,{expiresIn: '30m', secret: jwtConstants.secret});
        const refreshToken = this.jwtService.sign(payload,{expiresIn: '30d', secret: jwtConstants.secret});
        return {accessToken, refreshToken};
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await this.tokenSchema.findOne({where: {UserId: userId}});
        console.log(tokenData)
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return await this.tokenSchema.save(tokenData);
        }

        const newToken = this.tokenSchema.create({ UserId: userId, refreshToken: refreshToken });
        return await this.tokenSchema.save(newToken)
    }

    async deleteToken(refreshToken : string) {
        return await this.tokenSchema.delete({refreshToken});
    }

    async validateAccessToken(token) {
        try {
            return this.jwtService.verify(token, {secret: jwtConstants.secret});
        }
        catch (e: any) {
            return null;
        }
    }

    async validateRefreshToken(token) {
        try {
            return this.jwtService.verify(token, {secret: jwtConstants.secret});
        }
        catch (e: any) {
            return null;
        }
    }

    async findToken(refreshToken) {
        return await this.tokenSchema.findOne({where: {
                refreshToken: refreshToken,
            }
        })
    }
}