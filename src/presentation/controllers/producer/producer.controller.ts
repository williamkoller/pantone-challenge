import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ICreateProducerUseCase } from '../../../application/usecases/producer/CreateProducer/ICreateProducerUseCase';
import { ApiTags } from '@nestjs/swagger';
import { IGetProducersUseCase } from '../../../application/usecases/producer/GetProducers/IGetProducersUseCase';
import { IUpdateProducerUseCase } from '../../../application/usecases/producer/UpdateProducer/IUpdateProducerUseCase';
import {
  UpdateProducerBodyDTO,
  UpdateProducerParamsDTO,
} from '../../../application/usecases/producer/UpdateProducer/UpdateProducerDTO';
import { CreateProducerBodyDTO } from '../../../application/usecases/producer/CreateProducer/CreateProducerDTO';
import { IDeleteProducerUseCase } from '../../../application/usecases/producer/DeleteProducer/IDeleteProducerUseCase';
import { DeleteProducerParamsDTO } from '../../../application/usecases/producer/DeleteProducer/DeleteProducerDTO';

@ApiTags('producers')
@Controller('producers')
export class ProducerController {
  constructor(
    @Inject(ICreateProducerUseCase)
    private readonly createProducerUseCase: ICreateProducerUseCase,
    @Inject(IGetProducersUseCase)
    private readonly getProducersUseCase: IGetProducersUseCase,
    @Inject(IUpdateProducerUseCase)
    private readonly updateProducerUseCase: IUpdateProducerUseCase,
    @Inject(IDeleteProducerUseCase)
    private readonly deleteProducerUseCase: IDeleteProducerUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProducer(@Body() body: CreateProducerBodyDTO) {
    return await this.createProducerUseCase.execute({
      name: body.name,
      document: body.document,
      documentType: body.documentType,
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getProducers() {
    return await this.getProducersUseCase.execute();
  }

  @Put(':producerId')
  @HttpCode(HttpStatus.OK)
  async updateProducer(
    @Param() param: UpdateProducerParamsDTO,
    @Body() body: UpdateProducerBodyDTO,
  ) {
    return await this.updateProducerUseCase.execute({
      producerId: param.producerId,
      name: body.name,
      document: body.document,
      documentType: body.documentType,
    });
  }

  @Delete(':producerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteProducer(@Param() param: DeleteProducerParamsDTO) {
    await this.deleteProducerUseCase.execute({
      producerId: param.producerId,
    });
  }
}
