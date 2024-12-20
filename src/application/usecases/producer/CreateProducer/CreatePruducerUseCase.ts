import { Inject, Injectable } from '@nestjs/common';
import {
  ICreateProducerUseCase,
  Input,
  Output,
} from './ICreatePruducerUseCase';
import { ProducerRepositoryInterface } from '../../../interfaces/ProducerRepositoryInterface';
import { Producer } from '../../../../domain/Producer';
import { CPF } from '../../../../shared/domain/CPF';
import { CNPJ } from '../../../../shared/domain/CNPJ';
import { ProducerMapper } from '../../../mappers/ProducerMapper';

@Injectable()
export class CreateProducerUseCase implements ICreateProducerUseCase {
  constructor(
    @Inject(ProducerRepositoryInterface)
    private readonly producerRepository: ProducerRepositoryInterface,
  ) {}

  async execute(input: Input): Promise<Output> {
    const document =
      input.documentType === 'CPF'
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
  }
}
