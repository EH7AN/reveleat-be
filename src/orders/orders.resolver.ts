// FILE: order.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './orders.model';
import { CreateOrderInput } from './orders.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gaurds/jwt.guard';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrdersService) {}

  @Mutation(() => Order)
  @UseGuards(GqlAuthGuard)
  async createOrder(@Args('input') input: CreateOrderInput): Promise<Order> {
    return this.orderService.createOrder(input);
  }
}
