import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address } from './address.model';
import { AddressResolver } from './address.resolver';
import { AddressService } from './address.service';

@Module({
  imports: [SequelizeModule.forFeature([Address])],
  providers: [AddressResolver, AddressService],
  exports: [AddressService],
})
export class AddressModule {}
