import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { GroceryListQueryDto } from 'modules/grocery/dto';
import { AuthGuard, messages, Permission, PERMISSIONS, RoleGuard } from 'utils';

@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Get('')
  @Permission(PERMISSIONS.GROCERY_VIEW)
  @UseGuards(AuthGuard, RoleGuard)
  async list(@Query() query: GroceryListQueryDto) {
    const data = await this.groceryService.list(query);
    return {
      data,
      message: messages.productList,
    };
  }
}
