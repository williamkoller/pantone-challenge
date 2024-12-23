import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ICreateProducerUseCase } from '../../../application/usecases/producer/CreateProducer/ICreateProducerUseCase';
import { ApiTags } from '@nestjs/swagger';
import { CreateProducerDTO } from '../../../application/dtos/producer/CreateProducerDTO';
import { IGetProducersUseCase } from '../../../application/usecases/producer/GetProducers/IGetProducersUseCase';

@ApiTags('producers')
@Controller('producers')
export class ProducerController {
  constructor(
    @Inject(ICreateProducerUseCase)
    private readonly createProducerUseCase: ICreateProducerUseCase,
    @Inject(IGetProducersUseCase)
    private readonly getProducersUseCase: IGetProducersUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProducer(@Body() body: CreateProducerDTO) {
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
}
