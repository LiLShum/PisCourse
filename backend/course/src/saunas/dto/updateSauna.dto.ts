import {SwimmingPool} from "./addSauna.dto";
import User from "../../entities/user.entity"
import ImageEntity from "../../entities/image.entity";

export default interface UpdateSaunaDto {
    region: string;

    price: number;

    city: string;

    street: string;

    houseNumber: string;

    name: string;

    swimmingPools?: SwimmingPool[];

    billiard?: number;

    description: string;

    image: ImageEntity[];

    User: User;
}