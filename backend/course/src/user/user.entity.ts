import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    name: string;

    secondName: string;

    lastName: string;

    role: string;

    phone: string;

}