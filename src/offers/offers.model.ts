import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Meal } from '../meals/meals.model';
import { Address } from '../address/address.model';

@Table
export class Offer extends Model<Offer> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Meal)
  @Column
  meal_id: number;

  @ForeignKey(() => Address)
  @Column
  address_id: number;

  @Column
  order_open_at: Date;

  @Column
  delivery_start_at: Date;

  @Column
  delivery_complete_at: Date;

  @Column
  servings: number;

  @Column
  available_servings: number;

  @Column
  price: number;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;
}
