import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMealDto {
  @Field()
  user_id: number;

  @Field()
  name: string;

  @Field()
  photo_uri: string;
}

@InputType()
export class UpdateMealDto {
  @Field({ nullable: true }) // Make fields optional
  name?: string;

  @Field({ nullable: true })
  photo_uri?: string;
}
