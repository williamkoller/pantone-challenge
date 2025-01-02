import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerUseCase } from './create-producer-usecase';
import { ProducerConflictException } from '@app/application/exceptions/producer/producer-conflict-exception';
import { BadRequestException } from '@nestjs/common';
import { CPF } from '@app/shared/domain/cpf';
import { ProducerMapper } from '@app/application/mappers/producer/producer-mapper';
import { UniqueEntityId } from '@app/shared/domain/unique-entity-id';
import { ProducerRepository } from '@app/application/interfaces/producer/producer-repository';
import { Producer, ProducerDocumentType } from '@app/domain/producer/producer';

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
