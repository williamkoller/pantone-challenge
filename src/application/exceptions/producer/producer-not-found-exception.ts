import { HttpException, HttpStatus } from '@nestjs/common';

export class ProducerNotFoundException extends HttpException {
  constructor(message = 'Producer not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
