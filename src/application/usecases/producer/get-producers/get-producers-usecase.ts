import { Inject, Injectable } from '@nestjs/common';
import { IGetProducersUseCase, Output } from './iget-producers-usecase';
import { ProducerRepository } from '@app/application/interfaces/producer/producer-repository';
import { ProducerMapper } from '@app/application/mappers/producer/producer-mapper';

@Injectable()
export class GetProducersUseCase implements IGetProducersUseCase {
  constructor(
    @Inject(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  async execute(): Promise<Output[]> {
    const producers = await this.producerRepository.findAll();
    return producers.map((producer) => ProducerMapper.toFarmsDTO(producer));
  }
}
