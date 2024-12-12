import {Injectable} from "@nestjs/common";
import {AddSaunaDto, SwimmingPool, SaunaDto} from "./dto/addSauna.dto";
import {AddressDto} from "./dto/addSauna.dto";
import {InjectRepository} from "@nestjs/typeorm";
import Sauna from "../entities/sauna.entity";
import {Repository} from "typeorm";
import Addresses from "../entities/addresses.entity";
import SwimmingPoolEntity from "../entities/SwimmingPool.entity";
import User from "../entities/user.entity";
import UpdateSaunaDto from "./dto/updateSauna.dto";
import ImageEntity from "../entities/image.entity";

@Injectable()
export default class SaunaService {
    constructor(@InjectRepository(Sauna) private readonly saunaRepository : Repository<Sauna>,
                @InjectRepository(Addresses) private readonly addressesRepository: Repository<Addresses>,
                @InjectRepository(SwimmingPoolEntity) private readonly swimmingPoolRepository: Repository<SwimmingPoolEntity>) {
    }
    async addSauna(addSaunaDto: AddSaunaDto) {
        console.log(addSaunaDto);

        await this.saunaRepository.manager.transaction(async (transactionalEntityManager) => {
            const addressRepository = transactionalEntityManager.getRepository(Addresses);
            const imageRepository = transactionalEntityManager.getRepository(ImageEntity);

            const addresses: AddressDto = {
                region: addSaunaDto.region,
                city: addSaunaDto.city,
                street: addSaunaDto.street,
                houseNumber: addSaunaDto.houseNumber
            };

            const createdAddress = await addressRepository.save(addresses);

            let createdSwimmingPools: SwimmingPoolEntity[] | null = null;
            if (addSaunaDto.swimmingPool && addSaunaDto.swimmingPool.length > 0) {
                const swimmingPoolRepository = transactionalEntityManager.getRepository(SwimmingPoolEntity);

                createdSwimmingPools = await Promise.all(
                    addSaunaDto.swimmingPool.map((pool) => {
                        const swimmingPool = swimmingPoolRepository.create({
                            width: pool.width,
                            length: pool.length,
                        });
                        return swimmingPoolRepository.save(swimmingPool);
                    })
                );
            }
            console.log("sw-pools\n");
            console.log(createdSwimmingPools);
            const sauna = this.saunaRepository.create({
                name: addSaunaDto.name,
                price: addSaunaDto.price,
                description: addSaunaDto.description,
                billiard: addSaunaDto.billiard,
                user: addSaunaDto.User,
                address: createdAddress,
                swimmingPools: createdSwimmingPools ? createdSwimmingPools: null,
                bookings: [],
                comments: [],
                marks: []
            });

            const createdSauna = await transactionalEntityManager.save(sauna);

            const images = addSaunaDto.image.map((img) => {
                return imageRepository.create({
                    url: img.url,
                    sauna: createdSauna,
                });
            });

            await imageRepository.save(images);

            createdAddress.sauna = createdSauna;
            await addressRepository.save(createdAddress);

            console.log('Created Sauna:', createdSauna);
        });
    }

    async deleteSauna(saunaId: string) {
        await this.saunaRepository.delete({saunaId: +saunaId});
    }

    async fetchSaunas() {
        return this.saunaRepository.find({
            relations: {
                swimmingPools: true,
                address: true,
                images: true,
            },
        })
    }

    async fetchUserSaunas(login: string) {
        return this.saunaRepository.find({
            relations: {
                swimmingPools: true,
                address: true,
                images: true,
            },
            where: {
              user: {
                  login: login,
              }
            }
        })
    }

    async updateSauna(updateSaunaDto: UpdateSaunaDto, saunaId: string) {
        const sauna = await this.saunaRepository.findOne({
            where: { saunaId: +saunaId },
            relations: ['swimmingPools', 'address', 'images'],
        });

        if (!sauna) {
            throw new Error('Сауна не найдена');
        }

        sauna.name = updateSaunaDto.name;
        sauna.description = updateSaunaDto.description;
        sauna.price = updateSaunaDto.price;
        sauna.billiard = updateSaunaDto.billiard;

        // Обновление адреса
        if (sauna.address) {
            sauna.address.region = updateSaunaDto.region;
            sauna.address.city = updateSaunaDto.city;
            sauna.address.street = updateSaunaDto.street;
            sauna.address.houseNumber = updateSaunaDto.houseNumber;
        } else {
            sauna.address = {
                region: updateSaunaDto.region,
                city: updateSaunaDto.city,
                street: updateSaunaDto.street,
                houseNumber: updateSaunaDto.houseNumber,
            } as Addresses;
        }

        // Обновление бассейнов
        for (const poolDto of updateSaunaDto.swimmingPools) {
            const pool = sauna.swimmingPools.find(p => p.swimmingPoolId === poolDto.swimmingPoolId);
            if (pool) {
                pool.width = poolDto.width;
                pool.length = poolDto.length;
            } else {
                sauna.swimmingPools.push({
                    width: poolDto.width,
                    length: poolDto.length,
                } as SwimmingPoolEntity);
            }
        }

        await this.saunaRepository.save(sauna);
        return sauna;
    }



    async getSauna(saunaId: number) {
        return this.saunaRepository.findOne({
                where: {
                    saunaId: saunaId
                },
                relations: {
                    address: true,
                    swimmingPools: true,
                    images: true,
                }},
            );
    }
}