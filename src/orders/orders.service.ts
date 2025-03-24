// FILE: order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { CreateOrderInput } from './orders.dto';
import { Offer } from 'src/offers/offers.model';
import { Meal } from 'src/meals/meals.model';

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

  async getChefOrders(chefId: string): Promise<Order[]> {
    return this.orderModel.findAll({
      include: [
        {
          model: Offer,
          include: [
            {
              model: Meal,
              where: { user_id: chefId }, // Only fetch meals with the given chef's user_id
            },
          ],
        },
      ],
      order: [['created_at', 'DESC']], // Orders by creation date in descending order
    });
  }
}
