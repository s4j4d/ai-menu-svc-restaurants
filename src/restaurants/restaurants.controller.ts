import { Body, Controller, Get, Logger, Patch, Post } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
import { RestaurantsService } from './restaurants.service';
import { CommandRpc } from '../utils/command-rpc.decorator';
import { QueryRpc } from '../utils/query-rpc.decorator';
import {
  AddRestaurantDto,
  AddRestaurantMenuDto,
  CreateQuestionDto,
  GetQuestionsDto,
  GetRestaurantProfileDto,
  GetUserRestaurantPreferencesDto,
  SetUserRestaurantPreferencesDto,
  UpdateMenuItemDto,
  UpdateRestaurantMenuDto,
} from './dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { GetRestaurantMenusDto } from './dto/get-restaurant-menus.dto';
// import { Payload } from '@nestjs/microservices';

@Controller('api/v1/restaurants')
export class RestaurantsController {
  logger = new Logger(RestaurantsController.name);
  constructor(private readonly service: RestaurantsService) {}

  @Post()
  @ApiOperation({ description: 'add a restaurant' })
  @CommandRpc('restaurants', 'restaurants', 'add_restaurant')
  async addRestaurant(@Body() data: AddRestaurantDto) {
    this.logger.verbose(this.addRestaurant.name);
    const { __meta, ...d } = data;
    return this.service.addRestaurant(d, __meta);
  }

  @Get('/:id/profile')
  @ApiOperation({ description: 'get a restaurant profile' })
  @QueryRpc('restaurants', 'restaurants', 'get_restaurant_profile')
  @ApiParam({ name: 'id', example: 'ab51d4d3-e8d3-4754-828d-f943237ecd6f' })
  async getRestaurantProfile(data: GetRestaurantProfileDto) {
    this.logger.verbose(this.getRestaurantProfile.name);
    const { __meta, ...d } = data;
    return this.service.getRestaurantProfile(d, __meta);
  }

  @Post('/:userId/user_preferences')
  @ApiOperation({ description: 'set user preferences for a restaurant' })
  @CommandRpc('restaurants', 'restaurants', 'set_user_restaurant_preferences')
  async setUserRestaurantPreferences(
    @Body() data: SetUserRestaurantPreferencesDto,
  ) {
    this.logger.verbose(this.setUserRestaurantPreferences.name);
    const { __meta, ...d } = data;
    return this.service.setUserRestaurantPreferences(d, __meta);
  }

  @Get('/:userId/user_preferences')
  @ApiOperation({ description: 'add a restaurant' })
  @ApiParam({ name: 'userId', example: 'ab51d4d3-e8d3-4754-828d-f943237ecd6f' })
  @QueryRpc('restaurants', 'restaurants', 'get_user_restaurant_preferences')
  async getUserRestaurantPreferences(data: GetUserRestaurantPreferencesDto) {
    this.logger.verbose(this.getUserRestaurantPreferences.name);
    const { __meta, ...d } = data;
    return this.service.getUserRestaurantPreferences(d, __meta);
  }

  /********************************************************************* */

  @Get('/:id/all_menus')
  @ApiOperation({ description: 'get restaurant menus' })
  @ApiParam({ name: 'id', example: 'ab51d4d3-e8d3-4754-828d-f943237ecd6f' })
  @QueryRpc('restaurants', 'restaurants', 'get_restaurant_menus')
  async getRestaurantMenus(data: GetRestaurantMenusDto) {
    this.logger.verbose(this.getRestaurantMenus.name);
    const { __meta, ...d } = data;
    return this.service.getRestaurantMenus(d, __meta);
  }

  @Post('/:id/menu')
  @ApiOperation({ description: 'add a restaurant menu' })
  @CommandRpc('restaurants', 'restaurants', 'add_restaurant_menu')
  async addRestaurantMenu(@Body() data: AddRestaurantMenuDto) {
    this.logger.verbose(this.addRestaurantMenu.name);
    const { __meta, ...d } = data;
    return this.service.addRestaurantMenu(d, __meta);
  }

  @Patch('/:id/menu')
  @ApiOperation({ description: 'update a restaurant menu' })
  @CommandRpc('restaurants', 'restaurants', 'update_restaurant_menu')
  async updateRestaurantMenu(@Body() data: UpdateRestaurantMenuDto) {
    this.logger.verbose(this.updateRestaurantMenu.name);
    const { __meta, ...d } = data;
    return this.service.updateRestaurantMenu(d, __meta);
  }

  @Patch('/:id/menu_item')
  @ApiOperation({ description: 'update a restaurant menu item' })
  @CommandRpc('restaurants', 'restaurants', 'update_menu_item')
  async updateMenuItem(@Body() data: UpdateMenuItemDto) {
    this.logger.verbose(this.updateMenuItem.name);
    const { __meta, ...d } = data;
    return this.service.updateMenuItem(d, __meta);
  }

  /********************************************************************* */

  @Post('/question')
  @ApiOperation({ description: 'create a new question' })
  @CommandRpc('restaurants', 'restaurants', 'create_question')
  async createQuestion(@Body() data: CreateQuestionDto) {
    this.logger.verbose(this.createQuestion.name);
    const { __meta, ...d } = data;
    return this.service.createQuestion(d, __meta);
  }

  @Get('/question/all_questions')
  @ApiOperation({ description: 'get all questions there is.' })
  @ApiParam({ name: 'id', example: 'ab51d4d3-e8d3-4754-828d-f943237ecd6f' })
  @QueryRpc('restaurants', 'restaurants', 'get_all_questions')
  async getAllQuestions(data: GetQuestionsDto) {
    this.logger.verbose(this.getAllQuestions.name);
    const { __meta, ...d } = data;
    return this.service.getAllQuestions(d, __meta);
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
