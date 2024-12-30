import { Producer, ProducerDocumentType } from '@app/domain/producer/producer';
import { ProducerAttributes } from '@app/infrastructure/database/models/producer-model';
import { CNPJ } from '@app/shared/domain/cnpj';
import { CPF } from '@app/shared/domain/cpf';
import { UniqueEntityId } from '@app/shared/domain/unique-entity-id';
import { Mapper } from '@app/shared/types/mapper';
import { FarmMapper } from '../farm/farm-mapper';

export class ProducerMapper extends Mapper<Producer, ProducerAttributes>() {
  static toPersistence(domain: Producer): ProducerAttributes {
    return {
      id: domain.id.toString(),
      name: domain.name,
      document:
        domain.document instanceof CPF
          ? domain.document.props.number
          : (domain.document as CNPJ).props.number,
      documentType: domain.documentType,
    };
  }

  static toDomain(raw: ProducerAttributes): Producer {
    return Producer.create(
      {
        name: raw.name,
        document:
          raw.documentType === ProducerDocumentType.CPF
            ? CPF.create({ number: raw.document })
            : CNPJ.create(raw.document),
        documentType: raw.documentType,
        farms: raw.farms ? raw.farms.map(FarmMapper.toDomain) : [],
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toDTO(domain: Producer) {
    return {
      id: domain.id.toString(),
      name: domain.name,
      document: domain.document.formatted,
      documentType: domain.documentType,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toFarm(domain: Producer) {
    return {
      id: domain.id.toString(),
      name: domain.name,
      document: domain.document.formatted,
      documentType: domain.documentType,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toFarmsDTO(domain: Producer) {
    return {
      id: domain.id.toString(),
      name: domain.name,
      document: domain.document.formatted,
      documentType: domain.documentType,
      farms: domain.farms ? domain.farms.map(FarmMapper.toProducer) : [],
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
