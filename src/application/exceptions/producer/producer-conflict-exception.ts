import { HttpException, HttpStatus } from '@nestjs/common';

export class ProducerConflictException extends HttpException {
  constructor(message = 'Producer already exists') {
    super(message, HttpStatus.CONFLICT);
  }
}
