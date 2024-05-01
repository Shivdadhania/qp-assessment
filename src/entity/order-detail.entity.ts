import { GroceryItemsEntity } from './grocery-items.entity';
import { OrderEntity } from './order.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @Index('IDX_order_detail_order_id')
  @ManyToOne(() => OrderEntity, (order) => order.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order_id!: OrderEntity;

  @Index('IDX_order_detail_grocery_id')
  @ManyToOne(() => GroceryItemsEntity, (grocery) => grocery.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'grocery_id' })
  grocery_id!: GroceryItemsEntity;
}
