import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  taskTypeId: string;

  @Column()
  executorId: string;

  @Column()
  description: string;

  @Column()
  important: boolean;
}
