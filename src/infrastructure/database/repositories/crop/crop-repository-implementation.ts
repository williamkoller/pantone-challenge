import { Injectable } from '@nestjs/common';
import { CropRepository } from '../../../../application/interfaces/crop/crop-repository';
import { InjectModel } from '@nestjs/sequelize';
import { Crop } from '../../../../domain/crop/Crop';
import { CropModel } from '../../models/CropModel';
import { CropMapper } from '../../../../application/mappers/crop/crop-mapper';

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
    const crops = await this.cropModel.findAll();

    return crops.map(CropMapper.toDomain);
  }
}
