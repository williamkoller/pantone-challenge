import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { IDeleteProducerUseCase, Input } from './idelete-producer-usecase';
import { ProducerRepository } from '@app/application/interfaces/producer/producer-repository';
import { ProducerNotFoundException } from '@app/application/exceptions/producer/producer-not-found-exception';
import { Transactional } from 'sequelize-transactional-decorator';

@Injectable()
export class DeleteProducerUseCase implements IDeleteProducerUseCase {
  private readonly logger = new Logger(DeleteProducerUseCase.name);
  constructor(
    @Inject(ProducerRepository)
    private producerRepository: ProducerRepository,
  ) {}

  @Transactional()
  async execute(input: Input): Promise<void> {
    try {
      const producer = await this.producerRepository.findById(input.producerId);

      if (!producer) throw new ProducerNotFoundException();

      await this.producerRepository.remove(producer.id.toString());
    } catch (error) {
      this.logger.error(error.message);

      if (error instanceof ProducerNotFoundException) throw error;

      throw new BadRequestException(error.message);
    }
  }
}
