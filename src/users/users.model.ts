import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Address } from '../address/address.model';

@ObjectType()
@Table({
  tableName: 'Users',
  timestamps: true,
  underscored: true,
})
export class User extends Model<User> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone_number: string;

  @Field({ nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email?: string;

  @Field({ nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo_uri?: string;

  // Foreign key referencing Address
  @Field(() => Int, { nullable: true })
  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  chef_address_id?: number;

  // Optionally define the relationship so you can "include" this address in queries
  @Field(() => Address, { nullable: true })
  @BelongsTo(() => Address, 'chef_address_id')
  chefAddress?: Address;

  @Field(() => Date)
  @CreatedAt
  created_at: Date;

  @Field(() => Date)
  @UpdatedAt
  updated_at: Date;
}
