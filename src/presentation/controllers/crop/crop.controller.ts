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
import { ICreateCropUseCase } from '@app/application/usecases/crop/create-crop/icreate-crop-usecase';
import { CreateCropBodyDTO } from '@app/application/usecases/crop/create-crop/create-crop-dto';
import { IGetCropsUseCase } from '@app/application/usecases/crop/get-crops/iget-crops-usecase';

@ApiTags('crops')
@Controller('crops')
export class CropController {
  constructor(
    @Inject(ICreateCropUseCase)
    private readonly createCropUseCase: ICreateCropUseCase,
    @Inject(IGetCropsUseCase)
    private readonly getCropsUseCase: IGetCropsUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCrop(@Body() body: CreateCropBodyDTO) {
    return await this.createCropUseCase.execute(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCrops() {
    return await this.getCropsUseCase.execute();
  }
}
