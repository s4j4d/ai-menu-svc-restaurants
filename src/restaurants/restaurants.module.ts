import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuEntity, MenuEntitySchema } from './entities/menu.entity';
import {
  QuestionEntity,
  QuestionEntitySchema,
} from './entities/question.entity';
import {
  RestaurantEntity,
  RestaurantEntitySchema,
} from './entities/restaurant.entity';
import {
  UserPreferencesEntity,
  UserPreferencesEntitySchema,
} from './entities/user-preferences.entity';
import { RestaurantsRepository } from './restaurants.repository';

@Module({
  controllers: [RestaurantsController],
  providers: [
    RestaurantsController,
    RestaurantsService,
    { provide: RestaurantsRepository.name, useClass: RestaurantsRepository },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: MenuEntity.name, schema: MenuEntitySchema },
      { name: QuestionEntity.name, schema: QuestionEntitySchema },
      { name: RestaurantEntity.name, schema: RestaurantEntitySchema },
      { name: UserPreferencesEntity.name, schema: UserPreferencesEntitySchema },
    ]),
  ],
})
export class RestaurantsModule {}
