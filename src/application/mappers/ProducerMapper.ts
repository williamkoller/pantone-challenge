import { Producer } from '../../domain/Producer';
import { ProducerAttributes } from '../../infrastructure/database/models/ProducerModel';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { Mapper } from '../../shared/types/Mapper';

export class ProducerMapper extends Mapper<Producer, ProducerAttributes>() {
  static toPersistence(domain: Producer): ProducerAttributes {
    return {
      id: domain.id.toString(),
      name: domain.name,
      document: domain.document,
      documentType: domain.documentType,
    };
  }

  static toDomain(raw: ProducerAttributes): Producer {
    return Producer.create(
      {
        name: raw.name,
        document: raw.document,
        documentType: raw.documentType,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toDTO(domain: Producer) {
    return {
      id: domain.id.toString(),
      name: domain.name,
      document: domain.document,
      documentType: domain.documentType,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
