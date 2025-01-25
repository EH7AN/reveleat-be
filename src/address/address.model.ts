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
import { Field, ObjectType, Int, Float } from '@nestjs/graphql';
import { User } from '../users/users.model';

@ObjectType()
@Table({
  tableName: 'Addresses',
  timestamps: false, // We'll manually handle createdAt/updatedAt if they differ
  underscored: true,
})
export class Address extends Model<Address> {
  @Field(() => Int)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @Field(() => Float)
  @Column({
    type: DataType.DECIMAL(10, 7),
    allowNull: false,
  })
  latitude: number;

  @Field(() => Float)
  @Column({
    type: DataType.DECIMAL(10, 7),
    allowNull: false,
  })
  longitude: number;

  @Field()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Field({ nullable: true })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  zip?: string;

  @Field(() => Date)
  @CreatedAt
  created_at: Date;

  @Field(() => Date)
  @UpdatedAt
  updated_at: Date;
}
