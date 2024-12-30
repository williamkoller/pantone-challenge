import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CropModel } from '@app/infrastructure/database/models/CropModel';
import { CropRepositoryImplementation } from '@app/infrastructure/database/repositories/crop/crop-repository-implementation';
import { CropRepository } from '@app/application/interfaces/crop/crop-repository';
import { ICreateCropUseCase } from '@app/application/usecases/crop/create-crop/icreate-crop-usecase';
import { CreateCropUseCase } from '@app/application/usecases/crop/create-crop/create-crop-usecase';
import { CropController } from '../../controllers/crop/crop.controller';
import { FarmModule } from '../farm/farm.module';

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
  ],
  controllers: [CropController],
  exports: [CropRepository],
})
export class CropModule {}
