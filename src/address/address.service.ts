import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './address.model';
import { CreateAddressInput } from './dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address)
    private addressModel: typeof Address,
  ) {}

  findAll(userId: string): Promise<Address[]> {
    return this.addressModel.findAll({
      where: {
        user_id: userId,
      },
    });
  }

  findById(id: number): Promise<Address> {
    return this.addressModel.findByPk(id);
  }

  createAddress(input: CreateAddressInput): Promise<Address> {
    return this.addressModel.create({ ...input });
  }
}
