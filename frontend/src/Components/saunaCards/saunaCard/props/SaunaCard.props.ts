import {SwimmingPool} from "../../../../models/sauna/add-sauna.dto";
import {IUser} from "../../../../models/User";
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

    User: IUser;
}

export interface AddressDto {
    region: string;

    city: string;

    street: string;

    houseNumber: string;
}