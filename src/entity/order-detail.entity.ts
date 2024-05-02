import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_detail')
export class OrderDetailEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'int4',
    nullable: false,
  })
  price!: number;

  @Column({
    type: 'int4',
    nullable: false,
  })
  quantity!: number;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    unique: true,
  })
  name!: string;

  @Index('IDX_order_detail_order_id')
  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn({ name: 'order_id' })
  order_id!: OrderEntity;

  @Index('IDX_order_detail_grocery_id')
  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
  })
  grocery_id!: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;
}
