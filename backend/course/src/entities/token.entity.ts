import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export default class TokenEntity {
    @PrimaryGeneratedColumn()
    tokenId: number;

    @Column()
    refreshToken: string;

    @Column()
    UserId: number;
}