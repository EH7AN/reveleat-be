// src/orders/order.model.ts
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Address } from '../address/address.model';
import { User } from 'src/users/users.model';

@Table
export class Order extends Model<Order> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @ForeignKey(() => Address)
  @Column
  address_id: number;

  @Column({
    type: 'ENUM',
    values: ['BASKET', 'PENDING_PAYMENT', 'PLACED', 'COMPLETED'],
    defaultValue: 'BASKET',
  })
  status: string;

  @Column
  cost: number;

  @Column
  bank: string;

  @Column
  payment_reference: string;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;
}
