import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { Roles } from './../utils';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: Roles,
    nullable: false,
  })
  role: Roles;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({ type: 'varchar', length: 300 })
  salt!: string;

  @Column({ type: 'varchar', length: 300 })
  password_hash!: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: true,
  })
  name!: string | null;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @OneToMany(() => OrderEntity, (order) => order.user_id)
  order!: OrderEntity[];
}
