import { HttpException, HttpStatus } from '@nestjs/common';

export class UserConflictException extends HttpException {
  constructor(message = 'User already exists with this email') {
    super(message, HttpStatus.CONFLICT);
  }
}
