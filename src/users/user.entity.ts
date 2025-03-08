import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

@ObjectType()
export class TokenUserData {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  phone_number?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  chefAddress?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  photo_uri?: string;

  @Field(() => String)
  @IsUUID()
  id: string;
}
