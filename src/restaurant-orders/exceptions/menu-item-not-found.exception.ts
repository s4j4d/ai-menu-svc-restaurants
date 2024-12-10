import { HttpException, HttpStatus } from '@nestjs/common';

export class MenuItemNotFound extends HttpException {
  constructor(id: string) {
    super(
      `restaurant menu item with id ${id} was not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
