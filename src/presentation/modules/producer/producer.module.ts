import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CreateProducerUseCase } from '@app/application/usecases/producer/create-producer/create-producer-usecase';
import { ICreateProducerUseCase } from '@app/application/usecases/producer/create-producer/icreate-producer-usecase';
import { ProducerModel } from '@app/infrastructure/database/models/producer-model';
import { ProducerController } from '../../controllers/producer/producer.controller';
import { ProducerRepositoryImplementation } from '@app/infrastructure/database/repositories/producer/producer-repository-implementation';
import { IGetProducersUseCase } from '@app/application/usecases/producer/get-producers/iget-producers-usecase';
import { GetProducersUseCase } from '@app/application/usecases/producer/get-producers/get-producers-usecase';
import { IUpdateProducerUseCase } from '@app/application/usecases/producer/update-producer/iupdate-producer-usecase';
import { UpdateProducerUseCase } from '@app/application/usecases/producer/update-producer/update-producer-usecase';
import { IDeleteProducerUseCase } from '@app/application/usecases/producer/delete-producer/idelete-producer-usecase';
import { DeleteProducerUseCase } from '@app/application/usecases/producer/delete-producer/delete-producer-usecase';
import { ProducerRepository } from '@app/application/interfaces/producer/producer-repository';

@Module({
  imports: [SequelizeModule.forFeature([ProducerModel])],
  controllers: [ProducerController],
  providers: [
    {
      provide: ProducerRepository,
      useClass: ProducerRepositoryImplementation,
    },
    {
      provide: ICreateProducerUseCase,
      useClass: CreateProducerUseCase,
    },
    {
      provide: IGetProducersUseCase,
      useClass: GetProducersUseCase,
    },
    {
      provide: IUpdateProducerUseCase,
      useClass: UpdateProducerUseCase,
    },
    {
      provide: IDeleteProducerUseCase,
      useClass: DeleteProducerUseCase,
    },
  ],
  exports: [ProducerRepository],
})
export class ProducerModule {}
