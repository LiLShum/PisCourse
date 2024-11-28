import User from '../../entities/user.entity'
import ImageEntity from "../../entities/image.entity";

export interface SaunaDto {
    name: string;

    price: number;

    swimmingPool?: SwimmingPool[];

    billiard?: number;

    description: string;

    image: string;

    address: AddressDto;

    User: User;
}

export interface SwimmingPool {
    swimmingPoolId: number;

    length: number;

    width: number;
}
export interface AddressDto {
    region: string;

    city: string;

    street: string;

    houseNumber: string;
}


export interface AddSaunaDto {
    region: string;

    price: number;

    city: string;

    street: string;

    houseNumber: string;

    name: string;

    swimmingPool?: SwimmingPool[];

    billiard?: number;

    description: string;

    image: ImageEntity[];

    User: User;
}