import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  ICreateProducerUseCase,
  Input,
  Output,
} from './icreate-producer-usecase';
import { CPF } from '@app/shared/domain/cpf';
import { CNPJ } from '@app/shared/domain/cnpj';
import { ProducerMapper } from '@app/application/mappers/producer/producer-mapper';
import { ProducerConflictException } from '@app/application/exceptions/producer/producer-conflict-exception';
import { Transactional } from 'sequelize-transactional-decorator';
import { ProducerRepository } from '@app/application/interfaces/producer/producer-repository';
import { Producer, ProducerDocumentType } from '@app/domain/producer/producer';

@Injectable()
export class CreateProducerUseCase implements ICreateProducerUseCase {
  private readonly logger = new Logger(CreateProducerUseCase.name);
  private readonly producerConflictException = new ProducerConflictException();
  constructor(
    @Inject(ProducerRepository)
    private readonly producerRepository: ProducerRepository,
  ) {}

  @Transactional()
  async execute(input: Input): Promise<Output> {
    try {
      const producerExists = await this.producerRepository.findByDocument(
        input.document,
      );
      if (producerExists) throw this.producerConflictException;

      const document =
        input.documentType === ProducerDocumentType.CPF
          ? CPF.create({
              number: input.document,
            })
          : CNPJ.create(input.document);
      const producer = Producer.create({
        name: input.name,
        document,
        documentType: input.documentType,
      });

      const producerSaved = await this.producerRepository.save(producer);

      return ProducerMapper.toDTO(producerSaved);
    } catch (error) {
      this.logger.error(error.message);

      if (error instanceof ProducerConflictException) throw error;

      throw new BadRequestException(error.message);
    }
  }
}
