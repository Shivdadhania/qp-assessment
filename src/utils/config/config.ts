require('dotenv');
import { getEnv, loadEnv } from './../env.utils';
loadEnv();

export const config = {
  appConf: {
    APP_ENV: getEnv('APP_ENV'),
    BACKEND_PORT: getEnv('BACKEND_PORT'),
  },
  databaseConf: {
    DB_TYPE: () => getEnv('DB_TYPE', 'postgres') as any,
    DB_HOST: () => getEnv('DB_HOST'),
    DB_PORT: () => parseInt(getEnv('DB_PORT')),
    DB_USERNAME: () => getEnv('DB_USERNAME'),
    DB_PASSWORD: () => getEnv('DB_PASSWORD'),
    DB_NAME: () => getEnv('DB_NAME'),
    DB_LOG_LEVEL: () => getEnv('DB_LOG_LEVEL'),
    DB_SCHEMA: () => getEnv('DB_SCHEMA', 'public'),
  },
  jwtConf: {
    JWT_SECRET: getEnv('JWT_SECRET'),
  },
};
