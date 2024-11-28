import User from '../../../../backend/course/src/entities/user.entity'
import ImageEntity from "../../../../backend/course/src/entities/image.entity";
export interface SaunaDto {
    saunaId: number;

    name: string;

    price: number;

    swimmingPools?: SwimmingPool[];

    billiard?: number;

    description: string;

    images: ImageEntity[];

    address: AddressDto;

}

export interface userSaunaCardProps {
    saunaId: number;

    name: string;

    price: number;

    swimmingPools?: SwimmingPool[];

    billiard?: number;

    description: string;

    images: ImageEntity[];

    address: AddressDto;
}

export interface SwimmingPool {
    length: number;

    width: number;
}
export interface AddressDto {
    region: string;

    city: string;

    street: string;

    houseNumber: string;
}


export class AddSaunaDto {
    name: string;
    description: string;
    price: number;
    billiard: number;
    region: string;
    city: string;
    street: string;
    houseNumber: string;
    User: User;
    swimmingPool?: SwimmingPool[];
}

export class ImageResponse {
    message: string;

    images: {
        url: string;
    }[];
}

