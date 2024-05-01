import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../utils';
import { UserEntity } from './../../entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
}
