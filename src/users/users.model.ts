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
import { Field, ObjectType, ID, Int } from '@nestjs/graphql';
import { Address } from '../address/address.model';

@ObjectType()
@Table({
  tableName: 'Users',
  timestamps: true,
  underscored: true,
})
export class User extends Model<User> {
  @Field(() => ID) // GraphQL ID type (UUID)
  @Column({
    type: DataType.UUID, // Use UUID instead of Integer
    defaultValue: DataType.UUIDV4, // Auto-generate UUIDs
    primaryKey: true,
  })
  id: string;

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
    allowNull: true,
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
  mobile?: string;

  @Field({ nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo_uri?: string;

  // Keep chef_address_id as INTEGER for now
  @Field(() => Int, { nullable: true }) 
  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER, // Keep it as INTEGER for now
    allowNull: true,
  })
  chef_address_id?: number;

  // Define the relationship
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
