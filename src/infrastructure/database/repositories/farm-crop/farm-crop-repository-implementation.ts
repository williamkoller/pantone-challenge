import { Injectable } from '@nestjs/common';
import { FarmCropRepository } from '../../../../application/interfaces/farm-crop/farm-crop-repository';
import { FarmCropModel } from '../../models/farm-crop-model';
import { InjectModel } from '@nestjs/sequelize';
import { FarmCrop } from '../../../../domain/farm-crop/farm-crop';
import { FarmCropMapper } from '../../../../application/mappers/farm-crop/farm-crop-mapper';

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
      include: [
        { association: this.farmCropModel.associations.crop },
        { association: this.farmCropModel.associations.farm },
      ],
    });

    if (!result) return null;

    return FarmCropMapper.toDomain(result);
  }

  async findByFarmId(farmId: string): Promise<FarmCrop[]> {
    const result = await this.farmCropModel.findAll({
      where: { farmId },
      include: [
        { association: this.farmCropModel.associations.crop },
        { association: this.farmCropModel.associations.farm },
      ],
    });

    return result.map(FarmCropMapper.toDomain);
  }

  async findByCropId(cropId: string): Promise<FarmCrop[]> {
    const result = await this.farmCropModel.findAll({
      where: { cropId },
      include: [
        { association: this.farmCropModel.associations.crop },
        { association: this.farmCropModel.associations.farm },
      ],
    });

    return result.map(FarmCropMapper.toDomain);
  }

  async findAll(): Promise<FarmCrop[]> {
    const result = await this.farmCropModel.findAll({
      include: [
        { association: this.farmCropModel.associations.crop },
        { association: this.farmCropModel.associations.farm },
      ],
    });

    return result.map(FarmCropMapper.toDomain);
  }
}
