import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../utils';
import { OrderEntity } from '../../entity';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(OrderEntity, dataSource.createEntityManager());
  }
}
