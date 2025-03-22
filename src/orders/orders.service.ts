// FILE: order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { CreateOrderInput } from './orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
  ) {}

  async createOrder(userId: string, input: CreateOrderInput): Promise<Order> {
    const order = new Order({
      ...input,
      user_id: userId,
      status: 'BASKET', // Default status
      created_at: new Date(),
      updated_at: new Date(),
    });
    return order.save();
  }
}
