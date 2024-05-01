import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetailEntity } from './order-detail.entity';

@Entity('grocery_items')
export class GroceryItemsEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: 'int4',
    nullable: false,
  })
  price!: number;

  @Column({
    type: 'int4',
    nullable: false,
  })
  inventory_level!: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated_at!: Date;

  @OneToMany(
    () => OrderDetailEntity,
    (order_detail) => order_detail.grocery_id,
    {
      cascade: true,
    },
  )
  order_detail!: OrderDetailEntity[];
}
