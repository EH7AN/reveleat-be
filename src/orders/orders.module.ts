import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderResolver } from './orders.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders.model';

@Module({
  imports: [SequelizeModule.forFeature([Order])],
  providers: [OrdersService, OrderResolver],
  controllers: [OrdersController],
})
export class OrdersModule {}
