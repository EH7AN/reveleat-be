// FILE: order.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './orders.model';
import { CreateOrderInput, OrderDto } from './orders.dto';
import {  UseGuards } from '@nestjs/common';
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
    return this.orderService.createOrder(user?.userId, input);
  }

  @Query(() => [OrderDto], { name: 'getChefOrders' })
  @UseGuards(JwtAuthGuard)
  async getChefOrders(@AuthUser() user): Promise<Order[]> {
    return this.orderService.getChefOrders(user?.userId);
  }

  @Query(() => OrderDto, { name: 'getOrderById' })
  @UseGuards(JwtAuthGuard)
  async getOrderById(@Args('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }
}
