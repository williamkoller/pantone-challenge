import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ICreateProducerUseCase } from '../../../application/usecases/producer/CreateProducer/ICreateProducerUseCase';
import { IGetProducersUseCase } from '../../../application/usecases/producer/GetProducers/IGetProducersUseCase';
import { ProducerDocumentType } from '../../../domain/Producer';
import { CreateProducerBodyDTO } from '../../../application/usecases/producer/CreateProducer/CreateProducerDTO';
import {
  UpdateProducerBodyDTO,
  UpdateProducerParamsDTO,
} from '../../../application/usecases/producer/UpdateProducer/UpdateProducerDTO';
import { IUpdateProducerUseCase } from '../../../application/usecases/producer/UpdateProducer/IUpdateProducerUseCase';

describe(ProducerController.name, () => {
  let producerController: ProducerController;
  let createProducerUseCase: ICreateProducerUseCase;
  let getProducersUseCase: IGetProducersUseCase;
  let updateProducerUseCase: IUpdateProducerUseCase;

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
        {
          provide: IUpdateProducerUseCase,
          useValue: {
            execute: jest
              .fn()
              .mockResolvedValue({ id: '1', name: 'Producer 1' }),
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
    updateProducerUseCase = module.get<IUpdateProducerUseCase>(
      IUpdateProducerUseCase,
    );
  });

  it('should be defined', () => {
    expect(producerController).toBeDefined();
  });

  describe('createProducer', () => {
    it('should return a producer after creation', async () => {
      const createProducerDto: CreateProducerBodyDTO = {
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

  describe('updateProducer', () => {
    it('should return a producer after update', async () => {
      const updateProducerBodyDto: UpdateProducerBodyDTO = {
        name: 'Producer 1',
      };

      const updateProducerParamsDto: UpdateProducerParamsDTO = {
        producerId: '1',
      };

      const result = await producerController.updateProducer(
        updateProducerParamsDto,
        updateProducerBodyDto,
      );

      expect(result).toEqual({ id: '1', name: 'Producer 1' });
    });
  });
});
