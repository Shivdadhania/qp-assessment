import { OrderDetailEntity } from './order-detail.entity';
import { UserEntity } from './user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'int4',
    nullable: false,
  })
  total_amount!: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @Index('IDX_order_user_id')
  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user_id!: UserEntity;

  @OneToMany(() => OrderDetailEntity, (order_detail) => order_detail.order_id, {
    cascade: true,
  })
  order!: OrderDetailEntity[];
}
