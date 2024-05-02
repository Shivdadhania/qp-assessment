import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {
  OrderDetailRepository,
  OrderRepository,
  UserRepository,
} from '../../repo';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    OrderDetailRepository,
    UserRepository,
  ],
})
export class OrderModule {}
