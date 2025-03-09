// FILE: create-order.dto.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  offer_id: number;

  @Field(() => Int)
  user_id: number;

  @Field()
  order_date: Date;

  @Field(() => Int)
  quantity: number;

  @Field()
  total_price: number;
}
