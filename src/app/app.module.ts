import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './../utils';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: () => ormConfig })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
