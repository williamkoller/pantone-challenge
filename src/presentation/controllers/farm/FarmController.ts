import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateFarmUseCase } from '../../../application/usecases/farm/CreateFarm/ICreateFarmUseCase';
import {
  CreateFarmBodyDTO,
  CreateFarmParamsDTO,
} from '../../../application/usecases/farm/CreateFarm/CreateFarmDTO';
import { IGetFarmsUseCase } from '../../../application/usecases/farm/GetFarms/IGetFarmsUseCase';

@ApiTags('farms')
@Controller('farms')
export class FarmController {
  constructor(
    @Inject(ICreateFarmUseCase)
    private readonly createFarmUseCase: ICreateFarmUseCase,
    @Inject(IGetFarmsUseCase)
    private readonly getFarmsUseCase: IGetFarmsUseCase,
  ) {}

  @Post('producer/:producerId')
  @HttpCode(HttpStatus.CREATED)
  async createFarm(
    @Param() param: CreateFarmParamsDTO,
    @Body() body: CreateFarmBodyDTO,
  ) {
    return await this.createFarmUseCase.execute({
      producerId: param.producerId,
      name: body.name,
      state: body.state,
      arableArea: body.arableArea,
      vegetationArea: body.vegetationArea,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getFarms() {
    return await this.getFarmsUseCase.execute();
  }
}
