import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateFarmCropUseCase } from '@app/application/usecases/farm-crop/create-farm-crop/icreate-farm-crop-usecase';
import { CreateFarmCropBodyDTO } from '@app/application/usecases/farm-crop/create-farm-crop/create-farm-crop-dto';

@ApiTags('farm-crops')
@Controller('farm-crops')
export class FarmCropController {
  constructor(
    @Inject(ICreateFarmCropUseCase)
    private readonly createFarmCropUseCase: ICreateFarmCropUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFarmCrop(@Body() body: CreateFarmCropBodyDTO) {
    return await this.createFarmCropUseCase.execute(body);
  }
}
