import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '../../../../application/interfaces/dashboard/dashboard-repository';
import { InjectModel } from '@nestjs/sequelize';
import { FarmModel } from '../../models/farm-model';
import { FarmCropModel } from '../../models/farm-crop-model';
import { CropModel } from '../../models/crop-model';
import { DashboardMapper } from '../../../../application/mappers/dashboard/dashboard-mapper';
import { DashboardData } from '../../../../application/mappers/dashboard/dashboard-mapper';

@Injectable()
export class DashboardRepositoryImplementation implements DashboardRepository {
  constructor(
    @InjectModel(FarmModel)
    private readonly farmModel: typeof FarmModel,
  ) {}

  async getDashboard(): Promise<DashboardData> {
    const totalFarms = await this.getTotalFarms();
    const totalHectares = await this.getTotalHectares();
    const farmsByState = await this.getFarmsByState();
    const farmsByCrop = await this.getFarmsByCrop();
    const farmsByLandUse = await this.getFarmsByLandUse();
    return DashboardMapper.toDTO({
      totalFarms,
      totalHectares,
      farmsByCrop,
      farmsByLandUse,
      farmsByState,
    });
  }

  private async getTotalFarms(): Promise<number> {
    return this.farmModel.count();
  }

  private async getTotalHectares(): Promise<number> {
    const result = await this.farmModel.sum('arableArea');
    return result;
  }

  private async getFarmsByState(): Promise<{ state: string; count: number }[]> {
    const result = await this.farmModel.findAll({
      attributes: [
        'state',
        [
          this.farmModel.sequelize.fn(
            'COUNT',
            this.farmModel.sequelize.col('id'),
          ),
          'count',
        ],
      ],
      group: ['state'],
    });

    return result.map((item: any) => ({
      state: item.state,
      count: parseInt(item.dataValues.count, 10),
    }));
  }

  private async getFarmsByCrop(): Promise<{ [key: string]: number }> {
    const farms = await this.farmModel.findAll({
      attributes: ['id'],
      include: [
        {
          model: FarmCropModel,
          attributes: ['cropId'],
          include: [
            {
              model: CropModel,
              attributes: ['cropType'],
            },
          ],
        },
      ],
    });

    const cropCounts = farms.reduce((acc, farm) => {
      if (farm.farmCrops) {
        farm.farmCrops.forEach((farmCrop) => {
          if (farmCrop.crop) {
            const cropType = farmCrop.crop.cropType;
            if (!acc[cropType]) {
              acc[cropType] = 0;
            }
            acc[cropType]++;
          }
        });
      }
      return acc;
    }, {});

    return cropCounts;
  }

  private async getFarmsByLandUse(): Promise<
    { landUse: string; totalArableArea: number; totalVegetationArea: number }[]
  > {
    const result = await this.farmModel.findAll({
      attributes: [
        'landUse',
        [
          this.farmModel.sequelize.fn(
            'SUM',
            this.farmModel.sequelize.col('arable_area'),
          ),
          'totalArableArea',
        ],
        [
          this.farmModel.sequelize.fn(
            'SUM',
            this.farmModel.sequelize.col('vegetation_area'),
          ),
          'totalVegetationArea',
        ],
      ],
      group: ['landUse'],
    });

    return result.map((item: any) => ({
      landUse: item.landUse,
      totalArableArea: parseFloat(item.dataValues.totalArableArea),
      totalVegetationArea: parseFloat(item.dataValues.totalVegetationArea),
    }));
  }
}
