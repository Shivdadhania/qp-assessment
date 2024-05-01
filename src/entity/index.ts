import { UserEntity } from './user.entity';
import { GroceryItemsEntity } from './grocery-items.entity';
import { OrderDetailEntity } from './order-detail.entity';
import { OrderEntity } from './order.entity';

export * from './grocery-items.entity';
export * from './order-detail.entity';
export * from './order.entity';
export * from './user.entity';

export const entity = [
  UserEntity,
  GroceryItemsEntity,
  OrderEntity,
  OrderDetailEntity,
];
