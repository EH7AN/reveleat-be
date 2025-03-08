import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { Address } from './address.model';
import { AddressService } from './address.service';
import { CreateAddressInput } from './dto/address.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt.guard';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => [Address], { name: 'addresses' })
  @UseGuards(JwtAuthGuard)
  async getAddresses(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Query(() => Address, { name: 'address', nullable: true })
  async getAddress(@Args('id', { type: () => Int }) id: number): Promise<Address> {
    return this.addressService.findById(id);
  }

  @Mutation(() => Address)
  async createAddress(
    @Args('input') input: CreateAddressInput,
  ): Promise<Address> {
    return this.addressService.createAddress(input);
  }
}
