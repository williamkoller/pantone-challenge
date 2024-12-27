import { HttpException, HttpStatus } from '@nestjs/common';

export class FarmConflictException extends HttpException {
  constructor(message = 'Farm already exists') {
    super(message, HttpStatus.CONFLICT);
  }
}
