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
} from './ICreateProducerUseCase';
import { ProducerRepositoryInterface } from '../../../interfaces/ProducerRepositoryInterface';
import { Producer, ProducerDocumentType } from '../../../../domain/Producer';
import { CPF } from '../../../../shared/domain/CPF';
import { CNPJ } from '../../../../shared/domain/CNPJ';
import { ProducerMapper } from '../../../mappers/ProducerMapper';
import { ProducerConflictException } from '../../../exceptions/producer/ProducerAlreadyExistsException';
import { Transactional } from 'sequelize-transactional-decorator';

@Injectable()
export class CreateProducerUseCase implements ICreateProducerUseCase {
  private readonly logger = new Logger(CreateProducerUseCase.name);
  private readonly producerConflictException = new ProducerConflictException();
  constructor(
    @Inject(ProducerRepositoryInterface)
    private readonly producerRepository: ProducerRepositoryInterface,
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
