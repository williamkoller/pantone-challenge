import { Crop } from '@app/domain/crop/crop';
import { CropAttributes } from '@app/infrastructure/database/models/crop-model';
import { UniqueEntityId } from '@app/shared/domain/unique-entity-id';
import { Mapper } from '@app/shared/types/mapper';
import { FarmMapper } from '../farm/farm-mapper';

export class CropMapper extends Mapper<Crop, CropAttributes>() {
  static toPersistence(domain: Crop): CropAttributes {
    return {
      id: domain.id.toString(),
      farmId: domain.farmId,
      cropType: domain.cropType,
      year: domain.year,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toDomain(raw: CropAttributes): Crop {
    const crop = Crop.create(
      {
        farmId: raw.farmId,
        farm: raw.farm ? FarmMapper.toDomain(raw.farm) : null,
        cropType: raw.cropType,
        year: raw.year,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );

    return crop;
  }

  static toDTO(domain: Crop): CropAttributes {
    return {
      id: domain.id.toString(),
      farmId: domain.farmId,
      farm: domain.farm ? FarmMapper.toProducer(domain.farm) : null,
      cropType: domain.cropType,
      year: domain.year,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toFarm(domain: Crop) {
    return {
      id: domain.id.toString(),
      farmId: domain.farmId,
      cropType: domain.cropType,
      year: domain.year,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
