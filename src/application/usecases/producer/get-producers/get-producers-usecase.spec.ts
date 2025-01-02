import { Test, TestingModule } from '@nestjs/testing';
import { GetProducersUseCase } from './get-producers-usecase';
import { ProducerRepository } from '../../../interfaces/producer/producer-repository';

describe(GetProducersUseCase.name, () => {
  let getProducersUseCase: GetProducersUseCase;
  let producerRepositoryMock: Partial<ProducerRepository>;

  beforeEach(async () => {
    producerRepositoryMock = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: '1',
          name: 'Producer 1',
          document: '12345678901',
          documentType: 'CPF',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Producer 2',
          document: '98765432100',
          documentType: 'CNPJ',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProducersUseCase,
        {
          provide: ProducerRepository,
          useValue: producerRepositoryMock,
        },
      ],
    }).compile();

    getProducersUseCase = module.get<GetProducersUseCase>(GetProducersUseCase);
  });

  it('should return a list of producers', async () => {
    const result = await getProducersUseCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty('id');
    expect(result[0]).toHaveProperty('name');
    expect(result[0]).toHaveProperty('document');
    expect(result[0]).toHaveProperty('documentType');
  });

  it('should call producerRepository.findAll', async () => {
    await getProducersUseCase.execute();

    expect(producerRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return mapped producers', async () => {
    const result = await getProducersUseCase.execute();

    expect(result[0].id).toBe('1');
    expect(result[0].name).toBe('Producer 1');
    expect(result[1].id).toBe('2');
    expect(result[1].name).toBe('Producer 2');
  });
});
