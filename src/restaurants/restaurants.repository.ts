import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { Redis } from 'ioredis';
import {
  RestaurantEntityDocument,
  RestaurantEntity,
} from './entities/restaurant.entity';
import {
  AddRestaurantDto,
  CreateQuestionDto,
  GetUserRestaurantPreferencesDto,
  UpdateMenuItemDto,
  UpdateRestaurantMenuDto,
} from './dto';
// import { Metadata } from '.../utils/interfaces/metadata.interface';
import { SetUserRestaurantPreferencesDto } from './dto/set-restaurant-preferences .dto';
import {
  UserPreferencesEntity,
  UserPreferencesEntityDocument,
} from './entities/user-preferences.entity';
import { MenuEntity, MenuEntityDocument } from './entities/menu.entity';
import { AddRestaurantMenuDto } from './dto/add-restaurant-menu.dto';
import {
  QuestionEntity,
  QuestionEntityDocument,
} from './entities/question.entity';
@Injectable()
export class RestaurantsRepository {
  private readonly logger = new Logger(RestaurantsRepository.name);

  constructor(
    @InjectModel(RestaurantEntity.name)
    private restaurantModel: Model<RestaurantEntityDocument>,
    @InjectModel(UserPreferencesEntity.name)
    private preferenceModel: Model<UserPreferencesEntityDocument>,
    @InjectModel(MenuEntity.name)
    private menuModel: Model<MenuEntityDocument>,
    @InjectModel(QuestionEntity.name)
    private questionModel: Model<QuestionEntityDocument>,
  ) {}

  // remember we need redis and status changes for the microservice structure and eliminating race conditions
  //   async updateStatus(id: string, status: string) {
  //     return this.RestaurantModel.findOneAndUpdate({ _id: id }, { status });
  //   }

  async addRestaurant(data: AddRestaurantDto) {
    return new this.restaurantModel({ ...data, _id: data.id }).save();
  }

  async getRestaurantById(id: string) {
    return this.restaurantModel.findOne({
      deletedAt: null,
      status: { $ne: 'pending' },
      _id: id,
    });
  }

  async getRestaurantMenusById(restaurantId: string) {
    return this.menuModel.find({
      deletedAt: null,
      status: { $ne: 'pending' },
      'restaurant.id': restaurantId,
    });
  }

  async setUserRestaurantPreferences(data: SetUserRestaurantPreferencesDto) {
    return new this.preferenceModel(data).save();
  }

  async getUserRestaurantPreferences(data: GetUserRestaurantPreferencesDto) {
    const result = await this.preferenceModel.findOne({
      'user.id': data.user.id,
    });
    return result?.preferences;
  }

  async addRestaurantMenu(data: AddRestaurantMenuDto) {
    return new this.menuModel({ ...data, _id: data.id }).save();
  }

  async updateRestaurantMenu(data: UpdateRestaurantMenuDto) {
    return this.menuModel.updateOne(
      { _id: data.id },
      {
        category: data.category,
        description: data?.description,
        logoId: data?.logoId,
      },
    );
  }

  async getMenuItemById(itemId: string) {
    return this.menuModel.findOne({ 'items.id': itemId }, { 'items.$': 1 });
  }

  async updateMenuItem(data: UpdateMenuItemDto) {
    return this.menuModel.updateOne(
      { 'items.id': data.id },
      { $set: { 'items.$': data } },
    );
  }

  async createQuestion(data: CreateQuestionDto) {
    return new this.questionModel({ ...data, _id: data.questionId }).save();
  }
  async getQuestionById(id: string) {
    return this.questionModel.findOne({
      deletedAt: null,
      _id: id,
    });
  }

  async getAllQuestions() {
    return this.questionModel.find();
  }
}
