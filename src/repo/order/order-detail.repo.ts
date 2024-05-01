import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../utils';
import { OrderDetailEntity } from '../../entity';

@Injectable()
export class OrderDetailRepository extends Repository<OrderDetailEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(OrderDetailEntity, dataSource.createEntityManager());
  }
}
