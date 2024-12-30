import { HttpException, HttpStatus } from '@nestjs/common';

export class FarmCropConflictException extends HttpException {
  constructor() {
    super('Farm crop already exists', HttpStatus.CONFLICT);
  }
}
