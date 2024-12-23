import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  path: string;
  // @ManyToOne(() => Actor, (actor) => actor.movies, {})
  // actor: Actor;
}
