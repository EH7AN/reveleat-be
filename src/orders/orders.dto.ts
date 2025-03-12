// FILE: create-order.dto.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
  @Field(() => Int)
  offer_id: number;

  @Field(() => String)
  user_id: string;

  @Field()
  order_date: Date;

  @Field(() => Int)
  quantity: number;

  @Field()
  total_price: number;
}
