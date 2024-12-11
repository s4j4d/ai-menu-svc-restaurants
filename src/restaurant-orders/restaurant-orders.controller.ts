import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommandRpc } from '../utils/command-rpc.decorator';
import { QueryRpc } from '../utils/query-rpc.decorator';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import {
  CreateOrderDto,
  GetRestaurantOrdersDto,
  GetUserRestaurantOrdersDto,
  // UpdateRestaurantOrderDto,
} from './dto';
import { RestaurantOrdersService } from './restaurant-orders.service';
// import { Payload } from '@nestjs/microservices';

@Controller()
export class RestaurantOrdersController {
  logger = new Logger(RestaurantOrdersController.name);
  constructor(private readonly service: RestaurantOrdersService) {}

  @Post()
  @ApiOperation({ description: 'create an order' })
  @CommandRpc('restaurant-orders', 'restaurant-orders', 'create_order')
  async createRestaurantOrder(@Body() data: CreateOrderDto) {
    try {
      this.logger.verbose(this.createRestaurantOrder.name);
      const { __meta, ...d } = data;
      return this.service.createRestaurantOrder(d, __meta);
    } catch (error) {
      return { status: 400, message: error.message };
    }
  }

  @Get('/restaurant/:restaurantId/orders')
  @ApiOperation({ description: 'get a restaurant orders' })
  @ApiQuery({
    description:
      'status for the type of orders returned. if no value is given all orders all returned.',
    name: 'status',
    enum: ['pending', 'completed'],
  })
  @QueryRpc('restaurant-orders', 'restaurant-orders', 'get_restaurant_orders')
  async getRestaurantOrders(@Body() data: GetRestaurantOrdersDto) {
    this.logger.verbose(this.getRestaurantOrders.name);
    const { __meta, ...d } = data;
    return this.service.getRestaurantOrders(d, __meta);
  }

  @Get('/user/:userId/orders')
  @ApiOperation({ description: 'add a order' })
  @QueryRpc(
    'restaurant-orders',
    'restaurant-orders',
    'get_user_restaurant_orders',
  )
  async getUserRestaurantOrders(@Param() data: GetUserRestaurantOrdersDto) {
    this.logger.verbose(this.getUserRestaurantOrders.name);
    const { __meta, ...d } = data;
    return this.service.getUserRestaurantOrders(d, __meta);
  }

  // @Patch()
  // @ApiOperation({ description: 'update a restaurant menu' })
  // @CommandRpc('restaurants', 'restaurants', 'update_restaurant_order')
  // async updateRestaurantOrder(@Body() data: UpdateRestaurantOrderDto) {
  //   this.logger.verbose(this.updateRestaurantOrder.name);
  //   const { __meta, ...d } = data;
  //   return this.service.updateRestaurantOrder(d, __meta);
  // }
}
