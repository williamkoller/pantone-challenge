import { CPF } from '../../shared/domain/cpf';
import { DomainValidationException } from '../../shared/domain/domain-validation-exception';
import { UniqueEntityId } from '../../shared/domain/unique-entity-id';
import { Producer, ProducerProps, ProducerDocumentType } from './producer';

describe('Producer', () => {
  it('should create a Producer with valid props', () => {
    const validProps: ProducerProps = {
      name: 'Producer Name',
      document: CPF.create({ number: '78139483001' }),
      documentType: ProducerDocumentType.CPF,
    };

    const producer = Producer.create(validProps, new UniqueEntityId('1'));

    expect(producer.name).toBe(validProps.name);
    expect(producer.document.formatted).toEqual(validProps.document.formatted);
    expect(producer.documentType).toBe(validProps.documentType);
  });

  it('should throw a DomainValidationException if any required prop is missing', () => {
    const invalidProps: ProducerProps = {
      name: '',
      document: CPF.create({ number: '78139483001' }),
      documentType: ProducerDocumentType.CPF,
    };

    expect(() => Producer.create(invalidProps)).toThrow(
      DomainValidationException,
    );
  });

  it('should throw a DomainValidationException if document is null or undefined', () => {
    const invalidProps: ProducerProps = {
      name: 'Producer Name',
      document: null,
      documentType: ProducerDocumentType.CPF,
    };

    expect(() => Producer.create(invalidProps)).toThrow(
      DomainValidationException,
    );
  });

  it('should throw a DomainValidationException if documentType is invalid', () => {
    const invalidProps: ProducerProps = {
      name: 'Producer Name',
      document: CPF.create({ number: '78139483001' }),
      documentType: 'INVALID' as ProducerDocumentType,
    };

    expect(() => Producer.create(invalidProps)).toThrow(
      DomainValidationException,
    );
  });
});
