import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  Input,
  IUpdateProducerUseCase,
  Output,
} from './IUpdateProducerUseCase';
import { ProducerRepository } from '@app/application/interfaces/producer/ProducerRepository';
import { ProducerDocumentType } from '@app/domain/producer/Producer';
import { Transactional } from 'sequelize-transactional-decorator';
import { ProducerNotFoundException } from '@app/application/exceptions/producer/ProducerNotFoundException';
import { CPF } from '@app/shared/domain/CPF';
import { CNPJ } from '@app/shared/domain/CNPJ';
import { ProducerMapper } from '@app/application/mappers/producer/ProducerMapper';

@Injectable()
export class UpdateProducerUseCase implements IUpdateProducerUseCase {
  private readonly logger = new Logger(UpdateProducerUseCase.name);

  constructor(
    @Inject(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  @Transactional()
  async execute(input: Input): Promise<Output> {
    try {
      const producer = await this.producerRepository.findById(input.producerId);
      if (!producer) throw new ProducerNotFoundException();

      const documentUpdated =
        input.documentType === ProducerDocumentType.CPF
          ? CPF.create({ number: input.document })
          : input.documentType === ProducerDocumentType.CNPJ
            ? CNPJ.create(input.document)
            : producer.document;

      const producerDomain = producer.toUpdate({
        name: input.name !== undefined ? input.name : producer.name,
        document:
          input.document !== undefined ? documentUpdated : producer.document,
        documentType:
          input.documentType !== undefined
            ? input.documentType
            : producer.documentType,
      });

      const producerUpdated =
        await this.producerRepository.update(producerDomain);

      return ProducerMapper.toDTO(producerUpdated);
    } catch (error) {
      this.logger.error(error.message);

      if (error instanceof ProducerNotFoundException) throw error;

      throw new BadRequestException(error.message);
    }
  }
}
