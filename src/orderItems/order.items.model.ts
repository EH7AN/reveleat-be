import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Offer } from '../offers/offers.model';
import { Order } from 'src/orders/orders.model';

@Table
export class OrderItem extends Model<OrderItem> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Order)
  @Column
  order_id: number;

  @ForeignKey(() => Offer)
  @Column
  offer_id: number;

  @Column
  servings: number;

  @Column
  price: number;

  @Column({
    type: 'ENUM',
    values: ['TO_BE_DELIVERED', 'DELIVERING', 'DELIVERED'],
    defaultValue: 'TO_BE_DELIVERED',
  })
  status: string;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;
}
