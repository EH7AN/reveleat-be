import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, ForeignKey, Model, Table, DataType } from 'sequelize-typescript';
import { User } from 'src/users/users.model';

@ObjectType()
@Table
export class Meal extends Model<Meal> {
  @Field(() => ID)
  @Column({
    primaryKey: true,
    type: DataType.UUID, // Change to UUID type
    defaultValue: DataType.UUIDV4, // Automatically generate UUID
  })
  id: string; // Change to string to reflect UUID format

  @Field(() => ID) // Ensure UUID type for GraphQL
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID, // Ensure UUID
  })
  user_id: string;

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
