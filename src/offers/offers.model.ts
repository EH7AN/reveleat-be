import { Column, ForeignKey, Model, Table, DataType, BelongsTo } from 'sequelize-typescript';
import { Meal } from '../meals/meals.model';
import { Address } from '../address/address.model';

@Table
export class Offer extends Model<Offer> {
  @Column({
    primaryKey: true,
    type: DataType.UUID, // Change to UUID type
    defaultValue: DataType.UUIDV4, // Automatically generate UUID
  })
  id: string; // Change to string to reflect UUID format

  @ForeignKey(() => Meal)
  @Column({
    field: 'meal_id',
    type: DataType.UUID,
    allowNull: false,
  })
  mealId: string;

  @BelongsTo(() => Meal)
  meal: Meal;

  @ForeignKey(() => Address)
  @Column({
    field: 'address_id',
    type: DataType.UUID,
    allowNull: false,
  })
  addressId: string;
  
  @BelongsTo(() => Address)
  address: Address;

  @Column({
    field: 'order_open_at',
    type: DataType.DATE,
    allowNull: false,
  })
  orderOpenAt: Date;

  @Column({
    field: 'order_close_at',
    type: DataType.DATE,
    allowNull: true,
  })
  orderCloseAt?: Date;

  @Column({
    field: 'delivery_start_at',
    type: DataType.DATE,
    allowNull: true,
  })
  deliveryStartAt?: Date;

  @Column({
    field: 'delivery_complete_at',
    type: DataType.DATE,
    allowNull: true,
  })
  deliveryCompleteAt?: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  servings?: number;

  @Column({
    field: 'available_servings',
    type: DataType.INTEGER,
    allowNull: false,
  })
  availableServings: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    field: 'created_at',
    type: DataType.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    allowNull: false,
    type: DataType.DATE,
  })
  updatedAt: Date;
}
