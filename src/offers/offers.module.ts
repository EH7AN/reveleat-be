import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Offer } from './offers.model';

@Module({
  imports: [SequelizeModule.forFeature([Offer])],
  providers: [OffersService],
  controllers: [OffersController]
})
export class OffersModule {}
