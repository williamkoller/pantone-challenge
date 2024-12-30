import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FarmCropModel } from '@app/infrastructure/database/models/farm-crop-model';
import { FarmCropController } from '@app/presentation/controllers/farm-crop/farm-crop.controller';
import { FarmCropRepository } from '@app/application/interfaces/farm-crop/farm-crop-repository';
import { FarmCropRepositoryImplementation } from '@app/infrastructure/database/repositories/farm-crop/farm-crop-repository-implementation';
import { ICreateFarmCropUseCase } from '@app/application/usecases/farm-crop/create-farm-crop/icreate-farm-crop-usecase';
import { CreateFarmCropUseCase } from '@app/application/usecases/farm-crop/create-farm-crop/create-farm-crop-usecase';
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
