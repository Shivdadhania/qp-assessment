import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './../utils';
import { UserModule } from 'modules/user/user.module';
import { GroceryModule } from 'modules/grocery/grocery.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => ormConfig }),
    UserModule,
    GroceryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
