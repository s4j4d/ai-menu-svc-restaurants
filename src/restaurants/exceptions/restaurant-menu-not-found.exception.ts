import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantMenuNotFound extends HttpException {
  constructor(id: string) {
    super(`restaurant menu with id ${id} was not found`, HttpStatus.NOT_FOUND);
  }
}
