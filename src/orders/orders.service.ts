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
    @InjectModel(Address)
    private readonly addressModel: typeof Address,
  ) {}

  private generateOrderCode(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase(); // Generate random 8-character string
  }

  async createOrder(userId: string, input: CreateOrderInput): Promise<Order> {
    let addressId = input.address_id;

    // If address_id is null, create a new address
    if (!addressId) {
      if (!input.latitude || !input.longitude || !input.address) {
        throw new Error(
          'Latitude, longitude, and address are required to create a new address.',
        );
      }

      const newAddress = await this.addressModel.create({
        user_id: userId,
        latitude: input.latitude,
        longitude: input.longitude,
        address: input.address,
      });

      addressId = newAddress.id; // Use the newly created address ID
    }
    const order = new Order({
      user_id: userId,
      address_id: addressId,
      status: 'BASKET', // Default status
      order_code: this.generateOrderCode(),
      created_at: new Date(),
      updated_at: new Date(),
      offer_id: input.offer_id,
      quantity: input.quantity,
      cost: input.cost,
      bank: input.bank,
      payment_reference: input.payment_reference,
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
  async getUserOrders(userId: string): Promise<Order[]> {
    return this.orderModel.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Offer,
          include: [
            {
              model: Meal,
              where: { user_id: userId }, // Only fetch meals with the given chef's user_id
              include: [{ model: User }],
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

  async completeOrder(id: string): Promise<Order> {
    const order = await this.getOrderById(id);
    order.status = 'COMPLETED';
    await order.save();
    return order;
  }
}
