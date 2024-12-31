import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FarmModel } from '../../../infrastructure/database/models/farm-model';
import { ProducerModel } from '../../../infrastructure/database/models/producer-model';
import { CropModel } from '../../../infrastructure/database/models/crop-model';
import { FarmCropModel } from '../../../infrastructure/database/models/farm-crop-model';
import { DashBoardController } from '../../controllers/dashboard/dashboard.controller';
import { IDashboardUseCase } from '../../../application/usecases/dashboard/idashboard-usecase';
import { DashboardUseCase } from '../../../application/usecases/dashboard/dashboard-usecase';
import { DashboardRepositoryImplementation } from '../../../infrastructure/database/repositories/dashboard/dashboard-repository-implementation';
import { DashboardRepository } from '../../../application/interfaces/dashboard/dashboard-repository';

@Module({
  imports: [
    SequelizeModule.forFeature([
      FarmModel,
      ProducerModel,
      CropModel,
      FarmCropModel,
    ]),
  ],
  controllers: [DashBoardController],
  providers: [
    {
      provide: IDashboardUseCase,
      useClass: DashboardUseCase,
    },
    {
      provide: DashboardRepository,
      useClass: DashboardRepositoryImplementation,
    },
  ],
})
export class DashboardModule {}
