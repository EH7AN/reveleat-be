import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { Address } from '../address/address.model';
import { User } from 'src/users/users.model';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType() // ✅ Add this to define it as a GraphQL Object Type
@Table
export class Order extends Model<Order> {
  @Field(() => Int) // ✅ Mark as a GraphQL field
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field(() => Int) // ✅ Add GraphQL field
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Field(() => Int) // ✅ Add GraphQL field
  @ForeignKey(() => Address)
  @Column
  address_id: number;

  @Field() // ✅ Add GraphQL field
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
