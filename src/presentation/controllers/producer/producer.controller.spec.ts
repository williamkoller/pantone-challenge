import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ICreateProducerUseCase } from '../../../application/usecases/producer/CreateProducer/ICreateProducerUseCase';
import { IGetProducersUseCase } from '../../../application/usecases/producer/GetProducers/IGetProducersUseCase';
import { CreateProducerDTO } from '../../../application/dtos/producer/CreateProducerDTO';
import { ProducerDocumentType } from '../../../domain/Producer';

describe(ProducerController.name, () => {
  let producerController: ProducerController;
  let createProducerUseCase: ICreateProducerUseCase;
  let getProducersUseCase: IGetProducersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerController],
      providers: [
        {
          provide: ICreateProducerUseCase,
          useValue: {
            execute: jest
              .fn()
              .mockResolvedValue({ id: '1', name: 'Producer 1' }),
          },
        },
        {
          provide: IGetProducersUseCase,
          useValue: {
            execute: jest
              .fn()
              .mockResolvedValue([{ id: '1', name: 'Producer 1' }]),
          },
        },
      ],
    }).compile();

    producerController = module.get<ProducerController>(ProducerController);
    createProducerUseCase = module.get<ICreateProducerUseCase>(
      ICreateProducerUseCase,
    );
    getProducersUseCase =
      module.get<IGetProducersUseCase>(IGetProducersUseCase);
  });

  it('should be defined', () => {
    expect(producerController).toBeDefined();
  });

  describe('createProducer', () => {
    it('should return a producer after creation', async () => {
      const createProducerDto: CreateProducerDTO = {
        name: 'Producer 1',
        document: '123456789',
        documentType: ProducerDocumentType.CPF,
      };

      const result = await producerController.createProducer(createProducerDto);

      expect(result).toEqual({ id: '1', name: 'Producer 1' });
      expect(createProducerUseCase.execute).toHaveBeenCalledWith({
        name: 'Producer 1',
        document: '123456789',
        documentType: ProducerDocumentType.CPF,
      });
    });
  });

  describe('getProducers', () => {
    it('should return a list of producers', async () => {
      const result = await producerController.getProducers();

      expect(result).toEqual([{ id: '1', name: 'Producer 1' }]);
      expect(getProducersUseCase.execute).toHaveBeenCalled();
    });
  });
});
