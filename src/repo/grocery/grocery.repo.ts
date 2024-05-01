import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../utils';
import { GroceryItemsEntity } from '../../entity';

@Injectable()
export class GroceryItemsRepository extends Repository<GroceryItemsEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(GroceryItemsEntity, dataSource.createEntityManager());
  }
}
