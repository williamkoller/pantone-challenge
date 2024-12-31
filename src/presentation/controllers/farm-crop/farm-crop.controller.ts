import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateFarmCropUseCase } from '@app/application/usecases/farm-crop/create-farm-crop/icreate-farm-crop-usecase';
import { CreateFarmCropBodyDTO } from '@app/application/usecases/farm-crop/create-farm-crop/create-farm-crop-dto';
import { IGetFarmCropsUseCase } from '@app/application/usecases/farm-crop/get-farm-crops/iget-farm-crops-usecase';

@ApiTags('farm-crops')
@Controller('farm-crops')
export class FarmCropController {
  constructor(
    @Inject(ICreateFarmCropUseCase)
    private readonly createFarmCropUseCase: ICreateFarmCropUseCase,
    @Inject(IGetFarmCropsUseCase)
    private readonly getFarmCropsUseCase: IGetFarmCropsUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFarmCrop(@Body() body: CreateFarmCropBodyDTO) {
    return await this.createFarmCropUseCase.execute(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getFarmCrops() {
    return await this.getFarmCropsUseCase.execute();
  }
}
