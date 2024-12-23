import { ProducerRepositoryImplementation } from './ProducerRepositoryImplementation';
import { ProducerModel } from '../../database/models/ProducerModel';
import {
  Producer,
  ProducerDocumentType,
  ProducerProps,
} from '../../../domain/Producer';
import { ProducerMapper } from '../../../application/mappers/ProducerMapper';
import { CPF } from '../../../shared/domain/CPF';
import { UniqueEntityId } from '../../../shared/domain/UniqueEntityId';
import { CNPJ } from '../../../shared/domain/CNPJ';

jest.mock('../../database/models/ProducerModel');
jest.mock('../../../application/mappers/ProducerMapper');

describe('ProducerRepositoryImplementation', () => {
  let repository: ProducerRepositoryImplementation;

  beforeEach(() => {
    repository = new ProducerRepositoryImplementation(ProducerModel as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('save', () => {
    it('should save a producer and return the domain object', async () => {
      const domainProducer = Producer.create(
        {
          name: 'Producer 1',
          document: CPF.create({ number: '99812472002' }),
          documentType: ProducerDocumentType.CPF,
        },
        new UniqueEntityId('1'),
      );

      const persistenceProducer = {
        id: '1',
        name: 'Producer 1',
        document: '99812472002',
        documentType: ProducerDocumentType.CPF,
      };

      jest
        .spyOn(ProducerMapper, 'toPersistence')
        .mockReturnValue(persistenceProducer);
      jest.spyOn(ProducerMapper, 'toDomain').mockReturnValue(domainProducer);
      jest
        .spyOn(ProducerModel, 'create')
        .mockResolvedValue(persistenceProducer as any);

      const result = await repository.save(domainProducer);

      expect(ProducerMapper.toPersistence).toHaveBeenCalledWith(domainProducer);
      expect(ProducerModel.create).toHaveBeenCalledWith(persistenceProducer);
      expect(ProducerMapper.toDomain).toHaveBeenCalledWith(persistenceProducer);
      expect(result).toEqual(domainProducer);
    });
  });

  describe('findById', () => {
    it('should return a producer domain object if found', async () => {
      const persistenceProducer: ProducerProps & { id: string } = {
        id: '1',
        name: 'Producer 1',
        document: CPF.create({ number: '99812472002' }),
        documentType: ProducerDocumentType.CPF,
      };
      const domainProducer = Producer.create(
        persistenceProducer,
        new UniqueEntityId('1'),
      );

      jest.spyOn(ProducerMapper, 'toDomain').mockReturnValue(domainProducer);
      jest
        .spyOn(ProducerModel, 'findByPk')
        .mockResolvedValue(persistenceProducer as any);

      const result = await repository.findById('1');

      expect(ProducerModel.findByPk).toHaveBeenCalledWith('1');
      expect(ProducerMapper.toDomain).toHaveBeenCalledWith(persistenceProducer);
      expect(result).toEqual(domainProducer);
    });

    it('should return null if no producer is found', async () => {
      jest.spyOn(ProducerModel, 'findByPk').mockResolvedValue(null);

      const result = await repository.findById('1');

      expect(ProducerModel.findByPk).toHaveBeenCalledWith('1');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update the producer', async () => {
      const domainProducer = Producer.create(
        {
          name: 'Producer 1',
          document: CPF.create({ number: '99812472002' }),
          documentType: ProducerDocumentType.CPF,
        },
        new UniqueEntityId('1'),
      );

      const persistenceProducer = {
        id: '1',
        name: 'Producer 1',
        document: '99812472002',
        documentType: ProducerDocumentType.CPF,
      };

      jest
        .spyOn(ProducerMapper, 'toPersistence')
        .mockReturnValue(persistenceProducer);
      jest.spyOn(ProducerModel, 'update').mockResolvedValue([1]);

      await repository.update(domainProducer);

      expect(ProducerMapper.toPersistence).toHaveBeenCalledWith(domainProducer);
      expect(ProducerModel.update).toHaveBeenCalledWith(persistenceProducer, {
        where: { id: persistenceProducer.id },
      });
    });
  });

  describe('remove', () => {
    it('should delete the producer by ID', async () => {
      jest.spyOn(ProducerModel, 'destroy').mockResolvedValue(1);

      await repository.remove('1');

      expect(ProducerModel.destroy).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('findAll', () => {
    it('should return a list of producer domain objects', async () => {
      const persistenceProducers = [
        {
          id: '1',
          name: 'Producer 1',
          document: '99812472002',
          documentType: 'CPF',
        },
        {
          id: '2',
          name: 'Producer 2',
          document: '43567891001',
          documentType: 'CNPJ',
        },
      ];

      const domainProducers = persistenceProducers.map((persistence) =>
        Producer.create(
          {
            name: persistence.name,
            document:
              persistence.documentType === 'CPF'
                ? CPF.create({ number: persistence.document })
                : CNPJ.create(persistence.document),
            documentType: persistence.documentType as ProducerDocumentType,
          },
          new UniqueEntityId(persistence.id),
        ),
      );

      jest
        .spyOn(ProducerModel, 'findAll')
        .mockResolvedValue(persistenceProducers as any);
      jest
        .spyOn(ProducerMapper, 'toDomain')
        .mockImplementation((data) =>
          domainProducers.find((d) => d.id.toString() === data.id),
        );

      const result = await repository.findAll();

      expect(ProducerModel.findAll).toHaveBeenCalledTimes(1);
      expect(ProducerMapper.toDomain).toHaveBeenCalledTimes(
        persistenceProducers.length,
      );
      expect(result).toEqual(domainProducers);
    });
  });

  describe('findByDocument', () => {
    it('should find a producer by document and return the domain object', async () => {
      const document = '99812472002';
      const persistenceProducer = {
        id: '1',
        name: 'Producer 1',
        document: document,
        documentType: 'CPF',
      };

      const domainProducer = Producer.create(
        {
          name: persistenceProducer.name,
          document: CPF.create({
            number: persistenceProducer.document,
          }),
          documentType:
            persistenceProducer.documentType as ProducerDocumentType,
        },
        new UniqueEntityId(persistenceProducer.id),
      );

      jest
        .spyOn(ProducerModel, 'findOne')
        .mockResolvedValue(persistenceProducer as any);
      jest.spyOn(ProducerMapper, 'toDomain').mockReturnValue(domainProducer);

      const result = await repository.findByDocument(document);

      expect(ProducerModel.findOne).toHaveBeenCalledWith({
        where: { document },
      });
      expect(ProducerMapper.toDomain).toHaveBeenCalledWith(persistenceProducer);
      expect(result).toEqual(domainProducer);
    });

    it('should return null if no producer is found', async () => {
      const document = '99812472002';

      jest.spyOn(ProducerModel, 'findOne').mockResolvedValue(null);

      const result = await repository.findByDocument(document);

      expect(ProducerModel.findOne).toHaveBeenCalledWith({
        where: { document },
      });
      expect(result).toBeNull();
    });
  });
});
