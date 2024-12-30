import { HttpException, HttpStatus } from '@nestjs/common';

export class CropConflictException extends HttpException {
  constructor() {
    super('Crop already exists', HttpStatus.CONFLICT);
  }
}
