import {SaunaDto} from "./sauna/add-sauna.dto";

export default interface ImageDto {
    id: number;

    url: string;

    sauna: SaunaDto;
}