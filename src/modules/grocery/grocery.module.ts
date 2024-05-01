import { Module } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { GroceryController } from './grocery.controller';
import { GroceryItemsRepository } from 'repo';

@Module({
  controllers: [GroceryController],
  providers: [GroceryService, GroceryItemsRepository],
})
export class GroceryModule {}
