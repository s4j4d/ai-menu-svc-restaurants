import { OmitType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';

export class UpdateRestaurantOrderDto extends OmitType(CreateOrderDto, [
  'restaurant',
]) {}
