import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn("uuid")
  id: number;
  @Column()
  name:string;
  @Column()
  year:number;
  @Column()
  country:string;
  @Column()
  photo:string;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
  @DeleteDateColumn()
  deleted_at: Date;
}
