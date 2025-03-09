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

  async createOrder(input: CreateOrderInput): Promise<Order> {
    return this.orderModel.create(input);
  }
}
