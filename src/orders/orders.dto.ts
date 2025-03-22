// FILE: create-order.dto.ts
import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => String)
  offer_id: string;

  @Field(() => String)
  address_id: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  cost: number;

  @Field(() => String, { nullable: true })
  bank?: string;

  @Field(() => String, { nullable: true })
  payment_reference?: string;
}
