import { Module } from '@nestjs/common';
import { RestaurantOrdersController } from './restaurant-orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RestaurantOrderEntity,
  RestaurantOrderEntitySchema,
} from './entities/order.entity';
import { RestaurantOrdersRepository } from './restaurant-orders.repository';
import { RestaurantOrdersService } from './restaurant-orders.service';

@Module({
  controllers: [RestaurantOrdersController],
  providers: [
    RestaurantOrdersController,
    RestaurantOrdersService,
    {
      provide: RestaurantOrdersRepository.name,
      useClass: RestaurantOrdersRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: RestaurantOrderEntity.name,
        schema: RestaurantOrderEntitySchema,
      },
    ]),
  ],
})
export class RestaurantOrdersModule {}
