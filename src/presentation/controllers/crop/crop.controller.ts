import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateCropUseCase } from '@app/application/usecases/crop/create-crop/icreate-crop-usecase';
import { CreateCropBodyDTO } from '@app/application/usecases/crop/create-crop/create-crop-dto';

@ApiTags('crops')
@Controller('crops')
export class CropController {
  constructor(
    @Inject(ICreateCropUseCase)
    private readonly createCropUseCase: ICreateCropUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCrop(@Body() body: CreateCropBodyDTO) {
    return await this.createCropUseCase.execute(body);
  }
}
