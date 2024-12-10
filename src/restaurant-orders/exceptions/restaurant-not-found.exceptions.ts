import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantNotFound extends HttpException {
  constructor(id: string) {
    super(`restaurant with id ${id} was not found`, HttpStatus.NOT_FOUND);
  }
}
