import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderResolver } from './orders.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { OffersModule } from 'src/offers/offers.module';
import { MealsModule } from 'src/meals/meals.module';
import { AddressModule } from 'src/address/address.module';
import { Address } from 'src/address/address.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, Address]),
    OffersModule,
    MealsModule,
    AddressModule,
  ],
  providers: [OrdersService, OrderResolver],
  controllers: [OrdersController],
})
export class OrdersModule {}
