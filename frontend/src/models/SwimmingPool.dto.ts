import {SaunaDto} from "./sauna/add-sauna.dto";

export default interface SwimmingPoolDto {
    swimmingPoolId: number;

    width: number;

    length: number;

    sauna: SaunaDto;
}