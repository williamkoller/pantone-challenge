import { Farm } from '../../domain/Farm';
import { FarmAttributes } from '../../infrastructure/database/models/FarmModel';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Mapper } from '../../shared/types/Mapper';

export class FarmMapper extends Mapper<Farm, FarmAttributes>() {
  static toPersistence(domain: Farm): FarmAttributes {
    return {
      id: domain.id.toString(),
      producerId: domain.producerId.toString(),
      name: domain.name,
      arableArea: domain.arableArea,
      state: domain.state,
      totalArea: domain.totalArea,
      vegetationArea: domain.vegetationArea,
    };
  }

  static toDomain(raw: FarmAttributes): Farm {
    return Farm.create(
      {
        producerId: raw.producerId,
        name: raw.name,
        arableArea: raw.arableArea,
        state: raw.state,
        totalArea: raw.totalArea,
        vegetationArea: raw.vegetationArea,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toDTO(domain: Farm) {
    return {
      id: domain.id.toString(),
      producerId: domain.producerId.toString(),
      name: domain.name,
      arableArea: domain.arableArea,
      state: domain.state,
      totalArea: domain.totalArea,
      vegetationArea: domain.vegetationArea,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
