import { Crop } from '@app/domain/crop/crop';
import { CropAttributes } from '@app/infrastructure/database/models/crop-model';
import { UniqueEntityId } from '@app/shared/domain/UniqueEntityId';
import { Mapper } from '@app/shared/types/Mapper';

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
      cropType: domain.cropType,
      year: domain.year,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
