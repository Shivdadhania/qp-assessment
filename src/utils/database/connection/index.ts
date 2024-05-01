import 'reflect-metadata';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from './../../index';
import { entity } from '../../../entity';

export const migrationFolder = path.join(
  __dirname,
  '../../../migrations/**/*.{ts,js}',
);
export const ormConfig: DataSourceOptions = {
  replication: {
    master: {
      host: config.databaseConf.DB_HOST(),
      port: config.databaseConf.DB_PORT(),
      username: config.databaseConf.DB_USERNAME(),
      password: config.databaseConf.DB_PASSWORD(),
      database: config.databaseConf.DB_NAME(),
    },
    slaves: [],
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  schema: config.databaseConf.DB_SCHEMA(),
  type: config.databaseConf.DB_TYPE(),
  entities: entity,
  subscribers: entity,
  migrations: [migrationFolder],
  migrationsTableName: 'migrations',
  logging: 'all',
  logger: config.databaseConf.DB_LOG_LEVEL() as any,
};

export const AppDataSource = new DataSource(ormConfig);
