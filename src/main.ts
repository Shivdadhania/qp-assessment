import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';
import {
  config,
  currentEnv,
  GlobalExceptionFilter,
  loadEnv,
  logger,
  TransformInterceptor,
} from './utils';

async function bootstrap() {
  loadEnv();
  const app = await NestFactory.create(AppModule, {
    logger: logger,
    abortOnError: false,
    bufferLogs: true,
  });
  app.useLogger(logger);

  app.use(compression());
  app.enableCors();
  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: '/',
        method: RequestMethod.GET,
      },
    ],
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  const port = config.appConf.BACKEND_PORT;
  app.listen(port, () =>
    logger.log(
      `Server started port=${port}, url=http://0.0.0.0:${port}, env=${currentEnv()}`,
    ),
  );
}
bootstrap();
