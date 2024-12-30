import { Injectable } from '@nestjs/common';
import { FarmCropRepository } from '@app/application/interfaces/farm-crop/farm-crop-repository';
import { InjectModel } from '@nestjs/sequelize';
import { FarmCropModel } from '@app/infrastructure/database/models/FarmCropModel';
import { FarmCrop } from '@app/domain/farm-crop/FarmCrop';
import { FarmCropMapper } from '@app/application/mappers/farm-crop/farm-crop-mapper';

@Injectable()
export class FarmCropRepositoryImplementation implements FarmCropRepository {
  constructor(
    @InjectModel(FarmCropModel)
    private farmCropModel: typeof FarmCropModel,
  ) {}

  async save(farmCrop: FarmCrop): Promise<FarmCrop> {
    const toPersistence = await this.farmCropModel.create(
      FarmCropMapper.toPersistence(farmCrop),
    );
    return FarmCropMapper.toDomain(toPersistence);
  }

  async findByFarmIdAndSeasonYear(
    farmId: string,
    seasonYear: number,
  ): Promise<FarmCrop | null> {
    const result = await this.farmCropModel.findOne({
      where: { farmId, seasonYear },
    });

    if (!result) return null;

    return FarmCropMapper.toDomain(result);
  }

  async findByFarmId(farmId: string): Promise<FarmCrop[]> {
    const result = await this.farmCropModel.findAll({
      where: { farmId },
    });

    return result.map(FarmCropMapper.toDomain);
  }

  async findByCropId(cropId: string): Promise<FarmCrop[]> {
    const result = await this.farmCropModel.findAll({
      where: { cropId },
    });

    return result.map(FarmCropMapper.toDomain);
  }
}
