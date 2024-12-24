import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommandRpc } from '../utils/command-rpc.decorator';
import { QueryRpc } from '../utils/query-rpc.decorator';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  CreateOrderDto,
  GetRestaurantOrdersDto,
  GetRestaurantOrdersResponseDto,
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
  @ApiParam({
    name: 'restaurantId',
  })
  @ApiQuery({
    description:
      'status for the type of orders returned. if no value is given all orders all returned.',
    name: 'status',
    enum: ['pending', 'completed'],
  })
  @ApiResponse({
    status: 200,
    type: GetRestaurantOrdersResponseDto,
    example: {
      status: true,
      data: [
        {
          user: {
            id: '4c74f9a2-7631-43f0-8c5b-208e447823b4',
          },
          tableNumber: 10,
          totalAmount: 1200000,
          items: [
            {
              id: '56b8ceda-a189-46e0-80a8-f9cdc5d6c382',
              name: 'sajad-meat',
            },
          ],
          status: 'pending',
          specialRequests: 'please make my food spicy as shit.',
          id: '4676577b-2bb4-43d0-9d00-5a266b617c0b',
        },
        {
          user: {
            id: '4c74f9a2-7631-43f0-8c5b-208e447823b4',
          },
          tableNumber: 10,
          totalAmount: 1200000,
          items: [
            {
              id: '56b8ceda-a189-46e0-80a8-f9cdc5d6c382',
              name: 'sajad-meat',
            },
          ],
          status: 'delivered',
          paymentStatus: 'paid',
          specialRequests: 'please make my food spicy as shit.',
          id: '4676577b-2bb4-43d0-9d00-5a266b617c0s',
        },
      ],
    },
  })
  @QueryRpc('restaurant-orders', 'restaurant-orders', 'get_restaurant_orders')
  async getRestaurantOrders(data: GetRestaurantOrdersDto) {
    this.logger.verbose(this.getRestaurantOrders.name);
    const { __meta, ...d } = data;
    return this.service.getRestaurantOrders(d, __meta);
  }

  @Get('/user/:userId/orders')
  @ApiOperation({ description: 'add a order' })
  @ApiParam({ name: 'userId', example: 'ab51d4d3-e8d3-4754-828d-f943237ecd6f' })
  @QueryRpc(
    'restaurant-orders',
    'restaurant-orders',
    'get_user_restaurant_orders',
  )
  async getUserRestaurantOrders(data: GetUserRestaurantOrdersDto) {
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
