import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ICreateProducerUseCase } from '../../../application/usecases/producer/create-producer/ICreateProducerUseCase';
import { IGetProducersUseCase } from '../../../application/usecases/producer/get-producers/IGetProducersUseCase';
import { CreateProducerBodyDTO } from '../../../application/usecases/producer/create-producer/CreateProducerDTO';
import {
  UpdateProducerBodyDTO,
  UpdateProducerParamsDTO,
} from '../../../application/usecases/producer/update-producer/UpdateProducerDTO';
import { IUpdateProducerUseCase } from '../../../application/usecases/producer/update-producer/IUpdateProducerUseCase';
import { DeleteProducerParamsDTO } from '../../../application/usecases/producer/delete-producer/DeleteProducerDTO';
import { IDeleteProducerUseCase } from '../../../application/usecases/producer/delete-producer/IDeleteProducerUseCase';
import { ProducerDocumentType } from '../../../domain/producer/Producer';

describe(ProducerController.name, () => {
  let producerController: ProducerController;
  let createProducerUseCase: ICreateProducerUseCase;
  let getProducersUseCase: IGetProducersUseCase;
  let updateProducerUseCase: IUpdateProducerUseCase;
  let deleteProducerUseCase: IDeleteProducerUseCase;

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
        {
          provide: IDeleteProducerUseCase,
          useValue: {
            execute: jest.fn(),
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
    deleteProducerUseCase = module.get<IDeleteProducerUseCase>(
      IDeleteProducerUseCase,
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
      expect(updateProducerUseCase.execute).toHaveBeenCalled();
    });
  });

  describe('deleteProducer', () => {
    it('should delete producer', () => {
      const deleteProducerParamsDto: DeleteProducerParamsDTO = {
        producerId: '1',
      };

      expect(
        producerController.deleteProducer(deleteProducerParamsDto),
      ).resolves.not.toThrow();
      expect(deleteProducerUseCase.execute).toHaveBeenCalled();
    });
  });
});
