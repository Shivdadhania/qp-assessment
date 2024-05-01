import { Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';
import { GroceryListQueryDto } from 'modules/grocery/dto';
import { GroceryItemsRepository } from 'repo';
import { getPaginateOffset } from 'utils';

@Injectable()
export class GroceryService {
  constructor(private readonly groceryRepo: GroceryItemsRepository) {}

  async list(query: GroceryListQueryDto) {
    try {
      const { take, skip, pageNumber } = getPaginateOffset(
        query.current_page,
        query.record_per_page,
      );
      const groceryFilter: { [key: string]: any } = {};

      if (query?.name) {
        groceryFilter['name'] = ILike(`%${query.name}%`);
      }

      const [result, total] = await this.groceryRepo.findAndCount({
        where: groceryFilter,
        order: {
          name: 'ASC',
        },
        take,
        skip,
      });
      const pagination = {
        take,
        skip,
        total,
      };
      return { result, pagination };
    } catch (error) {
      throw error;
    }
  }
}
