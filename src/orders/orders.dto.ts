// FILE: create-order.dto.ts
import { InputType, Field, Int, Float, ID, ObjectType } from '@nestjs/graphql';
import { Address } from 'src/address/address.model';
import { OffersDto } from 'src/offers/offers.dto';
import { User } from 'src/users/users.model';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  offer_id: string;

  @Field(() => String, { nullable: true })
  address_id?: string; // Address ID can be null

  @Field(() => Float, { nullable: true })
  latitude?: number; // Latitude for creating a new address

  @Field(() => Float, { nullable: true })
  longitude?: number; // Longitude for creating a new address

  @Field(() => String, { nullable: true })
  address?: string; // Address string for creating a new address

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  cost: number;

  @Field(() => String, { nullable: true })
  bank?: string;

  @Field(() => String, { nullable: true })
  payment_reference?: string;
}

@ObjectType()
export class OrderDto {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  user_id: string;

  @Field(() => User)
  user: User;

  @Field(() => ID)
  offer_id: string;

  @Field(() => OffersDto)
  offer: OffersDto;

  @Field(() => ID)
  address_id: string;

  @Field(() => Address)
  address: Address;

  @Field()
  order_code: string;

  @Field()
  status: string;

  @Field()
  cost: number;

  @Field({ nullable: true })
  bank: string;

  @Field({ nullable: true })
  payment_reference: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
