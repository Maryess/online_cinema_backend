import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PopularMovie {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  movie: string;
}
