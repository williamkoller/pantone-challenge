import { Inject, Injectable } from '@nestjs/common';
import { IGetProducersUseCase, Output } from './IGetProducersUseCase';
import { ProducerRepositoryInterface } from '../../../interfaces/ProducerRepositoryInterface';
import { ProducerMapper } from '../../../mappers/ProducerMapper';

@Injectable()
export class GetProducersUseCase implements IGetProducersUseCase {
  constructor(
    @Inject(ProducerRepositoryInterface)
    private readonly producerRepository: ProducerRepositoryInterface,
  ) {}

  async execute(): Promise<Output[]> {
    const producers = await this.producerRepository.findAll();
    return producers.map((producer) => ProducerMapper.toDTO(producer));
  }
}
