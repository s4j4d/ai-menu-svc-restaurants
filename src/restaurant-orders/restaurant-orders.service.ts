import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Metadata } from '../utils/interfaces/metadata.interface';
import {
  CreateOrderDto,
  GetRestaurantOrdersDto,
  GetUserRestaurantOrdersDto,
} from './dto';
import { RestaurantOrdersRepository } from './restaurant-orders.repository';

@Injectable()
export class RestaurantOrdersService {
  logger = new Logger(RestaurantOrdersService.name);
  constructor(
    @Inject(RestaurantOrdersRepository.name)
    protected readonly repository: RestaurantOrdersRepository,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createRestaurantOrder(data: CreateOrderDto, meta: Metadata) {
    this.logger.log(this.createRestaurantOrder.name);
    try {
      const restaurantOrder = await this.repository.getRestaurantOrderById(
        data.id,
      );
      const restaurantOrderTable =
        await this.repository.getRestaurantTableOrders({
          restaurant: data.restaurant,
          tableNUmber: data?.tableNumber,
          orderStatus: 'pending',
        });
      if (restaurantOrder)
        throw new HttpException(
          'Restaurant order with the same id exists!',
          HttpStatus.BAD_REQUEST,
        );
      if (restaurantOrderTable.length > 0)
        throw new HttpException(
          `Pending order for the table ${data?.tableNumber} exists.`,
          HttpStatus.CONFLICT,
        );
      await this.repository.createOrder({ ...data, status: 'pending' });
      return {
        success: true,
        data,
        meta,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        data,
        meta: {
          messages: [
            {
              domain: 'RestaurantOrders',
              context: this.createRestaurantOrder.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getRestaurantOrders(data: GetRestaurantOrdersDto, meta: Metadata) {
    this.logger.log(this.getRestaurantOrders.name);
    try {
      const restaurantOrders = await this.repository.getRestaurantOrders(data);
      return {
        status: true,
        data: restaurantOrders,
        meta,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        data,
        meta: {
          messages: [
            {
              domain: 'RestaurantOrders',
              context: this.getRestaurantOrders.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUserRestaurantOrders(
    data: GetUserRestaurantOrdersDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    meta: Metadata,
  ) {
    this.logger.log(this.getUserRestaurantOrders.name);
    try {
      if (data.user.id !== meta.user.id)
        throw new HttpException(
          'user does not match the meta',
          HttpStatus.BAD_REQUEST,
        );
      const orders = await this.repository.getUserRestaurantOrders(data);
      return {
        status: true,
        data: orders,
        meta,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        data,
        meta: {
          messages: [
            {
              domain: 'RestaurantOrders',
              context: this.getUserRestaurantOrders.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  // /******************************************************************* */
  // //MENU

  // async addRestaurantMenu(data: AddRestaurantMenuDto, meta: Metadata) {
  //   this.logger.log('addRestaurantMenu');
  //   try {
  //     const restaurant = await this.repository.getRestaurantById(
  //       data.restaurant.id,
  //     );
  //     if (!restaurant) throw new RestaurantNotFound(data.id);
  //     await this.repository.addRestaurantMenu(data);
  //     return {
  //       success: true,
  //       data,
  //       meta,
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     return {
  //       success: false,
  //       data,
  //       meta: {
  //         messages: [
  //           {
  //             domain: 'Restaurants',
  //             context: this.addRestaurant.name,
  //             error: error.message,
  //           },
  //         ],
  //       },
  //     };
  //   }
  // }

  // async updateRestaurantMenu(data: UpdateRestaurantMenuDto, meta: Metadata) {
  //   this.logger.log('updateRestaurantMenu');
  //   try {
  //     const restaurant = await this.repository.getRestaurantMenusById(data.id);
  //     if (!restaurant) throw new RestaurantMenuNotFound(data.id);
  //     await this.repository.updateRestaurantMenu(data);
  //     return {
  //       success: true,
  //       data,
  //       meta,
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     return {
  //       success: false,
  //       data,
  //       meta: {
  //         messages: [
  //           {
  //             domain: 'Restaurants',
  //             context: this.updateRestaurantMenu.name,
  //             error: error.message,
  //           },
  //         ],
  //       },
  //     };
  //   }
  // }

  // async updateMenuItem(data: UpdateMenuItemDto, meta: Metadata) {
  //   this.logger.log(this.updateMenuItem.name);
  //   try {
  //     const { items } = await this.repository.getMenuItemById(data.id);
  //     if (!items.length) throw new MenuItemNotFound(data.id);
  //     await this.repository.updateMenuItem(data);
  //     return {
  //       success: true,
  //       data,
  //       meta,
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     return {
  //       success: false,
  //       data,
  //       meta: {
  //         messages: [
  //           {
  //             domain: 'Restaurants',
  //             context: this.updateMenuItem.name,
  //             error: error.message,
  //           },
  //         ],
  //       },
  //     };
  //   }
  // }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // async getRestaurantMenus(data: GetRestaurantMenusDto, meta: Metadata) {
  //   this.logger.log(this.getRestaurantMenus.name);
  //   try {
  //     const menus = await this.repository.getRestaurantMenusById(
  //       data.restaurantId,
  //     );
  //     return {
  //       status: true,
  //       data: menus,
  //       meta,
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     return {
  //       success: false,
  //       data,
  //       meta: {
  //         messages: [
  //           {
  //             domain: 'Restaurants',
  //             context: this.getRestaurantMenus.name,
  //             error: error.message,
  //           },
  //         ],
  //       },
  //     };
  //   }
  // }

  // async updateMenuItemAvailableNumber(data: UpdateMenuItemAvailableNumberDto, meta: Metadata) {
  //   this.logger.log('addRestaurant');
  //   try {
  //     const response = await this.repository.updateMenuItemAvailableNumber(data);
  //     await this.repository.addRestaurant(data);
  //     return {
  //       success: true,
  //       data,
  //       meta,
  //     };
  //   } catch (error) {
  //     this.logger.error(error);
  //     return {
  //       success: false,
  //       data,
  //       meta: {
  //         messages: [
  //           {
  //             domain: 'Restaurants',
  //             context: this.updateMenuItemAvailableNumber.name,
  //             error: error.message,
  //           },
  //         ],
  //       },
  //     };
  //   }
  // }
}
