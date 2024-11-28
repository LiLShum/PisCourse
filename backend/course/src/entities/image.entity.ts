import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import  Sauna  from './sauna.entity';

@Entity()
export default class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => Sauna, (sauna) => sauna.images, { onDelete: 'CASCADE', cascade: true, })
    sauna: Sauna;
}
