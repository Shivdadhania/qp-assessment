import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderReqDto } from './dto';
import {
  AuthGuard,
  messages,
  Permission,
  PERMISSIONS,
  RoleGuard,
  User,
  UserPayload,
} from '../../utils';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  @Permission(PERMISSIONS.GROCERY_BOOK)
  @UseGuards(AuthGuard, RoleGuard)
  async create(@Body() body: CreateOrderReqDto, @User() user: UserPayload) {
    const data = await this.orderService.create(body, user);
    return {
      data,
      message: messages.orderBook,
    };
  }
}
