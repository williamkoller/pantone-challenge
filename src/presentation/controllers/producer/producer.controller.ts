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
import { ICreateProducerUseCase } from '@app/application/usecases/producer/create-producer/icreate-producer-usecase';
import { ApiTags } from '@nestjs/swagger';
import { IGetProducersUseCase } from '@app/application/usecases/producer/get-producers/iget-producers-usecase';
import { IUpdateProducerUseCase } from '@app/application/usecases/producer/update-producer/iupdate-producer-usecase';
import {
  UpdateProducerBodyDTO,
  UpdateProducerParamsDTO,
} from '@app/application/usecases/producer/update-producer/update-producer-dto';
import { CreateProducerBodyDTO } from '@app/application/usecases/producer/create-producer/create-producer-dto';
import { IDeleteProducerUseCase } from '@app/application/usecases/producer/delete-producer/idelete-producer-usecase';
import { DeleteProducerParamsDTO } from '@app/application/usecases/producer/delete-producer/delete-producer-dto';

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
