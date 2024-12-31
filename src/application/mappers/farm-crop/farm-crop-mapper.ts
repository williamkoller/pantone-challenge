import { FarmCrop } from '@app/domain/farm-crop/farm-crop';
import { FarmCropAttributes } from '@app/infrastructure/database/models/farm-crop-model';
import { UniqueEntityId } from '@app/shared/domain/unique-entity-id';
import { Mapper } from '@app/shared/types/mapper';
import { FarmMapper } from '../farm/farm-mapper';
import { CropMapper } from '../crop/crop-mapper';

export class FarmCropMapper extends Mapper<FarmCrop, FarmCropAttributes>() {
  static toPersistence(domain: FarmCrop): FarmCropAttributes {
    return {
      id: domain.id.toString(),
      farmId: domain.farmId,
      cropId: domain.cropId,
      seasonYear: domain.seasonYear,
      plantedArea: domain.plantedArea,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toDomain(raw: FarmCropAttributes): FarmCrop {
    return FarmCrop.create(
      {
        farmId: raw.farmId,
        farm: raw.farm ? FarmMapper.toDomain(raw.farm) : null,
        cropId: raw.cropId,
        crop: raw.crop ? CropMapper.toDomain(raw.crop) : null,
        seasonYear: raw.seasonYear,
        plantedArea: raw.plantedArea,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toDTO(domain: FarmCrop) {
    return {
      id: domain.id.toString(),
      farmId: domain.farmId ? domain.farmId : null,
      farm: domain.farm ? FarmMapper.toProducer(domain.farm) : null,
      cropId: domain.cropId ? domain.cropId : null,
      crop: domain.crop ? CropMapper.toFarm(domain.crop) : null,
      seasonYear: domain.seasonYear ? domain.seasonYear : null,
      plantedArea: domain.plantedArea ? domain.plantedArea : null,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
