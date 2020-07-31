import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('account')
@Unique(['email', 'ashaWorkerId'])
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128 })
  ashaWorkerId: string;

  @Column({ length: 128 })
  name: string;

  @Column({ length: 128 })
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  users: any;

  @Column({ length: 128 })
  status: string;

  @Column({ nullable: true })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
