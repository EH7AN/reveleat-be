import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
@ObjectType()
export class OffersDto {
  @Field()
  id: string;

  @Field()
  orderOpenAt: Date;

  @Field()
  @IsOptional()
  orderCloseAt?: Date;

  @Field()
  @IsOptional()
  deliveryStartAt?: Date;

  @Field()
  @IsOptional()
  deliveryCompleteAt?: Date;

  @Field()
  @IsOptional()
  servings?: number;

  @Field()
  availableServings: number;

  @Field()
  price: number;
}

@InputType()
export class CreateOfferInput {
  @Field()
  offerName: string;

  @Field()
  offerImage: string;

  @Field()
  orderOpenAt: Date;

  @Field()
  orderCloseAt: Date;

  @Field()
  deliveryStartAt: Date;

  @Field()
  deliveryCompleteAt: Date;

  @Field()
  servings: number;

  @Field()
  availableServings: number;

  @Field()
  price: number;

  @Field({ nullable: true })
  @IsOptional()
  latitude?: number;

  @Field({ nullable: true })
  @IsOptional()
  longitude?: number;

  @Field({ nullable: true })
  @IsOptional()
  address?: string;

  @Field({ nullable: true })
  @IsOptional()
  zip?: string;
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
