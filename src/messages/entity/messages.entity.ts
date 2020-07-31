import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  BaseEntity,
} from 'typeorm';

@Entity('messages')
@Unique(['id', 'msg'])
export class messages extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  msg: string;

  @Column()
  author: string;

  @Column()
  receiver: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
