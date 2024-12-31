import { Injectable } from '@nestjs/common';
import { CropRepository } from '@app/application/interfaces/crop/crop-repository';
import { InjectModel } from '@nestjs/sequelize';
import { Crop } from '@app/domain/crop/crop';
import { CropModel } from '../../models/crop-model';
import { CropMapper } from '@app/application/mappers/crop/crop-mapper';

@Injectable()
export class CropRepositoryImplementation implements CropRepository {
  constructor(
    @InjectModel(CropModel)
    private readonly cropModel: typeof CropModel,
  ) {}

  async save(crop: Crop): Promise<Crop> {
    const cropPersistence = await this.cropModel.create(
      CropMapper.toPersistence(crop),
    );
    return CropMapper.toDomain(cropPersistence);
  }

  async findById(cropId: string): Promise<Crop | null> {
    const crop = await this.cropModel.findByPk(cropId);

    if (!crop) return null;

    return CropMapper.toDomain(crop);
  }

  async findByFarmIdAndYearAndCropType(
    farmId: string,
    year: number,
    cropType: string,
  ): Promise<Crop | null> {
    const crop = await this.cropModel.findOne({
      where: { farmId, year, cropType },
    });

    if (!crop) return null;

    return CropMapper.toDomain(crop);
  }

  async findAll(): Promise<Crop[]> {
    const crops = await this.cropModel.findAll({
      include: [{ all: true }],
    });

    return crops.map(CropMapper.toDomain);
  }
}
