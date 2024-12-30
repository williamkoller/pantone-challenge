import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateFarmUseCase } from '@app/application/usecases/farm/create-farm/icreate-farm-usecase';
import {
  CreateFarmBodyDTO,
  CreateFarmParamsDTO,
} from '@app/application/usecases/farm/create-farm/create-farm-dto';
import { IGetFarmsUseCase } from '@app/application/usecases/farm/get-farms/iget-farms-usecase';
import { IUpdateFarmUseCase } from '@app/application/usecases/farm/update-farm/iupdate-farm-usecase';
import {
  UpdateFarmBodyDTO,
  UpdateFarmParamsDTO,
} from '@app/application/usecases/farm/update-farm/update-farm-dto';

@ApiTags('farms')
@Controller('farms')
export class FarmController {
  constructor(
    @Inject(ICreateFarmUseCase)
    private readonly createFarmUseCase: ICreateFarmUseCase,
    @Inject(IGetFarmsUseCase)
    private readonly getFarmsUseCase: IGetFarmsUseCase,
    @Inject(IUpdateFarmUseCase)
    private readonly updateFarmUseCase: IUpdateFarmUseCase,
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
      totalArea: body.totalArea,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getFarms() {
    return await this.getFarmsUseCase.execute();
  }

  @Put(':farmId')
  @HttpCode(HttpStatus.OK)
  async updateFarm(
    @Param() param: UpdateFarmParamsDTO,
    @Body() body: UpdateFarmBodyDTO,
  ) {
    return await this.updateFarmUseCase.execute({
      farmId: param.farmId,
      producerId: body.producerId,
      name: body.name,
      state: body.state,
      arableArea: body.arableArea,
      vegetationArea: body.vegetationArea,
      totalArea: body.totalArea,
    });
  }
}
