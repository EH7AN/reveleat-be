// FILE: order.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './orders.model';
import { CreateOrderInput, OrderDto } from './orders.dto';
import { Offer } from 'src/offers/offers.model';
import { Meal } from 'src/meals/meals.model';
import { User } from 'src/users/users.model';
import { Address } from 'src/address/address.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: typeof Order,
  ) {}

  private generateOrderCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase(); // Generate random 8-character string
  }

  async createOrder(userId: string, input: CreateOrderInput): Promise<Order> {
    const order = new Order({
      ...input,
      user_id: userId,
      status: 'BASKET', // Default status
      order_code: this.generateOrderCode(),
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
  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findByPk(id, {
      include: [
        {
          model: Offer,
          include: [{ model: Meal }],
        },
        {
          model: User,
        },
        {
          model: Address,
        }
      ],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }
}
