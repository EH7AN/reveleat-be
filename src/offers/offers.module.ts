import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { OfferResolver } from './offers.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Offer } from './offers.model';
import { MealsModule } from '../meals/meals.module';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [SequelizeModule.forFeature([Offer]), MealsModule, AddressModule],
  providers: [OffersService, OfferResolver],
  controllers: [OffersController],
})
export class OffersModule {}
