import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { Address } from '../address/address.model';
import { User } from 'src/users/users.model';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
@Table
export class Order extends Model<Order> {
  @Field(() => ID) // Use GraphQL ID type
  @Column({
    type: DataType.UUID, // Ensure UUID
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Field(() => ID) // Ensure it's a string for GraphQL
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID, // Ensure UUID
  })
  user_id: string;

  @Field(() => ID)
  @ForeignKey(() => Address)
  @Column({
    type: DataType.UUID,
  })
  address_id: string;

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
  created_at: Date;

  @Field()
  @Column
  updated_at: Date;
}
