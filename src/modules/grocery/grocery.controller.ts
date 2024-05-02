import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import {
  AddGroceryReqDto,
  GroceryIdParamsDto,
  GroceryListQueryDto,
  UpdateGroceryReqDto,
} from './dto';
import {
  AuthGuard,
  messages,
  Permission,
  PERMISSIONS,
  RoleGuard,
} from './../../utils';

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

  @Post('')
  @Permission(PERMISSIONS.GROCERY_ADD)
  @UseGuards(AuthGuard, RoleGuard)
  async add(@Body() body: AddGroceryReqDto) {
    const data = await this.groceryService.add(body);
    return {
      data,
      message: messages.addGrocery,
    };
  }

  @Patch(':id')
  @Permission(PERMISSIONS.GROCERY_UPDATE)
  @UseGuards(AuthGuard, RoleGuard)
  async update(
    @Body() body: UpdateGroceryReqDto,
    @Param() param: GroceryIdParamsDto,
  ) {
    const data = await this.groceryService.update(body, param.id);
    return {
      data,
      message: messages.updateGrocery,
    };
  }

  @Delete(':id')
  @Permission(PERMISSIONS.GROCERY_DELETE)
  @UseGuards(AuthGuard, RoleGuard)
  async delete(@Param() param: GroceryIdParamsDto) {
    const data = await this.groceryService.delete(param.id);
    return {
      data,
      message: messages.addGrocery,
    };
  }
}
