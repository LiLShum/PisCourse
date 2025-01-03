import SwimmingPoolDto from "../SwimmingPool.dto";

export default interface UpdateSaunaDto {
    region: string;

    price: number;

    city: string;

    street: string;

    houseNumber: string;

    name: string;

    swimmingPools?: SwimmingPoolDto[];

    billiard?: number;

    description: string;

    image: string;
}