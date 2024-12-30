import { FarmCrop } from '@app/domain/farm-crop/farm-crop';
import { FarmCropAttributes } from '@app/infrastructure/database/models/farm-crop-model';
import { UniqueEntityId } from '@app/shared/domain/UniqueEntityId';
import { Mapper } from '@app/shared/types/Mapper';

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
        cropId: raw.cropId,
        seasonYear: raw.seasonYear,
        plantedArea: raw.plantedArea,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toDTO(domain: FarmCrop): FarmCropAttributes {
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
}
