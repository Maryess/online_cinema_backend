import { Actor } from 'src/actor/entity/actor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  evaluation: number;

  @ManyToOne(() => Actor, (actor) => actor.movies, {})
  actor: Actor;
}
