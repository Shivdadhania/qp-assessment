import { Test, TestingModule } from '@nestjs/testing';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';

describe('GroceryController', () => {
  let controller: GroceryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceryController],
      providers: [GroceryService],
    }).compile();

    controller = module.get<GroceryController>(GroceryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
