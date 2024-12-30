import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FarmCropModel } from '../../../infrastructure/database/models/FarmCropModel';
import { FarmCropController } from '../../controllers/farm-crop/farm-crop.controller';
import { FarmCropRepository } from '../../../application/interfaces/farm-crop/farm-crop-repository';
import { FarmCropRepositoryImplementation } from '../../../infrastructure/database/repositories/farm-crop/farm-crop-repository-implementation';
import { ICreateFarmCropUseCase } from '../../../application/usecases/farm-crop/create-farm-crop/icreate-farm-crop-usecase';
import { CreateFarmCropUseCase } from '../../../application/usecases/farm-crop/create-farm-crop/create-farm-crop-usecase';
import { CropModule } from '../crop/crop.module';
import { FarmModule } from '../farm/farm.module';

@Module({
  imports: [
    SequelizeModule.forFeature([FarmCropModel]),
    CropModule,
    FarmModule,
  ],
  controllers: [FarmCropController],
  providers: [
    {
      provide: FarmCropRepository,
      useClass: FarmCropRepositoryImplementation,
    },
    {
      provide: ICreateFarmCropUseCase,
      useClass: CreateFarmCropUseCase,
    },
  ],
})
export class FarmCropModule {}
