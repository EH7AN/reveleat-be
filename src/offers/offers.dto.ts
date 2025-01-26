import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateOfferInput {
  @Field()
  meal_id: number;

  @Field()
  address_id: number;

  @Field()
  order_open_at: Date;

  @Field()
  delivery_start_at: Date;

  @Field()
  delivery_complete_at: Date;

  @Field()
  servings: number;

  @Field()
  price: number;
}

@InputType()
export class UpdateOfferInput {
  @Field({ nullable: true })
  meal_id?: number;

  @Field({ nullable: true })
  address_id?: number;

  @Field({ nullable: true })
  order_open_at?: Date;

  @Field({ nullable: true })
  delivery_start_at?: Date;

  @Field({ nullable: true })
  delivery_complete_at?: Date;

  @Field({ nullable: true })
  servings?: number;

  @Field({ nullable: true })
  available_servings?: number;

  @Field({ nullable: true })
  price?: number;
}