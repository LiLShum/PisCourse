import SwimmingPool from "../../../../backend/course/src/entities/SwimmingPool.entity";

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

    image: string;
}