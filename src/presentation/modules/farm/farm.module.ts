import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FarmRepository } from '@app/application/interfaces/farm/farm-repository';
import { CreateFarmUseCase } from '@app/application/usecases/farm/create-farm/create-farm-usecase';
import { ICreateFarmUseCase } from '@app/application/usecases/farm/create-farm/icreate-farm-usecase';
import { FarmModel } from '@app/infrastructure/database/models/farm-model';
import { FarmRepositoryImplementation } from '@app/infrastructure/database/repositories/farm/farm-repository-implementation';
import { FarmController } from '../../controllers/farm/farm.controller';
import { ProducerModule } from '../producer/producer.module';
import { IGetFarmsUseCase } from '@app/application/usecases/farm/get-farms/iget-farms-usecase';
import { GetFarmsUseCase } from '@app/application/usecases/farm/get-farms/get-farms-usecase';
import { FarmCropModel } from '@app/infrastructure/database/models/farm-crop-model';
import { CropModel } from '@app/infrastructure/database/models/crop-model';
import { IUpdateFarmUseCase } from '@app/application/usecases/farm/update-farm/iupdate-farm-usecase';
import { UpdateFarmUseCase } from '@app/application/usecases/farm/update-farm/update-farm-usecase';

@Module({
  imports: [
    SequelizeModule.forFeature([FarmModel, FarmCropModel, CropModel]),
    ProducerModule,
  ],
  controllers: [FarmController],
  providers: [
    {
      provide: FarmRepository,
      useClass: FarmRepositoryImplementation,
    },
    {
      provide: ICreateFarmUseCase,
      useClass: CreateFarmUseCase,
    },
    {
      provide: IGetFarmsUseCase,
      useClass: GetFarmsUseCase,
    },
    {
      provide: IUpdateFarmUseCase,
      useClass: UpdateFarmUseCase,
    },
  ],
  exports: [FarmRepository],
})
export class FarmModule {}
