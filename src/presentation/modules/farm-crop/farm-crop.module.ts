import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FarmCropModel } from '@app/infrastructure/database/models/farm-crop-model';
import { FarmCropController } from '@app/presentation/controllers/farm-crop/farm-crop.controller';
import { FarmCropRepository } from '@app/application/interfaces/farm-crop/farm-crop-repository';
import { FarmCropRepositoryImplementation } from '@app/infrastructure/database/repositories/farm-crop/farm-crop-repository-implementation';
import { ICreateFarmCropUseCase } from '@app/application/usecases/farm-crop/create-farm-crop/icreate-farm-crop-usecase';
import { CreateFarmCropUseCase } from '@app/application/usecases/farm-crop/create-farm-crop/create-farm-crop-usecase';
import { CropModule } from '../crop/crop.module';
import { FarmModule } from '../farm/farm.module';
import { IGetFarmCropsUseCase } from '@app/application/usecases/farm-crop/get-farm-crops/iget-farm-crops-usecase';
import { GetFarmCropsUseCase } from '@app/application/usecases/farm-crop/get-farm-crops/get-farm-crops-usecase';
import { FarmModel } from '../../../infrastructure/database/models/farm-model';
import { CropModel } from '../../../infrastructure/database/models/crop-model';
import { FarmRepository } from '../../../application/interfaces/farm/farm-repository';
import { FarmRepositoryImplementation } from '../../../infrastructure/database/repositories/farm/farm-repository-implementation';
import { CropRepository } from '../../../application/interfaces/crop/crop-repository';
import { CropRepositoryImplementation } from '../../../infrastructure/database/repositories/crop/crop-repository-implementation';

@Module({
  imports: [
    SequelizeModule.forFeature([FarmCropModel, FarmModel, CropModel]),
    forwardRef(() => FarmModule),
    forwardRef(() => CropModule),
  ],
  controllers: [FarmCropController],
  providers: [
    {
      provide: FarmCropRepository,
      useClass: FarmCropRepositoryImplementation,
    },
    {
      provide: FarmRepository,
      useClass: FarmRepositoryImplementation,
    },
    {
      provide: CropRepository,
      useClass: CropRepositoryImplementation,
    },
    {
      provide: ICreateFarmCropUseCase,
      useClass: CreateFarmCropUseCase,
    },
    {
      provide: IGetFarmCropsUseCase,
      useClass: GetFarmCropsUseCase,
    },
  ],
})
export class FarmCropModule {}
