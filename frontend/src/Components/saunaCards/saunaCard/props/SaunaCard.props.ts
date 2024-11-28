import {SwimmingPool} from "../../../../models/sauna/add-sauna.dto";
import User from '../../../../../../backend/course/src/entities/user.entity'

export default interface saunaCardProps {
    name: string;

    price: number;

    Addresses: AddressDto;

}

export interface saunaInfoProps {
    name: string;

    price: number;

    swimmingPool?: SwimmingPool[];

    billiard?: number;

    description: string;

    Addresses: AddressDto;

    User: User;
}

export interface AddressDto {
    region: string;

    city: string;

    street: string;

    houseNumber: string;
}