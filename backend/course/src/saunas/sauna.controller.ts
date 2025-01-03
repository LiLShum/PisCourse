import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Inject,
    Param,
    Post, Put,
    UploadedFile, UploadedFiles,
    UseInterceptors
} from "@nestjs/common";
import {AddSaunaDto} from "./dto/addSauna.dto";
import SaunaService from "./sauna.service";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import User from "../entities/user.entity";
import * as fs from 'fs'
import * as path from "path";
import UpdateSaunaDto from "./dto/updateSauna.dto";
import Sauna from "../entities/sauna.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import ImageEntity from "../entities/image.entity";

@Controller('sauna')
export default class SaunaController{
    constructor(@Inject() private readonly saunaService: SaunaService,
                @InjectRepository(ImageEntity) private readonly imageRepository: Repository<ImageEntity>) {
    }

    @Get()
    fetchSaunas() {
        return this.saunaService.fetchSaunas();
    }
    @Post('addSaunaWithImages')
    @UseInterceptors(FilesInterceptor('images'))
    async addSaunaWithImages(
        @UploadedFiles() files: Express.Multer.File[],
        @Body('addSaunaDto') addSaunaDto: string,
        @Body('user') user: string,
    ) {
        const parsedUser: User = JSON.parse(user);
        const parsedAddSaunaDto: AddSaunaDto = JSON.parse(addSaunaDto);

        const uploadedImages = await Promise.all(
            files.map(async (file) => {
                const fileName = `${parsedUser.login}-${file.originalname}`;
                const directory = path.resolve('/app/frontend/public');
                await fs.promises.mkdir(directory, { recursive: true });

                const filePath = path.join(directory, fileName);
                await fs.promises.writeFile(filePath, file.buffer);
                return  this.imageRepository.create({
                    url: fileName,
                });

            })
        );

        parsedAddSaunaDto.image = uploadedImages;


        await this.saunaService.addSauna(parsedAddSaunaDto);

        return {
            message: 'Сауна и изображения успешно добавлены',
            sauna: parsedAddSaunaDto,
            images: uploadedImages,
        };
    }


    @Post()
    async addSauna(@Body() addSaunaDto: AddSaunaDto) {
        await this.saunaService.addSauna(addSaunaDto);
        return { message: 'Сауна успешно добавлена' };
    }

    @Delete(':saunaId')
    deleteSauna(@Param('saunaId') saunaId : string) {
        return this.saunaService.deleteSauna(saunaId);
    }

    @Get('userSaunas/:login')
    fetchUserSaunas(@Param('login') login: string) {
        return this.saunaService.fetchUserSaunas(login);
    }

    @Put(':saunaId')
    updateSauna(@Body() updateSaunaDto: UpdateSaunaDto, @Param('saunaId') saunaId: string) {
        console.log(updateSaunaDto);
        return this.saunaService.updateSauna(updateSaunaDto, saunaId);
    }

    @Get(':saunaId')
    getSauna(@Param('saunaId') saunaId: string) {
        return this.saunaService.getSauna(+saunaId);
    }
}