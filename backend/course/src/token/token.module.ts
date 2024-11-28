import TokenEntity from "../entities/token.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {TokenService} from "./token.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([TokenEntity]),
    ],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule {}
