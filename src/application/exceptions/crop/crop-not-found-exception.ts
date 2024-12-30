import { HttpException, HttpStatus } from '@nestjs/common';

export class CropNotFoundException extends HttpException {
  constructor() {
    super('Crop not found', HttpStatus.NOT_FOUND);
  }
}
