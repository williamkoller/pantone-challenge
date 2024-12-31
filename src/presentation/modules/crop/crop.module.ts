import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CropModel } from '@app/infrastructure/database/models/crop-model';
import { CropRepositoryImplementation } from '@app/infrastructure/database/repositories/crop/crop-repository-implementation';
import { CropRepository } from '@app/application/interfaces/crop/crop-repository';
import { ICreateCropUseCase } from '@app/application/usecases/crop/create-crop/icreate-crop-usecase';
import { CreateCropUseCase } from '@app/application/usecases/crop/create-crop/create-crop-usecase';
import { CropController } from '@app/presentation/controllers/crop/crop.controller';
import { FarmModule } from '../farm/farm.module';
import { IGetCropsUseCase } from '@app/application/usecases/crop/get-crops/iget-crops-usecase';
import { GetCropsUseCase } from '@app/application/usecases/crop/get-crops/get-crops-usecase';

@Module({
  imports: [SequelizeModule.forFeature([CropModel]), FarmModule],
  providers: [
    {
      provide: CropRepository,
      useClass: CropRepositoryImplementation,
    },
    {
      provide: ICreateCropUseCase,
      useClass: CreateCropUseCase,
    },
    {
      provide: IGetCropsUseCase,
      useClass: GetCropsUseCase,
    },
  ],
  controllers: [CropController],
  exports: [CropRepository],
})
export class CropModule {}
