import { Inject, Injectable } from '@nestjs/common';
import { IGetProducersUseCase, Output } from './IGetProducersUseCase';
import { ProducerRepository } from '../../../interfaces/producer/ProducerRepository';
import { ProducerMapper } from '../../../mappers/ProducerMapper';

@Injectable()
export class GetProducersUseCase implements IGetProducersUseCase {
  constructor(
    @Inject(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async execute(): Promise<Output[]> {
    const producers = await this.producerRepository.findAll();
    return producers.map((producer) => ProducerMapper.toDTO(producer));
  }
}
