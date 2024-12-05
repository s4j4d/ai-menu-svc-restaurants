import { Controller, Get, Logger, Patch, Post } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
import { RestaurantsService } from './restaurants.service';
import { CommandRpc } from '../utils/command-rpc.decorator';
import { QueryRpc } from '../utils/query-rpc.decorator';
import {
  AddRestaurantDto,
  AddRestaurantMenuDto,
  GetRestaurantProfileDto,
  GetUserRestaurantPreferencesDto,
  SetUserRestaurantPreferencesDto,
  UpdateMenuItemDto,
  UpdateRestaurantMenuDto,
} from './dto';
import { ApiOperation } from '@nestjs/swagger';
import { GetRestaurantMenusDto } from './dto/get-restaurant-menus.dto';
// import { Payload } from '@nestjs/microservices';

@Controller()
export class RestaurantsController {
  logger = new Logger(RestaurantsController.name);
  constructor(private readonly service: RestaurantsService) {}

  @Post()
  @ApiOperation({ description: 'add a restaurant' })
  @CommandRpc('restaurants', 'restaurants', 'add_restaurant')
  async addRestaurant(data: AddRestaurantDto) {
    this.logger.verbose(this.addRestaurant.name);
    const { __meta, ...d } = data;
    return this.service.addRestaurant(d, __meta);
  }

  @Get('/:id/profile')
  @ApiOperation({ description: 'add a restaurant' })
  @QueryRpc('restaurants', 'restaurants', 'get_restaurant_profile')
  async getRestaurantProfile(data: GetRestaurantProfileDto) {
    this.logger.verbose(this.getRestaurantProfile.name);
    const { __meta, ...d } = data;
    return this.service.getRestaurantProfile(d, __meta);
  }

  @Post('/:userId/userPreferences')
  @ApiOperation({ description: 'set user preferences for a restaurant' })
  @CommandRpc('restaurants', 'restaurants', 'set_user_restaurant_preferences')
  async setUserRestaurantPreferences(data: SetUserRestaurantPreferencesDto) {
    this.logger.verbose(this.setUserRestaurantPreferences.name);
    const { __meta, ...d } = data;
    return this.service.setUserRestaurantPreferences(d, __meta);
  }

  @Get('/:userId/userPreferences')
  @ApiOperation({ description: 'add a restaurant' })
  @QueryRpc('restaurants', 'restaurants', 'get_user_restaurant_preferences')
  async getUserRestaurantPreferences(data: GetUserRestaurantPreferencesDto) {
    this.logger.verbose(this.getUserRestaurantPreferences.name);
    const { __meta, ...d } = data;
    return this.service.getUserRestaurantPreferences(d, __meta);
  }

  /********************************************************************* */

  @Get('/:id/allMenus')
  @ApiOperation({ description: 'get restaurant menus' })
  @QueryRpc('restaurants', 'restaurants', 'get_restaurant_menus')
  async getRestaurantMenus(data: GetRestaurantMenusDto) {
    this.logger.verbose(this.getRestaurantMenus.name);
    const { __meta, ...d } = data;
    return this.service.getRestaurantMenus(d, __meta);
  }

  @Post('/:id/menu')
  @ApiOperation({ description: 'add a restaurant menu' })
  @CommandRpc('restaurants', 'restaurants', 'add_restaurant_menu')
  async addRestaurantMenu(data: AddRestaurantMenuDto) {
    this.logger.verbose(this.addRestaurantMenu.name);
    const { __meta, ...d } = data;
    return this.service.addRestaurantMenu(d, __meta);
  }

  @Patch('/:id/menu')
  @ApiOperation({ description: 'update a restaurant menu' })
  @CommandRpc('restaurants', 'restaurants', 'update_restaurant_menu')
  async updateRestaurantMenu(data: UpdateRestaurantMenuDto) {
    this.logger.verbose(this.updateRestaurantMenu.name);
    const { __meta, ...d } = data;
    return this.service.updateRestaurantMenu(d, __meta);
  }

  @Patch('/:id/menuItem')
  @ApiOperation({ description: 'update a restaurant menu item' })
  @CommandRpc('restaurants', 'restaurants', 'update_menu_item')
  async updateMenuItem(data: UpdateMenuItemDto) {
    this.logger.verbose(this.updateMenuItem.name);
    const { __meta, ...d } = data;
    return this.service.updateMenuItem(d, __meta);
  }

  /**
   * Nestjs has implemented what we have done with sendCommand :)))))))
   * look for Nestjs microservices with rabbitmq
   */
  // @MessagePattern('createRestaurant')

  // @MessagePattern('findAllRestaurants')
  // findAll() {
  //   return this.service.findAll();
  // }
  // @MessagePattern('removeRestaurant')
  // remove(@Payload() id: number) {
  //   return this.service.remove(id);
  // }
}
