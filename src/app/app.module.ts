import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormConfig } from './../utils';
import { UserModule } from 'modules/user/user.module';
import { GroceryModule } from 'modules/grocery/grocery.module';
import { OrderModule } from 'modules/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => ormConfig }),
    UserModule,
    GroceryModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
