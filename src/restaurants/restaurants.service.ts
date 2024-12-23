import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AddRestaurantDto } from './dto/add-restaurant.dto';
import { Metadata } from '../utils/interfaces/metadata.interface';
import {
  CreateQuestionDto,
  GetQuestionsDto,
  GetRestaurantProfileDto,
  GetUserRestaurantPreferencesDto,
  SetUserRestaurantPreferencesDto,
  UpdateMenuItemDto,
  UpdateRestaurantMenuDto,
} from './dto';
import { RestaurantsRepository } from './restaurants.repository';
import { DuplicateIdException } from './exceptions/duplicate-id.exception';
import { GetRestaurantMenusDto } from './dto/get-restaurant-menus.dto';
import {
  MenuItemNotFound,
  RestaurantMenuNotFound,
  RestaurantNotFound,
} from './exceptions';
import { AddRestaurantMenuDto } from './dto/add-restaurant-menu.dto';

@Injectable()
export class RestaurantsService {
  logger = new Logger(RestaurantsService.name);
  constructor(
    @Inject(RestaurantsRepository.name)
    protected readonly repository: RestaurantsRepository,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async addRestaurant(data: AddRestaurantDto, meta: Metadata) {
    this.logger.log('addRestaurant');
    try {
      const restaurant = await this.repository.getRestaurantById(data.id);
      if (restaurant)
        throw new HttpException(
          'Restaurant with the same id exists!',
          HttpStatus.BAD_REQUEST,
        );
      await this.repository.addRestaurant(data);
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
              domain: 'Restaurants',
              context: this.addRestaurant.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  async setUserRestaurantPreferences(
    data: SetUserRestaurantPreferencesDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    meta: Metadata,
  ) {
    this.logger.log(this.setUserRestaurantPreferences.name);
    try {
      //TODO: enable it
      // if (meta?.user?.id !== data.user.id)
      //   throw new HttpException(
      //     `user trying to set preferences for user ${data.user.id}`,
      //     HttpStatus.UNAUTHORIZED,
      //   );
      const restaurant = await this.repository.getRestaurantById(data.id);
      if (restaurant)
        throw new HttpException(
          'Restaurant with the same id exists!',
          HttpStatus.BAD_REQUEST,
        );
      const preference =
        await this.repository.getUserRestaurantPreferences(data);
      if (preference) throw new DuplicateIdException(data.id);
      return this.repository.setUserRestaurantPreferences(data);
    } catch (error) {
      this.logger.error(error);
      return {
        success: false,
        data,
        meta: {
          messages: [
            {
              domain: 'Restaurants',
              context: this.setUserRestaurantPreferences.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getRestaurantProfile(data: GetRestaurantProfileDto, meta: Metadata) {
    this.logger.log(this.getRestaurantProfile.name);

    try {
      const restaurant = await this.repository.getRestaurantById(data.id);
      if (!restaurant) throw new RestaurantNotFound(data.id);
      return {
        status: true,
        data: restaurant,
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
              domain: 'Restaurants',
              context: this.getRestaurantProfile.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUserRestaurantPreferences(
    data: GetUserRestaurantPreferencesDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    meta: Metadata,
  ) {
    this.logger.log(this.getUserRestaurantPreferences.name);
    try {
      if (data.user.id !== meta.user.id)
        throw new HttpException(
          'user does not match the meta',
          HttpStatus.BAD_REQUEST,
        );
      const preferences =
        await this.repository.getUserRestaurantPreferences(data);
      return {
        status: true,
        data: preferences,
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
              domain: 'Restaurants',
              context: this.getUserRestaurantPreferences.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  /******************************************************************* */
  //MENU

  async addRestaurantMenu(data: AddRestaurantMenuDto, meta: Metadata) {
    this.logger.log('addRestaurantMenu');
    try {
      const restaurant = await this.repository.getRestaurantById(
        data.restaurant.id,
      );
      if (!restaurant) throw new RestaurantNotFound(data.restaurant.id);
      await this.repository.addRestaurantMenu(data);
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
              domain: 'Restaurants',
              context: this.addRestaurant.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  async updateRestaurantMenu(data: UpdateRestaurantMenuDto, meta: Metadata) {
    this.logger.log('updateRestaurantMenu');
    try {
      const restaurant = await this.repository.getRestaurantMenusById(data.id);
      if (!restaurant) throw new RestaurantMenuNotFound(data.id);
      await this.repository.updateRestaurantMenu(data);
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
              domain: 'Restaurants',
              context: this.updateRestaurantMenu.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  async updateMenuItem(data: UpdateMenuItemDto, meta: Metadata) {
    this.logger.log(this.updateMenuItem.name);
    try {
      const { items } = await this.repository.getMenuItemById(data.id);
      if (!items.length) throw new MenuItemNotFound(data.id);
      await this.repository.updateMenuItem(data);
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
              domain: 'Restaurants',
              context: this.updateMenuItem.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getRestaurantMenus(data: GetRestaurantMenusDto, meta: Metadata) {
    this.logger.log(this.getRestaurantMenus.name);
    try {
      const menus = await this.repository.getRestaurantMenusById(
        data.restaurantId,
      );
      return {
        status: true,
        data: menus,
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
              domain: 'Restaurants',
              context: this.getRestaurantMenus.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  /******************************************************************* */

  async createQuestion(data: CreateQuestionDto, meta: Metadata) {
    this.logger.log(this.createQuestion.name);
    try {
      const question = await this.repository.getQuestionById(data.questionId);
      if (question) throw new DuplicateIdException(data.questionId);
      await this.repository.createQuestion(data);
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
              domain: 'Restaurants',
              context: this.createQuestion.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAllQuestions(data: GetQuestionsDto, meta: Metadata) {
    this.logger.log(this.getAllQuestions.name);
    try {
      const menus = await this.repository.getAllQuestions();
      return {
        status: true,
        data: menus,
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
              domain: 'Restaurants',
              context: this.getAllQuestions.name,
              error: error.message,
            },
          ],
        },
      };
    }
  }

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
