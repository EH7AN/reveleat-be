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
  declare id: number;

  @ForeignKey(() => Meal)
  @Column({
    field: 'meal_id',
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  declare mealIid: number;

  @ForeignKey(() => Address)
  @Column({
    field: 'address_id',
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  declare addressId: number;

  @Column({
    field: 'order_open_at',
    type: DataTypes.DATE,
    allowNull: false,
  })
  declare orderOpenAt: Date;

  @Column({
    field: 'order_close_at',
    type: DataTypes.DATE,
    allowNull: true,
  })
  declare orderCloseAt?: Date;

  @Column({
    field: 'delivery_start_at',
    type: DataTypes.DATE,
    allowNull: true,
  })
  declare deliveryStartAt?: Date;

  @Column({
    field: 'delivery_complete_at',
    type: DataTypes.DATE,
    allowNull: true,
  })
  declare deliveryCompleteAt?: Date;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: true,
  })
  declare servings?: number;

  @Column({
    field: 'available_servings',
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  declare availableServings: number;

  @Column({
    type: DataTypes.FLOAT,
    allowNull: false,
  })
  declare price: number;

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
