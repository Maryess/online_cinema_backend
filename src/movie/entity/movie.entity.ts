import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  evaluation: number;

  // @ManyToOne(() => Actor, (actor) => actor.movies, {
  //   cascade: true,
  //   eager: true,
  // })
  // actor: Actor;
}
