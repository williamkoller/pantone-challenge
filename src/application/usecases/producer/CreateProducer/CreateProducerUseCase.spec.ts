import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerUseCase } from './CreateProducerUseCase';
import { ProducerConflictException } from '../../../exceptions/producer/ProducerAlreadyExistsException';
import { BadRequestException } from '@nestjs/common';
import { CPF } from '../../../../shared/domain/CPF';
import { ProducerMapper } from '../../../mappers/ProducerMapper';
import { UniqueEntityId } from '../../../../shared/domain/UniqueEntityId';
import { ProducerRepository } from '../../../interfaces/producer/ProducerRepository';
import {
  Producer,
  ProducerDocumentType,
} from '../../../../domain/producer/Producer';

jest.mock('sequelize-transactional-decorator', () => ({
  Transactional: () => () => ({}),
}));

describe(CreateProducerUseCase.name, () => {
  let createProducerUseCase: CreateProducerUseCase;
  let producerRepository: ProducerRepository;

  const mockProducerRepository = {
    findByDocument: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProducerUseCase,
        {
          provide: ProducerRepository,
          useValue: mockProducerRepository,
        },
      ],
    }).compile();

    createProducerUseCase = module.get<CreateProducerUseCase>(
      CreateProducerUseCase,
    );
    producerRepository = module.get<ProducerRepository>(ProducerRepository);
  });

  it('should be defined', () => {
    expect(createProducerUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should throw ProducerConflictException if producer already exists', async () => {
      const input = {
        name: 'Test Producer',
        document: '33367657069',
        documentType: ProducerDocumentType.CPF,
      };

      mockProducerRepository.findByDocument.mockResolvedValue(true);

      await expect(createProducerUseCase.execute(input)).rejects.toThrow(
        ProducerConflictException,
      );
    });

    it('should create a new producer with CPF document type', async () => {
      const input = {
        name: 'Test Producer',
        document: '33367657069',
        documentType: ProducerDocumentType.CPF,
      };
      const createdProducer = Producer.create(
        {
          name: 'Test Producer',
          document: CPF.create({ number: '33367657069' }),
          documentType: ProducerDocumentType.CPF,
        },
        new UniqueEntityId('1'),
      );

      mockProducerRepository.findByDocument.mockResolvedValue(null);
      mockProducerRepository.save.mockResolvedValue(createdProducer);

      const result = await createProducerUseCase.execute(input);

      expect(result).toEqual(ProducerMapper.toDTO(createdProducer));
      expect(mockProducerRepository.save).toHaveBeenCalledWith(
        expect.any(Object),
      );
    });

    it('should create a new producer with CNPJ document type', async () => {
      const input = {
        name: 'Test Producer',
        document: '12345678000195',
        documentType: ProducerDocumentType.CNPJ,
      };
      const createdProducer = Producer.create(
        {
          name: 'Test Producer',
          document: CPF.create({ number: '33367657069' }),
          documentType: ProducerDocumentType.CPF,
        },
        new UniqueEntityId('1'),
      );

      mockProducerRepository.findByDocument.mockResolvedValue(null);
      mockProducerRepository.save.mockResolvedValue(createdProducer);

      const result = await createProducerUseCase.execute(input);

      expect(result).toEqual(ProducerMapper.toDTO(createdProducer));
      expect(mockProducerRepository.save).toHaveBeenCalledWith(
        expect.any(Object),
      );
    });

    it('should throw BadRequestException for unexpected errors', async () => {
      const input = {
        name: 'Test Producer',
        document: '33367657069',
        documentType: ProducerDocumentType.CPF,
      };

      mockProducerRepository.findByDocument.mockResolvedValue(null);
      mockProducerRepository.save.mockRejectedValue(
        new Error('Unexpected Error'),
      );

      await expect(createProducerUseCase.execute(input)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
