import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  taskTypeId: number;

  @Column()
  executorId: number;

  @Column()
  description: string;

  @Column()
  important: boolean;
}
