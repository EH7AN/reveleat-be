import { Column, ForeignKey, Model, Table, DataType } from 'sequelize-typescript';
import { Offer } from '../offers/offers.model';
import { Order } from '../orders/orders.model';

@Table
export class OrderItem extends Model<OrderItem> {
  @Column({
    primaryKey: true,
    type: DataType.UUID, // Change to UUID
    defaultValue: DataType.UUIDV4, // Auto-generate UUIDs
  })
  id: string; // Change to string for UUID

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  orderId: string;

  @ForeignKey(() => Offer)
  @Column({
    type: DataType.UUID, // Ensure offer_id is UUID
    allowNull: false,
  })
  offerId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  servings: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.ENUM('TO_BE_DELIVERED', 'DELIVERING', 'DELIVERED'),
    allowNull: false,
    defaultValue: 'TO_BE_DELIVERED',
  })
  status: string;

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
