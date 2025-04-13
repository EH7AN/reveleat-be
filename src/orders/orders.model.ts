import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Address } from '../address/address.model';
import { User } from 'src/users/users.model';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Offer } from 'src/offers/offers.model';

@ObjectType()
@Table
export class Order extends Model<Order> {
  @Field(() => ID)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Field(() => ID)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  user_id: string;

  @Field(() => ID)
  @ForeignKey(() => Offer) // Add relationship to Offer
  @Column({
    field: 'offer_id',
    type: DataType.UUID,
    allowNull: false,
  })
  offer_id: string;

  @BelongsTo(() => Offer)
  offer: Offer;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Address)
  address: Address;

  @Field(() => ID)
  @ForeignKey(() => Address)
  @Column({
    type: DataType.UUID,
  })
  address_id: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  order_code: string;

  @Field()
  @Column({
    type: DataType.ENUM('BASKET', 'PENDING_PAYMENT', 'PLACED', 'COMPLETED'),
    defaultValue: 'BASKET',
  })
  status: string;

  @Field()
  @Column
  cost: number;

  @Field()
  @Column
  bank: string;

  @Field()
  @Column
  payment_reference: string;

  @Field()
  @Column
  quantity: number;

  @Field()
  @Column
  created_at: Date;

  @Field()
  @Column
  updated_at: Date;
}
