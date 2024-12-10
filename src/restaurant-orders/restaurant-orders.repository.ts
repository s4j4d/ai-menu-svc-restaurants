import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateOrderDto,
  GetRestaurantOrdersDto,
  GetUserRestaurantOrdersDto,
  UpdateRestaurantOrderDto,
} from './dto';
import {
  RestaurantOrderEntity,
  RestaurantOrderEntityDocument,
} from './entities/order.entity';
@Injectable()
export class RestaurantOrdersRepository {
  private readonly logger = new Logger(RestaurantOrdersRepository.name);

  constructor(
    @InjectModel(RestaurantOrderEntity.name)
    private restaurantOrdersModel: Model<RestaurantOrderEntityDocument>,
  ) {}

  async createOrder(data: CreateOrderDto) {
    this.logger.verbose(this.createOrder.name);
    return new this.restaurantOrdersModel({ ...data, _id: data.id }).save();
  }

  //TODO: add pagination for this endpoint

  async getRestaurantOrders(data: GetRestaurantOrdersDto) {
    const query = {
      'restaurant.id': data.restaurant.id,
    };
    if (data?.ordersStatus) {
      const status = data.ordersStatus === 'pending' ? 'pending' : 'completed';
      Object.assign(query, { status });
    }
    return this.restaurantOrdersModel.find(query);
  }

  //TODO: add pagination for this endpoint
  async getUserRestaurantOrders(data: GetUserRestaurantOrdersDto) {
    return this.restaurantOrdersModel.find({
      'restaurant.id': data.restaurant.id,
      'users.id': data.user.id,
    });
  }

  async getRestaurantOrderById(data: any) {
    return this.restaurantOrdersModel.findOne({
      _id: data.id,
    });
  }

  async getRestaurantTableOrders(data: any) {
    const query = {
      'restaurant.id': data.restaurant.id,
      tableNumber: data?.tableNumber,
    };
    if (data?.orderStatus) {
      const status = data.orderStatus === 'pending' ? 'pending' : 'completed';
      Object.assign(query, { status });
    }
    return this.restaurantOrdersModel.find(query);
  }

  async updateRestaurantOrder(data: UpdateRestaurantOrderDto) {
    return this.restaurantOrdersModel.updateOne(
      { _id: data.id },
      {
        specialRequests: data?.specialRequests,
        tableNumber: data?.tableNumber,
        address: data?.address,
        items: data?.orderItems,
      },
    );
  }
}
