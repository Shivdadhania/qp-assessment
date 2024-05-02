import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ILike } from 'typeorm';
import {
  GroceryListQueryDto,
  AddGroceryReqDto,
  UpdateGroceryReqDto,
} from './dto';
import { GroceryItemsRepository } from './../../repo';
import { getPaginateOffset, messages } from './../../utils';

@Injectable()
export class GroceryService {
  constructor(private readonly groceryRepo: GroceryItemsRepository) {}

  /**
   * return grocery item with given name
   * @param name name of grocery
   * @returns
   */
  private async checkGroceryNameExists(name: string) {
    return this.groceryRepo.findOne({
      where: {
        name,
      },
    });
  }

  /**
   * return list of grocery items
   * @param query search & pagination params
   * @returns
   */
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

  /**
   * add new grocery item
   * @param body grocery params
   * @returns
   */
  async add(body: AddGroceryReqDto) {
    try {
      const res = await this.checkGroceryNameExists(body.name);
      if (res) {
        throw new ConflictException(messages.groceryAlreadyExists);
      }
      return this.groceryRepo.save({
        ...body,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * update grocery item
   * @param body grocery params
   * @param id grocery id
   * @returns
   */
  async update(body: UpdateGroceryReqDto, id: string) {
    try {
      const res = await this.groceryRepo.findOne({
        where: {
          id,
        },
      });
      if (!res) {
        throw new NotFoundException(messages.groceryNotFound);
      }

      await this.groceryRepo.update(
        { id },
        {
          ...body,
        },
      );
      return;
    } catch (error) {
      throw error;
    }
  }

  /**
   * delete perticular grocery item
   * @param id grocery id
   * @returns
   */
  async delete(id: string) {
    try {
      const res = await this.groceryRepo.findOne({
        where: {
          id,
        },
      });
      if (!res) {
        throw new NotFoundException(messages.groceryNotFound);
      }

      await this.groceryRepo.delete({ id });
      return;
    } catch (error) {
      throw error;
    }
  }
}
