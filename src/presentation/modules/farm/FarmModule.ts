import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FarmRepository } from '../../../application/interfaces/farm/FarmRepository';
import { CreateFarmUseCase } from '../../../application/usecases/farm/CreateFarm/CreateFarmUseCase';
import { ICreateFarmUseCase } from '../../../application/usecases/farm/CreateFarm/ICreateFarmUseCase';
import { FarmModel } from '../../../infrastructure/database/models/FarmModel';
import { FarmRepositoryImplementation } from '../../../infrastructure/database/repositories/farm/FarmRepositoryImplementation';
import { FarmController } from '../../controllers/farm/FarmController';
import { ProducerModule } from '../producer/producer.module';
import { IGetFarmsUseCase } from '../../../application/usecases/farm/GetFarms/IGetFarmsUseCase';
import { GetFarmsUseCase } from '../../../application/usecases/farm/GetFarms/GetFarmsUseCase';
import { FarmCropModel } from '../../../infrastructure/database/models/FarmCropModel';
import { CropModel } from '../../../infrastructure/database/models/CropModel';
import { IUpdateFarmUseCase } from '../../../application/usecases/farm/UpdateFarm/IUpdateFarmUseCase';
import { UpdateFarmUseCase } from '../../../application/usecases/farm/UpdateFarm/UpdateFarmUseCase';

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
})
export class FarmModule {}
