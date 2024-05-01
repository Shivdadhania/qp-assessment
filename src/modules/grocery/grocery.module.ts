import { Module } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { GroceryController } from './grocery.controller';

@Module({
  controllers: [GroceryController],
  providers: [GroceryService]
})
export class GroceryModule {}
