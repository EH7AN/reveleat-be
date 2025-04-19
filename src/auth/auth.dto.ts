import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserDto {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  phone_number: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  mobile?: string;

  @Field({ nullable: true })
  photo_uri?: string;

  @Field({ nullable: true })
  chef_address_id?: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => UserDto)
  user: UserDto;
}

@ObjectType()
export class RegisterResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => UserDto)
  user: UserDto;
}

@ObjectType()
export class LoggedUserResponse {
  @Field(() => UserDto)
  user: UserDto;
}
