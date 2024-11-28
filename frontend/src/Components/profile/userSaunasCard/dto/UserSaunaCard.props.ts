import {AddressDto} from "../../../saunaCards/saunaCard/props/SaunaCard.props";

export default interface UserSaunaCardProps {
    name: string;

    price: number;

    Addresses: AddressDto;
}