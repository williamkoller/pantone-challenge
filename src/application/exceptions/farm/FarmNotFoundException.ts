import { HttpException, HttpStatus } from '@nestjs/common';

export class FarmNotFoundException extends HttpException {
  constructor(message = 'Farm not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
