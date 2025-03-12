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
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { User } from '../users/users.model';

@ObjectType()
@Table({
  tableName: 'Addresses',
  timestamps: true, // Ensures automatic createdAt/updatedAt handling
  underscored: true,
})
export class Address extends Model<Address> {
  @Field(() => ID) // Use ID type in GraphQL for UUID
  @Column({
    type: DataType.UUID, // Change from INTEGER to UUID
    defaultValue: DataType.UUIDV4, // Auto-generate UUIDs
    primaryKey: true,
  })
  id: string;

  @Field(() => ID) // Use ID type in GraphQL for UUID
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID, // Ensure user_id is UUID
    allowNull: false,
  })
  user_id: string;

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
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  created_at: Date;

  @Field(() => Date)
  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updated_at: Date;
}
