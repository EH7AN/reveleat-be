// FILE: order.resolver.ts
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './orders.model';
import { CreateOrderInput } from './orders.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt.guard';
import { AuthUser } from 'src/users/user.decorator';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrdersService) {}

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Args('input') input: CreateOrderInput,
    @AuthUser() user,
  ): Promise<Order> {
    return this.orderService.createOrder(user.id, input);
  }
}
