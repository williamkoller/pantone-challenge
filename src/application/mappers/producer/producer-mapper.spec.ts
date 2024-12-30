import { ProducerMapper } from './ProducerMapper';
import { CPF } from '../../shared/domain/CPF';
import { CNPJ } from '../../shared/domain/CNPJ';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { ProducerAttributes } from '../../infrastructure/database/models/ProducerModel';
import { Producer, ProducerDocumentType } from '../../domain/producer/Producer';

describe('ProducerMapper', () => {
  const uniqueId = new UniqueEntityId('123');
  const cpf = CPF.create({ number: '44087527034' });
  const cnpj = CNPJ.create('12345678000195');

  it('should map to persistence correctly', () => {
    const producer = Producer.create(
      {
        name: 'Test Producer',
        document: cpf,
        documentType: ProducerDocumentType.CPF,
      },
      uniqueId,
    );

    const persistenceData = ProducerMapper.toPersistence(producer);

    expect(persistenceData).toEqual({
      id: uniqueId.toString(),
      name: 'Test Producer',
      document: '44087527034',
      documentType: ProducerDocumentType.CPF,
    });
  });

  it('should map to domain correctly from persistence data (CPF)', () => {
    const rawData: ProducerAttributes = {
      id: '123',
      name: 'Test Producer',
      document: '44087527034',
      documentType: ProducerDocumentType.CPF,
    };

    const producer = ProducerMapper.toDomain(rawData);

    expect(producer.id.toString()).toBe('123');
    expect(producer.name).toBe('Test Producer');
    expect(producer.document instanceof CPF).toBe(true);
    expect(producer.document.props.number).toBe('44087527034');
    expect(producer.documentType).toBe(ProducerDocumentType.CPF);
  });

  it('should map to domain correctly from persistence data (CNPJ)', () => {
    const rawData: ProducerAttributes = {
      id: '123',
      name: 'Test Producer',
      document: '12345678000195',
      documentType: ProducerDocumentType.CNPJ,
    };

    const producer = ProducerMapper.toDomain(rawData);

    expect(producer.id.toString()).toBe('123');
    expect(producer.name).toBe('Test Producer');
    expect(producer.document instanceof CNPJ).toBe(true);
    expect(producer.document.props.number).toBe('12345678000195');
    expect(producer.documentType).toBe(ProducerDocumentType.CNPJ);
  });

  it('should map to DTO correctly', () => {
    const producer = Producer.create(
      {
        name: 'Test Producer',
        document: cnpj,
        documentType: ProducerDocumentType.CNPJ,
      },
      uniqueId,
    );

    const dto = ProducerMapper.toDTO(producer);

    expect(dto).toEqual({
      id: uniqueId.toString(),
      name: 'Test Producer',
      document: cnpj.formatted,
      documentType: ProducerDocumentType.CNPJ,
      createdAt: producer.createdAt,
      updatedAt: producer.updatedAt,
    });
  });
});
