import { Controller } from '@nestjs/common';
import { GroceryService } from './grocery.service';

@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}
}
