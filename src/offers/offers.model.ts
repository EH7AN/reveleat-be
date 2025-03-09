import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Meal } from '../meals/meals.model';
import { Address } from '../address/address.model';
import { DataTypes } from 'sequelize';
@Table
export class Offer extends Model<Offer> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Meal)
  @Column({
    field: 'meal_id',
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  mealIid: number;

  @ForeignKey(() => Address)
  @Column({
    field: 'address_id',
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  addressId: number;

  @Column({
    field: 'order_open_at',
    type: DataTypes.DATE,
    allowNull: false,
  })
  orderOpenAt: Date;

  @Column({
    field: 'order_close_at',
    type: DataTypes.DATE,
    allowNull: true,
  })
  orderCloseAt?: Date;

  @Column({
    field: 'delivery_start_at',
    type: DataTypes.DATE,
    allowNull: true,
  })
  deliveryStartAt?: Date;

  @Column({
    field: 'delivery_complete_at',
    type: DataTypes.DATE,
    allowNull: true,
  })
  deliveryCompleteAt?: Date;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  servings?: number;

  @Column({
    field: 'available_servings',
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  availableServings: number;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    allowNull: false,
    type: DataTypes.DATE,
  })
  updatedAt: Date;
}
