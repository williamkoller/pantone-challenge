import { Farm } from '../../domain/farm/Farm';
import { Producer, ProducerDocumentType } from '../../domain/producer/Producer';
import { FarmAttributes } from '../../infrastructure/database/models/FarmModel';
import { CNPJ } from '../../shared/domain/CNPJ';
import { CPF } from '../../shared/domain/CPF';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Mapper } from '../../shared/types/Mapper';
import { ProducerMapper } from './ProducerMapper';

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
        producer: raw.producer ? ProducerMapper.toDomain(raw.producer) : null,
        name: raw.name,
        arableArea: raw.arableArea,
        state: raw.state,
        totalArea: raw.totalArea,
        vegetationArea: raw.vegetationArea,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
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
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
