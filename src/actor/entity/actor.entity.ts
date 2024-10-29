import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
