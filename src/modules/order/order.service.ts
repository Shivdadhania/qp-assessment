import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  GroceryItemsEntity,
  OrderDetailEntity,
  OrderEntity,
} from '../../entity';
import { CreateOrderReqDto } from './dto';
import {
  OrderDetailRepository,
  OrderRepository,
  UserRepository,
} from '../../repo';
import { messages, UserPayload } from '../../utils';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderRepository,
    private readonly orderDetailRepo: OrderDetailRepository,
    private readonly userRepo: UserRepository,
  ) {}

  /**
   * create order
   * @param body Grocery item & quantity
   * @param user user
   * @returns
   */
  async create(body: CreateOrderReqDto, user: UserPayload) {
    try {
      const userObj = this.userRepo.create({ id: user.id });

      return this.orderRepo.manager.transaction(async (tr) => {
        const order = this.orderRepo.create({
          total_amount: 0,
          user_id: userObj,
        });

        let total = 0;
        let orderDetails: OrderDetailEntity[] = [];
        const updatedGrocery: GroceryItemsEntity[] = [];

        for (let i = 0; i < body.order_grocery.length; i++) {
          const groceryObj = body.order_grocery[i];
          const groceryData = await tr
            .getRepository(GroceryItemsEntity)
            .findOne({ where: { id: groceryObj.id } });

          console.log('groceryData', groceryData);

          if (!groceryData) {
            throw new NotFoundException(messages.groceryNotFound);
          }

          if (groceryData.inventory_level < groceryObj.quantity) {
            throw new ConflictException(messages.notHaveEnoughQuantity);
          }

          orderDetails.push(
            this.orderDetailRepo.create({
              price: groceryData.price,
              quantity: groceryObj.quantity,
              name: groceryData.name,
              grocery_id: groceryData.id,
              order_id: order,
            }),
          );

          groceryData.inventory_level =
            groceryData.inventory_level - groceryObj.quantity;

          updatedGrocery.push(groceryData);

          total += groceryData.price * groceryObj.quantity;
        }

        order.total_amount = total;

        const newOrderObj = await tr.getRepository(OrderEntity).save(order);
        console.log('step 1==============');
        orderDetails = orderDetails.map((k) => ({
          ...k,
          order_id: newOrderObj,
        }));
        await tr.getRepository(OrderDetailEntity).save(orderDetails);
        console.log('step 2==============');
        await tr
          .getRepository(GroceryItemsEntity)
          .upsert(updatedGrocery, ['id']);
        console.log('step 3==============');
        return order;
      });
    } catch (error) {
      throw error;
    }
  }
}
