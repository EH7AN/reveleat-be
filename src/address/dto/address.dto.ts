import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field(() => String)
  user_id: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  address: string;

  @Field({ nullable: true })
  zip?: string;
}
