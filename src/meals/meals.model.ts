import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@ObjectType() // Add this decorator
@Table
export class Meal extends Model<Meal> {
  @Field(() => Int)
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field(() => Int)
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Field()
  @Column
  name: string;

  @Field()
  @Column
  photo_uri: string;

  @Field()
  @Column
  created_at: Date;

  @Field()
  @Column
  updated_at: Date;
}
