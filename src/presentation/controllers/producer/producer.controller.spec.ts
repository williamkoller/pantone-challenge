import { Test, TestingModule } from '@nestjs/testing';
import { ProducerController } from './producer.controller';
import { ICreateProducerUseCase } from '@app/application/usecases/producer/create-producer/icreate-producer-usecase';
import { IGetProducersUseCase } from '@app/application/usecases/producer/get-producers/iget-producers-usecase';
import { CreateProducerBodyDTO } from '@app/application/usecases/producer/create-producer/create-producer-dto';
import {
  UpdateProducerBodyDTO,
  UpdateProducerParamsDTO,
} from '@app/application/usecases/producer/update-producer/update-producer-dto';
import { IUpdateProducerUseCase } from '@app/application/usecases/producer/update-producer/iupdate-producer-usecase';
import { DeleteProducerParamsDTO } from '@app/application/usecases/producer/delete-producer/delete-producer-dto';
import { IDeleteProducerUseCase } from '@app/application/usecases/producer/delete-producer/idelete-producer-usecase';
import { ProducerDocumentType } from '@app/domain/producer/producer';

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
