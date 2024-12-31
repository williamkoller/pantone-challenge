import { Farm } from '@app/domain/farm/farm';
import { FarmAttributes } from '@app/infrastructure/database/models/farm-model';
import { ProducerMapper } from '@app/application/mappers/producer/producer-mapper';
import { UniqueEntityId } from '@app/shared/domain/unique-entity-id';
import { Mapper } from '@app/shared/types/mapper';

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
      landUse: domain.landUse,
    };
  }

  static toDomain(raw: FarmAttributes): Farm {
    return Farm.create(
      {
        producerId: raw.producerId,
        producer: raw.producer ? ProducerMapper.toDomain(raw.producer) : null,
        name: raw.name,
        arableArea: raw.arableArea,
        state: raw.state,
        totalArea: raw.totalArea,
        vegetationArea: raw.vegetationArea,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        landUse: raw.landUse,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toDTO(domain: Farm) {
    return {
      id: domain.id.toString(),
      producerId: domain.producerId.toString(),
      producer: domain.producer ? ProducerMapper.toFarm(domain.producer) : null,
      name: domain.name,
      state: domain.state,
      arableArea: Number(domain.arableArea),
      vegetationArea: Number(domain.vegetationArea),
      totalArea: Number(domain.totalArea),
      landUse: domain.landUse,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toProducer(domain: Farm) {
    return {
      id: domain.id.toString(),
      producerId: domain.producerId.toString(),
      name: domain.name,
      arableArea: domain.arableArea,
      state: domain.state,
      totalArea: domain.totalArea,
      vegetationArea: domain.vegetationArea,
      landUse: domain.landUse,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
